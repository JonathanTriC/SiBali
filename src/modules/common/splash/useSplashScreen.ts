import {
  handlerGetItem,
  handlerRemoveItem,
  handlerSetItem,
  Keys,
} from '@constants';
import { URL_PATH } from '@constants/url';
import { useGeolocation } from '@hooks';
import { useNavigate } from '@hooks/navigation-hooks';
import { useCallback, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { apiGet, apiPostWithoutToken } from '@api';

const useSplashScreen = () => {
  const { resetNavigate } = useNavigate();
  const { top } = useSafeAreaInsets();
  const { requestLocationPermission } = useGeolocation();

  const accessToken = handlerGetItem(Keys.accessToken);
  const refreshToken = handlerGetItem(Keys.refreshToken);

  const requestUserPermission = useCallback(async () => {
    await requestLocationPermission();
  }, [requestLocationPermission]);

  const clearAuthData = useCallback(async () => {
    await handlerRemoveItem(Keys.accessToken);
    await handlerRemoveItem(Keys.refreshToken);
    await handlerRemoveItem(Keys.userData);
  }, []);

  const { mutateAsync: checkAuthValidity } = useMutation<
    AuthMeResponse,
    ApiError<AuthErrorResponse>
  >({
    mutationKey: ['checkAuthMe'],
    mutationFn: async () => {
      const data = await apiGet<AuthMeResponse>({
        url: URL_PATH.auth.me,
        // tags: 'checkAuthMe',
      });
      return data;
    },
    onSuccess: async data => {
      console.log('userData:', data);
      await handlerSetItem(Keys.userData, JSON.stringify(data?.user));
    },
  });

  const { mutateAsync: refreshAccessToken } = useMutation<
    RefreshTokenResponse,
    ApiError<AuthErrorResponse>
  >({
    mutationKey: ['refreshToken'],
    mutationFn: async () => {
      const body = {
        refreshToken: refreshToken,
      };

      const data = await apiPostWithoutToken({
        url: URL_PATH.auth.refreshToken,
        body,
        // tags: 'refreshToken',
      });
      return data?.data;
    },
    onSuccess: async data => {
      console.log('Token refreshed successfully!');

      await handlerSetItem(Keys.accessToken, data?.accessToken);
      await handlerSetItem(Keys.userData, JSON.stringify(data?.user));
    },
    onError: error => {
      console.log('Token refresh failed:', error?.data);
    },
  });

  const checkIsUserLoggedIn = useCallback(async () => {
    // If no access token, navigate to login
    if (!accessToken) {
      await clearAuthData();
      setTimeout(() => {
        resetNavigate('Auth', { screen: 'LoginScreen' });
      }, 1000);
      return;
    }

    try {
      const authResponse = await checkAuthValidity();

      if (authResponse?.user) {
        setTimeout(() => {
          resetNavigate('Main', { screen: 'HomeScreen' });
        }, 1000);
        return;
      }
    } catch (error) {
      console.log('Auth check failed, attempting token refresh...');
    }

    if (refreshToken) {
      try {
        const refreshResponse = await refreshAccessToken();

        if (refreshResponse?.accessToken) {
          setTimeout(() => {
            resetNavigate('Main', { screen: 'HomeScreen' });
          }, 1000);
          return;
        }
      } catch (error) {
        console.log('Token refresh failed:', error);
      }
    }

    await clearAuthData();
    setTimeout(() => {
      resetNavigate('Auth', { screen: 'LoginScreen' });
    }, 1000);
  }, [
    accessToken,
    refreshToken,
    clearAuthData,
    checkAuthValidity,
    refreshAccessToken,
    resetNavigate,
  ]);

  useEffect(() => {
    requestUserPermission();
    checkIsUserLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { top };
};

export { useSplashScreen };
