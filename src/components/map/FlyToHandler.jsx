// src/components/map/FlyToHandler.jsx
'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function FlyToHandler({ target }) {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.flyTo(target.koordinat, 17, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [target, map]);

  return null;
}