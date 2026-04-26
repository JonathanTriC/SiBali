import {
  handlerGetAndParseJSON,
  handlerGetItem,
  handlerRemoveItem,
  Keys,
} from '@constants';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiPost } from '@api';

type MenuSection = {
  title: string;
  items: MenuItem[];
};

type MenuItem = {
  id: string;
  icon: string;
  label: string;
  rightLabel?: string;
  onPress: () => void;
};

const useProfile = () => {
  const { resetNavigate } = useNavigate();

  const [isShowAbout, setShowAbout] = useState<boolean>(false);

  const refreshToken = handlerGetItem(Keys.refreshToken);
  const userData = handlerGetAndParseJSON<User>(Keys.userData);

  const dummyUser = {
    visited: 12,
    saved: 24,
    reviews: 8,
  };

  const toggleModalAbout = useCallback(() => {
    setShowAbout(prevState => !prevState);
  }, []);

  const clearAuthData = useCallback(async () => {
    await handlerRemoveItem(Keys.accessToken);
    await handlerRemoveItem(Keys.refreshToken);
    await handlerRemoveItem(Keys.userData);
  }, []);

  const { mutate: submitLogout, isPending: isLoggingOut } = useMutation<
    LogoutResponse,
    ApiError<AuthErrorResponse>
  >({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const body = {
        refreshToken: refreshToken,
      };

      const data = await apiPost<LogoutResponse>({
        url: URL_PATH.auth.logout,
        body,
        tags: 'logout',
      });
      return data;
    },
    onSuccess: async data => {
      console.log('Logout successful:', data?.message);
      await clearAuthData();
      resetNavigate('Auth', { screen: 'LoginScreen' });
    },
    onError: async error => {
      console.log('Logout failed:', error?.data);
      await clearAuthData();
      resetNavigate('Auth', { screen: 'LoginScreen' });
    },
  });

  const handleLogout = useCallback(() => {
    submitLogout();
  }, [submitLogout]);

  const menuSections: MenuSection[] = [
    {
      title: 'Account',
      items: [
        {
          id: 'edit-profile',
          icon: 'pencil-outline',
          label: 'Edit Profile',
          onPress: () => {},
        },
        {
          id: 'my-reviews',
          icon: 'star-outline',
          label: 'My Reviews',
          onPress: () => {},
        },
        {
          id: 'travel-preferences',
          icon: 'map-marker-outline',
          label: 'Travel Preferences',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          id: 'language',
          icon: 'web',
          label: 'Language',
          rightLabel: 'English',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help-center',
          icon: 'help-circle-outline',
          label: 'Help Center',
          onPress: () => {},
        },
        {
          id: 'about',
          icon: 'information-outline',
          label: 'About SIBALI',
          onPress: toggleModalAbout,
        },
      ],
    },
  ];

  return {
    userData,
    dummyUser,
    menuSections,
    isShowAbout,
    isLoggingOut,
    toggleModalAbout,
    handleLogout,
  };
};

export default useProfile;
