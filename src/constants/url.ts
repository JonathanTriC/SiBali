export const BASE_URL = 'https://si-bali.vercel.app/';
export const API_PREFIX = 'api';
export const AUTH_PREFIX = 'auth';

export const URL_PATH = {
  // MARK: AUTH
  auth: {
    register: `${API_PREFIX}/${AUTH_PREFIX}/register`,
    login: `${API_PREFIX}/${AUTH_PREFIX}/login`,
    me: `${API_PREFIX}/${AUTH_PREFIX}/me`,
    refreshToken: `${API_PREFIX}/${AUTH_PREFIX}/refresh-token`,
    logout: `${API_PREFIX}/${AUTH_PREFIX}/logout`,
  },
};
