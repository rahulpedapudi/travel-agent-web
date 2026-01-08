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

// Parse date range from user input (e.g., "Jan 15 - 18, 2026 [2026-01-15|2026-01-18]" or structured response)
// Returns start, end dates as ISO strings, and optional display text
const parseDatesFromInput = (
  input: string
): { start: string; end: string; display?: string } | null => {
  // First, check for bracketed ISO date format: "Display Text [YYYY-MM-DD|YYYY-MM-DD]"
  const bracketPattern = /^(.+?)\s*\[(\d{4}-\d{2}-\d{2})\|(\d{4}-\d{2}-\d{2})\]$/;
  const bracketMatch = input.match(bracketPattern);

  if (bracketMatch) {
    return {
      start: bracketMatch[2],
      end: bracketMatch[3],
      display: bracketMatch[1].trim(),
    };
  }

  try {
    // Try to parse as JSON (from date picker - legacy format)
    const parsed = JSON.parse(input);
    if (parsed.start && parsed.end) {
      return {
        start: parsed.start,
        end: parsed.end,
        display: parsed.display // Include display text if available
      };
    }
  } catch {
    // Not JSON, try natural language parsing

    // Month name mapping
    const months: Record<string, number> = {
      january: 0, jan: 0,
      february: 1, feb: 1,
      march: 2, mar: 2,
      april: 3, apr: 3,
      may: 4,
      june: 5, jun: 5,
      july: 6, jul: 6,
      august: 7, aug: 7,
      september: 8, sep: 8, sept: 8,
      october: 9, oct: 9,
      november: 10, nov: 10,
      december: 11, dec: 11,
    };

    // Try to extract dates with patterns like:
    // "January 14-16, 2026" or "Jan 14 to Jan 16" or "14-16 January 2026"

    // Pattern 1: "Month Day-Day, Year" (e.g., "January 14-16, 2026" or "January 14 - 16, 2026")
    const sameMonthPattern = /([a-z]+)\s*(\d{1,2})\s*[-–\s]+\s*(\d{1,2})(?:\s*,?\s*(\d{4}))?/i;
    const sameMonthMatch = input.match(sameMonthPattern);

    if (sameMonthMatch) {
      const monthName = sameMonthMatch[1].toLowerCase();
      const startDay = parseInt(sameMonthMatch[2]);
      const endDay = parseInt(sameMonthMatch[3]);
      const year = sameMonthMatch[4] ? parseInt(sameMonthMatch[4]) : new Date().getFullYear();
      const month = months[monthName];

      if (month !== undefined) {
        const startDate = new Date(year, month, startDay);
        const endDate = new Date(year, month, endDay);
        return {
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
          display: input.trim(), // Use the original input as display
        };
      }
    }

    // Pattern 2: "Month Day to Month Day" (e.g., "Jan 14 to Jan 18" or "Jan 14 - Feb 2")
    const diffMonthPattern = /([a-z]+)\s*(\d{1,2})\s*[-–\s]+\s*([a-z]+)\s*(\d{1,2})(?:\s*,?\s*(\d{4}))?/i;
    const diffMonthMatch = input.match(diffMonthPattern);

    if (diffMonthMatch) {
      const startMonthName = diffMonthMatch[1].toLowerCase();
      const startDay = parseInt(diffMonthMatch[2]);
      const endMonthName = diffMonthMatch[3].toLowerCase();
      const endDay = parseInt(diffMonthMatch[4]);
      const year = diffMonthMatch[5] ? parseInt(diffMonthMatch[5]) : new Date().getFullYear();
      const startMonth = months[startMonthName];
      const endMonth = months[endMonthName];

      if (startMonth !== undefined && endMonth !== undefined) {
        const startDate = new Date(year, startMonth, startDay);
        const endDate = new Date(year, endMonth, endDay);
        return {
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
          display: input.trim(),
        };
      }
    }

    // Pattern 3: ISO-like dates "2026-01-14 to 2026-01-16"
    const isoPattern = /(\d{4}-\d{2}-\d{2})\s*[-–to]+\s*(\d{4}-\d{2}-\d{2})/;
    const isoMatch = input.match(isoPattern);

    if (isoMatch) {
      return { start: isoMatch[1], end: isoMatch[2] };
    }

    // Pattern 4: Duration (e.g., "5 days", "for a week", "2 weeks")
    const durationPattern = /(\d+)\s*days?/i;
    const durationMatch = input.match(durationPattern);

    if (durationMatch) {
      const days = parseInt(durationMatch[1]);
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() + 7); // Start next week
      const end = new Date(start);
      end.setDate(start.getDate() + days - 1); // Inclusive

      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
        display: `${days} Days (${formatDateRange(start.toISOString().split("T")[0], end.toISOString().split("T")[0])})`
      };
    }

    const weekPattern = /(\d+|a)\s*weeks?/i;
    const weekMatch = input.match(weekPattern);

    if (weekMatch) {
      const weeks = weekMatch[1].toLowerCase() === 'a' ? 1 : parseInt(weekMatch[1]);
      const days = weeks * 7;
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() + 7); // Start next week
      const end = new Date(start);
      end.setDate(start.getDate() + days - 1);

      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
        display: `${days} Days (${formatDateRange(start.toISOString().split("T")[0], end.toISOString().split("T")[0])})`
      };
    }

    // Fallback: use today + 7 days if no pattern matched
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

// Format budget amount to readable label
const formatBudgetLabel = (amount: number): string => {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  } else if (amount >= 1000) {
    const thousands = amount / 1000;
    return `₹${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)
      }K`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};

// Parse budget from user input
const parseBudgetFromInput = (
  input: string
): { amount: number; label: string } | null => {
  // Try to parse as JSON first (from BudgetSlider)
  try {
    const parsed = JSON.parse(input);
    if (parsed.value !== undefined) {
      const amount = parseInt(parsed.value);
      // Use the label from slider if provided, otherwise format ourselves
      const label = parsed.label || formatBudgetLabel(amount);
      return { amount, label };
    }
  } catch {
    // Not JSON, continue
  }

  // Try to extract number with L/Lakh/K notation
  const lakhMatch = input.match(/(\d+(?:\.\d+)?)\s*(?:L|lakh|lac)/i);
  if (lakhMatch) {
    const amount = Math.round(parseFloat(lakhMatch[1]) * 100000);
    return { amount, label: formatBudgetLabel(amount) };
  }

  const thousandMatch = input.match(/(\d+(?:\.\d+)?)\s*(?:K|thousand)/i);
  if (thousandMatch) {
    const amount = Math.round(parseFloat(thousandMatch[1]) * 1000);
    return { amount, label: formatBudgetLabel(amount) };
  }

  // Try plain number (could be full amount like 110000)
  const plainMatch = input.match(/(\d{4,})/); // At least 4 digits
  if (plainMatch) {
    const amount = parseInt(plainMatch[1]);
    return { amount, label: formatBudgetLabel(amount) };
  }

  // Try smaller numbers
  const smallMatch = input.match(/(\d+)/);
  if (smallMatch) {
    const num = parseInt(smallMatch[1]);
    // If it's a small number, assume it might be in thousands
    const amount = num < 1000 ? num * 1000 : num;
    return { amount, label: formatBudgetLabel(amount) };
  }

  // Default moderate budget
  return { amount: 50000, label: "₹50K" };
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

  // Clean up input to use as city name (basic validation)
  const cleanedInput = input.trim();
  if (cleanedInput.length > 2 && !['yes', 'no', 'cancel', 'stop'].includes(cleanedInput.toLowerCase())) {
    // Generate generic code
    const code = cleanedInput.substring(0, 3).toUpperCase();
    // Capitalize City Name
    const city = cleanedInput.charAt(0).toUpperCase() + cleanedInput.slice(1);
    return { city, code };
  }

  // Default to Delhi if really unsure
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

      // Use display text from parsed input if available, otherwise format from dates
      const dateDisplay = dates.display || formatDateRange(dates.start, dates.end);
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

    // Calculate duration in days
    let duration = 3; // Default
    if (conversationState.dates?.start && conversationState.dates?.end) {
      const start = new Date(conversationState.dates.start);
      const end = new Date(conversationState.dates.end);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
    }

    // Generate components with user's preferences (including dates)
    const components = generateDemoUIComponents(
      dest,
      passengers.count,
      conversationState.dates?.start,
      duration,
      conversationState.budget || 50000 // Default moderate budget
    );

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
