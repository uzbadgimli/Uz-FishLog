# UZ-FISHLOG - Silinen/Taşınan Bölümler Takibi

Bu dosya, proje dökümanından kaldırılan içeriklerin nereye gittiğini takip eder.
**Hiçbir bilgi tamamen silinmedi** - ya arşive taşındı ya da sadeleştirildi.

---

## Şubat 2026 - Döküman Sadeleştirmesi

### Arşive Taşınan Bölümler (ARSIV.md'ye eklendi)

#### 1. Tamamlanan Özellikler Listesi
**Orijinal Konum:** PROJE-DOKUMANI.md > "Tamamlanan Tüm Özellikler" bölümü
**Yeni Konum:** ARSIV.md > "Tamamlanan Özellikler (Detay)" bölümü

İçerik:
- Web + Mobil Ortak (9 madde)
- Sadece Web (8 madde)
- Sadece Mobil (7 madde)

#### 2. Mobil Proje Yapısı (Dosya Ağacı)
**Orijinal Konum:** PROJE-DOKUMANI.md > "Mobil Proje Yapısı" bölümü
**Yeni Konum:** ARSIV.md > "Mobil Proje Yapısı (Referans)" bölümü

İçerik:
```
uz-fishlog-mobile/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx, index.tsx, catches.tsx, weather.tsx, lunar.tsx, stats.tsx
│   ├── _layout.tsx, modal.tsx
├── contexts/ (AuthContext, LanguageContext, ThemeContext)
├── data/ (fishSpecies.ts)
├── lib/ (supabase.js)
├── utils/ (moonPhase, fishSuggestions, helpers, theme)
├── config/, locales/, constants/
```

#### 3. Detaylı Veritabanı Şeması
**Orijinal Konum:** PROJE-DOKUMANI.md > "Veritabanı Şeması" bölümü
**Yeni Konum:** ARSIV.md > "Veritabanı Şeması (Referans)" bölümü

İçerik:
- catches tablosu (9 alan)
- favorite_locations tablosu (6 alan)
- Bölgesel tablolar ER diyagramı (countries → provinces → districts → water_bodies → fish_presence)

#### 4. Versiyon Geçmişi (v2.1.0)
**Orijinal Konum:** PROJE-DOKUMANI.md > "Versiyon Geçmişi" bölümü
**Yeni Konum:** Zaten ARSIV.md'de mevcut (v1.0 - v2.0.x arası)

v2.1.0 içeriği:
- Mobil - Harita Entegrasyonu (react-native-maps, expo-location)
- Mobil - Balık Türü Dropdown (popüler balıklar, 30+ tür)
- Mobil - Analiz Filtreleme (DateTimePicker)

---

### Sadeleştirilen Bölümler (Proje Dökümanında Kaldı - Kısaltıldı)

#### 1. Tab Ekranları Detayı
**Orijinal:** Her tab için 5-10 satır açıklama
**Yeni:** Kaldırıldı (Arşivdeki proje yapısından anlaşılabilir)

Orijinal içerik (kayıp olmadı, burada):
```
Ana Sayfa (index.tsx)
- Hava durumu kartı (OpenMeteo API)
- Balık & yem önerileri
- Günün/toplam av sayısı
- Son avlar listesi
- Dark/Light tema toggle (☀️/🌙)
- Dil değiştirme (🇹🇷/🇬🇧)
- Ay fazı gösterimi

Avlarım (catches.tsx)
- Av kayıt formu (tür, boy, ağırlık, yer, tarih, not)
- Balık türü dropdown (popüler + alfabetik + diğer seçeneği)
- "Diğer" seçeneği ile manuel tür girişi
- Av listesi
- Fotoğraf gösterimi (photo_url desteği)
- Login kontrolü

Hava Durumu (weather.tsx)
- Favori lokasyonlar (Supabase'den çekiliyor)
- Haritadan konum seçme (react-native-maps)
- GPS ile mevcut konum alma (expo-location)
- Yeni lokasyon ekleme modal'ı
- Lokasyon silme (uzun basma)
- Hava detayları (sıcaklık, rüzgar, nem, basınç, dalga)
- Balık & yem önerileri

Aktivite (lunar.tsx)
- Ay fazı gösterimi (emoji + isim)
- Ay yaşı, doğuş/batış saatleri
- Aktivite skoru (1-10, progress bar)
- Ay fazına göre balık önerisi
- Solunar zamanları (Major/Minor)
- 18 günlük ay takvimi

Analiz (stats.tsx)
- Genel istatistikler (av, tür, yer sayısı)
- Boy/ağırlık istatistikleri
- En çok tutulan türler
- En başarılı yerler
- Zaman dağılımı (sabah/öğlen/akşam/gece)
- Filtreleme (balık türü + tarih aralığı)
- Filtre sonuç bilgisi gösterimi
```

#### 2. Auth Modal Detayı
**Orijinal:** 4 madde
**Yeni:** Kaldırıldı

Orijinal içerik:
```
Auth Modal
- Email/Password giriş
- Kayıt olma
- Profil görüntüleme
- Çıkış yapma
```

#### 3. Context Sistemi Detayı
**Orijinal:** 3 madde detaylı açıklama
**Yeni:** Kaldırıldı (Arşivdeki proje yapısından anlaşılabilir)

Orijinal içerik:
```
Context Sistemi
- AuthContext: Supabase Auth + AsyncStorage session
- LanguageContext: TR/EN çoklu dil, AsyncStorage ile tercih saklama
- ThemeContext: Dark/Light tema, AsyncStorage ile kalıcı
```

#### 4. Sonraki Adımlardaki Tamamlananlar
**Orijinal:** ~~strikethrough~~ ile işaretli maddeler
**Yeni:** Tamamen kaldırıldı (tamamlandığı için gereksiz)

Kaldırılan tamamlanan maddeler:
- ~~React Native Maps entegrasyonu~~ ✅ Tamamlandı
- ~~Haritadan konum seçme - deniz kontrolü~~ ✅ Tamamlandı
- ~~Deniz kontrolü (sadece deniz konumu seçilebilir)~~ ✅ Tamamlandı

#### 5. Mobil - Yayın Hazırlığı (Detaylı Liste)
**Orijinal:** 6 madde
**Yeni:** "Yayın Öncesi Yapılacaklar" başlığı altında birleştirildi

Orijinal içerik:
```
Mobil - Yayın Hazırlığı
- iOS Simulator / Android Emulator test
- Gerçek cihaz testi
- App Store Connect hesabı
- Play Console hesabı
- Store açıklamaları ve görseller
- İlk yayın (v1.0.0)
```

#### 6. Web - Düşük Öncelik
**Orijinal:** 1 madde
**Yeni:** Kaldırıldı

Orijinal içerik:
```
Web - Düşük Öncelik
- Responsive iyileştirmeler
```

#### 7. Veri Kaynakları Listesi
**Orijinal:** Detaylı kaynak listesi
**Yeni:** Sadeleştirildi

Orijinal içerik:
```
Veri kaynakları:
- FishBase.org (257+ tür Marmara için)
- OBIS API (koordinat bazlı)
- Balıkçı forumları (balikcil.net, baliksevdam.com)
- Tarım ve Orman Bakanlığı verileri
```

#### 8. SQL Dosyaları Referansı
**Orijinal:** 3 dosya listesi
**Yeni:** "Dosya Referansları" tablosunda sql/ olarak kısaltıldı

Orijinal içerik:
```
SQL Dosyaları
- sql/districts-all.sql - Tüm Türkiye ilçeleri (973 ilçe, 81 il)
- sql/districts-marmara.sql - Sadece Marmara bölgesi (11 il, 158 ilçe)
- sql/water-bodies-turkey.sql - Türkiye su kütleleri (~110 lokasyon)
```

---

### İlk Sadeleştirmede Yanlışlıkla Silinen ve Sonra Geri Eklenen

#### 1. Genel UI İyileştirmeleri (Font değişikliği)
**Durum:** Yanlışlıkla silindi → Geri eklendi ✅

#### 2. Referans Veri Kaynakları (FishBase, OBIS)
**Durum:** Yanlışlıkla silindi → Geri eklendi ✅

#### 3. Tatlı Su Balıkları TODO
**Durum:** Yanlışlıkla silindi → Geri eklendi ✅

#### 4. Global Strateji (Faz 1-4)
**Durum:** Yanlışlıkla silindi → Geri eklendi ✅

---

## Şubat 2026 - Lokasyon Takip Dosyası Arşivlendi

### UZ-FISHLOG-EKLENECEK-YERLER.md → Arşive Taşındı

**Orijinal Konum:** /UZ-FISHLOG-EKLENECEK-YERLER.md (root)
**Yeni Konum:** /docs/archive/LOKASYON-EKLEME-TAMAMLANDI.md

**Açıklama:** Bu dosya `fish_presence` tablosuna eklenmesi gereken lokasyonları takip ediyordu. Tüm bölgeler tamamlandığı için arşive taşındı.

**Tamamlanan Bölgeler (Toplam ~100+ lokasyon):**

| Bölge | Alt Bölge | Lokasyon Sayısı |
|-------|-----------|-----------------|
| Marmara Denizi | Tekirdağ, İstanbul, Kocaeli, Bursa, Yalova, Balıkesir, Çanakkale | 35 |
| Ege Denizi | İzmir, Aydın, Muğla, Balıkesir | 17 |
| Akdeniz | Antalya, Mersin, Adana, Hatay | 17 |
| Karadeniz - Batı | İstanbul, Kocaeli, Sakarya, Zonguldak, Bartın, Kastamonu, Sinop, Samsun, Ordu, Giresun | 18 |
| Karadeniz - Doğu | Trabzon, Rize, Artvin | 6 |
| Büyük Göller | Van, Beyşehir, Eğirdir, Sapanca, Abant | 5 |

**İlgili SQL Dosyaları:**
- `sql/fish-presence-*.sql` - Bölgesel balık verileri

**Tam içerik:** docs/archive/LOKASYON-EKLEME-TAMAMLANDI.md dosyasında mevcut.

---

## Şubat 2026 - Mobil Kısa Vadeli Özellikler Tamamlandı

### Tamamlanan Özellikler

**Mobil - Kısa Vadeli ✅** (catches.tsx)
- Fotoğraf yükleme (expo-image-picker) - Kamera ve galeri desteği
- Av silme/düzenleme - Modal ile edit, Alert ile onaylı silme
- Pull-to-refresh - RefreshControl komponenti
- Loading skeletons - Yükleme sırasında placeholder kartlar

**Mobil - Orta Vadeli (Kısmi) ✅**
- App icon ve splash screen - Kullanıcının hazırladığı logo ile
  - icon.png: Balık makarası sembolü (f harfi)
  - splash-icon.png: Logo + "FishLog" yazısı
  - Beyaz arka plan (#ffffff)

**İptal Edilen:**
- Offline mode - İptal edildi (anlık hava verisi gerekli olduğundan)

### Plan Dosyası Tamamlandı

**Dosya:** `.claude/plans/dapper-prancing-tide.md`
**İçerik:** Mobil Kısa Vadeli Özellikler uygulama planı
**Durum:** Tamamlandı, arşivlendi

---

## Kural: Bundan Sonra

1. **Hiçbir bilgi tamamen silinmeyecek**
2. Taşınacak içerik önce bu dosyaya kaydedilecek
3. Sonra hedef dosyaya taşınacak
4. Bu dosya her değişiklikte güncellenecek

---

## Şubat 2026 - Push Notifications + Typography + Arşiv Temizliği

### Arşive Taşınan Bölümler (ARSIV.md'ye eklendi)

#### 1. Mobil - Hava Durumu Tab ✅
**Orijinal Konum:** PROJE-DOKUMANI.md > "Sonraki Adımlar" > "Mobil - Hava Durumu Tab"
**Yeni Konum:** ARSIV.md > "Tamamlanan Mobil Özellikler (Şubat 2026)"

İçerik: Favori lokasyon düzenleme, default lokasyon seçimi, 7 günlük tahmin, saatlik detay

#### 2. Mobil - Kısa Vadeli ✅
**Orijinal Konum:** PROJE-DOKUMANI.md > "Sonraki Adımlar" > "Mobil - Kısa Vadeli"
**Yeni Konum:** ARSIV.md > "Tamamlanan Mobil Özellikler (Şubat 2026)"

İçerik: Fotoğraf yükleme, av silme/düzenleme, pull-to-refresh, loading skeletons

#### 3. Mobil - Orta Vadeli ✅
**Orijinal Konum:** PROJE-DOKUMANI.md > "Sonraki Adımlar" > "Mobil - Orta Vadeli"
**Yeni Konum:** ARSIV.md > "Tamamlanan Mobil Özellikler (Şubat 2026)"

İçerik: Push notifications (expo-notifications, local scheduled), ~~offline mode~~ (iptal), app icon/splash

#### 4. Genel UI İyileştirmeleri ✅
**Orijinal Konum:** PROJE-DOKUMANI.md > "Sonraki Adımlar" > "Genel UI İyileştirmeleri"
**Yeni Konum:** ARSIV.md > "Tamamlanan Mobil Özellikler (Şubat 2026)"

İçerik: Typography standardizasyonu — utils/typography.ts, 18→11 token, 16 semantik stil, 5 ekrana uygulandı

### Eklenen Yeni Dosyalar
- `utils/notifications.ts` — Bildirim sistemi (izin, planlama, iptal)
- `utils/typography.ts` — Merkezi tipografi tokenleri

### Güncellenen Dosyalar
- `app.json` — expo-notifications plugin + Android izinleri
- `app/_layout.tsx` — Bildirim başlatma + response handler
- `locales/tr.json` — Bildirim metinleri (notifications bölümü)
- `locales/en.json` — Bildirim metinleri (notifications bölümü)
- Tüm 5 tab ekranı — typography.ts import + style güncelleme

---

---

## Mart 2026 - Bölgesel Balık Verisi + Tatlı Su + Hibrit Sistem

### Arşive Taşınan Bölümler (ARSIV.md'ye eklendi)

#### 1. Bölgesel Balık Verisi ✅ (Tüm alt maddeler tamamlandı)
**Orijinal Konum:** PROJE-DOKUMANI.md > "Sonraki Adımlar" > "Bölgesel Balık Verisi"
**Yeni Konum:** ARSIV.md > "Tamamlanan Özellikler (Mart 2026)"

İçerik:
- Tüm Türkiye lokasyonları eklendi ✓
- İl/ilçe bazlı balık önerileri entegrasyonu (mobil) ✓
- Sezonluk balık takvimi (mobil) ✓
- Hibrit balık öneri sistemi ✓ (hava durumu + bölgesel veri birleştirildi)
  - `hybridFishScore.ts`: Sıcaklık, rüzgar, basınç + balık davranış profilleri → skorlama
  - Weather tab'da tek "Bugün Ne Avlanır?" kartı, water body bulunamazsa eski öneri fallback

### Kaldırılan/Birleştirilen Bölümler

#### 1. Referans Veri Kaynakları → Global Strateji'ye Birleştirildi
**Orijinal Konum:** PROJE-DOKUMANI.md > "Sonraki Adımlar" > "Referans Veri Kaynakları"
**Yeni Konum:** PROJE-DOKUMANI.md > "Global Strateji (Uzun Vade)" > Faz 2-4 içinde

Orijinal içerik:
```
Referans Veri Kaynakları (Uzun Vade)
- FishBase/OBIS entegrasyonu: 257+ tür, koordinat bazlı gözlem verisi
- Crowdsourcing: Kullanıcı catch loglarından öğrenme
- AI + Forum scraping: Yeni ülkeler için otomatik veri toplama
```
→ Faz 2 (Crowdsourcing), Faz 3 (AI + Forum), Faz 4 (FishBase/OBIS) altına dağıtıldı.

#### 2. Tatlı Su Balıkları TODO → Tamamlandı, Arşivlendi
**Orijinal Konum:** PROJE-DOKUMANI.md > "Sonraki Adımlar" > "Tatlı Su Balıkları"
**Yeni Konum:** ARSIV.md > "Tamamlanan Özellikler (Mart 2026)" > "Tatlı Su Balıkları ✅"

Orijinal içerik:
```
Tatlı Su Balıkları
- [ ] fishSpecies.ts'e water_preference alanı ekle
- [ ] Tatlı su balıklarını ekle (8 tür)
- [ ] Av kayıt formunda su tipi filtresi
- [ ] fish_species tablosuna yeni türler (SQL)
```
→ Tümü tamamlandı, arşive taşındı.

### Eklenen Yeni Dosyalar
- `utils/hybridFishScore.ts` — Hibrit balık skorlama (35 profil, 4-faktör)
- `sql/fish-species-freshwater.sql` — 6 tatlı su türü + 10 fish_presence

### Güncellenen Dosyalar
- `utils/regionalFish.ts` — water_temp_min/max eklendi
- `data/fishSpecies.ts` — Yeniden yapılandırıldı (water_preference)
- `app/(tabs)/weather.tsx` — Tek hibrit kart (iki ayrı kart yerine)
- `app/(tabs)/catches.tsx` — Su tipi filtre chip'leri
- `locales/tr.json`, `locales/en.json` — hybrid, allWater/saltWater/freshWater çevirileri
- `fish_species.csv` — 6 yeni tatlı su kaydı

---

---

## Mart 2026 - Sosyal Sistem + Ayarlar Tamamlandı

### Arşive Taşınan Bölümler (ARSIV.md'ye eklendi)

#### 1. Header UI ✅
**Orijinal Konum:** PROJE-DOKUMANI.md > "Yapılacaklar" > "Header UI"
**Yeni Konum:** ARSIV.md > "Tamamlanan Özellikler (Mart 2026 - Sosyal Sistem)"

İçerik: Avatar butonu (sol, badge ile), gear ikonu (sağ), 5 tab korundu

#### 2. Ayarlar (⚙️ Gear ikonu → Modal/Sheet) ✅
**Orijinal Konum:** PROJE-DOKUMANI.md > "Yapılacaklar" > "Ayarlar"
**Yeni Konum:** ARSIV.md > "Tamamlanan Özellikler (Mart 2026 - Sosyal Sistem)"

İçerik: Dil, tema, bildirim, hesap, legal linkler, versiyon — settings.tsx

#### 3. Profil & Sosyal ✅
**Orijinal Konum:** PROJE-DOKUMANI.md > "Yapılacaklar" > "Profil & Sosyal"
**Yeni Konum:** ARSIV.md > "Tamamlanan Özellikler (Mart 2026 - Sosyal Sistem)"

İçerik: Profil düzenleme, arkadaş sistemi (email ile ekleme, istek/onay/red, favori), gizlilik (public/friends/private), header avatar + badge

#### 4. Sosyal Feed ✅
**Orijinal Konum:** PROJE-DOKUMANI.md > "Yapılacaklar" > "Sosyal Feed"
**Yeni Konum:** ARSIV.md > "Tamamlanan Özellikler (Mart 2026 - Sosyal Sistem)"

İçerik: Arkadaş avları akışı (index.tsx), paylaşım seçenekleri (catches.tsx visibility selector)

### Proje Dökümanında Kalan (Taşınmayan)
- "Av kartına tıklayınca detay" — "Sonraki İterasyon" altına taşındı (hâlâ TODO)
- "AI ve Monetizasyon" bölümü — aynen kaldı (hâlâ TODO)

### Eklenen Yeni Dosyalar (Bu iterasyonda)
- `sql/social-profiles.sql` — Profil, arkadaşlık tabloları, RLS, RPC
- `contexts/ProfileContext.tsx` — Profil ve arkadaşlık context
- `app/profile.tsx` — Profil ekranı
- `app/settings.tsx` — Ayarlar modal ekranı

---

*Son güncelleme: Mart 2026 - Sosyal sistem ve ayarlar tamamlandı, arşive taşındı*

---

## Haziran 2026 — Premium Sistem & UI İyileştirmeleri

### Kaldırılan Özellikler / Değişenler

#### 1. Profil Sayfası — Catch Visibility Bölümü
**Neden kaldırıldı:** Kullanıcı bazlı default yerine av bazlı seçim daha mantıklı.
**Nerede:** `profile.tsx` > "Av Gizliliği" kartı tamamen silindi.
**Yerine:** Av kaydederken form içinde herkese açık/arkadaşlar/gizli seçimi.
**`handleVisibilityChange` fonksiyonu da silindi.**

#### 2. Arkadaş Sayı Sınırı
**Neden kaldırıldı:** Sosyal büyüme = daha fazla kullanıcı; sınır koymak anlamsız.
**Değişen:** `SubscriptionContext.FREE_LIMITS.maxFriends`: 5 → 0 (0 = sınırsız)
**`paywall.tsx` features tablosundan "friends" satırı kaldırıldı.**

#### 3. Analytics 30 Gün Limiti → 180 Gün
**Neden değişti:** 30 gün çok kısıtlayıcı; free kullanıcıya da değer verilmeli.
**Değişen:** `FREE_LIMITS.analyticsRange`: 30 → 180
**`paywall.tsx`:** `'30d'` → `'180d'`, `t('paywall.thirtyDays')` → `t('paywall.sixMonths')`

#### 4. Default Lokasyon Kartal → Sarıyer
**Neden değişti:** Balıkçılık uygulaması için Boğaz'da daha anlamlı bir konum.
**Değişen:** `weather.tsx` DEFAULT_LOCATIONS, `SelectedLocationContext` default değeri.
**`index.tsx`:** `DEFAULT_LOCATION` sabiti tamamen silindi.

#### 5. Ana Sayfa — Kartal Fallback Hava Durumu
**Neden kaldırıldı:** Konum eklenmemişse yanlış şehrin havası gösterilmemeli.
**Yerine:** "Konum Seçilmedi" mesajı + Hava Durumu tabına yönlendirme butonu.
**Silinen:** `fetchWeather()` fonksiyonu (`index.tsx`'ten tamamen kaldırıldı).

#### 6. "Sadece Arkadaşlar" → "Arkadaşlar"
**Neden değişti:** Uzun metin ikon taşmasına neden oluyordu.
**Değişen:** `locales/tr.json`: `visibilityFriends`, `locales/en.json`: `visibilityFriends`

#### 7. Fiyatlar Güncellendi
**Eski:** ₺49/ay, ₺349/yıl
**Yeni:** ₺39/ay, ₺299/yıl
**Değişen:** `paywall.tsx` fiyat metinleri, `PROJE-DOKUMANI.md`

### Taşınan → Arşiv
Tüm tamamlanan özellikler `ARSIV.md` > "Haziran 2026 (v2.4)" bölümüne taşındı.
`PROJE-DOKUMANI.md`'den kaldırılan tamamlanmış maddeler:
- AI Balık Tanıma implementasyonu
- SubscriptionContext + DB şeması
- Paywall ekranı
- Feature gating
- Tüm UI iyileştirmeleri (collapsible form, küçük foto butonları, aktivite skoru vb.)

*Son güncelleme: Haziran 2026*
