import {
  handlerGetItem,
  handlerRemoveItem,
  handlerSetItem,
  Keys,
} from '@constants';
import { useGeolocation } from '@hooks';
import { useNavigate } from '@hooks/navigation-hooks';
import { useCallback, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useSplashScreen = () => {
  const { resetNavigate } = useNavigate();
  const { top } = useSafeAreaInsets();
  const { requestLocationPermission } = useGeolocation();

  const userToken = handlerGetItem(Keys.userToken);

  const requestUserPermission = useCallback(async () => {
    await requestLocationPermission();
  }, [requestLocationPermission]);

  const checkIsUserLoggedIn = useCallback(
    async (token: string) => {
      await handlerSetItem(Keys.userToken, token);
      if (token) {
        setTimeout(() => {
          resetNavigate('Main', { screen: 'HomeScreen' });
        }, 1000);
      } else {
        await handlerRemoveItem(Keys.userToken);
        setTimeout(() => {
          resetNavigate('Auth', { screen: 'LoginScreen' });
        }, 1000);
      }
    },
    [resetNavigate],
  );

  useEffect(() => {
    requestUserPermission();
    checkIsUserLoggedIn(userToken ?? '');
  }, [userToken, checkIsUserLoggedIn, requestUserPermission]);

  return { top };
};

export { useSplashScreen };
