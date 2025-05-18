import React from 'react';
import { Utensils, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-800 text-amber-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Utensils className="h-6 w-6" />
              <span className="text-xl font-bold text-white">Kebab Express</span>
            </div>
            <p className="mb-4">
              Delicious, authentic Mediterranean food. Order online for pickup or delivery.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(02) 1234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@kebabexpress.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span>123 Main Street<br />Sydney, NSW 2000</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hours</h3>
            <div className="space-y-1">
              <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
              <p>Saturday: 11:00 AM - 10:00 PM</p>
              <p>Sunday: 11:00 AM - 9:00 PM</p>
              <p className="mt-2 text-amber-300">Breakfast items available until 12:30 PM daily</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-amber-700 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Kebab Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;