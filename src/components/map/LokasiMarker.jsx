// src/components/map/LokasiMarker.jsx
'use client';

import { useEffect } from 'react';
import { Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom icon "Anda di sini" — dot biru
const lokasiIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 18px;
      height: 18px;
      background-color: #3B82F6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.35);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
});

export default function LokasiMarker({ posisi }) {
  const map = useMap();

  // Fly ke posisi user saat pertama dapat lokasi
  useEffect(() => {
    if (posisi) {
      map.flyTo([posisi.lat, posisi.lng], 17, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [posisi, map]);

  if (!posisi) return null;

  return (
    <>
      {/* Lingkaran akurasi */}
      <Circle
        center={[posisi.lat, posisi.lng]}
        radius={posisi.akurasi}
        pathOptions={{
          color: '#3B82F6',
          fillColor: '#3B82F6',
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: '4 4',
        }}
      />
      {/* Titik lokasi */}
      <Marker
        position={[posisi.lat, posisi.lng]}
        icon={lokasiIcon}
      />
    </>
  );
}