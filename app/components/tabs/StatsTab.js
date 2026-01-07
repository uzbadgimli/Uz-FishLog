'use client'

import styles from '@/app/FishLog.module.css'
import { useLanguage } from '@/app/context/LanguageContext'

export default function StatsTab({
  theme,
  isDarkMode,
  user,
  catches,
  setShowAuthModal
}) {
  const { t, language } = useLanguage()

  return (
    <div>
      <div className={styles.pageTitle}>
        <h2 style={{ color: theme.text }}>{t('stats.title')}</h2>
        <p style={{ color: theme.textSecondary }}>{t('stats.subtitle')}</p>
      </div>

      {!user ? (
        /* Giris yapilmamis uyarisi */
        <div style={{
          background: theme.cardBg,
          borderRadius: '1rem',
          padding: '3rem 2rem',
          textAlign: 'center',
          border: `1px solid ${theme.cardBorder}`
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h3 style={{ color: theme.text, marginBottom: '0.5rem' }}>{t('auth.loginRequired')}</h3>
          <p style={{ color: theme.textSecondary, marginBottom: '1.5rem' }}>
            {t('auth.loginRequiredDesc')}
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            style={{
              background: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {t('auth.loginRegisterButton')}
          </button>
        </div>
      ) : catches.length === 0 ? (
        <div className={styles.emptyState}>
          <div className="icon">📊</div>
          <h3>{t('stats.noCatchesYet')}</h3>
          <p>{t('stats.addCatchesToSeeStats')}</p>
        </div>
      ) : (
        <>
          {/* Genel Istatistikler */}
          <div style={{
            background: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
            borderRadius: '1rem',
            padding: '1.5rem',
            color: 'white',
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>{t('stats.overview')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{catches.length}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{t('stats.totalCatches')}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {[...new Set(catches.map(c => c.species))].length}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{t('stats.differentSpecies')}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {[...new Set(catches.map(c => c.location))].length}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{t('stats.differentLocations')}</div>
              </div>
            </div>
          </div>

          {/* Boy/Agirlik Istatistikleri */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '1rem',
            padding: '1rem',
            border: `1px solid ${theme.cardBorder}`,
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
              {t('catches.length')} & {t('catches.weight')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{
                background: isDarkMode ? '#166534' : '#F0FDF4',
                padding: '1rem',
                borderRadius: '0.75rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#86EFAC' : '#166534', marginBottom: '0.25rem' }}>{t('stats.biggestCatch')}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#86EFAC' : '#166534' }}>
                  {Math.max(...catches.map(c => c.length_cm))} cm
                </div>
                <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                  {catches.find(c => c.length_cm === Math.max(...catches.map(c => c.length_cm)))?.species}
                </div>
              </div>
              <div style={{
                background: isDarkMode ? '#78350F' : '#FEF3C7',
                padding: '1rem',
                borderRadius: '0.75rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#FCD34D' : '#92400E', marginBottom: '0.25rem' }}>{t('stats.averageSize')}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#FCD34D' : '#92400E' }}>
                  {Math.round(catches.reduce((sum, c) => sum + c.length_cm, 0) / catches.length)} cm
                </div>
                <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                  {catches.filter(c => c.weight_gr).length > 0 &&
                    `${Math.round(catches.filter(c => c.weight_gr).reduce((sum, c) => sum + c.weight_gr, 0) / catches.filter(c => c.weight_gr).length)} gr ${language === 'en' ? 'avg' : 'ort'}.`
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Tur Dagilimi */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '1rem',
            padding: '1rem',
            border: `1px solid ${theme.cardBorder}`,
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
              {t('stats.speciesDistribution')}
            </h3>
            {(() => {
              const speciesCount = catches.reduce((acc, c) => {
                acc[c.species] = (acc[c.species] || 0) + 1
                return acc
              }, {})
              const sorted = Object.entries(speciesCount).sort((a, b) => b[1] - a[1])
              const maxCount = Math.max(...Object.values(speciesCount))
              const colors = ['#60A5FA', '#A78BFA', '#F472B6', '#FB923C', '#4ADE80']

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {sorted.map(([species, count], idx) => (
                    <div key={species}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: '600', color: isDarkMode ? '#60A5FA' : '#1E3A8A', textTransform: 'uppercase' }}>{species}</span>
                        <span style={{ fontWeight: 'bold', color: colors[idx % colors.length] }}>{count}</span>
                      </div>
                      <div style={{
                        height: '8px',
                        background: isDarkMode ? '#475569' : '#E2E8F0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${(count / maxCount) * 100}%`,
                          background: colors[idx % colors.length],
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>

          {/* En Basarili Yerler */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '1rem',
            padding: '1rem',
            border: `1px solid ${theme.cardBorder}`,
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
              {t('stats.topLocations')}
            </h3>
            {(() => {
              const locationCount = catches.reduce((acc, c) => {
                acc[c.location] = (acc[c.location] || 0) + 1
                return acc
              }, {})
              const sorted = Object.entries(locationCount).sort((a, b) => b[1] - a[1]).slice(0, 5)
              const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣']

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {sorted.map(([location, count], idx) => (
                    <div key={location} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: idx === 0 ? (isDarkMode ? '#78350F' : '#FEF3C7') : (isDarkMode ? '#334155' : '#F8FAFC'),
                      borderRadius: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{medals[idx]}</span>
                        <span style={{ fontWeight: '600', color: isDarkMode ? '#60A5FA' : '#1E3A8A' }}>{location}</span>
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#FB923C' }}>{count}</span>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>

          {/* En Basarili Saatler */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '1rem',
            padding: '1rem',
            border: `1px solid ${theme.cardBorder}`
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
              {t('stats.timeDistribution')}
            </h3>
            {(() => {
              const hourCount = catches.reduce((acc, c) => {
                if (c.hunt_date) {
                  const hour = new Date(c.hunt_date).getHours()
                  const period = hour < 6 ? 'night' :
                                hour < 12 ? 'morning' :
                                hour < 18 ? 'afternoon' : 'evening'
                  acc[period] = (acc[period] || 0) + 1
                }
                return acc
              }, {})
              const periods = ['morning', 'afternoon', 'evening', 'night']
              const icons = { 'morning': '🌅', 'afternoon': '☀️', 'evening': '🌇', 'night': '🌙' }
              const labels = {
                morning: t('stats.morning'),
                afternoon: t('stats.afternoon'),
                evening: t('stats.evening'),
                night: t('stats.night')
              }
              const total = Object.values(hourCount).reduce((a, b) => a + b, 0)

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {periods.map(period => {
                    const count = hourCount[period] || 0
                    const percent = total > 0 ? Math.round((count / total) * 100) : 0
                    return (
                      <div key={period} style={{
                        padding: '1rem',
                        background: isDarkMode ? '#334155' : '#F8FAFC',
                        borderRadius: '0.75rem',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icons[period]}</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{count}</div>
                        <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{labels[period]}</div>
                        <div style={{ fontSize: '0.625rem', color: isDarkMode ? '#64748B' : '#94A3B8' }}>%{percent}</div>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </div>
        </>
      )}
    </div>
  )
}
