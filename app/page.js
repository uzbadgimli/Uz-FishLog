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

  // Lunar tab için
  const [selectedDay, setSelectedDay] = useState(null)
  
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

  function getMoonPhaseForDate(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    const day = date.getDate()

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
    const moonAge = (jd - b) * 29.5305882 // Ay yaşı (gün)
    b = Math.round((jd - parseInt(jd)) * 8)

    if (b >= 8) b = 0

    const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']
    const names = ['Yeni Ay', 'Hilal', 'İlk Dördün', 'Şişkin', 'Dolunay', 'Şişkin', 'Son Dördün', 'Hilal']

    return { icon: phases[b], name: names[b], phase: b, moonAge: moonAge }
  }

  function getMoonPhase() {
    return getMoonPhaseForDate(new Date())
  }

  // Solunar aktivite hesaplama
  function getSolunarData(date) {
    const moonData = getMoonPhaseForDate(date)

    // Ay doğuş/batış tahmini (basitleştirilmiş)
    // Gerçek hesaplama için astronomik kütüphane gerekir
    const baseHour = 6 + (moonData.moonAge * 0.8) % 24
    const moonrise = Math.floor(baseHour) + ':' + String(Math.floor((baseHour % 1) * 60)).padStart(2, '0')
    const moonset = Math.floor((baseHour + 12.4) % 24) + ':' + String(Math.floor(((baseHour + 12.4) % 1) * 60)).padStart(2, '0')

    // Major ve Minor periyotlar
    // Major: Ay tepe noktasında ve tam karşısında (yaklaşık 2 saat)
    // Minor: Ay doğuş ve batışında (yaklaşık 1 saat)
    const majorStart1 = Math.floor((baseHour + 6) % 24)
    const majorStart2 = Math.floor((baseHour + 18) % 24)
    const minorStart1 = Math.floor(baseHour)
    const minorStart2 = Math.floor((baseHour + 12.4) % 24)

    // Balık aktivite skoru (1-10)
    // Dolunay ve Yeni Ay en yüksek, dördünler en düşük
    let activityScore
    if (moonData.phase === 0 || moonData.phase === 4) { // Yeni Ay veya Dolunay
      activityScore = 9 + Math.random()
    } else if (moonData.phase === 2 || moonData.phase === 6) { // Dördünler
      activityScore = 4 + Math.random() * 2
    } else {
      activityScore = 6 + Math.random() * 2
    }

    return {
      ...moonData,
      moonrise,
      moonset,
      major1: `${String(majorStart1).padStart(2, '0')}:00 - ${String((majorStart1 + 2) % 24).padStart(2, '0')}:00`,
      major2: `${String(majorStart2).padStart(2, '0')}:00 - ${String((majorStart2 + 2) % 24).padStart(2, '0')}:00`,
      minor1: `${String(minorStart1).padStart(2, '0')}:00 - ${String((minorStart1 + 1) % 24).padStart(2, '0')}:00`,
      minor2: `${String(minorStart2).padStart(2, '0')}:00 - ${String((minorStart2 + 1) % 24).padStart(2, '0')}:00`,
      activityScore: Math.min(10, activityScore).toFixed(1)
    }
  }

  // Takvim için günleri oluştur
  function getCalendarDays() {
    const today = new Date()
    const days = []

    // Bugünden 3 gün önce ve 14 gün sonrası
    for (let i = -3; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const solunar = getSolunarData(date)
      days.push({
        date,
        dayName: date.toLocaleDateString('tr-TR', { weekday: 'short' }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString('tr-TR', { month: 'short' }),
        isToday: i === 0,
        ...solunar
      })
    }
    return days
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

        {/* Lunar / Aktivite Tab */}
        {activeTab === 'lunar' && (
          <div>
            <div className={styles.pageTitle}>
              <h2>🌙 Balık Aktivite Takvimi</h2>
              <p>Ay fazları ve solunar zamanlar</p>
            </div>

            {/* Bugünün Özeti */}
            {(() => {
              const todaySolunar = getSolunarData(new Date())
              return (
                <div style={{
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #312E81 100%)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Bugün</div>
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
                      <span style={{ fontSize: '0.875rem' }}>Balık Aktivitesi</span>
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
                      {parseFloat(todaySolunar.activityScore) >= 8 ? '🔥 Mükemmel av günü!' :
                        parseFloat(todaySolunar.activityScore) >= 6 ? '👍 İyi aktivite bekleniyor' :
                          '😐 Orta düzey aktivite'}
                    </div>
                  </div>

                  {/* Ay Doğuş/Batış */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🌄</div>
                      <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{todaySolunar.moonrise}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Ay Doğuşu</div>
                    </div>
                    <div style={{
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🌙</div>
                      <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{todaySolunar.moonset}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Ay Batışı</div>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Solunar Zamanlar */}
            {(() => {
              const todaySolunar = getSolunarData(new Date())
              return (
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: '1px solid #E2E8F0',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '1rem' }}>
                    ⏰ En İyi Avlanma Saatleri
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
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>2 saat - Yüksek aktivite</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div style={{
                        background: '#DCFCE7',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#166534'
                      }}>
                        {todaySolunar.major1}
                      </div>
                      <div style={{
                        background: '#DCFCE7',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#166534'
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
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>1 saat - Orta aktivite</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div style={{
                        background: '#FEF3C7',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#92400E'
                      }}>
                        {todaySolunar.minor1}
                      </div>
                      <div style={{
                        background: '#FEF3C7',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#92400E'
                      }}>
                        {todaySolunar.minor2}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Ay Fazları Takvimi */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1rem',
              border: '1px solid #E2E8F0'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '1rem' }}>
                📅 Ay Fazları Takvimi
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
                      background: day.isToday ? '#1E40AF' : selectedDay?.dayNum === day.dayNum && selectedDay?.month === day.month ? '#DBEAFE' : '#F8FAFC',
                      color: day.isToday ? 'white' : '#1E3A8A',
                      border: day.isToday ? 'none' : '1px solid #E2E8F0',
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
                        parseFloat(day.activityScore) >= 7 ? '#DCFCE7' :
                          parseFloat(day.activityScore) >= 5 ? '#FEF3C7' : '#FEE2E2',
                      color: day.isToday ? 'white' :
                        parseFloat(day.activityScore) >= 7 ? '#166534' :
                          parseFloat(day.activityScore) >= 5 ? '#92400E' : '#991B1B'
                    }}>
                      {day.activityScore}
                    </div>
                  </div>
                ))}
              </div>

              {/* Seçili Gün Detayı */}
              {selectedDay && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#F8FAFC',
                  borderRadius: '0.75rem',
                  borderLeft: '4px solid #1E40AF'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1E40AF' }}>
                        {selectedDay.dayNum} {selectedDay.month} - {selectedDay.dayName}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748B' }}>
                        {selectedDay.name}
                      </div>
                    </div>
                    <div style={{ fontSize: '2rem' }}>{selectedDay.icon}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <div><strong>Aktivite:</strong> {selectedDay.activityScore}/10</div>
                    <div><strong>Ay Doğuşu:</strong> {selectedDay.moonrise}</div>
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
              background: '#EFF6FF',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              color: '#1E40AF'
            }}>
              <strong>💡 Solunar Teorisi:</strong> Balıklar ay ve güneşin konumuna göre belirli saatlerde daha aktif olur.
              <strong> Major</strong> periyotlarda (ay tepe/dip noktasında) en yüksek aktivite,
              <strong> Minor</strong> periyotlarda (ay doğuş/batış) orta düzey aktivite beklenir.
            </div>
          </div>
        )}

        {/* Analiz Tab */}
        {activeTab === 'stats' && (
          <div>
            <div className={styles.pageTitle}>
              <h2>📊 Av Analizi</h2>
              <p>İstatistikler ve trendler</p>
            </div>

            {catches.length === 0 ? (
              <div className={styles.emptyState}>
                <div className="icon">📊</div>
                <h3>Henüz Veri Yok</h3>
                <p>Analiz için önce av kaydı eklemelisin</p>
              </div>
            ) : (
              <>
                {/* Genel İstatistikler */}
                <div style={{
                  background: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>🎯 Genel Bakış</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{catches.length}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Toplam Av</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {[...new Set(catches.map(c => c.species))].length}
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Farklı Tür</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {[...new Set(catches.map(c => c.location))].length}
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Farklı Yer</div>
                    </div>
                  </div>
                </div>

                {/* Boy/Ağırlık İstatistikleri */}
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: '1px solid #E2E8F0',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '1rem' }}>
                    📏 Boy & Ağırlık
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{
                      background: '#F0FDF4',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#166534', marginBottom: '0.25rem' }}>En Büyük</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>
                        {Math.max(...catches.map(c => c.length_cm))} cm
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {catches.find(c => c.length_cm === Math.max(...catches.map(c => c.length_cm)))?.species}
                      </div>
                    </div>
                    <div style={{
                      background: '#FEF3C7',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#92400E', marginBottom: '0.25rem' }}>Ortalama</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#92400E' }}>
                        {Math.round(catches.reduce((sum, c) => sum + c.length_cm, 0) / catches.length)} cm
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {catches.filter(c => c.weight_gr).length > 0 &&
                          `${Math.round(catches.filter(c => c.weight_gr).reduce((sum, c) => sum + c.weight_gr, 0) / catches.filter(c => c.weight_gr).length)} gr ort.`
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tür Dağılımı */}
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: '1px solid #E2E8F0',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '1rem' }}>
                    🐟 Tür Dağılımı
                  </h3>
                  {(() => {
                    const speciesCount = catches.reduce((acc, c) => {
                      acc[c.species] = (acc[c.species] || 0) + 1
                      return acc
                    }, {})
                    const sorted = Object.entries(speciesCount).sort((a, b) => b[1] - a[1])
                    const maxCount = Math.max(...Object.values(speciesCount))
                    const colors = ['#1E40AF', '#7C3AED', '#EC4899', '#F97316', '#22C55E']

                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {sorted.map(([species, count], idx) => (
                          <div key={species}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                              <span style={{ fontWeight: '600', color: '#1E3A8A', textTransform: 'uppercase' }}>{species}</span>
                              <span style={{ fontWeight: 'bold', color: colors[idx % colors.length] }}>{count} adet</span>
                            </div>
                            <div style={{
                              height: '8px',
                              background: '#E2E8F0',
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

                {/* En Başarılı Yerler */}
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: '1px solid #E2E8F0',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '1rem' }}>
                    📍 En Başarılı Yerler
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
                            background: idx === 0 ? '#FEF3C7' : '#F8FAFC',
                            borderRadius: '0.5rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontSize: '1.25rem' }}>{medals[idx]}</span>
                              <span style={{ fontWeight: '600', color: '#1E3A8A' }}>{location}</span>
                            </div>
                            <span style={{ fontWeight: 'bold', color: '#FB923C' }}>{count} av</span>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>

                {/* En Başarılı Saatler */}
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: '1px solid #E2E8F0'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '1rem' }}>
                    ⏰ Saat Dağılımı
                  </h3>
                  {(() => {
                    const hourCount = catches.reduce((acc, c) => {
                      if (c.hunt_date) {
                        const hour = new Date(c.hunt_date).getHours()
                        const period = hour < 6 ? 'Gece (00-06)' :
                                      hour < 12 ? 'Sabah (06-12)' :
                                      hour < 18 ? 'Öğlen (12-18)' : 'Akşam (18-24)'
                        acc[period] = (acc[period] || 0) + 1
                      }
                      return acc
                    }, {})
                    const periods = ['Sabah (06-12)', 'Öğlen (12-18)', 'Akşam (18-24)', 'Gece (00-06)']
                    const icons = { 'Sabah (06-12)': '🌅', 'Öğlen (12-18)': '☀️', 'Akşam (18-24)': '🌇', 'Gece (00-06)': '🌙' }
                    const total = Object.values(hourCount).reduce((a, b) => a + b, 0)

                    return (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {periods.map(period => {
                          const count = hourCount[period] || 0
                          const percent = total > 0 ? Math.round((count / total) * 100) : 0
                          return (
                            <div key={period} style={{
                              padding: '1rem',
                              background: '#F8FAFC',
                              borderRadius: '0.75rem',
                              textAlign: 'center'
                            }}>
                              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icons[period]}</div>
                              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1E40AF' }}>{count}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{period.split(' ')[0]}</div>
                              <div style={{ fontSize: '0.625rem', color: '#94A3B8' }}>%{percent}</div>
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
        )}
      </div>
    </main>
  )
}