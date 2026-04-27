import { BASE_URL as BASE_URL_ENV } from '@env';
export const BASE_URL = BASE_URL_ENV;
export const API_PREFIX = 'api';
export const AUTH_PREFIX = 'auth';
export const USERS_PREFIX = 'users/me';
export const DESTINATIONS_PREFIX = 'destinations';

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
  },
  // MARK: DESTINATIONS
  destinations: {
    trending: ({ limit }: { limit?: number }) => {
      const params = new URLSearchParams();

      if (limit) params.append('limit', String(limit));

      const queryString = params.toString();

      return `${API_PREFIX}/${DESTINATIONS_PREFIX}/trending${
        queryString ? `?${queryString}` : ''
      }`;
    },
  },
  // MARK: MASTER
  master: {
    interests: `${API_PREFIX}/interests`,
    categories: `${API_PREFIX}/categories`,
  },
};
