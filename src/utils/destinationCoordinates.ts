// Utility to get destination coordinates
// Used to mock map locations for destinations where we don't have real geodata

export const DESTINATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Asia
  "tokyo": { lat: 35.6762, lng: 139.6503 },
  "kyoto": { lat: 35.0116, lng: 135.7681 },
  "osaka": { lat: 34.6937, lng: 135.5023 },
  "bali": { lat: -8.4095, lng: 115.1889 },
  "ubud": { lat: -8.5069, lng: 115.2625 },
  "singapore": { lat: 1.3521, lng: 103.8198 },
  "bangkok": { lat: 13.7563, lng: 100.5018 },
  "dubai": { lat: 25.2048, lng: 55.2708 },
  "agra": { lat: 27.1767, lng: 78.0081 },
  "beijing": { lat: 39.9042, lng: 116.4074 },
  "seoul": { lat: 37.5665, lng: 126.9780 },

  // Europe
  "paris": { lat: 48.8566, lng: 2.3522 },
  "london": { lat: 51.5074, lng: -0.1278 },
  "rome": { lat: 41.9028, lng: 12.4964 },
  "venice": { lat: 45.4408, lng: 12.3155 },
  "amalfi": { lat: 40.6340, lng: 14.6027 },
  "santorini": { lat: 36.3932, lng: 25.4615 },
  "zermatt": { lat: 46.0207, lng: 7.7491 },
  "barcelona": { lat: 41.3851, lng: 2.1734 },
  "amsterdam": { lat: 52.3676, lng: 4.9041 },
  "prague": { lat: 50.0755, lng: 14.4378 },
  "iceland": { lat: 64.9631, lng: -19.0208 },

  // Americas
  "new york": { lat: 40.7128, lng: -74.0060 },
  "nyc": { lat: 40.7128, lng: -74.0060 },
  "san francisco": { lat: 37.7749, lng: -122.4194 },
  "los angeles": { lat: 34.0522, lng: -118.2437 },
  "las vegas": { lat: 36.1699, lng: -115.1398 },
  "miami": { lat: 25.7617, lng: -80.1918 },
  "cancun": { lat: 21.1619, lng: -86.8515 },
  "rio": { lat: -22.9068, lng: -43.1729 },
  "cusco": { lat: -13.5320, lng: -71.9675 },

  // Oceania
  "sydney": { lat: -33.8688, lng: 151.2093 },
  "queenstown": { lat: -45.0312, lng: 168.6626 },
  "auckland": { lat: -36.8485, lng: 174.7633 },
  "fiji": { lat: -17.7134, lng: 178.0650 },

  // Africa
  "cairo": { lat: 30.0444, lng: 31.2357 },
  "cape town": { lat: -33.9249, lng: 18.4241 },
  "marrakech": { lat: 31.6295, lng: -7.9811 },
};

/**
 * Get coordinates for a destination, with mock offsets for activities
 * @param destination Name of the destination
 * @param index Index for randomization offset to prevent overlap
 */
export function getMockCoordinates(destination: string, index: number = 0): { lat: number; lng: number } {
  const normalizedDest = destination.toLowerCase().trim();
  
  // Find matching key
  let center = { lat: 0, lng: 0 };
  let found = false;

  for (const [key, coords] of Object.entries(DESTINATION_COORDINATES)) {
    if (normalizedDest.includes(key) || key.includes(normalizedDest)) {
      center = coords;
      found = true;
      break;
    }
  }

  // Fallback if not found (default to 0,0 or random)
  if (!found) {
    // Try to find ANY match in words
    const words = normalizedDest.split(/[\s,]+/);
    for (const word of words) {
        if (word.length > 3) {
             for (const [key, coords] of Object.entries(DESTINATION_COORDINATES)) {
                if (key.includes(word)) {
                    center = coords;
                    found = true;
                    break;
                }
            }
        }
        if (found) break;
    }
  }

  if (!found) {
      // Default to "somewhere" (e.g. Null Island or just equator)
      center = { lat: 20, lng: 0 }; 
  }

  // Add slight offset based on index to create a "path" or spread
  // ~0.01 degrees is roughly 1km
  const angle = (index * 137.5) * (Math.PI / 180); // Golden angle for distribution
  const radius = 0.005 + (index * 0.002); // Spiral out
  
  return {
    lat: center.lat + radius * Math.cos(angle),
    lng: center.lng + radius * Math.sin(angle)
  };
}
