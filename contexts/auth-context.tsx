'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const setData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error(error)
          setIsLoading(false)
          return
        }
        
        setSession(data.session)
        setUser(data.session?.user ?? null)
        setIsLoading(false)
      } catch (err) {
        console.error(err)
        setIsLoading(false)
      }
    }

    // Set up auth state change listener
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    setData()

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
