import React, { useCallback } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, SkeletonLoading, Text } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import { globalStyles } from '@constants/globalStyles';
import MaterialDesignIcons, {
  MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import useHome from './useHome';
import { RecommendedCard } from '@modules/main/components';
import { screenWidth } from '@constants';

const HomeScreen: React.FC = () => {
  const {
    location,
    userData,
    popularCategories,
    isLoadingPopularCategories,
    isErrorPopularCategories,
    trendingDestinations,
    isLoadingTrendingDestinations,
    isErrorTrendingDestinations,
    // dummyRecommended,
    navigateScreen,
    onNavigateDestinationByCategories,
    onNavigateAllTrending,
    onNavigateDetail,
  } = useHome();

  const renderPopularCategories = useCallback(
    (isError: boolean) => {
      if (isError) return null;

      return (
        <View>
          {isLoadingPopularCategories ? (
            <View style={styles.loadingContainer}>
              <SkeletonLoading
                height={100}
                width={screenWidth - 42}
                borderRadius={10}
              />
            </View>
          ) : (
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
                data={popularCategories}
                keyExtractor={item => item?.id ?? ''}
                contentContainerStyle={[styles.gap8, globalStyles.paddingH24]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item?.id ?? ''}
                    style={styles.popularCategoryItem}
                    onPress={() => onNavigateDestinationByCategories({ item })}
                  >
                    {item?.icon_url ? (
                      <MaterialDesignIcons
                        name={item.icon_url as MaterialDesignIconsIconName}
                        size={24}
                        color={Colors.primary.base}
                      />
                    ) : null}
                    <Text
                      text={item.name}
                      type="bold-base"
                      color={Colors.neutral.base}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      );
    },
    [
      isLoadingPopularCategories,
      popularCategories,
      onNavigateDestinationByCategories,
    ],
  );

  const renderRecommended = useCallback(
    (isError: boolean) => {
      if (isError) return null;

      return (
        <View>
          {isLoadingTrendingDestinations ? (
            <View style={styles.loadingRowContainer}>
              {Array.from({ length: 3 }, (_, index) => (
                <SkeletonLoading
                  key={index}
                  height={260}
                  width={160}
                  borderRadius={10}
                />
              ))}
            </View>
          ) : (
            <View style={styles.gap16}>
              <View
                style={[globalStyles.flexRowBetween, globalStyles.paddingH24]}
              >
                <Text
                  text="Recommended for You"
                  type="bold-lg"
                  color={Colors.neutral.base}
                />

                <TouchableOpacity onPress={onNavigateAllTrending}>
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
                data={trendingDestinations}
                keyExtractor={item => item?.id ?? ''}
                contentContainerStyle={[styles.gap8, globalStyles.paddingH24]}
                renderItem={({ item }) => (
                  <RecommendedCard
                    item={item}
                    onNavigateDetail={() => onNavigateDetail({ item })}
                  />
                )}
              />
            </View>
          )}
        </View>
      );
    },
    [
      isLoadingTrendingDestinations,
      trendingDestinations,
      onNavigateAllTrending,
      onNavigateDetail,
    ],
  );

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
                text={`Hello, ${userData?.name}!`}
                type="regular-base"
                color={Colors.white}
              />
              {location?.city ? (
                <View style={styles.travelerLocationRow}>
                  <MaterialDesignIcons
                    name="map-marker-outline"
                    size={16}
                    color={Colors.white}
                  />
                  <Text
                    text={`${location?.city}${
                      location?.country ? `, ${location?.country}` : ''
                    }`}
                    type="bold-lg"
                    color={Colors.white}
                  />
                </View>
              ) : null}
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
                  text="Plan Your Escape"
                  type="bold-base"
                  color={Colors.primary.base}
                />
              </View>
            </Button>
          </View>
        </View>

        <View style={styles.container}>
          {/* Popular Categories */}
          {renderPopularCategories(isErrorPopularCategories)}

          {/* Recommended for You */}
          {renderRecommended(isErrorTrendingDestinations)}

          {/* Nearby Places */}
          {/* <View style={styles.gap16}>
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
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export { HomeScreen };
