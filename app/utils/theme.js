// Tema renkleri - Dark/Light mode için
export function getTheme(isDarkMode) {
  return {
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
}
