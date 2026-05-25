type PopularCategoriesResponse = {
  success?: boolean;
  message?: string;
  data?: PopularCategories[];
};

type PopularCategories = {
  id?: string;
  name?: string;
  icon_url?: string;
  is_active?: string;
  created_at?: string;
};

type TrendingDestinationResponse = {
  success?: boolean;
  message?: string;
  data?: DestinationItem[];
};

type DestinationDetailResponse = {
  success?: boolean;
  message?: string;
  data?: DestinationItem;
};

type DestinationItem = {
  id?: string;
  name?: string;
  category_id?: null;
  description?: string;
  ai_description?: null;
  about?: null;
  address?: null;
  area?: null;
  latitude?: null;
  longitude?: null;
  gmaps_url?: string;
  phone?: null;
  website?: null;
  images?: string[];
  amenities?: string[];
  rating_avg?: number;
  rating_count?: number;
  is_trending?: boolean;
  is_active?: boolean;
  view_count?: number;
  created_at?: Date;
  updated_at?: Date;
  categories?: CategoriesItem;
};

type CategoriesItem = {
  id?: string;
  name?: string;
  icon_url?: string;
};

type ItineraryPlace = {
  id: number;
  name: string;
  time: string;
  image: string;
  destination?: DestinationItem;
};

type ItineraryDay = {
  day: number;
  date: string;
  places: ItineraryPlace[];
};

type ItineraryItem = {
  id: number;
  title: string;
  date: string;
  duration: string;
  budget: string;
  placesCount: number;
  image: string;
  days?: ItineraryDay[];
};
