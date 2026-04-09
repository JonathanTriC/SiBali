import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { styles } from './styles';

const ItineraryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text text="Itinerary Screen" />
    </View>
  );
};

export { ItineraryScreen };
