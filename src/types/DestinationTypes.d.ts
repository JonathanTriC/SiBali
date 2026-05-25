type NearbyDestinationResponse = {
  success?: boolean;
  message?: string;
  data?: NearbyDestinations[];
};

type NearbyDestinations = {
  id?: string;
  name?: string;
  category_id?: string;
  description?: string;
  ai_description?: string;
  about?: string;
  address?: string;
  area?: string;
  latitude?: number;
  longitude?: number;
  gmaps_url?: string;
  phone?: null | string;
  website?: null | string;
  images?: string[];
  amenities?: string[];
  rating_avg?: number;
  rating_count?: number;
  is_trending?: boolean;
  is_active?: boolean;
  view_count?: number;
  created_at?: Date;
  updated_at?: Date;
  categories?: Categories;
  _distance_km?: number;
};

type Categories = {
  id?: string;
  name?: string;
  icon_url?: null;
};

type GetDestinationReviewResponse = {
  success?: boolean;
  message?: string;
  data?: DestinationReview[];
};

type DestinationReview = {
  id?: string;
  rating?: number;
  comment?: string;
  created_at?: Date;
  updated_at?: Date;
  users?: Users;
};

type Users = {
  id?: string;
  name?: string;
  profile_photo?: null;
};
