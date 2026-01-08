// UI Component Types for Server-Driven UI

export interface UIComponentBase {
  type: string;
  props: Record<string, unknown>;
  required?: boolean;
}

// Budget Slider
export interface BudgetSliderProps {
  min: number;
  max: number;
  step: number;
  currency: string;
  presets?: string[];
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export interface BudgetSliderUI extends UIComponentBase {
  type: "budget_slider";
  props: Omit<BudgetSliderProps, "onSubmit">;
}

// Date Range Picker
export interface DateRangePickerProps {
  min_date?: string | null;
  max_date?: string | null;
  default_duration?: number;
  show_presets?: boolean;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export interface DateRangePickerUI extends UIComponentBase {
  type: "date_range_picker";
  props: Omit<DateRangePickerProps, "onSubmit">;
}

// Preference Chips
export interface PreferenceOption {
  id: string;
  label: string;
  selected: boolean;
}

export interface PreferenceChipsProps {
  options: PreferenceOption[];
  multi_select?: boolean;
  min_selections?: number;
  max_selections?: number | null;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export interface PreferenceChipsUI extends UIComponentBase {
  type: "preference_chips";
  props: Omit<PreferenceChipsProps, "onSubmit">;
}

// Companion Selector
export interface CompanionOption {
  id: string;
  label: string;
  icon: string;
}

export interface CompanionSelectorProps {
  options: CompanionOption[];
  show_kids_age_input?: boolean;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export interface CompanionSelectorUI extends UIComponentBase {
  type: "companion_selector";
  props: Omit<CompanionSelectorProps, "onSubmit">;
}

// Rating Feedback
export interface RatingFeedbackProps {
  scale: number;
  show_comment?: boolean;
  prompt?: string;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export interface RatingFeedbackUI extends UIComponentBase {
  type: "rating_feedback";
  props: Omit<RatingFeedbackProps, "onSubmit">;
}

// Itinerary Card
// API format activity (comes from backend)
export interface ApiPlaceInfo {
  name: string;
  type: string;
}

export interface ItineraryActivity {
  // New API format
  time?: string;
  place?: ApiPlaceInfo;
  // Legacy format
  start_time?: string;
  title?: string;
  location?: string;
  duration?: string;
  type?: string;
  // Common fields
  end_time?: string;
  description?: string;
  notes?: string[];
  travel_duration?: string;
  travel_method?: string;
  travel_note?: string;
}

// Single day itinerary
export interface ItineraryDay {
  day_number: number;
  date: string;
  theme?: string;
  activities: ItineraryActivity[];
}

// Props can be single day OR multi-day (with days array)
export interface ItineraryCardProps {
  // Single day format (backwards compatible)
  day_number?: number;
  date?: string;
  theme?: string;
  activities?: ItineraryActivity[];
  // Multi-day format
  days?: ItineraryDay[];
  // Common
  allow_actions?: boolean;
  onSubmit?: (value: string) => void;
}

export interface ItineraryCardUI extends UIComponentBase {
  type: "itinerary_card";
  props: Omit<ItineraryCardProps, "onSubmit">;
}

// Quick Actions
export interface QuickAction {
  id: string;
  label: string;
}

export interface QuickActionsProps {
  actions: QuickAction[];
  onSubmit: (value: string) => void;
}

export interface QuickActionsUI extends UIComponentBase {
  type: "quick_actions";
  props: Omit<QuickActionsProps, "onSubmit">;
}

// Union type for all UI components
export type UIComponent =
  | BudgetSliderUI
  | DateRangePickerUI
  | PreferenceChipsUI
  | CompanionSelectorUI
  | RatingFeedbackUI
  | ItineraryCardUI
  | QuickActionsUI
  | MapViewUI
  | RouteViewUI;

// Helper type for component props with onSubmit
export type UIComponentType = UIComponent["type"];

// Map View
export interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  type?: string;
  day?: number;
  description?: string;
}

export interface MapViewProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: MapMarker[];
  title?: string;
  [key: string]: unknown;
}

export interface MapViewUI extends UIComponentBase {
  type: "map_view";
  props: MapViewProps;
}

// Route View
export interface RouteWaypoint {
  lat: number;
  lng: number;
  title: string;
  order?: number;
  arrival_time?: string;
}

export interface RouteViewProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  waypoints?: RouteWaypoint[];
  travel_mode?: "DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING";
  day_number?: number;
  [key: string]: unknown;
}

export interface RouteViewUI extends UIComponentBase {
  type: "route_view";
  props: RouteViewProps;
}
