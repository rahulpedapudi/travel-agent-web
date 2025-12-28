import { useRef, useState, useEffect } from "react";
import GlobeT, { type GlobeMethods } from "react-globe.gl";

// Reliable Textures
const EARTH_DAY =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg";

// Simplified City Database (50 major cities)
const CITIES_DB = [
  { name: "New York", lat: 40.7128, lng: -74.006, info: "The Big Apple" },
  { name: "London", lat: 51.5074, lng: -0.1278, info: "Capital of England" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, info: "Busy Metropolis" },
  { name: "Paris", lat: 48.8566, lng: 2.3522, info: "City of Love" },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, info: "Opera House" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, info: "Modern Luxury" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, info: "Lion City" },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, info: "Gateway of India" },
  {
    name: "Rio de Janeiro",
    lat: -22.9068,
    lng: -43.1729,
    info: "Christ the Redeemer",
  },
  { name: "Cairo", lat: 30.0444, lng: 31.2357, info: "Pyramids of Giza" },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, info: "Hollywood" },
  { name: "Moscow", lat: 55.7558, lng: 37.6173, info: "Red Square" },
  { name: "Rome", lat: 41.9028, lng: 12.4964, info: "The Eternal City" },
  {
    name: "Istanbul",
    lat: 41.0082,
    lng: 28.9784,
    info: "Meeting of Continents",
  },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018, info: "City of Angels" },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241, info: "Table Mountain" },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, info: "Golden Gate" },
];

export const Globe = () => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    info: string;
  } | null>(null);

  // Handle Resize using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const handleGlobeClick = ({ lat, lng }: { lat: number; lng: number }) => {
    // Find nearest city
    let bestCity = null;
    let minDist = Infinity;

    CITIES_DB.forEach((city) => {
      const dist = Math.sqrt(
        Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2)
      );
      if (dist < minDist) {
        minDist = dist;
        bestCity = city;
      }
    });

    // Threshold for "clicking on a city" (approx ~5-8 degrees)
    if (bestCity && minDist < 8) {
      // @ts-ignore
      const city = bestCity as (typeof CITIES_DB)[0];
      setSelectedPlace(city);

      // Fly to location
      globeEl.current?.pointOfView(
        { lat: city.lat, lng: city.lng, altitude: 1.8 },
        1500
      );
    } else {
      // Clicked in ocean/wilderness
      setSelectedPlace(null);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <GlobeT
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={EARTH_DAY}
        bumpImageUrl={EARTH_NORMAL}
        // Atmosphere
        atmosphereColor="#4fd1c5"
        atmosphereAltitude={0.15}
        // Lighting
        animateIn={true}
        // Labels (Places)
        labelsData={CITIES_DB}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.name}
        labelSize={(d: any) => (selectedPlace ? 0 : 1.5)}
        labelDotRadius={0.5}
        labelColor={() => "rgba(255, 255, 255, 0.8)"}
        labelResolution={2}
        // Interaction
        onLabelClick={(d: any) => handleGlobeClick({ lat: d.lat, lng: d.lng })}
        onGlobeClick={handleGlobeClick}
        // Background
        backgroundColor="#020617" // match slate-950
      />

      {/* Selection Popup */}
      {selectedPlace && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
          <div className="bg-black/60 backdrop-blur-md border border-teal-500/30 p-4 rounded-2xl shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-white">
              {selectedPlace.name}
            </h2>
            <p className="text-cyan-300 text-sm">{selectedPlace.info}</p>
          </div>
        </div>
      )}
    </div>
  );
};
