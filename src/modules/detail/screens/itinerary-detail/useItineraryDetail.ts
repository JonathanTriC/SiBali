import { useNavigate } from '@hooks';

const useItineraryDetail = () => {
  const { getRouteParams, navigation, navigateScreen } = useNavigate();
  const { data } = getRouteParams<ItineraryDetailScreenProps>();

  const onNavigatePlace = (destination: DestinationItem) => {
    navigateScreen('Detail', {
      screen: 'DestinationDetailScreen',
      params: { destinationId: destination?.id ?? '' },
    });
  };

  return { data, navigation, onNavigatePlace };
};

export default useItineraryDetail;
