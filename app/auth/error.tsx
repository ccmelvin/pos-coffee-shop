'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log authentication errors with context
    console.error('Authentication error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      route: 'auth'
    })
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-red-900">Authentication Error</CardTitle>
          <CardDescription>
            We encountered an issue with the authentication system. This might be a temporary problem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={reset}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/" className="block">
            <Button 
              variant="outline" 
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </Link>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              If this problem persists, try:
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Clearing your browser cache</li>
              <li>• Checking your internet connection</li>
              <li>• Contacting support</li>
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
