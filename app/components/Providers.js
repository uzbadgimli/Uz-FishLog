'use client'

import { AuthProvider } from '@/app/context/AuthContext'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LanguageProvider>
  )
}
