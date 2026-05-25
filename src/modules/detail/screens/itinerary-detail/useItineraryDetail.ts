import { apiGet } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import { useQuery } from '@tanstack/react-query';

const useItineraryDetail = () => {
  const { getRouteParams, navigation, navigateScreen } = useNavigate();
  const { itineraryId } = getRouteParams<ItineraryDetailScreenProps>();

  const {
    data: detailItineraryData,
    isPending: isLoadingDetailItinerary,
    // isError: isErrorDetailtinerary,
  } = useQuery({
    queryKey: [`detail-itinerary-${itineraryId}`],
    queryFn: () =>
      apiGet({
        url: URL_PATH.itineraries.detail({ itineraryId }),
      }).then((res: DetailItineraryResponse) => {
        return res?.data ?? {};
      }),
  });

  const onNavigatePlace = (destinationId: string) => {
    navigateScreen('Detail', {
      screen: 'DestinationDetailScreen',
      params: { destinationId },
    });
  };

  return {
    navigation,
    detailItineraryData,
    isLoadingDetailItinerary,
    onNavigatePlace,
  };
};

export default useItineraryDetail;
