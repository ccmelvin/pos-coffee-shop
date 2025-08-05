'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Server, Home } from 'lucide-react'
import Link from 'next/link'

export default function ApiError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log API errors with detailed context
    console.error('API error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      route: 'api',
      url: window.location.href
    })
  }, [error])

  const isServerError = error.message.includes('500') || error.message.includes('server')
  const isNetworkError = error.message.includes('network') || error.message.includes('fetch')
  const isDatabaseError = error.message.includes('database') || error.message.includes('supabase')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Server className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-red-900">Service Error</CardTitle>
          <CardDescription>
            {isDatabaseError 
              ? 'We\'re having trouble connecting to our database. Please try again in a moment.'
              : isNetworkError 
                ? 'Network connection issue. Please check your internet connection.'
                : isServerError 
                  ? 'Our servers are experiencing issues. We\'re working to fix this.'
                  : 'A service error occurred. This is usually temporary.'
            }
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
              Return to Dashboard
            </Button>
          </Link>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Service Status:
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center justify-between">
                <span>Database:</span>
                <span className={isDatabaseError ? 'text-red-500' : 'text-green-500'}>
                  {isDatabaseError ? 'Issues detected' : 'Operational'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Network:</span>
                <span className={isNetworkError ? 'text-red-500' : 'text-green-500'}>
                  {isNetworkError ? 'Connection issues' : 'Connected'}
                </span>
              </div>
            </div>
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
