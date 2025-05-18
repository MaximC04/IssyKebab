import React, { useState } from 'react';
import { ShoppingCart as CartIcon, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import { useAuth } from '../../contexts/AuthContext';
import CheckoutModal from './CheckoutModal';

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (totalItems === 0) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          className="bg-amber-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition-colors flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <CartIcon className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200 md:w-96 md:right-4 md:left-auto md:bottom-4 md:rounded-lg md:border">
        {/* Cart header - always visible */}
        <div 
          className="p-4 bg-amber-500 text-white flex justify-between items-center cursor-pointer md:rounded-t-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <CartIcon className="h-6 w-6 mr-2" />
            <span className="font-semibold">Your Order ({totalItems} items)</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold mr-2">${totalPrice.toFixed(2)}</span>
            {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </div>
        </div>
        
        {/* Cart body - collapsible */}
        {isOpen && (
          <div className="p-4">
            <div className="max-h-80 overflow-y-auto mb-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                  onClick={clearCart}
                >
                  <X className="h-5 w-5 mr-1" />
                  Clear
                </button>
                
                <button
                  className="flex-1 bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600 transition-colors"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {isCheckoutOpen && (
        <CheckoutModal 
          onClose={() => setIsCheckoutOpen(false)} 
          cartItems={items}
          totalPrice={totalPrice}
          currentUser={user}
        />
      )}
    </>
  );
};

export default Cart;