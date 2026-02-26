import { useNavigate } from '@hooks/navigation-hooks';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const RegisterScreen: React.FC = () => {
  const { popScreen } = useNavigate();
  return (
    <View>
      <Text>Welcome to Register Screen</Text>

      <TouchableOpacity onPress={() => popScreen()}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export { RegisterScreen };
