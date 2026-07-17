// src/components/ui/ModalDetail.jsx
'use client';

import { useEffect, useState } from 'react';
import { KATEGORI } from '@/data/fasilitas';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

export default function ModalDetail({ fasilitas, onClose }) {
  const [fotoIndex, setFotoIndex] = useState(0);

  useEffect(() => { setFotoIndex(0); }, [fasilitas]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setFotoIndex((i) => (i + 1) % fotos.length);
      if (e.key === 'ArrowLeft') setFotoIndex((i) => (i - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!fasilitas) return null;

  const kategoriData = Object.values(KATEGORI).find(
    (k) => k.id === fasilitas.kategori
  );

  // Kumpulkan 3 foto
  const fotos = [fasilitas.foto1, fasilitas.foto2, fasilitas.foto3].filter(Boolean);
  const hasFoto = fotos.length > 0;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
        style={{ maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── HEADER ── */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
        >
          <div>
            <p className="text-white/70 text-[10px] uppercase tracking-widest">
              {kategoriData?.label || 'Potensi Desa'}
            </p>
            <h2 className="text-white font-bold text-sm leading-tight mt-0.5">
              {fasilitas.nama}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 ml-3 flex-shrink-0 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* ── FOTO UTAMA ── */}
        <div className="flex-shrink-0">
          {hasFoto ? (
            <>
              {/* Foto aktif */}
              <div className="relative w-full h-48 bg-gray-100">
                <img
                  src={fotos[fotoIndex]}
                  alt={`${fasilitas.nama} ${fotoIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />

                {/* Navigasi panah */}
                {fotos.length > 1 && (
                  <>
                    <button
                      onClick={() => setFotoIndex((i) => (i - 1 + fotos.length) % fotos.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setFotoIndex((i) => (i + 1) % fotos.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {fotoIndex + 1} / {fotos.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail 3 foto */}
              {fotos.length > 1 && (
                <div className="flex gap-1.5 px-3 py-2 bg-gray-50">
                  {fotos.map((foto, i) => (
                    <button
                      key={i}
                      onClick={() => setFotoIndex(i)}
                      className="flex-1 h-14 rounded-lg overflow-hidden transition-all"
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
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {fasilitas.deskripsi}
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}