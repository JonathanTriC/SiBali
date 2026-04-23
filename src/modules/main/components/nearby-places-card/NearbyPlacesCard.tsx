import { Text } from '@components';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Image, View } from 'react-native';
import { styles } from './styles';

const NearbyPlacesCard = ({ item }: { item: DestinationItem }) => (
  <View style={styles.container}>
    <Image
      source={{ uri: item.image }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.content}>
      <Text
        text={item.name}
        type="bold-base"
        color={Colors.neutral.base}
        numberOfLines={2}
      />
      <View style={styles.locationRow}>
        <MaterialDesignIcons
          name="map-marker-outline"
          size={12}
          color={Colors.neutral.secondary}
        />
        <Text
          text={item.location}
          type="regular-sm"
          color={Colors.neutral.secondary}
        />
      </View>
      <View style={[styles.meta]}>
        <View style={styles.rating}>
          <MaterialDesignIcons
            name="star"
            size={14}
            color={Colors.warning.base}
          />
          <Text
            text={item.rating}
            type="regular-sm"
            color={Colors.neutral.base}
          />
        </View>
        <Text
          text={item.distance}
          type="regular-sm"
          color={Colors.neutral.secondary}
        />
      </View>
    </View>
  </View>
);

export { NearbyPlacesCard };
