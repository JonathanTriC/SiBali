import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@components';
import { styles } from './styles';
import useProfile from './useProfile';

const ProfileScreen: React.FC = () => {
  const { handleLogout } = useProfile();

  return (
    <View style={styles.container}>
      <Text text="Profile Screen" />

      <Button label="Log Out" action={handleLogout} />
    </View>
  );
};

export { ProfileScreen };
