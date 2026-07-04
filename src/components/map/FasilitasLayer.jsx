// src/components/map/FasilitasLayer.jsx
'use client';

import FasilitasMarker from './FasilitasMarker';
import { fasilitas } from '@/data/fasilitas';

export default function FasilitasLayer({ onLihatDetail, aktifFilter }) {
  const filtered = aktifFilter
    ? fasilitas.filter((f) => aktifFilter.includes(f.kategori))
    : fasilitas;

  return (
    <>
      {filtered.map((item) => (
        <FasilitasMarker
          key={item.id}
          fasilitas={item}
          onLihatDetail={onLihatDetail}
        />
      ))}
    </>
  );
}