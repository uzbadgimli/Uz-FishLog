'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [activeTab, setActiveTab] = useState('catches')
  const [catches, setCatches] = useState([])
  const [species, setSpecies] = useState('')
  const [lengthCm, setLengthCm] = useState('')
  const [weightGr, setWeightGr] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [weather, setWeather] = useState(null)
  const [loadingWeather, setLoadingWeather] = useState(true)

  // Hava durumu çek (İstanbul için - 41.0082, 28.9784)
  async function fetchWeather() {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Europe%2FIstanbul&forecast_days=3'
      )
      const data = await response.json()
      setWeather(data)
      setLoadingWeather(false)
    } catch (error) {
      console.error('Hava durumu hatası:', error)
      setLoadingWeather(false)
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

    const { error } = await supabase
      .from('catches')
      .insert([
        {
          species: species,
          length_cm: parseInt(lengthCm),
          weight_gr: weightGr ? parseInt(weightGr) : null,
          location: location,
          notes: notes || null
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
      fetchCatches()
    }
  }

  // Hava durumu ikonları
  function getWeatherIcon(code) {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 48) return '🌫️'
    if (code <= 67) return '🌧️'
    if (code <= 77) return '🌨️'
    if (code <= 82) return '🌧️'
    if (code <= 86) return '🌨️'
    if (code <= 99) return '⛈️'
    return '🌤️'
  }

  function getWeatherText(code) {
    if (code === 0) return 'Açık'
    if (code <= 3) return 'Parçalı Bulutlu'
    if (code <= 48) return 'Sisli'
    if (code <= 67) return 'Yağmurlu'
    if (code <= 77) return 'Karlı'
    if (code <= 82) return 'Sağanak'
    if (code <= 86) return 'Kar Yağışı'
    if (code <= 99) return 'Fırtınalı'
    return 'Değişken'
  }

  // Rüzgar yönü
  function getWindDirection(degrees) {
    const directions = ['K', 'KD', 'D', 'GD', 'G', 'GB', 'B', 'KB']
    const index = Math.round(degrees / 45) % 8
    return directions[index]
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {activeTab === 'catches' && '🎣 Avlarım'}
            {activeTab === 'stats' && '📊 İstatistikler'}
            {activeTab === 'profile' && '👤 Profil'}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-6 pt-4">
        {/* Avlarım Tab */}
        {activeTab === 'catches' && (
          <>
            {/* Hava Durumu Widget */}
            {!loadingWeather && weather && (
              <div className="mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">İstanbul - Marmara</h3>
                      <p className="text-blue-100 text-sm">Şu anki hava durumu</p>
                    </div>
                    <div className="text-5xl">
                      {getWeatherIcon(weather.current.weather_code)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                      <div className="text-blue-100 text-xs font-semibold mb-1">Sıcaklık</div>
                      <div className="text-white text-2xl font-bold">{Math.round(weather.current.temperature_2m)}°C</div>
                      <div className="text-blue-100 text-xs mt-1">Hissedilen: {Math.round(weather.current.apparent_temperature)}°C</div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                      <div className="text-blue-100 text-xs font-semibold mb-1">Rüzgar</div>
                      <div className="text-white text-2xl font-bold">{Math.round(weather.current.wind_speed_10m)} km/s</div>
                      <div className="text-blue-100 text-xs mt-1">Yön: {getWindDirection(weather.current.wind_direction_10m)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="text-blue-100 text-xs mb-1">Nem</div>
                      <div className="text-white font-bold">{Math.round(weather.current.relative_humidity_2m)}%</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="text-blue-100 text-xs mb-1">Yağış</div>
                      <div className="text-white font-bold">{weather.current.precipitation} mm</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="text-blue-100 text-xs mb-1">Durum</div>
                      <div className="text-white font-bold text-xs">{getWeatherText(weather.current.weather_code)}</div>
                    </div>
                  </div>

                  {/* 3 Günlük Tahmin */}
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <div className="text-blue-100 text-xs font-semibold mb-2">3 Günlük Tahmin</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((day) => (
                        <div key={day} className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                          <div className="text-blue-100 text-xs mb-1">
                            {day === 0 ? 'Bugün' : day === 1 ? 'Yarın' : '2 Gün'}
                          </div>
                          <div className="text-2xl mb-1">
                            {getWeatherIcon(weather.daily.weather_code[day])}
                          </div>
                          <div className="text-white font-bold text-sm">
                            {Math.round(weather.daily.temperature_2m_max[day])}° / {Math.round(weather.daily.temperature_2m_min[day])}°
                          </div>
                          <div className="text-blue-100 text-xs mt-1">
                            💨 {Math.round(weather.daily.wind_speed_10m_max[day])} km/s
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={addCatch} className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">📝 Yeni Av Ekle</h2>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">🐟 Balık Türü *</label>
                  <input
                    type="text"
                    placeholder="Levrek, Çupra, Lüfer..."
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-800 text-lg transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">📏 Boy (cm) *</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="45"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-800 text-lg transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">⚖️ Kilo (gr)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="1200"
                      value={weightGr}
                      onChange={(e) => setWeightGr(e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-800 text-lg transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">📍 Tutulan Yer *</label>
                  <input
                    type="text"
                    placeholder="Kumbağ, Şile, Boğaz..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-800 text-lg transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">📝 Notlar</label>
                  <textarea
                    placeholder="Olta takımı, yem, hava durumu..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-800 text-lg h-24 resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg py-5 rounded-xl hover:from-blue-700 hover:to-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30"
                >
                  💾 Kaydet
                </button>
              </div>
            </form>

            <div className="pb-safe">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">📋 Avlarım</h2>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                  {catches.length} av
                </span>
              </div>

              {catches.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-2xl shadow-lg">
                  <div className="text-6xl mb-4">🎣</div>
                  <p className="text-gray-600 text-base font-semibold">Henüz av kaydı yok</p>
                  <p className="text-gray-400 text-sm mt-2">Yukarıdaki formu kullanarak<br/>ilk avınızı ekleyin!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {catches.map((c) => (
                    <div key={c.id} className="bg-white border-l-4 border-blue-500 rounded-2xl shadow-md active:scale-[0.99] transition-all overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{c.species}</h3>
                            <span className="text-xs text-gray-500 mt-1 inline-block">
                              {new Date(c.created_at).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="bg-blue-50 px-3 py-1 rounded-full">
                            <span className="text-sm font-bold text-blue-600">#{catches.length - catches.indexOf(c)}</span>
                          </div>
                        </div>

                        <div className="flex gap-3 mb-3">
                          <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl">
                            <div className="text-xs text-gray-600 font-semibold mb-1">📏 Boy</div>
                            <div className="text-lg font-bold text-blue-600">{c.length_cm} cm</div>
                          </div>
                          {c.weight_gr && (
                            <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl">
                              <div className="text-xs text-gray-600 font-semibold mb-1">⚖️ Kilo</div>
                              <div className="text-lg font-bold text-green-600">{c.weight_gr} gr</div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm mb-2">
                          <span className="text-gray-500">📍</span>
                          <span className="text-gray-700 font-medium">{c.location}</span>
                        </div>

                        {c.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="text-xs text-gray-500 font-semibold mb-1">📝 Notlar</div>
                            <p className="text-sm text-gray-700 leading-relaxed">{c.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* İstatistikler Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Genel İstatistikler</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 font-semibold mb-1">Toplam Av</div>
                  <div className="text-3xl font-bold text-blue-600">{catches.length}</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 font-semibold mb-1">En Büyük</div>
                  <div className="text-3xl font-bold text-green-600">
                    {catches.length > 0 ? Math.max(...catches.map(c => c.length_cm)) : 0} cm
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 font-semibold mb-1">En Ağır</div>
                  <div className="text-3xl font-bold text-purple-600">
                    {catches.length > 0 && catches.some(c => c.weight_gr)
                      ? Math.max(...catches.filter(c => c.weight_gr).map(c => c.weight_gr))
                      : 0} gr
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 font-semibold mb-1">Farklı Tür</div>
                  <div className="text-3xl font-bold text-orange-600">
                    {catches.length > 0 ? new Set(catches.map(c => c.species)).size : 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🐟 Tür Dağılımı</h2>
              {catches.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Henüz veri yok</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(
                    catches.reduce((acc, c) => {
                      acc[c.species] = (acc[c.species] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b[1] - a[1])
                    .map(([species, count]) => (
                      <div key={species} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="font-semibold text-gray-800">{species}</span>
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {count}
                          </div>
                          <div className="text-sm text-gray-500">
                            {((count / catches.length) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📍 Popüler Lokasyonlar</h2>
              {catches.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Henüz veri yok</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(
                    catches.reduce((acc, c) => {
                      acc[c.location] = (acc[c.location] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([location, count]) => (
                      <div key={location} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="font-semibold text-gray-800">{location}</span>
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {count} av
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profil Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                🎣
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Balıkçı Profili</h2>
              <p className="text-gray-600">UZ FishLog Kullanıcısı</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">⚙️ Ayarlar</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-gray-800">🔔 Bildirimler</span>
                  <span className="text-gray-400">›</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-gray-800">🌍 Konum İzinleri</span>
                  <span className="text-gray-400">›</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-gray-800">📤 Verileri Dışa Aktar</span>
                  <span className="text-gray-400">›</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">ℹ️ Hakkında</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Versiyon:</strong> 1.1.0</p>
                <p><strong>Geliştirici:</strong> UZ FishLog Team</p>
                <p className="pt-3 text-xs text-gray-500">
                  Tüm balık avı kayıtlarınız Supabase'de güvenle saklanmaktadır.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar - Artık padding var */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab('catches')}
              className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all ${
                activeTab === 'catches' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
              }`}
            >
              <span className="text-2xl">🎣</span>
              <span className="text-xs font-semibold">Avlarım</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all ${
                activeTab === 'stats' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
              }`}
            >
              <span className="text-2xl">📊</span>
              <span className="text-xs font-semibold">İstatistik</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all ${
                activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
              }`}
            >
              <span className="text-2xl">👤</span>
              <span className="text-xs font-semibold">Profil</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}