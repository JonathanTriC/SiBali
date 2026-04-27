interface DestinationDetailScreenProps {
  data: DestinationItem;
}

interface ItineraryDetailScreenProps {
  data: ItineraryItem;
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
