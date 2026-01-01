// Hava durumu ikonu
export function getWeatherIcon(code) {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '🌨️'
  return '⛈️'
}

// Rüzgar yönü
export function getWindDirection(degrees) {
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
