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

## Kural: Bundan Sonra

1. **Hiçbir bilgi tamamen silinmeyecek**
2. Taşınacak içerik önce bu dosyaya kaydedilecek
3. Sonra hedef dosyaya taşınacak
4. Bu dosya her değişiklikte güncellenecek

---

*Son güncelleme: Şubat 2026*
