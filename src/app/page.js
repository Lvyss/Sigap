// src/app/page.js
'use client';

import { useState } from 'react';
import MapWrapper from '@/components/map/MapWrapper';
import ModalDetail from '@/components/ui/ModalDetail';
import PanelKanan from '@/components/panel/PanelKanan';

export default function Home() {
  const [selectedFasilitas, setSelectedFasilitas] = useState(null);
  const [flyToTarget, setFlyToTarget] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleFasilitasClick = (fasilitas) => {
    setFlyToTarget(fasilitas);
    setSelectedId(fasilitas.id);
  };

  return (
    <main className="w-screen h-screen flex overflow-hidden">

      {/* KIRI: Peta */}
      <div className="flex-1 h-full relative">
        <MapWrapper
          onLihatDetail={setSelectedFasilitas}
          flyToTarget={flyToTarget}
        />
      </div>

      {/* KANAN: Panel */}
      <PanelKanan
        onFasilitasClick={handleFasilitasClick}
        selectedId={selectedId}
      />

      {/* Modal Detail */}
      {selectedFasilitas && (
        <ModalDetail
          fasilitas={selectedFasilitas}
          onClose={() => setSelectedFasilitas(null)}
        />
      )}

    </main>
  );
}