/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, CounterInput, Text, TextField } from '@components';
import { styles } from './styles';
import { HeaderDiscover } from '@modules/main/components';
import { globalStyles } from '@constants/globalStyles';
import { Colors } from '@constants/colors';
import PagerView from 'react-native-pager-view';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import useDiscover from './useDiscover';
import LinearGradient from 'react-native-linear-gradient';

const StepOneDiscover = ({
  days,
  nights,
  onChangeDays,
  onChangeNights,
  onContinue,
}: {
  days: number;
  nights: number;
  onChangeDays: (val: number) => void;
  onChangeNights: (val: number) => void;
  onContinue: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <Text
        text={'How long will you be\ntraveling?'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />
      <Text
        text="Enter the number of days and nights"
        type="regular-lg"
        color={Colors.neutral.secondary}
        textAlign="center"
      />

      <View style={styles.step1CounterRow}>
        <View style={styles.step1CounterItem}>
          <Text
            text="Days"
            type="regular-base"
            color={Colors.neutral.secondary}
          />
          <CounterInput value={days} min={1} max={10} onChange={onChangeDays} />
        </View>
        <View style={styles.step1CounterItem}>
          <Text
            text="Nights"
            type="regular-base"
            color={Colors.neutral.secondary}
          />
          <CounterInput
            value={nights}
            min={days - 1}
            max={days}
            onChange={onChangeNights}
          />
        </View>
      </View>

      <Button label="Continue" action={onContinue} />
    </View>
  );
};

const StepTwoDiscover = ({
  dummyExperience,
  selectedExperienceIds,
  isMinSelectedExperience,
  toggleExperience,
  onContinue,
}: {
  dummyExperience: { id: number; text: string }[];
  selectedExperienceIds: number[];
  isMinSelectedExperience: boolean;
  toggleExperience: (id: number) => void;
  onContinue: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <Text
        text={'What kind of experience are\nyou looking for?'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />
      <Text
        text="Select all that apply"
        type="regular-lg"
        color={Colors.neutral.secondary}
        textAlign="center"
      />

      <FlatList
        data={dummyExperience}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={globalStyles.flex1}
        contentContainerStyle={[globalStyles.gap12]}
        columnWrapperStyle={globalStyles.gap12}
        renderItem={({ item }) => {
          const isActive = selectedExperienceIds.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={{ width: '47%', marginTop: 8 }}
              onPress={() => toggleExperience(item.id)}
            >
              <View
                style={[
                  styles.step2ExperienceItem,
                  isActive ? styles.step2ActiveExperienceItem : {},
                ]}
              >
                <Text text={item.text} textAlign="center" />
              </View>
              <View
                style={[
                  styles.step2CheckIcon,
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

      <Button
        label={`Continue (${selectedExperienceIds?.length} selected)`}
        isDisabled={!isMinSelectedExperience}
        action={onContinue}
      />
    </View>
  );
};

const StepThreeDiscover = ({
  dummyBudget,
  selectedBudgetIds,
  onSelectBudget,
  onContinue,
}: {
  dummyBudget: { id: number; text: string }[];
  selectedBudgetIds: number;
  onSelectBudget: (id: number) => void;
  onContinue: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <Text
        text={"What's your budget range?"}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />

      <FlatList
        data={dummyBudget}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={globalStyles.flex1}
        contentContainerStyle={[globalStyles.gap12]}
        columnWrapperStyle={globalStyles.gap12}
        renderItem={({ item }) => {
          const isActive = selectedBudgetIds === item?.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={{ width: '47%', marginTop: 8 }}
              onPress={() => {
                onSelectBudget(item.id);
                onContinue();
              }}
            >
              <View
                style={[
                  styles.step2ExperienceItem,
                  isActive ? styles.step2ActiveExperienceItem : {},
                ]}
              >
                <Text text={item.text} textAlign="center" />
              </View>
              <View
                style={[
                  styles.step2CheckIcon,
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
    </View>
  );
};

const StepFourDiscover = ({
  dummyTravelPartners,
  selectedTravelPartnersIds,
  onSelectTravelPartners,
  onContinue,
}: {
  dummyTravelPartners: { id: number; text: string }[];
  selectedTravelPartnersIds: number;
  onSelectTravelPartners: (id: number) => void;
  onContinue: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <Text
        text={'Who are you traveling with?'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />

      <FlatList
        data={dummyTravelPartners}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={globalStyles.flex1}
        contentContainerStyle={[globalStyles.gap12]}
        columnWrapperStyle={globalStyles.gap12}
        renderItem={({ item }) => {
          const isActive = selectedTravelPartnersIds === item?.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={{ width: '47%', marginTop: 8 }}
              onPress={() => {
                onSelectTravelPartners(item.id);
                onContinue();
              }}
            >
              <View
                style={[
                  styles.step2ExperienceItem,
                  isActive ? styles.step2ActiveExperienceItem : {},
                ]}
              >
                <Text text={item.text} textAlign="center" />
              </View>
              <View
                style={[
                  styles.step2CheckIcon,
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
    </View>
  );
};

const StepFiveDiscover = ({
  dummyActivities,
  selectedActivitiesIds,
  isMinSelectedActivities,
  toggleActivities,
  onContinue,
}: {
  dummyActivities: { id: number; text: string }[];
  selectedActivitiesIds: number[];
  isMinSelectedActivities: boolean;
  toggleActivities: (id: number) => void;
  onContinue: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <Text
        text={'What activities interest you?'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />
      <Text
        text="Select all that apply"
        type="regular-lg"
        color={Colors.neutral.secondary}
        textAlign="center"
      />

      <FlatList
        data={dummyActivities}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={globalStyles.flex1}
        contentContainerStyle={[globalStyles.gap12]}
        columnWrapperStyle={globalStyles.gap12}
        renderItem={({ item }) => {
          const isActive = selectedActivitiesIds.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={{ width: '47%', marginTop: 8 }}
              onPress={() => toggleActivities(item.id)}
            >
              <View
                style={[
                  styles.step2ExperienceItem,
                  isActive ? styles.step2ActiveExperienceItem : {},
                ]}
              >
                <Text text={item.text} textAlign="center" />
              </View>
              <View
                style={[
                  styles.step2CheckIcon,
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

      <Button
        label={`Continue (${selectedActivitiesIds?.length} selected)`}
        isDisabled={!isMinSelectedActivities}
        action={onContinue}
      />
    </View>
  );
};

const StepSixDiscover = ({
  onAddCustomPreferences,
  onGenerateItinerary,
}: {
  onAddCustomPreferences: () => void;
  onGenerateItinerary: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <Text
        text={'Any special requests?'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />
      <Text
        text="Add custom preferences or skip to finish"
        type="regular-lg"
        color={Colors.neutral.secondary}
        textAlign="center"
      />

      <Button
        outline
        label="Add Custom Preferences ✍️"
        action={onAddCustomPreferences}
      />
      <Button label="Skip & Generate Itinerary" action={onGenerateItinerary} />
    </View>
  );
};

const StepSixDiscoverPreference = ({
  onBack,
  onGenerate,
}: {
  onBack: () => void;
  onGenerate: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <Text
        text={'Tell us your preferences'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />

      <TextField
        multiline
        placeholder="E.g., I want to visit Ubud, prefer vegetarian food, need wheelchair accessible places..."
        onChangeText={() => {}}
        inputTextStyle={{ height: 150 }}
      />

      <View style={styles.stepPreferenceBtnRow}>
        <Button
          label="Back"
          style={{ width: '48%' }}
          borderWidth={1}
          borderColor={Colors.neutral.secondaryDark}
          background={Colors.neutral.secondaryLight}
          color={Colors.neutral.base}
          action={onBack}
        />
        <Button
          label="Generate Itinerary"
          style={{ width: '48%' }}
          action={onGenerate}
        />
      </View>
    </View>
  );
};

const StepCompleteDiscover = ({
  onViewItinerary,
  onStartOver,
}: {
  onViewItinerary: () => void;
  onStartOver: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.checkBadgeContainer}>
          <LinearGradient
            colors={['#005B8C', '#083344']}
            start={{ x: 0.85, y: 0.85 }}
            end={{ x: 0.15, y: 0.15 }}
            style={styles.checkBadge}
          />
          <View>
            <MaterialDesignIcons name="check" size={40} color={Colors.white} />
          </View>
        </View>
      </View>

      <Text
        text={'Your Itinerary is Ready!'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />
      <Text
        text="We've created a personalized 3 days, 2 nights itinerary based on your preferences."
        type="regular-lg"
        color={Colors.neutral.secondary}
        textAlign="center"
      />

      <Button label="View My Itinerary 📅" action={onViewItinerary} />
      <Button
        label="Start Over"
        background={Colors.white}
        color={Colors.primary.base}
        action={onStartOver}
      />
    </View>
  );
};

const DiscoverScreen: React.FC = () => {
  const {
    pagerRef,
    dummyExperience,
    dummyBudget,
    dummyTravelPartners,
    dummyActivities,
    days,
    nights,
    isMinSelectedExperience,
    isMinSelectedActivities,
    currentStep,
    selectedExperienceIds,
    selectedBudgetIds,
    selectedTravelPartnersIds,
    selectedActivitiesIds,
    stepSixMode,
    setCurrentStep,
    handleDaysChange,
    handleNightsChange,
    toggleExperience,
    onSelectBudget,
    onSelectTravelPartners,
    toggleActivities,
    goCustomPreferences,
    goGenerateItinerary,
    goNext,
    goPrevious,
    onViewItinerary,
    onStartOver,
  } = useDiscover();

  return (
    <View style={globalStyles.flex1} pointerEvents="box-none">
      <HeaderDiscover step={currentStep !== 6 ? currentStep + 1 : 6} />
      {currentStep > 0 && currentStep < 6 && stepSixMode !== 'forms' ? (
        <TouchableOpacity style={styles.backContainer} onPress={goPrevious}>
          <View style={styles.backIcon}>
            <MaterialDesignIcons
              name="arrow-left"
              size={20}
              color={Colors.primary.base}
            />
          </View>
        </TouchableOpacity>
      ) : null}

      <PagerView
        ref={pagerRef}
        style={globalStyles.flex1}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={e => {
          setCurrentStep(e.nativeEvent.position);
        }}
      >
        <View key="1" style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <StepOneDiscover
              days={days}
              nights={nights}
              onChangeDays={handleDaysChange}
              onChangeNights={handleNightsChange}
              onContinue={goNext}
            />
          </ScrollView>
        </View>

        <View key="2" style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <StepTwoDiscover
              dummyExperience={dummyExperience}
              selectedExperienceIds={selectedExperienceIds}
              isMinSelectedExperience={isMinSelectedExperience}
              toggleExperience={toggleExperience}
              onContinue={goNext}
            />
          </ScrollView>
        </View>

        <View key="3" style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <StepThreeDiscover
              dummyBudget={dummyBudget}
              selectedBudgetIds={selectedBudgetIds}
              onSelectBudget={onSelectBudget}
              onContinue={goNext}
            />
          </ScrollView>
        </View>

        <View key="4" style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <StepFourDiscover
              dummyTravelPartners={dummyTravelPartners}
              selectedTravelPartnersIds={selectedTravelPartnersIds}
              onSelectTravelPartners={onSelectTravelPartners}
              onContinue={goNext}
            />
          </ScrollView>
        </View>

        <View key="5" style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <StepFiveDiscover
              dummyActivities={dummyActivities}
              selectedActivitiesIds={selectedActivitiesIds}
              isMinSelectedActivities={isMinSelectedActivities}
              toggleActivities={toggleActivities}
              onContinue={goNext}
            />
          </ScrollView>
        </View>

        <View key="6" style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            {stepSixMode === 'options' ? (
              <StepSixDiscover
                onAddCustomPreferences={goCustomPreferences}
                onGenerateItinerary={goGenerateItinerary}
              />
            ) : (
              <StepSixDiscoverPreference
                onBack={goPrevious}
                onGenerate={goGenerateItinerary}
              />
            )}
          </ScrollView>
        </View>

        <View key="7" style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <StepCompleteDiscover
              onViewItinerary={onViewItinerary}
              onStartOver={onStartOver}
            />
          </ScrollView>
        </View>
      </PagerView>
    </View>
  );
};

export { DiscoverScreen };
