import React from 'react';
import { PlusCircle } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../contexts/CartContext';
import { useCart } from '../../contexts/CartContext';
import { isBreakfastAvailable } from '../../utils/timeUtils';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { name, description, price, isBreakfastItem } = item;
  
  const isDisabled = isBreakfastItem && !isBreakfastAvailable();
  
  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg ${isDisabled ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600 mt-1 text-sm h-12 overflow-hidden">{description}</p>
        </div>
        <span className="text-amber-600 font-bold text-lg">${price.toFixed(2)}</span>
      </div>
      
      <button 
        className={`mt-4 w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
          isDisabled 
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-amber-500 text-white hover:bg-amber-600'
        }`}
        onClick={handleAddToCart}
        disabled={isDisabled}
      >
        <PlusCircle className="h-5 w-5" />
        <span>Add to Cart</span>
      </button>
      
      {isBreakfastItem && isDisabled && (
        <p className="mt-2 text-xs text-gray-500 text-center">
          Available until 12:30 PM
        </p>
      )}
    </div>
  );
};

export default MenuItem;