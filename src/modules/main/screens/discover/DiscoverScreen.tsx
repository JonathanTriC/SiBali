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
        text={'What interests you?'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />
      <Text
        text="Choose all the experiences and activities you'd like"
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
              {isActive ? (
                <View
                  style={[
                    styles.step2CheckIcon,
                    {
                      backgroundColor: Colors.primary.base,
                      borderColor: Colors.white,
                    },
                  ]}
                >
                  <MaterialDesignIcons
                    name="check"
                    size={16}
                    color={Colors.white}
                  />
                </View>
              ) : null}
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
  customBudget,
  selectedBudgetIds,
  setCustomBudget,
  onSelectBudget,
  onContinue,
}: {
  dummyBudget: { id: number; text: string }[];
  customBudget: number;
  selectedBudgetIds: number;
  setCustomBudget: React.Dispatch<React.SetStateAction<number>>;
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

      <Text
        text="Select your daily budget per person"
        type="regular-lg"
        color={Colors.neutral.secondary}
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
                if (item.id !== 4) {
                  onContinue();
                }
              }}
            >
              <View
                style={[
                  styles.step2ExperienceItem,
                  isActive ? styles.step2ActiveExperienceItem : {},
                ]}
              >
                <Text text={item.text} textAlign="center" numberOfLines={2} />
              </View>
              {isActive ? (
                <View
                  style={[
                    styles.step2CheckIcon,
                    {
                      backgroundColor: Colors.primary.base,
                      borderColor: Colors.white,
                    },
                  ]}
                >
                  <MaterialDesignIcons
                    name="check"
                    size={16}
                    color={Colors.white}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          );
        }}
      />

      {selectedBudgetIds === 4 ? (
        <View style={globalStyles.gap12}>
          <TextField
            label="Enter your daily budget (Rp)"
            value={customBudget}
            placeholder="e.g., 750000"
            onChangeText={(text: string) => setCustomBudget(Number(text))}
          />

          <Text
            text="Enter amount in Rupiah per day per person"
            type="regular-sm"
            color={Colors.neutral.secondary}
            textAlign="center"
          />

          <Button
            label={`Continue`}
            isDisabled={customBudget === 0}
            action={onContinue}
          />
        </View>
      ) : null}
    </View>
  );
};

const StepFourDiscover = ({
  adults,
  childrens,
  onChangeAdults,
  onChangeChildrens,
  onContinue,
}: {
  adults: number;
  childrens: number;
  onChangeAdults: (val: number) => void;
  onChangeChildrens: (val: number) => void;
  onContinue: () => void;
}) => {
  return (
    <View style={[globalStyles.gap24, globalStyles.wfull]}>
      <Text
        text={'How many travelers?'}
        type="bold-xl"
        color={Colors.neutral.base}
        textAlign="center"
      />

      <Text
        text="Enter the number of adults and children"
        type="regular-lg"
        color={Colors.neutral.secondary}
        textAlign="center"
      />

      <View style={styles.step1CounterRow}>
        <View style={styles.step1CounterItem}>
          <Text
            text="Adults"
            type="regular-base"
            color={Colors.neutral.secondary}
          />
          <CounterInput
            value={adults}
            min={1}
            max={10}
            onChange={onChangeAdults}
          />
        </View>
        <View style={styles.step1CounterItem}>
          <Text
            text="Children"
            type="regular-base"
            color={Colors.neutral.secondary}
          />
          <CounterInput
            value={childrens}
            min={0}
            max={10}
            onChange={onChangeChildrens}
          />
        </View>
      </View>

      <Button label="Continue" action={onContinue} />
    </View>
  );
};

const StepFiveDiscover = ({
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

const StepFiveDiscoverPreference = ({
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
    days,
    nights,
    isMinSelectedExperience,
    currentStep,
    selectedExperienceIds,
    customBudget,
    selectedBudgetIds,
    adults,
    childrens,
    stepFiveMode,
    setCurrentStep,
    handleDaysChange,
    handleNightsChange,
    toggleExperience,
    setCustomBudget,
    onSelectBudget,
    handleAdultsChange,
    handleChildrensChange,
    goCustomPreferences,
    goGenerateItinerary,
    goNext,
    goPrevious,
    onViewItinerary,
    onStartOver,
  } = useDiscover();

  return (
    <View style={globalStyles.flex1} pointerEvents="box-none">
      <HeaderDiscover step={currentStep !== 5 ? currentStep + 1 : 5} />
      {currentStep > 0 && currentStep < 5 && stepFiveMode !== 'forms' ? (
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
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
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
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
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
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <StepThreeDiscover
              dummyBudget={dummyBudget}
              customBudget={customBudget}
              selectedBudgetIds={selectedBudgetIds}
              setCustomBudget={setCustomBudget}
              onSelectBudget={onSelectBudget}
              onContinue={goNext}
            />
          </ScrollView>
        </View>

        <View key="4" style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <StepFourDiscover
              adults={adults}
              childrens={childrens}
              onChangeAdults={handleAdultsChange}
              onChangeChildrens={handleChildrensChange}
              onContinue={goNext}
            />
          </ScrollView>
        </View>

        <View key="5" style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {stepFiveMode === 'options' ? (
              <StepFiveDiscover
                onAddCustomPreferences={goCustomPreferences}
                onGenerateItinerary={goGenerateItinerary}
              />
            ) : (
              <StepFiveDiscoverPreference
                onBack={goPrevious}
                onGenerate={goGenerateItinerary}
              />
            )}
          </ScrollView>
        </View>

        <View key="6" style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
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
