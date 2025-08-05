import { render, screen, fireEvent } from '@testing-library/react'
import { OrderProvider, useOrder, Product } from '../../contexts/order-context'

const TestComponent = () => {
  const { cart, addToCart, updateQuantity, clearCart, subtotal, tax, total } = useOrder()
  
  const sampleProduct: Product = {
    id: '1',
    name: 'Cappuccino',
    price: 4.99,
    category: 'coffee'
  }

  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <div data-testid="subtotal">{subtotal.toFixed(2)}</div>
      <div data-testid="tax">{tax.toFixed(2)}</div>
      <div data-testid="total">{total.toFixed(2)}</div>
      <button onClick={() => addToCart(sampleProduct)}>Add Item</button>
      <button onClick={() => updateQuantity('1', 1)}>Increase</button>
      <button onClick={() => updateQuantity('1', -1)}>Decrease</button>
      <button onClick={clearCart}>Clear</button>
      {cart.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          {item.name} - {item.quantity}
        </div>
      ))}
    </div>
  )
}

describe('OrderContext', () => {
  it('adds items to cart', () => {
    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>
    )

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    
    fireEvent.click(screen.getByText('Add Item'))
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('item-1')).toHaveTextContent('Cappuccino - 1')
  })

  it('calculates totals correctly', () => {
    render(
      <OrderProvider initialTaxRate={0.1}>
        <TestComponent />
      </OrderProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Add Item'))
    
    expect(screen.getByTestId('subtotal')).toHaveTextContent('9.98')
    expect(screen.getByTestId('tax')).toHaveTextContent('1.00')
    expect(screen.getByTestId('total')).toHaveTextContent('10.98')
  })

  it('clears cart', () => {
    render(
      <OrderProvider>
        <TestComponent />
      </OrderProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Clear'))
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })
})