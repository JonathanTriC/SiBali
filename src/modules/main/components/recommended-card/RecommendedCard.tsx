import { Text } from '@components';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { URL_PATH } from '@constants/url';

const RecommendedCard = ({
  item,
  onNavigateDetail,
}: {
  item: DestinationItem;
  onNavigateDetail: () => void;
}) => (
  <TouchableOpacity onPress={onNavigateDetail}>
    <ImageBackground
      source={{
        uri:
          item.images?.[0] ??
          URL_PATH.images.noImages({ height: 160, width: 220 }),
      }}
      style={styles.card}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      {item?.categories ? (
        <View style={styles.badge}>
          <Text text={item.categories} type="bold-sm" />
        </View>
      ) : (
        <View />
      )}
      <View style={styles.footer}>
        <Text
          text={item.name}
          type="bold-base"
          color={Colors.white}
          numberOfLines={2}
        />
        <View style={styles.meta}>
          <View style={styles.rating}>
            <MaterialDesignIcons
              name="star"
              size={14}
              color={Colors.warning.base}
            />
            <Text
              text={`${item.rating_avg}`}
              type="bold-sm"
              color={Colors.white}
            />
          </View>
          {/* <Text text={item.distance} type="bold-sm" color={Colors.white} /> */}
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

export { RecommendedCard };
