import React, { useCallback } from 'react';
import { FlatList, ImageBackground, RefreshControl, View } from 'react-native';
import { Button, SkeletonLoading, Text } from '@components';
import { Colors } from '@constants/colors';
import { styles } from './styles';
import useItinerary from './useItinerary';
import { URL_PATH } from '@constants/url';
import { formatRupiah, screenWidth } from '@constants';
import { globalStyles } from '@constants/globalStyles';

const ItineraryScreen: React.FC = () => {
  const {
    listItinerariesData,
    isLoadingListItineraries,
    isRefreshing,
    onRefresh,
    onNavigateDetail,
  } = useItinerary();

  const renderEmptyComponent = useCallback(() => {
    if (isLoadingListItineraries) {
      return (
        <View style={globalStyles.gap12}>
          {Array.from({ length: 3 }, (_, index) => (
            <SkeletonLoading
              key={index}
              height={350}
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
          text="No itineraries yet"
          type="bold-lg"
          color={Colors.neutral.base}
          textAlign="center"
        />
        <Text
          text="Start planning your first trip and it will appear here."
          type="regular-base"
          color={Colors.neutral.secondary}
          textAlign="center"
        />
      </View>
    );
  }, [isLoadingListItineraries]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          text="My Itineraries"
          type="bold-xl"
          color={Colors.neutral.base}
        />
        {listItinerariesData ? (
          <Text
            text={`${listItinerariesData?.length} generated itineraries`}
            type="regular-base"
            color={Colors.neutral.secondary}
          />
        ) : null}
      </View>

      <FlatList
        data={listItinerariesData}
        keyExtractor={item => item?.id ?? ''}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary.base]}
            tintColor={Colors.primary.base}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Card Image */}
            <ImageBackground
              source={{
                uri:
                  item?.cover_image ??
                  URL_PATH.images.noImages({
                    height: 180,
                    width: screenWidth - 48,
                  }),
              }}
              style={styles.cardImage}
              resizeMode="cover"
            >
              <View style={styles.imageOverlay} />
              <View style={styles.imageTextContainer}>
                <Text
                  text={item?.title ?? ''}
                  type="bold-lg"
                  color={Colors.white}
                />
                <Text
                  text={item?.start_date ?? ''}
                  type="regular-sm"
                  color={Colors.white}
                />
              </View>
            </ImageBackground>

            {/* Stats Row */}
            <View style={styles.cardBody}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text
                    text="Duration"
                    type="regular-sm"
                    color={Colors.neutral.secondary}
                  />
                  <Text
                    text={`${item?.duration_days} Days, ${item?.duration_nights} Nights`}
                    type="bold-sm"
                    color={Colors.neutral.base}
                    textAlign="center"
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                  <Text
                    text="Budget"
                    type="regular-sm"
                    color={Colors.neutral.secondary}
                  />
                  <Text
                    text={formatRupiah(item?.budget_range ?? '')}
                    type="bold-sm"
                    color={Colors.neutral.base}
                    textAlign="center"
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                  <Text
                    text="Places"
                    type="regular-sm"
                    color={Colors.neutral.secondary}
                  />
                  <Text
                    text={`${item?.total_destinations}`}
                    type="bold-sm"
                    color={Colors.neutral.base}
                    textAlign="center"
                  />
                </View>
              </View>
            </View>

            {/* View Details Button */}
            <View style={styles.cardFooter}>
              <Button
                label="View Details"
                icon="chevron-right"
                action={() => onNavigateDetail(item?.id ?? '')}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export { ItineraryScreen };
