'use client'

import { useOrder } from '@/contexts/order-context'
import { Separator } from '@/components/ui/separator'

export function OrderSummary() {
  const { subtotal, tax, total, taxRate } = useOrder()

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Discount (%)</span>
        <span>$0</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Sub Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tax {(taxRate * 100).toFixed(1)}%</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <Separator />
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-emerald-600">${total.toFixed(2)}</span>
      </div>
    </div>
  )
}
