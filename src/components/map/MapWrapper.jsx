// src/components/map/MapWrapper.jsx
'use client';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm font-medium">Memuat peta...</p>
      </div>
    </div>
  ),
});

export default function MapWrapper({ onLihatDetail, flyToTarget, posisiUser, aktifFilter, onZoomChange }) {
  return (
    <MapView
      onLihatDetail={onLihatDetail}
      flyToTarget={flyToTarget}
      posisiUser={posisiUser}
      aktifFilter={aktifFilter}
      onZoomChange={onZoomChange}
    />
  );
}