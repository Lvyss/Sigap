// src/components/panel/DaftarFasilitas.jsx
'use client';

import { KATEGORI, getFasilitasByKategori, getKategoriTerpakai } from '@/data/fasilitas';
import { MapPin } from 'lucide-react';

export default function DaftarFasilitas({ aktifFilter, onFasilitasClick, selectedId }) {
  const kategoriTerpakai = getKategoriTerpakai();

  const kategoriFiltered = kategoriTerpakai.filter((k) =>
    aktifFilter.includes(k.id)
  );

  if (kategoriFiltered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
        <MapPin size={32} />
        <p className="text-sm text-center">Tidak ada kategori aktif.<br />Pilih minimal satu kategori.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {kategoriFiltered.map((kat) => {
        const items = getFasilitasByKategori(kat.id);
        return (
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
                    <span className="text-xs font-semibold text-gray-800 truncate">
                      {item.nama}
                    </span>
                    <span className="text-xs text-gray-400 truncate">
                      {item.infoSingkat}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}