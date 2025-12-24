# 🚀 Quick Start - UZ FishLog

3 adımda deploy edin!

## 1️⃣ Build

```bash
npm install
npm run build
```

## 2️⃣ Paketleme

Şu dosyaları ZIP'leyin:
```
uz-fishlog.zip
├── .next/
├── public/
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
├── next.config.js
└── .env.local
```

## 3️⃣ Plesk'e Deploy

1. http://31.186.11.184:8880 → Login
2. Node.js → Enable → Version 18+
3. File Manager → `httpdocs` → Upload ZIP → Extract
4. Environment Variables ekle:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://cjzfnzxdoogmtvqngmxa.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
5. Restart App

✅ Bitti! Siteniz hazır.

---

Detaylı bilgi için: [PLESK_DEPLOYMENT.md](PLESK_DEPLOYMENT.md)
