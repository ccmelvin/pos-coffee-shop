import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose
} from '../toast'
import { useToast } from '@/hooks/use-toast'

// Mock ResizeObserver which is used by Radix UI but not available in test environment
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}))

describe('Toast Components', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render toast with title and description', () => {
    render(
      <ToastProvider>
        <Toast data-testid="toast">
          <ToastTitle data-testid="toast-title">Toast Title</ToastTitle>
          <ToastDescription data-testid="toast-description">Toast Description</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    
    expect(screen.getByTestId('toast')).toBeInTheDocument()
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Toast Title')
    expect(screen.getByTestId('toast-description')).toHaveTextContent('Toast Description')
  })

  it('should render different toast variants', () => {
    const { rerender } = render(
      <ToastProvider>
        <Toast variant="default" data-testid="toast">Default Toast</Toast>
        <ToastViewport />
      </ToastProvider>
    )
    
    expect(screen.getByTestId('toast')).toHaveClass('border', 'bg-background')
    
    rerender(
      <ToastProvider>
        <Toast variant="destructive" data-testid="toast">Destructive Toast</Toast>
        <ToastViewport />
      </ToastProvider>
    )
    
    expect(screen.getByTestId('toast')).toHaveClass('destructive', 'border-destructive', 'bg-destructive')
  })

  it('should handle toast action click', () => {
    const handleAction = jest.fn()
    
    render(
      <ToastProvider>
        <Toast data-testid="toast">
          <ToastTitle>Toast Title</ToastTitle>
          <ToastAction data-testid="toast-action" altText="Action" onClick={handleAction}>
            Action
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    
    fireEvent.click(screen.getByTestId('toast-action'))
    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('should close toast when close button is clicked', async () => {
    const handleOpenChange = jest.fn()
    
    render(
      <ToastProvider>
        <Toast data-testid="toast" onOpenChange={handleOpenChange}>
          <ToastTitle>Toast Title</ToastTitle>
          <ToastClose data-testid="toast-close" />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    
    fireEvent.click(screen.getByTestId('toast-close'))
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('should apply custom classNames to toast components', () => {
    render(
      <ToastProvider>
        <Toast className="custom-toast" data-testid="toast">
          <ToastTitle className="custom-title" data-testid="toast-title">Title</ToastTitle>
          <ToastDescription className="custom-desc" data-testid="toast-description">Description</ToastDescription>
          <ToastAction className="custom-action" data-testid="toast-action" altText="Action">Action</ToastAction>
          <ToastClose className="custom-close" data-testid="toast-close" />
        </Toast>
        <ToastViewport className="custom-viewport" data-testid="toast-viewport" />
      </ToastProvider>
    )
    
    expect(screen.getByTestId('toast')).toHaveClass('custom-toast')
    expect(screen.getByTestId('toast-title')).toHaveClass('custom-title')
    expect(screen.getByTestId('toast-description')).toHaveClass('custom-desc')
    expect(screen.getByTestId('toast-action')).toHaveClass('custom-action')
    expect(screen.getByTestId('toast-close')).toHaveClass('custom-close')
    expect(screen.getByTestId('toast-viewport')).toHaveClass('custom-viewport')
  })

  it('should handle controlled open state', () => {
    const handleOpenChange = jest.fn()
    
    const { rerender } = render(
      <ToastProvider>
        <Toast open={true} onOpenChange={handleOpenChange} data-testid="toast">
          <ToastTitle>Toast Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    
    expect(screen.getByTestId('toast')).toBeInTheDocument()
    
    rerender(
      <ToastProvider>
        <Toast open={false} onOpenChange={handleOpenChange} data-testid="toast">
          <ToastTitle>Toast Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
    
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument()
  })

  it('should forward refs correctly', () => {
    const toastRef = jest.fn()
    const titleRef = jest.fn()
    const descRef = jest.fn()
    const actionRef = jest.fn()
    const closeRef = jest.fn()
    const viewportRef = jest.fn()
    
    render(
      <ToastProvider>
        <Toast ref={toastRef} data-testid="toast">
          <ToastTitle ref={titleRef}>Title</ToastTitle>
          <ToastDescription ref={descRef}>Description</ToastDescription>
          <ToastAction ref={actionRef} altText="Action">Action</ToastAction>
          <ToastClose ref={closeRef} />
        </Toast>
        <ToastViewport ref={viewportRef} />
      </ToastProvider>
    )
    
    expect(toastRef).toHaveBeenCalled()
    expect(titleRef).toHaveBeenCalled()
    expect(descRef).toHaveBeenCalled()
    expect(actionRef).toHaveBeenCalled()
    expect(closeRef).toHaveBeenCalled()
    expect(viewportRef).toHaveBeenCalled()
  })
})
