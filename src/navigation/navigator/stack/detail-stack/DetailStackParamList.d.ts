interface DestinationDetailScreenProps {
  destinationId: string;
}

interface ItineraryDetailScreenProps {
  itineraryId: string;
}
interface ListDestinationScreenProps {
  type: 'categories' | 'trending';
  title: string;
  categoryId?: string;
}

type DetailStackParamList = {
  DestinationDetailScreen: DestinationDetailScreenProps;
  ItineraryDetailScreen: ItineraryDetailScreenProps;
  ListDestinationScreen: ListDestinationScreenProps;
};
