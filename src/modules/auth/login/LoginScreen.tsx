import { useNavigate } from '@hooks/navigation-hooks';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const LoginScreen: React.FC = () => {
  const { navigateScreen } = useNavigate();
  return (
    <View>
      <Text>Welcome to Login Screen</Text>

      <TouchableOpacity onPress={() => navigateScreen('RegisterScreen')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export { LoginScreen };
