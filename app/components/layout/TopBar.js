'use client'

import styles from '@/app/FishLog.module.css'
import { useLanguage } from '@/app/context/LanguageContext'

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
  const { language, changeLanguage, t } = useLanguage()

  return (
    <div className={styles.topBar} style={{ background: theme.topBar }}>
      <div className={styles.topBarContent}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🎣</div>
          <div className={styles.logoText}>
            <h1>{t('header.appName')}</h1>
            <p>{t('header.subtitle')}</p>
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

          {/* Language Toggle */}
          <button
            onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
            style={{
              background: isDarkMode ? '#334155' : 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.4rem 0.5rem',
              cursor: 'pointer',
              fontSize: '0.7rem',
              marginLeft: '0.5rem',
              color: 'white',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
            title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
          >
            {language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
          </button>

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
            title={isDarkMode ? t('common.lightTheme') : t('common.darkTheme')}
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
              title={t('common.logout')}
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
              {t('common.login')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
