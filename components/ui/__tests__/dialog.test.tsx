import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '../dialog'

// Mock ResizeObserver which is used by Radix UI but not available in test environment
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('Dialog Components', () => {
  it('should open dialog when trigger is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Body</div>
          <DialogFooter>
            <DialogClose data-testid="dialog-close">Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    
    // Dialog content should not be in the document initially
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
    
    // Click the trigger button
    fireEvent.click(screen.getByTestId('dialog-trigger'))
    
    // Wait for the dialog to appear
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument()
      expect(screen.getByText('Dialog Description')).toBeInTheDocument()
      expect(screen.getByText('Dialog Body')).toBeInTheDocument()
    })
  })

  it('should close dialog when close button is clicked', async () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <DialogClose data-testid="dialog-close">Close</DialogClose>
        </DialogContent>
      </Dialog>
    )
    
    // Dialog should be open initially due to defaultOpen
    await waitFor(() => {
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })
    
    // Click the close button
    fireEvent.click(screen.getByTestId('dialog-close'))
    
    // Wait for the dialog to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
    })
  })

  it('should render dialog components with custom classNames', async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent className="custom-content" data-testid="dialog-content">
          <DialogHeader className="custom-header" data-testid="dialog-header">
            <DialogTitle className="custom-title" data-testid="dialog-title">Title</DialogTitle>
            <DialogDescription className="custom-desc" data-testid="dialog-desc">Description</DialogDescription>
          </DialogHeader>
          <DialogFooter className="custom-footer" data-testid="dialog-footer">
            <DialogClose className="custom-close" data-testid="dialog-close">Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('dialog-content')).toHaveClass('custom-content')
      expect(screen.getByTestId('dialog-header')).toHaveClass('custom-header')
      expect(screen.getByTestId('dialog-title')).toHaveClass('custom-title')
      expect(screen.getByTestId('dialog-desc')).toHaveClass('custom-desc')
      expect(screen.getByTestId('dialog-footer')).toHaveClass('custom-footer')
      expect(screen.getByTestId('dialog-close')).toHaveClass('custom-close')
    })
  })

  it('should handle controlled open state', async () => {
    const TestComponent = () => {
      const [open, setOpen] = React.useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)} data-testid="external-open">Open Dialog</button>
          <button onClick={() => setOpen(false)} data-testid="external-close">Close Dialog</button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent data-testid="dialog-content">
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>Controlled Dialog Description</DialogDescription>
            </DialogContent>
          </Dialog>
        </>
      )
    }
    
    render(<TestComponent />)
    
    // Dialog should be closed initially
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
    
    // Open dialog using external control
    fireEvent.click(screen.getByTestId('external-open'))
    
    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })
    
    // Close dialog using external control
    fireEvent.click(screen.getByTestId('external-close'))
    
    // Wait for dialog to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
    })
  })
})
