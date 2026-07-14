// src/lib/useMapScale.js
'use client';

import { useState, useEffect } from 'react';

// Hitung skala berdasarkan zoom level dan latitude
export function getScaleFromZoom(zoom, lat = -8.26) {
  // Resolusi pixel per meter di latitude tertentu
  const earthCircumference = 40075016.686;
  const latRad = (lat * Math.PI) / 180;
  const metersPerPixel =
    (earthCircumference * Math.cos(latRad)) / Math.pow(2, zoom + 8);

  // Asumsi 96 DPI → 1 pixel = 0.2646mm
  const mmPerPixel = 25.4 / 96;
  const scale = metersPerPixel / (mmPerPixel / 1000);

  return Math.round(scale);
}

// Hitung panjang bar skala yang "bagus" (round number)
export function getScaleBar(zoom, lat = -8.26, barWidthPx = 96) {
  const earthCircumference = 40075016.686;
  const latRad = (lat * Math.PI) / 180;
  const metersPerPixel =
    (earthCircumference * Math.cos(latRad)) / Math.pow(2, zoom + 8);

  const totalMeters = metersPerPixel * barWidthPx;

  // Pilih angka "bersih" terdekat
  const niceNumbers = [
    0.01, 0.025, 0.05, 0.1, 0.25, 0.5,
    1, 2, 5, 10, 25, 50, 100, 200, 250,
    500, 1000, 2000, 5000, 10000,
  ];
  const totalKm = totalMeters / 1000;
  let niceKm = niceNumbers.find((n) => n >= totalKm / 2) || totalKm;

  // Konversi ke pixel
  const niceMeters = niceKm * 1000;
  const nicePx = niceMeters / metersPerPixel;

  // Format label
  const label = niceKm >= 1
    ? `${niceKm} km`
    : `${niceMeters} m`;

  const midLabel = niceKm >= 1
    ? `${niceKm / 2} km`
    : `${niceMeters / 2} m`;

  return { nicePx, label, midLabel, niceKm, niceMeters };
}