

// Legacy itinerary format (mock data)
export interface DailyItinerary {
    day: number;
    title: string;
    activities: string[];
}

// New itinerary format (from AI/saved trips) - more flexible
export interface ItineraryActivity {
    time?: string;
    start_time?: string;
    end_time?: string;
    title?: string;
    place?: { name?: string; type?: string };
    location?: string;
    duration?: string;
    type?: string;
    description?: string;
    notes?: string[];
    travel_duration?: string;
    travel_method?: string;
    travel_note?: string;
}

export interface ItineraryDay {
    day_number: number;
    date: string;
    theme?: string;
    activities: ItineraryActivity[];
}

// Union type that can represent both formats
export type ItineraryItem = DailyItinerary | ItineraryDay;

export interface Trip {
    id: string;
    title: string;
    destination: string;
    dateRange: string;
    imageUrl: string;
    status: "completed" | "upcoming" | "planning" | "suggested"; // Added suggested
    itinerary: ItineraryItem[];
    stats: {
        duration: string;
        placesVisited: number;
        distance: string;
    };
    // Optional fields for suggestions
    matchScore?: number;
    description?: string;
}


export const myTrips: Trip[] = [
    {
        id: "tokyo-2024",
        title: "Tokyo Adventure",
        destination: "Tokyo, Japan",
        dateRange: "April 10 - April 13, 2024", // 4 Days: 10, 11, 12, 13
        imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop",
        status: "completed",
        stats: {
            duration: "4 Days",
            placesVisited: 12,
            distance: "230 km", // Approx local travel + Hakone round trip
        },
        itinerary: [
            {
                day: 1,
                title: "Arrival in Shinjuku",
                activities: ["Check-in at Hotel Gracery", "Evening walk in Omoide Yokocho", "Dinner at Ichiran Ramen"],
            },
            {
                day: 2,
                title: "Ancient & Modern",
                activities: ["Meiji Shrine morning walk", "Harajuku fashion street", "Shibuya Crossing at sunset"],
            },
            {
                day: 3,
                title: "Digital Art & Bay",
                activities: ["TeamLab Planets", "Odaiba Statue of Liberty", "Rainbow Bridge view"],
            },
            {
                day: 4,
                title: "Day Trip to Hakone",
                activities: ["Romancecar to Hakone", "Lake Ashi Cruise", "Open air Onsen"],
            },
        ],
    },
    {
        id: "paris-2023",
        title: "Romantic Paris Getaway",
        destination: "Paris, France",
        dateRange: "Sept 5 - Sept 6, 2023", // 2 Days: 5, 6
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2146&auto=format&fit=crop",
        status: "completed",
        stats: {
            duration: "2 Days",
            placesVisited: 6,
            distance: "45 km", // Mostly city travel
        },
        itinerary: [
            {
                day: 1,
                title: "The Iron Lady",
                activities: ["Eiffel Tower Picnic", "Seine River Cruise", "Dinner in Le Marais"],
            },
            {
                day: 2,
                title: "Art History",
                activities: ["Louvre Museum (Mona Lisa)", "Tuileries Garden", "Angelina Hot Chocolate"],
            },
        ],
    },
    {
        id: "bali-2023",
        title: "Bali Yoga Retreat",
        destination: "Ubud, Bali",
        dateRange: "Jan 15 - Jan 16, 2023", // 2 Days: 15, 16
        imageUrl: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop",
        status: "completed",
        stats: {
            duration: "2 Days",
            placesVisited: 5,
            distance: "85 km", // Ubud local + temple trips
        },
        itinerary: [
            {
                day: 1,
                title: "Welcome to the Jungle",
                activities: ["Arrive in Ubud", "Welcome Yoga Session", "Organic Dinner"],
            },
            {
                day: 2,
                title: "Sacred Waters",
                activities: ["Tirta Empul Temple", "Rice Terrace Trek", "Meditation"],
            },
        ],
    },
    {
        id: "kyoto-2022",
        title: "Kyoto Cultural Dive",
        destination: "Kyoto, Japan",
        dateRange: "Nov 10 - Nov 12, 2022", // 3 Days: 10, 11, 12
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
        status: "completed",
        stats: {
            duration: "3 Days",
            placesVisited: 9,
            distance: "60 km", // City travel
        },
        itinerary: [
            { day: 1, title: "Arashiyama Bamboo Grove", activities: ["Bamboo Forest Walk", "Monkey Park", "Togetsukyo Bridge"] },
            { day: 2, title: "Golden Pavilion", activities: ["Kinkaku-ji", "Ryoan-ji Rock Garden", "Tea Ceremony"] },
            { day: 3, title: "Fushimi Inari", activities: ["Torii Gates Hike", "Sake Tasting", "Gion Night Walk"] },
        ],
    },
    {
        id: "new-zealand-2021",
        title: "Middle Earth Expedition",
        destination: "Queenstown, NZ",
        dateRange: "Dec 1 - Dec 2, 2021", // 2 Days: 1, 2
        imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop",
        status: "completed",
        stats: {
            duration: "2 Days",
            placesVisited: 6,
            distance: "580 km", // Queenstown -> Milford Sound round trip is ~580km
        },
        itinerary: [
            { day: 1, title: "Arrival in Queenstown", activities: ["Lake Wakatipu Walk", "Fergburger Dinner"] },
            { day: 2, title: "Milford Sound", activities: ["Fjord Cruise", "Waterfall Chasing", "Scenic Flight"] },
        ],
    },
];

export const suggestions: Trip[] = [
    {
        id: "sug-1",
        title: "Swiss Alps Skiing",
        destination: "Zermatt, Switzerland",
        description: "Based on your love for nature in NZ and Bali, experience the winter wonderland of Zermatt.",
        imageUrl: "https://images.unsplash.com/photo-1552353617-3bfd679b3bdd?q=80&w=2000&auto=format&fit=crop",
        matchScore: 95,
        status: "suggested",
        dateRange: "Recommended: Dec - Feb",
        stats: { duration: "5 Days", placesVisited: 7, distance: "120 km" }, // Local ski movement
        itinerary: [
            { day: 1, title: "Arrival in Zermatt", activities: ["Train from Geneva", "Check-in with Matterhorn View", "Fondue Dinner"] },
            { day: 2, title: "Ski Basics", activities: ["Ski Lesson at Sunnegga", "Lunch at Chez Vrony", "Apres-ski"] },
            { day: 3, title: "Gornergrat", activities: ["Gornergrat Railway", "Observation Platform", "Igloo Village"] },
            { day: 4, title: "Glacier Paradise", activities: ["Cable car to Matterhorn Glacier", "Ice Palace", "Snow Tubing"] },
            { day: 5, title: "Village charm", activities: ["Matterhorn Museum", "Shopping in Bahnhofstrasse", "Departure"] },
        ]
    },
    {
        id: "sug-2",
        title: "Santorini Sunset",
        destination: "Santorini, Greece",
        description: "You enjoyed the romance of Paris; Santorini offers breathtaking views and romantic vibes.",
        imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2940&auto=format&fit=crop", // Fixed Image
        matchScore: 88,
        status: "suggested",
        dateRange: "Recommended: May - Sept",
        stats: { duration: "4 Days", placesVisited: 6, distance: "80 km" }, // Island small scale
        itinerary: [
            { day: 1, title: "Oia Sunset", activities: ["Arrival in Thira", "Transfer to Oia", "Famed Sunset View"] },
            { day: 2, title: "Volcanic Cruise", activities: ["Boat tour to Volcano", "Hot Springs Swim", "Thirassia Lunch"] },
            { day: 3, title: "Wine & History", activities: ["Akrotiri Ruins", "Red Beach", "Santo Wines Tasting"] },
            { day: 4, title: "Fira Exploration", activities: ["Cable Car ride", "Old Port", "Departure"] }
        ]
    },
    {
        id: "sug-3",
        title: "Kyoto Cherry Blossoms",
        destination: "Kyoto, Japan",
        description: "Since you loved Tokyo, explore the traditional side of Japan during Sakura season.",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
        matchScore: 92,
        status: "suggested",
        dateRange: "Recommended: Mar - Apr",
        stats: { duration: "4 Days", placesVisited: 10, distance: "75 km" },
        itinerary: [
            { day: 1, title: "Philosopher's Path", activities: ["Silver Pavilion", "Walk along the canal", "Nanzen-ji"] },
            { day: 2, title: "Arashiyama", activities: ["Bamboo Grove", "Tenryu-ji", "River Boat Ride"] },
            { day: 3, title: "Gion Geisha District", activities: ["Kiyomizu-dera", "Nineizaka Stairs", "Tea Ceremony"] },
            { day: 4, title: "Fushimi Inari", activities: ["Early morning hike", "Tofuku-ji", "Departure"] }
        ]
    },
    {
        id: "sug-4",
        title: "Amalfi Coast Drive",
        destination: "Amalfi, Italy",
        description: "Stunning coastal views and charming villages, perfect for a relaxing yet scenic trip.",
        imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=3333&auto=format&fit=crop", // Cinque Terre / Amalfi style coastal
        matchScore: 85,
        status: "suggested",
        dateRange: "Recommended: Jun - Aug",
        stats: { duration: "5 Days", placesVisited: 5, distance: "150 km" }, // Coastal drive winding roads
        itinerary: [
            { day: 1, title: "Sorrento Base", activities: ["Arrival in Sorrento", "Piazza Tasso", "Limoncello Tasting"] },
            { day: 2, title: "Positano", activities: ["Ferry to Positano", "Beach time", "Cliffside Dinner"] },
            { day: 3, title: "Capri Day Trip", activities: ["Blue Grotto", "Chairlift to Monte Solaro", "Gardens of Augustus"] },
            { day: 4, title: "Amalfi & Ravello", activities: ["Duomo di Amalfi", "Villa Cimbrone", "Ravello Music Festival"] },
            { day: 5, title: "Pompeii", activities: ["Ruins Tour", "Vesuvius View", "Departure"] }
        ]
    },
];
