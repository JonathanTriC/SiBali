import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { styles } from './styles';

const DiscoverScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text text="Discover Screen" />
    </View>
  );
};

export { DiscoverScreen };
