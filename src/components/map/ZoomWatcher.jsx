// src/components/map/ZoomWatcher.jsx
'use client';

import { useMapEvents } from 'react-leaflet';

export default function ZoomWatcher({ onZoomChange }) {
  useMapEvents({
    zoomend: (e) => {
      onZoomChange(e.target.getZoom());
    },
    moveend: (e) => {
      const center = e.target.getCenter();
      onZoomChange(e.target.getZoom(), center.lat);
    },
  });
  return null;
}