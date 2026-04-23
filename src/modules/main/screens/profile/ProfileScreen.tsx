import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from '@components';
import { Colors } from '@constants/colors';
import MaterialDesignIcons, {
  MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import { styles } from './styles';
import useProfile from './useProfile';

const ProfileScreen: React.FC = () => {
  const { dummyUser, menuSections, handleLogout } = useProfile();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar & User Info */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <MaterialDesignIcons
                name="account-outline"
                size={40}
                color={Colors.white}
              />
            </View>
            <View style={styles.editBadge}>
              <MaterialDesignIcons
                name="pencil"
                size={12}
                color={Colors.neutral.secondary}
              />
            </View>
          </View>

          <Text
            text={dummyUser.name}
            type="bold-lg"
            color={Colors.neutral.base}
            style={styles.userName}
          />
          <Text
            text={dummyUser.email}
            type="regular-base"
            color={Colors.neutral.secondary}
          />

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, styles.statIconBlue]}>
                <MaterialDesignIcons
                  name="map-marker-outline"
                  size={20}
                  color={Colors.primary.base}
                />
              </View>
              <Text
                text={dummyUser.visited.toString()}
                type="bold-lg"
                color={Colors.neutral.base}
              />
              <Text
                text="Visited"
                type="regular-sm"
                color={Colors.neutral.secondary}
              />
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, styles.statIconBlue]}>
                <MaterialDesignIcons
                  name="bookmark-outline"
                  size={20}
                  color={Colors.primary.base}
                />
              </View>
              <Text
                text={dummyUser.saved.toString()}
                type="bold-lg"
                color={Colors.neutral.base}
              />
              <Text
                text="Saved"
                type="regular-sm"
                color={Colors.neutral.secondary}
              />
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, styles.statIconYellow]}>
                <MaterialDesignIcons
                  name="star"
                  size={20}
                  color={Colors.warning.base}
                />
              </View>
              <Text
                text={dummyUser.reviews.toString()}
                type="bold-lg"
                color={Colors.neutral.base}
              />
              <Text
                text="Reviews"
                type="regular-sm"
                color={Colors.neutral.secondary}
              />
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.sectionsContainer}>
          {menuSections.map(section => (
            <View key={section.title}>
              <Text
                text={section.title}
                type="regular-sm"
                color={Colors.neutral.secondary}
                style={styles.sectionLabel}
              />
              <View style={styles.menuCard}>
                {section.items.map((item, index) => (
                  <View key={item.id}>
                    {index > 0 && <View style={styles.menuItemDivider} />}
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={item.onPress}
                      activeOpacity={0.7}
                    >
                      <MaterialDesignIcons
                        name={item.icon as MaterialDesignIconsIconName}
                        size={20}
                        color={Colors.neutral.base}
                      />
                      <Text
                        text={item.label}
                        type="regular-base"
                        color={Colors.neutral.base}
                        style={styles.menuItemLabel}
                      />
                      <View style={styles.menuItemRight}>
                        {item.rightLabel && (
                          <Text
                            text={item.rightLabel}
                            type="regular-sm"
                            color={Colors.neutral.secondary}
                          />
                        )}
                        <MaterialDesignIcons
                          name="chevron-right"
                          size={20}
                          color={Colors.neutral.secondary}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons
              name="logout-variant"
              size={20}
              color={Colors.danger.base}
            />
            <Text text="Logout" type="bold-base" color={Colors.danger.base} />
          </TouchableOpacity>

          {/* Version */}
          <Text
            text="SIBALI v1.0.0"
            type="regular-sm"
            color={Colors.neutral.secondary}
            style={styles.versionText}
            textAlign="center"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export { ProfileScreen };
