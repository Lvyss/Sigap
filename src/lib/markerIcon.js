// src/lib/markerIcon.js
import L from 'leaflet';

export function createMarkerIcon(warna) {
  return L.divIcon({
    className: '',
    html: `
      <div style="position: relative; width: 28px; height: 28px; cursor: pointer;">
        <!-- Pulse ring -->
        <div style="
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 28px; height: 28px;
          border-radius: 50%;
          background-color: ${warna};
          opacity: 0.3;
          animation: sigap-pulse 2s ease-out infinite;
        "></div>
        <!-- Marker pin -->
        <div style="
          position: absolute;
          width: 24px; height: 24px;
          background-color: ${warna};
          border: 2.5px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          top: 0; left: 2px;
          transition: transform 0.15s ease;
        "></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });
}