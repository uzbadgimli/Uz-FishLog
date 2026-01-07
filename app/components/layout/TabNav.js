'use client'

import styles from '@/app/FishLog.module.css'
import { useLanguage } from '@/app/context/LanguageContext'

const tabConfig = [
  { id: 'home', icon: '🏠', labelKey: 'tabs.home' },
  { id: 'catches', icon: '🎣', labelKey: 'tabs.catches' },
  { id: 'weather', icon: '🌊', labelKey: 'tabs.weather' },
  { id: 'lunar', icon: '🌙', labelKey: 'tabs.lunar' },
  { id: 'stats', icon: '📊', labelKey: 'tabs.stats' }
]

export default function TabNav({ activeTab, setActiveTab, theme }) {
  const { t } = useLanguage()

  return (
    <div className={styles.tabNav} style={{ background: theme.tabNav }}>
      <div className={styles.tabNavContent}>
        {tabConfig.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          >
            {activeTab === tab.id && <div className={styles.tabIndicator}></div>}
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{t(tab.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
