import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@components';
import { handlerRemoveItem, Keys } from '@constants';

const HomeScreen: React.FC = () => {
  return (
    <View>
      <Text text="Home Screen" />

      <TouchableOpacity onPress={() => handlerRemoveItem(Keys.userToken)}>
        <Text text="delete token" />
      </TouchableOpacity>
    </View>
  );
};

export { HomeScreen };
