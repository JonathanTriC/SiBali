import { apiGet } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';

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

  const extractLabelFromUrl = (url: string) => {
    try {
      const match = url.match(/place\/([^/@]+)/);
      if (!match) return '';

      return decodeURIComponent(match[1].replace(/\+/g, ' '));
    } catch {
      return '';
    }
  };

  const openMap = async (lat: number, lng: number, label: string) => {
    const encodedLabel = encodeURIComponent(label);

    const iosUrl = `http://maps.apple.com/?ll=${lat},${lng}&q=${encodedLabel}`;
    const androidUrl = `geo:${lat},${lng}?q=${encodedLabel}`;
    const url = Platform.OS === 'ios' ? iosUrl : androidUrl;

    const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLabel}&ll=${lat},${lng}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (e) {
      console.error('Error launching map:', e);
      await Linking.openURL(webUrl);
    }
  };

  const handleOpenNavigate = useCallback(() => {
    const lat = destinationDetail?.latitude;
    const lng = destinationDetail?.longitude;

    if (
      typeof lat !== 'number' ||
      typeof lng !== 'number' ||
      lat === 0 ||
      lng === 0
    ) {
      console.warn('Invalid coordinates, cannot open map');
      return;
    }

    const mapLabel =
      extractLabelFromUrl(destinationDetail?.gmaps_url ?? '') || '';

    openMap(lat, lng, mapLabel);
  }, [
    destinationDetail?.gmaps_url,
    destinationDetail?.latitude,
    destinationDetail?.longitude,
  ]);

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
    handleOpenNavigate,
  };
};

export default useDestinationDetail;
