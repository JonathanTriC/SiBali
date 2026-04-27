/* eslint-disable react-native/no-inline-styles */
import { Button, LoadingModal, Text } from '@components';
import { Colors } from '@constants/colors';
import { globalStyles } from '@constants/globalStyles';
import MaterialDesignIcons, {
  MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import useInterests from './useInterests';

const InterestsScreen: React.FC = () => {
  const {
    isFromRegister,
    interestsList,
    isLoadingInterestsList,
    isLoadingSubmitUserInterests,
    isLoadingUserInterest,
    selectedIds,
    isMinSelected,
    toggleInterest,
    popScreen,
    handleSubmitInterests,
    handleNavigateHome,
  } = useInterests();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => popScreen()}>
          <MaterialDesignIcons
            name="arrow-left"
            size={24}
            color={Colors.neutral.base}
          />
        </TouchableOpacity>

        <View style={globalStyles.flex1}>
          {isFromRegister ? (
            <TouchableOpacity onPress={handleNavigateHome}>
              <Text
                text="Skip"
                type="bold-lg"
                textAlign="right"
                color={Colors.primary.base}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.container}>
        {/* Title */}
        <View style={globalStyles.gap8}>
          <Text
            text="What interests you?"
            type="bold-2xl"
            color={Colors.neutral.base}
          />
          <Text
            text={'Pick at least 3 activities to personalize your experience'}
            type="regular-lg"
            color={Colors.neutral.secondary}
          />
        </View>

        {/* List */}
        <FlatList
          data={interestsList}
          numColumns={2}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          style={globalStyles.flex1}
          contentContainerStyle={[globalStyles.gap12, { paddingBottom: 120 }]}
          columnWrapperStyle={globalStyles.gap12}
          renderItem={({ item }) => {
            if (!item?.id) return null;
            const isActive = selectedIds.includes(item?.id);
            return (
              <TouchableOpacity
                key={item?.id}
                style={{ width: '47%', marginTop: 8 }}
                onPress={() => toggleInterest(item?.id ?? '')}
              >
                <View
                  style={[
                    styles.interestItem,
                    isActive ? styles.activeInterestItem : {},
                  ]}
                >
                  {item?.icon_url ? (
                    <View
                      style={[
                        styles.interestItemIcon,
                        isActive ? styles.activeInterestItemIcon : {},
                      ]}
                    >
                      <MaterialDesignIcons
                        name={item.icon_url as MaterialDesignIconsIconName}
                        color={
                          isActive
                            ? Colors.primary.base
                            : Colors.neutral.secondary
                        }
                        size={20}
                      />
                    </View>
                  ) : null}
                  <Text text={item.name} />
                </View>
                <View
                  style={[
                    styles.checkInterestIcon,
                    {
                      backgroundColor: isActive
                        ? Colors.primary.base
                        : 'transparent',
                      borderColor: isActive ? Colors.white : 'transparent',
                    },
                  ]}
                >
                  <MaterialDesignIcons
                    name="check"
                    size={16}
                    color={Colors.white}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* Button */}
        <View style={styles.footerBtn}>
          <Button
            isDisabled={!isMinSelected}
            label={isFromRegister ? 'Continue' : 'Save'}
            action={handleSubmitInterests}
          />
        </View>
      </View>

      <LoadingModal isVisible={isLoadingUserInterest} />
      <LoadingModal isVisible={isLoadingInterestsList} />
      <LoadingModal isVisible={isLoadingSubmitUserInterests} />
    </View>
  );
};

export { InterestsScreen };
