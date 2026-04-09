import { Text } from '@components';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { ImageBackground, View } from 'react-native';
import { styles } from './styles';

const RecommendedCard = ({ item }: { item: any }) => (
  <ImageBackground
    source={{ uri: item.image }}
    style={styles.card}
    imageStyle={styles.image}
    resizeMode="cover"
  >
    <View style={styles.overlay} />
    <View style={styles.badge}>
      <Text text={item.category} type="bold-sm" />
    </View>
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
          <Text text={item.rating} type="bold-sm" color={Colors.white} />
        </View>
        <Text text={item.distance} type="bold-sm" color={Colors.white} />
      </View>
    </View>
  </ImageBackground>
);

export { RecommendedCard };
