import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, ShoppingCart, Menu, X, Clock } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { getCurrentTimeInAEST, formatAESTDate } from '../../utils/timeUtils';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, signOut, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInAEST());
  const location = useLocation();

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTimeInAEST());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-amber-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Utensils className="h-8 w-8" />
            <span className="text-2xl font-bold">Kebab Express</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center text-amber-100">
              <Clock className="h-5 w-5 mr-2" />
              <span>{formatAESTDate(currentTime, 'EEEE, h:mm a')}</span>
            </div>
            
            {isAdmin && (
              <Link 
                to="/staff" 
                className="text-amber-100 hover:text-white transition-colors"
              >
                Staff Dashboard
              </Link>
            )}
            
            {user ? (
              <button
                onClick={() => signOut()}
                className="text-amber-100 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                {/* We're allowing guest checkout, so no need for prominent login buttons */}
              </>
            )}
            
            <Link to="/" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/" className="relative mr-4">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMenu}
              className="text-white p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-amber-500">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center text-amber-100">
                <Clock className="h-5 w-5 mr-2" />
                <span>{formatAESTDate(currentTime, 'EEEE, h:mm a')}</span>
              </div>
              
              {isAdmin && (
                <Link 
                  to="/staff" 
                  className="text-amber-100 hover:text-white transition-colors"
                >
                  Staff Dashboard
                </Link>
              )}
              
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="text-amber-100 hover:text-white transition-colors text-left"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  {/* We're allowing guest checkout */}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;