'use client'

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/app/context/AuthContext'
import { Yoga, Pilates, Cimnastik, Esneme, Malzemeler } from './Gorseller'

// Ölçüm sütunları - sıra, tablodaki sütun sırasıdır
const OLCULER = [
  { key: 'kilo_kg', label: 'Kilo', birim: 'kg' },
  { key: 'yag_orani', label: 'Yağ %', birim: '%' },
  { key: 'omuz', label: 'Omuz', birim: 'cm' },
  { key: 'gogus', label: 'Göğüs', birim: 'cm' },
  { key: 'bel', label: 'Bel', birim: 'cm' },
  { key: 'alt_karin', label: 'Alt Karın', birim: 'cm' },
  { key: 'basen', label: 'Basen', birim: 'cm' },
  { key: 'sag_bacak', label: 'Sağ Bacak', birim: 'cm' },
  { key: 'sol_bacak', label: 'Sol Bacak', birim: 'cm' },
  { key: 'sag_kol', label: 'Sağ Kol', birim: 'cm' },
  { key: 'sol_kol', label: 'Sol Kol', birim: 'cm' },
]

const PAKETLER = ['Aylık', '3 Aylık', '6 Aylık', 'Yıllık', 'Ders Paketi']
const PAKET_AY = { 'Aylık': 1, '3 Aylık': 3, '6 Aylık': 6, 'Yıllık': 12 }

// Başlangıca paket süresini ekler; 31 Ocak + 1 ay = 28/29 Şubat
function bitisHesapla(baslangic, paket) {
  const ay = PAKET_AY[paket]
  if (!baslangic || !ay) return null
  const [y, a, g] = baslangic.split('-').map(Number)
  const sonGun = new Date(Date.UTC(y, a - 1 + ay + 1, 0)).getUTCDate()
  return new Date(Date.UTC(y, a - 1 + ay, Math.min(g, sonGun))).toISOString().slice(0, 10)
}
const HEDEFLER = ['Kilo verme', 'Kas kazanma', 'Sıkılaşma', 'Genel sağlık', 'Rehabilitasyon']

const bugun = () => new Date().toISOString().slice(0, 10)
const tarihTR = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('tr-TR') : '-')
const sayi = (v) => (v === '' || v === null || v === undefined ? null : Number(String(v).replace(',', '.')))

const BOS_UYE = {
  ad_soyad: '', telefon: '', email: '', dogum_tarihi: '', cinsiyet: '', boy_cm: '',
  uyelik_baslangic: bugun(), uyelik_bitis: '', paket: '', hedef: '', aktif: true, notlar: '',
}
const bosOlcum = (uyeId = '') => ({
  uye_id: uyeId, olcum_tarihi: bugun(), notlar: '',
  ...Object.fromEntries(OLCULER.map((o) => [o.key, ''])),
})

function yas(dogum) {
  if (!dogum) return null
  const d = new Date(dogum), n = new Date()
  let y = n.getFullYear() - d.getFullYear()
  if (n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) y--
  return y
}

function uyelikDurumu(uye) {
  if (!uye.aktif) return { text: 'Pasif', renk: '#a3acbd', tur: 'pasif' }
  if (!uye.uyelik_bitis) return { text: 'Aktif', renk: '#5fb89a', tur: 'aktif' }
  const kalan = Math.ceil((new Date(uye.uyelik_bitis + 'T00:00:00') - new Date(bugun() + 'T00:00:00')) / 86400000)
  if (kalan < 0) return { text: 'Süresi doldu', renk: '#e58a8a', tur: 'bitti' }
  if (kalan <= 7) return { text: `${kalan} gün kaldı`, renk: '#e3a54f', tur: 'yaklasan' }
  return { text: 'Aktif', renk: '#5fb89a', tur: 'aktif' }
}

// Demo modu: giriş yapmadan örnek verilerle gezinmek için (kaydedilmez)
function ornekVeri() {
  const gun = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10)
  const uyeler = [
    { id: 'u1', ad_soyad: 'Ayşe Yılmaz', telefon: '0532 111 22 33', email: '', dogum_tarihi: '1994-05-12', cinsiyet: 'Kadın', boy_cm: 165, uyelik_baslangic: gun(95), uyelik_bitis: gun(-85), paket: '6 Aylık', hedef: 'Kilo verme', aktif: true, notlar: 'Bel fıtığı geçmişi var, ağır squat yok.' },
    { id: 'u2', ad_soyad: 'Zeynep Kaya', telefon: '0533 444 55 66', email: '', dogum_tarihi: '1988-11-03', cinsiyet: 'Kadın', boy_cm: 170, uyelik_baslangic: gun(60), uyelik_bitis: gun(-4), paket: 'Aylık', hedef: 'Sıkılaşma', aktif: true, notlar: '' },
    { id: 'u3', ad_soyad: 'Elif Demir', telefon: '0535 777 88 99', email: '', dogum_tarihi: '2000-02-20', cinsiyet: 'Kadın', boy_cm: 160, uyelik_baslangic: gun(40), uyelik_bitis: gun(-50), paket: '3 Aylık', hedef: 'Kas kazanma', aktif: true, notlar: '' },
    { id: 'u4', ad_soyad: 'Merve Çelik', telefon: '0536 123 45 67', email: '', dogum_tarihi: '1979-08-30', cinsiyet: 'Kadın', boy_cm: 158, uyelik_baslangic: gun(200), uyelik_bitis: gun(20), paket: '6 Aylık', hedef: 'Genel sağlık', aktif: false, notlar: '' },
  ]
  const olc = (id, uye_id, g, v, notlar = '') => ({ id, uye_id, olcum_tarihi: gun(g), notlar, ...Object.fromEntries(OLCULER.map((o, i) => [o.key, v[i]])) })
  const olcumler = [
    olc('o1', 'u1', 90, [78.4, 34.0, 108, 102, 92, 101, 112, 64, 63.5, 31.5, 31]),
    olc('o2', 'u1', 60, [75.9, 32.5, 107, 100, 88.5, 98, 109, 62.5, 62, 31, 30.5]),
    olc('o3', 'u1', 30, [74.1, 31.2, 106, 99, 86, 96.5, 107.5, 61.5, 61, 30.5, 30]),
    olc('o4', 'u1', 2, [72.8, 30.1, 106, 98.5, 84, 95, 106, 61, 60.5, 30, 29.5], 'Sabah aç karnına ölçüldü. Bel bölgesinde belirgin incelme var, programa devam.'),
    olc('o5', 'u2', 58, [66.0, 27.0, 104, 94, 76, 86, 100, 58, 58, 28, 28]),
    olc('o6', 'u2', 10, [65.2, 25.4, 104, 93.5, 74, 84, 99, 57, 57.5, 28, 27.5], 'Tatil dönüşü ilk ölçüm.'),
    olc('o7', 'u3', 38, [52.5, 22.0, 98, 86, 66, 76, 92, 52, 52, 24.5, 24.5]),
    olc('o8', 'u3', 5, [54.0, 21.5, 100, 88, 66, 76, 94, 53.5, 53, 26, 25.5]),
  ]
  return { uyeler, olcumler: olcumler.sort((a, b) => b.olcum_tarihi.localeCompare(a.olcum_tarihi)) }
}

const sirala = (tablo, liste) =>
  tablo === 'spor_uyeler'
    ? [...liste].sort((a, b) => a.ad_soyad.localeCompare(b.ad_soyad, 'tr'))
    : [...liste].sort((a, b) => b.olcum_tarihi.localeCompare(a.olcum_tarihi))

export default function SporDeneme() {
  const { user, loading: authLoading, signIn, signOut } = useAuth()

  const [sekme, setSekme] = useState('uyeler')
  const [uyeler, setUyeler] = useState([])
  const [olcumler, setOlcumler] = useState([])
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState('')
  const [tabloYok, setTabloYok] = useState(false)

  const [filtreUye, setFiltreUye] = useState('')
  const [seciliUye, setSeciliUye] = useState(null)
  const [uyeForm, setUyeForm] = useState(null) // null = kapalı
  const [olcumForm, setOlcumForm] = useState(null)
  const [demo, setDemo] = useState(false)
  const [benim, setBenim] = useState({ uyeler: [], olcumler: [] }) // üye olarak giriş yapanın kendi kayıtları

  // uyeGozu: salon yerine ilk örnek üyenin kendi ekranı gösterilir
  const demoBaslat = (uyeGozu = false) => {
    const v = ornekVeri()
    if (uyeGozu) {
      setUyeler([])
      setOlcumler([])
      setBenim({ uyeler: [v.uyeler[0]], olcumler: v.olcumler.filter((o) => o.uye_id === v.uyeler[0].id) })
    } else {
      setUyeler(v.uyeler)
      setOlcumler(v.olcumler)
    }
    setDemo(true)
  }

  const demoBitir = () => {
    setDemo(false)
    setUyeler([])
    setOlcumler([])
    setBenim({ uyeler: [], olcumler: [] })
  }

  // ?demo ile açılırsa doğrudan örnek verilerle başla
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    if (q.has('demo')) demoBaslat(q.get('demo') === 'uye')
  }, [])

  const yukle = useCallback(async () => {
    setYukleniyor(true)
    setHata('')
    const [u, o] = await Promise.all([
      supabase.from('spor_uyeler').select('*').order('ad_soyad'),
      supabase.from('spor_olcumler').select('*').order('olcum_tarihi', { ascending: false }),
    ])
    const err = u.error || o.error
    if (err) {
      if (err.code === '42P01' || err.code === 'PGRST205') setTabloYok(true)
      else setHata(err.message)
    } else {
      // Sorgu hem sahibi olduğu kayıtları hem e-postası eşleşen üye kaydını döndürür; ayır
      setTabloYok(false)
      const sahip = (x) => x.sahip_id === user?.id
      setUyeler(u.data.filter(sahip))
      setOlcumler(o.data.filter(sahip))
      setBenim({ uyeler: u.data.filter((x) => !sahip(x)), olcumler: o.data.filter((x) => !sahip(x)) })
    }
    setYukleniyor(false)
  }, [user])

  useEffect(() => {
    if (user && !demo) yukle()
  }, [user, demo, yukle])

  const uyeAdi = useMemo(() => Object.fromEntries(uyeler.map((u) => [u.id, u.ad_soyad])), [uyeler])

  const gorunenOlcumler = useMemo(
    () => (filtreUye ? olcumler.filter((o) => o.uye_id === filtreUye) : olcumler),
    [olcumler, filtreUye]
  )

  // --- Kaydetme / silme (demo modunda yalnız sayfa hafızasında) ---

  const dbKaydet = async (tablo, id, alanlar) => {
    if (demo) {
      const set = tablo === 'spor_uyeler' ? setUyeler : setOlcumler
      set((l) => sirala(tablo, id ? l.map((x) => (x.id === id ? { ...x, ...alanlar } : x)) : [...l, { id: crypto.randomUUID(), ...alanlar }]))
      return {}
    }
    const sonuc = id
      ? await supabase.from(tablo).update(alanlar).eq('id', id)
      : await supabase.from(tablo).insert(alanlar)
    if (!sonuc.error) yukle()
    return sonuc
  }

  const dbSil = async (tablo, id) => {
    if (demo) {
      if (tablo === 'spor_uyeler') {
        setUyeler((l) => l.filter((x) => x.id !== id))
        setOlcumler((l) => l.filter((x) => x.uye_id !== id))
      } else setOlcumler((l) => l.filter((x) => x.id !== id))
      return {}
    }
    const sonuc = await supabase.from(tablo).delete().eq('id', id)
    if (!sonuc.error) yukle()
    return sonuc
  }

  const uyeKaydet = async (e) => {
    e.preventDefault()
    const kayit = {
      ...uyeForm,
      boy_cm: sayi(uyeForm.boy_cm),
      dogum_tarihi: uyeForm.dogum_tarihi || null,
      uyelik_bitis: uyeForm.uyelik_bitis || null,
      cinsiyet: uyeForm.cinsiyet || null,
    }
    const { id, sahip_id, created_at, ...alanlar } = kayit
    const { error } = await dbKaydet('spor_uyeler', id, alanlar)
    if (error) return setHata(error.message)
    setUyeForm(null)
  }

  const uyeSil = async (uye) => {
    if (!confirm(`${uye.ad_soyad} ve tüm ölçümleri silinsin mi?`)) return
    const { error } = await dbSil('spor_uyeler', uye.id)
    if (error) return setHata(error.message)
    setSeciliUye(null)
  }

  const olcumKaydet = async (e) => {
    e.preventDefault()
    if (!olcumForm.uye_id) return setHata('Üye seçin')
    const { id, sahip_id, created_at, ...alanlar } = olcumForm
    OLCULER.forEach((o) => { alanlar[o.key] = sayi(alanlar[o.key]) })
    const { error } = await dbKaydet('spor_olcumler', id, alanlar)
    if (error) return setHata(error.message)
    setOlcumForm(null)
  }

  const olcumSil = async (olcum) => {
    if (!confirm(`${tarihTR(olcum.olcum_tarihi)} tarihli ölçüm silinsin mi?`)) return
    const { error } = await dbSil('spor_olcumler', olcum.id)
    if (error) return setHata(error.message)
  }

  // --- Ekranlar ---

  if (!demo && authLoading) return <GirisKabuk><p style={{ ...s.soluk, textAlign: 'center' }}>Yükleniyor…</p></GirisKabuk>
  if (!demo && !user) return <GirisKabuk><GirisFormu signIn={signIn} onDemo={demoBaslat} /></GirisKabuk>

  // Kendi salonu olmayan ama bir salonda üye kaydı bulunan kişi: yalnız kendi bilgileri, salt okunur
  if (!uyeler.length && benim.uyeler.length) {
    return (
      <Kabuk
        sag={
          <div style={s.kullanici}>
            <span style={s.soluk}>{demo ? 'Demo — üye gözüyle' : user.email}</span>
            <button style={s.linkBtn} onClick={demo ? demoBitir : signOut}>Çıkış</button>
          </div>
        }
      >
        {benim.uyeler.map((u) => (
          <UyeDetay key={u.id} uye={u} olcumler={benim.olcumler.filter((o) => o.uye_id === u.id)} salt />
        ))}
      </Kabuk>
    )
  }

  return (
    <Kabuk
      sag={
        <div style={s.kullanici}>
          <span style={s.soluk}>{demo ? 'Demo modu — değişiklikler kaydedilmez' : user.email}</span>
          <button style={s.linkBtn} onClick={demo ? demoBitir : signOut}>Çıkış</button>
        </div>
      }
    >
      {tabloYok && (
        <div style={s.uyari}>
          Veritabanı tabloları henüz oluşturulmamış. <code>sql/spordeneme.sql</code> dosyasını Supabase SQL Editor&apos;da çalıştırın.
        </div>
      )}
      {hata && (
        <div style={s.hata} onClick={() => setHata('')}>{hata} <span style={s.soluk}>(kapat)</span></div>
      )}

      <div className="spor-ozet" style={s.ozet}>
        <Kart baslik="Toplam üye" deger={uyeler.length} />
        <Kart baslik="Aktif üye" deger={uyeler.filter((u) => ['aktif', 'yaklasan'].includes(uyelikDurumu(u).tur)).length} />
        <Kart baslik="Toplam ölçüm" deger={olcumler.length} />
        <Kart baslik="Süresi yaklaşan" deger={uyeler.filter((u) => uyelikDurumu(u).tur === 'yaklasan').length} />
      </div>

      <div style={s.sekmeler}>
        {[['uyeler', 'Üyeler'], ['olcumler', 'Ölçümler']].map(([k, l]) => (
          <button key={k} style={sekme === k ? s.sekmeAktif : s.sekme} onClick={() => { setSekme(k); setSeciliUye(null) }}>{l}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button style={s.ikincilBtn} onClick={() => setUyeForm({ ...BOS_UYE })}>+ Yeni Üye</button>
        <button style={s.anaBtn} disabled={!uyeler.length} onClick={() => setOlcumForm(bosOlcum(filtreUye || seciliUye?.id || ''))}>+ Yeni Ölçüm</button>
      </div>

      {yukleniyor && <p style={s.soluk}>Yükleniyor…</p>}

      {sekme === 'olcumler' && (
        <>
          <div style={s.filtre}>
            <label style={s.soluk}>Üye:</label>
            <select style={s.input} value={filtreUye} onChange={(e) => setFiltreUye(e.target.value)}>
              <option value="">Tümü</option>
              {uyeler.map((u) => <option key={u.id} value={u.id}>{u.ad_soyad}</option>)}
            </select>
          </div>
          <OlcumTablosu
            olcumler={gorunenOlcumler}
            uyeAdi={uyeAdi}
            uyeSutunu={!filtreUye}
            degisimGoster={!!filtreUye}
            onDuzenle={(o) => setOlcumForm({ ...bosOlcum(), ...nullBosalt(o) })}
            onSil={olcumSil}
          />
        </>
      )}

      {sekme === 'uyeler' && !seciliUye && (
        <UyeListesi uyeler={uyeler} olcumler={olcumler} onSec={setSeciliUye} />
      )}

      {sekme === 'uyeler' && seciliUye && (
        <UyeDetay
          uye={uyeler.find((u) => u.id === seciliUye.id) || seciliUye}
          olcumler={olcumler.filter((o) => o.uye_id === seciliUye.id)}
          onGeri={() => setSeciliUye(null)}
          onDuzenle={(u) => setUyeForm({ ...BOS_UYE, ...nullBosalt(u) })}
          onSil={uyeSil}
          onOlcumEkle={() => setOlcumForm(bosOlcum(seciliUye.id))}
          onOlcumDuzenle={(o) => setOlcumForm({ ...bosOlcum(), ...nullBosalt(o) })}
          onOlcumSil={olcumSil}
        />
      )}

      {uyeForm && <UyeFormu form={uyeForm} setForm={setUyeForm} onKaydet={uyeKaydet} onKapat={() => setUyeForm(null)} />}
      {olcumForm && <OlcumFormu form={olcumForm} setForm={setOlcumForm} uyeler={uyeler} onKaydet={olcumKaydet} onKapat={() => setOlcumForm(null)} />}
    </Kabuk>
  )
}

const nullBosalt = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === null ? '' : v]))

// --- Parçalar ---

const CSS = `
body{margin:0}
.spor-yan{position:fixed;bottom:24px;width:170px;pointer-events:none;display:none}
@media (min-width:1480px){.spor-yan{display:block}}
.spor-ust-sus{display:flex;gap:4px;align-items:flex-end}
@media (max-width:760px){.spor-ust-sus{display:none}}
.spor-ozet{grid-template-columns:repeat(4,1fr)}
@media (max-width:640px){.spor-ozet{grid-template-columns:repeat(2,1fr)}}
`

function Kabuk({ children, sag }) {
  return (
    <div style={s.sayfa}>
      <style>{CSS}</style>
      <header style={s.ust}>
        <div style={s.ustIc}>
          <div>
            <div style={s.logo}>Spor Salonu <span style={s.etiket}>DENEME</span></div>
            <div style={s.soluk}>Üye ve vücut ölçüm takibi</div>
            <div style={{ marginTop: 8 }}>{sag}</div>
          </div>
          <div className="spor-ust-sus">
            <Yoga style={{ width: 70 }} />
            <Pilates style={{ width: 92 }} />
            <Cimnastik style={{ width: 70 }} />
          </div>
        </div>
      </header>
      <main style={s.icerik}>{children}</main>
      <div className="spor-yan" style={{ left: 16 }}>
        <Esneme style={{ width: '100%' }} />
        <Malzemeler style={{ width: '100%', marginTop: 12 }} />
      </div>
      <div className="spor-yan" style={{ right: 16 }}>
        <Yoga style={{ width: '100%' }} />
        <Pilates style={{ width: '100%', marginTop: 12 }} />
      </div>
    </div>
  )
}

function GirisKabuk({ children }) {
  return (
    <div style={s.girisSayfa}>
      <style>{CSS}</style>
      <Yoga style={{ ...s.kose, left: '3%', bottom: '4%', width: 'min(26vw, 240px)' }} />
      <Pilates style={{ ...s.kose, right: '3%', bottom: '4%', width: 'min(30vw, 280px)' }} />
      <Cimnastik style={{ ...s.kose, left: '4%', top: '6%', width: 'min(20vw, 190px)' }} />
      <Malzemeler style={{ ...s.kose, right: '4%', top: '6%', width: 'min(26vw, 260px)' }} />
      <div style={s.girisOrta}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ ...s.logo, fontSize: 28 }}>Spor Salonu <span style={s.etiket}>DENEME</span></div>
          <div style={{ ...s.soluk, fontSize: 15, marginTop: 4 }}>Üye ve vücut ölçüm takibi</div>
        </div>
        {children}
      </div>
    </div>
  )
}

function GirisFormu({ signIn, onDemo }) {
  const [mod, setMod] = useState('uye') // 'uye' | 'salon'
  const [email, setEmail] = useState('')
  const [sifre, setSifre] = useState('')
  const [kod, setKod] = useState('')
  const [gonderildi, setGonderildi] = useState(false)
  const [hata, setHata] = useState('')
  const [bekle, setBekle] = useState(false)

  const modDegistir = (m) => { setMod(m); setHata(''); setGonderildi(false) }

  // Üye girişi: şifre yok, e-postaya giriş bağlantısı ve kod gider
  const kodGonder = async (e) => {
    e.preventDefault()
    setBekle(true)
    setHata('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/spordeneme/` },
    })
    setBekle(false)
    if (error) return setHata(error.message.includes('rate') ? 'Çok fazla deneme, biraz sonra tekrar deneyin' : error.message)
    setGonderildi(true)
  }

  const kodDogrula = async (e) => {
    e.preventDefault()
    setBekle(true)
    setHata('')
    const { error } = await supabase.auth.verifyOtp({ email, token: kod.trim(), type: 'email' })
    setBekle(false)
    if (error) setHata('Kod hatalı ya da süresi dolmuş')
  }

  // Google'dan dönünce FishLog ana sayfasına değil bu sayfaya gelinsin
  const googleIle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/spordeneme/` },
    })
    if (error) setHata(error.message)
  }

  const gonder = async (e) => {
    e.preventDefault()
    setBekle(true)
    const r = await signIn(email, sifre)
    if (r.error) setHata(r.error)
    setBekle(false)
  }

  const googleBtn = (
    <button type="button" style={{ ...s.ikincilBtn, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={googleIle}>
      <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
      </svg>
      Google ile giriş
    </button>
  )

  return (
    <div style={s.girisKutu}>
      <div style={s.girisSekmeler}>
        {[['uye', 'Üye girişi'], ['salon', 'Salon girişi']].map(([k, l]) => (
          <button key={k} type="button" style={mod === k ? s.girisSekmeAktif : s.girisSekme} onClick={() => modDegistir(k)}>{l}</button>
        ))}
      </div>

      {mod === 'uye' && !gonderildi && (
        <form onSubmit={kodGonder} style={s.girisForm}>
          <p style={s.soluk}>Salona kayıtlı e-posta adresinizi yazın, size giriş bağlantısı gönderelim. Şifre gerekmez.</p>
          <input style={s.input} type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {hata && <div style={s.hata}>{hata}</div>}
          <button style={s.anaBtn} disabled={bekle}>{bekle ? 'Gönderiliyor…' : 'Giriş bağlantısı gönder'}</button>
          {googleBtn}
        </form>
      )}

      {mod === 'uye' && gonderildi && (
        <form onSubmit={kodDogrula} style={s.girisForm}>
          <p style={{ margin: 0 }}><b>{email}</b> adresine giriş bağlantısı gönderdik.</p>
          <p style={s.soluk}>E-postadaki bağlantıya tıklayın. E-postada 6 haneli bir kod varsa buraya da yazabilirsiniz. Gelen kutusunda yoksa spam klasörüne bakın.</p>
          <input style={{ ...s.input, letterSpacing: 4, textAlign: 'center' }} inputMode="numeric" autoComplete="one-time-code" placeholder="Kod" value={kod} onChange={(e) => setKod(e.target.value)} required />
          {hata && <div style={s.hata}>{hata}</div>}
          <button style={s.anaBtn} disabled={bekle}>{bekle ? 'Kontrol ediliyor…' : 'Giriş yap'}</button>
          <button type="button" style={s.linkBtn} onClick={() => { setGonderildi(false); setKod('') }}>Farklı e-posta / tekrar gönder</button>
        </form>
      )}

      {mod === 'salon' && (
        <form onSubmit={gonder} style={s.girisForm}>
          <p style={s.soluk}>Salon yöneticisi girişi. Üye bilgileri yalnızca giriş yapan hesaba görünür.</p>
          <input style={s.input} type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input style={s.input} type="password" placeholder="Şifre" value={sifre} onChange={(e) => setSifre(e.target.value)} required />
          {hata && <div style={s.hata}>{hata}</div>}
          <button style={s.anaBtn} disabled={bekle}>{bekle ? 'Giriş yapılıyor…' : 'Giriş yap'}</button>
          {googleBtn}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" style={{ ...s.ikincilBtn, flex: 1 }} onClick={() => onDemo(false)}>Örnek: salon</button>
            <button type="button" style={{ ...s.ikincilBtn, flex: 1 }} onClick={() => onDemo(true)}>Örnek: üye gözüyle</button>
          </div>
        </form>
      )}
    </div>
  )
}

function Kart({ baslik, deger }) {
  return (
    <div style={s.kart}>
      <div style={s.kartDeger}>{deger}</div>
      <div style={s.soluk}>{baslik}</div>
    </div>
  )
}

function OlcumTablosu({ olcumler, uyeAdi, uyeSutunu, degisimGoster, onDuzenle, onSil }) {
  if (!olcumler.length) return <div style={s.bos}><Malzemeler style={{ width: 180 }} /><p style={{ margin: '8px 0 0' }}>Henüz ölçüm yok.</p></div>
  // Tarih azalan sırada; bir sonraki satır bir önceki ölçümdür
  return (
    <div style={s.tabloSar}>
      <table style={s.tablo}>
        <thead>
          <tr>
            <th style={s.th}>Tarih</th>
            {uyeSutunu && <th style={s.th}>Üye</th>}
            {OLCULER.map((o) => <th key={o.key} style={s.th}>{o.label}<div style={s.birim}>{o.birim}</div></th>)}
            {onDuzenle && <th style={s.th}></th>}
          </tr>
        </thead>
        <tbody>
          {olcumler.map((o, i) => {
            const onceki = degisimGoster ? olcumler[i + 1] : null
            const hucre = o.notlar ? { ...s.td, borderBottom: 'none' } : s.td
            return (
              <Fragment key={o.id}>
              <tr>
                <td style={hucre}>{tarihTR(o.olcum_tarihi)}</td>
                {uyeSutunu && <td style={{ ...hucre, textAlign: 'left', fontWeight: 600 }}>{uyeAdi[o.uye_id] || '-'}</td>}
                {OLCULER.map((m) => (
                  <td key={m.key} style={hucre}>
                    {o[m.key] ?? '-'}
                    {onceki && o[m.key] != null && onceki[m.key] != null && <Degisim fark={o[m.key] - onceki[m.key]} />}
                  </td>
                ))}
                {onDuzenle && (
                  <td style={{ ...hucre, whiteSpace: 'nowrap' }}>
                    <button style={s.linkBtn} onClick={() => onDuzenle(o)}>Düzenle</button>
                    <button style={{ ...s.linkBtn, color: '#e58a8a' }} onClick={() => onSil(o)}>Sil</button>
                  </td>
                )}
              </tr>
              {o.notlar && (
                <tr>
                  <td colSpan={OLCULER.length + 1 + (uyeSutunu ? 1 : 0) + (onDuzenle ? 1 : 0)} style={s.notHucre}>
                    <span style={s.notEtiket}>Not:</span> {o.notlar}
                  </td>
                </tr>
              )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function Degisim({ fark }) {
  const f = Math.round(fark * 10) / 10
  if (!f) return null
  return <div style={{ fontSize: 11, color: '#6b7280' }}>{f > 0 ? '+' : ''}{f}</div>
}

function UyeListesi({ uyeler, olcumler, onSec }) {
  if (!uyeler.length) return <p style={s.bos}>Henüz üye yok. &quot;+ Yeni Üye&quot; ile ekleyin.</p>
  return (
    <div style={s.tabloSar}>
      <table style={s.tablo}>
        <thead>
          <tr>
            {['Ad Soyad', 'Telefon', 'Paket', 'Üyelik Başlangıç', 'Üyelik Bitiş', 'Durum', 'Son Ölçüm'].map((h) => <th key={h} style={s.th}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {uyeler.map((u) => {
            const d = uyelikDurumu(u)
            const son = olcumler.find((o) => o.uye_id === u.id)
            const hucre = u.notlar ? { ...s.td, borderBottom: 'none' } : s.td
            return (
              <Fragment key={u.id}>
              <tr style={{ cursor: 'pointer' }} onClick={() => onSec(u)}>
                <td style={{ ...hucre, textAlign: 'left', fontWeight: 600 }}>{u.ad_soyad}</td>
                <td style={hucre}>{u.telefon || '-'}</td>
                <td style={hucre}>{u.paket || '-'}</td>
                <td style={hucre}>{tarihTR(u.uyelik_baslangic)}</td>
                <td style={hucre}>{tarihTR(u.uyelik_bitis)}</td>
                <td style={hucre}><span style={{ ...s.rozet, background: d.renk }}>{d.text}</span></td>
                <td style={hucre}>{son ? tarihTR(son.olcum_tarihi) : '-'}</td>
              </tr>
              {u.notlar && (
                <tr style={{ cursor: 'pointer' }} onClick={() => onSec(u)}>
                  <td colSpan={7} style={s.notHucre}>
                    <span style={s.notEtiket}>Not:</span> {u.notlar}
                  </td>
                </tr>
              )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function UyeDetay({ uye, olcumler, onGeri, onDuzenle, onSil, onOlcumEkle, onOlcumDuzenle, onOlcumSil, salt }) {
  const d = uyelikDurumu(uye)
  const ilk = olcumler[olcumler.length - 1]
  const son = olcumler[0]
  const vki = son?.kilo_kg && uye.boy_cm ? (son.kilo_kg / (uye.boy_cm / 100) ** 2).toFixed(1) : null

  return (
    <div>
      {!salt && <button style={s.linkBtn} onClick={onGeri}>← Üye listesi</button>}
      <div style={s.detayKutu}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>{uye.ad_soyad}</h2>
          <span style={{ ...s.rozet, background: d.renk }}>{d.text}</span>
          <div style={{ flex: 1 }} />
          {!salt && <button style={s.ikincilBtn} onClick={() => onDuzenle(uye)}>Düzenle</button>}
          {!salt && <button style={{ ...s.ikincilBtn, color: '#e58a8a' }} onClick={() => onSil(uye)}>Sil</button>}
        </div>
        <div style={s.bilgiUst}>
          <Bilgi e="Telefon" d={uye.telefon} />
          <Bilgi e="E-posta" d={uye.email} />
          <Bilgi e="Üyelik" d={`${tarihTR(uye.uyelik_baslangic)} → ${tarihTR(uye.uyelik_bitis)}`} />
        </div>
        <div style={s.bilgiAlt}>
          <Bilgi e="Yaş" d={yas(uye.dogum_tarihi)} />
          <Bilgi e="Cinsiyet" d={uye.cinsiyet} />
          <Bilgi e="Boy" d={uye.boy_cm && `${uye.boy_cm} cm`} />
          <Bilgi e="VKİ (son ölçüm)" d={vki} />
          <Bilgi e="Paket" d={uye.paket} />
          <Bilgi e="Hedef" d={uye.hedef} />
        </div>
        {!salt && uye.notlar && <p style={{ margin: '8px 0 0' }}><b>Not:</b> {uye.notlar}</p>}
      </div>

      {ilk && son && ilk !== son && (
        <div style={s.detayKutu}>
          <b>İlk ölçümden bu yana değişim</b> <span style={s.soluk}>({tarihTR(ilk.olcum_tarihi)} → {tarihTR(son.olcum_tarihi)})</span>
          <div style={s.degisimIzgara}>
            {OLCULER.filter((m) => ilk[m.key] != null && son[m.key] != null).map((m) => {
              const f = Math.round((son[m.key] - ilk[m.key]) * 10) / 10
              return (
                <div key={m.key} style={s.degisimKart}>
                  <div style={s.soluk}>{m.label}</div>
                  <div style={{ fontWeight: 700, color: f < 0 ? '#5fb89a' : f > 0 ? '#e3a54f' : '#5d6b85' }}>
                    {f > 0 ? '+' : ''}{f} {m.birim}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0 8px' }}>
        <h3 style={{ margin: 0, flex: 1 }}>Ölçümler</h3>
        {!salt && <button style={s.anaBtn} onClick={onOlcumEkle}>+ Ölçüm Ekle</button>}
      </div>
      <OlcumTablosu olcumler={olcumler} uyeAdi={{}} uyeSutunu={false} degisimGoster onDuzenle={salt ? null : onOlcumDuzenle} onSil={onOlcumSil} />
    </div>
  )
}

function Bilgi({ e, d }) {
  return (
    <div>
      <div style={s.soluk}>{e}</div>
      <div style={{ overflowWrap: 'anywhere' }}>{d || d === 0 ? d : '-'}</div>
    </div>
  )
}

function Modal({ baslik, children, onKapat }) {
  return (
    <div style={s.modalArka} onClick={onKapat}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, flex: 1 }}>{baslik}</h3>
          <button style={s.linkBtn} onClick={onKapat}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Alan({ etiket, children, genis }) {
  return (
    <label style={{ ...s.alan, gridColumn: genis ? '1 / -1' : undefined }}>
      <span style={s.alanEtiket}>{etiket}</span>
      {children}
    </label>
  )
}

function UyeFormu({ form, setForm, onKaydet, onKapat }) {
  const b = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }), style: s.input })
  // Paket ya da başlangıç değişince bitiş tarihi yeniden hesaplanır (Ders Paketi'nde elle girilir)
  const sureli = (k) => ({
    ...b(k),
    onChange: (e) => {
      const yeni = { ...form, [k]: e.target.value }
      const bitis = bitisHesapla(yeni.uyelik_baslangic, yeni.paket)
      setForm(bitis ? { ...yeni, uyelik_bitis: bitis } : yeni)
    },
  })
  return (
    <Modal baslik={form.id ? 'Üyeyi Düzenle' : 'Yeni Üye'} onKapat={onKapat}>
      <form onSubmit={onKaydet} style={s.formIzgara}>
        <Alan etiket="Ad Soyad *" genis><input {...b('ad_soyad')} required /></Alan>
        <Alan etiket="Telefon"><input {...b('telefon')} type="tel" /></Alan>
        <Alan etiket="E-posta"><input {...b('email')} type="email" /></Alan>
        <Alan etiket="Doğum Tarihi"><input {...b('dogum_tarihi')} type="date" /></Alan>
        <Alan etiket="Cinsiyet">
          <select {...b('cinsiyet')}><option value="">-</option><option>Kadın</option><option>Erkek</option></select>
        </Alan>
        <Alan etiket="Boy (cm)"><input {...b('boy_cm')} inputMode="decimal" /></Alan>
        <Alan etiket="Paket">
          <select {...sureli('paket')}><option value="">-</option>{PAKETLER.map((p) => <option key={p}>{p}</option>)}</select>
        </Alan>
        <Alan etiket="Üyelik Başlangıç *"><input {...sureli('uyelik_baslangic')} type="date" required /></Alan>
        <Alan etiket="Üyelik Bitiş"><input {...b('uyelik_bitis')} type="date" /></Alan>
        <Alan etiket="Hedef">
          <select {...b('hedef')}><option value="">-</option>{HEDEFLER.map((h) => <option key={h}>{h}</option>)}</select>
        </Alan>
        <Alan etiket="Durum">
          <select value={form.aktif ? '1' : '0'} onChange={(e) => setForm({ ...form, aktif: e.target.value === '1' })} style={s.input}>
            <option value="1">Aktif</option><option value="0">Pasif</option>
          </select>
        </Alan>
        <Alan etiket="Notlar (sağlık durumu, sakatlık vb.)" genis><textarea {...b('notlar')} rows={2} /></Alan>
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button type="button" style={s.ikincilBtn} onClick={onKapat}>Vazgeç</button>
          <button style={s.anaBtn}>Kaydet</button>
        </div>
      </form>
    </Modal>
  )
}

function OlcumFormu({ form, setForm, uyeler, onKaydet, onKapat }) {
  const b = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }), style: s.input })
  return (
    <Modal baslik={form.id ? 'Ölçümü Düzenle' : 'Yeni Ölçüm'} onKapat={onKapat}>
      <form onSubmit={onKaydet} style={s.formIzgara}>
        <Alan etiket="Üye *">
          <select {...b('uye_id')} required>
            <option value="">Seçin</option>
            {uyeler.map((u) => <option key={u.id} value={u.id}>{u.ad_soyad}</option>)}
          </select>
        </Alan>
        <Alan etiket="Ölçüm Tarihi *"><input {...b('olcum_tarihi')} type="date" required /></Alan>
        {OLCULER.map((o) => (
          <Alan key={o.key} etiket={`${o.label} (${o.birim})`}><input {...b(o.key)} inputMode="decimal" /></Alan>
        ))}
        <Alan etiket="Not" genis><input {...b('notlar')} /></Alan>
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button type="button" style={s.ikincilBtn} onClick={onKapat}>Vazgeç</button>
          <button style={s.anaBtn}>Kaydet</button>
        </div>
      </form>
    </Modal>
  )
}

// --- Stiller ---

const ANA = '#6f97d4'
const YAZI = '#33415c'

const s = {
  sayfa: { minHeight: '100vh', background: 'linear-gradient(180deg, #eef4fd 0%, #f7f5fd 100%)', color: YAZI },
  ust: { background: 'linear-gradient(120deg, #d9e7fb 0%, #e6e0fa 60%, #fbe5dc 100%)', color: YAZI, padding: '14px 16px 0' },
  ustIc: { maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, paddingBottom: 6 },
  logo: { fontSize: 20, fontWeight: 800, letterSpacing: 0.3 },
  etiket: { fontSize: 10, color: '#fff', background: '#b9a3e6', padding: '2px 6px', borderRadius: 4, verticalAlign: 'middle', marginLeft: 6 },
  icerik: { maxWidth: 1200, margin: '0 auto', padding: 16 },
  soluk: { color: '#7a8499', fontSize: 13, margin: 0 },
  kullanici: { display: 'flex', alignItems: 'center', gap: 10 },
  uyari: { background: '#fef3c7', border: '1px solid #f59e0b', padding: 12, borderRadius: 8, marginBottom: 12 },
  hata: { background: '#fee2e2', border: '1px solid #f87171', padding: 10, borderRadius: 8, marginBottom: 12, cursor: 'pointer' },
  ozet: { display: 'grid', gap: 10, marginBottom: 16 },
  kart: { background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 4px 14px rgba(111,151,212,.12)' },
  kartDeger: { fontSize: 26, fontWeight: 800, color: ANA },
  sekmeler: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' },
  sekme: { padding: '8px 16px', borderRadius: 999, border: '1px solid #d5e1f3', background: '#fff', color: YAZI, cursor: 'pointer', fontWeight: 600 },
  sekmeAktif: { padding: '8px 16px', borderRadius: 999, border: '1px solid #c9d9f2', background: '#dbe7fa', color: '#3d5f95', cursor: 'pointer', fontWeight: 700 },
  anaBtn: { padding: '9px 16px', borderRadius: 999, border: 'none', background: 'linear-gradient(120deg, #7ea6e0, #a99be6)', color: '#fff', cursor: 'pointer', fontWeight: 600 },
  ikincilBtn: { padding: '8px 16px', borderRadius: 999, border: '1px solid #d5e1f3', background: '#fff', color: YAZI, cursor: 'pointer', fontWeight: 600 },
  linkBtn: { background: 'none', border: 'none', color: '#5a82c4', cursor: 'pointer', padding: '4px 6px', fontSize: 14 },
  filtre: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 },
  input: { padding: '9px 12px', borderRadius: 10, border: '1px solid #d5e1f3', fontSize: 15, background: '#fbfcff', color: YAZI, width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' },
  tabloSar: { overflowX: 'auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 14px rgba(111,151,212,.12)' },
  tablo: { borderCollapse: 'collapse', width: '100%', fontSize: 14 },
  th: { padding: '12px 8px', background: '#f1f6fd', color: '#4a6491', borderBottom: '1px solid #e2eaf6', textAlign: 'center', whiteSpace: 'nowrap', fontWeight: 700 },
  birim: { fontSize: 10, color: '#9fb0cc', fontWeight: 400 },
  td: { padding: '9px 8px', borderBottom: '1px solid #f0f4fa', textAlign: 'center', whiteSpace: 'nowrap' },
  notHucre: { padding: '0 12px 10px', borderBottom: '1px solid #f0f4fa', textAlign: 'left', fontSize: 13, color: '#5d6b85', whiteSpace: 'normal' },
  notEtiket: { fontWeight: 700, color: '#8a7cc4' },
  bos: { background: '#fff', padding: 24, borderRadius: 16, textAlign: 'center', color: '#7a8499' },
  rozet: { color: '#fff', padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 600 },
  detayKutu: { background: '#fff', borderRadius: 16, padding: 16, marginTop: 10, boxShadow: '0 4px 14px rgba(111,151,212,.12)' },
  bilgiUst: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 14, paddingBottom: 12, borderBottom: '1px solid #f0f4fa' },
  bilgiAlt: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 12, marginTop: 12 },
  degisimIzgara: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 8, marginTop: 10 },
  degisimKart: { background: '#f4f7fd', borderRadius: 12, padding: 8, textAlign: 'center' },
  girisKutu: { background: 'rgba(255,255,255,.92)', padding: 26, borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 12px 40px rgba(80,120,190,.18)' },
  girisForm: { display: 'flex', flexDirection: 'column', gap: 10 },
  girisSekmeler: { display: 'flex', gap: 4, background: '#eef3fb', padding: 4, borderRadius: 999, marginBottom: 4 },
  girisSekme: { flex: 1, padding: '8px 10px', borderRadius: 999, border: 'none', background: 'transparent', color: '#7a8499', cursor: 'pointer', fontWeight: 600, fontSize: 14 },
  girisSekmeAktif: { flex: 1, padding: '8px 10px', borderRadius: 999, border: 'none', background: '#fff', color: '#3d5f95', cursor: 'pointer', fontWeight: 700, fontSize: 14, boxShadow: '0 1px 4px rgba(80,120,190,.15)' },
  girisSayfa: { position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'radial-gradient(circle at 20% 15%, #e9e2fb 0%, transparent 45%), radial-gradient(circle at 85% 90%, #fde6dc 0%, transparent 40%), linear-gradient(160deg, #dceafd 0%, #cfe0f8 100%)', color: YAZI, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, boxSizing: 'border-box' },
  girisOrta: { position: 'relative', zIndex: 1, width: '100%', maxWidth: 380 },
  kose: { position: 'absolute', pointerEvents: 'none' },
  modalArka: { position: 'fixed', inset: 0, background: 'rgba(51,65,92,.35)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 16, overflowY: 'auto', zIndex: 50 },
  modal: { background: '#fff', borderRadius: 20, padding: 18, width: '100%', maxWidth: 560, marginTop: 30 },
  formIzgara: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 },
  alan: { display: 'flex', flexDirection: 'column', gap: 4 },
  alanEtiket: { fontSize: 12, color: '#5d6b85', fontWeight: 600 },
}
