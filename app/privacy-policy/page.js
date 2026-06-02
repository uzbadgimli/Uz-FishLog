export const metadata = {
  title: "Gizlilik Politikası | UZ FishLog",
  description: "UZ FishLog Gizlilik Politikası - KVKK ve GDPR uyumlu",
};

export default function PrivacyPolicy() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.h1}>Gizlilik Politikası</h1>
        <p style={styles.meta}>Son güncelleme: 10 Mart 2026</p>

        <p style={styles.p}>
          Bu gizlilik politikası, <strong>UZ FishLog</strong> mobil uygulaması ve web sitesi
          (&quot;Uygulama&quot;) tarafından toplanan, kullanılan ve korunan kişisel verileri açıklar.
          Uygulamayı kullanarak bu politikayı kabul etmiş sayılırsınız.
        </p>

        <h2 style={styles.h2}>1. Veri Sorumlusu</h2>
        <p style={styles.p}>
          <strong>UZ FishLog</strong><br />
          İletişim: <a href="mailto:team.uzbad@gmail.com" style={styles.link}>team.uzbad@gmail.com</a><br />
          Ülke: Türkiye
        </p>

        <h2 style={styles.h2}>2. Toplanan Veriler</h2>

        <h3 style={styles.h3}>2.1. Hesap Bilgileri</h3>
        <ul style={styles.ul}>
          <li>E-posta adresi (kayıt ve giriş için)</li>
          <li>Şifre (şifrelenmiş olarak saklanır)</li>
        </ul>

        <h3 style={styles.h3}>2.2. Av Kayıtları</h3>
        <ul style={styles.ul}>
          <li>Balık türü, boy, ağırlık</li>
          <li>Av lokasyonu (kullanıcının girdiği yer adı)</li>
          <li>Av tarihi ve saati</li>
          <li>Notlar</li>
          <li>Fotoğraflar (isteğe bağlı)</li>
        </ul>

        <h3 style={styles.h3}>2.3. Konum Verileri</h3>
        <ul style={styles.ul}>
          <li>Favori balıkçılık lokasyonları (kullanıcının eklediği koordinatlar)</li>
          <li>Cihaz GPS konumu (yalnızca kullanıcı izin verdiğinde, konum bazlı hava durumu ve balık önerileri için)</li>
        </ul>

        <h3 style={styles.h3}>2.4. Kullanım Verileri</h3>
        <ul style={styles.ul}>
          <li>Uygulama tercihleri (dil, tema)</li>
          <li>Bildirim ayarları</li>
        </ul>

        <h3 style={styles.h3}>2.5. Toplanmayan Veriler</h3>
        <ul style={styles.ul}>
          <li>Kişi listesi, mesajlar veya arama geçmişi gibi hassas veriler <strong>toplanmaz</strong></li>
          <li>Reklam kimliği veya cihaz parmak izi <strong>toplanmaz</strong></li>
          <li>Konum verisi arka planda <strong>izlenmez</strong> (yalnızca uygulama açıkken ve izinle)</li>
        </ul>

        <h2 style={styles.h2}>3. Verilerin Kullanım Amacı</h2>
        <ul style={styles.ul}>
          <li>Av kayıtlarınızı saklamak ve görüntülemek</li>
          <li>Konumunuza göre hava durumu ve balık önerileri sunmak</li>
          <li>İstatistik ve analiz özellikleri sağlamak</li>
          <li>Bildirim göndermek (kullanıcı izniyle)</li>
          <li>Uygulamayı geliştirmek ve hataları düzeltmek</li>
        </ul>

        <h2 style={styles.h2}>4. Veri Saklama ve Güvenlik</h2>
        <p style={styles.p}>
          Verileriniz <strong>Supabase</strong> (PostgreSQL) altyapısında, endüstri standardı güvenlik
          önlemleriyle saklanır:
        </p>
        <ul style={styles.ul}>
          <li>SSL/TLS şifreli veri iletimi</li>
          <li>Row Level Security (RLS) ile kullanıcı bazlı erişim kontrolü</li>
          <li>Şifreler bcrypt ile hashlenir</li>
          <li>Fotoğraflar Supabase Storage&apos;da şifreli olarak saklanır</li>
        </ul>

        <h2 style={styles.h2}>5. Üçüncü Taraf Hizmetler</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Hizmet</th>
              <th style={styles.th}>Amaç</th>
              <th style={styles.th}>Paylaşılan Veri</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Supabase</td>
              <td style={styles.td}>Veritabanı, kimlik doğrulama, dosya depolama</td>
              <td style={styles.td}>Hesap bilgileri, av kayıtları, fotoğraflar</td>
            </tr>
            <tr>
              <td style={styles.td}>Open-Meteo</td>
              <td style={styles.td}>Hava durumu verileri</td>
              <td style={styles.td}>Koordinatlar (anonim API çağrısı)</td>
            </tr>
          </tbody>
        </table>
        <p style={styles.p}>
          Verileriniz reklam amacıyla üçüncü taraflarla <strong>paylaşılmaz</strong> ve <strong>satılmaz</strong>.
        </p>

        <h2 style={styles.h2}>6. Kullanıcı Hakları (KVKK Madde 11 / GDPR)</h2>
        <p style={styles.p}>Aşağıdaki haklara sahipsiniz:</p>
        <ul style={styles.ul}>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>Verilerinizin düzeltilmesini isteme</li>
          <li>Verilerinizin silinmesini isteme</li>
          <li>Verilerinizin bir kopyasını talep etme (veri taşınabilirliği)</li>
          <li>İşleme faaliyetine itiraz etme</li>
        </ul>
        <p style={styles.p}>
          Bu haklarınızı kullanmak için{" "}
          <a href="mailto:team.uzbad@gmail.com" style={styles.link}>team.uzbad@gmail.com</a>{" "}
          adresine e-posta gönderebilirsiniz. Talepleriniz en geç 30 gün içinde yanıtlanacaktır.
        </p>

        <h2 style={styles.h2}>7. Hesap Silme</h2>
        <p style={styles.p}>
          Hesabınızı ve tüm verilerinizi silmek için{" "}
          <a href="mailto:team.uzbad@gmail.com" style={styles.link}>team.uzbad@gmail.com</a>{" "}
          adresine &quot;Hesap Silme Talebi&quot; konusuyla e-posta gönderebilirsiniz.
          Hesabınız ve ilişkili tüm veriler (av kayıtları, fotoğraflar, favori lokasyonlar) kalıcı olarak silinecektir.
        </p>

        <h2 style={styles.h2}>8. Çocukların Gizliliği</h2>
        <p style={styles.p}>
          Uygulamamız 13 yaşın altındaki çocuklara yönelik değildir. Bilerek 13 yaşın altındaki
          kişilerden veri toplamayız. Ebeveyn veya vasiler, çocuklarının veri paylaştığını fark ederlerse
          bizimle iletişime geçebilir.
        </p>

        <h2 style={styles.h2}>9. Çerezler ve Yerel Depolama</h2>
        <p style={styles.p}>
          Mobil uygulama çerez kullanmaz. Kullanıcı tercihleri (dil, tema, bildirim ayarları) cihazda
          AsyncStorage ile yerel olarak saklanır ve sunuculara gönderilmez.
        </p>

        <h2 style={styles.h2}>10. Politika Değişiklikleri</h2>
        <p style={styles.p}>
          Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişikliklerde uygulama içi
          bildirim ile kullanıcılar bilgilendirilecektir. Güncel politika her zaman bu sayfada
          yayınlanacaktır.
        </p>

        <h2 style={styles.h2}>11. İletişim</h2>
        <p style={styles.p}>
          Gizlilik politikamız hakkında sorularınız için:<br />
          <strong>UZ FishLog</strong><br />
          E-posta: <a href="mailto:team.uzbad@gmail.com" style={styles.link}>team.uzbad@gmail.com</a>
        </p>

        <div style={styles.divider} />

        {/* English Version */}
        <h1 style={styles.h1}>Privacy Policy</h1>
        <p style={styles.meta}>Last updated: March 10, 2026</p>

        <p style={styles.p}>
          This privacy policy describes the personal data collected, used, and protected by the
          <strong> UZ FishLog</strong> mobile application and website (&quot;App&quot;).
          By using the App, you agree to this policy.
        </p>

        <h2 style={styles.h2}>1. Data Controller</h2>
        <p style={styles.p}>
          <strong>UZ FishLog</strong><br />
          Contact: <a href="mailto:team.uzbad@gmail.com" style={styles.link}>team.uzbad@gmail.com</a><br />
          Country: Turkey
        </p>

        <h2 style={styles.h2}>2. Data We Collect</h2>

        <h3 style={styles.h3}>2.1. Account Information</h3>
        <ul style={styles.ul}>
          <li>Email address (for registration and login)</li>
          <li>Password (stored encrypted)</li>
        </ul>

        <h3 style={styles.h3}>2.2. Catch Records</h3>
        <ul style={styles.ul}>
          <li>Fish species, length, weight</li>
          <li>Catch location (user-entered place name)</li>
          <li>Catch date and time</li>
          <li>Notes</li>
          <li>Photos (optional)</li>
        </ul>

        <h3 style={styles.h3}>2.3. Location Data</h3>
        <ul style={styles.ul}>
          <li>Favorite fishing locations (coordinates added by user)</li>
          <li>Device GPS location (only when user grants permission, for location-based weather and fish recommendations)</li>
        </ul>

        <h3 style={styles.h3}>2.4. Usage Data</h3>
        <ul style={styles.ul}>
          <li>App preferences (language, theme)</li>
          <li>Notification settings</li>
        </ul>

        <h3 style={styles.h3}>2.5. Data We Do NOT Collect</h3>
        <ul style={styles.ul}>
          <li>Contacts, messages, or call history are <strong>not collected</strong></li>
          <li>Advertising IDs or device fingerprints are <strong>not collected</strong></li>
          <li>Location is <strong>not tracked</strong> in the background (only when app is open and with permission)</li>
        </ul>

        <h2 style={styles.h2}>3. How We Use Your Data</h2>
        <ul style={styles.ul}>
          <li>Store and display your catch records</li>
          <li>Provide weather and fish recommendations based on your location</li>
          <li>Provide statistics and analytics features</li>
          <li>Send notifications (with user permission)</li>
          <li>Improve the app and fix bugs</li>
        </ul>

        <h2 style={styles.h2}>4. Data Storage and Security</h2>
        <p style={styles.p}>
          Your data is stored on <strong>Supabase</strong> (PostgreSQL) infrastructure with
          industry-standard security measures:
        </p>
        <ul style={styles.ul}>
          <li>SSL/TLS encrypted data transmission</li>
          <li>Row Level Security (RLS) for user-based access control</li>
          <li>Passwords hashed with bcrypt</li>
          <li>Photos stored encrypted on Supabase Storage</li>
        </ul>

        <h2 style={styles.h2}>5. Third-Party Services</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Purpose</th>
              <th style={styles.th}>Data Shared</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Supabase</td>
              <td style={styles.td}>Database, authentication, file storage</td>
              <td style={styles.td}>Account info, catch records, photos</td>
            </tr>
            <tr>
              <td style={styles.td}>Open-Meteo</td>
              <td style={styles.td}>Weather data</td>
              <td style={styles.td}>Coordinates (anonymous API call)</td>
            </tr>
          </tbody>
        </table>
        <p style={styles.p}>
          Your data is <strong>not shared</strong> with third parties for advertising purposes
          and is <strong>not sold</strong>.
        </p>

        <h2 style={styles.h2}>6. Your Rights (KVKK Article 11 / GDPR)</h2>
        <p style={styles.p}>You have the following rights:</p>
        <ul style={styles.ul}>
          <li>Learn whether your personal data is being processed</li>
          <li>Request information about processing activities</li>
          <li>Request correction of your data</li>
          <li>Request deletion of your data</li>
          <li>Request a copy of your data (data portability)</li>
          <li>Object to processing activities</li>
        </ul>
        <p style={styles.p}>
          To exercise your rights, email us at{" "}
          <a href="mailto:team.uzbad@gmail.com" style={styles.link}>team.uzbad@gmail.com</a>.
          We will respond within 30 days.
        </p>

        <h2 style={styles.h2}>7. Account Deletion</h2>
        <p style={styles.p}>
          To delete your account and all associated data, send an email to{" "}
          <a href="mailto:team.uzbad@gmail.com" style={styles.link}>team.uzbad@gmail.com</a>{" "}
          with the subject &quot;Account Deletion Request&quot;.
          Your account and all related data (catch records, photos, favorite locations) will be permanently deleted.
        </p>

        <h2 style={styles.h2}>8. Children&apos;s Privacy</h2>
        <p style={styles.p}>
          Our App is not intended for children under 13. We do not knowingly collect data from
          individuals under 13. Parents or guardians who become aware that their child has shared
          data may contact us.
        </p>

        <h2 style={styles.h2}>9. Cookies and Local Storage</h2>
        <p style={styles.p}>
          The mobile app does not use cookies. User preferences (language, theme, notification settings)
          are stored locally on the device using AsyncStorage and are not sent to servers.
        </p>

        <h2 style={styles.h2}>10. Changes to This Policy</h2>
        <p style={styles.p}>
          This privacy policy may be updated from time to time. Users will be notified of significant
          changes through in-app notifications. The current policy will always be published on this page.
        </p>

        <h2 style={styles.h2}>11. Contact</h2>
        <p style={styles.p}>
          For questions about our privacy policy:<br />
          <strong>UZ FishLog</strong><br />
          Email: <a href="mailto:team.uzbad@gmail.com" style={styles.link}>team.uzbad@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
    padding: "2rem 1rem",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
  },
  content: {
    maxWidth: "720px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  h1: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: "0.5rem",
    marginTop: "2rem",
  },
  h2: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1E40AF",
    marginTop: "2rem",
    marginBottom: "0.75rem",
  },
  h3: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#334155",
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  p: {
    fontSize: "0.938rem",
    lineHeight: "1.7",
    color: "#334155",
    marginBottom: "0.75rem",
  },
  meta: {
    fontSize: "0.875rem",
    color: "#64748B",
    marginBottom: "1.5rem",
  },
  ul: {
    fontSize: "0.938rem",
    lineHeight: "1.7",
    color: "#334155",
    paddingLeft: "1.5rem",
    marginBottom: "0.75rem",
  },
  link: {
    color: "#2563EB",
    textDecoration: "underline",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
    fontSize: "0.875rem",
  },
  th: {
    textAlign: "left",
    padding: "0.75rem",
    backgroundColor: "#F1F5F9",
    borderBottom: "2px solid #E2E8F0",
    color: "#1E40AF",
    fontWeight: "600",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #E2E8F0",
    color: "#334155",
  },
  divider: {
    height: "2px",
    backgroundColor: "#E2E8F0",
    margin: "3rem 0",
  },
};
