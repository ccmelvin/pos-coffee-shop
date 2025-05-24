import { supabase } from './supabase';
import { Database } from './database.types';

export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];

// Product API functions
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data;
}

export async function getProductsByCategory(category: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('name');
  
  if (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
  
  return data;
}

export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('name');
  
  if (error) {
    console.error(`Error searching products for "${query}":`, error);
    return [];
  }
  
  return data;
}

export async function createProduct(product: Database['public']['Tables']['products']['Insert']) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }
  
  return data;
}

export async function updateProduct(
  id: string, 
  updates: Database['public']['Tables']['products']['Update']
) {
  const { data, error } = await supabase
    .from('products')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
  
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
  
  return true;
}

// Order API functions
export async function createOrder(
  orderData: Database['public']['Tables']['orders']['Insert'],
  orderItems: Omit<Database['public']['Tables']['order_items']['Insert'], 'order_id'>[]
) {
  // Start a transaction by using Supabase's rpc function
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();
  
  if (orderError) {
    console.error('Error creating order:', orderError);
    throw orderError;
  }
  
  // Insert order items
  const orderItemsWithOrderId = orderItems.map(item => ({
    ...item,
    order_id: order.id
  }));
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsWithOrderId);
  
  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    throw itemsError;
  }
  
  return order;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return data;
}

export async function getOrderWithItems(orderId: string) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();
  
  if (orderError) {
    console.error(`Error fetching order ${orderId}:`, orderError);
    return null;
  }
  
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      *,
      products (*)
    `)
    .eq('order_id', orderId);
  
  if (itemsError) {
    console.error(`Error fetching items for order ${orderId}:`, itemsError);
    return { ...order, items: [] };
  }
  
  return { ...order, items };
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { data, error } = await supabase
    .from('orders')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating order ${orderId} status:`, error);
    throw error;
  }
  
  return data;
}
