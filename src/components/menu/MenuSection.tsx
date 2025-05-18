import React from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '../../contexts/CartContext';
import { isBreakfastAvailable } from '../../utils/timeUtils';

interface MenuSectionProps {
  title: string;
  items: MenuItemType[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  const isBreakfastCategory = title === 'Meals/Dishes';
  const breakfastAvailable = isBreakfastAvailable();

  return (
    <section className="mb-12" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-amber-800">{title}</h2>
        
        {isBreakfastCategory && !breakfastAvailable && (
          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
            Breakfast items unavailable after 12:30 PM
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;