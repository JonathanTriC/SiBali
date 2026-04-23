import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { styles } from './styles';

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text text="Map Screen" type="bold-xl" />
    </View>
  );
};

export { MapScreen };
