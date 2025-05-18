import React, { useState } from 'react';
import { X } from 'lucide-react';
import { formatISOToAEST } from '../../utils/timeUtils';
import { Order, updateOrderStatus } from '../../utils/supabaseClient';
import { CartItem } from '../../contexts/CartContext';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const orderItems = order.items as CartItem[];
  
  const handleStatusUpdate = async (newStatus: Order['status']) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      await updateOrderStatus(order.id, newStatus);
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity" 
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Order #{order.id} Details
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Date:</p>
                <p className="text-sm font-medium">
                  {formatISOToAEST(order.created_at, 'PPpp')}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Status:</p>
                <p className={`text-sm font-medium ${
                  order.status === 'paid' ? 'text-green-600' : 
                  order.status === 'pending' ? 'text-yellow-600' :
                  order.status === 'cancelled' ? 'text-red-600' :
                  'text-gray-900'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Customer:</p>
                <p className="text-sm font-medium">
                  {order.customer_name || 'Guest'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email:</p>
                <p className="text-sm font-medium">
                  {order.customer_email || 'N/A'}
                </p>
              </div>
              
              {order.customer_phone && (
                <div>
                  <p className="text-sm text-gray-500">Phone:</p>
                  <p className="text-sm font-medium">
                    {order.customer_phone}
                  </p>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <h4 className="text-md font-medium mb-3">Order Items</h4>
              <div className="max-h-64 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-right">
                <div className="text-gray-700">
                  <span className="font-bold">Total: </span>
                  <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <h4 className="text-md font-medium">Change Status</h4>
              <div className="flex space-x-2">
                {order.status !== 'preparing' && (
                  <button
                    onClick={() => handleStatusUpdate('preparing')}
                    disabled={isUpdating}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    Preparing
                  </button>
                )}
                
                {order.status !== 'ready' && (
                  <button
                    onClick={() => handleStatusUpdate('ready')}
                    disabled={isUpdating}
                    className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 disabled:bg-gray-300"
                  >
                    Ready
                  </button>
                )}
                
                {order.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusUpdate('completed')}
                    disabled={isUpdating}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:bg-gray-300"
                  >
                    Completed
                  </button>
                )}
                
                {order.status !== 'cancelled' && (
                  <button
                    onClick={() => handleStatusUpdate('cancelled')}
                    disabled={isUpdating}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;