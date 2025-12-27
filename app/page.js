'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './FishLog.module.css'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [catches, setCatches] = useState([])
  const [weather, setWeather] = useState(null)
  const [loadingWeather, setLoadingWeather] = useState(true)

  // Tema - Dark/Light
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Tema renkleri
  const theme = {
    bg: isDarkMode ? '#0F172A' : '#F8FAFC',
    cardBg: isDarkMode ? '#1E293B' : 'white',
    cardBorder: isDarkMode ? '#334155' : '#E2E8F0',
    text: isDarkMode ? '#F1F5F9' : '#1E3A8A',
    textSecondary: isDarkMode ? '#94A3B8' : '#64748B',
    topBar: isDarkMode ? '#0F172A' : '#1E3A8A',
    tabNav: isDarkMode ? '#1E293B' : '#1E40AF',
    inputBg: isDarkMode ? '#334155' : '#F8FAFC',
    inputBorder: isDarkMode ? '#475569' : '#E2E8F0'
  }

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
    // Rüzgar yönü: derece rüzgarın GELDİĞİ yönü gösterir
    // Kuzey (0°) = Kuzeyden gelen = Güneye doğru esen = ↓
    const directions = [
      { name: 'K', arrow: '↓' },   // Kuzeyden esen, güneye gidiyor
      { name: 'KD', arrow: '↙' },  // Kuzeydoğudan esen
      { name: 'D', arrow: '←' },   // Doğudan esen, batıya gidiyor
      { name: 'GD', arrow: '↖' },  // Güneydoğudan esen
      { name: 'G', arrow: '↑' },   // Güneyden esen, kuzeye gidiyor
      { name: 'GB', arrow: '↗' },  // Güneybatıdan esen
      { name: 'B', arrow: '→' },   // Batıdan esen, doğuya gidiyor
      { name: 'KB', arrow: '↘' }   // Kuzeybatıdan esen
    ]
    const index = Math.round(degrees / 45) % 8
    return `${directions[index].arrow} ${directions[index].name}`
  }

  // Hava durumuna göre balık önerisi - Genişletilmiş versiyon
  function getFishSuggestion(temp, windSpeed) {
    // Çok soğuk hava (< 5°C)
    if (temp < 5) {
      if (windSpeed < 10) {
        return {
          fish: "Mezgit, Levrek (derin su), Kalkan aktif. Dip avı zamanı.",
          bait: "Ağır silikon (turuncu/kırmızı), 18-25gr jig head, canlı çaça, derin minnow"
        }
      }
      return {
        fish: "Zorlu koşullar. Mezgit ve İskorpit dipte bekliyor.",
        bait: "Fosforlu silikon, ağır metal jig, canlı yem (kalamar parçası)"
      }
    }

    // Soğuk hava (5-10°C)
    if (temp >= 5 && temp < 10) {
      if (windSpeed < 8) {
        return {
          fish: "Levrek, Mezgit, Çipura aktif. Sabah ve akşam üstü ideal.",
          bait: "11-14cm suspending minnow, silikon shad (motor oil), canlı çupra"
        }
      }
      if (windSpeed < 15) {
        return {
          fish: "Levrek kıyılarda aktif! Lodos/Poyraz yemi kıyıya sürüklüyor.",
          bait: "Derin çalışan minnow, ağır jig head (14-21gr), silikon balık"
        }
      }
      return {
        fish: "Fırtınalı. Korunaklı limanlarda Levrek ve Kefal.",
        bait: "Ağır silikon, canlı yem, ekmek (kefal için)"
      }
    }

    // Ilık hava (10-15°C) - İdeal sezon!
    if (temp >= 10 && temp < 15) {
      if (windSpeed < 10) {
        return {
          fish: "ALTIN SEZON! Levrek, Çupra, Lüfer, Sinarit çok aktif.",
          bait: "11-14cm minnow (doğal renkler), stick bait, popper, canlı kolyoz"
        }
      }
      if (windSpeed < 20) {
        return {
          fish: "Levrek kayalıklarda, Lüfer yüzeyde sürü halinde, Palamut açıkta.",
          bait: "Metal jig 20-40gr, popper, silikon shad, trolling için büyük minnow"
        }
      }
      return {
        fish: "Rüzgarlı ama verimli. Levrek sahile yanaşıyor, Lüfer aktif.",
        bait: "Ağır metal jig, büyük silikon, derin minnow"
      }
    }

    // Ilık-sıcak (15-20°C)
    if (temp >= 15 && temp < 20) {
      if (windSpeed < 10) {
        return {
          fish: "Çupra, Levrek, Lüfer, Mercan, Fangri aktif. Gün batımı mükemmel!",
          bait: "9-11cm minnow, popper, canlı karides, kalamar parçası"
        }
      }
      if (windSpeed < 18) {
        return {
          fish: "Lüfer ve İstavrit yüzeyde çılgın! Palamut trolling için ideal.",
          bait: "Popper, stick bait, sabiki, metal pilker 30-50gr"
        }
      }
      return {
        fish: "Dalgalı deniz. Kıyıda Levrek, açıkta Palamut.",
        bait: "Ağır jig, büyük popper, trolling lure"
      }
    }

    // Sıcak hava (20-25°C)
    if (temp >= 20 && temp < 25) {
      if (windSpeed < 10) {
        return {
          fish: "Çupra, İstavrit, Kolyoz, Sardalya aktif. Erken sabah veya gece avı.",
          bait: "Küçük minnow (7-9cm), micro jig, sabiki, canlı karides"
        }
      }
      return {
        fish: "Sıcak ve rüzgarlı. Yüzey balıkları (Lüfer, İstavrit, Kolyoz) aktif.",
        bait: "Popper, küçük metal jig, sabiki takımı, stick bait"
      }
    }

    // Çok sıcak (> 25°C)
    if (temp >= 25) {
      if (windSpeed < 8) {
        return {
          fish: "Çok sıcak! Gece avı veya derin su. Barbun, Mercan, Fangri dipte.",
          bait: "Canlı yem (karides, kalamar), derin jig, gece için fosforlu"
        }
      }
      return {
        fish: "Sıcak ama rüzgarlı. Akşam saatlerinde İstavrit, Kolyoz aktif.",
        bait: "Sabiki, micro jig, küçük popper"
      }
    }

    return {
      fish: "Levrek, Çupra, Lüfer, İstavrit aktif olabilir.",
      bait: "11-14cm minnow, silikon balık, popper, metal jig"
    }
  }

  // Ay fazına göre balık tavsiyesi
  function getMoonFishSuggestion(phase) {
    const suggestions = {
      0: { // Yeni Ay
        title: "Yeni Ay - En İyi Dönem!",
        fish: "Levrek, Çupra, Lüfer, Palamut çok aktif",
        tip: "Gece avı mükemmel. Balıklar karanlıkta avlanmak için yüzeye çıkar.",
        bait: "Fosforlu silikon, glow minnow, canlı yem"
      },
      1: { // Hilal (büyüyen)
        title: "Büyüyen Hilal - İyi Dönem",
        fish: "Levrek, Mezgit, Çipura aktif",
        tip: "Gün doğumu ve batımı en verimli saatler.",
        bait: "Doğal renkli minnow, silikon shad, canlı çaça"
      },
      2: { // İlk Dördün
        title: "İlk Dördün - Orta Aktivite",
        fish: "Çupra, İstavrit, Barbun",
        tip: "Sabah erken saatler daha verimli. Akşam aktivite düşer.",
        bait: "Küçük minnow, sabiki, canlı karides"
      },
      3: { // Şişkin (dolunaya gidiş)
        title: "Dolunaya Gidiş - Artan Aktivite",
        fish: "Levrek, Lüfer, Kolyoz aktifleşiyor",
        tip: "Akşam saatleri giderek daha verimli.",
        bait: "Popper, stick bait, metal jig"
      },
      4: { // Dolunay
        title: "Dolunay - Zirve Aktivite!",
        fish: "TÜM BALIKLAR ÇOK AKTİF!",
        tip: "Gece avı altın! Ay ışığında yüzey avı mükemmel. Sürüler yüzeyde.",
        bait: "Yüzey yemler, popper, gümüş/beyaz minnow, canlı yem"
      },
      5: { // Şişkin (azalan)
        title: "Dolunay Sonrası - Hala İyi",
        fish: "Levrek, Çupra, Palamut aktif",
        tip: "Gece avı hala verimli. Sabah da iyi sonuç verir.",
        bait: "Minnow, silikon, trolling lure"
      },
      6: { // Son Dördün
        title: "Son Dördün - Azalan Aktivite",
        fish: "Mezgit, Barbun, İskorpit (dip balıkları)",
        tip: "Dip avı daha verimli. Sabah erken saatler.",
        bait: "Ağır jig, canlı yem, kalamar parçası"
      },
      7: { // Hilal (azalan)
        title: "Azalan Hilal - Yeni Ay'a Hazırlık",
        fish: "Levrek, Mezgit aktifleşmeye başlıyor",
        tip: "Aktivite artmaya başlıyor. Gece avına hazırlan!",
        bait: "Fosforlu yemler, derin minnow, silikon"
      }
    }
    return suggestions[phase] || suggestions[0]
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
    // Solunar teorisine göre: Yeni Ay ve Dolunay en yüksek aktivite
    // Ay yaşı 0 veya 14.76 (yarı döngü) civarında en yüksek
    // Ay yaşı 7.38 veya 22.14 (dördünler) civarında en düşük

    // Ay döngüsü: 29.53 gün
    // 0 gün = Yeni Ay (en yüksek)
    // 7.38 gün = İlk Dördün (en düşük)
    // 14.76 gün = Dolunay (en yüksek)
    // 22.14 gün = Son Dördün (en düşük)

    const moonCycle = 29.5305882
    const halfCycle = moonCycle / 2
    const quarterCycle = moonCycle / 4

    // Yeni Ay veya Dolunay'a olan uzaklık (0-7.38 arası)
    // moonAge 0 veya 14.76'ya ne kadar yakınsa o kadar yüksek skor
    let distanceFromPeak
    if (moonData.moonAge <= halfCycle) {
      // 0-14.76 arası: 0 ve 14.76 en yüksek, 7.38 en düşük
      distanceFromPeak = Math.abs(moonData.moonAge - (moonData.moonAge < quarterCycle ? 0 : halfCycle))
    } else {
      // 14.76-29.53 arası: 14.76 ve 29.53(0) en yüksek, 22.14 en düşük
      distanceFromPeak = Math.abs(moonData.moonAge - (moonData.moonAge < halfCycle + quarterCycle ? halfCycle : moonCycle))
    }

    // Mesafeyi 0-1 arasına normalize et (0 = tepe noktası, 1 = dördün)
    const normalizedDistance = distanceFromPeak / quarterCycle

    // Skor: Tepe noktalarında 9-10, dördünlerde 4-5
    const activityScore = 10 - (normalizedDistance * 5.5)

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
    <main className={styles.container} style={{ background: theme.bg, minHeight: '100vh' }}>
      {/* Top Bar */}
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
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNav} style={{ background: theme.tabNav }}>
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
              <h2 style={{ color: theme.text }}>Hoş Geldin!</h2>
              <p style={{ color: theme.textSecondary }}>Bugün nasıl bir av günü olacak?</p>
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
              <div className={styles.weatherCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className={styles.weatherCardHeader}>
                  <h3 style={{ color: theme.text }}>🌊 İstanbul - Marmara</h3>
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
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Sıcaklık</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weather.current.wind_speed_10m)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Rüzgar (km/s)</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {getWindDirection(weather.current.wind_direction_10m)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Yön</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {weather.marine?.wave_height?.[0]
                        ? `${Math.round(weather.marine.wave_height[0] * 100)}cm`
                        : '0cm'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Dalga</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weather.current.relative_humidity_2m)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Nem</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                      {Math.round(weather.current.pressure_msl)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Basınç</div>
                  </div>
                </div>
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: isDarkMode ? '#334155' : '#EFF6FF',
                  borderRadius: '0.75rem'
                }}>
                  <h4 style={{ color: theme.text, marginBottom: '0.5rem' }}>🐟 Bu Havada Hangi Balık?</h4>
                  <p style={{ marginBottom: '0.75rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                    {getFishSuggestion(weather.current.temperature_2m, weather.current.wind_speed_10m).fish}
                  </p>
                  <div style={{
                    paddingTop: '0.75rem',
                    borderTop: `1px solid ${isDarkMode ? '#475569' : 'rgba(30, 64, 175, 0.2)'}`
                  }}>
                    <strong style={{ fontSize: '0.875rem', color: theme.text }}>🎣 Tavsiye Yem:</strong>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
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
              <div className={styles.catchesCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className={styles.catchesHeader}>
                  <h3 style={{ color: theme.text }}>🎣 Son Avlar</h3>
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
                          fontSize: '1rem', fontWeight: '600',
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
        )}

        {/* Avlarım Tab */}
        {activeTab === 'catches' && (
          <div>
            {/* Yeni Av Formu */}
            <div className={styles.formCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 style={{ color: theme.text }}>➕ Yeni Av Ekle</h3>
              <form onSubmit={addCatch}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>🐟 Balık Türü *</label>
                  <input
                    type="text"
                    placeholder="Levrek, Çupra, Lüfer..."
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className={styles.formInput}
                    style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>📏 Boy (cm) *</label>
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
                    <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>⚖️ Ağırlık (gr)</label>
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
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>📍 Tutulan Yer *</label>
                  <input
                    type="text"
                    placeholder="Kumbağ, Şile, Boğaz..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={styles.formInput}
                    style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>📅 Tarih *</label>
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
                    <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>🕐 Saat *</label>
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
                  <label className={styles.formLabel} style={{ color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>📝 Notlar</label>
                  <textarea
                    placeholder="Olta takımı, yem, hava durumu, teknik..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={styles.formInput}
                    style={{ background: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
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
              <div className={styles.catchesCard} style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
                <div className={styles.catchesHeader}>
                  <h3 style={{ color: theme.text }}>📋 Tüm Avlarım ({catches.length})</h3>
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
                      {/* İlk satır: Tür ve Ölçüler */}
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

                      {/* İkinci satır: Yer ve Tarih */}
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
                          fontSize: '1rem', fontWeight: '600',
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
              <h2 style={{ color: theme.text }}>🌊 Hava & Deniz Durumu</h2>
              <p style={{ color: theme.textSecondary }}>Favori yerlerden seç</p>
            </div>

            {/* Favori Lokasyonlar - 6 adet gerçek koordinatlarla */}
            <div style={{
              marginBottom: '1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem'
            }}>
              {[
                { name: 'Kumbağ', lat: 40.8867, lon: 27.4547 },      // Tekirdağ - Marmara
                { name: 'Altınova', lat: 40.7000, lon: 29.5000 },    // Yalova - Marmara
                { name: 'NATO Limanı', lat: 40.7697, lon: 29.4547 }, // İzmit - Marmara
                { name: 'Pendik', lat: 40.8761, lon: 29.2336 },      // İstanbul - Marmara
                { name: 'Şile', lat: 41.1764, lon: 29.6094 },        // İstanbul - Karadeniz
                { name: 'Atakum', lat: 41.3289, lon: 36.2792 }       // Samsun - Karadeniz
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
                  📍 {loc.name}
                </button>
              ))}
            </div>

            {/* Detaylı Hava Durumu */}
            {selectedLocation && weatherData && (
              <div>
                {/* Ana Hava Kartı - 6 Bilgi */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: `1px solid ${theme.cardBorder}`,
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme.text }}>
                      📍 {selectedLocation.name}
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
                      <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Sıcaklık</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                        {Math.round(weatherData.current.wind_speed_10m)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Rüzgar (km/s)</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>
                        {getWindDirection(weatherData.current.wind_direction_10m)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Yön</div>
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
                      <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Basınç</div>
                    </div>
                  </div>

                  {/* Bu Havada Hangi Balık? */}
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: isDarkMode ? '#334155' : '#EFF6FF',
                    borderRadius: '0.75rem'
                  }}>
                    <h4 style={{ color: theme.text, marginBottom: '0.5rem' }}>🐟 Bu Havada Hangi Balık?</h4>
                    <p style={{ marginBottom: '0.75rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                      {getFishSuggestion(weatherData.current.temperature_2m, weatherData.current.wind_speed_10m).fish}
                    </p>
                    <div style={{
                      paddingTop: '0.75rem',
                      borderTop: `1px solid ${isDarkMode ? '#475569' : 'rgba(30, 64, 175, 0.2)'}`
                    }}>
                      <strong style={{ fontSize: '0.875rem', color: theme.text }}>🎣 Tavsiye Yem:</strong>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                        {getFishSuggestion(weatherData.current.temperature_2m, weatherData.current.wind_speed_10m).bait}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7 Günlük Tahmin */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${theme.cardBorder}`,
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
                    📅 7 Günlük Tahmin
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
                          💨 {Math.round(weatherData.daily.wind_speed_10m_max[i])}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gün Doğumu & Batımı */}
                {weatherData.daily && (
                  <div style={{ background: theme.cardBg, borderRadius: '1rem', padding: '1rem', border: `1px solid ${theme.cardBorder}` }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
                      ☀️ Gün Doğumu & Batımı
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ textAlign: 'center', padding: '1rem', background: isDarkMode ? '#78350F' : '#FEF3C7', borderRadius: '0.75rem' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌅</div>
                        <div style={{ fontWeight: 'bold', color: isDarkMode ? '#FCD34D' : '#92400E' }}>
                          {new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#FCD34D' : '#92400E' }}>Doğuş</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem', background: isDarkMode ? '#1E3A5F' : '#DBEAFE', borderRadius: '0.75rem' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌇</div>
                        <div style={{ fontWeight: 'bold', color: isDarkMode ? '#93C5FD' : '#1E3A8A' }}>
                          {new Date(weatherData.daily.sunset[0]).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#93C5FD' : '#1E3A8A' }}>Batış</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!selectedLocation && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: theme.cardBg, borderRadius: '1rem', border: `1px solid ${theme.cardBorder}` }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem' }}>
                  Bir Lokasyon Seç
                </h3>
                <p style={{ color: theme.textSecondary }}>
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
              <h2 style={{ color: theme.text }}>🌙 Balık Aktivite Takvimi</h2>
              <p style={{ color: theme.textSecondary }}>Ay fazları ve solunar zamanlar</p>
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
                  background: theme.cardBg,
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${theme.cardBorder}`,
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
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
                      <span style={{ fontSize: '0.75rem', color: theme.textSecondary }}>2 saat - Yüksek aktivite</span>
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
              )
            })()}

            {/* Ay Fazına Göre Balık Tavsiyesi */}
            {(() => {
              const todaySolunar = getSolunarData(new Date())
              const moonTip = getMoonFishSuggestion(todaySolunar.phase)
              return (
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${theme.cardBorder}`,
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
                    🐟 {moonTip.title}
                  </h3>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>Aktif Balıklar</div>
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
                    <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#86EFAC' : '#166534', marginBottom: '0.25rem' }}>🎣 Önerilen Yemler</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: isDarkMode ? '#86EFAC' : '#166534' }}>{moonTip.bait}</div>
                  </div>
                </div>
              )
            })()}

            {/* Ay Fazları Takvimi */}
            <div style={{
              background: theme.cardBg,
              borderRadius: '1rem',
              padding: '1rem',
              border: `1px solid ${theme.cardBorder}`
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
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

              {/* Seçili Gün Detayı */}
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
              background: isDarkMode ? '#1E3A5F' : '#EFF6FF',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              color: isDarkMode ? '#93C5FD' : '#1E40AF'
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
              <h2 style={{ color: theme.text }}>📊 Av Analizi</h2>
              <p style={{ color: theme.textSecondary }}>İstatistikler ve trendler</p>
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
                  background: theme.cardBg,
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${theme.cardBorder}`,
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
                    📏 Boy & Ağırlık
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{
                      background: isDarkMode ? '#166534' : '#F0FDF4',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#86EFAC' : '#166534', marginBottom: '0.25rem' }}>En Büyük</div>
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
                      <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#FCD34D' : '#92400E', marginBottom: '0.25rem' }}>Ortalama</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDarkMode ? '#FCD34D' : '#92400E' }}>
                        {Math.round(catches.reduce((sum, c) => sum + c.length_cm, 0) / catches.length)} cm
                      </div>
                      <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                        {catches.filter(c => c.weight_gr).length > 0 &&
                          `${Math.round(catches.filter(c => c.weight_gr).reduce((sum, c) => sum + c.weight_gr, 0) / catches.filter(c => c.weight_gr).length)} gr ort.`
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tür Dağılımı */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${theme.cardBorder}`,
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
                    🐟 Tür Dağılımı
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
                              <span style={{ fontWeight: 'bold', color: colors[idx % colors.length] }}>{count} adet</span>
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

                {/* En Başarılı Yerler */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${theme.cardBorder}`,
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
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
                            background: idx === 0 ? (isDarkMode ? '#78350F' : '#FEF3C7') : (isDarkMode ? '#334155' : '#F8FAFC'),
                            borderRadius: '0.5rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontSize: '1.25rem' }}>{medals[idx]}</span>
                              <span style={{ fontWeight: '600', color: isDarkMode ? '#60A5FA' : '#1E3A8A' }}>{location}</span>
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
                  background: theme.cardBg,
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${theme.cardBorder}`
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: theme.text, marginBottom: '1rem' }}>
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
                              background: isDarkMode ? '#334155' : '#F8FAFC',
                              borderRadius: '0.75rem',
                              textAlign: 'center'
                            }}>
                              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icons[period]}</div>
                              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isDarkMode ? '#60A5FA' : '#1E40AF' }}>{count}</div>
                              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{period.split(' ')[0]}</div>
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
        )}
      </div>
    </main>
  )
}