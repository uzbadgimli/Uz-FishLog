# Plesk Deployment Guide - UZ FishLog

Bu döküman UZ FishLog uygulamasını Plesk hostinge deploy etmek için detaylı adımları içerir.

## Ön Hazırlık

### 1. Projeyi Build Et

```bash
npm install
npm run build
```

### 2. Deployment Dosyalarını Hazırla

Aşağıdaki dosyaları ZIP olarak paketleyin:

**Dahil edilmesi gerekenler:**
- `.next/` klasörü (build sonrası oluşur)
- `public/` klasörü
- `node_modules/` klasörü
- `server.js`
- `package.json`
- `package-lock.json`
- `next.config.js`
- `.env.local` (Supabase bilgilerinizle)

**Dahil edilMEmesi gerekenler:**
- `app/` klasörü (sadece build için gerekli)
- `scripts/` klasörü
- `.git/` klasörü
- `README.md` ve dökümanlar

### 3. Ortam Değişkenlerini Kontrol Et

`.env.local` dosyasında şunlar olmalı:

```env
NEXT_PUBLIC_SUPABASE_URL=https://cjzfnzxdoogmtvqngmxa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqemZuenhkb29nbXR2cW5nbXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMzU1MTIsImV4cCI6MjA1MjYxMTUxMn0.Gc22mX7d_7DP-LTMShxdIDsPqRBs10pNTn1b_z1FRnA
```

## Plesk'e Deployment

### Adım 1: Plesk'e Giriş

1. http://31.186.11.184:8880/smb/web/view adresine gidin
2. Kullanıcı adı: `falbccayercom`
3. Şifre: `1c4b1-2f4fd4`

### Adım 2: Node.js Uygulaması Oluştur

1. Sol menüden "Websites & Domains" seçin
2. Domain'inizi seçin (falbcca.yer.com veya yeni subdomain)
3. "Node.js" ikonuna tıklayın
4. "Enable Node.js" butonuna tıklayın

### Adım 3: Node.js Ayarları

```
Node.js version: 18.x veya 20.x (en güncel stabil)
Application mode: Production
Application root: /httpdocs
Application URL: / (veya subdomain)
Application startup file: server.js
```

### Adım 4: Dosyaları Yükle

**Seçenek A: File Manager (Önerilen)**

1. Plesk File Manager'a gidin
2. `httpdocs` klasörüne gidin
3. İçindekileri silin (boşalt)
4. ZIP dosyanızı yükleyin
5. ZIP'i extract edin
6. Dosya izinlerini kontrol edin (755 klasörler, 644 dosyalar)

**Seçenek B: FTP**

1. FTP bilgilerinizi Plesk'ten alın
2. FileZilla gibi FTP client ile bağlanın
3. `httpdocs` klasörüne tüm dosyaları yükleyin

### Adım 5: Environment Variables

1. Node.js ayarlarında "Environment Variables" bölümüne gidin
2. Şu değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL = https://cjzfnzxdoogmtvqngmxa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqemZuenhkb29nbXR2cW5nbXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMzU1MTIsImV4cCI6MjA1MjYxMTUxMn0.Gc22mX7d_7DP-LTMShxdIDsPqRBs10pNTn1b_z1FRnA
NODE_ENV = production
```

### Adım 6: NPM Modules (Eğer node_modules yüklemediyseniz)

1. SSH/Terminal'e gidin (Plesk'te)
2. Şu komutları çalıştırın:

```bash
cd /var/www/vhosts/yourdomain.com/httpdocs
npm install --production
```

### Adım 7: Uygulamayı Başlat

1. Node.js ayarlarına dönün
2. "Restart App" butonuna tıklayın
3. Uygulama otomatik başlayacak

### Adım 8: SSL/HTTPS (Önerilen)

1. "SSL/TLS Certificates" bölümüne gidin
2. "Install a free basic certificate provided by Let's Encrypt" seçin
3. Sertifikayı aktif edin

## Sorun Giderme

### Uygulama Başlamıyor

1. Logs kontrol edin:
   - Plesk Node.js bölümünde "Logs" sekmesi
   - `/var/www/vhosts/yourdomain.com/logs/` klasörü

2. Port kontrolü:
   - `server.js` dosyasında port 3000 kullanılıyor
   - Plesk otomatik olarak proxy yapacak

3. Dosya izinleri:
   ```bash
   chmod -R 755 /var/www/vhosts/yourdomain.com/httpdocs
   chown -R username:psacln /var/www/vhosts/yourdomain.com/httpdocs
   ```

### PWA Çalışmıyor

1. HTTPS zorunlu - SSL sertifika kurdunuz mu?
2. Service Worker register oluyor mu? Browser console kontrol edin
3. Manifest.json erişilebilir mi? `https://yourdomain.com/manifest.json`

### Supabase Bağlantı Hatası

1. Environment variables doğru girilmiş mi?
2. Supabase RLS policies aktif mi?
3. API key'ler geçerli mi?

## Güncelleme

Uygulama güncellemek için:

```bash
# Lokal'de
npm run build

# Yeni .next klasörünü FTP ile yükle
# Plesk'te Node.js'i restart et
```

## Notlar

- **Production build kullanın** (`npm run build`)
- **HTTPS kullanın** (PWA için zorunlu)
- **Environment variables** Plesk'te girilmeli
- **Custom server** (`server.js`) Plesk ile uyumlu
- **.env.local** dosyasını commit etmeyin
- **node_modules** klasörünü ZIP'e dahil etmek deploy'u hızlandırır
- **Port 3000** Plesk proxy ile otomatik yönlenecek

## Destek

Sorun yaşarsanız:
1. Plesk logs kontrol edin
2. Browser console kontrol edin
3. Supabase dashboard'da queries kontrol edin
4. Server.js'in çalıştığından emin olun

## Hızlı Checklist

- [ ] `npm run build` çalıştırıldı
- [ ] ZIP paketi hazırlandı
- [ ] Plesk'e giriş yapıldı
- [ ] Node.js aktif edildi
- [ ] Dosyalar yüklendi
- [ ] Environment variables eklendi
- [ ] Uygulama restart edildi
- [ ] SSL sertifika kuruldu
- [ ] Tarayıcıda test edildi
- [ ] PWA install çalışıyor
- [ ] Supabase bağlantısı çalışıyor
