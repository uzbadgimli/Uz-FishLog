// Belirli bir tarih için ay fazı hesaplama
export function getMoonPhaseForDate(date) {
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

// Bugünün ay fazı
export function getMoonPhase() {
  return getMoonPhaseForDate(new Date())
}

// Solunar aktivite hesaplama
export function getSolunarData(date) {
  const moonData = getMoonPhaseForDate(date)

  // Ay doğuş/batış tahmini (basitleştirilmiş)
  const baseHour = 6 + (moonData.moonAge * 0.8) % 24
  const moonrise = Math.floor(baseHour) + ':' + String(Math.floor((baseHour % 1) * 60)).padStart(2, '0')
  const moonset = Math.floor((baseHour + 12.4) % 24) + ':' + String(Math.floor(((baseHour + 12.4) % 1) * 60)).padStart(2, '0')

  // Major ve Minor periyotlar
  const majorStart1 = Math.floor((baseHour + 6) % 24)
  const majorStart2 = Math.floor((baseHour + 18) % 24)
  const minorStart1 = Math.floor(baseHour)
  const minorStart2 = Math.floor((baseHour + 12.4) % 24)

  // Balık aktivite skoru hesaplama
  const moonCycle = 29.5305882
  const halfCycle = moonCycle / 2
  const quarterCycle = moonCycle / 4

  let distanceFromPeak
  if (moonData.moonAge <= halfCycle) {
    distanceFromPeak = Math.abs(moonData.moonAge - (moonData.moonAge < quarterCycle ? 0 : halfCycle))
  } else {
    distanceFromPeak = Math.abs(moonData.moonAge - (moonData.moonAge < halfCycle + quarterCycle ? halfCycle : moonCycle))
  }

  const normalizedDistance = distanceFromPeak / quarterCycle
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
export function getCalendarDays() {
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
