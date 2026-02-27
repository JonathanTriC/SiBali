import { useNavigate } from '@hooks/navigation-hooks';
import { useCallback, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useSplashScreen = () => {
  const { resetNavigate } = useNavigate();
  const { top } = useSafeAreaInsets();

  const checkIsUserLoggedIn = useCallback(() => {
    setTimeout(() => {
      resetNavigate('Auth', { screen: 'LoginScreen' });
    }, 1000);
  }, [resetNavigate]);

  useEffect(() => {
    checkIsUserLoggedIn();
  }, [checkIsUserLoggedIn]);

  return { top };
};

export { useSplashScreen };
