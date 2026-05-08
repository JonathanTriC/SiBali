import { apiGet, apiPost } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';

const useDiscover = () => {
  const { navigateScreen } = useNavigate();
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState(0);
  const [days, setDays] = useState(3);
  const [nights, setNights] = useState(2);
  const [selectedExperienceIds, setSelectedExperienceIds] = useState<string[]>(
    [],
  );
  const [customBudget, setCustomBudget] = useState<number>(0);
  const [selectedBudgetIds, setSelectedBudgetIds] = useState<number>(0);
  const [adults, setAdults] = useState(1);
  const [childrens, setChildrens] = useState(0);
  const [stepFiveMode, setStepFiveMode] = useState<'options' | 'forms'>(
    'options',
  );
  const [customPreferences, setCustomPreferences] = useState<string>('');
  const [itineraryId, setItineraryId] = useState<string>('');

  const pagerRef = useRef<PagerView>(null);
  const scrollRef = useRef<ScrollView>(null);

  const totalSteps = 6;
  const isMinSelectedExperience = selectedExperienceIds.length >= 1;

  const budgetList = [
    { id: 1, text: '< Rp.500.000', range: '<500000' },
    { id: 2, text: 'Rp. 500.000 - Rp. 1.000.000', range: '500000-1000000' },
    { id: 3, text: '>Rp. 1.000.000', range: '>1000000' },
    { id: 4, text: 'Custom', range: 'custom' },
  ];

  const prefetchItinerary = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['list-itineraries'],
      queryFn: () =>
        apiGet({
          url: URL_PATH.itineraries.list,
        }).then((res: ListItinerariesResponse) => {
          return res?.data ?? [];
        }),
    });
  };

  const { data: interestsList } = useQuery({
    queryKey: ['interests'],
    queryFn: () =>
      apiGet({
        url: URL_PATH.master.interests,
      }).then((res: InterestsListResponse) => res?.data),
  });

  const {
    mutate: submitGenerateItinerary,
    isPending: isLoadingSubmitGenerateItinerary,
  } = useMutation<GenerateItinerary, ApiError<DiscoveryErrorResponse>>({
    mutationKey: ['generate-itinerary'],
    mutationFn: async () => {
      const body = {
        durationDays: days,
        durationNights: nights,
        interests: getSelectedInterests(),
        budgetRange: getBudgetRange(),
        adults,
        children: childrens,
        area: '',
        specialRequests: '',
        customPreferences: stepFiveMode === 'forms' ? customPreferences : '',
      };

      const data = await apiPost<GenerateItineraryResponse>({
        url: URL_PATH.discovery.generateItinerary,
        body,
      });

      return data?.data ?? {};
    },
    onSuccess: data => {
      console.log('Successfuly Generate Itinerary:', data);
      setItineraryId(data?.id ?? '');
    },
    onError: error => {
      console.error('Failed to Generate Itinerary:', error);
    },
  });

  const { mutate: submitBackfillImages, isPending: isLoadingBackfillImages } =
    useMutation({
      mutationKey: ['backfill-images'],
      mutationFn: async (id: string) => {
        if (!id) return;

        const data = await apiPost({
          url: URL_PATH.itineraries.backfillImages({ itineraryId: id }),
        });

        return data?.data ?? {};
      },
      onSuccess: data => {
        console.log('Successfuly Backfill Images:', data);
        prefetchItinerary();
        onViewItinerary();
      },
      onError: error => {
        console.error('Failed to Backfill Images:', error);
      },
    });

  // MARK: Helpers
  const getSelectedInterests = () => {
    if (!Array.isArray(interestsList) || interestsList.length === 0) return [];

    return interestsList
      .filter(
        e =>
          e !== null &&
          e !== undefined &&
          selectedExperienceIds.includes(e?.id ?? ''),
      )
      .map(e => (e?.name ?? '').trim())
      .filter(name => name.length > 0);
  };

  const getBudgetRange = () => {
    if (selectedBudgetIds === 4) return String(customBudget);
    return budgetList.find(b => b.id === selectedBudgetIds)?.range ?? '';
  };

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
    });
  };

  const handleNightsChange = (val: number) => {
    setNights(prev => syncNightsWithDays(days, val, prev));
  };

  // MARK: Step Two
  const toggleExperience = (id: string) => {
    setSelectedExperienceIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  // MARK: Step Three
  const onSelectBudget = (id: number) => {
    setSelectedBudgetIds(id);
  };

  const handleChangeCustomBudget = (text: string) => {
    const numeric = text.replace(/\D/g, '');

    setCustomBudget(Number(numeric) || 0);
  };

  // MARK: Step Four
  const handleAdultsChange = (val: number) => setAdults(val);
  const handleChildrensChange = (val: number) => setChildrens(val);

  // MARK: Step Five
  const goCustomPreferences = () => setStepFiveMode('forms');

  const goGenerateItinerary = () => {
    handleGenerateItinerary();
    pagerRef.current?.setPage(5);
  };

  // MARK: Generate
  const handleGenerateItinerary = useCallback(() => {
    submitGenerateItinerary();
  }, [submitGenerateItinerary]);

  const handleBackfillImages = useCallback(() => {
    if (itineraryId) {
      submitBackfillImages(itineraryId);
    }
  }, [submitBackfillImages, itineraryId]);

  // MARK: Navigation
  const resetAll = () => {
    setCurrentStep(0);
    setDays(3);
    setNights(2);
    setSelectedExperienceIds([]);
    setSelectedBudgetIds(0);
    setAdults(1);
    setChildrens(0);
    setStepFiveMode('options');
    setCustomPreferences('');
    requestAnimationFrame(() => {
      pagerRef.current?.setPage(0);
    });
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      requestAnimationFrame(() => {
        pagerRef.current?.setPage(currentStep + 1);
      });
    }
  };

  const goPrevious = () => {
    if (stepFiveMode === 'forms') return setStepFiveMode('options');
    if (currentStep > 0) {
      requestAnimationFrame(() => {
        pagerRef.current?.setPage(currentStep - 1);
      });
    }
  };

  const onViewItinerary = () => {
    navigateScreen('Main', { screen: 'ItineraryScreen' });
  };

  const onStartOver = () => resetAll();

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [currentStep]);

  useFocusEffect(
    useCallback(() => {
      resetAll();
    }, []),
  );

  return {
    pagerRef,
    scrollRef,
    interestsList,
    budgetList,
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
    customPreferences,
    isLoadingSubmitGenerateItinerary,
    isLoadingBackfillImages,
    setCurrentStep,
    setCustomPreferences,
    handleDaysChange,
    handleNightsChange,
    toggleExperience,
    onSelectBudget,
    handleChangeCustomBudget,
    handleAdultsChange,
    handleChildrensChange,
    handleBackfillImages,
    goCustomPreferences,
    goGenerateItinerary,
    goNext,
    goPrevious,
    onViewItinerary,
    onStartOver,
  };
};

export default useDiscover;
