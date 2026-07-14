// src/components/map/DesaMask.jsx
'use client';

import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

const WORLD_BOUNDS = [
  [-180, -90],
  [-180, 90],
  [180, 90],
  [180, -90],
  [-180, -90],
];

export default function DesaMask() {
  const [maskData, setMaskData] = useState(null);

  useEffect(() => {
    fetch('/geojson/jengglungharjo.geojson')
      .then((res) => res.json())
      .then((data) => {
        let desaCoords;

        try {
          const feature = data.type === 'FeatureCollection'
            ? data.features[0]
            : data;

          const geom = feature.geometry || feature;

          if (geom.type === 'Polygon') {
            desaCoords = geom.coordinates[0];
          } else if (geom.type === 'MultiPolygon') {
            desaCoords = geom.coordinates[0][0];
          } else if (geom.type === 'LineString') {
            // ← Fix utama: pakai koordinat LineString langsung sebagai ring polygon
            desaCoords = geom.coordinates;
            // Pastikan ring tertutup (titik pertama = titik terakhir)
            const first = desaCoords[0];
            const last = desaCoords[desaCoords.length - 1];
            if (first[0] !== last[0] || first[1] !== last[1]) {
              desaCoords = [...desaCoords, first];
            }
          }

          if (!desaCoords || desaCoords.length === 0) {
            console.error('Koordinat tidak ditemukan');
            return;
          }

          setMaskData({
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [WORLD_BOUNDS, desaCoords],
            },
          });

        } catch (e) {
          console.error('Error parsing GeoJSON:', e);
        }
      })
      .catch((err) => console.error('Gagal load GeoJSON:', err));
  }, []);

  if (!maskData) return null;

  return (
    <GeoJSON
      key="desa-mask"
      data={maskData}
      style={{
        fillColor: '#ffffff',
        fillOpacity: 0.5,
        color: 'transparent',
        weight: 0,
      }}
    />
  );
}