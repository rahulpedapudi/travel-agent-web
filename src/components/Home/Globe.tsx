import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import GlobeT, { type GlobeMethods } from "react-globe.gl";
import { GLOBE_LOCATIONS, type GlobeLocation } from "./globe-data";
import { Play, Pause, X, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Reliable Textures
const EARTH_DAY =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg";

export const Globe = () => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedPlace, setSelectedPlace] = useState<GlobeLocation | null>(null);
  const [altitude, setAltitude] = useState(2.5); // Start high
  const [isRotating, setIsRotating] = useState(true); // Manual toggle
  const navigate = useNavigate();

  // Handle Resize
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

  // Rotation & Zoom Listener
  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();

      // Force update autoRotate properties
      controls.autoRotate = isRotating && !selectedPlace;
      controls.autoRotateSpeed = 0.5;

      // Important: OrbitControls sometimes needs a nudge or wait for next tick,
      // but usually setting the prop is enough if the animation loop is running.

      const updateAltitude = () => {
        const currentPov = globeEl.current?.pointOfView();
        if (currentPov) {
          setAltitude(currentPov.altitude);
        }
      };

      controls.addEventListener('change', updateAltitude);
      return () => controls.removeEventListener('change', updateAltitude);
    }
  }, [isRotating, selectedPlace]);

  // Determine visibility and "Label Mode" based on altitude
  const visiblePlaces = useMemo(() => {
    return GLOBE_LOCATIONS.filter((place) => {
      // Visibility Logic (same as before)
      if (place.tier === 1) return true;
      if (place.tier === 2 && altitude < 2.0) return true;
      if (place.tier === 3 && altitude < 1.2) return true;
      return false;
    }).map(place => {
      // Display Logic
      // Tier 1: Major Hubs - Always Show Text
      // Tier 2: Tourist Spots - Show Text only when zoomed in (altitude < 0.5)
      // Tier 3: Local Gems - Show Text only when DEEP zoomed in (altitude < 0.25)

      let showLabel = false;
      if (place.tier === 1) showLabel = true;
      else if (place.tier === 2 && altitude < 0.5) showLabel = true;
      else if (place.tier === 3 && altitude < 0.25) showLabel = true;

      return { ...place, showLabel };
    });
  }, [altitude]);

  const handleGlobeClick = ({ lat, lng }: { lat: number; lng: number }) => {
    // Find nearest city
    let bestCity = null;
    let minDist = Infinity; // Degrees

    visiblePlaces.forEach((city) => {
      const dist = Math.sqrt(
        Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2)
      );
      if (dist < minDist) {
        minDist = dist;
        bestCity = city;
      }
    });

    if (bestCity && minDist < 3) {
      handleCityClick(bestCity);
    } else {
      setSelectedPlace(null);
    }
  };

  const handleCityClick = useCallback((place: GlobeLocation) => {
    setSelectedPlace(place);
    globeEl.current?.pointOfView(
      { lat: place.lat, lng: place.lng, altitude: Math.max(0.5, altitude > 1 ? 1.0 : altitude) },
      1500
    );
  }, [altitude]);

  const handlePlanTrip = () => {
    // Generate random UUID for new chat
    const newChatId = crypto.randomUUID();
    navigate(`/c/${newChatId}`, {
      state: { initialInput: `Plan a trip to ${selectedPlace?.name}` }
    });
  };

  // Create Hybrid Marker (Dot vs Pill)
  const renderHtmlMarker = useCallback((d: any) => {
    const el = document.createElement('div');
    const isLabel = d.showLabel;

    // If Label Mode: Show Glassmorphic Pill
    // If Dot Mode: Show Dot (Text reveals on hover)
    if (isLabel) {
      el.innerHTML = `
        <div class="group flex flex-col items-center cursor-pointer hover:z-50">
          <div class="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/30 rounded-full shadow-lg text-white text-[10px] font-semibold tracking-wide whitespace-nowrap group-hover:bg-teal-500/80 group-hover:border-teal-400 transition-all">
            ${d.name}
          </div>
          <div class="h-2 w-[1px] bg-white/30"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:bg-teal-400"></div>
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="group flex flex-col items-center cursor-pointer hover:z-50">
           <div class="transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-300 ease-out absolute bottom-full mb-1 pointer-events-none">
            <div class="px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-md text-white text-[10px] whitespace-nowrap">
              ${d.name}
            </div>
          </div>
          <div class="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_4px_rgba(255,255,255,0.5)] group-hover:bg-teal-400 group-hover:w-2 group-hover:h-2 group-hover:shadow-[0_0_10px_rgba(45,212,191,0.8)] transition-all"></div>
        </div>
      `;
    }

    el.onclick = (e) => {
      e.stopPropagation();
      handleCityClick(d);
    };
    return el;
  }, [handleCityClick]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <GlobeT
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={EARTH_DAY}
        bumpImageUrl={EARTH_NORMAL}
        atmosphereColor="#4fa0d1"
        atmosphereAltitude={0.15}
        animateIn={false}

        // HTML Markers
        htmlElementsData={visiblePlaces}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlElement={renderHtmlMarker}
        htmlTransitionDuration={500}

        // Remove default labels
        labelsData={[]}

        // Interaction
        onGlobeClick={handleGlobeClick}
        backgroundColor="#09090b" // zinc-950
      />

      {/* Controls: Rotation Toggle */}
      <div className="absolute bottom-8 right-8 z-30">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all active:scale-95 glow-button"
          title={isRotating ? "Pause Rotation" : "Resume Rotation"}
        >
          {isRotating ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* Info Card */}
      {selectedPlace && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none">
          <div className="relative bg-zinc-950/95 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-2xl animate-in zoom-in fade-in duration-300 max-w-xs text-center border-t-teal-500/50 pointer-events-auto">
            {/* Close Button X */}
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-3 right-3 p-1.5 bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 rounded-full transition-all"
            >
              <X size={14} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2 font-serif tracking-wide text-shadow-sm mt-2">{selectedPlace.name}</h2>
            <span className="inline-block px-2 py-1 bg-teal-500/20 text-teal-300 text-[10px] uppercase tracking-wider rounded-full mb-3 border border-teal-500/20 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
              {selectedPlace.type}
            </span>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">{selectedPlace.info}</p>

            <button
              onClick={handlePlanTrip}
              className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-teal-900/50 flex items-center justify-center gap-2 group"
            >
              <Plane size={16} className="group-hover:-rotate-45 transition-transform duration-300" />
              Plan a Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
