import { useGeolocation, useNavigate } from '@hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WebView from 'react-native-webview';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@api';
import { URL_PATH } from '@constants/url';

const useMap = () => {
  const { location, isLoading, error, getCurrentLocation } = useGeolocation();
  const { navigateScreen } = useNavigate();

  const [selectedPlace, setSelectedPlace] = useState<NearbyDestinations | null>(
    null,
  );
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(
    null,
  );
  const [routeLoading, setRouteLoading] = useState(false);

  const webviewRef = useRef<WebView>(null);

  const getDistanceKm = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    },
    [],
  );

  const {
    data: nearbyDestinations,
    isLoading: isLoadingNearbyDestinations,
    // isError: isErrorNearbyDestinations,
  } = useQuery({
    queryKey: ['nearby-destinations', location?.latitude, location?.longitude],
    queryFn: () =>
      apiGet({
        url: URL_PATH.destinations.nearby({
          lat: location?.latitude ?? 0,
          lng: location?.longitude ?? 0,
        }),
      }).then((res: NearbyDestinationResponse) => res?.data),
    enabled: !!location?.latitude && !!location?.longitude,
  });

  const nearbyPlaces = useMemo(() => {
    if (!location) return [];
    return nearbyDestinations?.filter(
      place =>
        getDistanceKm(
          location.latitude,
          location.longitude,
          place?.latitude ?? 0,
          place?.longitude ?? 0,
        ) <= 15,
    );
  }, [nearbyDestinations, location, getDistanceKm]);

  const fetchRoute = useCallback(
    async (place: NearbyDestinations) => {
      if (!location) return;
      setRouteLoading(true);
      try {
        const origin = `${location.longitude},${location.latitude}`;
        const destination = `${place?.longitude ?? 0},${place?.latitude ?? 0}`;
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;
        const res = await fetch(url);
        const data = await res.json();
        const coords = data?.routes?.[0]?.geometry?.coordinates;
        if (coords) {
          // Convert [lng, lat] to [lat, lng] for Leaflet
          setRouteCoords(
            coords.map((c: number[]) => [c[1], c[0]] as [number, number]),
          );
        }
      } catch {
        // route fetch failed silently
      } finally {
        setRouteLoading(false);
      }
    },
    [location],
  );

  const handleMessage = useCallback(
    (event: any) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === 'MARKER_PRESS') {
          const place = nearbyPlaces?.find(p => p.id === message.payload.id);
          if (place) {
            setSelectedPlace(place);
            fetchRoute(place);
          }
        }
      } catch (e) {
        console.error('Error handling message:', e);
      }
    },
    [nearbyPlaces, fetchRoute],
  );

  const handleClose = useCallback(() => {
    webviewRef.current?.postMessage(
      JSON.stringify({
        type: 'CLOSE_POPUPS',
      }),
    );
    setSelectedPlace(null);
    setRouteCoords(null);
  }, []);

  const handleCenterMap = useCallback(() => {
    if (!location) return;

    webviewRef.current?.postMessage(
      JSON.stringify({
        type: 'CENTER_USER',
        payload: { location },
      }),
    );
  }, [location]);

  const onNavigateDetail = ({ item }: { item: NearbyDestinations }) => {
    return navigateScreen('Detail', {
      screen: 'DestinationDetailScreen',
      params: { destinationId: item?.id ?? '' },
    });
  };

  useEffect(() => {
    if (!webviewRef.current) return;

    const payload = {
      location,
      places: nearbyPlaces,
      selectedPlace,
      routeCoords,
    };

    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'UPDATE',
        payload,
      }),
    );
  }, [location, nearbyPlaces, selectedPlace, routeCoords]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return {
    location,
    isLoading,
    error,
    webviewRef,
    nearbyPlaces,
    routeLoading,
    selectedPlace,
    isLoadingNearbyDestinations,
    setSelectedPlace,
    fetchRoute,
    handleMessage,
    handleClose,
    handleCenterMap,
    getDistanceKm,
    onNavigateDetail,
  };
};

export default useMap;
