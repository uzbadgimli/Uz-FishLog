import "./globals.css";

export const metadata = {
  title: "UZ FishLog - Balık Avı Takip",
  description: "Balık avlarınızı kaydedin ve takip edin. Türk balıkçılar için özel tasarlanmış mobil uygulama.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UZ FishLog"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563EB"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UZ FishLog" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
