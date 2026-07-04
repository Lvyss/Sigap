// src/app/page.js
'use client';

import { useState } from 'react';
import MapWrapper from '@/components/map/MapWrapper';
import ModalDetail from '@/components/ui/ModalDetail';
import PanelKanan from '@/components/panel/PanelKanan';
import TombolFullscreen from '@/components/map/TombolFullscreen';
import TombolLokasi from '@/components/map/TombolLokasi';

export default function Home() {
  const [selectedFasilitas, setSelectedFasilitas] = useState(null);
  const [flyToTarget, setFlyToTarget] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadingLokasi, setLoadingLokasi] = useState(false);
  const [posisiUser, setPosisiUser] = useState(null);
  const [errorLokasi, setErrorLokasi] = useState(null);
  const [aktifFilter, setAktifFilter] = useState(null); // null = semua tampil

  const handleFasilitasClick = (fasilitas) => {
    setFlyToTarget(fasilitas);
    setSelectedId(fasilitas.id);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  // GPS handler — aktif hanya saat tombol ditekan
  const handleLokasi = () => {
    // Cek support browser
    if (!navigator.geolocation) {
      setErrorLokasi('Browser kamu tidak mendukung fitur lokasi.');
      return;
    }

    setLoadingLokasi(true);
    setErrorLokasi(null);

    navigator.geolocation.getCurrentPosition(
      // Success
      (position) => {
        setPosisiUser({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          akurasi: position.coords.accuracy,
        });
        setLoadingLokasi(false);
      },
      // Error
      (err) => {
        setLoadingLokasi(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setErrorLokasi('Izin lokasi ditolak. Aktifkan lokasi di browser.');
            break;
          case err.POSITION_UNAVAILABLE:
            setErrorLokasi('Lokasi tidak tersedia saat ini.');
            break;
          case err.TIMEOUT:
            setErrorLokasi('Permintaan lokasi timeout. Coba lagi.');
            break;
          default:
            setErrorLokasi('Gagal mendapatkan lokasi.');
        }
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  return (
    <main className="w-screen h-screen flex overflow-hidden">

      {/* KIRI: Peta */}
      <div className="flex-1 h-full relative">
 <MapWrapper
  onLihatDetail={setSelectedFasilitas}
  flyToTarget={flyToTarget}
  posisiUser={posisiUser}
  aktifFilter={aktifFilter}
/>

        <TombolFullscreen
          isFullscreen={isFullscreen}
          onToggle={handleToggleFullscreen}
        />

        <TombolLokasi
          onLokasi={handleLokasi}
          loading={loadingLokasi}
        />

        {/* Toast error lokasi */}
        {errorLokasi && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] bg-red-500 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorLokasi}</span>
            <button
              onClick={() => setErrorLokasi(null)}
              className="ml-2 text-white/70 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* KANAN: Panel */}
      <div
        className={`h-full flex-shrink-0 overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-0' : 'w-80'
        }`}
      >
        <div
          className={`h-full w-80 transition-transform duration-300 ${
            isFullscreen ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
<PanelKanan
  onFasilitasClick={handleFasilitasClick}
  selectedId={selectedId}
  onFilterChange={setAktifFilter}
/>
        </div>
      </div>

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