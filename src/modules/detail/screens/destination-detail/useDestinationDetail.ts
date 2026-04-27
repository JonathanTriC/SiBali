import { apiGet } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useDestinationDetail = () => {
  const { getRouteParams, navigation } = useNavigate();
  const queryClient = useQueryClient();
  const { destinationId } = getRouteParams<DestinationDetailScreenProps>();

  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos'>(
    'overview',
  );

  const TABS = [
    { index: 1, key: 'overview', label: 'Overview' },
    { index: 2, key: 'reviews', label: 'Reviews' },
    { index: 3, key: 'photos', label: 'Photos' },
  ];

  const { data: destinationDetail, isLoading: isLoadingDestinationDetail } =
    useQuery({
      queryKey: ['destination-detail'],
      queryFn: () =>
        apiGet({
          url: URL_PATH.destinations.detail({ destinationId }),
        }).then((res: DestinationDetailResponse) => res?.data),
      placeholderData: keepPreviousData,
      enabled: true,
      retry: false,
    });

  useEffect(() => {
    return () => {
      queryClient.resetQueries({
        queryKey: ['destination-detail'],
      });
    };
  }, [queryClient]);

  return {
    navigation,
    TABS,
    activeTab,
    destinationDetail,
    isLoadingDestinationDetail,
    setActiveTab,
  };
};

export default useDestinationDetail;
