// Demo Mode Mock Data
// This file contains mock responses for popular destinations
// Used when the API is unavailable or for demo purposes

import type { UIComponent } from "@/types/ui";
import type { Flight, ItineraryDay, MapMarker } from "@/types/ui";

export interface DemoDestination {
  keywords: string[];
  name: string;
  country: string;
  response: string;
  flights: Flight[];
  itinerary: ItineraryDay[];
  mapMarkers: MapMarker[];
  mapCenter: { lat: number; lng: number };
}

// Helper to generate dates from today
const getDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
};

// Mumbai Demo Data
export const MUMBAI_DEMO: DemoDestination = {
  keywords: ["mumbai", "bombay", "maharashtra", "india"],
  name: "Mumbai",
  country: "India",
  response: `I've put together an amazing 3-day Mumbai itinerary for you! 🇮🇳

Mumbai, the city of dreams, offers a perfect blend of colonial architecture, vibrant street food, Bollywood glamour, and scenic coastlines.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-AI101",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "06:30",
          arrival_airport: "BOM",
          arrival_city: "Mumbai",
          arrival_time: "08:30",
          duration: "2h 00m",
          airline: "Air India",
          flight_number: "AI101",
          aircraft: "Airbus A320",
          cabin_class: "Economy",
        },
      ],
      total_duration: "2h 00m",
      stops: 0,
      price: 4500,
      currency: "INR",
      price_formatted: "₹4,500",
      booking_class: "Economy",
    },
    {
      id: "FL-6E201",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "09:15",
          arrival_airport: "BOM",
          arrival_city: "Mumbai",
          arrival_time: "11:30",
          duration: "2h 15m",
          airline: "IndiGo",
          flight_number: "6E201",
          aircraft: "Airbus A321neo",
          cabin_class: "Economy",
        },
      ],
      total_duration: "2h 15m",
      stops: 0,
      price: 3800,
      currency: "INR",
      price_formatted: "₹3,800",
      booking_class: "Economy",
    },
    {
      id: "FL-UK933",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "14:00",
          arrival_airport: "BOM",
          arrival_city: "Mumbai",
          arrival_time: "16:15",
          duration: "2h 15m",
          airline: "Vistara",
          flight_number: "UK933",
          aircraft: "Boeing 737",
          cabin_class: "Premium Economy",
        },
      ],
      total_duration: "2h 15m",
      stops: 0,
      price: 6200,
      currency: "INR",
      price_formatted: "₹6,200",
      booking_class: "Premium Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "South Mumbai Heritage Walk",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Taj Mahal Palace Hotel", type: "hotel" },
        },
        {
          time: "10:00",
          end_time: "12:00",
          place: { name: "Gateway of India", type: "attraction" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Leopold Cafe", type: "food" },
        },
        {
          time: "14:30",
          end_time: "16:30",
          place: { name: "Chhatrapati Shivaji Terminus", type: "attraction" },
        },
        {
          time: "17:00",
          end_time: "18:30",
          place: { name: "Marine Drive Sunset Walk", type: "nature" },
        },
        {
          time: "19:30",
          end_time: "21:30",
          place: { name: "Khyber Restaurant", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Culture & Street Food",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Breakfast at Hotel", type: "food" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Dharavi Art Walk", type: "attraction" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Mohammed Ali Road Food Trail", type: "food" },
        },
        {
          time: "14:30",
          end_time: "16:30",
          place: { name: "Elephanta Caves Ferry", type: "attraction" },
        },
        {
          time: "17:00",
          end_time: "18:00",
          place: { name: "Return to Hotel", type: "rest" },
        },
        {
          time: "19:00",
          end_time: "21:30",
          place: { name: "Trishna Coastal Restaurant", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Bollywood & Markets",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "10:30",
          end_time: "13:00",
          place: { name: "Bollywood Film City Tour", type: "attraction" },
        },
        {
          time: "13:30",
          end_time: "15:00",
          place: { name: "Lunch at Film City", type: "food" },
        },
        {
          time: "15:30",
          end_time: "18:00",
          place: { name: "Colaba Causeway Shopping", type: "attraction" },
        },
        {
          time: "18:30",
          end_time: "19:30",
          place: { name: "Travel to Airport", type: "transport" },
        },
        {
          time: "20:00",
          end_time: "22:00",
          place: { name: "Mumbai Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: 18.922,
      lng: 72.8347,
      title: "Gateway of India",
      type: "attraction",
      day: 1,
    },
    {
      lat: 18.9217,
      lng: 72.833,
      title: "Taj Mahal Palace",
      type: "hotel",
      day: 1,
    },
    {
      lat: 18.9442,
      lng: 72.8232,
      title: "CST Station",
      type: "attraction",
      day: 1,
    },
    {
      lat: 18.9438,
      lng: 72.8232,
      title: "Marine Drive",
      type: "nature",
      day: 1,
    },
    {
      lat: 19.0444,
      lng: 72.8555,
      title: "Dharavi",
      type: "attraction",
      day: 2,
    },
    {
      lat: 18.9492,
      lng: 72.8378,
      title: "Elephanta Ferry",
      type: "attraction",
      day: 2,
    },
    {
      lat: 19.1584,
      lng: 72.8556,
      title: "Film City",
      type: "attraction",
      day: 3,
    },
    {
      lat: 18.9226,
      lng: 72.8316,
      title: "Colaba Causeway",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 19.0, lng: 72.85 },
};

// Singapore Demo Data
export const SINGAPORE_DEMO: DemoDestination = {
  keywords: ["singapore", "sg", "lion city"],
  name: "Singapore",
  country: "Singapore",
  response: `Here's your perfect 3-day Singapore adventure! 🇸🇬

Singapore offers futuristic architecture, amazing food, beautiful gardens, and a blend of cultures you won't find anywhere else.

Let me show you what I've planned:`,
  flights: [
    {
      id: "FL-SQ403",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "08:30",
          arrival_airport: "SIN",
          arrival_city: "Singapore",
          arrival_time: "16:45",
          duration: "5h 45m",
          airline: "Singapore Airlines",
          flight_number: "SQ403",
          aircraft: "Boeing 787-10",
          cabin_class: "Economy",
        },
      ],
      total_duration: "5h 45m",
      stops: 0,
      price: 28000,
      currency: "INR",
      price_formatted: "₹28,000",
      booking_class: "Economy",
    },
    {
      id: "FL-AI381",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "01:30",
          arrival_airport: "SIN",
          arrival_city: "Singapore",
          arrival_time: "09:15",
          duration: "5h 15m",
          airline: "Air India",
          flight_number: "AI381",
          aircraft: "Airbus A350",
          cabin_class: "Economy",
        },
      ],
      total_duration: "5h 15m",
      stops: 0,
      price: 22000,
      currency: "INR",
      price_formatted: "₹22,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Gardens by the Bay & Marina Bay",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "Marina Bay Sands Hotel", type: "hotel" },
        },
        {
          time: "11:30",
          end_time: "14:00",
          place: { name: "Gardens by the Bay", type: "nature" },
        },
        {
          time: "14:30",
          end_time: "15:30",
          place: { name: "Satay by the Bay", type: "food" },
        },
        {
          time: "16:00",
          end_time: "18:00",
          place: { name: "Cloud Forest & Flower Dome", type: "attraction" },
        },
        {
          time: "19:00",
          end_time: "20:00",
          place: { name: "Supertree Grove Light Show", type: "attraction" },
        },
        {
          time: "20:30",
          end_time: "22:00",
          place: { name: "CÉ LA VI SkyBar", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Culture & Local Flavors",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Breakfast at Tiong Bahru", type: "food" },
        },
        {
          time: "10:30",
          end_time: "13:00",
          place: { name: "Chinatown Heritage Walk", type: "attraction" },
        },
        {
          time: "13:00",
          end_time: "14:30",
          place: { name: "Maxwell Food Centre", type: "food" },
        },
        {
          time: "15:00",
          end_time: "17:00",
          place: { name: "Little India & Arab Street", type: "attraction" },
        },
        {
          time: "17:30",
          end_time: "19:00",
          place: { name: "Haji Lane Shopping", type: "attraction" },
        },
        {
          time: "19:30",
          end_time: "21:30",
          place: { name: "Jumbo Seafood @ Clarke Quay", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Sentosa Island",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "10:30",
          end_time: "13:00",
          place: { name: "Universal Studios Singapore", type: "attraction" },
        },
        {
          time: "13:00",
          end_time: "14:30",
          place: { name: "Lunch at Resorts World", type: "food" },
        },
        {
          time: "15:00",
          end_time: "17:00",
          place: { name: "Palawan Beach", type: "nature" },
        },
        {
          time: "17:30",
          end_time: "18:30",
          place: { name: "Travel to Changi Airport", type: "transport" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Jewel Changi Airport", type: "attraction" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: 1.2834,
      lng: 103.8607,
      title: "Marina Bay Sands",
      type: "hotel",
      day: 1,
    },
    {
      lat: 1.2816,
      lng: 103.8636,
      title: "Gardens by the Bay",
      type: "nature",
      day: 1,
    },
    {
      lat: 1.2847,
      lng: 103.8453,
      title: "Chinatown",
      type: "attraction",
      day: 2,
    },
    {
      lat: 1.3066,
      lng: 103.8518,
      title: "Little India",
      type: "attraction",
      day: 2,
    },
    {
      lat: 1.254,
      lng: 103.8238,
      title: "Universal Studios",
      type: "attraction",
      day: 3,
    },
    { lat: 1.249, lng: 103.83, title: "Palawan Beach", type: "nature", day: 3 },
    {
      lat: 1.3644,
      lng: 103.9915,
      title: "Changi Airport",
      type: "transport",
      day: 3,
    },
  ],
  mapCenter: { lat: 1.29, lng: 103.85 },
};

// Tokyo Demo Data
export const TOKYO_DEMO: DemoDestination = {
  keywords: ["tokyo", "japan", "nippon", "shibuya", "shinjuku"],
  name: "Tokyo",
  country: "Japan",
  response: `Get ready for an incredible Tokyo experience! 🇯🇵

From ancient temples to neon-lit streets, Tokyo is a mesmerizing blend of tradition and cutting-edge modernity.

Here's your curated itinerary:`,
  flights: [
    {
      id: "FL-JL749",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "20:30",
          arrival_airport: "NRT",
          arrival_city: "Tokyo",
          arrival_time: "08:15",
          duration: "8h 15m",
          airline: "Japan Airlines",
          flight_number: "JL749",
          aircraft: "Boeing 787-9",
          cabin_class: "Economy",
        },
      ],
      total_duration: "8h 15m",
      stops: 0,
      price: 52000,
      currency: "INR",
      price_formatted: "₹52,000",
      booking_class: "Economy",
    },
    {
      id: "FL-NH828",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "11:00",
          arrival_airport: "HND",
          arrival_city: "Tokyo",
          arrival_time: "22:30",
          duration: "8h 00m",
          airline: "ANA",
          flight_number: "NH828",
          aircraft: "Boeing 777-300ER",
          cabin_class: "Economy",
        },
      ],
      total_duration: "8h 00m",
      stops: 0,
      price: 48000,
      currency: "INR",
      price_formatted: "₹48,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Traditional Tokyo",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Park Hyatt Tokyo", type: "hotel" },
        },
        {
          time: "10:30",
          end_time: "12:30",
          place: { name: "Senso-ji Temple, Asakusa", type: "attraction" },
        },
        {
          time: "13:00",
          end_time: "14:00",
          place: { name: "Ramen at Ichiran", type: "food" },
        },
        {
          time: "14:30",
          end_time: "16:30",
          place: { name: "Ueno Park & Museums", type: "attraction" },
        },
        {
          time: "17:00",
          end_time: "18:30",
          place: { name: "Akihabara Electric Town", type: "attraction" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Izakaya Dinner in Shinjuku", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Modern Tokyo",
      activities: [
        {
          time: "08:00",
          end_time: "09:30",
          place: { name: "Tsukiji Outer Market Breakfast", type: "food" },
        },
        {
          time: "10:00",
          end_time: "12:00",
          place: { name: "teamLab Borderless", type: "attraction" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Sushi Lunch in Ginza", type: "food" },
        },
        {
          time: "14:30",
          end_time: "16:30",
          place: { name: "Shibuya Crossing & Harajuku", type: "attraction" },
        },
        {
          time: "17:00",
          end_time: "18:30",
          place: { name: "Meiji Shrine", type: "attraction" },
        },
        {
          time: "19:00",
          end_time: "21:30",
          place: { name: "Omoide Yokocho", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Day Trip to Mt. Fuji",
      activities: [
        {
          time: "07:00",
          end_time: "09:00",
          place: { name: "Shinkansen to Hakone", type: "transport" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Hakone Ropeway & Lake Ashi", type: "nature" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Traditional Japanese Lunch", type: "food" },
        },
        {
          time: "14:30",
          end_time: "16:30",
          place: { name: "Hakone Open-Air Museum", type: "attraction" },
        },
        {
          time: "17:00",
          end_time: "19:00",
          place: { name: "Return to Tokyo", type: "transport" },
        },
        {
          time: "19:30",
          end_time: "21:30",
          place: { name: "Tokyo Tower Night View", type: "attraction" },
        },
      ],
    },
  ],
  mapMarkers: [
    { lat: 35.6895, lng: 139.6917, title: "Shinjuku", type: "hotel", day: 1 },
    {
      lat: 35.7148,
      lng: 139.7967,
      title: "Senso-ji Temple",
      type: "attraction",
      day: 1,
    },
    { lat: 35.7146, lng: 139.7744, title: "Ueno Park", type: "nature", day: 1 },
    {
      lat: 35.6585,
      lng: 139.7016,
      title: "Shibuya Crossing",
      type: "attraction",
      day: 2,
    },
    {
      lat: 35.6764,
      lng: 139.6993,
      title: "Meiji Shrine",
      type: "attraction",
      day: 2,
    },
    { lat: 35.2325, lng: 139.1069, title: "Hakone", type: "nature", day: 3 },
    {
      lat: 35.6586,
      lng: 139.7454,
      title: "Tokyo Tower",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 35.68, lng: 139.75 },
};

// Paris Demo Data
export const PARIS_DEMO: DemoDestination = {
  keywords: ["paris", "france", "french", "eiffel"],
  name: "Paris",
  country: "France",
  response: `Bienvenue à Paris! Here's your romantic 3-day Parisian adventure! 🇫🇷

The City of Light awaits with its iconic landmarks, world-class art, charming cafés, and exquisite cuisine.

Your personalized itinerary:`,
  flights: [
    {
      id: "FL-AF225",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "22:30",
          arrival_airport: "CDG",
          arrival_city: "Paris",
          arrival_time: "05:15",
          duration: "9h 15m",
          airline: "Air France",
          flight_number: "AF225",
          aircraft: "Airbus A350",
          cabin_class: "Economy",
        },
      ],
      total_duration: "9h 15m",
      stops: 0,
      price: 58000,
      currency: "INR",
      price_formatted: "₹58,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Iconic Paris",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "Le Meurice Hotel", type: "hotel" },
        },
        {
          time: "11:30",
          end_time: "14:00",
          place: { name: "The Louvre Museum", type: "attraction" },
        },
        {
          time: "14:30",
          end_time: "15:30",
          place: { name: "Café de Flore", type: "food" },
        },
        {
          time: "16:00",
          end_time: "18:00",
          place: { name: "Notre-Dame & Île de la Cité", type: "attraction" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Eiffel Tower Sunset", type: "attraction" },
        },
        {
          time: "21:30",
          end_time: "23:00",
          place: { name: "Seine River Dinner Cruise", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Art & Montmartre",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Croissant & Coffee at Local Bakery", type: "food" },
        },
        {
          time: "10:30",
          end_time: "13:00",
          place: { name: "Musée d'Orsay", type: "attraction" },
        },
        {
          time: "13:30",
          end_time: "15:00",
          place: { name: "Lunch in Saint-Germain", type: "food" },
        },
        {
          time: "15:30",
          end_time: "18:00",
          place: { name: "Montmartre & Sacré-Cœur", type: "attraction" },
        },
        {
          time: "18:30",
          end_time: "19:30",
          place: { name: "Place du Tertre Artists", type: "attraction" },
        },
        {
          time: "20:00",
          end_time: "22:00",
          place: { name: "Dinner at Le Consulat", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Versailles Day Trip",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Train to Versailles", type: "transport" },
        },
        {
          time: "09:30",
          end_time: "13:00",
          place: { name: "Palace of Versailles", type: "attraction" },
        },
        {
          time: "13:30",
          end_time: "15:00",
          place: { name: "Lunch in Versailles Gardens", type: "food" },
        },
        {
          time: "15:30",
          end_time: "17:00",
          place: {
            name: "Gardens & Marie Antoinette's Estate",
            type: "nature",
          },
        },
        {
          time: "17:30",
          end_time: "18:30",
          place: { name: "Return to Paris", type: "transport" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Farewell Dinner at Le Jules Verne", type: "food" },
        },
      ],
    },
  ],
  mapMarkers: [
    { lat: 48.8656, lng: 2.328, title: "Le Meurice", type: "hotel", day: 1 },
    {
      lat: 48.8606,
      lng: 2.3376,
      title: "The Louvre",
      type: "attraction",
      day: 1,
    },
    {
      lat: 48.858,
      lng: 2.2945,
      title: "Eiffel Tower",
      type: "attraction",
      day: 1,
    },
    {
      lat: 48.853,
      lng: 2.3499,
      title: "Notre-Dame",
      type: "attraction",
      day: 1,
    },
    {
      lat: 48.8599,
      lng: 2.3266,
      title: "Musée d'Orsay",
      type: "attraction",
      day: 2,
    },
    {
      lat: 48.8867,
      lng: 2.343,
      title: "Sacré-Cœur",
      type: "attraction",
      day: 2,
    },
    {
      lat: 48.8049,
      lng: 2.1204,
      title: "Versailles",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 48.86, lng: 2.34 },
};

// All demo destinations
export const DEMO_DESTINATIONS: DemoDestination[] = [
  MUMBAI_DEMO,
  SINGAPORE_DEMO,
  TOKYO_DEMO,
  PARIS_DEMO,
];

// Detect destination from user message
export const detectDemoDestination = (
  message: string
): DemoDestination | null => {
  const lowerMessage = message.toLowerCase();
  for (const dest of DEMO_DESTINATIONS) {
    if (dest.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return dest;
    }
  }
  return null;
};

// Generate demo UI components for a destination
export const generateDemoUIComponents = (
  dest: DemoDestination,
  passengerCount: number = 2
): UIComponent[] => {
  const components: UIComponent[] = [];

  // Flight Card
  components.push({
    type: "flight_card",
    props: {
      origin: "Delhi",
      destination: dest.name,
      departure_date: getDate(7),
      passengers: passengerCount,
      flights: dest.flights,
    },
    required: false,
  });

  // Itinerary Card
  components.push({
    type: "itinerary_card",
    props: {
      days: dest.itinerary,
    },
    required: false,
  });

  // Map View
  components.push({
    type: "map_view",
    props: {
      center: dest.mapCenter,
      zoom: 12,
      markers: dest.mapMarkers,
      title: `${dest.name} Trip Locations`,
    },
    required: false,
  });

  return components;
};

// Default response when no destination detected
export const DEFAULT_DEMO_RESPONSE = {
  text: `I'd be happy to help plan your trip! 🌍

I can create detailed itineraries for these popular destinations:
- **Mumbai, India** - Colonial heritage, street food, and Bollywood
- **Singapore** - Gardens, hawker food, and futuristic architecture  
- **Tokyo, Japan** - Ancient temples meets neon-lit streets
- **Paris, France** - Art, culture, and romantic landmarks

Just tell me where you'd like to go! For example:
"Plan a trip to Tokyo" or "I want to visit Mumbai"`,
  ui_components: [
    {
      type: "preference_chips",
      props: {
        options: [
          { id: "mumbai", label: "🇮🇳 Mumbai", selected: false },
          { id: "singapore", label: "🇸🇬 Singapore", selected: false },
          { id: "tokyo", label: "🇯🇵 Tokyo", selected: false },
          { id: "paris", label: "🇫🇷 Paris", selected: false },
        ],
        multi_select: false,
      },
      required: false,
    },
  ] as UIComponent[],
};
