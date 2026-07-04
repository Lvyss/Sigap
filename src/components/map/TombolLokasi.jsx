// src/components/map/TombolLokasi.jsx
'use client';

import { Crosshair } from 'lucide-react';

export default function TombolLokasi({ onLokasi, loading }) {
  return (
    <button
      onClick={onLokasi}
      disabled={loading}
      style={{ bottom: 'calc(env(safe-area-inset-bottom) + 5rem)' }}
      className="absolute right-3 z-[1000] bg-white hover:bg-gray-50 text-gray-700 rounded-xl p-2.5 shadow-lg border border-gray-200 transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
      title="Lokasi Saya"
    >
      {loading ? (
        <div className="w-[18px] h-[18px] border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <Crosshair size={18} />
      )}
    </button>
  );
}