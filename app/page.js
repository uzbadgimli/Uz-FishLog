'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './FishLog.module.css'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [catches, setCatches] = useState([])
  const [weather, setWeather] = useState(null)
  const [loadingWeather, setLoadingWeather] = useState(true)
  
  // Hava & Deniz tab için
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  
  // Form states
  const [species, setSpecies] = useState('')
  const [lengthCm, setLengthCm] = useState('')
  const [weightGr, setWeightGr] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [huntDate, setHuntDate] = useState(new Date().toISOString().split('T')[0])
  const [huntTime, setHuntTime] = useState(new Date().toTimeString().slice(0, 5))

  async function fetchWeather() {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,relative_humidity_2m,pressure_msl&marine=wave_height&timezone=Europe%2FIstanbul'
      )
      const data = await response.json()
      setWeather(data)
      setLoadingWeather(false)
    } catch (error) {
      console.error('Hava durumu hatası:', error)
      setLoadingWeather(false)
    }
  }

  async function fetchWeatherForLocation(lat, lon) {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,relative_humidity_2m,pressure_msl&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max&timezone=Europe%2FIstanbul&forecast_days=7`
      )
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error('Lokasyon hava durumu hatası:', error)
    }
  }

  async function fetchCatches() {
    const { data, error } = await supabase
      .from('catches')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Fetch error:', error)
    if (data) setCatches(data)
  }

  useEffect(() => {
    fetchCatches()
    fetchWeather()
  }, [])

  async function addCatch(e) {
    e.preventDefault()
    
    const huntDateTime = `${huntDate}T${huntTime}:00`

    const { error } = await supabase
      .from('catches')
      .insert([
        {
          species: species,
          length_cm: parseInt(lengthCm),
          weight_gr: weightGr ? parseInt(weightGr) : null,
          location: location,
          notes: notes || null,
          hunt_date: huntDateTime
        }
      ])

    if (error) {
      console.error('Insert error:', error)
      alert('Hata: ' + error.message)
    } else {
      setSpecies('')
      setLengthCm('')
      setWeightGr('')
      setLocation('')
      setNotes('')
      setHuntDate(new Date().toISOString().split('T')[0])
      setHuntTime(new Date().toTimeString().slice(0, 5))
      fetchCatches()
      setActiveTab('home')
    }
  }

  function getWeatherIcon(code) {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 48) return '🌫️'
    if (code <= 67) return '🌧️'
    if (code <= 77) return '🌨️'
    return '⛈️'
  }

  function getWindDirection(degrees) {
    const directions = [
      { name: 'K', arrow: '↑' },
      { name: 'KD', arrow: '↗' },
      { name: 'D', arrow: '→' },
      { name: 'GD', arrow: '↘' },
      { name: 'G', arrow: '↓' },
      { name: 'GB', arrow: '↙' },
      { name: 'B', arrow: '←' },
      { name: 'KB', arrow: '↖' }
    ]
    const index = Math.round(degrees / 45) % 8
    return `${directions[index].arrow} ${directions[index].name}`
  }

  // Hava durumuna göre balık önerisi
  function getFishSuggestion(temp, windSpeed) {
    if (temp < 10) {
      if (windSpeed < 10) {
        return {
          fish: "Levrek, Mezgit aktif. Sakin hava, derin sulara git.",
          bait: "11-14cm minnow, silikon balık (kırmızı/turuncu), canlı çupra"
        }
      }
      return {
        fish: "Soğuk ve rüzgarlı. Levrek sahile yaklaşabilir.",
        bait: "Ağır jig head (14-21gr), derin çalışan minnow, silikon"
      }
    }
    if (temp >= 10 && temp < 18) {
      if (windSpeed < 15) {
        return {
          fish: "İdeal! Levrek, Çupra, Lüfer aktif. Sabah-akşam saatleri mükemmel.",
          bait: "11-14cm minnow, stick bait, popper, silikon balık, canlı kolyoz"
        }
      }
      return {
        fish: "Rüzgarlı ama üretken. Levrek kıyılarda, Lüfer sürü halinde.",
        bait: "Yüzey poppers, 9-11cm minnow, silikon shad, metal jig"
      }
    }
    if (temp >= 18) {
      if (windSpeed < 10) {
        return {
          fish: "Sıcak ve sakin. Çupra, İstavrit, Kolyoz aktif. Gün batımını bekle.",
          bait: "Küçük minnow (7-9cm), jig, sabiki, canlı karides"
        }
      }
      return {
        fish: "Sıcak ve rüzgarlı. Yüzey balıkları (Lüfer, İstavrit) aktif.",
        bait: "Popper, stick bait, metal pilker, hızlı minnow"
      }
    }
    return {
      fish: "Levrek, Çupra, Lüfer aktif olabilir.",
      bait: "11-14cm minnow, silikon balık, popper"
    }
  }

  function getMoonPhase() {
    const today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    const day = today.getDate()
    
    let c, e, jd, b

    if (month < 3) {
      year--
      month += 12
    }

    ++month
    c = 365.25 * year
    e = 30.6 * month
    jd = c + e + day - 694039.09
    jd /= 29.5305882
    b = parseInt(jd)
    jd -= b
    b = Math.round(jd * 8)

    if (b >= 8) b = 0

    const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']
    const names = ['Yeni Ay', 'Hilal', 'İlk Dördün', 'Şişkin', 'Dolunay', 'Şişkin', 'Son Dördün', 'Hilal']
    
    return { icon: phases[b], name: names[b] }
  }

  const moonPhase = getMoonPhase()
  
  // Bugünkü avları hesapla
  const today = new Date().toISOString().split('T')[0]
  const todaysCatches = catches.filter(c => {
    if (!c.hunt_date) return false
    const catchDate = new Date(c.hunt_date).toISOString().split('T')[0]
    return catchDate === today
  })

  return (
    <main className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
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
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNav}>
          <div className={styles.tabNavContent}>
            <button
              onClick={() => setActiveTab('home')}
              className={`${styles.tab} ${activeTab === 'home' ? styles.tabActive : ''}`}
            >
              {activeTab === 'home' && <div className={styles.tabIndicator}></div>}
              <span className={styles.tabIcon}>🏠</span>
              <span className={styles.tabLabel}>Ana Sayfa</span>
            </button>

            <button
              onClick={() => setActiveTab('catches')}
              className={`${styles.tab} ${activeTab === 'catches' ? styles.tabActive : ''}`}
            >
              {activeTab === 'catches' && <div className={styles.tabIndicator}></div>}
              <span className={styles.tabIcon}>🎣</span>
              <span className={styles.tabLabel}>Avlarım</span>
            </button>

            <button
              onClick={() => setActiveTab('weather')}
              className={`${styles.tab} ${activeTab === 'weather' ? styles.tabActive : ''}`}
            >
              {activeTab === 'weather' && <div className={styles.tabIndicator}></div>}
              <span className={styles.tabIcon}>🌊</span>
              <span className={styles.tabLabel}>Hava</span>
            </button>

            <button
              onClick={() => setActiveTab('lunar')}
              className={`${styles.tab} ${activeTab === 'lunar' ? styles.tabActive : ''}`}
            >
              {activeTab === 'lunar' && <div className={styles.tabIndicator}></div>}
              <span className={styles.tabIcon}>🌙</span>
              <span className={styles.tabLabel}>Aktivite</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`${styles.tab} ${activeTab === 'stats' ? styles.tabActive : ''}`}
            >
              {activeTab === 'stats' && <div className={styles.tabIndicator}></div>}
              <span className={styles.tabIcon}>📊</span>
              <span className={styles.tabLabel}>Analiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Ana Sayfa */}
        {activeTab === 'home' && (
          <div>
            <div className={styles.pageTitle}>
              <h2>Hoş Geldin!</h2>
              <p>Bugün nasıl bir av günü olacak?</p>
            </div>

            {/* Bugünkü vs Toplam */}
            <div className={styles.statsContainer}>
              <div className={styles.todayCard}>
                <h3>📅 Bugün</h3>
                <div className="number">{todaysCatches.length}</div>
                <div className="label">Av Tutuldu</div>
              </div>
              <div className={styles.totalCard}>
                <h3>🎣 Toplam</h3>
                <div className="number">{catches.length}</div>
                <div className="label">Tüm Avlar</div>
              </div>
            </div>

            {/* Hava Durumu */}
            {weather && (
              <div className={styles.weatherCard}>
                <div className={styles.weatherCardHeader}>
                  <h3>🌊 İstanbul - Marmara</h3>
                  <div className="weatherIcon">{getWeatherIcon(weather.current.weather_code)}</div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>
                      {Math.round(weather.current.temperature_2m)}°C
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Sıcaklık</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>
                      {Math.round(weather.current.wind_speed_10m)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Rüzgar (km/s)</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>
                      {getWindDirection(weather.current.wind_direction_10m)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Yön</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>
                      {weather.marine?.wave_height?.[0] 
                        ? `${Math.round(weather.marine.wave_height[0] * 100)}cm` 
                        : '0cm'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Dalga</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>
                      {Math.round(weather.current.relative_humidity_2m)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Nem</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>
                      {Math.round(weather.current.pressure_msl)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Basınç</div>
                  </div>
                </div>
                <div className={styles.fishSuggestion}>
                  <h4>🐟 Bu Havada Hangi Balık?</h4>
                  <p style={{ marginBottom: '0.75rem' }}>
                    {getFishSuggestion(weather.current.temperature_2m, weather.current.wind_speed_10m).fish}
                  </p>
                  <div style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(30, 64, 175, 0.2)'
                  }}>
                    <strong style={{ fontSize: '0.875rem' }}>🎣 Tavsiye Yem:</strong>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
                      {getFishSuggestion(weather.current.temperature_2m, weather.current.wind_speed_10m).bait}
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
              ➕ Yeni Av Ekle
            </button>

            {/* Son Avlar */}
            {catches.length > 0 && (
              <div className={styles.catchesCard}>
                <div className={styles.catchesHeader}>
                  <h3>🎣 Son Avlar</h3>
                  <button 
                    onClick={() => setActiveTab('catches')}
                    className={styles.viewAllButton}
                  >
                    Tümünü Gör →
                  </button>
                </div>
                <div>
                  {catches.slice(0, 3).map((c) => (
                    <div 
                      key={c.id} 
                      style={{
                        padding: '1rem',
                        background: '#F8FAFC',
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
                          color: '#1E40AF',
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
                          color: '#1E40AF',
                          fontSize: '1.125rem', fontWeight: 'bold'
                        }}>
                          {c.location}
                        </span>
                        <span style={{
                          color: '#64748B',
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
                          borderTop: '1px solid #E2E8F0',
                          fontSize: '1rem', fontWeight: '600',
                          color: '#475569',
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
        )}

        {/* Avlarım Tab */}
        {activeTab === 'catches' && (
          <div>
            {/* Yeni Av Formu */}
            <div className={styles.formCard}>
              <h3>➕ Yeni Av Ekle</h3>
              <form onSubmit={addCatch}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>🐟 Balık Türü *</label>
                  <input
                    type="text"
                    placeholder="Levrek, Çupra, Lüfer..."
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>📏 Boy (cm) *</label>
                    <input
                      type="number"
                      placeholder="45"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(e.target.value)}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>⚖️ Ağırlık (gr)</label>
                    <input
                      type="number"
                      placeholder="1200"
                      value={weightGr}
                      onChange={(e) => setWeightGr(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>📍 Tutulan Yer *</label>
                  <input
                    type="text"
                    placeholder="Kumbağ, Şile, Boğaz..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>📅 Tarih *</label>
                    <input
                      type="date"
                      value={huntDate}
                      onChange={(e) => setHuntDate(e.target.value)}
                      className={styles.formInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>🕐 Saat *</label>
                    <input
                      type="time"
                      value={huntTime}
                      onChange={(e) => setHuntTime(e.target.value)}
                      className={styles.formInput}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>📝 Notlar</label>
                  <textarea
                    placeholder="Olta takımı, yem, hava durumu, teknik..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={styles.formInput}
                    rows="3"
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  💾 Av Kaydını Ekle
                </button>
              </form>
            </div>

            {/* Tüm Avlar Listesi */}
            {catches.length > 0 && (
              <div className={styles.catchesCard}>
                <div className={styles.catchesHeader}>
                  <h3>📋 Tüm Avlarım ({catches.length})</h3>
                </div>
                <div>
                  {catches.map((c) => (
                    <div 
                      key={c.id} 
                      style={{
                        padding: '1rem',
                        background: '#F8FAFC',
                        borderRadius: '0.75rem',
                        marginBottom: '0.75rem',
                        borderLeft: '4px solid #FB923C'
                      }}
                    >
                      {/* İlk satır: Tür ve Ölçüler */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          fontWeight: 'bold',
                          color: '#1E40AF',
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
                      
                      {/* İkinci satır: Yer ve Tarih */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline'
                      }}>
                        <span style={{
                          color: '#1E40AF',
                          fontSize: '1.125rem', fontWeight: 'bold'
                        }}>
                          {c.location}
                        </span>
                        <span style={{
                          color: '#64748B',
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
                          borderTop: '1px solid #E2E8F0',
                          fontSize: '1rem', fontWeight: '600',
                          color: '#475569',
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
                <h3>Henüz Av Kaydı Yok</h3>
                <p>Yukarıdaki formu kullanarak ilk avını ekle!</p>
              </div>
            )}
          </div>
        )}

        {/* Hava & Deniz Tab */}
        {activeTab === 'weather' && (
          <div>
            <div className={styles.pageTitle}>
              <h2>🌊 Hava & Deniz Durumu</h2>
              <p>Favori yerlerden seç</p>
            </div>

            {/* Favori Lokasyonlar */}
            <div style={{
              marginBottom: '1rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem'
            }}>
              {[
                { name: 'Kumbağ', lat: 40.9833, lon: 27.9667 },
                { name: 'Şile', lat: 41.1764, lon: 29.6094 },
                { name: 'Hereke', lat: 40.7833, lon: 29.6333 },
                { name: 'İzmit Körfezi', lat: 40.7667, lon: 29.9167 }
              ].map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setSelectedLocation(loc)
                    fetchWeatherForLocation(loc.lat, loc.lon)
                  }}
                  style={{
                    padding: '0.75rem',
                    background: selectedLocation?.name === loc.name ? '#1E40AF' : 'white',
                    color: selectedLocation?.name === loc.name ? 'white' : '#1E40AF',
                    border: '2px solid #1E40AF',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  📍 {loc.name}
                </button>
              ))}
            </div>

            {/* Detaylı Hava Durumu */}
            {selectedLocation && weatherData && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    📍 {selectedLocation.name} - Şu An
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {Math.round(weatherData.current.temperature_2m)}°
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Sıcaklık</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {Math.round(weatherData.current.wind_speed_10m)}
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Rüzgar</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                        {getWindDirection(weatherData.current.wind_direction_10m)}
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Yön</div>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: '1px solid #E2E8F0',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '1rem' }}>
                    📅 7 Günlük Tahmin
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {weatherData.daily && weatherData.daily.time.slice(0, 7).map((date, i) => (
                      <div key={date} style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 2fr 1fr',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: '#F8FAFC',
                        borderRadius: '0.5rem',
                        gap: '0.5rem'
                      }}>
                        <div style={{ fontWeight: '600', color: '#1E40AF', fontSize: '0.875rem' }}>
                          {new Date(date).toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </div>
                        <div style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                          {getWeatherIcon(weatherData.daily.weather_code[i])}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold', fontSize: '0.875rem' }}>
                          <span style={{ color: '#FB923C' }}>{Math.round(weatherData.daily.temperature_2m_max[i])}°</span>
                          <span style={{ color: '#64748B' }}>{Math.round(weatherData.daily.temperature_2m_min[i])}°</span>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#64748B' }}>
                          💨 {Math.round(weatherData.daily.wind_speed_10m_max[i])}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {weatherData.daily && (
                  <div style={{ background: 'white', borderRadius: '1rem', padding: '1rem', border: '1px solid #E2E8F0' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '1rem' }}>
                      ☀️ Gün Doğumu & Batımı
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ textAlign: 'center', padding: '1rem', background: '#FEF3C7', borderRadius: '0.75rem' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌅</div>
                        <div style={{ fontWeight: 'bold', color: '#92400E' }}>
                          {new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#92400E' }}>Doğuş</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem', background: '#DBEAFE', borderRadius: '0.75rem' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌇</div>
                        <div style={{ fontWeight: 'bold', color: '#1E3A8A' }}>
                          {new Date(weatherData.daily.sunset[0]).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#1E3A8A' }}>Batış</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!selectedLocation && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'white', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '0.5rem' }}>
                  Bir Lokasyon Seç
                </h3>
                <p style={{ color: '#64748B' }}>
                  Yukarıdaki butonlardan favori yerini seç
                </p>
              </div>
            )}
          </div>
        )}

        {/* Diğer Tablar */}
        {activeTab !== 'home' && activeTab !== 'catches' && activeTab !== 'weather' && (
          <div className={styles.emptyState}>
            <div className="icon">🚧</div>
            <h3>Geliştirme Aşamasında</h3>
            <p>Bu sekme hazırlanıyor...</p>
          </div>
        )}
      </div>
    </main>
  )
}