# UZ-FISHLOG - Proje Dokümantasyonu v2.1

## 📋 Proje Özeti

**UZ-FishLog**, balıkçıların av kayıtlarını tutması, hava durumunu takip etmesi ve balık aktivitelerini analiz etmesi için geliştirilmiş profesyonel bir uygulama platformudur.

**v2.1 ile Web ve Mobil arasında tam özellik paritesi sağlandı.**

---

## 🎯 Platform Durumu

### Web Uygulaması (v1.7.0) ✅ Stabil
- **Konum:** `uz-fishlog/`
- **Teknoloji:** Next.js 16.1.1
- **Durum:** Tamamlandı, bakım modunda

### Mobil Uygulama (v2.1) ✅ Geliştiriliyor
- **Konum:** `uz-fishlog-mobile/`
- **Teknoloji:** React Native (Expo SDK 54)
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
- **Balık türü dropdown** (popüler + alfabetik + diğer seçeneği)
- "Diğer" seçeneği ile manuel tür girişi
- Av listesi
- Fotoğraf gösterimi (photo_url desteği)
- Login kontrolü

**Hava Durumu (weather.tsx)**
- Favori lokasyonlar (Supabase'den çekiliyor)
- **Haritadan konum seçme** (react-native-maps)
- **GPS ile mevcut konum alma** (expo-location)
- Yeni lokasyon ekleme modal'ı
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
- **Filtreleme** (balık türü + tarih aralığı)
- Filtre sonuç bilgisi gösterimi

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
├── data/
│   └── fishSpecies.ts      # Balık türleri listesi (TR/EN)
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
- [x] **React Native Maps entegrasyonu** (haritadan konum seçme)
- [x] **GPS ile mevcut konum alma** (expo-location)
- [x] Tema toggle butonu (ana sayfada)
- [x] **Balık türü dropdown** (modal picker)
- [x] **Analiz filtreleme** (DateTimePicker ile tarih seçimi)

---

## 🚧 Sonraki Adımlar

### Mobil - Hava Durumu Tab İyileştirmeleri (Öncelikli)
- [ ] Favori lokasyon düzenleme (isim değiştirme)
- [ ] Kullanıcı kendi default lokasyonunu seçebilmeli
- [ ] Hava durumu kartları küçültülecek
- [ ] 7 günlük hava tahmini eklenmeli
- [ ] Bugüne tıklayınca saatlik hava durumu gösterilmeli
- [ ] Deniz kontrolü (sadece deniz konumu seçilebilir) ✅ Tamamlandı

### Genel UI İyileştirmeleri (Gelecek)
- [ ] Font değişikliği (Web + Mobil)
  - Önerilen: Inter, Poppins, Nunito, Space Grotesk
  - Mobil: expo-font ile Google Fonts
  - Web: next/font ile Google Fonts

### Mobil - Kısa Vadeli
- [ ] Fotoğraf yükleme (expo-image-picker)
- [ ] Av silme/düzenleme
- [x] ~~React Native Maps entegrasyonu~~ ✅ Tamamlandı
- [x] ~~Haritadan konum seçme - deniz kontrolü~~ ✅ Tamamlandı
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

### Bölgesel Balık Verisi (Gelecek)
- [ ] `fish_presence` tablosunu doldurma
- [ ] Veri kaynakları:
  - Balıkçı forumları ve yerel bilgiler
  - AI destekli veri üretimi (GPT/Claude ile Türkiye balıkçılık verileri)
  - Crowdsource: Kullanıcı avlarından otomatik öğrenme
  - Tarım ve Orman Bakanlığı balıkçılık verileri
- [ ] İl/ilçe bazlı balık önerileri entegrasyonu
- [ ] Sezonluk balık takvimi

### Genel UI İyileştirmeleri (Gelecek)
- [ ] Font değişikliği (Web + Mobil)
  - Önerilen: Inter, Poppins, Nunito, Space Grotesk
  - Mobil: expo-font ile Google Fonts
  - Web: next/font ile Google Fonts

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
- **Framework:** React Native (Expo SDK 54)
- **Navigation:** Expo Router
- **State:** React Context + AsyncStorage
- **Styling:** React Native StyleSheet
- **Language:** TypeScript
- **Maps:** react-native-maps
- **Location:** expo-location
- **Date Picker:** @react-native-community/datetimepicker

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

### Bölgesel Balık Tabloları (Aktif)

#### Tablo İlişki Diyagramı
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  countries  │────<│  provinces  │────<│  districts  │────<│ water_bodies│
│             │     │             │     │             │     │             │
│ id          │     │ id          │     │ id          │     │ id          │
│ name        │     │ country_id  │     │ province_id │     │ district_id │
│ code        │     │ name        │     │ name        │     │ name        │
└─────────────┘     │ region      │     │ lat, lon    │     │ type        │
                    │ has_sea     │     │ has_sea     │     │ salinity    │
                    └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                   │
                    ┌─────────────┐     ┌─────────────┐            │
                    │fish_species │     │fishing_     │            │
                    │             │     │methods      │            │
                    │ id          │     │             │            │
                    │ name_tr     │     │ id          │            │
                    │ name_lat    │     │ method      │            │
                    │ water_pref  │     └──────┬──────┘            │
                    │ migratory   │            │                   │
                    │ sport_value │            │                   │
                    │ food_value  │            │                   │
                    │ notes       │            │                   │
                    └──────┬──────┘            │                   │
                           │                   │                   │
                           └─────────┬─────────┴───────────────────┘
                                     │
                              ┌──────┴──────┐
                              │fish_presence│ ⭐ Kritik Tablo
                              │             │
                              │ id          │
                              │ water_body_id (FK)
                              │ fish_id (FK)
                              │ fishing_method_id (FK)
                              │ presence_level
                              │ catch_probability
                              │ season_start/end
                              │ confidence_score
                              │ note, source
                              │ last_verified
                              └─────────────┘
```

#### countries (Ülkeler)
```sql
id, name, code
-- Türkiye verisi mevcut
```

#### provinces (İller)
```sql
id, country_id (FK), name, name_en, code, region, has_sea
-- 81 il verisi mevcut
```

#### districts (İlçeler)
```sql
id, province_id (FK), name, name_en, lat, lon, has_sea
-- 973 ilçe verisi mevcut (tüm Türkiye)
```

#### water_bodies (Su Kütleleri)
```sql
id, district_id (FK), name, type, salinity, lat, lon
-- type: sea, lake, river, dam, lagoon
-- ~110 su kütlesi (Marmara, Ege, Akdeniz, Karadeniz, Göller)
```

#### fish_species (Balık Türleri - Master)
```sql
id, name_tr, name_lat, water_preference, migratory, sport_value, food_value, notes
-- Levrek, Lüfer, Çinekop, İstavrit vb. mevcut
```

#### fish_presence (Bölge-Balık İlişkisi) ⭐ Kritik Tablo
```sql
id, water_body_id (FK), fish_id (FK), fishing_method_id (FK)
presence_level  -- yaygın / nadir / göçmen
catch_probability  -- 1-5 arası
season_start, season_end  -- ay (1-12)
confidence_score  -- veri güvenilirliği
note, source, last_verified
```

#### fishing_methods (Avlanma Yöntemleri)
```sql
id, method
-- kıyı, tekne, olta, zoka vb.
```

**Mevcut Veri Durumu:**
- 81 il, 973 ilçe (tüm Türkiye)
- ~110 su kütlesi (deniz kıyıları, göller, barajlar)
- Balık türleri master listesi (20 tuzlu su balığı)
- fish_presence tablosu henüz doldurulmadı (sonraki adım)

**TODO - Tatlı Su Balıkları:**
- [ ] fish_species tablosuna tatlı su balıkları eklenmeli (Sazan, Alabalık, Turna vb.)
- [ ] fishSpecies.ts dosyasına tatlı su balıkları eklenmeli
- [ ] locales/tr.json ve en.json çevirileri güncellenmeli
- [ ] Av ekleme ekranında water_preference'a göre filtreleme yapılmalı

---

## 🔄 Versiyon Geçmişi

### v2.1.0 (15 Ocak 2026) - Güncel
- **Mobil - Harita Entegrasyonu**
  - react-native-maps ile haritadan konum seçme
  - expo-location ile GPS konumu alma
  - "Konumumu Kullan" butonu
  - Haritaya tıklayarak favori ekleme
  - Web ve mobil arasında favoriler senkronize (aynı Supabase)

- **Mobil - Balık Türü Dropdown**
  - Popüler balıklar (Levrek, Lüfer, Çipura, Mırmır, İstavrit) üstte
  - 30+ balık türü TR/EN destekli
  - "Diğer" seçeneği ile manuel giriş
  - Modal picker ile seçim

- **Mobil - Analiz Filtreleme**
  - Balık türü filtresi (kullanıcının avladığı türlerden)
  - Tarih aralığı filtresi (DateTimePicker)
  - Filtre sonuç bilgisi gösterimi
  - Filtreleri temizle butonu

*Eski sürümler (v1.x - v2.0.x) için bkz: `UZ-FISHLOG-ARSIV.md`*

---

## 🔐 Güvenlik Notları

**ÖNEMLI - .gitignore Kontrolü:**
- Hassas dosyalar (API anahtarları, credentials) asla Git'e pushlamamalı
- Her yeni dosya eklerken `.gitignore` kontrol edilmeli
- SQL dosyaları şu an public (coğrafi veri, gizli bilgi yok)
- `.env*` dosyaları zaten gitignore'da

**Kontrol Listesi (Her Push Öncesi):**
- [ ] `.env` dosyaları gitignore'da mı?
- [ ] API anahtarları kod içinde hardcoded değil mi?
- [ ] Credentials içeren dosya var mı?
- [ ] Supabase URL/Key sadece environment'ta mı?

---

## 📚 Dosya Referansları

- **Web Proje:** `uz-fishlog/`
- **Mobil Proje:** `uz-fishlog-mobile/`
- **Arşiv:** `UZ-FISHLOG-ARSIV.md` (eski kararlar, analiz notları)
- **Domain:** http://falancayer.com

### SQL Dosyaları
- `sql/districts-all.sql` - Tüm Türkiye ilçeleri (973 ilçe, 81 il)
- `sql/districts-marmara.sql` - Sadece Marmara bölgesi (11 il, 158 ilçe)
- `sql/water-bodies-turkey.sql` - Türkiye su kütleleri (~110 lokasyon)

---

## 👥 Proje Bilgileri

**Geliştirici:** UZ FishLog Team (Uzbad)
**Proje Versiyonu:** 2.2.0
**Web Versiyonu:** 1.7.0 (Stabil)
**Mobil Versiyonu:** 2.2.0 (Geliştirme)
**Son Güncelleme:** 22 Ocak 2026

---

**🎣 İyi Avlar! 🎣**
