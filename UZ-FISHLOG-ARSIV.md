# UZ-FISHLOG - Arşiv Dokümantasyonu

## 📁 Bu Dosya Nedir?

Bu dosya, UZ-FishLog projesinin detaylı geçmiş bilgilerini, referans verilerini ve deployment süreçlerini içerir. Günlük geliştirmede nadiren ihtiyaç duyulan ancak önemli olan bilgiler burada saklanır.

---

## ✅ Tamamlanan Özellikler — Haziran 2026 (v2.4)

### Premium / Freemium Sistemi
- `user_subscriptions`, `user_usage`, `fish_identifications` tabloları oluşturuldu
- RLS policy'ler, `increment_usage()`, `get_or_create_usage()` fonksiyonları
- `SubscriptionContext` — tier, usage, feature gating (canAddCatch, canAddPhoto, canIdentifyFish)
- Paywall ekranı: free vs premium karşılaştırma tablosu, aylık/yıllık plan kartları
- **Fiyat:** ₺39/ay, ₺299/yıl
- **Free limitleri:** 10 av/ay, 5 fotoğraf/ay, analiz 180 gün, arkadaş sınırsız
- **Premium:** sınırsız av+foto, AI tanıma 20/ay, reklamsız

### AI Balık Tanıma
- Supabase Edge Function: `identify-fish` (Deno + Claude Vision API)
- Premium kontrolü, aylık 20 kullanım sınırı
- Base64 fotoğraf → Claude Sonnet → JSON (species_tr, species_en, scientific_name, confidence, description)
- **Standalone AI paneli** (catches tab üstü): fotoğraf seç → tanı → sonuç → "Av Olarak Kaydet"
- Form içinde de AI butonu (fotoğraf seçince görünür, tür otomatik dolar)

### UI İyileştirmeleri
- "Yeni Av Ekle" formu collapsible yapıldı (+ toggle)
- Fotoğraf butonları küçültüldü (yatay kompakt satır)
- Ana sayfada aktivite skoru ay ikonunun yanında renkli badge
- Catch visibility profil sayfasından kaldırıldı → sadece av kaydederken seçiliyor
- "Sadece Arkadaşlar" → "Arkadaşlar" kısaltıldı
- Settings'e "Arkadaşını Davet Et" butonu (Share API)

### Lokasyon İyileştirmeleri
- Default lokasyon Kartal → **Sarıyer** (Boğaz)
- Konum eklenmemişse ana sayfa hava kartı → "Konum Seçilmedi" mesajı + yönlendirme
- `SelectedLocationContext` oluşturuldu: hava tabı seçilen konum → aktivite tabına senkron

---

## 🚀 Deployment Süreci

### 1. Geliştirme (Local)
```bash
npm run dev          # Development server
```

### 2. Build
```bash
rm -rf out          # Eski build'i temizle
npm run build       # Yeni build
```

### 3. GitHub
```bash
git add .
git commit -m "Açıklama"
git push origin main
```

### 4. Plesk Deployment
1. Plesk > Git sekmesi > **Pull**
2. Dosya Yöneticisi > `out` klasörü
3. `out` içindeki tüm dosyaları `httpdocs` içine taşı
4. Tarayıcıda test: `http://falancayer.com`

---

## 📝 Geliştirme Notları

### Önemli Kararlar

1. **Tailwind CSS İptal Edildi**
   - Kurulum sorunları yaşandı
   - CSS Modules + Inline Styles kullanılıyor
   - Daha stabil, garantili çalışıyor

2. **Static Export Tercih Edildi**
   - Plesk Node.js desteği sorunlu
   - Statik HTML/CSS/JS export daha güvenilir
   - `next.config.js` > `output: 'export'`

3. **Solunar Hesaplama Gerçek Formülle**
   - Math.random() yerine ay yaşına dayalı deterministik hesaplama
   - Yeni Ay/Dolunay = 9-10 skor
   - Dördünler = 4-5 skor
   - Ara günler = 6-8 skor

4. **Leaflet Dynamic Import**
   - SSR hatalarını önlemek için `next/dynamic` kullanıldı
   - MapComponent ayrı dosyada

### Çözülen Sorunlar

- ✅ Tailwind CSS yüklenmeme → CSS Modules kullanıldı
- ✅ Plesk Node.js deployment → Static export tercih edildi
- ✅ Form input büyüklükleri → Inline style ile çözüldü
- ✅ Av listesi düzeni → Grid layout ile düzenlendi
- ✅ Hava durumu API → OpenMeteo entegre edildi
- ✅ Solunar rastgele skor → Gerçek hesaplama formülü
- ✅ Dark mode uyumsuzlukları → Tüm sayfalar tema desteği
- ✅ Leaflet SSR hatası → Dynamic import ile çözüldü

---

## 🎨 Tasarım Sistemi

### Renk Paleti

**Açık Tema:**
- Lacivert: `#1E3A8A` (başlıklar)
- Koyu Mavi: `#1E40AF` (butonlar, vurgular)
- Arka Plan: `#F8FAFC`
- Kart: `white`

**Koyu Tema:**
- Arka Plan: `#0F172A`
- Kart: `#1E293B`
- Border: `#334155`
- Text: `#F1F5F9`
- Accent Mavi: `#60A5FA`
- Secondary: `#94A3B8`

**Vurgu Renkleri:**
- Soluk Turuncu: `#FB923C` (önemli bilgiler)
- Yeşil: `#34D399` (başarı, major period)
- Sarı: `#FBBF24` (minor period)

### Tipografi
- Başlıklar: Bold, 1.125rem - 1.5rem
- Veri gösterimi: 1.5rem - 2rem, bold
- Body text: 0.875rem - 1rem
- Küçük bilgiler: 0.75rem

---

## 📂 Proje Yapısı

```
uz-fishlog/
├── app/
│   ├── page.js              # Ana component (~1900 satır)
│   ├── layout.js            # Root layout
│   ├── globals.css          # Global stiller
│   ├── FishLog.module.css   # Component stilleri
│   └── components/
│       └── MapComponent.js  # Leaflet harita component
├── lib/
│   └── supabase.js          # Supabase client
├── public/                  # Statik dosyalar
├── out/                     # Build çıktısı (deploy edilecek)
├── package.json
├── next.config.js
└── .env.local              # Environment variables
```

---

## 🎣 Balık & Yem Veri Tabanı

### Marmara & Karadeniz Hedef Balıklar

1. **Levrek** - Minnow (11-14cm), silikon, canlı yem
2. **Çupra** - Küçük minnow (7-9cm), canlı karides
3. **Lüfer** - Popper, stick bait, metal jig
4. **İstavrit** - Sabiki, küçük jig
5. **Palamut** - Metal pilker, büyük minnow
6. **Mezgit** - Silikon, canlı yem
7. **Hamsi** - İğne takımı
8. **Kolyoz** - Sabiki
9. **İskorpit** - Fosforlu silikon, canlı yem

### Hava Durumu - Balık İlişkisi

**Soğuk Hava (< 10°C):**
- Levrek, Mezgit aktif
- Derin sulara git
- Ağır yemler kullan

**İdeal (10-18°C):**
- Levrek, Çupra, Lüfer en aktif
- Sabah/akşam saatleri mükemmel
- Tüm yem tipleri etkili

**Sıcak Hava (> 18°C):**
- Çupra, İstavrit, Kolyoz aktif
- Gün batımı önemli
- Küçük yemler tercih et

**Rüzgarlı (> 25 km/s):**
- Zorlu koşullar
- Mezgit ve İskorpit dipte bekliyor
- Fosforlu silikon, ağır metal jig, kalamar parçası

---

## 🔄 Versiyon Geçmişi

### v1.3.0 (27 Aralık 2025)
- ✅ Dark/Light Tema Desteği
  - Tüm sayfalar koyu tema uyumlu
  - Göz yormayan renk paleti
  - Tema toggle butonu
- ✅ Solunar Skorları Gerçek Hesaplama
  - Math.random() kaldırıldı
  - Ay yaşına dayalı deterministik formül
- ✅ Hava Tabı Güncelleme
  - 6 favori lokasyon (gerçek koordinatlar)
  - 6 bilgi kartı (sıcaklık, rüzgar, yön, dalga, nem, basınç)
  - Balık + yem tavsiyesi her lokasyonda

### v1.2.0 (27 Aralık 2025)
- ✅ Balık Aktivite Takvimi (Ay Fazları)
  - 18 günlük ay fazı takvimi
  - Solunar aktivite (Major/Minor periyotlar)
  - Balık aktivite skoru (1-10)
  - Ay doğuş/batış saatleri
- ✅ Analiz & İstatistikler Sayfası
  - Genel bakış (toplam av, tür, yer)
  - Boy/ağırlık istatistikleri
  - Tür dağılımı grafiği
  - En başarılı yerler sıralaması
  - Saat dağılımı analizi

### v1.1.0 (24 Aralık 2025)
- ✅ Hava durumu detay kartı (6 bilgi)
- ✅ Balık ve yem önerileri
- ✅ Bugün vs Toplam istatistik
- ✅ Av kayıt formu (tarih/saat picker)
- ✅ Hava & Deniz tab (favori lokasyonlar)
- ✅ 7 günlük hava tahmini
- ✅ Gün doğumu/batımı

### v1.0.0 (23 Aralık 2025)
- ✅ Temel av kayıt sistemi
- ✅ Supabase entegrasyonu
- ✅ Basit hava durumu
- ✅ İlk deployment

---

## 📱 Mobil Uygulama Geçiş Analizi (12 Ocak 2026)

### Mevcut Durum Değerlendirmesi

Web uygulaması v1.7.0'a ulaştı ve tüm temel özellikler tamamlandı. Ancak:
- PWA olarak kullanımda UI sorunları var (yazılar kayıyor, ikonlar üst üste biniyor)
- Kullanıcı geri bildirimi: "App Store'dan indiremezlersem kullanmayacaklar"
- Ticari potansiyel için native mobil uygulama şart

### Platform Seçenek Analizi

| Seçenek | Kod Yeniden Kullanım | Öğrenme Eğrisi | App Store | Performans |
|---------|---------------------|----------------|-----------|------------|
| **React Native (Expo)** | %40-50 | Düşük (React bilgisi var) | ✅ Evet | İyi |
| **Flutter** | %0 (Dart öğrenmek lazım) | Yüksek | ✅ Evet | Çok İyi |
| **Capacitor/Ionic** | %70-80 | Çok Düşük | ✅ Evet | Orta |
| **PWA Geliştir** | %100 | Yok | ❌ Hayır | Düşük |

### Seçilen Yaklaşım: React Native (Expo)

**Neden Expo?**
1. Mevcut React/JavaScript bilgisi direkt kullanılabilir
2. Tek kod tabanından iOS + Android + Web çıktısı
3. Supabase JS kütüphanesi React Native'de çalışır
4. OTA (Over-the-Air) güncelleme desteği

**%100 Taşınabilir Kodlar:**
- `utils/moonPhase.js` - Ay fazı hesaplamaları
- `utils/fishSuggestions.js` - Balık öneri algoritması
- `utils/theme.js` - Renk paleti
- `utils/helpers.js` - Yardımcı fonksiyonlar
- `config/fish-suggestions.json` - 53+ senaryo
- `locales/tr.json`, `locales/en.json` - Çeviriler

**Adapte Edilecek Kodlar:**
- `context/AuthContext.js` - localStorage → AsyncStorage
- `context/LanguageContext.js` - localStorage → AsyncStorage
- `lib/supabase.js` - React Native config eklenmeli

**Yeniden Yazılacaklar:**
- Tüm UI bileşenleri (CSS → StyleSheet)
- Navigation (Expo Router)
- Harita (Leaflet → react-native-maps)
- Fotoğraf (File input → expo-image-picker)

### Proje Yapısı Kararı

**Ayrı Klasör/Repo** seçildi:
- `uz-fishlog/` - Mevcut web projesi (korunacak)
- `uz-fishlog-mobile/` - Yeni Expo projesi

### Planlanan Teknoloji Stack

```
Framework:     Expo SDK 52+
Routing:       Expo Router v4
Styling:       React Native StyleSheet
State:         React Context (mevcut yapı)
Backend:       Supabase (aynı proje)
Maps:          react-native-maps
Charts:        react-native-chart-kit
Image Picker:  expo-image-picker
Storage:       AsyncStorage
```

---

## 🔄 Tamamlanan Özellikler Özeti (Web v1.7.0)

### v1.0 - v1.3 (Aralık 2025)
- ✅ Temel av kayıt sistemi
- ✅ Supabase entegrasyonu
- ✅ Hava durumu API
- ✅ Dark/Light tema
- ✅ Solunar hesaplama
- ✅ Favori lokasyonlar

### v1.4 - v1.5 (Ocak 2026)
- ✅ Leaflet harita entegrasyonu
- ✅ Kullanıcı kimlik doğrulama (Auth)
- ✅ Tab bazlı erişim kontrolü
- ✅ Büyük refactoring (~1900 → ~385 satır)
- ✅ Marine API entegrasyonu
- ✅ Inter font

### v1.6 - v1.7 (Ocak 2026)
- ✅ Çoklu dil desteği (TR/EN)
- ✅ Fish suggestions parametrik JSON
- ✅ Fotoğraf yükleme (Supabase Storage)
- ✅ RLS güvenlik politikaları

---

## 📚 Uzun Vadeli Gelecek Adımlar (Arşivlendi)

### Tamamlananlar ✅
1. ~~Çok kullanıcılı sistem (login)~~ ✅ v1.5.0
2. ~~Kullanıcı bazlı favori yerler~~ ✅ v1.4.0
3. ~~Fotoğraf yükleme~~ ✅ v1.7.0
4. ~~Çoklu dil desteği~~ ✅ v1.6.0

### Mobil Uygulamaya Taşınanlar
1. PWA desteği → Native uygulama olarak çözülecek
2. Offline mod → Gerekli değil (kullanıcı kararı)
3. Push bildirimleri → expo-notifications ile
4. Sosyal özellikler → Mobil sonrası değerlendirilecek

---

---

## 🔄 Eski Versiyon Geçmişi (Ana Dokümandan Taşındı)

### v2.0.2 (14 Ocak 2026)
- **Web İyileştirmeleri**
  - Analiz tabına filtreleme eklendi (tarih aralığı, balık türü)
  - Av kayıt formuna balık türü dropdown eklendi
  - Popüler balıklar (Levrek, Lüfer, Çipura, Mırmır, İstavrit) üstte
  - 30+ balık türü TR/EN destekli

### v2.0.1 (14 Ocak 2026)
- **Web İyileştirmeleri**
  - Av silme/düzenleme özelliği eklendi
  - İngilizce dil desteği hata düzeltmesi (t() fonksiyonu)

### v2.0.0 (14 Ocak 2026)
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

---

## ✅ Tamamlanan Özellikler (Detay)

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
- [x] React Native Maps entegrasyonu (haritadan konum seçme)
- [x] GPS ile mevcut konum alma (expo-location)
- [x] Tema toggle butonu (ana sayfada)
- [x] Balık türü dropdown (modal picker)
- [x] Analiz filtreleme (DateTimePicker ile tarih seçimi)

---

## 📱 Mobil Proje Yapısı (Referans)

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
│   ├── modal.tsx           # Auth modal
│   ├── profile.tsx         # Profil & arkadaşlar
│   └── settings.tsx        # Ayarlar modal
├── contexts/
│   ├── AuthContext.tsx     # Kimlik doğrulama
│   ├── LanguageContext.tsx # Çoklu dil (i18n)
│   ├── ThemeContext.tsx    # Dark/Light tema
│   └── ProfileContext.tsx  # Profil & arkadaşlık
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

## 📊 Veritabanı Şeması (Referans)

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

### Bölgesel Tablolar İlişki Diyagramı
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
                              │fish_presence│
                              │             │
                              │ id          │
                              │ water_body_id (FK)
                              │ fish_id (FK)
                              │ fishing_method_id (FK)
                              │ presence_level
                              │ catch_probability
                              │ season_start/end
                              │ confidence_score
                              │ source, is_active
                              └─────────────┘
```

---

## ✅ Tamamlanan Mobil Özellikler (Şubat 2026)

### Mobil - Hava Durumu Tab ✅
- Favori lokasyon düzenleme (isim değiştirme)
- Kullanıcı default lokasyon seçimi
- 7 günlük hava tahmini
- Saatlik hava detayı (bugüne tıklayınca)

### Mobil - Kısa Vadeli ✅
- Fotoğraf yükleme (expo-image-picker)
- Av silme/düzenleme
- Pull-to-refresh
- Loading skeletons

### Mobil - Orta Vadeli ✅
- Push notifications (expo-notifications) — Local scheduled notifications
  - Günlük balıkçılık tahmini (07:00)
  - Yüksek aktivite uyarısı (skor >= 8, 06:00)
  - Bildirim tercih yönetimi (AsyncStorage)
  - Bildirime tıklayınca ilgili tab'a yönlendirme
- ~~Offline mode~~ (iptal — anlık hava verisi gerekli)
- App icon ve splash screen

### Genel UI İyileştirmeleri ✅
- Typography standardizasyonu (Mobil)
  - Merkezi `utils/typography.ts` dosyası oluşturuldu
  - 18 farklı fontSize → 11 token'a indirgendi
  - Semantik stiller: heading1-3, body, caption, label, input, statValue vb.
  - Tüm 5 ekrana (index, lunar, stats, catches, weather) uygulandı
  - lineHeight ve fontWeight tutarlılığı sağlandı

---

## ✅ Tamamlanan Özellikler (Mart 2026)

### Bölgesel Balık Verisi — Tamamlandı ✅
- Tüm Türkiye lokasyonları eklendi (81 il, 973 ilçe, ~110 su kütlesi)
- İl/ilçe bazlı balık önerileri entegrasyonu (mobil)
- Sezonluk balık takvimi (mobil)
- Hibrit balık öneri sistemi (hava durumu + bölgesel veri birleştirildi)

### Tatlı Su Balıkları ✅
- 6 yeni tür eklendi: Alabalık, Sudak, Yayın Balığı, Tatlı Su Levreği, Karabalık, Şabut
- Toplam: 35 balık türü (27 tuzlu su, 8 tatlı su)
- `data/fishSpecies.ts` yeniden yapılandırıldı: `water_preference` alanı (salt/fresh/both)
- Av kayıt formuna su tipi filtresi eklendi (Tümü / Deniz / Tatlı Su chip'leri)
- SQL: `sql/fish-species-freshwater.sql` — 6 yeni tür + 10 fish_presence kaydı
  - Abant Gölü: Alabalık
  - Beyşehir Gölü: Sudak (2), Yayın
  - Sapanca Gölü: Sudak (2), Yayın, Alabalık
  - Eğirdir Gölü: Sudak (2)

### Hibrit Balık Öneri Sistemi ✅
- `utils/hybridFishScore.ts` — 35 balık davranış profili + 4 faktörlü skorlama
  - Sıcaklık uyumu (0-40 puan): `water_temp_min/max` ile karşılaştırma
  - Rüzgar etkisi (0-25 puan): Balık derinlik profiline göre (surface/pelagic/bottom)
  - Basınç etkisi (0-20 puan): Düşük/normal/yüksek basınç × derinlik
  - Sezon bonusu (0-15 puan): Sezon ortası vs kenarı
- Final skor: `hybridScore = (weatherScore × 0.6) + (catch_probability × 0.4)`
- Weather tab'da iki ayrı kart → tek "Bugün Ne Avlanır?" kartı
- Water body bulunamazsa eski `getFishSuggestion()` fallback
- TR/EN hava durumu ipuçları (weatherTip)

### Eklenen/Güncellenen Dosyalar
- `utils/hybridFishScore.ts` — YENİ: Hibrit skorlama algoritması
- `utils/regionalFish.ts` — GÜNCELLE: `water_temp_min/max` eklendi
- `data/fishSpecies.ts` — YENİDEN YAZILDI: `water_preference` + tatlı su balıkları
- `app/(tabs)/weather.tsx` — GÜNCELLE: Tek birleşik hibrit kart
- `app/(tabs)/catches.tsx` — GÜNCELLE: Su tipi filtre chip'leri
- `sql/fish-species-freshwater.sql` — YENİ: 6 tür + 10 fish_presence
- `fish_species.csv` — GÜNCELLE: 6 yeni tatlı su kaydı
- `locales/tr.json` — GÜNCELLE: hybrid, allWater, saltWater, freshWater
- `locales/en.json` — GÜNCELLE: hybrid, allWater, saltWater, freshWater

### Referans Veri Kaynakları → Global Strateji'ye Taşındı
- FishBase/OBIS entegrasyonu → Faz 4'e eklendi
- Crowdsourcing → Faz 2'ye eklendi
- AI + Forum scraping → Faz 3'e eklendi
- Ayrı bölüm olarak kaldırıldı

---

## ✅ Tamamlanan Özellikler (Mart 2026 - Sosyal Sistem)

### Header UI ✅
- Sol: Avatar butonu (profil sayfasına yönlendirir, bekleyen istek badge'i)
- Sağ: Ayarlar (gear) ikonu
- Yeni tab eklenmedi, mevcut 5 tab korundu

### Ayarlar Ekranı ✅ (settings.tsx - Modal)
- Dil seçimi (index'ten taşındı)
- Tema seçimi (index'ten taşındı)
- Bildirim tercihleri (AsyncStorage ile kalıcı, Switch ile toggle)
- Hesap (giriş/çıkış, hesap silme)
- Privacy Policy / ToS linkleri
- Uygulama versiyonu

### Profil & Sosyal Sistem ✅
- Profil bilgileri (isim, bio, toplam av sayısı, üyelik tarihi)
- Arkadaş sistemi (e-posta ile ekleme, istek → onay/red)
- Arkadaşlarım listesi + favori arkadaşlar (yıldız toggle)
- Gizlilik ayarları (avlarım: herkese/arkadaşlara/gizli)
- Header'da avatar butonu (sol) + pending request badge
- Veritabanı: `sql/social-profiles.sql`
  - `user_profiles` tablosu (auto-create trigger ile)
  - `friendships` tablosu (bidirectional after acceptance)
  - `find_user_by_email` RPC fonksiyonu (SECURITY DEFINER)
  - RLS politikaları (profil: herkes okur, kendi günceller; arkadaşlık: kendi görür/yönetir)

### Sosyal Feed ✅
- Arkadaş avları akışı (index.tsx'e "Arkadaş Avları" bölümü)
- Paylaşım seçenekleri (public/friends/private) — av ekleme formunda visibility selector
- catches tablosuna `visibility` kolonu eklendi

### Eklenen/Güncellenen Dosyalar
- `sql/social-profiles.sql` — YENİ: Profil, arkadaşlık tabloları, RLS, RPC
- `contexts/ProfileContext.tsx` — YENİ: Profil ve arkadaşlık state yönetimi
- `app/profile.tsx` — YENİ: Profil ekranı (düzenleme, arkadaşlar, gizlilik)
- `app/settings.tsx` — YENİ: Ayarlar modal ekranı
- `app/(tabs)/_layout.tsx` — GÜNCELLE: HeaderProfileButton + HeaderSettingsButton
- `app/(tabs)/index.tsx` — GÜNCELLE: Arkadaş feed bölümü
- `app/(tabs)/catches.tsx` — GÜNCELLE: Visibility selector
- `app/_layout.tsx` — GÜNCELLE: ProfileProvider + profile/settings route
- `locales/tr.json`, `locales/en.json` — GÜNCELLE: profile bölümü (35+ key)

---

**📁 Arşiv Dosyası - Son Güncelleme: Mart 2026**
