import { render, act, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../auth-context'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

// Mock dependencies
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: { session: null },
        error: null
      }),
      onAuthStateChange: jest.fn().mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } }
      }),
      signOut: jest.fn()
    }
  }
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Test component to access context
const TestComponent = () => {
  const { user, session, isLoading, signOut } = useAuth()
  return (
    <div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="user">{JSON.stringify(user)}</div>
      <div data-testid="session">{JSON.stringify(session)}</div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

describe('AuthProvider', () => {
  const mockRouter = {
    push: jest.fn()
  }
  
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('should initialize with loading state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('loading').textContent).toBe('true')
  })

  it('should handle successful session retrieval', async () => {
    const mockSession = {
      user: { id: '123', email: 'test@example.com' }
    }
    
    ;(supabase.auth.getSession as jest.Mock).mockResolvedValueOnce({
      data: { session: mockSession },
      error: null
    })
    
    ;(supabase.auth.onAuthStateChange as jest.Mock).mockReturnValueOnce({
      data: { subscription: { unsubscribe: jest.fn() } }
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false')
      expect(screen.getByTestId('user').textContent).toBe(JSON.stringify(mockSession.user))
      expect(screen.getByTestId('session').textContent).toBe(JSON.stringify(mockSession))
    })
  })

  it('should handle session error', async () => {
    const mockError = new Error('Session error')
    ;(supabase.auth.getSession as jest.Mock).mockResolvedValueOnce({
      data: { session: null },
      error: mockError
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false')
      expect(consoleSpy).toHaveBeenCalledWith(mockError)
    })

    consoleSpy.mockRestore()
  })

  it('should handle sign out', async () => {
    ;(supabase.auth.getSession as jest.Mock).mockResolvedValueOnce({
      data: { session: null },
      error: null
    })
    
    ;(supabase.auth.onAuthStateChange as jest.Mock).mockReturnValueOnce({
      data: { subscription: { unsubscribe: jest.fn() } }
    })

    ;(supabase.auth.signOut as jest.Mock).mockResolvedValueOnce()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const signOutButton = screen.getByText('Sign Out')
    await act(async () => {
      signOutButton.click()
    })

    expect(supabase.auth.signOut).toHaveBeenCalled()
    expect(mockRouter.push).toHaveBeenCalledWith('/auth/login')
  })

  it('should cleanup subscription on unmount', async () => {
    const unsubscribeMock = jest.fn()
    ;(supabase.auth.onAuthStateChange as jest.Mock).mockReturnValueOnce({
      data: { subscription: { unsubscribe: unsubscribeMock } }
    })

    const { unmount } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    unmount()
    expect(unsubscribeMock).toHaveBeenCalled()
  })

  it('should handle auth state change', async () => {
    const initialSession = null
    const newSession = { user: { id: '456', email: 'updated@example.com' } }
    
    // Initial state
    ;(supabase.auth.getSession as jest.Mock).mockResolvedValueOnce({
      data: { session: initialSession },
      error: null
    })
    
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    // Wait for initial state to be set
    await waitFor(() => {
      expect(getByTestId('loading').textContent).toBe('false')
    })
    
    // Simulate auth state change
    const authChangeCallback = (supabase.auth.onAuthStateChange as jest.Mock).mock.calls[0][0]
    act(() => {
      authChangeCallback('SIGNED_IN', newSession)
    })
    
    // Verify state was updated
    expect(getByTestId('user').textContent).toBe(JSON.stringify(newSession.user))
    expect(getByTestId('session').textContent).toBe(JSON.stringify(newSession))
  })

  it('should handle sign out error', async () => {
    const signOutError = new Error('Sign out failed')
    ;(supabase.auth.signOut as jest.Mock).mockRejectedValueOnce(signOutError)
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    const signOutButton = screen.getByText('Sign Out')
    await act(async () => {
      signOutButton.click()
    })
    
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})