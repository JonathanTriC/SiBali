import { Text } from '@components';
import { Colors } from '@constants/colors';
import { globalStyles } from '@constants/globalStyles';
import { FlatList, View } from 'react-native';
import { styles } from './styles';
import MaterialDesignIcons, {
  MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';

type OverviewTabProps = {
  data: DestinationItem;
};

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  const aboutData = [
    {
      id: 1,
      icon: 'map-marker-outline',
      label: 'Location',
      desc: data?.area,
    },
    // {
    //   id: 2,
    //   icon: 'clock-outline',
    //   label: 'Hours',
    //   desc: data?.openHours,
    // },
    {
      id: 3,
      icon: 'phone-outline',
      label: 'Phone',
      desc: data?.phone,
    },
    {
      id: 4,
      icon: 'web',
      label: 'Website',
      desc: data?.website,
    },
  ];
  return (
    <View style={globalStyles?.gap16}>
      {data?.about ? (
        <View style={globalStyles.gap12}>
          <Text text="About" type="bold-lg" color={Colors.neutral.base} />
          <Text
            text={data?.about ?? ''}
            type="regular-base"
            color={Colors.neutral.secondary}
          />
        </View>
      ) : null}

      <FlatList
        scrollEnabled={false}
        contentContainerStyle={globalStyles.gap12}
        data={aboutData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => {
          if (!item?.desc) return null;
          return (
            <View key={item?.id} style={styles.aboutRow}>
              <MaterialDesignIcons
                name={item?.icon as MaterialDesignIconsIconName}
                size={20}
                color={Colors.primary.base}
              />

              <View style={[globalStyles.gap4]}>
                <Text
                  text={item?.label}
                  type="bold-base"
                  color={Colors.neutral.base}
                />
                <Text
                  text={item?.desc ?? ''}
                  type="regular-base"
                  color={Colors.neutral.secondary}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ marginRight: 24 }}
                />
              </View>
            </View>
          );
        }}
      />
      {data?.amenities ? (
        <View style={globalStyles.gap12}>
          <Text text="Amenities" type="bold-lg" color={Colors.neutral.base} />
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={globalStyles.gap12}
            data={data?.amenities}
            numColumns={3}
            keyExtractor={index => `${index}`}
            renderItem={({ item, index }) => {
              return (
                <View key={`${index + 1}`} style={styles.amenitiesChip}>
                  <Text
                    text={item}
                    type="regular-base"
                    color={Colors.neutral.base}
                  />
                </View>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export { OverviewTab };
