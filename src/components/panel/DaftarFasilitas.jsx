// src/components/panel/DaftarFasilitas.jsx
'use client';

import { KATEGORI, getFasilitasByKategori, getKategoriTerpakai } from '@/data/fasilitas';
import { MapPin, SearchX } from 'lucide-react';

export default function DaftarFasilitas({
  aktifFilter,
  onFasilitasClick,
  selectedId,
  searchQuery,
}) {
  const kategoriTerpakai = getKategoriTerpakai();

  // Filter kategori aktif
  const kategoriFiltered = kategoriTerpakai.filter((k) =>
    aktifFilter.includes(k.id)
  );

  // Filter + search per kategori
  const hasil = kategoriFiltered
    .map((kat) => {
      const items = getFasilitasByKategori(kat.id).filter((item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.infoSingkat.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { kat, items };
    })
    .filter(({ items }) => items.length > 0);

  // Empty state — tidak ada hasil
  if (hasil.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
        {searchQuery ? (
          <>
            <SearchX size={32} />
            <p className="text-sm text-center">
              Tidak ada hasil untuk<br />
              <span className="font-semibold text-gray-500">"{searchQuery}"</span>
            </p>
            <p className="text-xs text-gray-300">Coba kata kunci lain</p>
          </>
        ) : (
          <>
            <MapPin size={32} />
            <p className="text-sm text-center">
              Tidak ada kategori aktif.<br />Pilih minimal satu kategori.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {hasil.map(({ kat, items }) => (
        <div key={kat.id}>
          {/* Header kategori */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg mb-1.5"
            style={{ backgroundColor: `${kat.warna}18` }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: kat.warna }}
            />
            <span
              className="text-xs font-bold uppercase tracking-wide"
              style={{ color: kat.warna }}
            >
              {kat.label}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              {items.length}
            </span>
          </div>

          {/* List item */}
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onFasilitasClick(item)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all hover:scale-[1.01] ${
                  selectedId === item.id
                    ? 'shadow-md border'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                style={
                  selectedId === item.id
                    ? {
                        backgroundColor: `${kat.warna}12`,
                        borderColor: `${kat.warna}40`,
                      }
                    : {}
                }
              >
                <MapPin
                  size={14}
                  className="flex-shrink-0"
                  style={{ color: kat.warna }}
                />
                <div className="flex flex-col min-w-0">
                  {/* Highlight teks hasil search */}
                  <span className="text-xs font-semibold text-gray-800 truncate">
                    <HighlightText
                      text={item.nama}
                      query={searchQuery}
                      warna={kat.warna}
                    />
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {item.infoSingkat}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Sub-komponen highlight teks
function HighlightText({ text, query, warna }) {
  if (!query) return <>{text}</>;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            style={{ backgroundColor: `${warna}30`, color: 'inherit' }}
            className="rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}