// Utility to get destination images based on destination name
// Falls back to curated travel images for unknown destinations

// Curated destination images mapping
const DESTINATION_IMAGES: Record<string, string> = {
  // Asia
  "tokyo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop",
  "japan": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop",
  "kyoto": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
  "osaka": "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=2070&auto=format&fit=crop",
  "singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop",
  "bali": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop",
  "indonesia": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop",
  "ubud": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop",
  "vietnam": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop",
  "ha long bay": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop",
  "thailand": "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop",
  "bangkok": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2000&auto=format&fit=crop",
  "phuket": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2001&auto=format&fit=crop",
  "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
  "uae": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
  "maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop",
  "india": "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
  "agra": "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
  "jaipur": "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
  "goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2074&auto=format&fit=crop",
  "kerala": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop",
  "china": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2070&auto=format&fit=crop",
  "beijing": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2070&auto=format&fit=crop",
  "shanghai": "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=2070&auto=format&fit=crop",
  "hong kong": "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=2128&auto=format&fit=crop",
  "south korea": "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=2074&auto=format&fit=crop",
  "seoul": "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=2074&auto=format&fit=crop",

  // Europe
  "paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2146&auto=format&fit=crop",
  "france": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2146&auto=format&fit=crop",
  "london": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
  "england": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
  "uk": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
  "rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
  "italy": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
  "venice": "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?q=80&w=2069&auto=format&fit=crop",
  "florence": "https://images.unsplash.com/photo-1543429258-c5ca3c07573f?q=80&w=2070&auto=format&fit=crop",
  "amalfi": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=3333&auto=format&fit=crop",
  "barcelona": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop",
  "spain": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop",
  "amsterdam": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070&auto=format&fit=crop",
  "netherlands": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070&auto=format&fit=crop",
  "switzerland": "https://images.unsplash.com/photo-1552353617-3bfd679b3bdd?q=80&w=2000&auto=format&fit=crop",
  "zermatt": "https://images.unsplash.com/photo-1552353617-3bfd679b3bdd?q=80&w=2000&auto=format&fit=crop",
  "greece": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2940&auto=format&fit=crop",
  "santorini": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2940&auto=format&fit=crop",
  "athens": "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2070&auto=format&fit=crop",
  "turkey": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2070&auto=format&fit=crop",
  "istanbul": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2070&auto=format&fit=crop",
  "cappadocia": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2070&auto=format&fit=crop",
  "portugal": "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=2073&auto=format&fit=crop",
  "lisbon": "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=2073&auto=format&fit=crop",
  "germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop",
  "berlin": "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2070&auto=format&fit=crop",
  "munich": "https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=2070&auto=format&fit=crop",
  "prague": "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=2070&auto=format&fit=crop",
  "czech": "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=2070&auto=format&fit=crop",
  "vienna": "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2072&auto=format&fit=crop",
  "austria": "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2072&auto=format&fit=crop",
  "iceland": "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2059&auto=format&fit=crop",
  "norway": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop",
  "sweden": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2070&auto=format&fit=crop",
  "scotland": "https://images.unsplash.com/photo-1506377872008-6645d9d29ef7?q=80&w=2070&auto=format&fit=crop",
  "ireland": "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=2074&auto=format&fit=crop",

  // Americas
  "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
  "nyc": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
  "usa": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099&auto=format&fit=crop",
  "los angeles": "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?q=80&w=2070&auto=format&fit=crop",
  "san francisco": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2089&auto=format&fit=crop",
  "las vegas": "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?q=80&w=2074&auto=format&fit=crop",
  "miami": "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=2070&auto=format&fit=crop",
  "hawaii": "https://images.unsplash.com/photo-1507876466758-bc54f384809c?q=80&w=2009&auto=format&fit=crop",
  "canada": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2022&auto=format&fit=crop",
  "vancouver": "https://images.unsplash.com/photo-1559511260-66a68e201d5b?q=80&w=2071&auto=format&fit=crop",
  "toronto": "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=2070&auto=format&fit=crop",
  "mexico": "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=2070&auto=format&fit=crop",
  "cancun": "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?q=80&w=2159&auto=format&fit=crop",
  "brazil": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop",
  "rio": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop",
  "argentina": "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=80&w=2070&auto=format&fit=crop",
  "buenos aires": "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=80&w=2070&auto=format&fit=crop",
  "peru": "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop",
  "machu picchu": "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop",

  // Oceania
  "australia": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
  "sydney": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
  "melbourne": "https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=2071&auto=format&fit=crop",
  "new zealand": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop",
  "queenstown": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop",
  "fiji": "https://images.unsplash.com/photo-1584811644165-33828b342a3f?q=80&w=2070&auto=format&fit=crop",

  // Africa
  "egypt": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=2070&auto=format&fit=crop",
  "cairo": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=2070&auto=format&fit=crop",
  "morocco": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2074&auto=format&fit=crop",
  "marrakech": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2074&auto=format&fit=crop",
  "south africa": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2071&auto=format&fit=crop",
  "cape town": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2071&auto=format&fit=crop",
  "safari": "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
  "kenya": "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
  "tanzania": "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
};

// Fallback images for when no match is found
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop", // Road trip
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2031&auto=format&fit=crop", // Airplane wing
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop", // Lake and mountains
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop", // Beach sunset
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop", // Tropical beach
];

/**
 * Get an image URL for a destination based on its name
 * Uses fuzzy matching to find the best image
 */
export function getDestinationImage(destination: string): string {
  if (!destination) {
    return FALLBACK_IMAGES[0];
  }

  const normalizedDest = destination.toLowerCase().trim();

  // Direct match
  if (DESTINATION_IMAGES[normalizedDest]) {
    return DESTINATION_IMAGES[normalizedDest];
  }

  // Check if destination contains any known keywords
  for (const [key, url] of Object.entries(DESTINATION_IMAGES)) {
    if (normalizedDest.includes(key) || key.includes(normalizedDest)) {
      return url;
    }
  }

  // Check individual words in destination
  const words = normalizedDest.split(/[\s,]+/).filter(w => w.length > 2);
  for (const word of words) {
    if (DESTINATION_IMAGES[word]) {
      return DESTINATION_IMAGES[word];
    }
    // Partial match
    for (const [key, url] of Object.entries(DESTINATION_IMAGES)) {
      if (key.includes(word) || word.includes(key)) {
        return url;
      }
    }
  }

  // Return a random fallback (using destination hash for consistency)
  const hash = destination.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}

export { DESTINATION_IMAGES, FALLBACK_IMAGES };
