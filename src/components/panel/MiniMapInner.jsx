// src/components/panel/MiniMapInner.jsx
'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Rectangle, useMap } from 'react-leaflet';

const DESA_BOUNDS = [
  [-8.307597, 111.87972],
  [-8.21771, 111.943774],
];

const MINI_CENTER = [-8.262, 111.911];

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(DESA_BOUNDS, { padding: [20, 20] });
    map.zoomOut(2);
  }, [map]);
  return null;
}

export default function MiniMapInner() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="w-full h-full">
      <MapContainer
        key="minimap-container"
        center={MINI_CENTER}
        zoom={9}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        attributionControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <FitBounds />
        <Rectangle
          bounds={DESA_BOUNDS}
          pathOptions={{
            color: '#EF4444',
            weight: 2,
            fillColor: '#EF4444',
            fillOpacity: 0.15,
          }}
        />
      </MapContainer>
    </div>
  );
}