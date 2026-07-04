// src/app/page.js
'use client';

import { useState } from 'react';
import MapWrapper from '@/components/map/MapWrapper';

export default function Home() {
  const [selectedFasilitas, setSelectedFasilitas] = useState(null);

  return (
    <main className="w-screen h-screen flex overflow-hidden">

      {/* KIRI: Peta */}
      <div className="flex-1 h-full relative">
        <MapWrapper onLihatDetail={setSelectedFasilitas} />
      </div>

      {/* KANAN: Panel Info (placeholder) */}
      <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col p-4">
        <h1 className="text-lg font-bold text-gray-800">Desa Sidomukti</h1>
        <p className="text-sm text-gray-500">Kec. Bener, Kab. Purworejo</p>

        {/* Debug: cek state selected */}
        {selectedFasilitas && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 font-semibold">Selected:</p>
            <p className="text-sm text-green-800">{selectedFasilitas.nama}</p>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Panel fasilitas lengkap akan muncul di sini (Step 6)
        </p>
      </div>

    </main>
  );
}