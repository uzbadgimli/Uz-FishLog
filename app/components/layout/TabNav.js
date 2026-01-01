'use client'

import styles from '@/app/FishLog.module.css'

const tabs = [
  { id: 'home', icon: '🏠', label: 'Ana Sayfa' },
  { id: 'catches', icon: '🎣', label: 'Avlarım' },
  { id: 'weather', icon: '🌊', label: 'Hava' },
  { id: 'lunar', icon: '🌙', label: 'Aktivite' },
  { id: 'stats', icon: '📊', label: 'Analiz' }
]

export default function TabNav({ activeTab, setActiveTab, theme }) {
  return (
    <div className={styles.tabNav} style={{ background: theme.tabNav }}>
      <div className={styles.tabNavContent}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          >
            {activeTab === tab.id && <div className={styles.tabIndicator}></div>}
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
