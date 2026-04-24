type GeolocationType = {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  heading?: number | null;
  speed?: number | null;
  city?: string;
  country?: string;
  address?: string;
};

type NominatimAddressType = {
  city?: string;
  city_district?: string;
  town?: string;
  village?: string;
  country: string;
  state?: string;
  county?: string;
  postcode?: string;
  road?: string;
  house_number?: string;
  suburb?: string;
  [key: string]: string | undefined;
};

type NominatimResponseType = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: NominatimAddressType;
  boundingbox: string[];
};
