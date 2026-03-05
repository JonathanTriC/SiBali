import { useNavigate } from '@hooks/navigation-hooks';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const LoginScreen: React.FC = () => {
  const { navigateScreen } = useNavigate();
  return (
    <View>
      <Text style={{ fontFamily: 'Mulish-Light' }}>
        Welcome to Login Screen Light
      </Text>
      <Text style={{ fontFamily: 'Mulish' }}>Welcome to Login Screen</Text>
      <Text style={{ fontFamily: 'Mulish-Bold' }}>
        Welcome to Login Screen Bold
      </Text>
      <MaterialDesignIcons name="home" size={24} color="#000" />

      <TouchableOpacity
        onPress={() => navigateScreen('Auth', { screen: 'RegisterScreen' })}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export { LoginScreen };
