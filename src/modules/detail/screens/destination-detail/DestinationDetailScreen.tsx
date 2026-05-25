/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, SkeletonLoading, Text } from '@components';
import useDestinationDetail from './useDestinationDetail';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { globalStyles } from '@constants/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { OverviewTab, PhotosTab, ReviewsTab } from '@modules/detail/components';
import { useRef } from 'react';
import { URL_PATH } from '@constants/url';
import { screenHeight, screenWidth } from '@constants';

const HEADER_SCROLL_THRESHOLD = 80;

const DestinationDetailScreen: React.FC = () => {
  const {
    navigation,
    TABS,
    activeTab,
    destinationDetail,
    isLoadingDestinationDetail,
    setActiveTab,
    handleOpenNavigate,
  } = useDestinationDetail();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerBgOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const iconBgOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_THRESHOLD],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab data={destinationDetail ?? {}} />;
      case 'reviews':
        return <ReviewsTab />;
      case 'photos':
        return <PhotosTab />;
      default:
        return null;
    }
  };

  return (
    <View style={globalStyles.flex1}>
      {/* Sticky Header */}
      <Animated.View
        style={[styles.stickyHeader, { opacity: headerBgOpacity }]}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.stickyHeaderBg,
            { opacity: headerBgOpacity },
          ]}
        />
      </Animated.View>

      {/* Sticky Back Button */}
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        {/* White pill bg fades out when header bg fades in */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.backIconBg,
            { opacity: iconBgOpacity },
          ]}
        />
        <MaterialDesignIcons
          name="arrow-left"
          size={20}
          color={Colors.neutral.base}
        />
      </TouchableOpacity>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        {/* Image Skeleton */}
        {isLoadingDestinationDetail ? (
          <SkeletonLoading
            width={screenWidth}
            height={screenHeight / 3}
            borderRadius={0}
          />
        ) : (
          <Image
            source={{
              uri:
                destinationDetail?.images?.[0] ??
                URL_PATH.images.noImages({
                  height: screenHeight / 3,
                  width: screenWidth,
                }),
            }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.content}>
          {/* Title and Badge Skeleton */}
          {isLoadingDestinationDetail ? (
            <View style={globalStyles.gap8}>
              <View style={globalStyles.flexRowBetween}>
                <SkeletonLoading width="70%" height={28} borderRadius={4} />
                <SkeletonLoading width={80} height={28} borderRadius={14} />
              </View>
              <SkeletonLoading width="40%" height={20} borderRadius={4} />
            </View>
          ) : (
            <View style={globalStyles.gap8}>
              <View style={[globalStyles.flexRowBetween, globalStyles.gap8]}>
                <Text
                  text={destinationDetail?.name || ''}
                  type="bold-xl"
                  color={Colors.neutral.base}
                  numberOfLines={2}
                  style={globalStyles.flex1}
                />
                {destinationDetail?.categories?.name && (
                  <View style={styles.badgeContainer}>
                    <Text
                      text={destinationDetail?.categories?.name}
                      type="bold-sm"
                      color={Colors.neutral.base}
                    />
                  </View>
                )}
              </View>

              <View style={styles.starRow}>
                <MaterialDesignIcons
                  name="star"
                  size={16}
                  color={Colors.warning.base}
                />
                <Text
                  text={`${destinationDetail?.rating_avg ?? '0.0'}`}
                  type="bold-base"
                  color={Colors.neutral.base}
                />
                <Text
                  text={`(${destinationDetail?.rating_count ?? 0} reviews)`}
                  type="regular-base"
                  color={Colors.neutral.secondary}
                />
                <MaterialDesignIcons
                  name="chart-line-variant"
                  size={16}
                  color={Colors.neutral.base}
                />
                <Text
                  text={`${destinationDetail?.view_count ?? '0'} Visits`}
                  type="regular-base"
                  color={Colors.neutral.secondary}
                />
              </View>
            </View>
          )}

          {/* AI Insight Skeleton */}
          {isLoadingDestinationDetail ? (
            <View style={styles.outerAIInsight}>
              <View style={styles.innerAIInsight}>
                <View style={styles.logoAIInsightRow}>
                  <SkeletonLoading width={24} height={24} borderRadius={12} />
                  <SkeletonLoading width={100} height={20} borderRadius={4} />
                </View>
                <SkeletonLoading width="100%" height={60} borderRadius={4} />
              </View>
            </View>
          ) : (
            <View style={styles.outerAIInsight}>
              <View style={styles.innerAIInsight}>
                <View style={styles.logoAIInsightRow}>
                  <View style={styles.logoAIInsightContainer}>
                    <LinearGradient
                      colors={['#005B8C', '#083344']}
                      start={{ x: 0.85, y: 0.85 }}
                      end={{ x: 0.15, y: 0.15 }}
                      style={styles.logoAIInsight}
                    />
                    <View>
                      <MaterialDesignIcons
                        name="star-outline"
                        size={12}
                        color={Colors.white}
                      />
                    </View>
                  </View>
                  <Text
                    text="AI INSIGHT"
                    type="bold-base"
                    color={Colors.primary.base}
                  />
                </View>
                <Text
                  text={
                    destinationDetail?.ai_description ||
                    'No AI insights available for this destination.'
                  }
                  type="regular-base"
                  color={Colors.neutral.base}
                />
              </View>
            </View>
          )}

          {/* Tab Bar Skeleton */}
          {isLoadingDestinationDetail ? (
            <View style={styles.tabBar}>
              {Array.from({ length: 3 }, (_, index) => (
                <View style={globalStyles.flex1} key={index}>
                  <View style={styles.tabItem}>
                    <SkeletonLoading width={80} height={20} borderRadius={4} />
                  </View>
                  <View style={styles.divider} />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.tabBar}>
              {TABS.map(tab => {
                const isActive = activeTab === tab.key;
                return (
                  <View style={globalStyles.flex1} key={tab.key}>
                    <TouchableOpacity
                      style={styles.tabItem}
                      onPress={() => setActiveTab(tab.key as any)}
                    >
                      <Text
                        text={tab?.label}
                        type="bold-base"
                        color={
                          isActive
                            ? Colors.primary.base
                            : Colors.neutral.secondary
                        }
                      />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    {isActive && <View style={styles.indicator} />}
                  </View>
                );
              })}
            </View>
          )}

          {/* Tab Content Skeleton */}
          {isLoadingDestinationDetail ? (
            <View style={globalStyles.gap16}>
              <SkeletonLoading width="100%" height={100} borderRadius={8} />
              <SkeletonLoading width="100%" height={100} borderRadius={8} />
              <SkeletonLoading width="100%" height={100} borderRadius={8} />
            </View>
          ) : (
            renderContent()
          )}
        </View>
      </Animated.ScrollView>

      <View style={styles.footerBtnContainer}>
        <Button
          iconLeft="navigation-variant-outline"
          label="Navigate"
          style={{ width: '100%' }}
          action={handleOpenNavigate}
        />
      </View>
    </View>
  );
};

export { DestinationDetailScreen };
