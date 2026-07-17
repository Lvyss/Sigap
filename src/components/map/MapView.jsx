// src/components/map/MapView.jsx
'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { MAP_CONFIG } from '@/data/mapConfig';
import FasilitasLayer from './FasilitasLayer';
import FlyToHandler from './FlyToHandler';
import LokasiMarker from './LokasiMarker';
import DesaMask from './DesaMask';
import GarisBatas from './GarisBatas';
import LapisanJalan from './LapisanJalan';
import LapisanSungai from './LapisanSungai';
import ZoomWatcher from './ZoomWatcher';
import MapResizer from './MapResizer';

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

function SetInitialView() {
  const map = useMap();
  useEffect(() => {
    map.setView(MAP_CONFIG.center, MAP_CONFIG.defaultZoom);
  }, [map]);
  return null;
}

export default function MapView({ onLihatDetail, flyToTarget, posisiUser, aktifFilter, onZoomChange, isFullscreen }) {
  return (
    <MapContainer
      center={MAP_CONFIG.center}
      zoom={MAP_CONFIG.defaultZoom}
      minZoom={MAP_CONFIG.minZoom}
      maxZoom={MAP_CONFIG.maxZoom}
      maxBounds={MAP_CONFIG.maxBounds}
      maxBoundsViscosity={MAP_CONFIG.maxBoundsViscosity}
      className="w-full h-full"
      zoomControl={true}
    >
      <TileLayer url={MAP_CONFIG.tileUrl} attribution={MAP_CONFIG.tileAttribution} />
      <TileLayer url={MAP_CONFIG.labelUrl} opacity={0.8} />
      <SetInitialView />
      <DesaMask />
      <LapisanSungai />
      <LapisanJalan />
      <GarisBatas />
      <FasilitasLayer onLihatDetail={onLihatDetail} aktifFilter={aktifFilter} />
      <FlyToHandler target={flyToTarget} />
      <LokasiMarker posisi={posisiUser} />
      <MapResizer isFullscreen={isFullscreen} />
      <ZoomWatcher onZoomChange={onZoomChange} />
    </MapContainer>
  );
}