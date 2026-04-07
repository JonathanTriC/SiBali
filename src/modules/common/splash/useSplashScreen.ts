import {
  handlerGetItem,
  handlerRemoveItem,
  handlerSetItem,
  Keys,
} from '@constants';
import { useNavigate } from '@hooks/navigation-hooks';
import { useCallback, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useSplashScreen = () => {
  const { resetNavigate } = useNavigate();
  const { top } = useSafeAreaInsets();
  const userToken = handlerGetItem(Keys.userToken);

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
    checkIsUserLoggedIn(userToken ?? '');
  }, [checkIsUserLoggedIn, userToken]);

  return { top };
};

export { useSplashScreen };
