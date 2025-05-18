import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { subscribeToOrders } from '../../utils/supabaseClient';
import { formatISOToAEST } from '../../utils/timeUtils';
import type { Order } from '../../utils/supabaseClient';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersTable: React.FC = () => {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    if (!isAdmin) return;
    
    setLoading(true);
    
    // Initial fetch of orders
    const fetchOrders = async () => {
      try {
        const { data, error } = await fetch('/.netlify/functions/get-orders')
          .then(res => res.json());
        
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
    
    // Subscribe to real-time updates
    const subscription = subscribeToOrders((payload) => {
      if (payload.eventType === 'INSERT') {
        setOrders(prev => [payload.new as Order, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setOrders(prev => 
          prev.map(order => 
            order.id === payload.new.id ? (payload.new as Order) : order
          )
        );
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [isAdmin]);
  
  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };
  
  if (!isAdmin) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        You don't have permission to view this page.
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOrderClick(order)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatISOToAEST(order.created_at, 'dd/MM/yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer_name || 'Guest'} 
                    {order.customer_email && (
                      <span className="block text-xs text-gray-400">
                        {order.customer_email}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'paid' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'ready' ? 'bg-purple-100 text-purple-800' : ''}
                      ${order.status === 'completed' ? 'bg-gray-100 text-gray-800' : ''}
                      ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-amber-600 hover:text-amber-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(order);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrdersTable;