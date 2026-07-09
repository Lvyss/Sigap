// src/app/layout.js
import 'leaflet/dist/leaflet.css';
import './globals.css';

export const metadata = {
  title: 'SIGAP — Peta Desa Jengglungharjo',
  description: 'Sistem Informasi Geografis dan Potensi Desa Jengglungharjo',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}