'use client'

import styles from '@/app/FishLog.module.css'
import { getWeatherIcon, getWindDirection } from '@/app/utils/helpers'
import { getFishSuggestion } from '@/app/utils/fishSuggestions'

export default function WeatherTab({
  theme,
  isDarkMode,
  user,
  weatherMode,
  setWeatherMode,
  selectedLocation,
  setSelectedLocation,
  weatherData,
  setWeatherData,
  mapClickedLocation,
  setMapClickedLocation,
  userFavorites,
  fetchWeatherForLocation,
  deleteFavorite,
  showSaveFavoriteModal,
  setShowSaveFavoriteModal,
  newFavoriteName,
  setNewFavoriteName,
  saveFavorite,
  savingFavorite,
  MapComponent,
  setShowAuthModal
}) {
  // Login kontrolu
  if (!user) {
    return (
      <div>
        <div className={styles.pageTitle}>
          <h2 style={{ color: theme.text }}>Hava & Deniz Durumu</h2>
          <p style={{ color: theme.textSecondary }}>Detayli hava bilgisi icin giris yapin</p>
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
            Hava durumu ve favori lokasyonlar icin giris yapmalisiniz.
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

  return (
    <div>
      <div className={styles.pageTitle}>
        <h2 style={{ color: theme.text }}>Hava & Deniz Durumu</h2>
        <p style={{ color: theme.textSecondary }}>
          {weatherMode === 'favorites' ? 'Favori yerlerden sec' : 'Haritadan konum sec'}
        </p>
      </div>

      {/* Favori / Harita Toggle */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => {
            setWeatherMode('favorites')
            setMapClickedLocation(null)
          }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: weatherMode === 'favorites' ? '#1E40AF' : (isDarkMode ? '#334155' : 'white'),
            color: weatherMode === 'favorites' ? 'white' : (isDarkMode ? '#60A5FA' : '#1E40AF'),
            border: `2px solid ${isDarkMode ? '#60A5FA' : '#1E40AF'}`,
            borderRadius: '0.75rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Favoriler
        </button>
        <button
          onClick={() => {
            setWeatherMode('map')
            setSelectedLocation(null)
            setWeatherData(null)
          }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: weatherMode === 'map' ? '#1E40AF' : (isDarkMode ? '#334155' : 'white'),
            color: weatherMode === 'map' ? 'white' : (isDarkMode ? '#60A5FA' : '#1E40AF'),
            border: `2px solid ${isDarkMode ? '#60A5FA' : '#1E40AF'}`,
            borderRadius: '0.75rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Haritadan Sec
        </button>
      </div>

      {/* Favoriler Modu */}
      {weatherMode === 'favorites' && (
        <>
          {/* Favori Lokasyonlar - 6 adet gercek koordinatlarla */}
          <div style={{
            marginBottom: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem'
          }}>
            {[
              { name: 'Kumbag', lat: 40.8867, lon: 27.4547 },
              { name: 'Altinova', lat: 40.7000, lon: 29.5000 },
              { name: 'NATO Limani', lat: 40.7697, lon: 29.4547 },
              { name: 'Pendik', lat: 40.8761, lon: 29.2336 },
              { name: 'Sile', lat: 41.1764, lon: 29.6094 },
              { name: 'Atakum', lat: 41.3289, lon: 36.2792 }
            ].map((loc) => (
              <button
                key={loc.name}
                onClick={() => {
                  setSelectedLocation(loc)
                  fetchWeatherForLocation(loc.lat, loc.lon)
                }}
                style={{
                  padding: '0.6rem 0.4rem',
                  background: selectedLocation?.name === loc.name ? '#1E40AF' : (isDarkMode ? '#334155' : 'white'),
                  color: selectedLocation?.name === loc.name ? 'white' : (isDarkMode ? '#60A5FA' : '#1E40AF'),
                  border: `2px solid ${selectedLocation?.name === loc.name ? '#1E40AF' : (isDarkMode ? '#60A5FA' : '#1E40AF')}`,
                  borderRadius: '0.75rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.8rem'
                }}
              >
                {loc.name}
              </button>
            ))}
          </div>

          {/* Kullanici Favorileri */}
          {userFavorites.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{
                color: theme.textSecondary,
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Kaydedilen Favoriler
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {userFavorites.map((fav) => (
                  <div
                    key={fav.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <button
                      onClick={() => {
                        setSelectedLocation({ name: fav.name, lat: fav.lat, lon: fav.lon })
                        fetchWeatherForLocation(fav.lat, fav.lon)
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: selectedLocation?.name === fav.name ? '#1E40AF' : (isDarkMode ? '#334155' : 'white'),
                        color: selectedLocation?.name === fav.name ? 'white' : (isDarkMode ? '#60A5FA' : '#1E40AF'),
                        border: `2px solid ${selectedLocation?.name === fav.name ? '#1E40AF' : (isDarkMode ? '#60A5FA' : '#1E40AF')}`,
                        borderRadius: '0.75rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '0.875rem',
                        textAlign: 'left'
                      }}
                    >
                      {fav.name}
                    </button>
                    <button
                      onClick={() => deleteFavorite(fav.id)}
                      style={{
                        padding: '0.75rem',
                        background: isDarkMode ? '#7F1D1D' : '#FEE2E2',
                        color: isDarkMode ? '#FCA5A5' : '#DC2626',
                        border: 'none',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                      title="Sil"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detayli Hava Durumu */}
          {selectedLocation && weatherData && (
            <div>
              {/* Ana Hava Karti - 6 Bilgi */}
              <div style={{
                background: theme.cardBg,
                borderRadius: '1rem',
                padding: '1.5rem',
                border: `1px solid ${theme.cardBorder}`,
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme.text }}>
                    {selectedLocation.name}
                  </h3>
                  <div style={{ fontSize: '2.5rem' }}>
                    {getWeatherIcon(weatherData.current.weather_code)}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weatherData.current.temperature_2m)}°C
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Sicaklik</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weatherData.current.wind_speed_10m)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Ruzgar (km/s)</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {getWindDirection(weatherData.current.wind_direction_10m)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Yon</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {weatherData.marine?.wave_height?.[0]
                        ? `${Math.round(weatherData.marine.wave_height[0] * 100)}cm`
                        : '0cm'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Dalga</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weatherData.current.relative_humidity_2m)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Nem</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weatherData.current.pressure_msl)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Basinc</div>
                  </div>
                </div>

                {/* Bu Havada Hangi Balik? */}
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: isDarkMode ? '#334155' : '#EFF6FF',
                  borderRadius: '0.75rem'
                }}>
                  <h4 style={{ color: theme.text, marginBottom: '0.5rem' }}>Bu Havada Hangi Balik?</h4>
                  <p style={{ marginBottom: '0.75rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                    {getFishSuggestion(weatherData.current.temperature_2m, weatherData.current.wind_speed_10m).fish}
                  </p>
                  <div style={{
                    paddingTop: '0.75rem',
                    borderTop: `1px solid ${isDarkMode ? '#475569' : 'rgba(30, 64, 175, 0.2)'}`
                  }}>
                    <strong style={{ fontSize: '0.875rem', color: theme.text }}>Tavsiye Yem:</strong>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                      {getFishSuggestion(weatherData.current.temperature_2m, weatherData.current.wind_speed_10m).bait}
                    </p>
                  </div>
                </div>
              </div>

              {/* 7 Gunluk Tahmin */}
              <div style={{
                background: theme.cardBg,
                borderRadius: '1rem',
                padding: '1rem',
                border: `1px solid ${theme.cardBorder}`,
                marginBottom: '1rem'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
                  7 Gunluk Tahmin
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {weatherData.daily && weatherData.daily.time.slice(0, 7).map((date, i) => (
                    <div key={date} style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 2fr 1fr',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: isDarkMode ? '#334155' : '#F8FAFC',
                      borderRadius: '0.5rem',
                      gap: '0.5rem'
                    }}>
                      <div style={{ fontWeight: '600', color: isDarkMode ? '#60A5FA' : '#1E40AF', fontSize: '0.875rem' }}>
                        {new Date(date).toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </div>
                      <div style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                        {getWeatherIcon(weatherData.daily.weather_code[i])}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold', fontSize: '0.875rem' }}>
                        <span style={{ color: '#FB923C' }}>{Math.round(weatherData.daily.temperature_2m_max[i])}°</span>
                        <span style={{ color: theme.textSecondary }}>{Math.round(weatherData.daily.temperature_2m_min[i])}°</span>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.75rem', color: theme.textSecondary }}>
                        {Math.round(weatherData.daily.wind_speed_10m_max[i])} km/s
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gun Dogumu & Batimi */}
              {weatherData.daily && (
                <div style={{ background: theme.cardBg, borderRadius: '1rem', padding: '1rem', border: `1px solid ${theme.cardBorder}` }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
                    Gun Dogumu & Batimi
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem', background: isDarkMode ? '#78350F' : '#FEF3C7', borderRadius: '0.75rem' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌅</div>
                      <div style={{ fontWeight: 'bold', color: isDarkMode ? '#FCD34D' : '#92400E' }}>
                        {new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#FCD34D' : '#92400E' }}>Dogus</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: isDarkMode ? '#1E3A5F' : '#DBEAFE', borderRadius: '0.75rem' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌇</div>
                      <div style={{ fontWeight: 'bold', color: isDarkMode ? '#93C5FD' : '#1E3A8A' }}>
                        {new Date(weatherData.daily.sunset[0]).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#93C5FD' : '#1E3A8A' }}>Batis</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!selectedLocation && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: theme.cardBg, borderRadius: '1rem', border: `1px solid ${theme.cardBorder}` }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📍</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem' }}>
                Bir Lokasyon Sec
              </h3>
              <p style={{ color: theme.textSecondary }}>
                Yukaridaki butonlardan favori yerini sec
              </p>
            </div>
          )}
        </>
      )}

      {/* Harita Modu */}
      {weatherMode === 'map' && (
        <div>
          {/* Harita Container */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '1rem',
            padding: '1rem',
            border: `1px solid ${theme.cardBorder}`,
            marginBottom: '1rem'
          }}>
            <div style={{
              height: '300px',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <MapComponent
                isDarkMode={isDarkMode}
                onLocationSelect={(lat, lon) => {
                  setMapClickedLocation({ lat, lon })
                  fetchWeatherForLocation(lat, lon)
                }}
                mapClickedLocation={mapClickedLocation}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: theme.textSecondary, marginTop: '0.5rem', textAlign: 'center' }}>
              Haritaya tiklayarak konum sec
            </p>
          </div>

          {/* Secilen Konum Bilgisi */}
          {mapClickedLocation && weatherData && (
            <div>
              {/* Favori Kaydet Butonu */}
              {user && (
                <div style={{ marginBottom: '1rem' }}>
                  <button
                    onClick={() => setShowSaveFavoriteModal(true)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: isDarkMode ? '#166534' : '#22C55E',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Bu Konumu Favorilere Ekle
                  </button>
                </div>
              )}

              {/* Hava Bilgi Karti */}
              <div style={{
                background: theme.cardBg,
                borderRadius: '1rem',
                padding: '1.5rem',
                border: `1px solid ${theme.cardBorder}`,
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme.text }}>
                    {mapClickedLocation.lat.toFixed(4)}, {mapClickedLocation.lon.toFixed(4)}
                  </h3>
                  <div style={{ fontSize: '2.5rem' }}>
                    {getWeatherIcon(weatherData.current.weather_code)}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weatherData.current.temperature_2m)}°C
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Sicaklik</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weatherData.current.wind_speed_10m)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Ruzgar (km/s)</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {getWindDirection(weatherData.current.wind_direction_10m)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Yon</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {weatherData.marine?.wave_height?.[0]
                        ? `${Math.round(weatherData.marine.wave_height[0] * 100)}cm`
                        : '0cm'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Dalga</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weatherData.current.relative_humidity_2m)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Nem</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weatherData.current.pressure_msl)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Basinc</div>
                  </div>
                </div>

                {/* Bu Havada Hangi Balik? */}
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: isDarkMode ? '#334155' : '#EFF6FF',
                  borderRadius: '0.75rem'
                }}>
                  <h4 style={{ color: theme.text, marginBottom: '0.5rem' }}>Bu Havada Hangi Balik?</h4>
                  <p style={{ marginBottom: '0.75rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                    {getFishSuggestion(weatherData.current.temperature_2m, weatherData.current.wind_speed_10m).fish}
                  </p>
                  <div style={{
                    paddingTop: '0.75rem',
                    borderTop: `1px solid ${isDarkMode ? '#475569' : 'rgba(30, 64, 175, 0.2)'}`
                  }}>
                    <strong style={{ fontSize: '0.875rem', color: theme.text }}>Tavsiye Yem:</strong>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                      {getFishSuggestion(weatherData.current.temperature_2m, weatherData.current.wind_speed_10m).bait}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Haritaya tiklanmadiginda */}
          {!mapClickedLocation && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', background: theme.cardBg, borderRadius: '1rem', border: `1px solid ${theme.cardBorder}` }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👆</div>
              <p style={{ color: theme.textSecondary }}>
                Haritaya tiklayarak konum sec
              </p>
            </div>
          )}

          {/* Favori Kaydetme Modal */}
          {showSaveFavoriteModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}>
              <div style={{
                background: theme.cardBg,
                borderRadius: '1rem',
                padding: '1.5rem',
                width: '100%',
                maxWidth: '320px'
              }}>
                <h3 style={{ color: theme.text, marginBottom: '1rem' }}>Favoriye Ekle</h3>
                <input
                  type="text"
                  placeholder="Konum adi (orn: Gizli Koy)"
                  value={newFavoriteName}
                  onChange={(e) => setNewFavoriteName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: `1px solid ${theme.cardBorder}`,
                    background: theme.inputBg,
                    color: theme.text,
                    marginBottom: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setShowSaveFavoriteModal(false)
                      setNewFavoriteName('')
                    }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: isDarkMode ? '#475569' : '#E2E8F0',
                      color: isDarkMode ? '#F1F5F9' : '#1E3A8A',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Iptal
                  </button>
                  <button
                    onClick={saveFavorite}
                    disabled={savingFavorite || !newFavoriteName.trim()}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: savingFavorite || !newFavoriteName.trim() ? '#9CA3AF' : '#22C55E',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: 'bold',
                      cursor: savingFavorite || !newFavoriteName.trim() ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {savingFavorite ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
