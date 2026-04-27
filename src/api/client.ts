import { BASE_URL } from '@constants/url';
import { handlerGetItem, handlerSetItem, Keys } from '@constants';
import axios, { CreateAxiosDefaults, AxiosError, InternalAxiosRequestConfig } from 'axios';

const baseConfig: CreateAxiosDefaults<any> = {
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
  },
  /* other custom settings */
  timeout: 10000,
};

const client = axios.create(baseConfig);

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

client.interceptors.request.use(async function (config) {
  if (!config.headers.Authorization) {
    const token = handlerGetItem(Keys.accessToken);

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
  }

  return config;
});

client.interceptors.response.use(
  async function (response) {
    return Promise.resolve(response);
  },
  async function (error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = 'Bearer ' + token;
            }
            return client(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = handlerGetItem(Keys.refreshToken);

      if (!refreshToken) {
        // No refresh token, reject all queued requests
        processQueue(error, null);
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        // Call refresh token endpoint
        const response = await axios.post(
          `${BASE_URL}api/auth/refresh-token`,
          {
            refreshToken: refreshToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.data.success) {
          const newAccessToken = response.data.data.accessToken;
          const userData = response.data.data.user;

          // Store new tokens
          await handlerSetItem(Keys.accessToken, newAccessToken);
          await handlerSetItem(Keys.userData, JSON.stringify(userData));

          // Update authorization header
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
          }

          // Process queued requests
          processQueue(null, newAccessToken);

          // Retry original request
          return client(originalRequest);
        }
      } catch (refreshError) {
        console.log('Token refresh failed:', refreshError);
        processQueue(refreshError, null);

        // Clear auth data and redirect to login would happen here
        // But we'll let the app handle it through error boundaries
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export { client };
