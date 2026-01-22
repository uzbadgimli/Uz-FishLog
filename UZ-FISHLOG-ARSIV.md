# UZ-FISHLOG - Arşiv Dokümantasyonu

## 📁 Bu Dosya Nedir?

Bu dosya, UZ-FishLog projesinin detaylı geçmiş bilgilerini, referans verilerini ve deployment süreçlerini içerir. Günlük geliştirmede nadiren ihtiyaç duyulan ancak önemli olan bilgiler burada saklanır.

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

**📁 Arşiv Dosyası - Son Güncelleme: 22 Ocak 2026**
