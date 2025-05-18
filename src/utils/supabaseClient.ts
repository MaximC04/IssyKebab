import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and anonymous key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if the required environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and anonymous key must be provided!');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define database types
export type Order = {
  id: number;
  items: any; // This will be a JSON object containing cart items
  total: number;
  status: 'pending' | 'paid' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  created_at: string;
  user_id: string | null;
  customer_email?: string;
  customer_name?: string;
  customer_phone?: string;
};

// Function to create a new order
export const createOrder = async (
  items: any,
  total: number,
  user_id: string | null,
  customer_email?: string,
  customer_name?: string,
  customer_phone?: string
) => {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      items,
      total,
      user_id,
      customer_email,
      customer_name,
      customer_phone,
      status: 'pending',
    })
    .select();

  if (error) {
    throw error;
  }

  return data?.[0];
};

// Function to update order status
export const updateOrderStatus = async (orderId: number, status: Order['status']) => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    throw error;
  }
};

// Function to get a single order
export const getOrder = async (orderId: number) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) {
    throw error;
  }

  return data as Order;
};

// Function to get user orders
export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data as Order[];
};

// Function to subscribe to order changes (for staff dashboard)
export const subscribeToOrders = (callback: (payload: any) => void) => {
  return supabase
    .channel('orders-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
    .subscribe();
};