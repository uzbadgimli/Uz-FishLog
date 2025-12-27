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

#### 3. **Hava & Deniz Durumu**
- **Favori Lokasyonlar:**
  - Kumbağ, Şile, Hereke, İzmit Körfezi
  - Buton ile hızlı seçim
  
- **Detaylı Hava Bilgisi:**
  - Anlık durum (sıcaklık, rüzgar, yön)
  - 7 günlük tahmin
  - Gün doğumu/batımı saatleri
  
- **Balık & Yem Tavsiyeleri:** Seçilen lokasyon için özelleştirilmiş

#### 4. **Profil Tab**
- Genel bilgiler
- Ayarlar placeholder'ları

---

## 🚧 Geliştirme Aşamasında

### Planlanan Özellikler

#### 1. **Hava & Deniz Tab - Gelişmiş**
- [ ] **Leaflet Harita Entegrasyonu**
  - İnteraktif harita
  - Haritaya tıklayarak konum seçimi
  - Marker'lar ile favori yerler
  
- [ ] **Gelişmiş Deniz Durumu**
  - Dalga yüksekliği detayları
  - Akıntı bilgisi
  - Deniz suyu sıcaklığı

#### 2. **Balık Aktivite Takvimi** ✅
- [x] **Ay Fazları Takvimi**
  - Görsel ay fazı gösterimi (emoji)
  - 18 günlük takvim görünümü
  - Tıklanabilir günler ve detay kartı
  - Ay doğumu/batımı saatleri

- [x] **Solunar Aktivite**
  - Major/Minor periyotlar (yeşil/sarı kutular)
  - Balık aktivite skoru (1-10) + progress bar
  - En iyi avlanma saatleri önerisi
  - Solunar teorisi bilgi notu

#### 3. **Analiz & İstatistikler** ✅
- [x] **Genel Bakış:**
  - Toplam av, farklı tür, farklı yer sayıları
  - Boy/ağırlık istatistikleri (en büyük, ortalama)

- [x] **Grafikler:**
  - Tür dağılımı (bar chart)
  - Saat dağılımı (sabah/öğlen/akşam/gece)

- [x] **En Başarılı:**
  - Yerler sıralaması (madalyalı liste)
  - Zaman dilimi analizi

#### 4. **Çok Kullanıcılı Sistem**
- [ ] Login/Register sistemi
- [ ] Kullanıcı profilleri
- [ ] Sosyal özellikler (opsiyonel)

---

## 🛠️ Teknik Altyapı

### Teknolojiler

**Frontend:**
- **Framework:** Next.js 16.1.1 (App Router)
- **Dil:** JavaScript (React)
- **Styling:** CSS Modules + Inline Styles
- **Harita:** Leaflet + React-Leaflet (entegrasyon devam ediyor)

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
│   ├── page.js              # Ana component
│   ├── layout.js            # Root layout
│   ├── globals.css          # Global stiller
│   └── FishLog.module.css   # Component stilleri
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

---

## 🎨 Tasarım Sistemi

### Renk Paleti

**Ana Renkler:**
- Lacivert: `#1E3A8A` (başlıklar)
- Koyu Mavi: `#1E40AF` (butonlar, vurgular)

**Vurgu Renkleri:**
- Soluk Turuncu: `#FB923C` (önemli bilgiler)
- Açık Turuncu: `#FDBA74` (hover)

**Destek Renkleri:**
- Yeşil: `#34D399` (başarı)
- Mavi-yeşil: `#22D3EE` (deniz teması)
- Gri tonları: `#F8FAFC`, `#E2E8F0`, `#64748B`

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
4. Tarayıcıda test: `http://falancayer.com.`

**Not:** DNS yayılımı 24-48 saat sürebilir

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

3. **Leaflet Entegrasyonu**
   - `react-leaflet` kuruldu
   - Dynamic import kullanılıyor (SSR hatası önlemi)
   - Harita click event'leri üzerinde çalışılıyor

### Bilinen Sorunlar

- [ ] Leaflet harita click event çalışmıyor
- [ ] DNS tam yayılmadı (falancayer.com yerine falancayer.com. kullanılıyor)

### Çözülen Sorunlar

- ✅ Tailwind CSS yüklenmeme → CSS Modules kullanıldı
- ✅ Plesk Node.js deployment → Static export tercih edildi
- ✅ Form input büyüklükleri → Inline style ile çözüldü
- ✅ Av listesi düzeni → Grid layout ile düzenlendi
- ✅ Hava durumu API → OpenMeteo entegre edildi

---

## 👥 Kullanıcı Profili

**Hedef Kullanıcı:** Uzbad + Balıkçı Arkadaşlar

**Kullanım Senaryoları:**
1. Av sonrası kayıt tutma
2. Gitmeden önce hava kontrolü
3. Geçmiş avları analiz etme
4. En verimli yerler/zamanları bulma

**Beklentiler:**
- Profesyonel görünüm
- Hızlı ve kullanışlı
- Mobil uyumlu
- Gerçekten işe yarar bilgiler

---

## 🎣 Balık & Yem Veri Tabanı

### Marmara Denizi Hedef Balıklar

1. **Levrek** - Minnow (11-14cm), silikon, canlı yem
2. **Çupra** - Küçük minnow (7-9cm), canlı karides
3. **Lüfer** - Popper, stick bait, metal jig
4. **İstavrit** - Sabiki, küçük jig
5. **Palamut** - Metal pilker, büyük minnow
6. **Mezgit** - Silikon, canlı yem
7. **Hamsi** - İğne takımı
8. **Kolyoz** - Sabiki

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

---

## 📞 İletişim & Destek

**Geliştirici:** UZ FishLog Team (Uzbad)
**Versiyon:** 1.2.0
**Son Güncelleme:** 27 Aralık 2025

**GitHub:** https://github.com/uzbadgimli/Uz-FishLog
**Domain:** http://falancayer.com.

---

## 🔄 Versiyon Geçmişi

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
1. Leaflet harita click event düzeltme (favori kaydetme)
2. Mobil responsive testler
3. Av silme/düzenleme özelliği

### Orta Vadeli
1. Çok kullanıcılı sistem (login)
2. Fotoğraf yükleme
3. Favori lokasyonlar kaydetme (haritadan)

### Uzun Vadeli (3+ Ay)
1. Sosyal özellikler (opsiyonel)
2. Mobil uygulama (PWA)
3. Offline destek
4. Bildirim sistemi

---

**🎣 İyi Avlar! 🎣**
