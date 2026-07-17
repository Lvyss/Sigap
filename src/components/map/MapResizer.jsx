// src/components/map/MapResizer.jsx
'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapResizer({ isFullscreen }) {
  const map = useMap();

  useEffect(() => {
    // Tunggu animasi CSS selesai (300ms) baru invalidate
    const timer = setTimeout(() => {
      map.invalidateSize({ animate: false });
    }, 320);

    return () => clearTimeout(timer);
  }, [isFullscreen, map]);

  return null;
}