// src/components/panel/PanelKanan.jsx
'use client';

import { useState, useEffect } from 'react';
import Legenda from './Legenda';
import DaftarFasilitas from './DaftarFasilitas';
import SearchBar from './SearchBar';
import { KATEGORI } from '@/data/fasilitas';
import { Map, List } from 'lucide-react';

const SEMUA_KATEGORI = Object.values(KATEGORI).map((k) => k.id);

export default function PanelKanan({ onFasilitasClick, selectedId, onFilterChange }) {
  const [aktifFilter, setAktifFilter] = useState(SEMUA_KATEGORI);
  const [tab, setTab] = useState('fasilitas');
  const [searchQuery, setSearchQuery] = useState('');

  // ← Notify parent setiap aktifFilter berubah, bukan saat render
  useEffect(() => {
    onFilterChange?.(aktifFilter);
  }, [aktifFilter]);

  const toggleFilter = (kategoriId) => {
    setAktifFilter((prev) =>
      prev.includes(kategoriId)
        ? prev.filter((id) => id !== kategoriId)
        : [...prev, kategoriId]
    );
  };

  const handleReset = () => {
    setAktifFilter(SEMUA_KATEGORI);
  };

  const handleSearch = (val) => {
    setSearchQuery(val);
    if (val && tab !== 'fasilitas') setTab('fasilitas');
  };

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col">

      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-lg">🗺️</span>
          <h1 className="text-base font-bold text-gray-800">Desa Sidomukti</h1>
        </div>
        <p className="text-xs text-gray-400">Kec. Bener, Kab. Purworejo, Jawa Tengah</p>
        <p className="text-xs text-gray-300 mt-0.5">SIGAP — Sistem Informasi Geografis</p>
        <div className="mt-3">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
      </div>

      {/* Tab Switch */}
      <div className="flex border-b border-gray-100 px-3 pt-2">
        <button
          onClick={() => setTab('fasilitas')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
            tab === 'fasilitas'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <List size={13} />
          Fasilitas
        </button>
        <button
          onClick={() => setTab('legenda')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
            tab === 'legenda'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Map size={13} />
          Legenda
        </button>

        {searchQuery && (
          <div className="ml-auto flex items-center">
            <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
              {searchQuery}
            </span>
          </div>
        )}
      </div>

      {/* Konten Tab */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {tab === 'fasilitas' ? (
          <DaftarFasilitas
            aktifFilter={aktifFilter}
            onFasilitasClick={onFasilitasClick}
            selectedId={selectedId}
            searchQuery={searchQuery}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 px-1 mb-1">
              Tap kategori untuk tampilkan/sembunyikan marker
            </p>
            <Legenda
              aktifFilter={aktifFilter}
              onToggleFilter={toggleFilter}
            />
            <button
              onClick={handleReset}
              className="mt-2 w-full py-2 rounded-xl text-xs font-semibold text-green-600 bg-green-50 hover:bg-green-100 transition-colors"
            >
              Tampilkan Semua
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-300 text-center">
          KKN Universitas • Desa Sidomukti 2026
        </p>
      </div>

    </div>
  );
}