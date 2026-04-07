import { handlerRemoveItem, Keys } from '@constants';
import { useNavigate } from '@hooks';
import { useCallback } from 'react';

const useProfile = () => {
  const { resetNavigate } = useNavigate();

  const handleLogout = useCallback(() => {
    handlerRemoveItem(Keys.userToken);
    resetNavigate('Auth', { screen: 'LoginScreen' });
  }, [resetNavigate]);

  return { handleLogout };
};

export default useProfile;
