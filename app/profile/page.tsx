'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { supabase } from '@/lib/supabase'

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name)
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      })

      if (error) throw error
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Alert>
          <AlertDescription>Please sign in to view your profile.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-12">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Your Profile</CardTitle>
          <CardDescription className="text-gray-600">Manage your account information</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert 
              variant={message.type === 'error' ? 'destructive' : 'default'} 
              className={message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : ''}
            >
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={user.email || ''} 
                  disabled 
                  className="bg-gray-100 text-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-800">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white text-gray-900 border-gray-300"
                />
              </div>
              <Button 
                type="submit" 
                disabled={saving}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-500">
            Account created: {new Date(user.created_at).toLocaleDateString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
