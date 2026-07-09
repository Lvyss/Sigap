// src/data/mapConfig.js

export const MAP_CONFIG = {
  center: [-8.2390636,111.8936623],
  defaultZoom: 15,
  minZoom: 13,
  maxZoom: 18,

  // Satelit Esri — gratis, no API key, Google Earth look
  tileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  tileAttribution: 'Tiles © Esri — Esri, DigitalGlobe, GeoEye, i-cubed, USDA FSA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo',

  // Label jalan di atas satelit (opsional tapi bagus)
  labelUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
};