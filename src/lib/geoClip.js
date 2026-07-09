// src/lib/geoClip.js
// Helper: cek apakah titik [lng, lat] ada di dalam polygon
function pointInPolygon(point, polygon) {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Clip LineString — hanya simpan titik yang ada di dalam polygon
export function clipLineToPolygon(lineCoords, polygonRing) {
  return lineCoords.filter((point) => pointInPolygon(point, polygonRing));
}

// Proses seluruh FeatureCollection
export function clipFeaturesToPolygon(geojson, polygonRing) {
  const clippedFeatures = [];

  geojson.features.forEach((f) => {
    try {
      if (f.geometry.type === 'LineString') {
        const clipped = clipLineToPolygon(f.geometry.coordinates, polygonRing);
        if (clipped.length >= 2) {
          clippedFeatures.push({
            ...f,
            geometry: { type: 'LineString', coordinates: clipped },
          });
        }
      } else if (f.geometry.type === 'MultiLineString') {
        const clippedLines = f.geometry.coordinates
          .map((line) => clipLineToPolygon(line, polygonRing))
          .filter((line) => line.length >= 2);
        if (clippedLines.length > 0) {
          clippedFeatures.push({
            ...f,
            geometry: { type: 'MultiLineString', coordinates: clippedLines },
          });
        }
      }
    } catch { /* skip */ }
  });

  return { type: 'FeatureCollection', features: clippedFeatures };
}

// Ambil polygon ring dari GeoJSON batas desa (support LineString & Polygon)
export function getRingFromBatas(batas) {
  const feature = batas.type === 'FeatureCollection'
    ? batas.features[0] : batas;
  const geom = feature.geometry;

  if (geom.type === 'Polygon') {
    return geom.coordinates[0];
  } else if (geom.type === 'LineString') {
    const coords = geom.coordinates;
    const first = coords[0];
    const last = coords[coords.length - 1];
    return (first[0] !== last[0] || first[1] !== last[1])
      ? [...coords, first]
      : coords;
  }
  return null;
}