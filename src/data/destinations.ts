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
            "https://tse1.mm.bing.net/th?q=Cappadocia+Turkey&w=1200&c=7&rs=1&p=0",
        hotels: "1,991",
        description:
            "Drift over fairy chimneys and honeycomb hills in a hot air balloon at sunrise.",
        longDescription: "Cappadocia is a geological oddity of honeycombed hills and towering boulders of otherworldly beauty. The fantastical topography is matched by the human history here. People have utilized the region's soft stone conducting into the rock to create underground dwellings, chapels, and entire cities.",
        budget: "$80 - $150 / day",
        currency: "TRY (Lira)",
        bestTimeToVisit: "April to June, Sept to Oct",
        popular: false,
        attractions: [
            { name: "Goreme Open Air Museum", image: "https://tse1.mm.bing.net/th?q=Goreme+Open+Air+Museum&w=1200&c=7&rs=1&p=0", rating: 4.8, reviews: "12k", category: "History" },
            { name: "Uchisar Castle", image: "https://tse1.mm.bing.net/th?q=Uchisar+Castle&w=1200&c=7&rs=1&p=0", rating: 4.6, reviews: "8.5k", category: "Landmark" },
            { name: "Pasabag Valley", image: "https://tse1.mm.bing.net/th?q=Pasabag+Valley&w=1200&c=7&rs=1&p=0", rating: 4.7, reviews: "5k", category: "Nature" },
        ]
    },
    
    {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        flag: "🇮🇩",
        image:
            "https://tse1.mm.bing.net/th?q=Bali+Indonesia&w=1200&c=7&rs=1&p=0",
        hotels: "1,345",
        description:
            "Discover tropical beaches, volcanic mountains, and lush rice paddies in paradise.",
        longDescription: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns.",
        budget: "$40 - $100 / day",
        currency: "IDR (Rupiah)",
        bestTimeToVisit: "May to September",
        popular: true,
        attractions: [
            { name: "Uluwatu Temple", image: "https://tse1.mm.bing.net/th?q=Uluwatu+Temple&w=1200&c=7&rs=1&p=0", rating: 4.8, reviews: "25k", category: "Culture" },
            { name: "Sacred Monkey Forest", image: "https://tse1.mm.bing.net/th?q=Sacred+Monkey+Forest+Ubud&w=1200&c=7&rs=1&p=0", rating: 4.5, reviews: "30k", category: "Nature" },
            { name: "Tegallalang Rice Terrace", image: "https://tse1.mm.bing.net/th?q=Tegallalang+Rice+Terrace&w=1200&c=7&rs=1&p=0", rating: 4.7, reviews: "18k", category: "Nature" },
        ]
    },
    {
        id: 3,
        name: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        image:
            "https://tse1.mm.bing.net/th?q=Dubai+UAE&w=1200&c=7&rs=1&p=0",
        hotels: "2,345",
        description:
            "Experience the ultimate in modern luxury, shopping, and lively nightlife.",
        longDescription: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with jets and lights choreographed to music.",
        budget: "$150 - $400 / day",
        currency: "AED (Dirham)",
        bestTimeToVisit: "November to March",
        popular: true,
        attractions: [
            { name: "Burj Khalifa", image: "https://tse1.mm.bing.net/th?q=Burj+Khalifa&w=1200&c=7&rs=1&p=0", rating: 4.9, reviews: "80k", category: "Landmark" },
            { name: "The Dubai Mall", image: "https://tse1.mm.bing.net/th?q=The+Dubai+Mall&w=1200&c=7&rs=1&p=0", rating: 4.7, reviews: "60k", category: "Shopping" },
            { name: "Palm Jumeirah", image: "https://tse1.mm.bing.net/th?q=Palm+Jumeirah&w=1200&c=7&rs=1&p=0", rating: 4.8, reviews: "15k", category: "Island" },
        ]
    },
    {
        id: 4,
        name: "Agra",
        country: "India",
        flag: "🇮🇳",
        image:
            "https://tse1.mm.bing.net/th?q=Agra+India&w=1200&c=7&rs=1&p=0",
        hotels: "890",
        description:
            "Witness the timeless beauty of the Taj Mahal, a symbol of eternal love.",
        longDescription: "Agra is a city on the banks of the Yamuna river in the Indian state of Uttar Pradesh. It is a major tourist destination because of its many Mughal-era buildings, most notably the Taj Mahal, Agra Fort and Fatehpur Sikri, all of which are UNESCO World Heritage Sites.",
        budget: "$30 - $80 / day",
        currency: "INR (Rupee)",
        bestTimeToVisit: "October to March",
        attractions: [
            { name: "Taj Mahal", image: "https://tse1.mm.bing.net/th?q=Taj+Mahal&w=1200&c=7&rs=1&p=0", rating: 4.9, reviews: "100k", category: "Wonder" },
            { name: "Agra Fort", image: "https://tse1.mm.bing.net/th?q=Agra+Fort&w=1200&c=7&rs=1&p=0", rating: 4.6, reviews: "20k", category: "History" },
            { name: "Mehtab Bagh", image: "https://tse1.mm.bing.net/th?q=Mehtab+Bagh&w=1200&c=7&rs=1&p=0", rating: 4.4, reviews: "5k", category: "Garden" },
        ]
    },
    {
        id: 5,
        name: "Paris",
        country: "France",
        flag: "🇫🇷",
        image:
            "https://tse1.mm.bing.net/th?q=Paris+France&w=1200&c=7&rs=1&p=0",
        hotels: "3,100",
        description:
            "Walk the romantic streets of the City of Light and marvel at the Eiffel Tower.",
        longDescription: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques.",
        budget: "$120 - $250 / day",
        currency: "EUR (Euro)",
        bestTimeToVisit: "June to August",
        popular: true,
        attractions: [
            { name: "Eiffel Tower", image: "https://tse1.mm.bing.net/th?q=Eiffel+Tower&w=1200&c=7&rs=1&p=0", rating: 4.8, reviews: "150k", category: "Landmark" },
            { name: "Louvre Museum", image: "https://tse1.mm.bing.net/th?q=Louvre+Museum&w=1200&c=7&rs=1&p=0", rating: 4.7, reviews: "90k", category: "Museum" },
        ]
    },
    {
        id: 6,
        name: "Ha Long Bay",
        country: "Vietnam",
        flag: "🇻🇳",
        image:
            "https://tse1.mm.bing.net/th?q=Ha+Long+Bay&w=1200&c=7&rs=1&p=0",
        hotels: "2,178",
        description:
            "Navigate through emerald waters and thousands of towering limestone islands.",
        longDescription: "Ha Long Bay is a UNESCO World Heritage Site and popular travel destination in Quang Ninh Province, Vietnam. The name Ha Long means 'descending dragon'. The bay features thousands of limestone karsts and isles in various shapes and sizes.",
        budget: "$40 - $100 / day",
        currency: "VND (Dong)",
        bestTimeToVisit: "March to May",
        attractions: [
            { name: "Cat Ba Island", image: "https://tse1.mm.bing.net/th?q=Cat+Ba+Island&w=1200&c=7&rs=1&p=0", rating: 4.5, reviews: "12k", category: "Island" },
        ]
    },
    {
        id: 7,
        name: "Kyoto",
        country: "Japan",
        flag: "🇯🇵",
        image:
            "https://tse1.mm.bing.net/th?q=Kyoto+Japan&w=1200&c=7&rs=1&p=0",
        hotels: "1,560",
        description:
            "Immerse yourself in classical Buddhist temples, gardens, and imperial palaces.",
        longDescription: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining.",
        budget: "$100 - $200 / day",
        currency: "JPY (Yen)",
        bestTimeToVisit: "Oct to Nov, Mar to May",
        attractions: [
            { name: "Fushimi Inari Taisha", image: "https://tse1.mm.bing.net/th?q=Fushimi+Inari+Taisha&w=1200&c=7&rs=1&p=0", rating: 4.9, reviews: "40k", category: "Shrine" },
        ]
    },
    {
        id: 8,
        name: "New York",
        country: "USA",
        flag: "🇺🇸",
        image:
            "https://tse1.mm.bing.net/th?q=New+York+City&w=1200&c=7&rs=1&p=0",
        hotels: "4,200",
        description:
            "Feel the energy of the concrete jungle where dreams are made of.",
        longDescription: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park.",
        budget: "$200 - $500 / day",
        currency: "USD (Dollar)",
        bestTimeToVisit: "April to June",
        popular: true,
        attractions: [
            { name: "Times Square", image: "https://tse1.mm.bing.net/th?q=Times+Square+NYC&w=1200&c=7&rs=1&p=0", rating: 4.7, reviews: "200k", category: "City" },
            { name: "Central Park", image: "https://tse1.mm.bing.net/th?q=Central+Park+NYC&w=1200&c=7&rs=1&p=0", rating: 4.9, reviews: "150k", category: "Park" },
        ]
    },
];
