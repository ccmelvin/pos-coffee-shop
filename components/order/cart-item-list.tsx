'use client'

import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'
import { Minus, Plus } from 'lucide-react'

export function CartItemList() {
  const { cart, updateQuantity } = useOrder()

  if (cart.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Your cart is empty</p>
        <p className="text-sm mt-2">Add items from the menu to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 font-medium">
        <span>Items</span>
        <span className="text-center">QTY</span>
        <span className="text-right">Price</span>
      </div>

      {cart.map((item) => (
        <div key={item.id} className="grid grid-cols-3 gap-4 items-center py-2">
          <div>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
