import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../input'

describe('Input Component', () => {
  it('should render correctly', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md', 'border')
  })

  it('should handle value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} data-testid="test-input" />)
    
    const input = screen.getByTestId('test-input')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('test value')
  })

  it('should apply different types', () => {
    const { rerender } = render(<Input type="text" data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toHaveAttribute('type', 'text')
    
    rerender(<Input type="password" data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toHaveAttribute('type', 'password')
    
    rerender(<Input type="email" data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toHaveAttribute('type', 'email')
    
    rerender(<Input type="number" data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toHaveAttribute('type', 'number')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled data-testid="test-input" />)
    
    const input = screen.getByTestId('test-input')
    expect(input).toBeDisabled()
  })

  it('should apply custom className', () => {
    render(<Input className="custom-class" data-testid="test-input" />)
    
    expect(screen.getByTestId('test-input')).toHaveClass('custom-class')
  })

  it('should forward ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} />)
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('should handle focus and blur events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    
    render(
      <Input 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        data-testid="test-input" 
      />
    )
    
    const input = screen.getByTestId('test-input')
    
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)
    
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('should handle required attribute', () => {
    render(<Input required data-testid="test-input" />)
    
    expect(screen.getByTestId('test-input')).toBeRequired()
  })

  it('should handle readonly attribute', () => {
    render(<Input readOnly data-testid="test-input" />)
    
    expect(screen.getByTestId('test-input')).toHaveAttribute('readonly')
  })

  it('should have proper focus styles for accessibility', () => {
    render(<Input data-testid="test-input" />)
    
    const input = screen.getByTestId('test-input')
    expect(input).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2')
  })
})
