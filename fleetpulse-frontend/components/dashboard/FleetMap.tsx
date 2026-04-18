// "use client";

// import { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

// export default function FleetMap() {
//   const mapContainer = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!mapContainer.current) return;

//     const map = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/dark-v11",
//       center: [78.4867, 17.385], // Hyderabad
//       zoom: 10,
//     });

//     // 🚗 Dummy Vehicles
//     const vehicles = [
//       { id: 1, lng: 78.48, lat: 17.38 },
//       { id: 2, lng: 78.50, lat: 17.40 },
//       { id: 3, lng: 78.47, lat: 17.36 },
//     ];

//     vehicles.forEach((v) => {
//       new mapboxgl.Marker({ color: "red" })
//         .setLngLat([v.lng, v.lat])
//         .addTo(map);
//     });

//     return () => map.remove();
//   }, []);

//   return <div ref={mapContainer} className="w-full h-64 rounded-xl" />;
// }

"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function FleetMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [78.4867, 17.385],
      zoom: 11,
    });

    // 🚗 Initial vehicle positions
    let vehicles = [
      { id: 1, lng: 78.48, lat: 17.38 },
      { id: 2, lng: 78.50, lat: 17.40 },
      { id: 3, lng: 78.47, lat: 17.36 },
    ];

    // 🧩 Create markers
    markersRef.current = vehicles.map((v) => {
      return new mapboxgl.Marker({ color: "red" })
        .setLngLat([v.lng, v.lat])
        .addTo(map);
    });

    // 🔥 SIMULATE REAL-TIME MOVEMENT
    const interval = setInterval(() => {
      vehicles = vehicles.map((v) => ({
        ...v,
        lng: v.lng + (Math.random() - 0.5) * 0.01,
        lat: v.lat + (Math.random() - 0.5) * 0.01,
      }));

      vehicles.forEach((v, index) => {
        markersRef.current[index].setLngLat([v.lng, v.lat]);
      });
    }, 2000); // update every 2 seconds

    return () => {
      clearInterval(interval);
      map.remove();
    };
  }, []);

  return <div ref={mapContainer} className="w-full h-64 rounded-xl" />;
}