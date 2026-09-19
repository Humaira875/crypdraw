'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User as SupabaseUser } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  wallet_address: string
  role: 'user' | 'admin'
  balance: number
}

interface AuthContextType {
  user: User | null
  supabaseUser: SupabaseUser | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, walletAddress: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)

  // Only initialize Supabase client if environment variables are available
  const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createClientComponentClient()
    : null

  useEffect(() => {
    if (!supabase) return

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setSupabaseUser(session.user)
        await fetchUserProfile(session.user.id)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user)
        await fetchUserProfile(session.user.id)
      } else {
        setSupabaseUser(null)
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const fetchUserProfile = async (userId: string) => {
    if (!supabase) return

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) {
      setUser(data as User)
    } else if (error) {
      // If user profile doesn't exist, create it
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: supabaseUser?.email,
          wallet_address: '',
          role: 'user',
          balance: 0,
        })
        .select()
        .single()

      if (newUser) {
        setUser(newUser as User)
      }
    }
  }

  const login = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    // Simulate $1 cut on login (demo)
    if (data.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('balance')
        .eq('id', data.user.id)
        .single()

      if (userData) {
        await supabase
          .from('users')
          .update({ balance: userData.balance - 1 })
          .eq('id', data.user.id)
      }
    }
  }

  const signup = async (email: string, password: string, walletAddress: string) => {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      throw error
    }

    // Create user profile with $1 cut (demo)
    if (data.user) {
      const { data: newUser, error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email,
          wallet_address: walletAddress,
          role: 'user',
          balance: 10 - 1, // $1 cut on signup
        })
        .select()
        .single()

      if (profileError) {
        throw profileError
      }

      if (newUser) {
        setUser(newUser as User)
      }
    }
  }

  const logout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setSupabaseUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
