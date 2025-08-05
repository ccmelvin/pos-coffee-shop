'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ActionModal } from '@/components/ui/modal'
import { useOrder } from '@/contexts/order-context'
import { saveOrder } from '@/lib/order-service'
import { toast } from 'sonner'

interface OrderActionsProps {
  onOrderComplete?: () => void
}

export function OrderActionsEnhanced({ onOrderComplete }: OrderActionsProps) {
  const { cart, total, subtotal, tax, clearCart } = useOrder()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showHoldModal, setShowHoldModal] = useState(false)

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
        payment_method: 'cash',
      })
      
      toast.success('Order completed successfully!')
      clearCart()
      if (onOrderComplete) {
        onOrderComplete()
      }
    } catch (error) {
      console.error('Error saving order:', error)
      
      if (error instanceof Error) {
        if (error.message.includes('out of stock')) {
          toast.error('Some items are out of stock. Order has been saved for retry.', {
            action: {
              label: 'Retry',
              onClick: () => handleSaveOrder()
            }
          })
          return
        }
        
        if (error.message.includes('payment')) {
          toast.error('Payment failed. Order preserved - please try again.', {
            action: {
              label: 'Retry Payment',
              onClick: () => handleSaveOrder()
            }
          })
          return
        }
        
        toast.error(error.message)
      } else {
        toast.error('Unable to complete order. Please contact support if this continues.')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancelOrder = () => {
    clearCart()
    toast.info('Order cancelled')
  }

  const handleHoldOrder = () => {
    // Future implementation
    toast.info('Order has been placed on hold')
  }

  const getTotalItemsText = () => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    return `${itemCount} item${itemCount !== 1 ? 's' : ''}`
  }

  return (
    <>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => setShowCancelModal(true)}
            disabled={isProcessing || cart.length === 0}
          >
            Cancel Order
          </Button>
          <Button 
            variant="outline" 
            className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
            onClick={() => setShowHoldModal(true)}
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

      {/* Cancel Order Modal */}
      <ActionModal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        title="Cancel Order"
        description={`Are you sure you want to cancel this order? This will remove all ${getTotalItemsText()} from your cart and cannot be undone.`}
        confirmText="Yes, Cancel Order"
        cancelText="Keep Order"
        type="error"
        onConfirm={handleCancelOrder}
      />

      {/* Hold Order Modal */}
      <ActionModal
        open={showHoldModal}
        onOpenChange={setShowHoldModal}
        title="Hold Order"
        description={`This will save your current order (${getTotalItemsText()}) and allow you to continue it later. The order will be preserved with all selected items.`}
        confirmText="Hold Order"
        cancelText="Continue Order"
        type="warning"
        onConfirm={handleHoldOrder}
      />
    </>
  )
}
