// src/components/map/LapisanSungai.jsx
"use client";

import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { clipFeaturesToPolygon, getRingFromBatas } from "@/lib/geoClip";

export default function LapisanSungai() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/geojson/sungai.geojson").then((r) => r.json()),
      fetch("/geojson/jengglungharjo.geojson").then((r) => r.json()),
    ])
      .then(([sungai, batas]) => {
        const ring = getRingFromBatas(batas);
        if (!ring) {
          setData(sungai);
          return;
        }
        setData(clipFeaturesToPolygon(sungai, ring));
      })
      .catch((e) => console.error("Gagal load sungai:", e));
  }, []);

  if (!data) return null;

  return (
    <GeoJSON
      key="sungai"
      data={data}
      style={(feature) => {
        const waterway = feature?.properties?.waterway;
        if (waterway === "river") {
          return {
            color: "#60A5FA",
            weight: 2.5,
            opacity: 0.8,
            fillOpacity: 0,
          };
        } else if (waterway === "stream") {
          return {
            color: "#93C5FD",
            weight: 1.5,
            opacity: 0.6,
            fillOpacity: 0,
          };
        } else {
          return { color: "#BFDBFE", weight: 1, opacity: 0.7, fillOpacity: 0 };
        }
      }}
    />
  );
}
