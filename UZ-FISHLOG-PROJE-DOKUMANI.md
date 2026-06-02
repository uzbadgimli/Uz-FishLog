# UZ-FISHLOG - Proje Dokümantasyonu v2.4

## Proje Özeti

**UZ-FishLog**, balıkçıların av kayıtlarını tutması, hava durumunu takip etmesi ve balık aktivitelerini analiz etmesi için geliştirilmiş bir uygulama platformudur.

---

## Platform Durumu

| Platform | Versiyon | Teknoloji | Durum |
|----------|----------|-----------|-------|
| Web | v1.7.0 | Next.js 16.1.1 | Stabil, bakım modunda |
| Mobil | v2.4.0 | Expo SDK 54 | Aktif geliştirme |

**Konum:** `uz-fishlog/` (web), `uz-fishlog-mobile/` (mobil)

---

## Yayın Durumu

### Platform
| Platform | Durum | Maliyet |
|----------|-------|---------|
| Android (Play Store) | Başvuru yapıldı | $25 (tek seferlik) |
| iOS (App Store) | Beklemede | $99/yıl |

**Strateji:** Android'de başla, gelir elde edince iOS'a geç.

### Yayın Bilgileri
- **Geliştirici:** UZ FishLog (şirket yok, ileride değişebilir)
- **İletişim:** team.uzbad@gmail.com
- **Ülke:** Türkiye (KVKK uyumlu TR + GDPR uyumlu EN)

### Yayın Öncesi Kalan
- [ ] Store görselleri (screenshots) — ekran fotoğrafları birlikte çekilecek
- [ ] Privacy Policy / ToS URL'leri güncellenmeli (`falancayer.com` → gerçek domain)

---

## Yapılacaklar

### Kritik (Yayın Öncesi)
- [ ] **RevenueCat Entegrasyonu** — Gerçek satın alma aktif etme
- [ ] Store görselleri (screenshots)

### RevenueCat Entegrasyonu (Adımlar)
> Paywall UI, feature gating ve DB şeması hazır. Şu an "Coming Soon" gösteriyor.
> RevenueCat entegre edildiğinde gerçek ödeme aktif olacak.

- [x] RevenueCat hesabı oluşturuldu, App Store kaydı yapıldı
- [ ] Google Play Console'da ürünleri oluştur: `fishlog_premium_monthly` (₺39/ay), `fishlog_premium_yearly` (₺299/yıl)
- [ ] RevenueCat'te "premium" entitlement tanımla, Google Play'e bağla
- [ ] `react-native-purchases` paketini kur (`npx expo install react-native-purchases`)
- [ ] `app.json`'a RevenueCat config plugin ekle
- [ ] `SubscriptionContext.tsx`'e RevenueCat SDK entegrasyonu
- [ ] `paywall.tsx`'teki TODO'ları gerçek purchase çağrılarıyla değiştir
- [ ] **Not:** Expo Go'da çalışmaz → development build (EAS Build) gerekir
- [ ] Test: Google Play sandbox ile test satın alma

### Sonraki İterasyon (Yayın Sonrası)
- [ ] Referral / davet sistemi (davet eden 1 ay ücretsiz, yeni kullanıcıya indirim)
- [ ] Reklam entegrasyonu (Google AdMob — free kullanıcılar için)
- [ ] Push notification genişletme (sezon bildirimleri)

---

## Monetizasyon Planı

**Fiyat:** ₺39/ay veya ₺299/yıl

| Özellik | Free | Premium |
|---------|------|---------|
| Av kayıt | 10/ay | Sınırsız |
| Fotoğraf | 5/ay | Sınırsız |
| AI Balık Tanıma | - | 20/ay |
| Analiz geçmişi | Son 6 ay | Tüm geçmiş |
| Arkadaş | Sınırsız | Sınırsız |
| Reklamlar | Var | Yok |

---

## Teknik Altyapı

### Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (catch-photos)
- **Edge Functions:** Supabase (identify-fish — Claude Vision API)
- **API:** OpenMeteo (hava + marine)

### Mobil Stack
- Expo SDK 54, Expo Router, react-native-maps, expo-location, expo-notifications

### Önemli Context'ler
- `SubscriptionContext` — tier, usage, feature gating
- `SelectedLocationContext` — hava + aktivite tab lokasyon senkronizasyonu
- `AuthContext`, `ThemeContext`, `LanguageContext`, `ProfileContext`

---

## Veritabanı

### Tablolar
- `catches` — av kayıtları
- `user_profiles` — profil bilgileri
- `fav_places` — favori lokasyonlar
- `user_subscriptions` — tier (free/premium), RevenueCat customer ID
- `user_usage` — aylık kullanım sayaçları (catches, photos, ai_identifications)
- `fish_identifications` — AI tanıma geçmişi
- `friendships` — arkadaşlık bağları
- `water_bodies`, `fish_species`, `fish_presence` — bölgesel balık sistemi

### Bölgesel Balık Verisi
- 35 balık türü (27 tuzlu su, 8 tatlı su)
- ~400 fish_presence kaydı

### Fishing Method IDs
- Kıyıdan: `7ea71e79-0ded-4cc8-a47e-225a4387ea18`
- Tekneden: `22cf3531-d061-43cb-a301-e8a6a1f2c03a`

---

## Global Strateji (Uzun Vade)
- **Faz 1:** Türkiye (elle, kaliteli veri) — 35 tür, ~400+ fish_presence kaydı ✓
- **Faz 2:** Crowdsourcing (kullanıcı catch logları) + otomatik öğrenme
- **Faz 3:** AI + Forum scraping (yeni ülkeler için)
- **Faz 4:** FishBase/OBIS entegrasyonu

---

## Güvenlik Notları

**Her Push Öncesi:**
- `.env` dosyaları gitignore'da mı?
- API anahtarları hardcoded değil mi?

---

## Dosya Referansları

| Dosya | Açıklama |
|-------|----------|
| `UZ-FISHLOG-ARSIV.md` | Tamamlanan özellikler, eski kararlar |
| `UZ-FISHLOG-SILINENLER.md` | Döküman değişiklik takibi |
| `sql/subscription-system.sql` | Abonelik tabloları ve RLS |
| `sql/social-profiles.sql` | Profil, arkadaşlık tabloları |
| `supabase/functions/identify-fish/` | AI balık tanıma Edge Function |
| `docs/store-listing.md` | Store açıklamaları (TR/EN) |

---

**Son Güncelleme:** Haziran 2026 | **Geliştirici:** UZ FishLog Team
