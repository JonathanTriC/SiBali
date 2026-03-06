import { Button, Text, TextField } from '@components';
import { useNavigate } from '@hooks';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React from 'react';

import { View } from 'react-native';

const LoginScreen: React.FC = () => {
  const { navigateScreen } = useNavigate();
  return (
    <View>
      <Text text="Welcome to Login Screen Light" type="light-base" />
      <Text text="Welcome to Login Screen" type="regular-base" />
      <Text text="Welcome to Login Screen Bold" type="bold-base" />

      <MaterialDesignIcons name="home" size={24} color="#000" />

      <TextField
        secure
        placeholder="Password"
        leftIcon="lock"
        onChangeText={() => {}}
      />

      <Button
        label="Register"
        // primaryLight
        icon="chevron-right"
        action={() => navigateScreen('Auth', { screen: 'RegisterScreen' })}
      />
    </View>
  );
};

export { LoginScreen };
