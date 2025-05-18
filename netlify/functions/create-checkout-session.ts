import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { getOrder } from '../../src/utils/supabaseClient';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

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
    const { orderId, items, customerEmail } = JSON.parse(event.body || '{}');
    
    if (!orderId || !items || !customerEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }
    
    // Get the order from Supabase
    const order = await getOrder(orderId);
    
    if (!order) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Order not found' }),
      };
    }
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'aud',
          product_data: {
            name: item.name,
            description: item.description || '',
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/cancel`,
      customer_email: customerEmail,
      metadata: {
        orderId: orderId.toString(),
      },
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create checkout session' }),
    };
  }
};

export { handler };