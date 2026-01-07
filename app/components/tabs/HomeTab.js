'use client'

import styles from '@/app/FishLog.module.css'
import { getWeatherIcon, getWindDirection } from '@/app/utils/helpers'
import { getFishSuggestion } from '@/app/utils/fishSuggestions'
import { useLanguage } from '@/app/context/LanguageContext'

export default function HomeTab({
  theme,
  isDarkMode,
  weather,
  catches,
  todaysCatches,
  setActiveTab,
  user,
  userFavorites,
  setDefaultLocation
}) {
  const { t, language } = useLanguage()

  return (
    <div>
      <div className={styles.pageTitle}>
        <h2 style={{ color: theme.text }}>{t('home.welcome')}</h2>
        <p style={{ color: theme.textSecondary }}>{t('home.subtitle')}</p>
      </div>

      {/* Bugunku vs Toplam */}
      <div className={styles.statsContainer}>
        <div className={styles.todayCard}>
          <h3>{t('home.today')}</h3>
          <div className="number">{todaysCatches.length}</div>
          <div className="label">{t('home.catchCount')}</div>
        </div>
        <div className={styles.totalCard}>
          <h3>{t('home.total')}</h3>
          <div className="number">{catches.length}</div>
          <div className="label">{t('home.allCatches')}</div>
        </div>
      </div>

      {/* Hava Durumu */}
      {weather && (
        <div className={styles.weatherCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className={styles.weatherCardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ color: theme.text, margin: 0 }}>{weather.locationName || 'Istanbul Kartal'}</h3>
              {user && userFavorites && userFavorites.length > 0 && (
                <select
                  onChange={(e) => setDefaultLocation(e.target.value || null)}
                  value={userFavorites.find(f => f.is_default)?.id || ''}
                  style={{
                    background: isDarkMode ? '#334155' : '#EFF6FF',
                    color: isDarkMode ? '#94A3B8' : '#1E40AF',
                    border: `1px solid ${isDarkMode ? '#475569' : '#BFDBFE'}`,
                    borderRadius: '0.375rem',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                  title={t('home.changeLocation')}
                >
                  <option value="">{t('home.defaultLocation')}</option>
                  {userFavorites.map(fav => (
                    <option key={fav.id} value={fav.id}>{fav.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="weatherIcon">{getWeatherIcon(weather.current.weather_code)}</div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.75rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                {Math.round(weather.current.temperature_2m)}°C
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{t('weather.temperature')}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                {Math.round(weather.current.wind_speed_10m)}
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{t('weather.wind')}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                {getWindDirection(weather.current.wind_direction_10m, language)}
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{t('weather.direction')}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                {weather.marine?.wave_height?.[0]
                  ? `${Math.round(weather.marine.wave_height[0] * 100)}cm`
                  : '0cm'}
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{t('weather.wave')}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                {Math.round(weather.current.relative_humidity_2m)}%
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{t('weather.humidity')}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                {Math.round(weather.current.pressure_msl)}
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{t('weather.pressure')}</div>
            </div>
          </div>
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: isDarkMode ? '#334155' : '#EFF6FF',
            borderRadius: '0.75rem'
          }}>
            <h4 style={{ color: theme.text, marginBottom: '0.5rem' }}>{t('home.fishSuggestion')}</h4>
            <p style={{ marginBottom: '0.75rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
              {getFishSuggestion(weather.current.temperature_2m, weather.current.wind_speed_10m, language).fish}
            </p>
            <div style={{
              paddingTop: '0.75rem',
              borderTop: `1px solid ${isDarkMode ? '#475569' : 'rgba(30, 64, 175, 0.2)'}`
            }}>
              <strong style={{ fontSize: '0.875rem', color: theme.text }}>{t('home.baitSuggestion')}</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                {getFishSuggestion(weather.current.temperature_2m, weather.current.wind_speed_10m, language).bait}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Yeni Av Ekle */}
      <button
        onClick={() => setActiveTab('catches')}
        className={styles.addButton}
      >
        {t('home.addCatch')}
      </button>

      {/* Son Avlar */}
      {catches.length > 0 && (
        <div className={styles.catchesCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
          <div className={styles.catchesHeader}>
            <h3 style={{ color: theme.text }}>{t('home.recentCatches')}</h3>
            <button
              onClick={() => setActiveTab('catches')}
              className={styles.viewAllButton}
            >
              {t('home.viewAll')}
            </button>
          </div>
          <div>
            {catches.slice(0, 3).map((c) => (
              <div
                key={c.id}
                style={{
                  padding: '1rem',
                  background: isDarkMode ? '#334155' : '#F8FAFC',
                  borderRadius: '0.75rem',
                  marginBottom: '0.75rem',
                  borderLeft: '4px solid #FB923C'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontWeight: 'bold',
                    color: isDarkMode ? '#60A5FA' : '#1E40AF',
                    fontSize: '1.125rem',
                    textTransform: 'uppercase'
                  }}>
                    {c.species}
                  </span>
                  <span style={{
                    fontWeight: 'bold',
                    color: '#FB923C',
                    fontSize: '1rem',
                    whiteSpace: 'nowrap'
                  }}>
                    {c.length_cm} CM {c.weight_gr && `${c.weight_gr} GRAM`}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}>
                  <span style={{
                    color: isDarkMode ? '#60A5FA' : '#1E40AF',
                    fontSize: '1.125rem', fontWeight: 'bold'
                  }}>
                    {c.location}
                  </span>
                  <span style={{
                    color: theme.textSecondary,
                    fontSize: '1rem', fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    {c.hunt_date
                      ? new Date(c.hunt_date).toLocaleString('tr-TR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : new Date(c.created_at).toLocaleDateString('tr-TR')
                    }
                  </span>
                </div>

                {c.notes && (
                  <div style={{
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: `1px solid ${theme.cardBorder}`,
                    fontSize: '1rem',
                    color: isDarkMode ? '#94A3B8' : '#475569',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    {c.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
