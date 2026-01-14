# UZ-FISHLOG - Proje Dokümantasyonu v2.0

## 📋 Proje Özeti

**UZ-FishLog**, balıkçıların av kayıtlarını tutması, hava durumunu takip etmesi ve balık aktivitelerini analiz etmesi için geliştirilmiş profesyonel bir uygulama platformudur.

**v2.0 ile artık hem Web hem de Mobil (iOS + Android) desteği mevcuttur.**

---

## 🎯 Platform Durumu

### Web Uygulaması (v1.7.0) ✅ Stabil
- **Konum:** `uz-fishlog/`
- **Teknoloji:** Next.js 16.1.1
- **Durum:** Tamamlandı, bakım modunda

### Mobil Uygulama (v2.0) ✅ Geliştiriliyor
- **Konum:** `uz-fishlog-mobile/`
- **Teknoloji:** React Native (Expo SDK 52)
- **Hedef:** iOS App Store + Android Play Store

---

## 📱 Mobil Uygulama (uz-fishlog-mobile)

### Tamamlanan Özellikler ✅

#### 1. **Proje Altyapısı**
- Expo SDK 52 + Expo Router (file-based navigation)
- TypeScript desteği
- Supabase React Native entegrasyonu
- AsyncStorage ile kalıcı veri saklama

#### 2. **Context Sistemi**
- **AuthContext:** Supabase Auth + AsyncStorage session
- **LanguageContext:** TR/EN çoklu dil, AsyncStorage ile tercih saklama
- **ThemeContext:** Dark/Light tema, AsyncStorage ile kalıcı

#### 3. **Tab Ekranları (5 Adet)**

**Ana Sayfa (index.tsx)**
- Hava durumu kartı (OpenMeteo API)
- Balık & yem önerileri
- Günün/toplam av sayısı
- Son avlar listesi
- Dark/Light tema toggle (☀️/🌙)
- Dil değiştirme (🇹🇷/🇬🇧)
- Ay fazı gösterimi

**Avlarım (catches.tsx)**
- Av kayıt formu (tür, boy, ağırlık, yer, tarih, not)
- Av listesi
- Fotoğraf gösterimi (photo_url desteği)
- Login kontrolü

**Hava Durumu (weather.tsx)**
- Favori lokasyonlar (Supabase'den çekiliyor)
- Yeni lokasyon ekleme modal'ı (isim, lat, lon)
- Lokasyon silme (uzun basma)
- Hava detayları (sıcaklık, rüzgar, nem, basınç, dalga)
- Balık & yem önerileri

**Aktivite (lunar.tsx)**
- Ay fazı gösterimi (emoji + isim)
- Ay yaşı, doğuş/batış saatleri
- Aktivite skoru (1-10, progress bar)
- **Ay fazına göre balık önerisi** (yeni eklendi)
- Solunar zamanları (Major/Minor)
- 18 günlük ay takvimi

**Analiz (stats.tsx)**
- Genel istatistikler (av, tür, yer sayısı)
- Boy/ağırlık istatistikleri
- En çok tutulan türler
- En başarılı yerler
- Zaman dağılımı (sabah/öğlen/akşam/gece)

#### 4. **Auth Modal**
- Email/Password giriş
- Kayıt olma
- Profil görüntüleme
- Çıkış yapma

### Mobil Proje Yapısı

```
uz-fishlog-mobile/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx     # Tab navigator
│   │   ├── index.tsx       # Ana sayfa
│   │   ├── catches.tsx     # Avlarım
│   │   ├── weather.tsx     # Hava durumu
│   │   ├── lunar.tsx       # Aktivite
│   │   └── stats.tsx       # Analiz
│   ├── _layout.tsx         # Root layout (providers)
│   └── modal.tsx           # Auth modal
├── contexts/
│   ├── AuthContext.tsx     # Kimlik doğrulama
│   ├── LanguageContext.tsx # Çoklu dil (i18n)
│   └── ThemeContext.tsx    # Dark/Light tema
├── lib/
│   └── supabase.js         # Supabase RN client
├── utils/
│   ├── moonPhase.js        # Ay hesaplamaları
│   ├── fishSuggestions.js  # Balık önerileri
│   ├── helpers.js          # Yardımcı fonksiyonlar
│   └── theme.js            # Tema renkleri
├── config/
│   └── fish-suggestions.json
├── locales/
│   ├── tr.json             # Türkçe
│   └── en.json             # İngilizce
└── constants/
    └── Colors.ts           # Expo renk sabitleri
```

---

## ✅ Tamamlanan Tüm Özellikler

### Web + Mobil Ortak
- [x] Av kayıt sistemi (CRUD)
- [x] Kullanıcı kimlik doğrulama (Supabase Auth)
- [x] Hava & deniz durumu (OpenMeteo API)
- [x] Ay fazı ve solunar takvim
- [x] İstatistikler
- [x] Çoklu dil (TR/EN)
- [x] Dark/Light tema
- [x] Balık & yem önerileri (50+ senaryo)
- [x] Ay fazına göre balık önerileri

### Sadece Web
- [x] Leaflet harita entegrasyonu
- [x] Fotoğraf yükleme (Supabase Storage)
- [x] 7 günlük hava tahmini
- [x] Grafik görünümleri (bar chart)
- [x] Google OAuth
- [x] Av silme/düzenleme
- [x] Analiz filtreleme (tarih aralığı, balık türü)
- [x] Balık türü dropdown (popüler balıklar + alfabetik liste)

### Sadece Mobil
- [x] Native tab navigation
- [x] AsyncStorage ile kalıcı tercihler
- [x] Koordinat ile lokasyon ekleme
- [x] Tema toggle butonu (ana sayfada)

---

## 🚧 Sonraki Adımlar

### Mobil - Kısa Vadeli
- [ ] Fotoğraf yükleme (expo-image-picker)
- [ ] Av silme/düzenleme
- [ ] React Native Maps entegrasyonu
- [ ] Pull-to-refresh
- [ ] Loading skeletons

### Mobil - Orta Vadeli
- [ ] Push notifications (expo-notifications)
- [ ] Konum izni ile otomatik lokasyon
- [ ] Offline mode (basic)
- [ ] App icon ve splash screen

### Mobil - Yayın Hazırlığı
- [ ] iOS Simulator / Android Emulator test
- [ ] Gerçek cihaz testi
- [ ] App Store Connect hesabı
- [ ] Play Console hesabı
- [ ] Store açıklamaları ve görseller
- [ ] İlk yayın (v1.0.0)

### Web - Düşük Öncelik
- [ ] Responsive iyileştirmeler

---

## 🛠️ Teknik Altyapı

### Ortak Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Email/Password)
- **Storage:** Supabase Storage (catch-photos)
- **API:** OpenMeteo (hava + marine)

### Web Stack
- **Framework:** Next.js 16.1.1
- **Styling:** CSS Modules
- **Harita:** Leaflet + React-Leaflet
- **Deployment:** Plesk static export

### Mobil Stack
- **Framework:** React Native (Expo SDK 52)
- **Navigation:** Expo Router
- **State:** React Context + AsyncStorage
- **Styling:** React Native StyleSheet
- **Language:** TypeScript

---

## 📊 Veritabanı Şeması

### catches
```sql
id UUID PRIMARY KEY
user_id UUID (FK auth.users)
species TEXT NOT NULL
length_cm INTEGER NOT NULL
weight_gr INTEGER
location TEXT NOT NULL
notes TEXT
hunt_date TIMESTAMP
photo_url TEXT
created_at TIMESTAMP
```

### favorite_locations (fav_places)
```sql
id UUID PRIMARY KEY
user_id UUID (FK auth.users)
name VARCHAR(100) NOT NULL
lat DECIMAL(10, 6) NOT NULL
lon DECIMAL(10, 6) NOT NULL
is_default BOOLEAN
created_at TIMESTAMP
```

**RLS:** Her iki tabloda da `auth.uid() = user_id` politikası aktif.

---

## 🔄 Versiyon Geçmişi

### v2.0.2 (14 Ocak 2026) - Güncel
- **Web İyileştirmeleri**
  - Analiz tabına filtreleme eklendi (tarih aralığı, balık türü)
  - Av kayıt formuna balık türü dropdown eklendi
  - Popüler balıklar (Levrek, Lüfer, Çipura, Mırmır, İstavrit) üstte
  - 30+ balık türü TR/EN destekli

### v2.0.1 (14 Ocak 2026)
- **Web İyileştirmeleri**
  - Av silme/düzenleme özelliği eklendi
  - İngilizce dil desteği hata düzeltmesi (t() fonksiyonu)

### v2.0.0 (14 Ocak 2026) 📱
- **Mobil Uygulama Eklendi**
  - React Native (Expo) ile iOS + Android desteği
  - 5 tab ekranı (Ana, Avlar, Hava, Aktivite, Analiz)
  - ThemeContext: Dark/Light tema toggle
  - Favori lokasyon yönetimi (ekleme, silme)
  - Ay fazına göre balık önerileri
  - Av listesinde fotoğraf gösterimi
  - AsyncStorage ile kalıcı tercihler

- **Web İyileştirmeleri**
  - Alert mesajları i18n'e çevrildi

### v1.7.0 (9 Ocak 2026)
- Fotoğraf yükleme özelliği
- Supabase Storage entegrasyonu

### v1.6.0 (7 Ocak 2026)
- Çoklu dil desteği (TR/EN)

### v1.5.0 (4 Ocak 2026)
- Büyük refactoring
- Kullanıcı kimlik doğrulama
- Modüler komponent yapısı

### v1.4.0 (27 Aralık 2025)
- Leaflet harita entegrasyonu
- Kullanıcı favorileri

---

## 📚 Dosya Referansları

- **Web Proje:** `uz-fishlog/`
- **Mobil Proje:** `uz-fishlog-mobile/`
- **Arşiv:** `UZ-FISHLOG-ARSIV.md` (eski kararlar, analiz notları)
- **Domain:** http://falancayer.com

---

## 👥 Proje Bilgileri

**Geliştirici:** UZ FishLog Team (Uzbad)
**Proje Versiyonu:** 2.0.0
**Web Versiyonu:** 1.7.0 (Stabil)
**Mobil Versiyonu:** 2.0.0 (Geliştirme)
**Son Güncelleme:** 14 Ocak 2026

---

**🎣 İyi Avlar! 🎣**
