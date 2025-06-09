import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth-context'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

jest.mock('../auth-context', () => ({
  useAuth: jest.fn()
}))

describe('ProtectedRoute', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn()
  }
  
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('should redirect to login page when user is not authenticated', () => {
    // Mock unauthenticated state
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      session: null,
      isLoading: false
    })

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    )

    // Check that router.replace was called with login path
    expect(mockRouter.replace).toHaveBeenCalledWith('/auth/login')
    
    // Protected content should not be rendered
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('should show loading state when authentication is being checked', () => {
    // Mock loading state
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      session: null,
      isLoading: true
    })

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    )

    // Should show loading indicator
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
    
    // Protected content should not be rendered yet
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
    
    // Should not redirect while loading
    expect(mockRouter.replace).not.toHaveBeenCalled()
  })

  it('should render children when user is authenticated', () => {
    // Mock authenticated state
    ;(useAuth as jest.Mock).mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      session: { user: { id: '123', email: 'test@example.com' } },
      isLoading: false
    })

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    )

    // Protected content should be rendered
    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    
    // Should not redirect
    expect(mockRouter.replace).not.toHaveBeenCalled()
  })
})