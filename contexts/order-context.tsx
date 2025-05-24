'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Product {
  id: string
  name: string
  price: number
  image_url?: string
  category: string
  stock?: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface OrderContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  updateQuantity: (id: string, change: number) => void
  clearCart: () => void
  subtotal: number
  tax: number
  total: number
  taxRate: number
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children, initialTaxRate = 0.055 }: { children: ReactNode, initialTaxRate?: number }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [taxRate] = useState(initialTaxRate)

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, change: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return (
    <OrderContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity, 
      clearCart,
      subtotal,
      tax,
      total,
      taxRate
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
