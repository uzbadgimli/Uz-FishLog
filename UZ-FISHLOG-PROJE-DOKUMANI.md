# UZ-FISHLOG - Proje Dokümantasyonu

## 📋 Proje Özeti

**UZ-FishLog**, balıkçıların av kayıtlarını tutması, hava durumunu takip etmesi ve balık aktivitelerini analiz etmesi için geliştirilmiş profesyonel bir web uygulamasıdır.

---

## 🎯 Temel Özellikler

### ✅ Tamamlanan Özellikler

#### 1. **Ana Sayfa (Dashboard)**
- **Bugünkü Avlar vs Toplam İstatistik:** Yan yana kartlarda gösterim
- **Hızlı Hava Durumu:** İstanbul Kartal varsayılan lokasyon
  - Sıcaklık, rüzgar hızı/yönü
  - Dalga yüksekliği (Marine API), nem, basınç (6 bilgi)
  - Login olan kullanıcılar favorilerinden varsayılan lokasyon seçebilir
- **Balık & Yem Önerileri:** Hava koşullarına göre otomatik öneri
  - Hangi balıklar aktif
  - Tavsiye edilen yemler (minnow, silikon, vs.)
- **Son 3 Av:** Hızlı görüntüleme
- **Ay Fazı Gösterimi:** Üst başlıkta otomatik hesaplama

#### 2. **Avlarım (Catch Log)**
- **Av Kayıt Formu:**
  - Balık türü
  - Boy (cm) ve ağırlık (gr)
  - Tutulan yer
  - Tarih ve saat seçimi (takvim + saat picker)
  - Notlar (olta takımı, yem, teknik detaylar)

- **Av Listesi Görünümü:**
  - Düzenli tablo formatı:
    - Üst satır: TÜR | BOY + AĞIRLIK
    - Alt satır: YER | TARİH + SAAT
    - Notlar: Ayrı bölümde
  - Renk kodlu, okunabilir tasarım

#### 3. **Hava & Deniz Durumu** ✅
- **Favori / Harita Toggle:**
  - ⭐ Favoriler modu - Sabit lokasyonlardan seçim
  - 🗺️ Haritadan Seç modu - İnteraktif harita

- **6 Sabit Favori Lokasyon:**
  - Kumbağ (Tekirdağ - Marmara)
  - Altınova (Yalova - Marmara)
  - NATO Limanı (İzmit - Marmara)
  - Pendik (İstanbul - Marmara)
  - Şile (İstanbul - Karadeniz)
  - Atakum (Samsun - Karadeniz)

- **Leaflet Harita Entegrasyonu:**
  - Marmara ve Karadeniz bölgesi görünümü
  - Tıklama ile konum seçme
  - Koyu/açık tema desteği
  - Özel marker tasarımı

- **Kullanıcı Favorileri (Supabase):**
  - Haritadan seçilen konumu kaydetme
  - Kaydedilen favoriler listesi
  - Favori silme özelliği

- **Detaylı Hava Bilgisi (6 Kart):**
  - Sıcaklık, Rüzgar, Yön
  - Dalga, Nem, Basınç
  - 7 günlük tahmin
  - Gün doğumu/batımı saatleri

- **Balık & Yem Tavsiyeleri:** Seçilen lokasyon için özelleştirilmiş

#### 4. **Balık Aktivite Takvimi** ✅
- **Ay Fazları Takvimi**
  - Görsel ay fazı gösterimi (emoji)
  - 18 günlük takvim görünümü
  - Tıklanabilir günler ve detay kartı
  - Ay doğumu/batımı saatleri

- **Solunar Aktivite**
  - Major/Minor periyotlar (yeşil/sarı kutular)
  - Balık aktivite skoru (1-10) - Gerçek solunar hesaplama
  - En iyi avlanma saatleri önerisi
  - Solunar teorisi bilgi notu

#### 5. **Analiz & İstatistikler** ✅
- **Genel Bakış:**
  - Toplam av, farklı tür, farklı yer sayıları
  - Boy/ağırlık istatistikleri (en büyük, ortalama)

- **Grafikler:**
  - Tür dağılımı (bar chart)
  - Saat dağılımı (sabah/öğlen/akşam/gece)

- **En Başarılı:**
  - Yerler sıralaması (madalyalı liste)
  - Zaman dilimi analizi

#### 6. **Dark/Light Tema** ✅
- Üst barda tema değiştirme butonu (güneş/ay emoji)
- Koyu tema: Göz yormayan koyu mavi tonları (#0F172A, #1E293B)
- Açık tema: Temiz beyaz tonları
- Tüm sayfalarda uyumlu çalışıyor

---

#### 7. **Kullanıcı Kimlik Doğrulama (Authentication)** ✅
- **Supabase Auth Entegrasyonu:**
  - Email/Password ile kayıt ve giriş
  - Google OAuth desteği (opsiyonel)
  - Oturum yönetimi (session management)
- **Tab Bazlı Erişim Kontrolü:**
  - Ana Sayfa: Herkese açık
  - Avlarım: Giriş gerekli (kullanıcı bazlı veriler)
  - Hava & Deniz: Giriş gerekli
  - Aktivite: Giriş gerekli
  - Analiz: Giriş gerekli (kullanıcı bazlı istatistikler)
- **Kullanıcı Bazlı Veri İzolasyonu:**
  - Her kullanıcı sadece kendi avlarını görür
  - Supabase RLS (Row Level Security) ile güvenlik

---

## 🏗️ Mimari ve Modüler Yapı

### Komponent Organizasyonu ✅

**Ana Dosya Yapısı:**
```
app/
├── page.js                    # Ana sayfa (~385 satır - state yönetimi)
├── FishLog.module.css         # Tüm stiller
├── components/
│   ├── layout/
│   │   ├── Header.js          # Üst başlık (tema, ay fazı, dil, kullanıcı)
│   │   └── TabNav.js          # Alt navigasyon (sticky)
│   ├── tabs/
│   │   ├── HomeTab.js         # Ana sayfa içeriği
│   │   ├── CatchesTab.js      # Av kayıtları
│   │   ├── WeatherTab.js      # Hava durumu + harita
│   │   ├── LunarTab.js        # Ay takvimi + solunar
│   │   └── StatsTab.js        # İstatistikler
│   ├── modals/
│   │   └── AuthModal.js       # Giriş/Kayıt modalı
│   └── map/
│       └── MapComponent.js    # Leaflet harita (dynamic import)
├── context/
│   ├── AuthContext.js         # Kimlik doğrulama context
│   └── LanguageContext.js     # Çoklu dil context (i18n)
└── utils/
    ├── fishSuggestions.js     # Balık/yem önerileri (50+ senaryo, çoklu dil)
    ├── moonPhase.js           # Ay fazı hesaplamaları (çoklu dil)
    ├── helpers.js             # Yardımcı fonksiyonlar
    └── supabase.js            # Supabase client

locales/
├── tr.json                    # Türkçe çeviriler
└── en.json                    # İngilizce çeviriler

config/
└── fish-suggestions.json      # Balık önerisi parametreleri
```

**Refactoring Özeti:**
- page.js: ~1900 satırdan ~385 satıra düşürüldü
- 5 tab komponenti oluşturuldu (props-based, Context kullanılmadı)
- Her tab bağımsız ve test edilebilir

---

## 🐟 Balık & Yem Öneri Sistemi

### Gelişmiş Öneri Algoritması ✅

**Toplam 50+ Senaryo:**
- 4 Mevsim (İlkbahar, Yaz, Sonbahar, Kış)
- 4 Zaman Dilimi (Sabah, Öğlen, Akşam, Gece)
- Sıcaklık aralıkları
- Rüzgar hızı değerlendirmesi
- Basınç değişimleri

**Örnek Senaryolar:**
- İlkbahar sabahı + düşük rüzgar → Levrek, Çipura aktif
- Yaz akşamı + sıcak → Lüfer, Palamut yüzeyde
- Kış gecesi + yüksek basınç → Karagöz, Mercan derinde
- Fırtına öncesi → Tüm balıklar agresif besleniyor

**Ay Fazına Göre Öneriler:**
- Dolunay: Gece avı için ideal
- Yeni ay: Gündüz aktivitesi yüksek
- Hilal dönemleri: Gün doğumu/batımı en verimli

---

## 🚧 Mevcut Durum ve Sonraki Adımlar

### Web Uygulaması Durumu (v1.7.0) ✅

Tüm temel özellikler tamamlandı:
- [x] Av kayıt sistemi (CRUD)
- [x] Kullanıcı kimlik doğrulama
- [x] Hava & deniz durumu
- [x] Ay fazı ve solunar takvim
- [x] İstatistikler ve grafikler
- [x] Fotoğraf yükleme
- [x] Çoklu dil (TR/EN)
- [x] Dark/Light tema

**Bilinen Sorunlar:**
- PWA modunda responsive sorunlar (yazılar kayıyor, ikonlar üst üste)
- Kullanıcı geri bildirimi: App Store yayını olmadan kullanım düşük

---

### 📱 Sonraki Büyük Adım: Mobil Uygulama

**Karar:** React Native (Expo) ile native mobil uygulama geliştirilecek

**Hedef Platformlar:**
- iOS (App Store)
- Android (Play Store)
- Web (Expo Web - opsiyonel)

**Proje Yapısı:**
```
~/Development/
├── uz-fishlog/          ← Mevcut web (korunuyor)
└── uz-fishlog-mobile/   ← Yeni Expo projesi
```

### Mobil Uygulama Geliştirme Fazları

#### Faz 1: Proje Kurulumu
- [ ] Expo projesi oluştur
- [ ] Supabase React Native client kurulumu
- [ ] Expo Router kurulumu (Tab + Stack navigation)
- [ ] Temel klasör yapısı

#### Faz 2: Utility & Config Taşıma
- [ ] `moonPhase.js` → olduğu gibi kopyala
- [ ] `fishSuggestions.js` → olduğu gibi kopyala
- [ ] `theme.js` → olduğu gibi kopyala
- [ ] `fish-suggestions.json` → olduğu gibi kopyala
- [ ] `locales/*.json` → olduğu gibi kopyala

#### Faz 3: Context Adaptasyonu
- [ ] AuthContext → AsyncStorage + Supabase RN
- [ ] LanguageContext → AsyncStorage

#### Faz 4: UI Bileşenleri (Yeniden Yazım)
- [ ] TabNav → React Navigation Bottom Tabs
- [ ] TopBar → Custom header
- [ ] HomeTab → React Native StyleSheet
- [ ] CatchesTab → expo-image-picker + Form
- [ ] WeatherTab → react-native-maps
- [ ] LunarTab → StyleSheet
- [ ] StatsTab → react-native-chart-kit

#### Faz 5: Native Özellikler
- [ ] Kamera/Galeri (expo-image-picker)
- [ ] Konum izni (expo-location)
- [ ] Push Notifications (expo-notifications)

#### Faz 6: Test & Yayın
- [ ] iOS Simulator / Android Emulator test
- [ ] Gerçek cihaz testi
- [ ] App Store / Play Store hazırlık
- [ ] İlk yayın

---

### Web İçin Kalan İşler (Düşük Öncelik)

- [ ] Av silme/düzenleme özelliği
- [ ] Google OAuth entegrasyonu
- [ ] Ek diller (NO, RU) - Mobil sonrası

---

## 🛠️ Teknik Altyapı

### Teknolojiler

**Frontend:**
- **Framework:** Next.js 16.1.1 (App Router)
- **Dil:** JavaScript (React)
- **Styling:** CSS Modules + Inline Styles
- **Font:** Inter (Google Fonts) - Modern, profesyonel görünüm
- **Harita:** Leaflet + React-Leaflet v5.0.0

**Backend & Database:**
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Email/Password + Google OAuth)

**API'ler:**
- **Hava Durumu:** OpenMeteo API (ücretsiz, API key gerektirmez)
  - `api.open-meteo.com` - Sıcaklık, rüzgar, nem, basınç
  - 7 günlük tahmin
  - Gün doğumu/batımı
- **Deniz Durumu:** OpenMeteo Marine API
  - `marine-api.open-meteo.com` - Ayrı endpoint
  - Dalga yüksekliği, dalga periyodu, swell yüksekliği
  - Kara noktalarında otomatik fallback

**Deployment:**
- **Hosting:** Plesk (turkticaret.net)
- **Method:** Static Export (out klasörü)
- **Version Control:** GitHub
- **Domain:** falancayer.com



## 📊 Veritabanı Şeması

### Catches Tablosu

```sql
CREATE TABLE catches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),  -- Kullanıcı ID (Supabase Auth)
  species TEXT NOT NULL,           -- Balık türü
  length_cm INTEGER NOT NULL,      -- Boy (cm)
  weight_gr INTEGER,               -- Ağırlık (gr) - opsiyonel
  location TEXT NOT NULL,          -- Tutulan yer
  notes TEXT,                      -- Notlar
  hunt_date TIMESTAMP,             -- Av tarihi ve saati
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policy (kullanıcı bazlı erişim)
ALTER TABLE catches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own catches" ON catches
  FOR ALL USING (auth.uid() = user_id);
```

### Fav Places Tablosu ✅

```sql
CREATE TABLE fav_places (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),  -- Kullanıcı ID
  name VARCHAR(100) NOT NULL,
  lat DECIMAL(10, 6) NOT NULL,
  lon DECIMAL(10, 6) NOT NULL,
  is_default BOOLEAN DEFAULT false,        -- Varsayılan lokasyon
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy (kullanıcı bazlı erişim)
ALTER TABLE fav_places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own favorites" ON fav_places
  FOR ALL USING (auth.uid() = user_id);
```

---









## 🔄 Versiyon Geçmişi

### v1.7.0 (9 Ocak 2026) - Güncel
- ✅ **Fotoğraf Yükleme Özelliği** 📷
  - Supabase Storage entegrasyonu (catch-photos bucket)
  - Av kayıtlarına fotoğraf ekleme
  - Fotoğraf önizleme, değiştirme ve kaldırma
  - Max 5MB dosya boyutu kontrolü
  - Av listesinde fotoğraf gösterimi
  - Kullanıcı bazlı erişim kontrolü (RLS)
  - Çoklu dil desteği (TR/EN)

### v1.6.1 (9 Ocak 2026)
- ✅ **Fish Suggestions Refactoring**
  - fishSuggestions.js: 736 satır -> 65 satır (10x küçültme)
  - Parametrik JSON yapısı: config/fish-suggestions.json
  - Çeviriler locales/*.json içine taşındı
  - Yeni dil eklemek artık sadece JSON çevirisi gerektiriyor

### v1.6.0 (7 Ocak 2026)
- ✅ **Çoklu Dil Desteği (i18n)** 🌍
  - Türkçe (TR) ve İngilizce (EN) tam destek
  - LanguageContext ile global dil yönetimi
  - JSON tabanlı çeviri dosyaları (locales/tr.json, locales/en.json)
  - Header'da dil değiştirme butonu (🇹🇷/🇬🇧 bayraklar)
  - Tüm tab'lerde çeviri desteği:
    - Tab navigasyonu (Ana Sayfa, Avlarım, Hava, Aktivite, Analiz)
    - Sayfa başlıkları ve alt başlıklar
    - Form etiketleri ve placeholder'lar
    - Hata mesajları ve bildirimler
    - Auth modal (giriş/kayıt)
  - Ay fazı isimleri dil desteği (Waxing Gibbous / Şişkin Ay)
  - Takvim gün kısaltmaları (Mon, Tue / Pzt, Sal)
  - Tarih formatları locale-aware (en-GB / tr-TR)
  - Balık ve yem önerileri dil desteği

### v1.5.1 (6 Ocak 2026)
- ✅ **İstanbul Kartal Varsayılan Lokasyon**
  - Ana sayfa hava durumu İstanbul Kartal'dan çekiliyor (40.8966, 29.1905)
  - Login olan kullanıcılar favorilerinden varsayılan lokasyon seçebilir
- ✅ **Marine API Ana Sayfada**
  - Dalga verisi artık ana sayfada da gösteriliyor
  - Ayrı endpoint: marine-api.open-meteo.com
- ✅ **Inter Font**
  - Modern, profesyonel görünüm için Inter font eklendi
  - Google Fonts üzerinden yükleniyor
- ✅ **Header/TabNav Fixed Layout**
  - TopBar: 72px sabit yükseklik, position fixed
  - TabNav: position fixed, top: 72px
  - Content: padding-top: 140px
  - Mobilde üst üste binme sorunu düzeltildi

### v1.5.0 (4 Ocak 2026)
- ✅ **Büyük Refactoring**
  - page.js: ~1900 satırdan ~385 satıra düşürüldü
  - 5 tab komponenti oluşturuldu (HomeTab, CatchesTab, WeatherTab, LunarTab, StatsTab)
  - Header ve TabNav ayrı komponentlere taşındı
  - Modüler ve bakımı kolay mimari
- ✅ **Kullanıcı Kimlik Doğrulama**
  - Supabase Auth entegrasyonu
  - Email/Password ile giriş/kayıt
  - Tab bazlı erişim kontrolü (Ana Sayfa hariç hepsi login gerektirir)
  - Kullanıcı bazlı veri izolasyonu (RLS)
- ✅ **Gelişmiş Balık & Yem Önerileri**
  - 10'dan 50+ senaryoya genişletildi
  - Mevsim, saat, sıcaklık, rüzgar, basınç faktörleri
  - Ay fazına göre gece/gündüz önerileri
- ✅ **Marine API Düzeltmesi**
  - Dalga verisi ayrı endpoint'ten alınıyor (marine-api.open-meteo.com)
  - Kara noktalarında graceful fallback
- ✅ **UI İyileştirmeleri**
  - Tab navigasyonu sticky yapıldı
  - Header scroll'da sabit kalıyor

### v1.4.0 (27 Aralık 2025)
- ✅ **Leaflet Harita Entegrasyonu**
  - Favori/Harita toggle seçimi
  - İnteraktif harita (Marmara + Karadeniz)
  - Tıklama ile konum seçme
  - Koyu/açık tema harita desteği
- ✅ **Kullanıcı Favorileri (Supabase)**
  - Haritadan favori kaydetme
  - Favori listesi görüntüleme
  - Favori silme özelliği
  - fav_places tablosu
- ✅ **Harita Konum Bilgisi**
  - 6 bilgi kartı (sıcaklık, rüzgar, yön, dalga, nem, basınç)
  - Balık & yem tavsiyesi

---

## 📚 Proje Yol Haritası

### Şu An: Mobil Uygulama Geliştirme 📱
- React Native (Expo) ile iOS + Android uygulaması
- Aynı Supabase backend kullanılacak
- Web uygulaması korunuyor (düşük öncelik)

### Sonraki Adımlar (Mobil Sonrası)
1. App Store / Play Store yayını
2. Push bildirimleri (ideal av zamanları)
3. Sosyal özellikler (paylaşım, liderlik tablosu)
4. Premium özellikler (ticari model)
5. Ek diller (NO, RU - uluslararası pazar)

### Hedef Pazarlar
- **Türkiye:** Ana pazar, Türkçe
- **Uluslararası:** İngilizce ile global erişim
- **İskandinav:** Norveç, İsveç, Danimarka (balıkçılık kültürü güçlü)
- **Doğu Avrupa:** Rusya, Ukrayna (büyük balıkçı nüfusu)

> **Not:** Detaylı analiz, platform karşılaştırmaları ve teknik kararlar için `UZ-FISHLOG-ARSIV.md` dosyasına bakınız.

---

## 👥 Proje Bilgileri

**Geliştirici:** UZ FishLog Team (Uzbad)
**Web Versiyon:** 1.7.0 (Stabil)
**Mobil Versiyon:** Geliştirme aşamasında
**Son Güncelleme:** 12 Ocak 2026

**Web Repo:** uz-fishlog/
**Mobil Repo:** uz-fishlog-mobile/ (oluşturulacak)
**Domain:** http://falancayer.com

---

**🎣 İyi Avlar! 🎣**
