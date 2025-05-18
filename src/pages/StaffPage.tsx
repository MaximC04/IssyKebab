import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import OrdersTable from '../components/staff/OrdersTable';

const StaffPage: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Staff Dashboard</h1>
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            You need to be logged in to access this page.
          </div>
        </div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Staff Dashboard</h1>
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            You don't have permission to access this page.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Staff Dashboard</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Real-time Orders</h2>
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default StaffPage;