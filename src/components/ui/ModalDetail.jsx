// src/components/ui/ModalDetail.jsx
'use client';

import { useEffect, useState } from 'react';
import { KATEGORI } from '@/data/fasilitas';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

export default function ModalDetail({ fasilitas, onClose }) {
  const [fotoIndex, setFotoIndex] = useState(0);

  // Reset foto index tiap buka modal baru
  useEffect(() => {
    setFotoIndex(0);
  }, [fasilitas]);

  // Tutup modal dengan tombol ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!fasilitas) return null;

  const kategoriData = Object.values(KATEGORI).find(
    (k) => k.id === fasilitas.kategori
  );

  const hasFoto = fasilitas.foto && fasilitas.foto.length > 0;
  const totalFoto = hasFoto ? fasilitas.foto.length : 0;

  const prevFoto = () =>
    setFotoIndex((i) => (i - 1 + totalFoto) % totalFoto);
  const nextFoto = () =>
    setFotoIndex((i) => (i + 1) % totalFoto);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Box */}
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ backgroundColor: kategoriData?.warna || '#6B7280' }}
          >
            <div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wide">
                {kategoriData?.label || 'Fasilitas'}
              </p>
              <h2 className="text-white font-bold text-base leading-tight mt-0.5">
                {fasilitas.nama}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors ml-3 flex-shrink-0"
            >
              <X size={22} />
            </button>
          </div>

          {/* Galeri Foto */}
          <div className="relative w-full h-52 bg-gray-100 flex-shrink-0">
            {hasFoto ? (
              <>
                <img
                  src={fasilitas.foto[fotoIndex]}
                  alt={`${fasilitas.nama} - foto ${fotoIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Navigasi foto */}
                {totalFoto > 1 && (
                  <>
                    <button
                      onClick={prevFoto}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextFoto}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>

                    {/* Dot indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {fasilitas.foto.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setFotoIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === fotoIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Badge jumlah foto */}
                {totalFoto > 1 && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    {fotoIndex + 1} / {totalFoto}
                  </div>
                )}
              </>
            ) : (
              // Placeholder kalau belum ada foto
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                <ImageOff size={36} />
                <p className="text-sm">Foto belum tersedia</p>
              </div>
            )}
          </div>

          {/* Konten Detail */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

            {/* Deskripsi */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Deskripsi
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {fasilitas.deskripsi}
              </p>
            </div>

            {/* Info Tambahan */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Informasi
              </h3>
              <div className="flex flex-col gap-2">
                <InfoRow label="Kategori" value={kategoriData?.label || '-'} warna={kategoriData?.warna} />
                <InfoRow label="Koordinat" value={`${fasilitas.koordinat[0]}, ${fasilitas.koordinat[1]}`} />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100">
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
    </>
  );
}

// Sub-komponen baris info
function InfoRow({ label, value, warna }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
      <span className="text-xs text-gray-500">{label}</span>
      <span
        className="text-xs font-semibold"
        style={{ color: warna || '#374151' }}
      >
        {value}
      </span>
    </div>
  );
}