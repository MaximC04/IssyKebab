import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import MenuSection from '../components/menu/MenuSection';
import Cart from '../components/cart/Cart';
import { menuCategories, getMenuItemsByCategory } from '../utils/menuData';
import { isBreakfastAvailable, getBreakfastCutoffTime } from '../utils/timeUtils';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const breakfastAvailable = isBreakfastAvailable();
  
  // Set active category based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const category of menuCategories) {
        const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'));
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 150 && bottom >= 150) {
            setActiveCategory(category);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Navigation */}
      <nav className="sticky top-0 bg-white z-30 shadow-md py-3 px-4 rounded-lg mb-8">
        <div className="overflow-x-auto flex space-x-4">
          {menuCategories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none ${
                activeCategory === category
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
              onClick={() => scrollToCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="bg-amber-500 text-white rounded-lg p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Kebab Express</h1>
          <p className="text-amber-100 text-lg mb-4">Authentic Mediterranean Cuisine</p>
          
          <button
            className="bg-white text-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center"
            onClick={() => scrollToCategory(menuCategories[0])}
          >
            View Menu
            <ChevronDown className="ml-2 h-5 w-5" />
          </button>
          
          {!breakfastAvailable && (
            <div className="mt-4 bg-amber-600 text-white p-3 rounded-lg inline-block">
              <p className="font-medium">Breakfast items are only available until {getBreakfastCutoffTime()}</p>
            </div>
          )}
        </div>
        
        {/* Background pattern */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-amber-400 rounded-full opacity-30 transform translate-x-10 -translate-y-10"></div>
        <div className="absolute left-0 bottom-0 w-32 h-32 bg-amber-400 rounded-full opacity-30 transform -translate-x-10 translate-y-10"></div>
      </div>
      
      {/* Menu Sections */}
      {menuCategories.map((category) => (
        <MenuSection
          key={category}
          title={category}
          items={getMenuItemsByCategory(category)}
        />
      ))}
      
      {/* Cart */}
      <Cart />
    </div>
  );
};

export default HomePage;