/* eslint-disable react-native/no-inline-styles */
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text } from '@components';
import useDestinationDetail from './useDestinationDetail';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { globalStyles } from '@constants/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { OverviewTab, PhotosTab, ReviewsTab } from '@modules/detail/components';

const DestinationDetailScreen: React.FC = () => {
  const { data, navigation, TABS, activeTab, setActiveTab } =
    useDestinationDetail();

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
      <ScrollView pointerEvents="box-none" showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => navigation.goBack()}
          >
            <MaterialDesignIcons
              name="arrow-left"
              size={20}
              color={Colors.neutral.base}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: data?.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

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
                <View style={globalStyles.flex1}>
                  <TouchableOpacity
                    key={tab.key}
                    style={styles.tabItem}
                    onPress={() => {
                      setActiveTab(tab.key as any);
                    }}
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
      </ScrollView>

      <View style={styles.footerBtnContainer}>
        {/* <Button outline label="Add to Itinerary" style={{ width: '48%' }} /> */}
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
