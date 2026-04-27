import { apiGet } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect } from 'react';

const useItineraryDetail = () => {
  const { getRouteParams, navigation, navigateScreen } = useNavigate();
  const queryClient = useQueryClient();
  const { title, type, categoryId } =
    getRouteParams<ListDestinationScreenProps>();

  const onNavigateDetail = (destination: DestinationItem) => {
    navigateScreen('Detail', {
      screen: 'DestinationDetailScreen',
      params: { destinationId: destination?.id ?? '' },
    });
  };

  const {
    data: destinationsByCategory,
    isLoading: isLoadingDestinationsByCategory,
  } = useQuery({
    queryKey: ['destinations-by-category'],
    queryFn: () =>
      apiGet({
        url: URL_PATH.destinations.list({ limit: 10, offset: 0, categoryId }),
      }).then((res: TrendingDestinationResponse) => res?.data),
    placeholderData: keepPreviousData,
    enabled: type === 'categories',
    retry: false,
  });

  const {
    data: trendingDestinations,
    isLoading: isLoadingTrendingDestinations,
  } = useQuery({
    queryKey: ['trending-all'],
    queryFn: () =>
      apiGet({
        url: URL_PATH.destinations.trending({ limit: 10 }),
      }).then((res: TrendingDestinationResponse) => res?.data),
    placeholderData: keepPreviousData,
    enabled: type === 'trending',
    retry: false,
  });
  const data =
    type === 'categories' ? destinationsByCategory : trendingDestinations;
  const isLoading =
    isLoadingDestinationsByCategory || isLoadingTrendingDestinations;

  useEffect(() => {
    return () => {
      queryClient.resetQueries({
        queryKey: ['trending-all'],
      });
      queryClient.resetQueries({
        queryKey: ['destinations-by-category'],
      });
    };
  }, [queryClient]);

  return {
    title,
    navigation,
    data,
    isLoading,
    onNavigateDetail,
  };
};

export default useItineraryDetail;
