type ListItinerariesResponse = {
  success?: boolean;
  message?: string;
  data?: ListItinerariesItem[];
};

type ListItinerariesItem = {
  id?: string;
  user_id?: string;
  title?: string;
  cover_image?: null;
  start_date?: null;
  duration_days?: number;
  duration_nights?: number;
  budget?: null;
  total_destinations?: number;
  is_ai_generated?: boolean;
  created_at?: Date;
  updated_at?: Date;
  area?: null;
  budget_range?: string;
  companion_type?: string;
  custom_preferences?: null | string;
  discovery_inputs?: DiscoveryInputs;
  ai_status?: string;
};

type DiscoveryInputs = {
  area?: string;
  adults?: number;
  children?: number;
  interests?: string[];
  budgetRange?: string;
  durationDays?: number;
  durationNights?: number;
  specialRequests?: string;
  customPreferences?: string;
};

type DetailItineraryResponse = {
  success?: boolean;
  message?: string;
  data?: DetailItineraryItem;
};

type DetailItineraryItem = {
  id?: string;
  user_id?: string;
  title?: string;
  cover_image?: null;
  start_date?: null;
  duration_days?: number;
  duration_nights?: number;
  budget?: null;
  total_destinations?: number;
  is_ai_generated?: boolean;
  created_at?: Date;
  updated_at?: Date;
  area?: null;
  budget_range?: string;
  companion_type?: string;
  custom_preferences?: string;
  discovery_inputs?: DiscoveryInputs;
  ai_status?: string;
  itinerary_days?: ItineraryDay[];
};

type DiscoveryInputs = {
  area?: string;
  adults?: number;
  children?: number;
  interests?: string[];
  budgetRange?: string;
  durationDays?: number;
  durationNights?: number;
  specialRequests?: string;
  customPreferences?: string;
};

type ItineraryDay = {
  id?: string;
  date?: null;
  created_at?: Date;
  day_number?: number;
  itinerary_items?: ItineraryItem[];
};

type ItineraryItem = {
  id?: string;
  notes?: string;
  created_at?: Date;
  visit_time?: string;
  destinations?: Destinations;
  order_in_day?: number;
  destination_id?: string;
};

type Destinations = {
  id?: string;
  area?: string;
  name?: string;
  about?: string;
  phone?: null | string;
  images?: string[];
  address?: string;
  website?: null | string;
  latitude?: number;
  amenities?: string[];
  gmaps_url?: string;
  is_active?: boolean;
  longitude?: number;
  created_at?: Date;
  rating_avg?: number;
  updated_at?: Date;
  category_id?: string;
  description?: string;
  is_trending?: boolean;
  rating_count?: number;
  ai_description?: string;
};
