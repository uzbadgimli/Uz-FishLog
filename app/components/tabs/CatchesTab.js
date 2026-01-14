'use client'

import { useState } from 'react'
import styles from '@/app/FishLog.module.css'
import { useLanguage } from '@/app/context/LanguageContext'
import { getFishList } from '@/app/data/fishSpecies'

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
  // Photo state
  photoFile,
  setPhotoFile,
  photoPreview,
  setPhotoPreview,
  uploadingPhoto,
  // Handlers
  addCatch,
  setShowAuthModal,
  // Edit/Delete handlers
  editingCatch,
  setEditingCatch,
  updateCatch,
  deleteCatch
}) {
  const { t, language } = useLanguage()
  const [showOtherInput, setShowOtherInput] = useState(false)
  const fishList = getFishList(language)

  const handleSpeciesChange = (value) => {
    if (value === '__other__') {
      setShowOtherInput(true)
      setSpecies('')
    } else {
      setShowOtherInput(false)
      setSpecies(value)
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert(t('catches.maxFileSize'))
      return
    }

    setPhotoFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
  }

  return (
    <div>
      <div className={styles.pageTitle}>
        <h2 style={{ color: theme.text }}>{t('catches.title')}</h2>
        <p style={{ color: theme.textSecondary }}>{t('catches.subtitle')}</p>
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
      ) : (
        <>
          {/* Yeni Av Formu */}
          <div className={styles.formCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
            <h3 style={{ color: theme.text }}>
              {editingCatch ? `✏️ ${t('catches.editing')}` : `+ ${t('catches.addNew')}`}
            </h3>
            <form onSubmit={editingCatch ? updateCatch : addCatch}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{t('catches.species')} *</label>
                {!showOtherInput ? (
                  <select
                    value={species}
                    onChange={(e) => handleSpeciesChange(e.target.value)}
                    className={styles.formInput}
                    style={{
                      background: theme.inputBg,
                      borderColor: theme.inputBorder,
                      color: theme.text,
                      cursor: 'pointer'
                    }}
                    required
                  >
                    <option value="">{t('catches.selectSpecies')}</option>
                    <optgroup label={t('catches.popularFish')}>
                      {fishList.popular.map(fish => (
                        <option key={fish} value={fish}>{fish}</option>
                      ))}
                    </optgroup>
                    <optgroup label={t('catches.allFish')}>
                      {fishList.alphabetical.map(fish => (
                        <option key={fish} value={fish}>{fish}</option>
                      ))}
                    </optgroup>
                    <option value="__other__">{fishList.otherLabel}</option>
                  </select>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder={t('catches.speciesPlaceholder')}
                      value={species}
                      onChange={(e) => setSpecies(e.target.value)}
                      className={styles.formInput}
                      style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text, flex: 1 }}
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowOtherInput(false)
                        setSpecies('')
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: isDarkMode ? '#475569' : '#94A3B8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}
                    >
                      {t('catches.backToList')}
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{t('catches.length')} *</label>
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
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{t('catches.weight')}</label>
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
                <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{t('catches.location')} *</label>
                <input
                  type="text"
                  placeholder={t('catches.locationPlaceholder')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={styles.formInput}
                  style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{t('catches.date')} *</label>
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
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{t('catches.time')} *</label>
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
                <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{t('catches.notes')}</label>
                <textarea
                  placeholder={t('catches.notesPlaceholder')}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={styles.formInput}
                  style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                  rows="3"
                />
              </div>

              {/* Fotograf Yukleme */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{t('catches.photo')}</label>
                {!photoPreview ? (
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1.5rem',
                    background: theme.inputBg,
                    border: `2px dashed ${theme.inputBorder}`,
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>📷</span>
                    <span style={{ color: theme.textSecondary }}>{t('catches.addPhoto')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                ) : (
                  <div style={{
                    position: 'relative',
                    borderRadius: '0.75rem',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={photoPreview}
                      alt="Preview"
                      style={{
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'cover',
                        borderRadius: '0.75rem'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      right: '0.5rem',
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <label style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}>
                        {t('catches.changePhoto')}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={removePhoto}
                        style={{
                          padding: '0.5rem 0.75rem',
                          background: 'rgba(239,68,68,0.9)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        {t('catches.removePhoto')}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" className={styles.submitButton} disabled={uploadingPhoto} style={{ flex: 1 }}>
                  {uploadingPhoto ? t('catches.uploadingPhoto') : (editingCatch ? t('common.save') : t('catches.submit'))}
                </button>
                {editingCatch && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCatch(null)
                      setSpecies('')
                      setLengthCm('')
                      setWeightGr('')
                      setLocation('')
                      setNotes('')
                      setHuntDate(new Date().toISOString().split('T')[0])
                      setHuntTime(new Date().toTimeString().slice(0, 5))
                      setPhotoFile(null)
                      setPhotoPreview(null)
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: isDarkMode ? '#475569' : '#94A3B8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {t('common.cancel')}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tum Avlar Listesi */}
          {catches.length > 0 && (
            <div className={styles.catchesCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className={styles.catchesHeader}>
                <h3 style={{ color: theme.text }}>{t('catches.allCatches')} ({catches.length})</h3>
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
                          ? new Date(c.hunt_date).toLocaleString(language === 'en' ? 'en-GB' : 'tr-TR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : new Date(c.created_at).toLocaleDateString(language === 'en' ? 'en-GB' : 'tr-TR')
                        }
                      </span>
                    </div>

                    {/* Fotograf */}
                    {c.photo_url && (
                      <div style={{
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: `1px solid ${theme.cardBorder}`
                      }}>
                        <img
                          src={c.photo_url}
                          alt={c.species}
                          style={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '0.5rem'
                          }}
                        />
                      </div>
                    )}

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

                    {/* Düzenle / Sil Butonları */}
                    <div style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: `1px solid ${theme.cardBorder}`,
                      display: 'flex',
                      gap: '0.5rem',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => {
                          setEditingCatch(c)
                          setSpecies(c.species)
                          setLengthCm(c.length_cm?.toString() || '')
                          setWeightGr(c.weight_gr?.toString() || '')
                          setLocation(c.location)
                          setNotes(c.notes || '')
                          if (c.hunt_date) {
                            const date = new Date(c.hunt_date)
                            setHuntDate(date.toISOString().split('T')[0])
                            setHuntTime(date.toTimeString().slice(0, 5))
                          }
                          setPhotoPreview(c.photo_url || null)
                          setPhotoFile(null)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          background: isDarkMode ? '#3B82F6' : '#1E40AF',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        ✏️ {t('common.edit')}
                      </button>
                      <button
                        onClick={() => deleteCatch(c.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: isDarkMode ? '#DC2626' : '#EF4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        🗑️ {t('common.delete')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {catches.length === 0 && (
            <div className={styles.emptyState}>
              <div className="icon">🎣</div>
              <h3>{t('catches.noCatches')}</h3>
              <p>{t('catches.addFirst')}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
