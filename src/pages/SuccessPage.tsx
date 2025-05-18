import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const SuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  
  useEffect(() => {
    // Clear the cart when this page is loaded
    clearCart();
    
    // Call the webhook to confirm order and send confirmation email
    if (sessionId) {
      const confirmOrder = async () => {
        try {
          await fetch('/.netlify/functions/webhook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId,
              type: 'checkout.session.completed',
            }),
          });
        } catch (error) {
          console.error('Error confirming order:', error);
        }
      };
      
      confirmOrder();
    }
  }, [clearCart, sessionId]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We've sent a confirmation to your email.
        </p>
        
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 mb-6">
            Your food is being prepared. You'll receive updates about your order status.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;