import { BudgetSlider } from "./BudgetSlider";
import { DateRangePicker } from "./DateRangePicker";
import { PreferenceChips } from "./PreferenceChips";
import { CompanionSelector } from "./CompanionSelector";
import { RatingFeedback } from "./RatingFeedback";
import { ItineraryCard } from "./ItineraryCard";
import { QuickActions } from "./QuickActions";
import type { UIComponentType } from "@/types/ui";

// Registry mapping ui.type to React components
export const UI_COMPONENTS: Record<
  UIComponentType,
  React.ComponentType<any>
> = {
  budget_slider: BudgetSlider,
  date_range_picker: DateRangePicker,
  preference_chips: PreferenceChips,
  companion_selector: CompanionSelector,
  rating_feedback: RatingFeedback,
  itinerary_card: ItineraryCard,
  quick_actions: QuickActions,
};

// Helper to check if a component type is valid
export const isValidUIComponent = (type: string): type is UIComponentType => {
  return type in UI_COMPONENTS;
};
