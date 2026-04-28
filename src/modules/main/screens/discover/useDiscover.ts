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
  const [customBudget, setCustomBudget] = useState<number>(0);
  const [selectedBudgetIds, setSelectedBudgetIds] = useState<number>(0);
  const [adults, setAdults] = useState(1);
  const [childrens, setChildrens] = useState(0);
  const [stepFiveMode, setStepFiveMode] = useState<'options' | 'forms'>(
    'options',
  );

  const pagerRef = useRef<PagerView>(null);

  const totalSteps = 6;
  const isMinSelectedExperience = selectedExperienceIds.length >= 1;

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
    {
      id: 5,
      text: 'Beach & Water 🏖️',
    },
    {
      id: 6,
      text: 'Temples & Landmarks 🛕',
    },
    {
      id: 7,
      text: 'Food & Dining 🍜',
    },
    {
      id: 8,
      text: 'Nature & Hiking 🌿',
    },
    {
      id: 9,
      text: 'Shopping 🛍️',
    },
    {
      id: 10,
      text: 'Nightlife 🌙',
    },
  ];

  const dummyBudget = [
    {
      id: 1,
      text: '< Rp.500.000',
    },
    {
      id: 2,
      text: 'Rp. 500.000 - Rp. 1.000.000',
    },
    {
      id: 3,
      text: '>Rp. 1.000.000',
    },
    {
      id: 4,
      text: 'Custom',
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
  const handleAdultsChange = (val: number) => {
    setAdults(val);
  };

  const handleChildrensChange = (val: number) => {
    setChildrens(val);
  };

  // MARK: Step Five
  const goCustomPreferences = () => {
    setStepFiveMode('forms');
  };

  const goGenerateItinerary = () => {
    pagerRef.current?.setPage(5);
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
    setAdults(1);
    setChildrens(0);
    // step 5
    setStepFiveMode('options');

    // pager reset
    requestAnimationFrame(() => {
      pagerRef.current?.setPage(0);
    });
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      const nextPage = currentStep + 1;

      requestAnimationFrame(() => {
        pagerRef.current?.setPage(nextPage);
      });
    }
  };

  const goPrevious = () => {
    if (stepFiveMode === 'forms') {
      return setStepFiveMode('options');
    }

    if (currentStep > 0) {
      const prevPage = currentStep - 1;

      requestAnimationFrame(() => {
        pagerRef.current?.setPage(prevPage);
      });
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
    setCustomBudget,
    handleDaysChange,
    handleNightsChange,
    toggleExperience,
    onSelectBudget,
    handleAdultsChange,
    handleChildrensChange,
    goCustomPreferences,
    goGenerateItinerary,
    goNext,
    goPrevious,
    onViewItinerary,
    onStartOver,
  };
};

export default useDiscover;
