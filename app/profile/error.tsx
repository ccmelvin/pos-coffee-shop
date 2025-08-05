'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, User, Home } from 'lucide-react'
import Link from 'next/link'

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log profile errors with user context
    console.error('Profile error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      route: 'profile',
      userAgent: navigator.userAgent
    })
  }, [error])

  const isDataError = error.message.includes('fetch') || error.message.includes('network')
  const isPermissionError = error.message.includes('unauthorized') || error.message.includes('forbidden')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-red-900">
            {isPermissionError ? 'Access Denied' : 'Profile Error'}
          </CardTitle>
          <CardDescription>
            {isPermissionError 
              ? 'You don\'t have permission to access this profile page.'
              : isDataError 
                ? 'We couldn\'t load your profile data. This might be a connection issue.'
                : 'Something went wrong while loading your profile.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isPermissionError && (
            <Button 
              onClick={reset}
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload Profile
            </Button>
          )}
          
          <Link href="/" className="block">
            <Button 
              variant="outline" 
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Button>
          </Link>

          {isPermissionError && (
            <Link href="/auth/login" className="block">
              <Button 
                variant="secondary" 
                className="w-full"
              >
                Sign In Again
              </Button>
            </Link>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Need help?
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Try signing out and back in</li>
              <li>• Contact support if the issue persists</li>
            </ul>
          </div>

          {error.digest && (
            <p className="text-xs text-gray-400 text-center border-t pt-2">
              Error ID: {error.digest}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
