// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import MapWrapper from '@/components/map/MapWrapper';
import ModalDetail from '@/components/ui/ModalDetail';
import PanelKanan from '@/components/panel/PanelKanan';
import BottomSheet from '@/components/panel/BottomSheet';
import TombolFullscreen from '@/components/map/TombolFullscreen';
import TombolLokasi from '@/components/map/TombolLokasi';
import useIsMobile from '@/hooks/useIsMobile';

export default function Home() {
  const isMobile = useIsMobile();

  const [selectedFasilitas, setSelectedFasilitas] = useState(null);
  const [showMapHint, setShowMapHint] = useState(true);
  const [flyToTarget, setFlyToTarget] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadingLokasi, setLoadingLokasi] = useState(false);
  const [posisiUser, setPosisiUser] = useState(null);
  const [errorLokasi, setErrorLokasi] = useState(null);
  const [aktifFilter, setAktifFilter] = useState(null);
  const [mapZoom, setMapZoom] = useState(14);
  const [mapLat, setMapLat] = useState(-8.26);

  useEffect(() => {
    const timer = setTimeout(() => setShowMapHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleFasilitasClick = (fasilitas) => {
    setFlyToTarget(fasilitas);
    setSelectedId(fasilitas.id);
  };

  const handleZoomChange = (zoom, lat) => {
    setMapZoom(zoom);
    if (lat) setMapLat(lat);
  };

  const handleLokasi = () => {
    if (!navigator.geolocation) { setErrorLokasi('Browser tidak mendukung fitur lokasi.'); return; }
    setLoadingLokasi(true);
    setErrorLokasi(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosisiUser({ lat: pos.coords.latitude, lng: pos.coords.longitude, akurasi: pos.coords.accuracy });
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

      {/* ── HEADER ── */}
      <div
        className="flex-shrink-0 border-b-2 border-black bg-white overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isFullscreen ? '0px' : '180px',
          opacity: isFullscreen ? 0 : 1,
          borderBottomWidth: isFullscreen ? '0px' : '2px',
        }}
      >
        <div className="relative flex items-center justify-center px-4 py-4">
          <div className="flex flex-col items-center">
            <h1
              className="text-sm font-medium text-black uppercase tracking-widest leading-tight text-center"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Peta Potensi Desa Jengglungharjo
            </h1>
            {!isMobile && (
              <>
                <p className="text-xs font-medium text-black uppercase tracking-wide text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Kecamatan Tanggunggunung, Kabupaten Tulungagung
                </p>
                <p className="text-xs font-medium text-black uppercase tracking-wide text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Provinsi Jawa Timur
                </p>
              </>
            )}
          </div>
          <div className="absolute right-4">
            <img
              src="/images/Logo Kab.png"
              alt="Logo"
              className={`object-contain ${isMobile ? 'w-10 h-10' : 'w-16 h-16'}`}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">

        {/* PETA */}
        <div className="flex-1 h-full relative min-w-0">
<MapWrapper
  onLihatDetail={setSelectedFasilitas}
  flyToTarget={flyToTarget}
  posisiUser={posisiUser}
  aktifFilter={aktifFilter}
  onZoomChange={handleZoomChange}
  isFullscreen={isFullscreen}
  isMobile={isMobile}
/>

          {/* Tombol GPS + Fullscreen */}
          <TombolFullscreen
            isFullscreen={isFullscreen}
            onToggle={() => setIsFullscreen((p) => !p)}
          />
          <TombolLokasi onLokasi={handleLokasi} loading={loadingLokasi} />

          {/* Hint tooltip */}
          {showMapHint && (
            <div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[1000]
                bg-black/75 text-white text-[11px] px-3 py-2 rounded-xl
                flex items-center gap-2 cursor-pointer whitespace-nowrap animate-bounce"
              onClick={() => setShowMapHint(false)}
            >
              <span>📍</span>
              <span>Klik marker untuk melihat info potensi</span>
              <X size={11} />
            </div>
          )}

          {errorLokasi && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[1000] bg-red-500 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorLokasi}</span>
              <button onClick={() => setErrorLokasi(null)} className="ml-2 font-bold">✕</button>
            </div>
          )}
        </div>

        {/* DESKTOP: Panel Kanan */}
        {!isMobile && (
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
        )}

{isMobile && (
  <BottomSheet
    onFasilitasClick={handleFasilitasClick}
    selectedId={selectedId}
    onFilterChange={setAktifFilter}
    isFullscreen={isFullscreen}
    mapZoom={mapZoom}
    mapLat={mapLat}
  />
)}

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