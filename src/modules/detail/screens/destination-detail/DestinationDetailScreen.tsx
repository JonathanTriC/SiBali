/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text } from '@components';
import useDestinationDetail from './useDestinationDetail';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { globalStyles } from '@constants/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { OverviewTab, PhotosTab, ReviewsTab } from '@modules/detail/components';
import { useRef } from 'react';

const HEADER_SCROLL_THRESHOLD = 80;

const DestinationDetailScreen: React.FC = () => {
  const { data, navigation, TABS, activeTab, setActiveTab } =
    useDestinationDetail();

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
        return <OverviewTab data={data} />;
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
        <Image
          source={{ uri: data?.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={globalStyles.gap8}>
            <View style={globalStyles.flexRowBetween}>
              <Text
                text={data?.name}
                type="bold-xl"
                color={Colors.neutral.base}
                numberOfLines={2}
                style={{ width: '80%' }}
              />
              <View style={styles.badgeContainer}>
                <Text
                  text={data?.category}
                  type="bold-sm"
                  color={Colors.neutral.base}
                />
              </View>
            </View>

            <View style={styles.starRow}>
              <MaterialDesignIcons
                name="star"
                size={16}
                color={Colors.warning.base}
              />
              <Text
                text={data?.rating}
                type="bold-base"
                color={Colors.neutral.base}
              />
              <Text
                text={`(${data?.reviewsCount} reviews)`}
                type="regular-base"
                color={Colors.neutral.secondary}
              />
            </View>
          </View>

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
                text={data?.aiInsight}
                type="regular-base"
                color={Colors.neutral.base}
              />
            </View>
          </View>

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

          {renderContent()}
        </View>
      </Animated.ScrollView>

      <View style={styles.footerBtnContainer}>
        <Button
          iconLeft="navigation-variant-outline"
          label="Navigate"
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};

export { DestinationDetailScreen };
