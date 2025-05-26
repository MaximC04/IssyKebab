import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { updateOrderStatus, getOrder } from '../../src/utils/supabaseClient';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const BREVO_API_KEY = process.env.BREVO_API_KEY;

// Function to send email via Brevo
const sendEmail = async (order: any) => {
  if (!BREVO_API_KEY) {
    console.error('Brevo API key is not set');
    return;
  }
  
  const customerEmail = order.customer_email;
  if (!customerEmail) {
    console.error('Customer email not found in order');
    return;
  }
  
  try {
    // Format the order items for the email
    const orderItems = order.items.map((item: any) => `
      ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}
    `).join('<br>');
    
    // Send the email
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: 'Kebab Express',
          email: 'orders@kebabexpress.com',
        },
        to: [
          {
            email: customerEmail,
            name: order.customer_name || 'Valued Customer',
          },
        ],
        subject: `Order Confirmation #${order.id}`,
        htmlContent: `
          <h1>Thank you for your order!</h1>
          <p>Your order #${order.id} has been confirmed and is being prepared.</p>
          
          <h2>Order Details:</h2>
          <p>
            <strong>Order Number:</strong> #${order.id}<br>
            <strong>Order Date:</strong> ${new Date(order.created_at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}<br>
            <strong>Total:</strong> $${order.total.toFixed(2)}
          </p>
          
          <h3>Items:</h3>
          <p>${orderItems}</p>
          
          <p>If you have any questions about your order, please contact us.</p>
          
          <p>Thank you for choosing Kebab Express!</p>
        `,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the request body
    const { sessionId, type } = JSON.parse(event.body || '{}');
    
    if (!sessionId || type !== 'checkout.session.completed') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid webhook payload' }),
      };
    }
    
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Session not found' }),
      };
    }
    
    // Get the order ID from the session metadata
    const orderId = session.metadata?.orderId;
    
    if (!orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Order ID not found in session metadata' }),
      };
    }
    
    // Update the order status in Supabase
    await updateOrderStatus(parseInt(orderId), 'paid');
    
    // Get the complete order details for the email
    const order = await getOrder(parseInt(orderId));
    
    // Send order confirmation email
    await sendEmail(order);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process webhook' }),
    };
  }
};

export { handler };
