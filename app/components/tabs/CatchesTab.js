'use client'

import styles from '@/app/FishLog.module.css'

export default function CatchesTab({
  theme,
  isDarkMode,
  user,
  catches,
  // Form state
  species,
  setSpecies,
  lengthCm,
  setLengthCm,
  weightGr,
  setWeightGr,
  location,
  setLocation,
  huntDate,
  setHuntDate,
  huntTime,
  setHuntTime,
  notes,
  setNotes,
  // Handlers
  addCatch,
  setShowAuthModal
}) {
  return (
    <div>
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
          <h3 style={{ color: theme.text, marginBottom: '0.5rem' }}>Giris Yapin</h3>
          <p style={{ color: theme.textSecondary, marginBottom: '1.5rem' }}>
            Avlarinizi kaydetmek ve goruntulemek icin giris yapmalisiniz.
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
      ) : (
        <>
          {/* Yeni Av Formu */}
          <div className={styles.formCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 style={{ color: theme.text }}>+ Yeni Av Ekle</h3>
            <form onSubmit={addCatch}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>Balik Turu *</label>
                <input
                  type="text"
                  placeholder="Levrek, Cupra, Lufer..."
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className={styles.formInput}
                  style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>Boy (cm) *</label>
                  <input
                    type="number"
                    placeholder="45"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(e.target.value)}
                    className={styles.formInput}
                    style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>Agirlik (gr)</label>
                  <input
                    type="number"
                    placeholder="1200"
                    value={weightGr}
                    onChange={(e) => setWeightGr(e.target.value)}
                    className={styles.formInput}
                    style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>Tutulan Yer *</label>
                <input
                  type="text"
                  placeholder="Kumbag, Sile, Bogaz..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={styles.formInput}
                  style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>Tarih *</label>
                  <input
                    type="date"
                    value={huntDate}
                    onChange={(e) => setHuntDate(e.target.value)}
                    className={styles.formInput}
                    style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>Saat *</label>
                  <input
                    type="time"
                    value={huntTime}
                    onChange={(e) => setHuntTime(e.target.value)}
                    className={styles.formInput}
                    style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>Notlar</label>
                <textarea
                  placeholder="Olta takimi, yem, hava durumu, teknik..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={styles.formInput}
                  style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                  rows="3"
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Av Kaydini Ekle
              </button>
            </form>
          </div>

          {/* Tum Avlar Listesi */}
          {catches.length > 0 && (
            <div className={styles.catchesCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className={styles.catchesHeader}>
                <h3 style={{ color: theme.text }}>Tum Avlarim ({catches.length})</h3>
              </div>
              <div>
                {catches.map((c) => (
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
                    {/* Ilk satir: Tur ve Olculer */}
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

                    {/* Ikinci satir: Yer ve Tarih */}
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

                    {/* Not */}
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

          {catches.length === 0 && (
            <div className={styles.emptyState}>
              <div className="icon">🎣</div>
              <h3>Henuz Av Kaydi Yok</h3>
              <p>Yukaridaki formu kullanarak ilk avini ekle!</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
