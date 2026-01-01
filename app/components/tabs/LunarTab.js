'use client'

import styles from '@/app/FishLog.module.css'
import { getMoonFishSuggestion } from '@/app/utils/fishSuggestions'
import { getSolunarData, getCalendarDays } from '@/app/utils/moonPhase'

export default function LunarTab({
  theme,
  isDarkMode,
  user,
  selectedDay,
  setSelectedDay,
  setShowAuthModal
}) {
  // Login kontrolu
  if (!user) {
    return (
      <div>
        <div className={styles.pageTitle}>
          <h2 style={{ color: theme.text }}>Balik Aktivite Takvimi</h2>
          <p style={{ color: theme.textSecondary }}>Ay fazlari ve solunar zamanlar</p>
        </div>
        <div style={{
          background: theme.cardBg,
          borderRadius: '1rem',
          padding: '3rem 2rem',
          textAlign: 'center',
          border: `1px solid ${theme.cardBorder}`
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h3 style={{ color: theme.text, marginBottom: '0.5rem' }}>Giris Yapin</h3>
          <p style={{ color: theme.textSecondary, marginBottom: '1.5rem' }}>
            Aktivite takvimi icin giris yapmalisiniz.
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
            Giris Yap / Kayit Ol
          </button>
        </div>
      </div>
    )
  }

  const todaySolunar = getSolunarData(new Date())
  const moonTip = getMoonFishSuggestion(todaySolunar.phase)

  return (
    <div>
      <div className={styles.pageTitle}>
        <h2 style={{ color: theme.text }}>Balik Aktivite Takvimi</h2>
        <p style={{ color: theme.textSecondary }}>Ay fazlari ve solunar zamanlar</p>
      </div>

      {/* Bugunun Ozeti */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #312E81 100%)',
        borderRadius: '1rem',
        padding: '1.5rem',
        color: 'white',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Bugun</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>{todaySolunar.icon}</div>
            <div style={{ fontSize: '0.875rem' }}>{todaySolunar.name}</div>
          </div>
        </div>

        {/* Aktivite Skoru */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem' }}>Balik Aktivitesi</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{todaySolunar.activityScore}/10</span>
          </div>
          <div style={{
            height: '8px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${parseFloat(todaySolunar.activityScore) * 10}%`,
              background: parseFloat(todaySolunar.activityScore) >= 7 ? '#22C55E' :
                parseFloat(todaySolunar.activityScore) >= 5 ? '#FBBF24' : '#EF4444',
              borderRadius: '4px',
              transition: 'width 0.3s'
            }}></div>
          </div>
          <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.8 }}>
            {parseFloat(todaySolunar.activityScore) >= 8 ? 'Mukemmel av gunu!' :
              parseFloat(todaySolunar.activityScore) >= 6 ? 'Iyi aktivite bekleniyor' :
                'Orta duzey aktivite'}
          </div>
        </div>

        {/* Ay Dogus/Batis */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🌄</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{todaySolunar.moonrise}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Ay Dogusu</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🌙</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{todaySolunar.moonset}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Ay Batisi</div>
          </div>
        </div>
      </div>

      {/* Solunar Zamanlar */}
      <div style={{
        background: theme.cardBg,
        borderRadius: '1rem',
        padding: '1rem',
        border: `1px solid ${theme.cardBorder}`,
        marginBottom: '1rem'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
          En Iyi Avlanma Saatleri
        </h3>

        {/* Major Periyotlar */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              background: '#22C55E',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>MAJOR</span>
            <span style={{ fontSize: '0.75rem', color: theme.textSecondary }}>2 saat - Yuksek aktivite</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{
              background: isDarkMode ? '#166534' : '#DCFCE7',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontWeight: 'bold',
              color: isDarkMode ? '#86EFAC' : '#166534'
            }}>
              {todaySolunar.major1}
            </div>
            <div style={{
              background: isDarkMode ? '#166534' : '#DCFCE7',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontWeight: 'bold',
              color: isDarkMode ? '#86EFAC' : '#166534'
            }}>
              {todaySolunar.major2}
            </div>
          </div>
        </div>

        {/* Minor Periyotlar */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              background: '#FBBF24',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>MINOR</span>
            <span style={{ fontSize: '0.75rem', color: theme.textSecondary }}>1 saat - Orta aktivite</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{
              background: isDarkMode ? '#78350F' : '#FEF3C7',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontWeight: 'bold',
              color: isDarkMode ? '#FCD34D' : '#92400E'
            }}>
              {todaySolunar.minor1}
            </div>
            <div style={{
              background: isDarkMode ? '#78350F' : '#FEF3C7',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontWeight: 'bold',
              color: isDarkMode ? '#FCD34D' : '#92400E'
            }}>
              {todaySolunar.minor2}
            </div>
          </div>
        </div>
      </div>

      {/* Ay Fazina Gore Balik Tavsiyesi */}
      <div style={{
        background: theme.cardBg,
        borderRadius: '1rem',
        padding: '1rem',
        border: `1px solid ${theme.cardBorder}`,
        marginBottom: '1rem'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
          {moonTip.title}
        </h3>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>Aktif Baliklar</div>
          <div style={{ fontWeight: '600', color: isDarkMode ? '#60A5FA' : '#1E3A8A' }}>{moonTip.fish}</div>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>Tavsiye</div>
          <div style={{ fontSize: '0.875rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>{moonTip.tip}</div>
        </div>

        <div style={{
          background: isDarkMode ? '#166534' : '#F0FDF4',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          borderLeft: '3px solid #22C55E'
        }}>
          <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#86EFAC' : '#166534', marginBottom: '0.25rem' }}>Onerilen Yemler</div>
          <div style={{ fontSize: '0.875rem', fontWeight: '600', color: isDarkMode ? '#86EFAC' : '#166534' }}>{moonTip.bait}</div>
        </div>
      </div>

      {/* Ay Fazlari Takvimi */}
      <div style={{
        background: theme.cardBg,
        borderRadius: '1rem',
        padding: '1rem',
        border: `1px solid ${theme.cardBorder}`
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
          Ay Fazlari Takvimi
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '0.5rem'
        }}>
          {getCalendarDays().map((day, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: day.isToday ? '#1E40AF' : selectedDay?.dayNum === day.dayNum && selectedDay?.month === day.month ? (isDarkMode ? '#334155' : '#DBEAFE') : (isDarkMode ? '#334155' : '#F8FAFC'),
                color: day.isToday ? 'white' : (isDarkMode ? '#60A5FA' : '#1E3A8A'),
                border: day.isToday ? 'none' : `1px solid ${theme.cardBorder}`,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '0.625rem', opacity: 0.7 }}>{day.dayName}</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{day.dayNum}</div>
              <div style={{ fontSize: '1.25rem' }}>{day.icon}</div>
              <div style={{
                fontSize: '0.625rem',
                marginTop: '0.25rem',
                padding: '0.125rem 0.25rem',
                borderRadius: '0.25rem',
                background: day.isToday ? 'rgba(255,255,255,0.2)' :
                  parseFloat(day.activityScore) >= 7 ? (isDarkMode ? '#166534' : '#DCFCE7') :
                    parseFloat(day.activityScore) >= 5 ? (isDarkMode ? '#78350F' : '#FEF3C7') : (isDarkMode ? '#7F1D1D' : '#FEE2E2'),
                color: day.isToday ? 'white' :
                  parseFloat(day.activityScore) >= 7 ? (isDarkMode ? '#86EFAC' : '#166534') :
                    parseFloat(day.activityScore) >= 5 ? (isDarkMode ? '#FCD34D' : '#92400E') : (isDarkMode ? '#FCA5A5' : '#991B1B')
              }}>
                {day.activityScore}
              </div>
            </div>
          ))}
        </div>

        {/* Secili Gun Detayi */}
        {selectedDay && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: isDarkMode ? '#334155' : '#F8FAFC',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #1E40AF'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                  {selectedDay.dayNum} {selectedDay.month} - {selectedDay.dayName}
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
                  {selectedDay.name}
                </div>
              </div>
              <div style={{ fontSize: '2rem' }}>{selectedDay.icon}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem', color: isDarkMode ? '#CBD5E1' : 'inherit' }}>
              <div><strong>Aktivite:</strong> {selectedDay.activityScore}/10</div>
              <div><strong>Ay Dogusu:</strong> {selectedDay.moonrise}</div>
              <div><strong>Major:</strong> {selectedDay.major1}</div>
              <div><strong>Minor:</strong> {selectedDay.minor1}</div>
            </div>
          </div>
        )}
      </div>

      {/* Bilgi Notu */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: isDarkMode ? '#1E3A5F' : '#EFF6FF',
        borderRadius: '0.75rem',
        fontSize: '0.875rem',
        color: isDarkMode ? '#93C5FD' : '#1E40AF'
      }}>
        <strong>Solunar Teorisi:</strong> Baliklar ay ve gunesin konumuna gore belirli saatlerde daha aktif olur.
        <strong> Major</strong> periyotlarda (ay tepe/dip noktasinda) en yuksek aktivite,
        <strong> Minor</strong> periyotlarda (ay dogus/batis) orta duzey aktivite beklenir.
      </div>
    </div>
  )
}
