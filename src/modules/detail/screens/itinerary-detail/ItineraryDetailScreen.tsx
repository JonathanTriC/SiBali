import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text, SkeletonLoading } from '@components';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { styles } from './styles';
import useItineraryDetail from './useItineraryDetail';
import { URL_PATH } from '@constants/url';
import { globalStyles } from '@constants/globalStyles';
import { screenWidth } from '@constants';
import dayjs from 'dayjs';

const ItineraryDetailScreen: React.FC = () => {
  const {
    navigation,
    detailItineraryData,
    isLoadingDetailItinerary,
    onNavigatePlace,
  } = useItineraryDetail();

  const renderSkeleton = () => (
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

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialDesignIcons
        name="calendar-remove-outline"
        size={48}
        color={Colors.neutral.secondary}
      />
      <Text
        text="No itinerary found"
        type="bold-base"
        color={Colors.neutral.base}
      />
      <Text
        text="This itinerary has no days planned yet."
        type="regular-sm"
        color={Colors.neutral.secondary}
      />
    </View>
  );

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
            color={Colors.primary.base}
          />
          <Text
            text="Back to Itineraries"
            type="bold-base"
            color={Colors.primary.base}
          />
        </TouchableOpacity>

        {isLoadingDetailItinerary ? (
          <View style={globalStyles.gap12}>
            <SkeletonLoading
              height={28}
              width={screenWidth - 42}
              borderRadius={8}
            />
            <SkeletonLoading
              height={18}
              width={(screenWidth - 42) * 0.6}
              borderRadius={8}
            />
          </View>
        ) : (
          <>
            <Text
              text={detailItineraryData?.title}
              type="bold-xl"
              color={Colors.neutral.base}
            />
            <View style={styles.subtitleRow}>
              <Text
                text={`${detailItineraryData?.duration_days} Days, ${detailItineraryData?.duration_nights} Nights`}
                type="regular-base"
                color={Colors.neutral.secondary}
              />
              <View style={styles.dot} />
              <Text
                text={`${detailItineraryData?.total_destinations} Destinations`}
                type="regular-base"
                color={Colors.neutral.secondary}
              />
            </View>
          </>
        )}
      </View>

      {/* Day List */}
      {isLoadingDetailItinerary ? (
        <View style={[styles.listContent, globalStyles.gap12]}>
          {renderSkeleton()}
        </View>
      ) : (
        <FlatList
          data={detailItineraryData?.itinerary_days}
          keyExtractor={item => item?.id ?? ''}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          renderItem={({ item: dayItem }) => (
            <View style={styles.dayCard}>
              {/* Day Header */}
              <View style={styles.dayHeader}>
                <View style={styles.dayIconContainer}>
                  <MaterialDesignIcons
                    name="calendar-outline"
                    size={18}
                    color={Colors.primary.base}
                  />
                </View>
                <View style={styles.dayTitleGroup}>
                  <Text
                    text={`Day ${dayItem?.day_number}`}
                    type="bold-lg"
                    color={Colors.neutral.base}
                  />
                  {dayItem?.date ? (
                    <Text
                      text={dayItem?.date ?? ''}
                      type="regular-sm"
                      color={Colors.neutral.secondary}
                    />
                  ) : null}
                </View>
              </View>

              {/* Places */}
              <View style={styles.placesContainer}>
                {dayItem?.itinerary_items?.length === 0 ? (
                  <Text
                    text="No places added for this day."
                    type="regular-sm"
                    color={Colors.neutral.secondary}
                  />
                ) : (
                  dayItem?.itinerary_items?.map(place => (
                    <TouchableOpacity
                      key={place.id}
                      style={styles.placeCard}
                      activeOpacity={0.7}
                      onPress={() =>
                        onNavigatePlace(place?.destination_id ?? '')
                      }
                    >
                      {/* Place Image */}
                      <View>
                        <Image
                          source={{
                            uri:
                              place?.destinations?.images?.[0] ??
                              URL_PATH.images.noImages({
                                height: 72,
                                width: 72,
                              }),
                          }}
                          style={styles.placeImage}
                          resizeMode="cover"
                        />
                        <View style={styles.placeNumberBadge}>
                          <Text
                            text={`${place?.order_in_day}`}
                            type="bold-sm"
                            color={Colors.white}
                          />
                        </View>
                      </View>

                      {/* Place Info */}
                      <View style={styles.placeInfo}>
                        <Text
                          text={place?.destinations?.name ?? ''}
                          type="bold-base"
                          color={Colors.neutral.base}
                          numberOfLines={1}
                        />
                        <View style={styles.placeTimeRow}>
                          <MaterialDesignIcons
                            name="clock-outline"
                            size={14}
                            color={Colors.neutral.secondary}
                          />
                          <Text
                            text={dayjs(place?.visit_time, 'HH:mm:ss').format(
                              'hh:mm A',
                            )}
                            type="regular-sm"
                            color={Colors.neutral.secondary}
                          />
                        </View>
                      </View>

                      {/* Chevron */}
                      <View style={styles.chevronContainer}>
                        <MaterialDesignIcons
                          name="chevron-right"
                          size={20}
                          color={Colors.neutral.secondary}
                        />
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export { ItineraryDetailScreen };
