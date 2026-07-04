import 'leaflet/dist/leaflet.css';
import './globals.css';

export const metadata = {
  title: 'SIGAP — Peta Desa Sidomukti',
  description: 'Sistem Informasi Geografis dan Potensi Desa Sidomukti',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // ← ini yang bikin safe area aktif
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

