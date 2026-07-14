// src/components/panel/SkalaBar.jsx
'use client';

import { useState, useEffect } from 'react';
import { getScaleFromZoom, getScaleBar } from '@/lib/useMapScale';

export default function SkalaBar({ zoom, lat }) {
  const [scaleData, setScaleData] = useState(null);

  useEffect(() => {
    if (zoom === undefined || zoom === null) return;
    const scale = getScaleFromZoom(zoom, lat);
    const bar = getScaleBar(zoom, lat, 96);
    setScaleData({ scale, bar });
  }, [zoom, lat]);

  if (!scaleData) return null;

  const { scale, bar } = scaleData;

  // Format skala — bulatkan ke angka bagus
  const formatSkala = (s) => {
    if (s >= 1000000) return `1 : ${(s / 1000000).toFixed(1)}jt`;
    if (s >= 1000) return `1 : ${Math.round(s / 1000) * 1000}`;
    return `1 : ${s}`;
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Label skala */}
      <p
        className="text-[9px] font-bold text-black uppercase"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        SKALA : {formatSkala(scale)}
      </p>

      {/* Bar skala hitam putih */}
      <div className="flex flex-col gap-0.5">
        <div className="flex" style={{ width: `${bar.nicePx}px` }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-2.5 border border-black"
              style={{
                width: `${bar.nicePx / 4}px`,
                backgroundColor: i % 2 === 0 ? '#000' : '#fff',
              }}
            />
          ))}
        </div>

        {/* Label angka di bawah bar */}
        <div
          className="flex justify-between"
          style={{ width: `${bar.nicePx}px` }}
        >
          <span className="text-[8px] text-black">0</span>
          <span className="text-[8px] text-black">{bar.midLabel}</span>
          <span className="text-[8px] text-black">{bar.label}</span>
        </div>
      </div>

      {/* Info koordinat */}
      <div className="flex flex-col gap-0 mt-0.5">
        <p className="text-[8px] text-black">Coordinate System : GCS WGS 1984</p>
        <p className="text-[8px] text-black">Datum : 1984</p>
        <p className="text-[8px] text-black">Units : Degree</p>
      </div>
    </div>
  );
}