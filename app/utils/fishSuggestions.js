// Fish Suggestions - Parametrik JSON tabanli sistem
// Ceviriler locales/*.json dosyalarinda

import scenarios from '@/config/fish-suggestions.json'

function getSeason(month) {
  if (month >= 11 || month <= 2) return 'winter'
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  return 'autumn'
}

function getTimeOfDay(hour) {
  if (hour >= 22 || hour <= 5) return 'night'
  if (hour >= 6 && hour <= 9) return 'morning'
  if (hour >= 16 && hour <= 21) return 'evening'
  return null
}

function matchScenario(temp, windSpeed, season, timeOfDay) {
  for (const s of scenarios.scenarios) {
    if (s.season && s.season !== season) continue
    if (s.tempMin !== undefined && temp < s.tempMin) continue
    if (s.tempMax !== undefined && temp >= s.tempMax) continue
    if (s.windMin !== undefined && windSpeed < s.windMin) continue
    if (s.windMax !== undefined && windSpeed >= s.windMax) continue
    if (s.timeOfDay && s.timeOfDay !== timeOfDay) continue
    return s.id
  }
  return 'default'
}

export function getFishSuggestion(temp, windSpeed, lang = 'tr', t) {
  const hour = new Date().getHours()
  const month = new Date().getMonth()
  const season = getSeason(month)
  const timeOfDay = getTimeOfDay(hour)
  const scenarioId = matchScenario(temp, windSpeed, season, timeOfDay)

  if (t) {
    return {
      fish: t(`fish.scenarios.${scenarioId}.fish`),
      bait: t(`fish.scenarios.${scenarioId}.bait`)
    }
  }
  return { fish: scenarioId, bait: scenarioId }
}

export function getMoonFishSuggestion(phase, lang = 'tr', t) {
  const hour = new Date().getHours()
  const isNight = hour >= 20 || hour <= 6
  const moonConfig = scenarios.moonPhases.find(m => m.phase === phase) || scenarios.moonPhases[0]
  const phaseId = moonConfig.id
  const timeKey = isNight ? 'night' : 'day'

  if (t) {
    return {
      title: t(`fish.moon.${phaseId}.title`),
      fish: t(`fish.moon.${phaseId}.${timeKey}.fish`),
      tip: t(`fish.moon.${phaseId}.${timeKey}.tip`),
      bait: t(`fish.moon.${phaseId}.bait`)
    }
  }
  return { title: phaseId, fish: phaseId, tip: phaseId, bait: phaseId }
}
