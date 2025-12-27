# UZ-FISHLOG - Proje Dokümantasyonu

## 📋 Proje Özeti

**UZ-FishLog**, balıkçıların av kayıtlarını tutması, hava durumunu takip etmesi ve balık aktivitelerini analiz etmesi için geliştirilmiş profesyonel bir web uygulamasıdır.

---

## 🎯 Temel Özellikler

### ✅ Tamamlanan Özellikler

#### 1. **Ana Sayfa (Dashboard)**
- **Bugünkü Avlar vs Toplam İstatistik:** Yan yana kartlarda gösterim
- **Hızlı Hava Durumu:** İstanbul/Marmara için anlık bilgi
  - Sıcaklık, rüzgar hızı/yönü
  - Dalga yüksekliği, nem, basınç (6 bilgi)
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

## 🚧 Planlanan Özellikler

### Çok Kullanıcılı Sistem
- [ ] Login/Register sistemi
- [ ] Kullanıcı bazlı favori lokasyonlar
- [ ] Kullanıcı profilleri
- [ ] Sosyal özellikler (opsiyonel)

---

## 🛠️ Teknik Altyapı

### Teknolojiler

**Frontend:**
- **Framework:** Next.js 16.1.1 (App Router)
- **Dil:** JavaScript (React)
- **Styling:** CSS Modules + Inline Styles
- **Harita:** Leaflet + React-Leaflet v5.0.0

**Backend & Database:**
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (gelecekte)

**API'ler:**
- **Hava Durumu:** OpenMeteo API (ücretsiz, API key gerektirmez)
  - Sıcaklık, rüzgar, nem, basınç
  - Deniz durumu (dalga)
  - 7 günlük tahmin
  - Gün doğumu/batımı

**Deployment:**
- **Hosting:** Plesk (turkticaret.net)
- **Method:** Static Export (out klasörü)
- **Version Control:** GitHub
- **Domain:** falancayer.com

### Proje Yapısı

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

## 📊 Veritabanı Şeması

### Catches Tablosu

```sql
CREATE TABLE catches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species TEXT NOT NULL,           -- Balık türü
  length_cm INTEGER NOT NULL,      -- Boy (cm)
  weight_gr INTEGER,               -- Ağırlık (gr) - opsiyonel
  location TEXT NOT NULL,          -- Tutulan yer
  notes TEXT,                      -- Notlar
  hunt_date TIMESTAMP,             -- Av tarihi ve saati
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Fav Places Tablosu ✅

```sql
CREATE TABLE fav_places (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  lat DECIMAL(10, 6) NOT NULL,
  lon DECIMAL(10, 6) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE fav_places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations" ON fav_places
  FOR ALL USING (true) WITH CHECK (true);
```

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

### v1.4.0 (27 Aralık 2025) - Güncel
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

## 📚 Gelecek Adımlar

### Kısa Vadeli
1. Mobil responsive testler
2. Av silme/düzenleme özelliği

### Orta Vadeli
1. Çok kullanıcılı sistem (login)
2. Kullanıcı bazlı favori yerler
3. Fotoğraf yükleme

### Uzun Vadeli
1. PWA desteği
2. Offline mod
3. Bildirim sistemi
4. Sosyal özellikler

---

## 👥 Proje Bilgileri

**Geliştirici:** UZ FishLog Team (Uzbad)
**Versiyon:** 1.4.0
**Son Güncelleme:** 27 Aralık 2025

**GitHub:** https://github.com/uzbadgimli/Uz-FishLog
**Domain:** http://falancayer.com

---

**🎣 İyi Avlar! 🎣**
