// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import MapWrapper from '@/components/map/MapWrapper';
import ModalDetail from '@/components/ui/ModalDetail';
import PanelKanan from '@/components/panel/PanelKanan';
import TombolFullscreen from '@/components/map/TombolFullscreen';
import TombolLokasi from '@/components/map/TombolLokasi';
import { X } from 'lucide-react'; // ← tambah ini

export default function Home() {
  const [selectedFasilitas, setSelectedFasilitas] = useState(null);
    const [showMapHint, setShowMapHint] = useState(true);

    useEffect(() => {
  const timer = setTimeout(() => setShowMapHint(false), 4000);
  return () => clearTimeout(timer);
}, []);

  const [flyToTarget, setFlyToTarget] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadingLokasi, setLoadingLokasi] = useState(false);
  const [posisiUser, setPosisiUser] = useState(null);
  const [errorLokasi, setErrorLokasi] = useState(null);
  const [aktifFilter, setAktifFilter] = useState(null);
  const [mapZoom, setMapZoom] = useState(14);
  const [mapLat, setMapLat] = useState(-8.26);


  const handleFasilitasClick = (fasilitas) => {
    setFlyToTarget(fasilitas);
    setSelectedId(fasilitas.id);
  };

  const handleZoomChange = (zoom, lat) => {
    setMapZoom(zoom);
    if (lat) setMapLat(lat);
  };

  const handleLokasi = () => {
    if (!navigator.geolocation) {
      setErrorLokasi('Browser tidak mendukung fitur lokasi.');
      return;
    }
    setLoadingLokasi(true);
    setErrorLokasi(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosisiUser({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          akurasi: position.coords.accuracy,
        });
        setLoadingLokasi(false);
      },
      (err) => {
        setLoadingLokasi(false);
        switch (err.code) {
          case err.PERMISSION_DENIED: setErrorLokasi('Izin lokasi ditolak.'); break;
          case err.POSITION_UNAVAILABLE: setErrorLokasi('Lokasi tidak tersedia.'); break;
          case err.TIMEOUT: setErrorLokasi('Timeout. Coba lagi.'); break;
          default: setErrorLokasi('Gagal mendapatkan lokasi.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };



  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-white">

{showMapHint && (
  <div
    className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[1000]
      bg-black/75 text-white text-[11px] px-3 py-2 rounded-xl
      flex items-center gap-2 cursor-pointer whitespace-nowrap
      animate-bounce"
    onClick={() => setShowMapHint(false)}
  >
    <span>📍</span>
    <span>Klik marker untuk melihat info potensi</span>
    <X size={11} />
  </div>
)}

      {/* ── HEADER — animasi slide up saat fullscreen ── */}
      <div
        className="flex-shrink-0 border-b-2 border-black bg-white overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isFullscreen ? '0px' : '80px',
          opacity: isFullscreen ? 0 : 1,
          borderBottomWidth: isFullscreen ? '0px' : '2px',
        }}
      >
        <div className="relative flex items-center justify-center px-6 py-2">
          <div className="flex flex-col items-center">
            <h1
              className="text-base font-medium text-black uppercase tracking-widest leading-tight text-center"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Peta Potensi Desa Jengglungharjo
            </h1>
            <p
              className="text-sm font-medium text-black uppercase tracking-wide text-center"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Kecamatan Tanggunggunung, Kabupaten Tulungagung
            </p>
            <p
              className="text-sm font-medium text-black uppercase tracking-wide text-center"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Provinsi Jawa Timur
            </p>
          </div>
          <div className="absolute right-10">
            <img
              src="/images/Logo Kab.png"
              alt="Logo"
              className="w-16 h-16 object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* KIRI: Peta — selalu flex-1 */}
        <div className="flex-1 h-full relative min-w-0">
          <MapWrapper
            onLihatDetail={setSelectedFasilitas}
            flyToTarget={flyToTarget}
            posisiUser={posisiUser}
            aktifFilter={aktifFilter}
            onZoomChange={handleZoomChange}
             isFullscreen={isFullscreen}  // ← tambah ini
          />
          <TombolFullscreen
            isFullscreen={isFullscreen}
            onToggle={() => setIsFullscreen((p) => !p)}
          />
          <TombolLokasi onLokasi={handleLokasi} loading={loadingLokasi} />

          {errorLokasi && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] bg-red-500 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorLokasi}</span>
              <button onClick={() => setErrorLokasi(null)} className="ml-2 font-bold">✕</button>
            </div>
          )}
        </div>

        {/* KANAN: Panel — animasi slide right saat fullscreen */}
        <div
          className="h-full flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out border-black"
          style={{
            width: isFullscreen ? '0px' : '33.333%',
            opacity: isFullscreen ? 0 : 1,
            borderLeftWidth: isFullscreen ? '0px' : '2px',
          }}
        >
          <div
            className="h-full transition-transform duration-300 ease-in-out"
            style={{
              width: '33.333vw',
              transform: isFullscreen ? 'translateX(100%)' : 'translateX(0)',
            }}
          >
            <PanelKanan
              onFasilitasClick={handleFasilitasClick}
              selectedId={selectedId}
              onFilterChange={setAktifFilter}
              mapZoom={mapZoom}
              mapLat={mapLat}
            />
          </div>
        </div>
      </div>

      {selectedFasilitas && (
        <ModalDetail
          fasilitas={selectedFasilitas}
          onClose={() => setSelectedFasilitas(null)}
        />
      )}
    </div>
  );
}