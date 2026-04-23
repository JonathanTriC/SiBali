import React from 'react';
import { FlatList, ImageBackground, View } from 'react-native';
import { Button, Text } from '@components';
import { Colors } from '@constants/colors';
import { styles } from './styles';
import useItinerary from './useItinerary';

const ItineraryScreen: React.FC = () => {
  const { dummyItineraryList, onNavigateDetail } = useItinerary();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          text="My Itineraries"
          type="bold-xl"
          color={Colors.neutral.base}
        />
        <Text
          text={`${dummyItineraryList.length} generated itineraries`}
          type="regular-base"
          color={Colors.neutral.secondary}
        />
      </View>

      <FlatList
        data={dummyItineraryList}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Card Image */}
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.cardImage}
              resizeMode="cover"
            >
              <View style={styles.imageOverlay} />
              <View style={styles.imageTextContainer}>
                <Text text={item.title} type="bold-lg" color={Colors.white} />
                <Text text={item.date} type="regular-sm" color={Colors.white} />
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
                    text={item.duration}
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
                    text={item.budget}
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
                    text={item.placesCount.toString()}
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
                action={() => onNavigateDetail(item)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export { ItineraryScreen };
