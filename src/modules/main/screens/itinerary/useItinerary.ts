import { apiGet } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const useItinerary = () => {
  const { navigateScreen } = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: listItinerariesData,
    isPending: isLoadingListItineraries,
    isRefetching,
    refetch,

    // isError: isErrorListItineraries,
  } = useQuery({
    queryKey: ['list-itineraries'],
    queryFn: () =>
      apiGet({
        url: URL_PATH.itineraries.list,
      }).then((res: ListItinerariesResponse) => {
        return res?.data ?? [];
      }),
  });

  const onRefresh = async () => {
    await refetch();
  };

  const onNavigateDetail = (itineraryId: string) => {
    if (!itineraryId) return null;
    navigateScreen('Detail', {
      screen: 'ItineraryDetailScreen',
      params: { itineraryId },
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          queryClient.resetQueries({
            queryKey: ['list-itineraries'],
          });
        }, 1000);
      };
    }, [queryClient]),
  );

  return {
    listItinerariesData,
    isLoadingListItineraries,
    isRefreshing: isRefetching,
    onRefresh,
    onNavigateDetail,
  };
};

export default useItinerary;
