import { BASE_URL as BASE_URL_ENV } from '@env';
export const BASE_URL = BASE_URL_ENV;
export const API_PREFIX = 'api';
export const AUTH_PREFIX = 'auth';
export const USERS_PREFIX = 'users/me';
export const DESTINATIONS_PREFIX = 'destinations';
export const DISCOVERY_PREFIX = 'discovery';
export const ITINERARIES_PREFIX = 'itineraries';

export const URL_PATH = {
  // MARK: AUTH
  auth: {
    register: `${API_PREFIX}/${AUTH_PREFIX}/register`,
    login: `${API_PREFIX}/${AUTH_PREFIX}/login`,
    me: `${API_PREFIX}/${AUTH_PREFIX}/me`,
    refreshToken: `${API_PREFIX}/${AUTH_PREFIX}/refresh-token`,
    logout: `${API_PREFIX}/${AUTH_PREFIX}/logout`,
  },
  // MARK: USERS
  users: {
    interests: `${API_PREFIX}/${USERS_PREFIX}/interests`,
    profile: `${API_PREFIX}/${USERS_PREFIX}/profile`,
  },
  // MARK: DESTINATIONS
  destinations: {
    detail: ({ destinationId }: { destinationId: string }) => {
      return `${API_PREFIX}/${DESTINATIONS_PREFIX}/${destinationId}`;
    },
    nearby: ({ lat, lng }: { lat: number; lng: number }) => {
      return `${API_PREFIX}/${DESTINATIONS_PREFIX}/nearby?lat=${lat}&lng=${lng}`;
    },
    list: ({
      limit,
      offset,
      categoryId,
    }: {
      limit?: number;
      offset?: number;
      categoryId?: string;
    }) => {
      const params = new URLSearchParams();

      if (limit) params.append('limit', String(limit));
      if (offset) params.append('offset', String(offset));
      if (categoryId) params.append('categoryId', String(categoryId));

      const queryString = params.toString();

      return `${API_PREFIX}/${DESTINATIONS_PREFIX}${
        queryString ? `?${queryString}` : ''
      }`;
    },
    trending: ({ limit }: { limit?: number }) => {
      const params = new URLSearchParams();

      if (limit) params.append('limit', String(limit));

      const queryString = params.toString();

      return `${API_PREFIX}/${DESTINATIONS_PREFIX}/trending${
        queryString ? `?${queryString}` : ''
      }`;
    },
    addCounter: ({ destinationId }: { destinationId: string }) => {
      return `${API_PREFIX}/${DESTINATIONS_PREFIX}/${destinationId}/view`;
    },
    reviews: ({ destinationId }: { destinationId: string }) => {
      return `${API_PREFIX}/${DESTINATIONS_PREFIX}/${destinationId}/reviews`;
    },
  },
  // MARK: DISCOVERY
  discovery: {
    generateItinerary: `${API_PREFIX}/${DISCOVERY_PREFIX}/generate-itinerary`,
  },
  // MARK: ITINERARIES
  itineraries: {
    list: `${API_PREFIX}/${ITINERARIES_PREFIX}`,
    detail: ({ itineraryId }: { itineraryId: string }) => {
      return `${API_PREFIX}/${ITINERARIES_PREFIX}/${itineraryId}`;
    },
    backfillImages: ({ itineraryId }: { itineraryId: string }) => {
      return `${API_PREFIX}/${ITINERARIES_PREFIX}/${itineraryId}/backfill-images`;
    },
  },
  // MARK: MASTER
  master: {
    interests: `${API_PREFIX}/interests`,
    categories: `${API_PREFIX}/categories`,
  },
  // MARK: NO IMAGES
  images: {
    noImages: ({ height, width }: { height?: number; width?: number }) => {
      return `https://placehold.jp/eeeeee/cccccc/${height}x${width}.png?text=No%20Image`;
    },
  },
};
