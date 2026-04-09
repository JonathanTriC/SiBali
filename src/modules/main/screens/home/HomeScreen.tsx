import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import { globalStyles } from '@constants/globalStyles';
import MaterialDesignIcons, {
  MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import useHome from './useHome';
import { RecommendedCard, NearbyPlacesCard } from '@modules/main/components';

const HomeScreen: React.FC = () => {
  const { dummyPopularCategories, dummyRecommended, navigateScreen } =
    useHome();

  return (
    <View style={globalStyles.flex1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#005B8C', '#083344']}
            start={{ x: 0.85, y: 0.85 }}
            end={{ x: 0.15, y: 0.15 }}
            style={styles.headerBackground}
          />
          <View style={styles.gap24}>
            <View style={styles.gap8}>
              <Text
                text="Hello, Traveler!"
                type="regular-base"
                color={Colors.white}
              />
              <View style={styles.travelerLocationRow}>
                <MaterialDesignIcons
                  name="map-marker-outline"
                  size={16}
                  color={Colors.white}
                />
                <Text
                  text="Denpasar, Bali"
                  type="bold-lg"
                  color={Colors.white}
                />
              </View>
            </View>

            <Button
              background={Colors.white}
              action={() =>
                navigateScreen('Main', { screen: 'DiscoverScreen' })
              }
            >
              <View style={styles.askAIRow}>
                <MaterialDesignIcons
                  name="creation-outline"
                  size={20}
                  color={Colors.primary.base}
                />
                <Text
                  text="Ask AI Assistant"
                  type="bold-base"
                  color={Colors.primary.base}
                />
              </View>
            </Button>
          </View>
        </View>

        <View style={styles.container}>
          {/* Popular Categories */}
          <View style={styles.gap16}>
            <Text
              text="Popular Categories"
              type="bold-lg"
              color={Colors.neutral.base}
              style={globalStyles.paddingH24}
            />

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dummyPopularCategories}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={[styles.gap8, globalStyles.paddingH24]}
              renderItem={({ item }) => (
                <View style={styles.popularCategoryItem}>
                  <MaterialDesignIcons
                    name={item.icon as MaterialDesignIconsIconName}
                    size={24}
                    color={Colors.primary.base}
                  />
                  <Text
                    text={item.name}
                    type="bold-base"
                    color={Colors.neutral.base}
                  />
                </View>
              )}
            />
          </View>

          {/* Recommended for You */}
          <View style={styles.gap16}>
            <View
              style={[globalStyles.flexRowBetween, globalStyles.paddingH24]}
            >
              <Text
                text="Recommended for You"
                type="bold-lg"
                color={Colors.neutral.base}
              />

              <TouchableOpacity>
                <Text
                  text="See All"
                  type="regular-sm"
                  color={Colors.primary.base}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dummyRecommended}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={[styles.gap8, globalStyles.paddingH24]}
              renderItem={({ item }) => <RecommendedCard item={item} />}
            />
          </View>

          {/* Nearby Places */}
          <View style={styles.gap16}>
            <Text
              text="Nearby Places"
              type="bold-lg"
              color={Colors.neutral.base}
              style={globalStyles.paddingH24}
            />

            <FlatList
              scrollEnabled={false}
              data={dummyRecommended}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={[
                globalStyles.gap12,
                globalStyles.paddingH24,
              ]}
              renderItem={({ item }) => <NearbyPlacesCard item={item} />}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export { HomeScreen };
