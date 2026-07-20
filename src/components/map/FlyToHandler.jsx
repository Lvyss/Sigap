// src/components/map/FlyToHandler.jsx
'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function FlyToHandler({ target, isMobile }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;

    map.closePopup();

    setTimeout(() => {
      map.flyTo(target.koordinat, 17, {
        animate: true,
        duration: 1.0,
      });

      // Setelah flyTo selesai, pan ke atas
      if (isMobile) {
        map.once('moveend', () => {
          // Pan ke atas sebesar setengah tinggi bottom sheet
          // angka negatif = naik, positif = turun
          map.panBy([0, 180], { animate: true, duration: 0.3 });
        });
      }
    }, 50);

  }, [target, map, isMobile]);

  return null;
}