'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/app/context/AuthContext'
import AuthModal from './components/AuthModal'
import { getTheme } from './utils/theme'
import { getMoonPhase } from './utils/moonPhase'
import TopBar from './components/layout/TopBar'
import TabNav from './components/layout/TabNav'
import HomeTab from './components/tabs/HomeTab'
import CatchesTab from './components/tabs/CatchesTab'
import WeatherTab from './components/tabs/WeatherTab'
import LunarTab from './components/tabs/LunarTab'
import StatsTab from './components/tabs/StatsTab'
import styles from './FishLog.module.css'

// Leaflet harita - SSR hatası önlemi için dynamic import
const MapComponent = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1E293B',
      borderRadius: '0.75rem'
    }}>
      <span style={{ color: '#94A3B8' }}>Harita yükleniyor...</span>
    </div>
  )
})

export default function Home() {
  // Auth
  const { user, loading: authLoading, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const [activeTab, setActiveTab] = useState('home')
  const [catches, setCatches] = useState([])
  const [weather, setWeather] = useState(null)
  const [loadingWeather, setLoadingWeather] = useState(true)

  // Tema - Dark/Light
  const [isDarkMode, setIsDarkMode] = useState(false)
  const theme = getTheme(isDarkMode)

  // Hava & Deniz tab için
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [weatherMode, setWeatherMode] = useState('favorites') // 'favorites' veya 'map'
  const [mapClickedLocation, setMapClickedLocation] = useState(null)
  const [showSaveFavoriteModal, setShowSaveFavoriteModal] = useState(false)
  const [newFavoriteName, setNewFavoriteName] = useState('')
  const [userFavorites, setUserFavorites] = useState([])
  const [savingFavorite, setSavingFavorite] = useState(false)

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

  // Kullanıcı favorilerini yükle
  async function fetchUserFavorites() {
    if (!user) {
      setUserFavorites([])
      return
    }

    try {
      const { data, error } = await supabase
        .from('fav_places')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setUserFavorites(data || [])
    } catch (error) {
      console.error('Favoriler yüklenemedi:', error)
    }
  }

  // Yeni favori kaydet
  async function saveFavorite() {
    if (!newFavoriteName.trim() || !mapClickedLocation) return

    if (!user) {
      alert('Favori kaydetmek için giriş yapmalısınız')
      return
    }

    setSavingFavorite(true)
    try {
      const { data, error } = await supabase
        .from('fav_places')
        .insert([{
          name: newFavoriteName.trim(),
          lat: mapClickedLocation.lat,
          lon: mapClickedLocation.lon,
          user_id: user.id
        }])
        .select()

      if (error) throw error

      // Listeyi güncelle
      await fetchUserFavorites()

      // Modal'ı kapat
      setShowSaveFavoriteModal(false)
      setNewFavoriteName('')

    } catch (error) {
      console.error('Favori kaydedilemedi:', error)
      alert('Favori kaydedilemedi: ' + error.message)
    } finally {
      setSavingFavorite(false)
    }
  }

  // Favori sil
  async function deleteFavorite(id) {
    if (!confirm('Bu favoriyi silmek istediğinize emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('fav_places')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Listeyi güncelle
      await fetchUserFavorites()
    } catch (error) {
      console.error('Favori silinemedi:', error)
      alert('Favori silinemedi: ' + error.message)
    }
  }

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
      // Hava durumu
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,relative_humidity_2m,pressure_msl&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max&timezone=Europe%2FIstanbul&forecast_days=7`
      )
      const weatherData = await weatherResponse.json()

      // Deniz/dalga durumu (ayri API)
      try {
        const marineResponse = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period,swell_wave_height&timezone=Europe%2FIstanbul`
        )
        const marineData = await marineResponse.json()
        // Marine veriyi ana veriye ekle
        if (marineData.hourly) {
          weatherData.marine = {
            wave_height: marineData.hourly.wave_height,
            wave_period: marineData.hourly.wave_period,
            swell_wave_height: marineData.hourly.swell_wave_height
          }
        }
      } catch (marineError) {
        console.log('Marine veri alinamadi (kara noktasi olabilir)')
      }

      setWeatherData(weatherData)
    } catch (error) {
      console.error('Lokasyon hava durumu hatası:', error)
    }
  }

  async function fetchCatches() {
    if (!user) {
      setCatches([])
      return
    }

    const { data, error } = await supabase
      .from('catches')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) console.error('Fetch error:', error)
    if (data) setCatches(data)
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  // User değiştiğinde verileri yeniden yükle
  useEffect(() => {
    fetchCatches()
    fetchUserFavorites()
  }, [user])

  async function addCatch(e) {
    e.preventDefault()

    if (!user) {
      alert('Av eklemek için giriş yapmalısınız')
      return
    }

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
          hunt_date: huntDateTime,
          user_id: user.id
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

  const moonPhase = getMoonPhase()
  
  // Bugünkü avları hesapla
  const today = new Date().toISOString().split('T')[0]
  const todaysCatches = catches.filter(c => {
    if (!c.hunt_date) return false
    const catchDate = new Date(c.hunt_date).toISOString().split('T')[0]
    return catchDate === today
  })

  // Auth yüklenirken loading ekranı
  if (authLoading) {
    return (
      <main style={{
        background: isDarkMode ? '#0F172A' : '#F8FAFC',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '3rem' }}>🎣</div>
        <div style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>Yükleniyor...</div>
      </main>
    )
  }

  return (
    <main className={styles.container} style={{ background: theme.bg, minHeight: '100vh' }}>
      {/* Top Bar */}
      <TopBar
        weather={weather}
        moonPhase={moonPhase}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        user={user}
        signOut={signOut}
        setShowAuthModal={setShowAuthModal}
        theme={theme}
      />

      {/* Tab Navigation */}
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

      {/* Content */}
      <div className={styles.content}>
        {/* Ana Sayfa */}
        {activeTab === 'home' && (
          <HomeTab
            theme={theme}
            isDarkMode={isDarkMode}
            weather={weather}
            catches={catches}
            todaysCatches={todaysCatches}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Avlarım Tab */}
        {activeTab === 'catches' && (
          <CatchesTab
            theme={theme}
            isDarkMode={isDarkMode}
            user={user}
            catches={catches}
            species={species}
            setSpecies={setSpecies}
            lengthCm={lengthCm}
            setLengthCm={setLengthCm}
            weightGr={weightGr}
            setWeightGr={setWeightGr}
            location={location}
            setLocation={setLocation}
            huntDate={huntDate}
            setHuntDate={setHuntDate}
            huntTime={huntTime}
            setHuntTime={setHuntTime}
            notes={notes}
            setNotes={setNotes}
            addCatch={addCatch}
            setShowAuthModal={setShowAuthModal}
          />
        )}

        {/* Hava & Deniz Tab */}
        {activeTab === 'weather' && (
          <WeatherTab
            theme={theme}
            isDarkMode={isDarkMode}
            user={user}
            weatherMode={weatherMode}
            setWeatherMode={setWeatherMode}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            weatherData={weatherData}
            setWeatherData={setWeatherData}
            mapClickedLocation={mapClickedLocation}
            setMapClickedLocation={setMapClickedLocation}
            userFavorites={userFavorites}
            fetchWeatherForLocation={fetchWeatherForLocation}
            deleteFavorite={deleteFavorite}
            showSaveFavoriteModal={showSaveFavoriteModal}
            setShowSaveFavoriteModal={setShowSaveFavoriteModal}
            newFavoriteName={newFavoriteName}
            setNewFavoriteName={setNewFavoriteName}
            saveFavorite={saveFavorite}
            savingFavorite={savingFavorite}
            MapComponent={MapComponent}
            setShowAuthModal={setShowAuthModal}
          />
        )}

        {/* Lunar / Aktivite Tab */}
        {activeTab === 'lunar' && (
          <LunarTab
            theme={theme}
            isDarkMode={isDarkMode}
            user={user}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            setShowAuthModal={setShowAuthModal}
          />
        )}

        {/* Analiz Tab */}
        {activeTab === 'stats' && (
          <StatsTab
            theme={theme}
            isDarkMode={isDarkMode}
            user={user}
            catches={catches}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        isDarkMode={isDarkMode}
      />
    </main>
  )
}