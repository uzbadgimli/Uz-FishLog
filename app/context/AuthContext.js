'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext({})

// Türkçe hata mesajları
function translateError(error) {
  const message = error?.message || error?.error_description || 'Bir hata oluştu'

  const translations = {
    'Invalid login credentials': 'Email veya şifre hatalı',
    'User already registered': 'Bu email zaten kayıtlı',
    'Password should be at least 6 characters': 'Şifre en az 6 karakter olmalı',
    'Email not confirmed': 'Email onaylanmamış',
    'Invalid email': 'Geçersiz email adresi',
    'Signup requires a valid password': 'Geçerli bir şifre giriniz',
    'Unable to validate email address: invalid format': 'Geçersiz email formatı',
    'Email rate limit exceeded': 'Çok fazla deneme, lütfen bekleyin',
    'For security purposes, you can only request this once every 60 seconds': 'Güvenlik nedeniyle 60 saniye bekleyin',
  }

  for (const [eng, tr] of Object.entries(translations)) {
    if (message.toLowerCase().includes(eng.toLowerCase())) {
      return tr
    }
  }

  // Network hataları
  if (message.includes('fetch') || message.includes('network') || message.includes('Failed')) {
    return 'Bağlantı hatası, tekrar deneyin'
  }

  return message
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mevcut session'ı kontrol et
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Session error:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Auth state değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Email + Şifre ile kayıt
  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { error: translateError(error) }
      }

      return { data }
    } catch (error) {
      return { error: translateError(error) }
    }
  }

  // Email + Şifre ile giriş
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: translateError(error) }
      }

      return { data }
    } catch (error) {
      return { error: translateError(error) }
    }
  }

  // Google ile giriş (popup mode)
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        return { error: translateError(error) }
      }

      return { data }
    } catch (error) {
      return { error: translateError(error) }
    }
  }

  // Çıkış
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        return { error: translateError(error) }
      }
      return { success: true }
    } catch (error) {
      return { error: translateError(error) }
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
