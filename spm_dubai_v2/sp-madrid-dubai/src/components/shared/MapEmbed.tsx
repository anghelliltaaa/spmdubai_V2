'use client';

import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import type maplibregl from 'maplibre-gl';

const LAT = 25.1996246;
const LON = 55.2692880;

// ESRI hybrid: satellite imagery + reference labels (street/area names) — no API key
const HYBRID_STYLE = {
  version: 8 as const,
  sources: {
    satellite: {
      type: 'raster' as const,
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      attribution: '© Esri, Maxar, Earthstar Geographics',
    },
    labels: {
      type: 'raster' as const,
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
    },
  },
  layers: [
    { id: 'satellite', type: 'raster' as const, source: 'satellite' },
    // desaturate + brighten the beige label tiles so text reads as white on satellite
    { id: 'labels', type: 'raster' as const, source: 'labels', paint: { 'raster-saturation': -1, 'raster-brightness-min': 0.75, 'raster-brightness-max': 1.0, 'raster-contrast': 0.6 } },
  ],
};

export function MapEmbed({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    // `cancelled` guards against async import resolving after cleanup (StrictMode double-invoke)
    let cancelled = false;
    mapRef.current?.remove();
    mapRef.current = null;

    import('maplibre-gl').then(({ default: maplibreglLib }) => {
      if (cancelled || !containerRef.current) return;
      const map = new maplibreglLib.Map({
        container: containerRef.current!,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style: HYBRID_STYLE as any,
        center: [LON, LAT],
        zoom: 12,
        pitch: 30,
        bearing: -10,
        attributionControl: false,
      });

      mapRef.current = map;

      map.addControl(new maplibreglLib.NavigationControl({ showCompass: false }), 'top-right');

      map.on('load', () => {
        if (cancelled) return;

        // Wrapper: pin + inline label — no white popup box
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;cursor:default';

        // Gold diamond pin
        const pin = document.createElement('div');
        pin.style.cssText = `
          width: 16px; height: 16px;
          background: #C9A84C;
          border: 2px solid #fff;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.55);
          flex-shrink: 0;
        `;

        // Transparent inline label — readable on any background via text-shadow
        const label = document.createElement('div');
        label.style.cssText = `
          font-family: sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          pointer-events: none;
          text-shadow:
            0 0 4px rgba(0,0,0,0.9),
            0 1px 6px rgba(0,0,0,0.8),
            0 2px 12px rgba(0,0,0,0.6);
          letter-spacing: 0.03em;
        `;
        label.textContent = 'Aspin Commercial Tower';

        wrapper.appendChild(pin);
        wrapper.appendChild(label);

        new maplibreglLib.Marker({ element: wrapper, anchor: 'top' })
          .setLngLat([LON, LAT])
          .addTo(map);

        // Persistent popup — closeOnClick/closeButton both false so it never dismisses
        new maplibreglLib.Popup({
          offset: [0, 8],
          closeButton: false,
          closeOnClick: false,
          className: 'aspin-popup',
        })
          .setLngLat([LON, LAT])
          .setHTML(`
            <div style="font-family:sans-serif;font-size:11px;line-height:1.5;padding:2px 4px;color:#111">
              <strong style="font-size:12px;display:block;margin-bottom:1px">Aspin Commercial Tower</strong>
              104, Sheikh Zayed Road, DIFC, Dubai
            </div>
          `)
          .addTo(map);
      });
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />
  );
}
