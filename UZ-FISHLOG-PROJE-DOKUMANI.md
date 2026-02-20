# UZ-FISHLOG - Proje Dokümantasyonu v2.2

## Proje Özeti

**UZ-FishLog**, balıkçıların av kayıtlarını tutması, hava durumunu takip etmesi ve balık aktivitelerini analiz etmesi için geliştirilmiş bir uygulama platformudur.

---

## Platform Durumu

| Platform | Versiyon | Teknoloji | Durum |
|----------|----------|-----------|-------|
| Web | v1.7.0 | Next.js 16.1.1 | Stabil, bakım modunda |
| Mobil | v2.2.0 | Expo SDK 54 | Aktif geliştirme |

**Konum:** `uz-fishlog/` (web), `uz-fishlog-mobile/` (mobil)

---

## Sonraki Adımlar

### Mobil - Hava Durumu Tab (Öncelikli)
- [ ] Favori lokasyon düzenleme (isim değiştirme)
- [ ] Kullanıcı default lokasyon seçimi
- [ ] 7 günlük hava tahmini
- [ ] Saatlik hava detayı (bugüne tıklayınca)

### Mobil - Kısa Vadeli
- [ ] Fotoğraf yükleme (expo-image-picker)
- [ ] Av silme/düzenleme
- [ ] Pull-to-refresh
- [ ] Loading skeletons

### Mobil - Orta Vadeli
- [ ] Push notifications (expo-notifications)
- [ ] Offline mode (basic)
- [ ] App icon ve splash screen

### Bölgesel Balık Verisi
- [x] Tüm Türkiye lokasyonları eklendi ✓ (bkz: `docs/archive/LOKASYON-EKLEME-TAMAMLANDI.md`)
- [ ] İl/ilçe bazlı balık önerileri entegrasyonu (mobil)
- [ ] Sezonluk balık takvimi (mobil)

### Genel UI İyileştirmeleri (Gelecek)
- [ ] Font değişikliği (Web + Mobil)
  - Önerilen: Inter, Poppins, Nunito, Space Grotesk
  - Mobil: expo-font ile Google Fonts
  - Web: next/font ile Google Fonts

### Referans Veri Kaynakları (Düşük Öncelik)
- [ ] FishBase'den Türkiye/Marmara tür listesi
- [ ] OBIS'ten koordinat bazlı gözlem verisi
- [ ] `fish_species_reference` tablosu (ham veri, UI'da gösterilmeyecek)
- [ ] Crowdsource: Kullanıcı avlarından otomatik öğrenme (v2+)

### Tatlı Su Balıkları (TODO)
- [ ] fish_species tablosuna tatlı su balıkları eklenmeli
- [ ] fishSpecies.ts dosyasına tatlı su balıkları eklenmeli
- [ ] locales/tr.json ve en.json çevirileri güncellenmeli
- [ ] Av ekleme ekranında water_preference'a göre filtreleme

### Global Strateji (Uzun Vade)
- **Faz 1:** Türkiye (elle, kaliteli veri) - Devam ediyor
- **Faz 2:** Crowdsourcing (kullanıcı catch logları)
- **Faz 3:** AI + Forum scraping (yeni ülkeler için)
- **Faz 4:** FishBase/OBIS entegrasyonu

---

## Yayın ve Monetizasyon

### Platform Durumu
| Platform | Durum | Maliyet |
|----------|-------|---------|
| Android (Play Store) | Başvuru yapıldı | $25 (tek seferlik) |
| iOS (App Store) | Beklemede | $99/yıl |

**Strateji:** Android'de başla, gelir elde edince iOS'a geç.

### Yayın Öncesi Yapılacaklar
- [ ] Privacy Policy sayfası
- [ ] Terms of Service sayfası
- [ ] App icon tasarımı
- [ ] Splash screen tasarımı
- [ ] Store açıklamaları (TR/EN)
- [ ] Store görselleri (screenshots)

### Monetizasyon Fikirleri
- Freemium model (temel özellikler ücretsiz)
- Premium abonelik: detaylı sezon verileri, offline haritalar, reklamsız

---

## Teknik Altyapı

### Backend (Ortak)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (catch-photos)
- **API:** OpenMeteo (hava + marine)

### Web Stack
- Next.js 16.1.1, CSS Modules, Leaflet

### Mobil Stack
- Expo SDK 54, Expo Router, react-native-maps, expo-location

---

## Veritabanı - Bölgesel Balık Sistemi

### Mevcut Veri
- 81 il, 973 ilçe (tüm Türkiye)
- ~110 su kütlesi (Marmara, Ege, Akdeniz, Karadeniz)
- 28 balık türü (20 tuzlu su, 8 tatlı su)
- fish_presence: ~400 kayıt (aktif doldurulma devam ediyor)

### Kritik Tablo: fish_presence
```sql
water_body_id, fish_id, fishing_method_id
presence_level    -- abundant / common / rare
catch_probability -- 1-100
season_start, season_end  -- ay (1-12)
depth_min, depth_max
best_time_of_day  -- ARRAY['morning', 'evening', 'night']
water_temp_min, water_temp_max
confidence_score, source, is_active
```

### Fishing Method IDs
- Kıyıdan: `7ea71e79-0ded-4cc8-a47e-225a4387ea18`
- Tekneden: `22cf3531-d061-43cb-a301-e8a6a1f2c03a`

---

## Güvenlik Notları

**Her Push Öncesi:**
- `.env` dosyaları gitignore'da mı?
- API anahtarları hardcoded değil mi?
- Credentials içeren dosya var mı?

---

## Dosya Referansları

| Dosya | Açıklama |
|-------|----------|
| `UZ-FISHLOG-ARSIV.md` | Eski kararlar, tamamlanan özellikler, detaylı şema |
| `docs/archive/LOKASYON-EKLEME-TAMAMLANDI.md` | Tamamlanan lokasyonlar arşivi |
| `UZ-FISHLOG-SILINENLER.md` | Döküman değişiklik takibi (neyin nereye taşındığı) |
| `sql/` | Bölgesel balık SQL dosyaları |
| `fish_species.csv` | Balık türleri ve UUID'leri |

---

**Son Güncelleme:** Şubat 2026 | **Geliştirici:** UZ FishLog Team
