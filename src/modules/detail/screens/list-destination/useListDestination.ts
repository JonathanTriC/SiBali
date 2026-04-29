import { apiGet } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useItineraryDetail = () => {
  const { getRouteParams, navigation, navigateScreen } = useNavigate();
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
    queryKey: [`destinations-by-category-${categoryId}`],
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

  return {
    title,
    navigation,
    data,
    isLoading,
    onNavigateDetail,
  };
};

export default useItineraryDetail;
