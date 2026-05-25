import { apiGet } from '@api';
import { handlerGetAndParseJSON, Keys } from '@constants';
import { URL_PATH } from '@constants/url';
import { useGeolocation, useNavigate } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';
import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

const useHome = () => {
  const { navigateScreen } = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const { location, getCurrentLocation, getCityFromCoordinates } =
    useGeolocation();

  const handleGetUserData = async () => {
    const data = await handlerGetAndParseJSON<User>(Keys.userData);
    return setUserData(data);
  };

  const [categoriesQueries, trendingQueries, nearbyQueries] = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: () =>
          apiGet({
            url: URL_PATH.master.categories,
          }).then((res: PopularCategoriesResponse) => res?.data),
        placeholderData: keepPreviousData,
        enabled: false,
        retry: false,
      },
      {
        queryKey: ['trending'],
        queryFn: () =>
          apiGet({
            url: URL_PATH.destinations.trending({ limit: 5 }),
          }).then((res: TrendingDestinationResponse) => res?.data),
        placeholderData: keepPreviousData,
        enabled: false,
        retry: false,
      },
      {
        queryKey: [
          'nearby-destinations',
          location?.latitude,
          location?.longitude,
        ],
        queryFn: () =>
          apiGet({
            url: URL_PATH.destinations.nearby({
              lat: location?.latitude ?? 0,
              lng: location?.longitude ?? 0,
            }),
          }).then((res: NearbyDestinationResponse) => res?.data),
        enabled: !!location?.latitude && !!location?.longitude,
      },
    ],
  });

  const {
    data: popularCategories,
    isLoading: isLoadingPopularCategories,
    isError: isErrorPopularCategories,
    refetch: refetchPopularCategories,
  } = categoriesQueries;

  const {
    data: trendingDestinations,
    isLoading: isLoadingTrendingDestinations,
    isError: isErrorTrendingDestinations,
    refetch: refetchTrendingDestinations,
  } = trendingQueries;

  const {
    data: nearbyDestinations,
    isLoading: isLoadingNearbyDestinations,
    isError: isErrorNearbyDestinations,
  } = nearbyQueries;

  const onNavigateDetail = ({
    item,
  }: {
    item: DestinationItem | NearbyDestinations;
  }) => {
    return navigateScreen('Detail', {
      screen: 'DestinationDetailScreen',
      params: { destinationId: item?.id ?? '' },
    });
  };

  const onNavigateDestinationByCategories = ({
    item,
  }: {
    item: PopularCategories;
  }) => {
    return navigateScreen('Detail', {
      screen: 'ListDestinationScreen',
      params: {
        title: `${item?.name} Destinations`,
        type: 'categories',
        categoryId: item?.id,
      },
    });
  };

  const onNavigateAllTrending = () => {
    return navigateScreen('Detail', {
      screen: 'ListDestinationScreen',
      params: { title: 'Recommended for You', type: 'trending' },
    });
  };

  useFocusEffect(
    useCallback(() => {
      refetchPopularCategories();
      refetchTrendingDestinations();

      return () => {};
    }, [refetchPopularCategories, refetchTrendingDestinations]),
  );

  useFocusEffect(
    useCallback(() => {
      getCurrentLocation();

      return () => {};
    }, [getCurrentLocation]),
  );

  useEffect(() => {
    console.log('🚀 ~ useHome ~ location:', location);
    if (location?.latitude && location?.longitude && !location?.city) {
      getCityFromCoordinates(location?.latitude, location?.longitude);
    }
  }, [location, getCityFromCoordinates]);

  useFocusEffect(
    useCallback(() => {
      handleGetUserData();
    }, []),
  );

  return {
    location,
    userData,
    popularCategories,
    isLoadingPopularCategories,
    isErrorPopularCategories,
    trendingDestinations,
    isLoadingTrendingDestinations,
    isErrorTrendingDestinations,
    nearbyDestinations,
    isLoadingNearbyDestinations,
    isErrorNearbyDestinations,
    navigateScreen,
    onNavigateDestinationByCategories,
    onNavigateAllTrending,
    onNavigateDetail,
  };
};

export default useHome;
