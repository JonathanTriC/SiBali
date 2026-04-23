type DestinationItem = {
  id?: number;
  name?: string;
  location?: string;
  category?: string;
  rating?: string;
  reviewsCount?: string;
  distance?: string;
  image?: string;
  aiInsight?: string;
  about?: string;
  openHours?: string;
  phone?: string;
  website?: string;
  amenities?: string[];
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
