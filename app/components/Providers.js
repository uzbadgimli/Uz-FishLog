'use client'

import { AuthProvider } from '@/app/context/AuthContext'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
