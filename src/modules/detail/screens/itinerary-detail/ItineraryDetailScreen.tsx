import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from '@components';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { styles } from './styles';
import useItineraryDetail from './useItineraryDetail';

const ItineraryDetailScreen: React.FC = () => {
  const { data, navigation, onNavigatePlace } = useItineraryDetail();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
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

        <Text
          text={data?.title}
          type="bold-xl"
          color={Colors.neutral.base}
        />

        <View style={styles.subtitleRow}>
          <Text
            text={data?.duration}
            type="regular-base"
            color={Colors.neutral.secondary}
          />
          <View style={styles.dot} />
          <Text
            text={`${data?.placesCount} Destinations`}
            type="regular-base"
            color={Colors.neutral.secondary}
          />
        </View>
      </View>

      {/* Day List */}
      <FlatList
        data={data?.days}
        keyExtractor={item => item.day.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
                  text={`Day ${dayItem.day}`}
                  type="bold-lg"
                  color={Colors.neutral.base}
                />
                <Text
                  text={dayItem.date}
                  type="regular-sm"
                  color={Colors.neutral.secondary}
                />
              </View>
            </View>

            {/* Places */}
            <View style={styles.placesContainer}>
              {dayItem.places.map(place => (
                <TouchableOpacity
                  key={place.id}
                  style={styles.placeCard}
                  activeOpacity={0.7}
                  onPress={() => place.destination && onNavigatePlace(place.destination)}
                >
                  {/* Place Image */}
                  <View>
                    <Image
                      source={{ uri: place.image }}
                      style={styles.placeImage}
                      resizeMode="cover"
                    />
                    <View style={styles.placeNumberBadge}>
                      <Text
                        text={place.id.toString()}
                        type="bold-sm"
                        color={Colors.white}
                      />
                    </View>
                  </View>

                  {/* Place Info */}
                  <View style={styles.placeInfo}>
                    <Text
                      text={place.name}
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
                        text={place.time}
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
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export { ItineraryDetailScreen };
