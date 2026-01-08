export interface Attraction {
    name: string;
    image: string;
    rating: number;
    reviews: string;
    category: string;
}

export interface Destination {
    id: number;
    name: string;
    country: string;
    flag: string;
    image: string;
    hotels: string;
    description: string;
    longDescription?: string;
    budget?: string; // e.g. "$50 - $100 / day"
    currency?: string; // e.g. "INR" or "USD"
    bestTimeToVisit?: string;
    popular?: boolean;
    attractions: Attraction[];
}

export const DESTINATIONS: Destination[] = [
    {
        id: 1,
        name: "Cappadocia",
        country: "Turkey",
        flag: "🇹🇷",
        image:
            "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop",
        hotels: "1,991",
        description:
            "Drift over fairy chimneys and honeycomb hills in a hot air balloon at sunrise.",
        longDescription: "Cappadocia is a geological oddity of honeycombed hills and towering boulders of otherworldly beauty. The fantastical topography is matched by the human history here. People have utilized the region's soft stone conducting into the rock to create underground dwellings, chapels, and entire cities.",
        budget: "$80 - $150 / day",
        currency: "TRY (Lira)",
        bestTimeToVisit: "April to June, Sept to Oct",
        popular: false,
        attractions: [
            { name: "Goreme Open Air Museum", image: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?q=80&w=1000&auto=format&fit=crop", rating: 4.8, reviews: "12k", category: "History" },
            { name: "Uchisar Castle", image: "https://images.unsplash.com/photo-1643208589889-0728c0cc137e?q=80&w=1000&auto=format&fit=crop", rating: 4.6, reviews: "8.5k", category: "Landmark" },
            { name: "Pasabag Valley", image: "https://images.unsplash.com/photo-1612882835394-5bdd24c3d79e?q=80&w=1000&auto=format&fit=crop", rating: 4.7, reviews: "5k", category: "Nature" },
        ]
    },
    {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        flag: "🇮🇩",
        image:
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
        hotels: "1,345",
        description:
            "Discover tropical beaches, volcanic mountains, and lush rice paddies in paradise.",
        longDescription: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns.",
        budget: "$40 - $100 / day",
        currency: "IDR (Rupiah)",
        bestTimeToVisit: "May to September",
        popular: true,
        attractions: [
            { name: "Uluwatu Temple", image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1000&auto=format&fit=crop", rating: 4.8, reviews: "25k", category: "Culture" },
            { name: "Sacred Monkey Forest", image: "https://images.unsplash.com/photo-1544634076-a90160aa7264?q=80&w=1000&auto=format&fit=crop", rating: 4.5, reviews: "30k", category: "Nature" },
            { name: "Tegallalang Rice Terrace", image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?q=80&w=1000&auto=format&fit=crop", rating: 4.7, reviews: "18k", category: "Nature" },
        ]
    },
    {
        id: 3,
        name: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        image:
            "https://images.unsplash.com/photo-1512453979798-5ea904ac22ac?q=80&w=2070&auto=format&fit=crop",
        hotels: "2,345",
        description:
            "Experience the ultimate in modern luxury, shopping, and lively nightlife.",
        longDescription: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with jets and lights choreographed to music.",
        budget: "$150 - $400 / day",
        currency: "AED (Dirham)",
        bestTimeToVisit: "November to March",
        popular: true,
        attractions: [
            { name: "Burj Khalifa", image: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1000&auto=format&fit=crop", rating: 4.9, reviews: "80k", category: "Landmark" },
            { name: "The Dubai Mall", image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=1000&auto=format&fit=crop", rating: 4.7, reviews: "60k", category: "Shopping" },
            { name: "Palm Jumeirah", image: "https://images.unsplash.com/photo-1512453979798-5ea904ac22ac?q=80&w=1000&auto=format&fit=crop", rating: 4.8, reviews: "15k", category: "Island" },
        ]
    },
    {
        id: 4,
        name: "Agra",
        country: "India",
        flag: "🇮🇳",
        image:
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
        hotels: "890",
        description:
            "Witness the timeless beauty of the Taj Mahal, a symbol of eternal love.",
        longDescription: "Agra is a city on the banks of the Yamuna river in the Indian state of Uttar Pradesh. It is a major tourist destination because of its many Mughal-era buildings, most notably the Taj Mahal, Agra Fort and Fatehpur Sikri, all of which are UNESCO World Heritage Sites.",
        budget: "$30 - $80 / day",
        currency: "INR (Rupee)",
        bestTimeToVisit: "October to March",
        attractions: [
            { name: "Taj Mahal", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop", rating: 4.9, reviews: "100k", category: "Wonder" },
            { name: "Agra Fort", image: "https://images.unsplash.com/photo-1599661046289-e31897812e0a?q=80&w=1000&auto=format&fit=crop", rating: 4.6, reviews: "20k", category: "History" },
            { name: "Mehtab Bagh", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop", rating: 4.4, reviews: "5k", category: "Garden" },
        ]
    },
    {
        id: 5,
        name: "Paris",
        country: "France",
        flag: "🇫🇷",
        image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2146&auto=format&fit=crop",
        hotels: "3,100",
        description:
            "Walk the romantic streets of the City of Light and marvel at the Eiffel Tower.",
        longDescription: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques.",
        budget: "$120 - $250 / day",
        currency: "EUR (Euro)",
        bestTimeToVisit: "June to August",
        popular: true,
        attractions: [
            { name: "Eiffel Tower", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=1000&auto=format&fit=crop", rating: 4.8, reviews: "150k", category: "Landmark" },
            { name: "Louvre Museum", image: "https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=1000&auto=format&fit=crop", rating: 4.7, reviews: "90k", category: "Museum" },
        ]
    },
    {
        id: 6,
        name: "Ha Long Bay",
        country: "Vietnam",
        flag: "🇻🇳",
        image:
            "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=1935&auto=format&fit=crop",
        hotels: "2,178",
        description:
            "Navigate through emerald waters and thousands of towering limestone islands.",
        longDescription: "Ha Long Bay is a UNESCO World Heritage Site and popular travel destination in Quang Ninh Province, Vietnam. The name Ha Long means 'descending dragon'. The bay features thousands of limestone karsts and isles in various shapes and sizes.",
        budget: "$40 - $100 / day",
        currency: "VND (Dong)",
        bestTimeToVisit: "March to May",
        attractions: [
            { name: "Cat Ba Island", image: "https://images.unsplash.com/photo-1535772420556-91e7040263f3?q=80&w=1000&auto=format&fit=crop", rating: 4.5, reviews: "12k", category: "Island" },
        ]
    },
    {
        id: 7,
        name: "Kyoto",
        country: "Japan",
        flag: "🇯🇵",
        image:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
        hotels: "1,560",
        description:
            "Immerse yourself in classical Buddhist temples, gardens, and imperial palaces.",
        longDescription: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining.",
        budget: "$100 - $200 / day",
        currency: "JPY (Yen)",
        bestTimeToVisit: "Oct to Nov, Mar to May",
        attractions: [
            { name: "Fushimi Inari Taisha", image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1000&auto=format&fit=crop", rating: 4.9, reviews: "40k", category: "Shrine" },
        ]
    },
    {
        id: 8,
        name: "New York",
        country: "USA",
        flag: "🇺🇸",
        image:
            "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?cs=srgb&dl=pexels-mikel-1239162.jpg&fm=jpg",
        hotels: "4,200",
        description:
            "Feel the energy of the concrete jungle where dreams are made of.",
        longDescription: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park.",
        budget: "$200 - $500 / day",
        currency: "USD (Dollar)",
        bestTimeToVisit: "April to June",
        popular: true,
        attractions: [
            { name: "Times Square", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1000&auto=format&fit=crop", rating: 4.7, reviews: "200k", category: "City" },
            { name: "Central Park", image: "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=1000&auto=format&fit=crop", rating: 4.9, reviews: "150k", category: "Park" },
        ]
    },
];
