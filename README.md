# 🌍 AI Travel Planner

A next-generation, AI-powered travel planning application that creates personalized itineraries, finds flights, and visualizes trips on an interactive 3D globe. Built with a focus on premium aesthetics and fluid user experience.

![Project Banner](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop)

## ✨ Key Features

- **🤖 AI Travel Assistant**: Intelligent chat interface that understands natural language to plan complex trips.
- **🗺️ Interactive 3D Globe**: Visualizes destinations and flight paths on a stunning 3D globe using `react-globe.gl`.
- **✈️ Real-time Flight Search**: Integrated flight search with realistic mock data and visual flight cards.
- **📅 Dynamic Itinerary Generation**: Automatically generates detailed day-by-day itineraries with activities, hotels, and dining options.
- **📍 Interactive Maps**: Detailed city maps with markers for all itinerary stops using Google Maps integration.
- **🎨 Premium UI/UX**: Glassmorphism design system, dark mode, smooth animations, and responsive layouts.
- **💾 Trip Persistence**: Save your planned trips and chat history securely with Firebase.
- **� Secure Authentication**: Google and Email/Password authentication flow.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- **State Management**: React Hooks & Context API
- **Maps & Visuals**:
  - `react-globe.gl` for 3D globe visualization
  - `@react-google-maps/api` for detailed maps
  - `framer-motion` for animations
- **Backend / Services**:
  - **Firebase**: Authentication, Firestore (Database), and Storage
  - **Generative AI**: Custom AI integration for trip planning logic

## 🏗️ Technical Architecture

### Core Systems

#### 1. Generative UI Engine (`useChat.ts`)

The application uses a custom streaming protocol to mix natural language text with structured UI data.

- **Hybrid Streaming**: The AI response contains both markdown text and JSON blocks for UI components.
- **Dynamic Rendering**: The `MessageBubble` component detects UI types (`flight_card`, `itinerary_card`, `map_view`) and dynamically renders the appropriate interactive React components.
- **State management**: Maintains a complex conversation state including flight parameters, selected dates, and user preferences.

#### 2. Persistence Layer

- **Firestore Sync**: Uses `useChatHistory` hook for real-time synchronization of chat messages and sessions.
- **Optimistic Updates**: UI updates immediately while data persists in the background.
- **Structured Data Storage**: Itineraries are stored as structured JSON objects within Firestore documents, allowing for easy retrieval and "Add to Calendar" functionality later.

#### 3. Interactive 3D Visualization

- **React Globe GL**: Uses a custom implementation of `react-globe.gl` to render arcs for flights and markers for destinations.
- **Camera Control**: Programmatic control of the globe camera to smoothly fly to selected destinations during the chat flow.

#### 4. Design System

- **Tailwind v4**: Utilizes the latest Tailwind CSS engine for high-performance styling.
- **Glassmorphism**: Custom CSS variables and backdrop-filter utilities create the signature dark/glassy aesthetic.
- **Responsive**: Fully responsive sidebar and layout using `react-resizable-panels` and media queries.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project credentials
- Google Maps API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-travel-planner.git
   cd ai-travel-planner
   ```

2. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
