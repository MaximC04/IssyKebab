import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../contexts/CartContext';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { id, name, price, quantity } = item;
  
  const handleRemove = () => {
    removeFromCart(id);
  };
  
  const handleDecrease = () => {
    updateQuantity(id, quantity - 1);
  };
  
  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{name}</h4>
        <div className="flex items-center mt-1">
          <button 
            className="text-gray-500 hover:text-amber-500 p-1"
            onClick={handleDecrease}
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="mx-2 text-gray-700">{quantity}</span>
          
          <button 
            className="text-gray-500 hover:text-amber-500 p-1"
            onClick={handleIncrease}
          >
            <Plus className="h-4 w-4" />
          </button>
          
          <button 
            className="text-gray-500 hover:text-red-500 p-1 ml-2"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="text-right">
        <span className="text-gray-900 font-medium">${price.toFixed(2)}</span>
        <div className="text-gray-500 text-sm">${(price * quantity).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CartItem;