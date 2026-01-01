'use client'

import { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'

export default function AuthModal({ isOpen, onClose, isDarkMode }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { signIn, signUp, signInWithGoogle } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const result = await signIn(email, password)
        if (result.error) {
          setError(result.error)
        } else {
          onClose()
          resetForm()
        }
      } else {
        const result = await signUp(email, password)
        if (result.error) {
          setError(result.error)
        } else {
          setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.')
          setMode('login')
          setPassword('')
        }
      }
    } catch (err) {
      setError('Bir hata oluştu, tekrar deneyin')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const result = await signInWithGoogle()
      if (result.error) {
        setError(result.error)
      }
      // Google OAuth yönlendirecek, modal kapanmasına gerek yok
    } catch (err) {
      setError('Google ile giriş başarısız')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError('')
    setSuccess('')
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
    setSuccess('')
  }

  // Stiller
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
  }

  const modalStyle = {
    backgroundColor: isDarkMode ? '#1E293B' : 'white',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
  }

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: isDarkMode ? '#F1F5F9' : '#1E3A8A',
    marginBottom: '24px',
    textAlign: 'center',
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${isDarkMode ? '#475569' : '#CBD5E1'}`,
    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
    color: isDarkMode ? '#F1F5F9' : '#1E293B',
    fontSize: '1rem',
    marginBottom: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#1E40AF',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1,
    marginBottom: '12px',
  }

  const googleButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? '#334155' : '#F1F5F9',
    color: isDarkMode ? '#F1F5F9' : '#1E293B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: `1px solid ${isDarkMode ? '#475569' : '#CBD5E1'}`,
  }

  const closeButtonStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: isDarkMode ? '#94A3B8' : '#64748B',
    padding: '4px',
    lineHeight: 1,
  }

  const errorStyle = {
    backgroundColor: isDarkMode ? '#7F1D1D' : '#FEE2E2',
    color: isDarkMode ? '#FECACA' : '#991B1B',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '0.875rem',
    textAlign: 'center',
  }

  const successStyle = {
    backgroundColor: isDarkMode ? '#14532D' : '#DCFCE7',
    color: isDarkMode ? '#86EFAC' : '#166534',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '0.875rem',
    textAlign: 'center',
  }

  const linkStyle = {
    color: '#3B82F6',
    cursor: 'pointer',
    textDecoration: 'underline',
  }

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    color: isDarkMode ? '#64748B' : '#94A3B8',
    fontSize: '0.875rem',
  }

  const dividerLineStyle = {
    flex: 1,
    height: '1px',
    backgroundColor: isDarkMode ? '#334155' : '#E2E8F0',
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>
          &times;
        </button>

        <h2 style={titleStyle}>
          {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
        </h2>

        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
            disabled={loading}
            minLength={6}
          />
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Yükleniyor...' : mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>

        <div style={dividerStyle}>
          <div style={dividerLineStyle}></div>
          <span style={{ padding: '0 12px' }}>veya</span>
          <div style={dividerLineStyle}></div>
        </div>

        <button
          type="button"
          style={googleButtonStyle}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google ile Giriş
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: '0.875rem' }}>
          {mode === 'login' ? (
            <>
              Hesabınız yok mu?{' '}
              <span style={linkStyle} onClick={switchMode}>
                Kayıt Ol
              </span>
            </>
          ) : (
            <>
              Zaten hesabınız var mı?{' '}
              <span style={linkStyle} onClick={switchMode}>
                Giriş Yap
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
