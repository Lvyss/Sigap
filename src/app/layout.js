import 'leaflet/dist/leaflet.css';
import './globals.css';

export const metadata = {
  title: 'SIGAP — Peta Desa Sidomukti',
  description: 'Sistem Informasi Geografis dan Potensi Desa Sidomukti, Kec. Bener, Kab. Purworejo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}