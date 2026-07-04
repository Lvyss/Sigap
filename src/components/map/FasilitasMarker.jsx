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
      <Popup className="sigap-popup">
        <div className="flex flex-col gap-1 min-w-[180px]">

          {/* Header kategori */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-t-md"
            style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
          >
            <span className="text-white text-xs font-semibold uppercase tracking-wide">
              {kategoriData?.label || 'Fasilitas'}
            </span>
          </div>

          {/* Isi popup */}
          <div className="px-3 py-2">
            <p className="font-bold text-gray-800 text-sm leading-tight">
              {fasilitas.nama}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {fasilitas.infoSingkat}
            </p>
          </div>

          {/* Tombol detail */}
          <div className="px-3 pb-3">
            <button
              onClick={() => onLihatDetail(fasilitas)}
              className="w-full text-xs font-semibold text-white py-1.5 rounded-md transition-opacity hover:opacity-90"
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