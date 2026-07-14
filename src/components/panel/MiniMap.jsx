// src/components/panel/MiniMap.jsx
'use client';

import dynamic from 'next/dynamic';

const MiniMapInner = dynamic(() => import('./MiniMapInner'), { ssr: false });

export default function MiniMap() {
  return (
    <div className="w-full h-full">
      <MiniMapInner />
    </div>
  );
}