'use client'

import styles from '@/app/FishLog.module.css'

export default function TopBar({
  weather,
  moonPhase,
  isDarkMode,
  setIsDarkMode,
  user,
  signOut,
  setShowAuthModal,
  theme
}) {
  return (
    <div className={styles.topBar} style={{ background: theme.topBar }}>
      <div className={styles.topBarContent}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🎣</div>
          <div className={styles.logoText}>
            <h1>UZ FishLog</h1>
            <p>Profesyonel Av Takip Sistemi</p>
          </div>
        </div>
        <div className={styles.quickInfo}>
          {weather && (
            <div className={styles.weatherMini}>
              <div>{Math.round(weather.current.temperature_2m)}°C</div>
              <div>💨 {Math.round(weather.current.wind_speed_10m)} km/s</div>
            </div>
          )}
          <div className={styles.moonIcon}>{moonPhase.icon}</div>
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: isDarkMode ? '#334155' : 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: '1.25rem',
              marginLeft: '0.5rem',
              transition: 'all 0.3s'
            }}
            title={isDarkMode ? 'Açık Tema' : 'Koyu Tema'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Auth Button */}
          {user ? (
            <button
              onClick={async () => {
                await signOut()
              }}
              style={{
                background: isDarkMode ? '#334155' : 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                marginLeft: '0.5rem',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              title="Çıkış Yap"
            >
              <span style={{ fontSize: '0.875rem' }}>👤</span>
              <span style={{ maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.email?.split('@')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              style={{
                background: '#10B981',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                marginLeft: '0.5rem',
                color: 'white',
                fontWeight: '600'
              }}
            >
              Giriş Yap
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
