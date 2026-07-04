// src/components/map/TombolFullscreen.jsx
'use client';

import { Maximize2, Minimize2 } from 'lucide-react';

export default function TombolFullscreen({ isFullscreen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-3 right-3 z-[1000] bg-white hover:bg-gray-50 text-gray-700 rounded-xl p-2.5 shadow-lg border border-gray-200 transition-all hover:scale-105"
      title={isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
    >
      {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
    </button>
  );
}