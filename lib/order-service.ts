import { supabase } from '@/lib/supabase'
import { CartItem } from '@/contexts/order-context'

interface OrderData {
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
  payment_method: string
  customer_id?: string
}

export async function saveOrder(orderData: OrderData) {
  // First, create the order record
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      total: orderData.total,
      payment_method: orderData.payment_method,
      customer_id: orderData.customer_id || null,
      status: 'completed'
    })
    .select()
    .single()
  
  if (orderError) {
    console.error('Error creating order:', orderError)
    throw new Error('Failed to create order')
  }
  
  // Then, create order items
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price
  }))
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)
  
  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    throw new Error('Failed to create order items')
  }
  
  return order
}

export async function getOrders(limit = 10) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching orders:', error)
    throw new Error('Failed to fetch orders')
  }
  
  return data
}

export async function getOrderDetails(orderId: string) {
  // Get the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()
  
  if (orderError) {
    console.error('Error fetching order:', orderError)
    throw new Error('Failed to fetch order')
  }
  
  // Get the order items with product details
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      id,
      quantity,
      price,
      products (
        id,
        name,
        image_url
      )
    `)
    .eq('order_id', orderId)
  
  if (itemsError) {
    console.error('Error fetching order items:', itemsError)
    throw new Error('Failed to fetch order items')
  }
  
  return {
    ...order,
    items
  }
}
