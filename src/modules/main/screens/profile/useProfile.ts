import { handlerRemoveItem, Keys } from '@constants';
import { useNavigate } from '@hooks';
import { useCallback, useState } from 'react';

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

  const dummyUser = {
    name: 'Travel Explorer',
    email: 'explorer@email.com',
    visited: 12,
    saved: 24,
    reviews: 8,
  };

  const toggleModalAbout = useCallback(() => {
    setShowAbout(prevState => !prevState);
  }, []);

  const handleLogout = useCallback(() => {
    handlerRemoveItem(Keys.userToken);
    resetNavigate('Auth', { screen: 'LoginScreen' });
  }, [resetNavigate]);

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
    isShowAbout,
    dummyUser,
    menuSections,
    toggleModalAbout,
    handleLogout,
  };
};

export default useProfile;
