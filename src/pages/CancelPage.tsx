import React from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CancelPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your order has been cancelled and no payment has been processed.
        </p>
        
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 mb-6">
            You can return to our menu to continue shopping or try the payment again.
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

export default CancelPage;