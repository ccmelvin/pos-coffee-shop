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
  // Use RPC for atomic transaction
  const { data: order, error } = await supabase.rpc('create_order_with_items', {
    order_data: {
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      total: orderData.total,
      payment_method: orderData.payment_method,
      customer_id: orderData.customer_id || null,
      status: 'completed'
    },
    items_data: orderData.items.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }))
  })
  
  if (error) {
    console.error('Error creating order:', error)
    
    // Provide user-friendly error messages
    if (error.message.includes('insufficient_stock')) {
      throw new Error('Some items are out of stock. Please refresh and try again.')
    }
    if (error.message.includes('payment_failed')) {
      throw new Error('Payment processing failed. Please try a different payment method.')
    }
    
    throw new Error('Unable to complete your order. Please try again or contact support.')
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
