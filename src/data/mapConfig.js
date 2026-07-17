// src/data/mapConfig.js
export const MAP_CONFIG = {
  center: [-8.262, 111.911],
  defaultZoom: 14,
  minZoom: 13,
  maxZoom: 18,        // ← turunin dari 19 → 17

  tileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  tileAttribution: 'Tiles © Esri',
  labelUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',

  maxBounds: [
    [-8.35, 111.84],
    [-8.18, 111.98],
  ],
  maxBoundsViscosity: 0.8,
};