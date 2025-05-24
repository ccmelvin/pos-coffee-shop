'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'
import { saveOrder } from '@/lib/order-service'
import { toast } from 'sonner'

interface OrderActionsProps {
  onOrderComplete?: () => void
}

export function OrderActions({ onOrderComplete }: OrderActionsProps) {
  const { cart, total, subtotal, tax, clearCart } = useOrder()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSaveOrder = async () => {
    if (cart.length === 0) {
      toast.error('Cannot save an empty order')
      return
    }

    setIsProcessing(true)
    try {
      await saveOrder({
        items: cart,
        subtotal,
        tax,
        total,
        payment_method: 'cash', // Default payment method
      })
      
      toast.success('Order completed successfully!')
      clearCart()
      if (onOrderComplete) {
        onOrderComplete()
      }
    } catch (error) {
      console.error('Error saving order:', error)
      toast.error('Failed to complete order')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancelOrder = () => {
    if (cart.length === 0) return
    
    if (confirm('Are you sure you want to cancel this order?')) {
      clearCart()
      toast.info('Order cancelled')
    }
  }

  const handleHoldOrder = () => {
    // This would be implemented in a future feature
    toast.info('Order hold feature coming soon')
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="text-red-600 border-red-600 hover:bg-red-50"
          onClick={handleCancelOrder}
          disabled={isProcessing || cart.length === 0}
        >
          Cancel Order
        </Button>
        <Button 
          variant="outline" 
          className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
          onClick={handleHoldOrder}
          disabled={isProcessing || cart.length === 0}
        >
          Hold Order
        </Button>
      </div>
      <Button 
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3"
        onClick={handleSaveOrder}
        disabled={isProcessing || cart.length === 0}
      >
        {isProcessing ? 'Processing...' : `Pay ($${total.toFixed(2)})`}
      </Button>
    </div>
  )
}
