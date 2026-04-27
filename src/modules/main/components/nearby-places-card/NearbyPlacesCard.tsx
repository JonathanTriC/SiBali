import { Text } from '@components';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { URL_PATH } from '@constants/url';

const NearbyPlacesCard = ({
  item,
  onNavigateDetail,
}: {
  item: DestinationItem;
  onNavigateDetail: () => void;
}) => (
  <TouchableOpacity style={styles.container} onPress={onNavigateDetail}>
    <Image
      source={{
        uri:
          item.images?.[0] ??
          URL_PATH.images.noImages({ height: 96, width: 96 }),
      }}
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
          text={item?.address ?? ''}
          type="regular-sm"
          color={Colors.neutral.secondary}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginRight: 20 }}
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
            text={`${item.rating_avg}`}
            type="regular-sm"
            color={Colors.neutral.base}
          />
        </View>
        {/* <Text
          text={item.distance}
          type="regular-sm"
          color={Colors.neutral.secondary}
        /> */}
      </View>
    </View>
  </TouchableOpacity>
);

export { NearbyPlacesCard };
