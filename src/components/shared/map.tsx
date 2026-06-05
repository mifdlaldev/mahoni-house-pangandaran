'use client';

import { useEffect, useRef } from 'react';

type MapProps = {
  lat: number;
  lng: number;
  label: string;
};

export function Map({ lat, lng, label }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');
      if (!mounted || !containerRef.current) return;

      const map = L.map(containerRef.current).setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);

      const icon = L.divIcon({
        className: 'custom-marker',
        html: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#1f4a3a" stroke="#faf6ef" stroke-width="1.5"><path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/></svg>',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      L.marker([lat, lng], { icon }).addTo(map).bindPopup(label);
      mapRef.current = map;
    })();

    return () => {
      mounted = false;
      if (mapRef.current) mapRef.current.remove();
    };
  }, [lat, lng, label]);

  return (
    <div
      ref={containerRef}
      className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-wood-100"
    />
  );
}
