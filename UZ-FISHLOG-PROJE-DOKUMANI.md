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

---

## 📚 Gelecek Adımlar

### Yakın Hedefler
1. Mobil responsive testler
2. Av silme/düzenleme özelliği
3. Çok kullanıcılı sistem (login/register)

> **Not:** Detaylı versiyon geçmişi, deployment süreçleri ve teknik kararlar için `UZ-FISHLOG-ARSIV.md` dosyasına bakınız.

---

## 👥 Proje Bilgileri

**Geliştirici:** UZ FishLog Team (Uzbad)
**Versiyon:** 1.4.0
**Son Güncelleme:** 27 Aralık 2025

**GitHub:** https://github.com/uzbadgimli/Uz-FishLog
**Domain:** http://falancayer.com

---

**🎣 İyi Avlar! 🎣**
