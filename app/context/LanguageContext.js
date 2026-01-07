'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import tr from '@/locales/tr.json'
import en from '@/locales/en.json'

const translations = { tr, en }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('tr')

  // localStorage'dan dil tercihini yükle
  useEffect(() => {
    const savedLang = localStorage.getItem('uz-fishlog-lang')
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang)
    }
  }, [])

  // Dil değiştiğinde localStorage'a kaydet
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
      localStorage.setItem('uz-fishlog-lang', lang)
    }
  }

  // Çeviri fonksiyonu
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        // Fallback to Turkish if key not found
        value = translations['tr']
        for (const k2 of keys) {
          if (value && value[k2]) {
            value = value[k2]
          } else {
            return key // Return key if not found
          }
        }
        return value
      }
    }

    return value
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
