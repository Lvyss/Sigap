// src/components/map/FasilitasMarker.jsx
'use client';

import { Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';
import { createMarkerIcon } from '@/lib/markerIcon';
import { KATEGORI } from '@/data/fasilitas';

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

          {/* Tombol */}
          <div className="px-3 pb-3 pt-1">
            <button
              onClick={() => onLihatDetail(fasilitas)}
              className="w-full py-1.5 rounded-lg text-white text-[11px] font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-1"
              style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
            >
              Lihat Detail →
            </button>
          </div>

        </div>
      </Popup>
    </Marker>
  );
}