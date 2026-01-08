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
  keywords: [
    "mumbai",
    "bombay",
    "maharashtra",
    "bom",
    "gateway of india",
    "bollywood",
    "maximum city",
  ],
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
  keywords: [
    "singapore",
    "sg",
    "lion city",
    "singapura",
    "sin",
    "changi",
    "marina bay",
    "sentosa",
  ],
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
  keywords: [
    "tokyo",
    "japan",
    "nippon",
    "shibuya",
    "shinjuku",
    "tyo",
    "nrt",
    "hnd",
    "akihabara",
    "ginza",
    "harajuku",
  ],
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
  keywords: [
    "paris",
    "france",
    "french",
    "eiffel",
    "cdg",
    "louvre",
    "city of light",
    "versailles",
    "montmartre",
  ],
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

// New York Demo Data
export const NEW_YORK_DEMO: DemoDestination = {
  keywords: [
    "new york",
    "nyc",
    "manhattan",
    "brooklyn",
    "newyork",
    "ny",
    "big apple",
    "jfk",
    "times square",
    "central park",
    "statue of liberty",
  ],
  name: "New York",
  country: "USA",
  response: `Welcome to the Big Apple! Here's your 3-day NYC adventure! 🗽

New York City never sleeps - from iconic landmarks to world-class dining, Broadway shows to Central Park strolls.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-AI101-NYC",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "02:00",
          arrival_airport: "JFK",
          arrival_city: "New York",
          arrival_time: "07:30",
          duration: "15h 30m",
          airline: "Air India",
          flight_number: "AI101",
          aircraft: "Boeing 777-300ER",
          cabin_class: "Economy",
        },
      ],
      total_duration: "15h 30m",
      stops: 0,
      price: 85000,
      currency: "INR",
      price_formatted: "₹85,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Manhattan Icons",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Times Square Hotel Check-in", type: "hotel" },
        },
        {
          time: "10:30",
          end_time: "13:00",
          place: {
            name: "Statue of Liberty & Ellis Island",
            type: "attraction",
          },
        },
        {
          time: "13:30",
          end_time: "14:30",
          place: { name: "Lunch in Battery Park", type: "food" },
        },
        {
          time: "15:00",
          end_time: "17:00",
          place: {
            name: "9/11 Memorial & One World Observatory",
            type: "attraction",
          },
        },
        {
          time: "18:00",
          end_time: "20:00",
          place: { name: "Times Square Evening Walk", type: "attraction" },
        },
        {
          time: "20:30",
          end_time: "23:00",
          place: { name: "Broadway Show", type: "attraction" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Central Park & Museums",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Breakfast at Local Diner", type: "food" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Central Park Walk", type: "nature" },
        },
        {
          time: "12:30",
          end_time: "15:00",
          place: { name: "Metropolitan Museum of Art", type: "attraction" },
        },
        {
          time: "15:30",
          end_time: "17:00",
          place: { name: "Fifth Avenue Shopping", type: "attraction" },
        },
        {
          time: "17:30",
          end_time: "19:00",
          place: { name: "Top of the Rock Sunset", type: "attraction" },
        },
        {
          time: "19:30",
          end_time: "21:30",
          place: { name: "Dinner in Little Italy", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Brooklyn & Departure",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "09:30",
          end_time: "11:00",
          place: { name: "Brooklyn Bridge Walk", type: "attraction" },
        },
        {
          time: "11:30",
          end_time: "13:00",
          place: { name: "DUMBO & Brooklyn Heights", type: "attraction" },
        },
        {
          time: "13:30",
          end_time: "15:00",
          place: { name: "Pizza in Brooklyn", type: "food" },
        },
        {
          time: "16:00",
          end_time: "18:00",
          place: { name: "Transfer to JFK Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: 40.758,
      lng: -73.9855,
      title: "Times Square",
      type: "hotel",
      day: 1,
    },
    {
      lat: 40.6892,
      lng: -74.0445,
      title: "Statue of Liberty",
      type: "attraction",
      day: 1,
    },
    {
      lat: 40.7115,
      lng: -74.0134,
      title: "One World Trade",
      type: "attraction",
      day: 1,
    },
    {
      lat: 40.7829,
      lng: -73.9654,
      title: "Central Park",
      type: "nature",
      day: 2,
    },
    {
      lat: 40.7794,
      lng: -73.9632,
      title: "Met Museum",
      type: "attraction",
      day: 2,
    },
    {
      lat: 40.7587,
      lng: -73.9787,
      title: "Rockefeller Center",
      type: "attraction",
      day: 2,
    },
    {
      lat: 40.7061,
      lng: -73.9969,
      title: "Brooklyn Bridge",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 40.758, lng: -73.9855 },
};

// London Demo Data
export const LONDON_DEMO: DemoDestination = {
  keywords: [
    "london",
    "uk",
    "england",
    "british",
    "lhr",
    "heathrow",
    "united kingdom",
    "big ben",
    "buckingham",
    "thames",
  ],
  name: "London",
  country: "UK",
  response: `Cheerio! Here's your 3-day London adventure! 🇬🇧

From royal palaces to world-class museums, London blends centuries of history with cutting-edge culture.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-BA142",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "21:00",
          arrival_airport: "LHR",
          arrival_city: "London",
          arrival_time: "03:30",
          duration: "9h 00m",
          airline: "British Airways",
          flight_number: "BA142",
          aircraft: "Boeing 787-9",
          cabin_class: "Economy",
        },
      ],
      total_duration: "9h 00m",
      stops: 0,
      price: 55000,
      currency: "INR",
      price_formatted: "₹55,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Royal London",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "Westminster Hotel Check-in", type: "hotel" },
        },
        {
          time: "11:30",
          end_time: "13:00",
          place: {
            name: "Buckingham Palace & Changing of Guard",
            type: "attraction",
          },
        },
        {
          time: "13:30",
          end_time: "14:30",
          place: { name: "Lunch in St. James's Park", type: "food" },
        },
        {
          time: "15:00",
          end_time: "17:00",
          place: { name: "Westminster Abbey & Big Ben", type: "attraction" },
        },
        {
          time: "17:30",
          end_time: "19:00",
          place: { name: "London Eye at Sunset", type: "attraction" },
        },
        {
          time: "19:30",
          end_time: "21:30",
          place: { name: "Dinner in Covent Garden", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "History & Culture",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "English Breakfast", type: "food" },
        },
        {
          time: "10:30",
          end_time: "13:00",
          place: { name: "British Museum", type: "attraction" },
        },
        {
          time: "13:30",
          end_time: "14:30",
          place: { name: "Lunch at Borough Market", type: "food" },
        },
        {
          time: "15:00",
          end_time: "17:00",
          place: { name: "Tower of London", type: "attraction" },
        },
        {
          time: "17:30",
          end_time: "18:30",
          place: { name: "Tower Bridge Walk", type: "attraction" },
        },
        {
          time: "19:00",
          end_time: "22:00",
          place: { name: "West End Theatre Show", type: "attraction" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Markets & Museums",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "10:30",
          end_time: "12:30",
          place: {
            name: "Notting Hill & Portobello Market",
            type: "attraction",
          },
        },
        {
          time: "13:00",
          end_time: "14:00",
          place: { name: "Fish & Chips Lunch", type: "food" },
        },
        {
          time: "14:30",
          end_time: "16:30",
          place: { name: "Hyde Park & Kensington", type: "nature" },
        },
        {
          time: "17:00",
          end_time: "19:00",
          place: { name: "Transfer to Heathrow", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: 51.5014,
      lng: -0.1419,
      title: "Buckingham Palace",
      type: "attraction",
      day: 1,
    },
    {
      lat: 51.4994,
      lng: -0.1248,
      title: "Westminster Abbey",
      type: "attraction",
      day: 1,
    },
    {
      lat: 51.5033,
      lng: -0.1195,
      title: "London Eye",
      type: "attraction",
      day: 1,
    },
    {
      lat: 51.5194,
      lng: -0.127,
      title: "British Museum",
      type: "attraction",
      day: 2,
    },
    {
      lat: 51.5081,
      lng: -0.0759,
      title: "Tower of London",
      type: "attraction",
      day: 2,
    },
    {
      lat: 51.5055,
      lng: -0.0754,
      title: "Tower Bridge",
      type: "attraction",
      day: 2,
    },
    {
      lat: 51.509,
      lng: -0.1963,
      title: "Notting Hill",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 51.5074, lng: -0.1278 },
};

// Dubai Demo Data
export const DUBAI_DEMO: DemoDestination = {
  keywords: [
    "dubai",
    "uae",
    "emirates",
    "burj",
    "dxb",
    "united arab emirates",
    "burj khalifa",
    "palm jumeirah",
    "desert safari",
  ],
  name: "Dubai",
  country: "UAE",
  response: `Welcome to the City of Gold! Here's your 3-day Dubai adventure! 🇦🇪

Dubai offers a stunning mix of futuristic architecture, luxury shopping, desert adventures, and rich Arabian culture.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-EK511",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "03:30",
          arrival_airport: "DXB",
          arrival_city: "Dubai",
          arrival_time: "05:30",
          duration: "3h 30m",
          airline: "Emirates",
          flight_number: "EK511",
          aircraft: "Airbus A380",
          cabin_class: "Economy",
        },
      ],
      total_duration: "3h 30m",
      stops: 0,
      price: 18000,
      currency: "INR",
      price_formatted: "₹18,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Modern Dubai",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "Downtown Dubai Hotel", type: "hotel" },
        },
        {
          time: "11:30",
          end_time: "14:00",
          place: { name: "Burj Khalifa At The Top", type: "attraction" },
        },
        {
          time: "14:30",
          end_time: "16:00",
          place: { name: "Dubai Mall & Aquarium", type: "attraction" },
        },
        {
          time: "16:30",
          end_time: "18:00",
          place: { name: "Lunch at Dubai Mall", type: "food" },
        },
        {
          time: "18:30",
          end_time: "20:00",
          place: { name: "Dubai Fountain Show", type: "attraction" },
        },
        {
          time: "20:30",
          end_time: "22:30",
          place: { name: "Dinner at Armani Hotel", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Old Dubai & Desert",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Arabic Breakfast", type: "food" },
        },
        {
          time: "10:30",
          end_time: "13:00",
          place: { name: "Old Dubai - Gold & Spice Souk", type: "attraction" },
        },
        {
          time: "13:30",
          end_time: "14:30",
          place: { name: "Lunch at Al Fahidi", type: "food" },
        },
        {
          time: "15:00",
          end_time: "21:00",
          place: { name: "Desert Safari & BBQ Dinner", type: "nature" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Beach & Luxury",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "10:30",
          end_time: "12:30",
          place: { name: "Palm Jumeirah & Atlantis", type: "attraction" },
        },
        {
          time: "13:00",
          end_time: "14:30",
          place: { name: "Beach Lunch", type: "food" },
        },
        {
          time: "15:00",
          end_time: "17:00",
          place: { name: "Dubai Marina Walk", type: "attraction" },
        },
        {
          time: "18:00",
          end_time: "20:00",
          place: { name: "Transfer to DXB Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: 25.1972,
      lng: 55.2744,
      title: "Burj Khalifa",
      type: "attraction",
      day: 1,
    },
    {
      lat: 25.1985,
      lng: 55.2796,
      title: "Dubai Mall",
      type: "attraction",
      day: 1,
    },
    {
      lat: 25.2653,
      lng: 55.301,
      title: "Gold Souk",
      type: "attraction",
      day: 2,
    },
    {
      lat: 25.1124,
      lng: 55.139,
      title: "Palm Jumeirah",
      type: "attraction",
      day: 3,
    },
    {
      lat: 25.0762,
      lng: 55.1332,
      title: "Dubai Marina",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 25.2048, lng: 55.2708 },
};

// Sydney Demo Data
export const SYDNEY_DEMO: DemoDestination = {
  keywords: [
    "sydney",
    "australia",
    "aussie",
    "harbour",
    "syd",
    "opera house",
    "bondi",
    "harbour bridge",
    "down under",
  ],
  name: "Sydney",
  country: "Australia",
  response: `G'day mate! Here's your 3-day Sydney adventure! 🇦🇺

Sydney offers stunning harbor views, iconic architecture, beautiful beaches, and a laid-back Australian lifestyle.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-QF10",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "10:30",
          arrival_airport: "SYD",
          arrival_city: "Sydney",
          arrival_time: "06:00",
          duration: "12h 00m",
          airline: "Qantas",
          flight_number: "QF10",
          aircraft: "Airbus A380",
          cabin_class: "Economy",
        },
      ],
      total_duration: "12h 00m",
      stops: 0,
      price: 72000,
      currency: "INR",
      price_formatted: "₹72,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Sydney Harbour",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "Circular Quay Hotel", type: "hotel" },
        },
        {
          time: "11:30",
          end_time: "13:30",
          place: { name: "Sydney Opera House Tour", type: "attraction" },
        },
        {
          time: "14:00",
          end_time: "15:00",
          place: { name: "Lunch at Opera Bar", type: "food" },
        },
        {
          time: "15:30",
          end_time: "17:30",
          place: { name: "Sydney Harbour Bridge Climb", type: "attraction" },
        },
        {
          time: "18:00",
          end_time: "19:30",
          place: { name: "The Rocks Walking Tour", type: "attraction" },
        },
        {
          time: "20:00",
          end_time: "22:00",
          place: { name: "Seafood Dinner at Circular Quay", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Beaches & Nature",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Aussie Breakfast", type: "food" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Bondi Beach", type: "nature" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Bondi to Coogee Coastal Walk", type: "nature" },
        },
        {
          time: "14:30",
          end_time: "15:30",
          place: { name: "Lunch at Bondi Icebergs", type: "food" },
        },
        {
          time: "16:00",
          end_time: "18:00",
          place: { name: "Taronga Zoo", type: "attraction" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Dinner in Darling Harbour", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Culture & Departure",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "10:30",
          end_time: "12:30",
          place: { name: "Royal Botanic Garden", type: "nature" },
        },
        {
          time: "13:00",
          end_time: "14:30",
          place: { name: "Lunch at Barangaroo", type: "food" },
        },
        {
          time: "15:00",
          end_time: "16:30",
          place: { name: "Queen Victoria Building", type: "attraction" },
        },
        {
          time: "17:30",
          end_time: "19:30",
          place: { name: "Transfer to Sydney Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: -33.8568,
      lng: 151.2153,
      title: "Opera House",
      type: "attraction",
      day: 1,
    },
    {
      lat: -33.8523,
      lng: 151.2108,
      title: "Harbour Bridge",
      type: "attraction",
      day: 1,
    },
    {
      lat: -33.8915,
      lng: 151.2767,
      title: "Bondi Beach",
      type: "nature",
      day: 2,
    },
    {
      lat: -33.8431,
      lng: 151.2411,
      title: "Taronga Zoo",
      type: "attraction",
      day: 2,
    },
    {
      lat: -33.8642,
      lng: 151.2166,
      title: "Botanic Garden",
      type: "nature",
      day: 3,
    },
  ],
  mapCenter: { lat: -33.8688, lng: 151.2093 },
};

// Rio de Janeiro Demo Data
export const RIO_DEMO: DemoDestination = {
  keywords: [
    "rio",
    "brazil",
    "brazilian",
    "copacabana",
    "rio de janeiro",
    "gig",
    "christ the redeemer",
    "sugarloaf",
    "ipanema",
    "corcovado",
  ],
  name: "Rio de Janeiro",
  country: "Brazil",
  response: `Bem-vindo ao Rio! Here's your 3-day Rio adventure! 🇧🇷

Rio de Janeiro offers stunning beaches, iconic landmarks, samba rhythms, and the warmth of Brazilian culture.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-LATAM",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "01:00",
          arrival_airport: "GIG",
          arrival_city: "Rio de Janeiro",
          arrival_time: "12:00",
          duration: "22h 00m",
          airline: "LATAM",
          flight_number: "LA704",
          aircraft: "Boeing 787-9",
          cabin_class: "Economy",
        },
      ],
      total_duration: "22h 00m",
      stops: 1,
      price: 115000,
      currency: "INR",
      price_formatted: "₹1.15L",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Iconic Rio",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "Copacabana Hotel", type: "hotel" },
        },
        {
          time: "12:00",
          end_time: "15:00",
          place: { name: "Christ the Redeemer", type: "attraction" },
        },
        {
          time: "15:30",
          end_time: "17:00",
          place: { name: "Sugarloaf Mountain Cable Car", type: "attraction" },
        },
        {
          time: "17:30",
          end_time: "19:00",
          place: { name: "Sunset at Sugarloaf", type: "nature" },
        },
        {
          time: "20:00",
          end_time: "22:00",
          place: { name: "Brazilian BBQ Dinner", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Beaches & Culture",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Beach Breakfast", type: "food" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Copacabana Beach", type: "nature" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Lunch at Ipanema", type: "food" },
        },
        {
          time: "14:30",
          end_time: "17:00",
          place: { name: "Santa Teresa Neighborhood", type: "attraction" },
        },
        {
          time: "18:00",
          end_time: "21:00",
          place: { name: "Lapa Samba Night", type: "attraction" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Nature & Departure",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Tijuca Forest Hike", type: "nature" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Lunch at Botafogo", type: "food" },
        },
        {
          time: "15:00",
          end_time: "18:00",
          place: { name: "Transfer to GIG Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: -22.9519,
      lng: -43.2105,
      title: "Christ the Redeemer",
      type: "attraction",
      day: 1,
    },
    {
      lat: -22.9492,
      lng: -43.1545,
      title: "Sugarloaf",
      type: "attraction",
      day: 1,
    },
    {
      lat: -22.9711,
      lng: -43.1822,
      title: "Copacabana",
      type: "nature",
      day: 2,
    },
    { lat: -22.9838, lng: -43.1896, title: "Ipanema", type: "nature", day: 2 },
    {
      lat: -22.9519,
      lng: -43.2067,
      title: "Tijuca Forest",
      type: "nature",
      day: 3,
    },
  ],
  mapCenter: { lat: -22.9068, lng: -43.1729 },
};

// Cape Town Demo Data
export const CAPE_TOWN_DEMO: DemoDestination = {
  keywords: [
    "cape town",
    "south africa",
    "capetown",
    "table mountain",
    "cpt",
    "cape of good hope",
    "waterfront",
    "robben island",
    "mother city",
  ],
  name: "Cape Town",
  country: "South Africa",
  response: `Welcome to the Mother City! Here's your 3-day Cape Town adventure! 🇿🇦

Cape Town offers dramatic scenery, rich history, incredible wine, and the majestic Table Mountain.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-SA-CPT",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "23:00",
          arrival_airport: "CPT",
          arrival_city: "Cape Town",
          arrival_time: "09:00",
          duration: "14h 00m",
          airline: "South African Airways",
          flight_number: "SA287",
          aircraft: "Airbus A340",
          cabin_class: "Economy",
        },
      ],
      total_duration: "14h 00m",
      stops: 1,
      price: 68000,
      currency: "INR",
      price_formatted: "₹68,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Table Mountain & City",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "V&A Waterfront Hotel", type: "hotel" },
        },
        {
          time: "11:30",
          end_time: "14:00",
          place: { name: "Table Mountain Cable Car", type: "attraction" },
        },
        {
          time: "14:30",
          end_time: "15:30",
          place: { name: "Lunch at Waterfront", type: "food" },
        },
        {
          time: "16:00",
          end_time: "18:00",
          place: { name: "Bo-Kaap Colorful Streets", type: "attraction" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Seafood Dinner", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Cape Peninsula",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Breakfast", type: "food" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Cape Point & Cape of Good Hope", type: "nature" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Boulders Beach Penguins", type: "nature" },
        },
        {
          time: "14:30",
          end_time: "15:30",
          place: { name: "Lunch at Simon's Town", type: "food" },
        },
        {
          time: "16:00",
          end_time: "18:00",
          place: { name: "Chapman's Peak Drive", type: "nature" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Dinner at Camps Bay", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Wine & Departure",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "10:00",
          end_time: "14:00",
          place: { name: "Stellenbosch Wine Tasting", type: "food" },
        },
        {
          time: "15:00",
          end_time: "18:00",
          place: { name: "Transfer to CPT Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: -33.9573,
      lng: 18.4034,
      title: "Table Mountain",
      type: "attraction",
      day: 1,
    },
    {
      lat: -33.9258,
      lng: 18.4232,
      title: "Bo-Kaap",
      type: "attraction",
      day: 1,
    },
    { lat: -34.3568, lng: 18.474, title: "Cape Point", type: "nature", day: 2 },
    {
      lat: -34.197,
      lng: 18.451,
      title: "Boulders Beach",
      type: "nature",
      day: 2,
    },
    { lat: -33.918, lng: 18.8712, title: "Stellenbosch", type: "food", day: 3 },
  ],
  mapCenter: { lat: -33.9249, lng: 18.4241 },
};

// Delhi Demo Data
export const DELHI_DEMO: DemoDestination = {
  keywords: [
    "delhi",
    "new delhi",
    "capital",
    "del",
    "india gate",
    "red fort",
    "qutub minar",
    "chandni chowk",
    "connaught place",
  ],
  name: "New Delhi",
  country: "India",
  response: `Namaste! Here's your 3-day Delhi adventure! 🇮🇳

Delhi offers a fascinating blend of ancient monuments, vibrant bazaars, delicious street food, and modern India.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-DELHI",
      segments: [
        {
          departure_airport: "BOM",
          departure_city: "Mumbai",
          departure_time: "07:00",
          arrival_airport: "DEL",
          arrival_city: "Delhi",
          arrival_time: "09:00",
          duration: "2h 00m",
          airline: "IndiGo",
          flight_number: "6E101",
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
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Mughal Delhi",
      activities: [
        {
          time: "09:00",
          end_time: "10:00",
          place: { name: "Connaught Place Hotel", type: "hotel" },
        },
        {
          time: "10:30",
          end_time: "13:00",
          place: { name: "Red Fort", type: "attraction" },
        },
        {
          time: "13:30",
          end_time: "14:30",
          place: { name: "Lunch at Chandni Chowk", type: "food" },
        },
        {
          time: "15:00",
          end_time: "17:00",
          place: { name: "Jama Masjid", type: "attraction" },
        },
        {
          time: "17:30",
          end_time: "19:00",
          place: { name: "Street Food Tour", type: "food" },
        },
        {
          time: "19:30",
          end_time: "21:00",
          place: { name: "Dinner at Karim's", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Heritage & Modern Delhi",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Paranthas Breakfast", type: "food" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Qutub Minar", type: "attraction" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Humayun's Tomb", type: "attraction" },
        },
        {
          time: "14:30",
          end_time: "15:30",
          place: { name: "Lunch at Khan Market", type: "food" },
        },
        {
          time: "16:00",
          end_time: "18:00",
          place: { name: "India Gate & Rajpath", type: "attraction" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Dinner at Indian Accent", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Spiritual Delhi",
      activities: [
        {
          time: "06:00",
          end_time: "08:00",
          place: { name: "Lotus Temple Sunrise", type: "attraction" },
        },
        {
          time: "08:30",
          end_time: "09:30",
          place: { name: "Breakfast", type: "food" },
        },
        {
          time: "10:00",
          end_time: "12:00",
          place: { name: "Akshardham Temple", type: "attraction" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Lunch", type: "food" },
        },
        {
          time: "14:30",
          end_time: "15:30",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "16:00",
          end_time: "18:00",
          place: { name: "Transfer to Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: 28.6562,
      lng: 77.241,
      title: "Red Fort",
      type: "attraction",
      day: 1,
    },
    {
      lat: 28.6507,
      lng: 77.2334,
      title: "Jama Masjid",
      type: "attraction",
      day: 1,
    },
    {
      lat: 28.5245,
      lng: 77.1855,
      title: "Qutub Minar",
      type: "attraction",
      day: 2,
    },
    {
      lat: 28.5933,
      lng: 77.2507,
      title: "Humayun's Tomb",
      type: "attraction",
      day: 2,
    },
    {
      lat: 28.6129,
      lng: 77.2295,
      title: "India Gate",
      type: "attraction",
      day: 2,
    },
    {
      lat: 28.5535,
      lng: 77.2588,
      title: "Lotus Temple",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 28.6139, lng: 77.209 },
};

// Beijing Demo Data
export const BEIJING_DEMO: DemoDestination = {
  keywords: [
    "beijing",
    "china",
    "chinese",
    "forbidden city",
    "great wall",
    "pek",
    "peking",
    "tiananmen",
    "temple of heaven",
  ],
  name: "Beijing",
  country: "China",
  response: `欢迎 (Welcome)! Here's your 3-day Beijing adventure! 🇨🇳

Beijing offers incredible ancient history, imperial palaces, the Great Wall, and delicious cuisine.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-CA948",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "01:30",
          arrival_airport: "PEK",
          arrival_city: "Beijing",
          arrival_time: "09:30",
          duration: "5h 30m",
          airline: "Air China",
          flight_number: "CA948",
          aircraft: "Airbus A330",
          cabin_class: "Economy",
        },
      ],
      total_duration: "5h 30m",
      stops: 0,
      price: 38000,
      currency: "INR",
      price_formatted: "₹38,000",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Imperial Beijing",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "Forbidden City Hotel", type: "hotel" },
        },
        {
          time: "11:30",
          end_time: "15:00",
          place: { name: "Forbidden City (Palace Museum)", type: "attraction" },
        },
        {
          time: "15:30",
          end_time: "17:00",
          place: { name: "Tiananmen Square", type: "attraction" },
        },
        {
          time: "17:30",
          end_time: "19:00",
          place: { name: "Wangfujing Street", type: "attraction" },
        },
        {
          time: "19:30",
          end_time: "21:00",
          place: { name: "Peking Duck Dinner", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Great Wall Day",
      activities: [
        {
          time: "06:00",
          end_time: "07:00",
          place: { name: "Early Breakfast", type: "food" },
        },
        {
          time: "07:30",
          end_time: "10:00",
          place: { name: "Drive to Mutianyu", type: "transport" },
        },
        {
          time: "10:30",
          end_time: "15:00",
          place: { name: "Great Wall of China (Mutianyu)", type: "attraction" },
        },
        {
          time: "15:30",
          end_time: "18:00",
          place: { name: "Return to Beijing", type: "transport" },
        },
        {
          time: "19:00",
          end_time: "21:00",
          place: { name: "Hotpot Dinner", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Temples & Gardens",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Dim Sum Breakfast", type: "food" },
        },
        {
          time: "09:30",
          end_time: "11:30",
          place: { name: "Temple of Heaven", type: "attraction" },
        },
        {
          time: "12:00",
          end_time: "13:00",
          place: { name: "Lunch", type: "food" },
        },
        {
          time: "13:30",
          end_time: "15:00",
          place: { name: "Summer Palace", type: "attraction" },
        },
        {
          time: "15:30",
          end_time: "16:30",
          place: { name: "Hotel Checkout", type: "hotel" },
        },
        {
          time: "17:00",
          end_time: "19:00",
          place: { name: "Transfer to Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: 39.9163,
      lng: 116.3972,
      title: "Forbidden City",
      type: "attraction",
      day: 1,
    },
    {
      lat: 39.902,
      lng: 116.3912,
      title: "Tiananmen Square",
      type: "attraction",
      day: 1,
    },
    {
      lat: 40.4319,
      lng: 116.5704,
      title: "Great Wall (Mutianyu)",
      type: "attraction",
      day: 2,
    },
    {
      lat: 39.8822,
      lng: 116.4066,
      title: "Temple of Heaven",
      type: "attraction",
      day: 3,
    },
    {
      lat: 39.999,
      lng: 116.2755,
      title: "Summer Palace",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 39.9042, lng: 116.4074 },
};

// Mexico City Demo Data
export const MEXICO_CITY_DEMO: DemoDestination = {
  keywords: [
    "mexico city",
    "mexico",
    "cdmx",
    "aztec",
    "mex",
    "teotihuacan",
    "zocalo",
    "frida kahlo",
    "ciudad de mexico",
  ],
  name: "Mexico City",
  country: "Mexico",
  response: `¡Bienvenidos! Here's your 3-day Mexico City adventure! 🇲🇽

Mexico City offers incredible Aztec history, vibrant culture, amazing food, and colorful neighborhoods.

Here's your personalized trip plan:`,
  flights: [
    {
      id: "FL-AM001",
      segments: [
        {
          departure_airport: "DEL",
          departure_city: "Delhi",
          departure_time: "14:00",
          arrival_airport: "MEX",
          arrival_city: "Mexico City",
          arrival_time: "08:00",
          duration: "24h 00m",
          airline: "Aeromexico",
          flight_number: "AM001",
          aircraft: "Boeing 787-9",
          cabin_class: "Economy",
        },
      ],
      total_duration: "24h 00m",
      stops: 1,
      price: 125000,
      currency: "INR",
      price_formatted: "₹1.25L",
      booking_class: "Economy",
    },
  ],
  itinerary: [
    {
      day_number: 1,
      date: getDate(7),
      theme: "Historic Center",
      activities: [
        {
          time: "10:00",
          end_time: "11:00",
          place: { name: "Roma Norte Hotel", type: "hotel" },
        },
        {
          time: "11:30",
          end_time: "13:30",
          place: {
            name: "Zócalo & Metropolitan Cathedral",
            type: "attraction",
          },
        },
        {
          time: "14:00",
          end_time: "15:00",
          place: { name: "Tacos Lunch", type: "food" },
        },
        {
          time: "15:30",
          end_time: "17:30",
          place: { name: "Templo Mayor (Aztec Ruins)", type: "attraction" },
        },
        {
          time: "18:00",
          end_time: "19:30",
          place: { name: "Palacio de Bellas Artes", type: "attraction" },
        },
        {
          time: "20:00",
          end_time: "22:00",
          place: { name: "Dinner at Pujol", type: "food" },
        },
      ],
    },
    {
      day_number: 2,
      date: getDate(8),
      theme: "Culture & Art",
      activities: [
        {
          time: "08:00",
          end_time: "09:00",
          place: { name: "Chilaquiles Breakfast", type: "food" },
        },
        {
          time: "09:30",
          end_time: "12:00",
          place: { name: "Frida Kahlo Museum", type: "attraction" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Coyoacán Market Lunch", type: "food" },
        },
        {
          time: "14:30",
          end_time: "17:00",
          place: {
            name: "National Museum of Anthropology",
            type: "attraction",
          },
        },
        {
          time: "17:30",
          end_time: "19:00",
          place: { name: "Chapultepec Park", type: "nature" },
        },
        {
          time: "19:30",
          end_time: "21:30",
          place: { name: "Mezcal Tasting & Dinner", type: "food" },
        },
      ],
    },
    {
      day_number: 3,
      date: getDate(9),
      theme: "Pyramids & Departure",
      activities: [
        {
          time: "06:00",
          end_time: "07:00",
          place: { name: "Early Checkout", type: "hotel" },
        },
        {
          time: "07:30",
          end_time: "12:00",
          place: { name: "Teotihuacán Pyramids", type: "attraction" },
        },
        {
          time: "12:30",
          end_time: "14:00",
          place: { name: "Lunch near Pyramids", type: "food" },
        },
        {
          time: "15:00",
          end_time: "18:00",
          place: { name: "Transfer to MEX Airport", type: "transport" },
        },
      ],
    },
  ],
  mapMarkers: [
    {
      lat: 19.4326,
      lng: -99.1332,
      title: "Zócalo",
      type: "attraction",
      day: 1,
    },
    {
      lat: 19.4352,
      lng: -99.1313,
      title: "Templo Mayor",
      type: "attraction",
      day: 1,
    },
    {
      lat: 19.3559,
      lng: -99.1626,
      title: "Frida Kahlo Museum",
      type: "attraction",
      day: 2,
    },
    {
      lat: 19.426,
      lng: -99.1861,
      title: "Anthropology Museum",
      type: "attraction",
      day: 2,
    },
    {
      lat: 19.6925,
      lng: -98.8438,
      title: "Teotihuacán",
      type: "attraction",
      day: 3,
    },
  ],
  mapCenter: { lat: 19.4326, lng: -99.1332 },
};

// All demo destinations
export const DEMO_DESTINATIONS: DemoDestination[] = [
  MUMBAI_DEMO,
  SINGAPORE_DEMO,
  TOKYO_DEMO,
  PARIS_DEMO,
  NEW_YORK_DEMO,
  LONDON_DEMO,
  DUBAI_DEMO,
  SYDNEY_DEMO,
  RIO_DEMO,
  CAPE_TOWN_DEMO,
  DELHI_DEMO,
  BEIJING_DEMO,
  MEXICO_CITY_DEMO,
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
