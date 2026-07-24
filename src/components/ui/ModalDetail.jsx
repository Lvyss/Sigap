'use client';

import { useEffect, useState } from 'react';
import { KATEGORI } from '@/data/fasilitas';
import { X, ChevronLeft, ChevronRight, ImageOff, Maximize2, Minimize2 } from 'lucide-react';

export default function ModalDetail({ fasilitas, onClose }) {
  const [fotoIndex, setFotoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => { setFotoIndex(0); }, [fasilitas]);

  // Kumpulkan SEMUA foto (fleksibel)
  const fotos = Object.keys(fasilitas || {})
    .filter(key => key.startsWith('foto') && fasilitas[key])
    .map(key => fasilitas[key]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowRight') setFotoIndex((i) => (i + 1) % fotos.length);
      if (e.key === 'ArrowLeft') setFotoIndex((i) => (i - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, fotos.length, isFullscreen]);

  if (!fasilitas) return null;

  const kategoriData = Object.values(KATEGORI).find(
    (k) => k.id === fasilitas.kategori
  );

  const hasFoto = fotos.length > 0;

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
      onClick={() => {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen ? 'max-w-4xl max-h-[95vh]' : ''
        }`}
        style={{ maxHeight: isFullscreen ? '95vh' : '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── HEADER ── */}
        <div
          className={`flex items-center justify-between px-5 py-3 flex-shrink-0 ${
            isFullscreen ? 'rounded-t-2xl' : ''
          }`}
          style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-[10px] uppercase tracking-widest">
              {kategoriData?.label || 'Potensi Desa'}
            </p>
            <h2 className="text-white font-bold text-sm leading-tight mt-0.5 truncate">
              {fasilitas.nama}
            </h2>
          </div>
          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
            {hasFoto && (
              <button
                onClick={toggleFullscreen}
                className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 size={16} className="text-white" />
                ) : (
                  <Maximize2 size={16} className="text-white" />
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* ── FOTO UTAMA ── */}
        <div className={`flex-shrink-0 ${isFullscreen ? 'flex-1' : ''}`}>
          {hasFoto ? (
            <>
              {/* Foto aktif */}
              <div 
                className={`relative w-full bg-gray-100 ${
                  isFullscreen ? 'h-[60vh]' : 'h-48'
                }`}
                onClick={toggleFullscreen}
              >
                <img
                  src={fotos[fotoIndex]}
                  alt={`${fasilitas.nama} ${fotoIndex + 1}`}
                  className={`w-full h-full object-contain cursor-pointer transition-all duration-300 ${
                    isFullscreen ? 'object-contain' : 'object-cover'
                  }`}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />

                {/* Tombol fullscreen di overlay */}
                {!isFullscreen && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  >
                    <Maximize2 size={16} />
                  </button>
                )}

                {/* Navigasi panah */}
                {fotos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFotoIndex((i) => (i - 1 + fotos.length) % fotos.length);
                      }}
                      className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors ${
                        isFullscreen ? 'p-3' : 'p-1.5'
                      }`}
                    >
                      <ChevronLeft size={isFullscreen ? 24 : 16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFotoIndex((i) => (i + 1) % fotos.length);
                      }}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors ${
                        isFullscreen ? 'p-3' : 'p-1.5'
                      }`}
                    >
                      <ChevronRight size={isFullscreen ? 24 : 16} />
                    </button>

                    {/* Counter */}
                    <div className={`absolute top-2 right-2 bg-black/50 text-white px-2 py-0.5 rounded-full ${
                      isFullscreen ? 'text-sm' : 'text-[10px]'
                    }`}>
                      {fotoIndex + 1} / {fotos.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail - dinamis sesuai jumlah foto */}
              {fotos.length > 1 && (
                <div className={`flex gap-1.5 px-3 py-2 bg-gray-50 overflow-x-auto ${
                  isFullscreen ? 'py-3' : ''
                }`}>
                  {fotos.map((foto, i) => (
                    <button
                      key={i}
                      onClick={() => setFotoIndex(i)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                        isFullscreen ? 'h-20 w-20' : 'h-14 w-14'
                      }`}
                      style={{
                        outline: i === fotoIndex ? `2px solid ${kategoriData?.warna}` : '2px solid transparent',
                        opacity: i === fotoIndex ? 1 : 0.5,
                      }}
                    >
                      <img
                        src={foto}
                        alt={`thumb ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-36 flex flex-col items-center justify-center bg-gray-50 gap-2 text-gray-400">
              <ImageOff size={28} />
              <p className="text-xs">Foto belum tersedia</p>
            </div>
          )}
        </div>

        {/* ── DESKRIPSI ── */}
        <div className={`flex-1 overflow-y-auto px-5 py-4 ${
          isFullscreen ? 'max-h-[30vh]' : ''
        }`}>
          <p className="text-sm text-gray-700 leading-relaxed">
            {fasilitas.deskripsi}
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0 flex gap-2">
          <button
            onClick={() => {
              const [lat, lng] = fasilitas.koordinat;
              const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
              window.open(url, '_blank');
            }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-gray-50 flex items-center justify-center gap-1.5"
            style={{
              borderColor: kategoriData?.warna || '#6B7280',
              color: kategoriData?.warna || '#6B7280',
            }}
          >
            Petunjuk Arah
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}