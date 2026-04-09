import { useNavigate } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';

const useDiscover = () => {
  const { navigateScreen } = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [days, setDays] = useState(3);
  const [nights, setNights] = useState(2);
  const [selectedExperienceIds, setSelectedExperienceIds] = useState<number[]>(
    [],
  );
  const [selectedBudgetIds, setSelectedBudgetIds] = useState<number>(0);
  const [selectedTravelPartnersIds, setSelectedTravelPartnersIds] =
    useState<number>(0);
  const [selectedActivitiesIds, setSelectedActivitiesIds] = useState<number[]>(
    [],
  );
  const [stepSixMode, setStepSixMode] = useState<'options' | 'forms'>(
    'options',
  );

  const pagerRef = useRef<PagerView>(null);

  const totalSteps = 6;
  const isMinSelectedExperience = selectedExperienceIds.length >= 1;
  const isMinSelectedActivities = selectedActivitiesIds.length >= 1;

  const dummyExperience = [
    {
      id: 1,
      text: 'Relaxing 🧘',
    },
    {
      id: 2,
      text: 'Adventure 🏄',
    },
    {
      id: 3,
      text: 'Cultural 🏛️',
    },
    {
      id: 4,
      text: 'Romantic 💑',
    },
  ];

  const dummyBudget = [
    {
      id: 1,
      text: 'Budget-Friendly 💰',
    },
    {
      id: 2,
      text: 'Mid-Range 💳',
    },
    {
      id: 3,
      text: 'Luxury 💎',
    },
    {
      id: 4,
      text: 'No Limit 🌟',
    },
  ];

  const dummyTravelPartners = [
    {
      id: 1,
      text: 'Solo 🧍',
    },
    {
      id: 2,
      text: 'Couple 👫',
    },
    {
      id: 3,
      text: 'Family 👨‍👩‍👧‍👦',
    },
    {
      id: 4,
      text: 'Friends 👥',
    },
  ];

  const dummyActivities = [
    {
      id: 1,
      text: 'Beach & Water 🏖️',
    },
    {
      id: 2,
      text: 'Temples 🛕',
    },
    {
      id: 3,
      text: 'Food & Dining 🍜',
    },
    {
      id: 4,
      text: 'Nature & Hiking 🌿',
    },
    {
      id: 5,
      text: 'Shopping 🛍️',
    },
    {
      id: 6,
      text: 'Nightlife 🌙',
    },
  ];

  // MARK: Step One
  const syncNightsWithDays = (
    inputDays: number,
    nextNights: number,
    prevNights: number,
  ) => {
    const max = inputDays - 1;
    const min = Math.min(prevNights, max);

    if (nextNights > max) return max;
    if (nextNights < min) return min;

    return nextNights;
  };

  const handleDaysChange = (val: number) => {
    setDays(val);

    setNights(prev => {
      const max = val - 1;

      if (prev > max) return max;

      return Math.max(prev, max);
      // return prev;
    });
  };

  const handleNightsChange = (val: number) => {
    setNights(prev => syncNightsWithDays(days, val, prev));
  };

  // MARK: Step Two
  const toggleExperience = (id: number) => {
    setSelectedExperienceIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  // MARK: Step Three
  const onSelectBudget = (id: number) => {
    setSelectedBudgetIds(id);
  };

  // MARK: Step Four
  const onSelectTravelPartners = (id: number) => {
    setSelectedTravelPartnersIds(id);
  };

  // MARK: Step Five
  const toggleActivities = (id: number) => {
    setSelectedActivitiesIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  // MARK: Step Six
  const goCustomPreferences = () => {
    setStepSixMode('forms');
  };

  const goGenerateItinerary = () => {
    pagerRef.current?.setPage(6);
  };

  const resetAll = () => {
    setCurrentStep(0);
    // step 1
    setDays(3);
    setNights(2);
    // step 2
    setSelectedExperienceIds([]);
    // step 3
    setSelectedBudgetIds(0);
    // step 4
    setSelectedTravelPartnersIds(0);
    // step 5
    setSelectedActivitiesIds([]);
    // step 6
    setStepSixMode('options');

    // pager reset
    requestAnimationFrame(() => {
      pagerRef.current?.setPage(0);
    });
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      const nextPage = currentStep + 1;
      pagerRef.current?.setPage(nextPage);
      setCurrentStep(nextPage);
    }
  };

  const goPrevious = () => {
    if (stepSixMode === 'forms') {
      return setStepSixMode('options');
    }
    if (currentStep > 0) {
      const prevPage = currentStep - 1;
      pagerRef.current?.setPage(prevPage);
      return setCurrentStep(prevPage);
    }
  };

  const onViewItinerary = () => {
    navigateScreen('Main', { screen: 'ItineraryScreen' });
  };

  const onStartOver = () => {
    resetAll();
  };

  useFocusEffect(
    useCallback(() => {
      resetAll();
    }, []),
  );
  return {
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
  };
};

export default useDiscover;
