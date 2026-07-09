// src/components/map/GarisBatas.jsx
'use client';

import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

export default function GarisBatas() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('/geojson/jengglungharjo.geojson')
      .then((res) => res.json())
      .then(setGeoData)
      .catch((err) => console.error('Gagal load GeoJSON:', err));
  }, []);

  if (!geoData) return null;

  return (
    <GeoJSON
      key="garis-batas"
      data={geoData}
      style={{
        color: '#FFFFFF',
        weight: 2.5,
        dashArray: '6 4',
        fillOpacity: 0,
        opacity: 0.9,
      }}
    />
  );
}