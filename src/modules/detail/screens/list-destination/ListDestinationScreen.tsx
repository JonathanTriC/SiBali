import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '@constants/colors';
import { SkeletonLoading, Text } from '@components';
import useListDestination from './useListDestination';
import { globalStyles } from '@constants/globalStyles';
import { NearbyPlacesCard } from '@modules/main';
import { screenWidth } from '@constants';
import { useCallback } from 'react';

const ListDestinationScreen: React.FC = () => {
  const { title, data, navigation, isLoading, onNavigateDetail } =
    useListDestination();

  const renderEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={globalStyles.gap12}>
          {Array.from({ length: 10 }, (_, index) => (
            <SkeletonLoading
              key={index}
              height={100}
              width={screenWidth - 42}
              borderRadius={16}
            />
          ))}
        </View>
      );
    }

    return (
      <View style={globalStyles.padding24}>
        <Text
          text={`We couldn't find any ${title?.toLowerCase()} at the moment.`}
          type="regular-base"
          color={Colors.neutral.secondary}
          textAlign="center"
        />
      </View>
    );
  }, [isLoading, title]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => navigation.goBack()}
        >
          <MaterialDesignIcons
            name="arrow-left"
            size={18}
            color={Colors.neutral.base}
          />
          <Text text={title} type="bold-base" color={Colors.neutral.base} />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item?.id ?? ''}
        contentContainerStyle={[globalStyles.gap12, globalStyles.paddingH24]}
        renderItem={({ item }) => (
          <NearbyPlacesCard
            item={item}
            onNavigateDetail={() => onNavigateDetail(item)}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export { ListDestinationScreen };
