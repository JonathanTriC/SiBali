interface DestinationDetailScreenProps {
  data: DestinationItem;
}

interface ItineraryDetailScreenProps {
  data: ItineraryItem;
}

type DetailStackParamList = {
  DestinationDetailScreen: DestinationDetailScreenProps;
  ItineraryDetailScreen: ItineraryDetailScreenProps;
};
