// src/components/map/FasilitasLayer.jsx
'use client';

import FasilitasMarker from './FasilitasMarker';
import { fasilitas } from '@/data/fasilitas';

export default function FasilitasLayer({ onLihatDetail }) {
  return (
    <>
      {fasilitas.map((item) => (
        <FasilitasMarker
          key={item.id}
          fasilitas={item}
          onLihatDetail={onLihatDetail}
        />
      ))}
    </>
  );
}