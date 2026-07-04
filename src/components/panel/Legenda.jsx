// src/components/panel/Legenda.jsx
'use client';

import { KATEGORI } from '@/data/fasilitas';

export default function Legenda({ aktifFilter, onToggleFilter }) {
  return (
    <div className="flex flex-col gap-1.5">
      {Object.values(KATEGORI).map((kat) => (
        <button
          key={kat.id}
          onClick={() => onToggleFilter(kat.id)}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
            aktifFilter.includes(kat.id)
              ? 'bg-gray-100 opacity-100'
              : 'opacity-40'
          }`}
        >
          {/* Dot warna */}
          <span
            className="w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 border-white shadow"
            style={{ backgroundColor: kat.warna }}
          />
          <span className="text-xs font-medium text-gray-700">
            {kat.label}
          </span>
        </button>
      ))}
    </div>
  );
}