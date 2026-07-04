// src/app/page.js
'use client';

import { useState } from 'react';
import MapWrapper from '@/components/map/MapWrapper';
import ModalDetail from '@/components/ui/ModalDetail';

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
        <p className="text-xs text-gray-400 mt-4">
          Panel fasilitas lengkap akan muncul di sini (Step 6)
        </p>
      </div>

      {/* Modal Detail — render di luar layout */}
      {selectedFasilitas && (
        <ModalDetail
          fasilitas={selectedFasilitas}
          onClose={() => setSelectedFasilitas(null)}
        />
      )}

    </main>
  );
}