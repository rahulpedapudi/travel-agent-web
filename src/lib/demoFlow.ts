// Demo Conversation Flow Manager
// Tracks conversation state and manages multi-step demo interactions

import type { UIComponent } from "@/types/ui";
import {
  detectDemoDestination,
  generateDemoUIComponents,
  type DemoDestination,
} from "./mockData";

// Conversation states for demo mode
export type DemoConversationStep =
  | "idle"
  | "destination_detected"
  | "awaiting_origin"
  | "awaiting_dates"
  | "awaiting_budget"
  | "awaiting_passengers"
  | "showing_results";

export interface DemoConversationState {
  step: DemoConversationStep;
  destination: DemoDestination | null;
  origin: { city: string; code: string } | null;
  dates: { start: string; end: string } | null;
  budget: number | null;
  budgetLabel: string | null;
  passengers: number;
  companionType: string | null;
}

// Initial state
const initialState: DemoConversationState = {
  step: "idle",
  destination: null,
  origin: null,
  dates: null,
  budget: null,
  budgetLabel: null,
  passengers: 2,
  companionType: null,
};

// Singleton state (in real app, this would be in React context or Redux)
let conversationState: DemoConversationState = { ...initialState };

// Reset conversation
export const resetDemoConversation = (): void => {
  conversationState = { ...initialState };
};

// Get current state
export const getDemoState = (): DemoConversationState => conversationState;

// Helper: Simulate typing delay (longer for more natural feel)
export const simulateTypingDelay = (text: string): number => {
  // Base delay + character-based delay (capped)
  const charDelay = Math.min(text.length * 8, 1500);
  return 800 + charDelay;
};

// Helper: Simulate "thinking" delay
export const simulateThinkingDelay = (): number => {
  return 1000 + Math.random() * 1000; // 1-2 seconds
};

// Parse date range from user input (e.g., "Jan 15 to Jan 18" or structured response)
const parseDatesFromInput = (
  input: string
): { start: string; end: string } | null => {
  try {
    // Try to parse as JSON (from date picker)
    const parsed = JSON.parse(input);
    if (parsed.start && parsed.end) {
      return { start: parsed.start, end: parsed.end };
    }
  } catch {
    // Not JSON, try natural parsing - use dummy dates
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 3);
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    };
  }
  return null;
};

// Parse budget from user input
const parseBudgetFromInput = (
  input: string
): { amount: number; label: string } | null => {
  try {
    const parsed = JSON.parse(input);
    if (parsed.value) {
      return { amount: parseInt(parsed.value), label: parsed.label || "" };
    }
  } catch {
    // Try to extract number
    const match = input.match(/(\d+)/);
    if (match) {
      return { amount: parseInt(match[1]), label: `₹${match[1]}` };
    }
  }
  // Default moderate budget
  return { amount: 50000, label: "₹50,000" };
};

// Parse passengers from user input
const parsePassengersFromInput = (
  input: string
): { count: number; type: string } => {
  const lowerInput = input.toLowerCase();

  // Check for plain text matches first (from CompanionSelector label)
  if (lowerInput.includes("solo")) {
    return { count: 1, type: "solo" };
  }
  if (lowerInput.includes("couple")) {
    return { count: 2, type: "couple" };
  }
  if (lowerInput.includes("family")) {
    return { count: 4, type: "family" };
  }
  if (lowerInput.includes("friends")) {
    return { count: 4, type: "friends" };
  }

  // Try JSON parsing as fallback
  try {
    const parsed = JSON.parse(input);
    if (parsed.count) {
      return { count: parsed.count, type: parsed.type || "couple" };
    }
    if (parsed.selected) {
      const typeMap: Record<string, number> = {
        solo: 1,
        couple: 2,
        family: 4,
        friends: 4,
      };
      return {
        count: typeMap[parsed.selected] || 2,
        type: parsed.selected,
      };
    }
  } catch {
    // Not JSON
  }

  // Default
  return { count: 2, type: "couple" };
};

// Get date string for display
const formatDateRange = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return `${startDate.toLocaleDateString(
    "en-US",
    options
  )} - ${endDate.toLocaleDateString("en-US", options)}`;
};

// Common origin cities with codes
const ORIGIN_CITIES: Record<string, { city: string; code: string }> = {
  delhi: { city: "Delhi", code: "DEL" },
  mumbai: { city: "Mumbai", code: "BOM" },
  bangalore: { city: "Bangalore", code: "BLR" },
  bengaluru: { city: "Bangalore", code: "BLR" },
  chennai: { city: "Chennai", code: "MAA" },
  hyderabad: { city: "Hyderabad", code: "HYD" },
  kolkata: { city: "Kolkata", code: "CCU" },
  pune: { city: "Pune", code: "PNQ" },
  ahmedabad: { city: "Ahmedabad", code: "AMD" },
  jaipur: { city: "Jaipur", code: "JAI" },
  kochi: { city: "Kochi", code: "COK" },
  goa: { city: "Goa", code: "GOI" },
};

// Parse origin city from user input
const parseOriginFromInput = (
  input: string
): { city: string; code: string } | null => {
  const lowerInput = input.toLowerCase();

  // Check for known cities
  for (const [key, value] of Object.entries(ORIGIN_CITIES)) {
    if (lowerInput.includes(key)) {
      return value;
    }
  }

  // Try to parse from JSON (if from a UI component)
  try {
    const parsed = JSON.parse(input);
    if (parsed.city && parsed.code) {
      return { city: parsed.city, code: parsed.code };
    }
  } catch {
    // Not JSON
  }

  // Default to Delhi if no match
  return { city: "Delhi", code: "DEL" };
};

// Process user message and return demo response
export interface DemoResponse {
  text: string;
  ui?: UIComponent;
  ui_components?: UIComponent[];
  thinkingSteps?: { message: string; delay: number }[];
  responseDelay: number;
}

export const processDemoMessage = (
  userMessage: string
): DemoResponse | null => {
  const currentStep = conversationState.step;

  // Step 1: Check for destination detection
  if (currentStep === "idle" || currentStep === "destination_detected") {
    const destination = detectDemoDestination(userMessage);
    if (destination) {
      conversationState.destination = destination;
      conversationState.step = "awaiting_origin";

      return {
        text: `Great choice! ${destination.name} is absolutely stunning! 🌟

I'd love to plan the perfect trip for you. Let me ask a few questions to personalize your itinerary.

**Where will you be traveling from?**`,
        ui: {
          type: "preference_chips",
          props: {
            options: [
              { id: "delhi", label: "Delhi", selected: false },
              { id: "mumbai", label: "Mumbai", selected: false },
              { id: "bangalore", label: "Bangalore", selected: false },
              { id: "chennai", label: "Chennai", selected: false },
              { id: "hyderabad", label: "Hyderabad", selected: false },
              { id: "kolkata", label: "Kolkata", selected: false },
            ],
            multi_select: false,
          },
          required: true,
        },
        thinkingSteps: [
          { message: "Researching destinations...", delay: 800 },
          {
            message: `Finding best experiences in ${destination.name}...`,
            delay: 600,
          },
        ],
        responseDelay: simulateTypingDelay(`Great choice! ${destination.name}`),
      };
    }
  }

  // Step 2: Process origin selection
  if (currentStep === "awaiting_origin") {
    const origin = parseOriginFromInput(userMessage);
    if (origin) {
      conversationState.origin = origin;
      conversationState.step = "awaiting_dates";

      const dest = conversationState.destination?.name || "your destination";

      return {
        text: `Flying from **${origin.city}** ✈️

**When are you planning to travel to ${dest}?**`,
        ui: {
          type: "date_range_picker",
          props: {
            min_date: new Date().toISOString().split("T")[0],
            max_date: null,
            default_duration: 3,
            show_presets: true,
          },
          required: true,
        },
        thinkingSteps: [
          { message: `Checking flights from ${origin.city}...`, delay: 600 },
        ],
        responseDelay: simulateTypingDelay(`Flying from ${origin.city}`),
      };
    }
  }

  // Step 2: Process date selection
  if (currentStep === "awaiting_dates") {
    const dates = parseDatesFromInput(userMessage);
    if (dates) {
      conversationState.dates = dates;
      conversationState.step = "awaiting_budget";

      const dateDisplay = formatDateRange(dates.start, dates.end);
      const dest = conversationState.destination?.name || "your destination";

      return {
        text: `Perfect! **${dateDisplay}** is a wonderful time to visit ${dest}! 📅

Now, what's your budget for this trip? This helps me recommend the right hotels and experiences.`,
        ui: {
          type: "budget_slider",
          props: {
            min: 10000,
            max: 200000,
            step: 5000,
            currency: "INR",
            presets: ["Budget", "Moderate", "Luxury"],
          },
          required: true,
        },
        thinkingSteps: [
          { message: "Checking availability for your dates...", delay: 700 },
          { message: "Finding best deals...", delay: 500 },
        ],
        responseDelay: simulateTypingDelay(`Perfect! ${dateDisplay}`),
      };
    }
  }

  // Step 3: Process budget selection
  if (currentStep === "awaiting_budget") {
    const budget = parseBudgetFromInput(userMessage);
    if (budget) {
      conversationState.budget = budget.amount;
      conversationState.budgetLabel = budget.label;
      conversationState.step = "awaiting_passengers";

      return {
        text: `Got it! I'll plan within **${budget.label}** budget. 💰

Last question - who's traveling with you?`,
        ui: {
          type: "companion_selector",
          props: {
            options: [
              { id: "solo", label: "Solo", icon: "👤" },
              { id: "couple", label: "Couple", icon: "💑" },
              { id: "family", label: "Family", icon: "👨‍👩‍👧" },
              { id: "friends", label: "Friends", icon: "👥" },
            ],
            show_kids_age_input: false,
          },
          required: true,
        },
        thinkingSteps: [
          { message: "Optimizing for your budget...", delay: 600 },
        ],
        responseDelay: simulateTypingDelay(`Got it! I'll plan within`),
      };
    }
  }

  // Step 4: Process passenger selection - Show final results
  if (currentStep === "awaiting_passengers") {
    const passengers = parsePassengersFromInput(userMessage);
    conversationState.passengers = passengers.count;
    conversationState.companionType = passengers.type;
    conversationState.step = "showing_results";

    const dest = conversationState.destination;
    if (!dest) return null;

    // Generate components with user's preferences
    const components = generateDemoUIComponents(dest, passengers.count);

    // Update flight card with user's origin, dates, and passengers
    const flightCard = components.find((c) => c.type === "flight_card");
    if (flightCard && flightCard.props) {
      const props = flightCard.props as any;
      // Use user's origin city
      if (conversationState.origin) {
        props.origin = conversationState.origin.city;
        // Update flight segments with user's origin
        if (props.flights && Array.isArray(props.flights)) {
          props.flights.forEach((flight: any) => {
            if (flight.segments && Array.isArray(flight.segments)) {
              flight.segments.forEach((seg: any) => {
                seg.departure_city = conversationState.origin!.city;
                seg.departure_airport = conversationState.origin!.code;
              });
            }
          });
        }
      }
      // Use user's dates
      if (conversationState.dates) {
        props.departure_date = conversationState.dates.start;
      }
      // Use user's passenger count
      props.passengers = passengers.count;

      // Adjust flight prices based on user's budget
      if (
        conversationState.budget &&
        props.flights &&
        Array.isArray(props.flights)
      ) {
        const budget = conversationState.budget;
        // Scale flights based on budget tier
        const budgetMultiplier =
          budget < 30000 ? 0.7 : budget < 80000 ? 1.0 : 1.4;

        props.flights.forEach((flight: any, index: number) => {
          const baseMultiplier = 1 + index * 0.15;
          const adjustedPrice =
            Math.round(
              (flight.price * budgetMultiplier * baseMultiplier) / 100
            ) * 100;
          flight.price = adjustedPrice;
          flight.price_formatted = `₹${(adjustedPrice / 1000).toFixed(
            adjustedPrice >= 10000 ? 0 : 1
          )}K`;

          if (budget > 100000) {
            flight.booking_class = index === 0 ? "Business" : "Premium Economy";
          } else if (budget < 30000) {
            flight.booking_class = "Economy Saver";
          }
        });
      }
    }

    const companionLabel =
      passengers.type === "solo"
        ? "solo adventure"
        : passengers.type === "couple"
        ? "romantic getaway"
        : passengers.type === "family"
        ? "family trip"
        : "trip with friends";

    return {
      text: `Amazing! I've crafted the perfect **${companionLabel}** to ${dest.name}! 🎉

Here's your personalized itinerary with flights, day-by-day activities, and a map of all the places you'll visit.

${dest.response}`,
      ui_components: components,
      thinkingSteps: [
        { message: "Building your personalized itinerary...", delay: 1200 },
        { message: "Searching best flight options...", delay: 1000 },
        { message: "Curating local experiences...", delay: 900 },
        { message: "Mapping all your destinations...", delay: 800 },
        { message: "Finalizing your trip plan...", delay: 600 },
      ],
      responseDelay: simulateTypingDelay(`Amazing! I've crafted the perfect`),
    };
  }

  // Default: Not in demo flow
  return null;
};

// Check if we're in an active demo conversation
export const isInDemoConversation = (): boolean => {
  return conversationState.step !== "idle";
};
