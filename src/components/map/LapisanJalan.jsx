// src/components/map/LapisanJalan.jsx
'use client';

import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { clipFeaturesToPolygon, getRingFromBatas } from '@/lib/geoClip';

export default function LapisanJalan() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/geojson/jalan.geojson').then((r) => r.json()),
      fetch('/geojson/jengglungharjo.geojson').then((r) => r.json()),
    ]).then(([jalan, batas]) => {
      const ring = getRingFromBatas(batas);
      if (!ring) { setData(jalan); return; }
      setData(clipFeaturesToPolygon(jalan, ring));
    }).catch((e) => console.error('Gagal load jalan:', e));
  }, []);

  if (!data) return null;

  return (
    <GeoJSON
      key="jalan"
      data={data}
style={(feature) => {
  const highway = feature?.properties?.highway;
  if (highway === 'primary' || highway === 'secondary') {
    return { color: '#f03da3', weight: 1.5, opacity: 0.9, fillOpacity: 0 }; // merah tebal
  } else if (highway === 'tertiary' || highway === 'residential') {
    return { color: '#f03da3', weight: 1.5, opacity: 0.6, fillOpacity: 0 }; // merah tipis
  } else {
    return { color: '#f03da3', weight: 2.5, opacity: 0.8, fillOpacity: 0 };   // merah tipis banget
  }
}}
    />
  );
}