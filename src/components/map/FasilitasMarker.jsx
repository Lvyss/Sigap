// src/components/map/FasilitasMarker.jsx
'use client';

import { Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';
import { createMarkerIcon } from '@/lib/markerIcon';
import { KATEGORI } from '@/data/fasilitas';

function bukaGoogleMaps(koordinat) {
  const [lat, lng] = koordinat;
  // Kalau mobile → buka app Google Maps langsung
  // Kalau desktop → buka Google Maps web
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  window.open(url, '_blank');
}

export default function FasilitasMarker({ fasilitas, onLihatDetail }) {
  const kategoriData = useMemo(() =>
    Object.values(KATEGORI).find((k) => k.id === fasilitas.kategori),
    [fasilitas.kategori]
  );

  const icon = useMemo(() =>
    createMarkerIcon(kategoriData?.warna || '#6B7280'),
    [kategoriData]
  );

  return (
    <Marker position={fasilitas.koordinat} icon={icon}>
      <Popup className="sigap-popup" maxWidth={220} minWidth={220}>
        <div className="flex flex-col w-full overflow-hidden rounded-xl">

          {/* Foto 1 */}
          <div className="relative w-full h-28 bg-gray-100">
            {fasilitas.foto1 ? (
              <img
                src={fasilitas.foto1}
                alt={fasilitas.nama}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-xs">Foto belum tersedia</span>
              </div>
            )}

            {/* Badge kategori */}
            <div
              className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-white text-[9px] font-semibold"
              style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
            >
              {kategoriData?.label || 'Potensi'}
            </div>
          </div>

          {/* Nama */}
          <div className="px-3 pt-2 pb-1">
            <h3 className="text-xs font-bold text-gray-800 leading-tight">
              {fasilitas.nama}
            </h3>
          </div>

          {/* Tombol — 2 tombol sejajar */}
          <div className="px-3 pb-3 pt-1 flex gap-1.5">

            {/* Lihat Detail */}
            <button
              onClick={() => onLihatDetail(fasilitas)}
              className="flex-1 py-1.5 rounded-lg text-white text-[10px] font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
            >
              Detail
            </button>

            {/* Navigasi */}
            <button
              onClick={() => bukaGoogleMaps(fasilitas.koordinat)}
              className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold border transition-all hover:bg-gray-50 flex items-center justify-center gap-1"
              style={{
                borderColor: kategoriData?.warna || '#6B7280',
                color: kategoriData?.warna || '#6B7280',
              }}
            >
              Petunjuk Arah
            </button>

          </div>
        </div>
      </Popup>
    </Marker>
  );
}