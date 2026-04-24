import { useGeolocation } from '@hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WebView from 'react-native-webview';
import { MAPBOX_ACCESS_TOKEN } from '@env';

const PLACES = [
  {
    id: '1',
    name: 'Atlas Beach Club',
    latitude: -8.66534866092515,
    longitude: 115.13814513908517,
  },
  {
    id: '2',
    name: 'FINNS Beach Club',
    latitude: -8.66655306475092,
    longitude: 115.13939839722644,
  },
  {
    id: '3',
    name: 'Tanah Lot Temple',
    latitude: -8.615637222340235,
    longitude: 115.08728362807646,
  },
];

type Place = (typeof PLACES)[number];

const useMap = () => {
  const { location, isLoading, error, getCurrentLocation } = useGeolocation();

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
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

  const nearbyPlaces = useMemo(() => {
    if (!location) return [];
    return PLACES.filter(
      place =>
        getDistanceKm(
          location.latitude,
          location.longitude,
          place.latitude,
          place.longitude,
        ) <= 15,
    );
  }, [location, getDistanceKm]);

  const fetchRoute = useCallback(
    async (place: Place) => {
      if (!location) return;
      setRouteLoading(true);
      try {
        const origin = `${location.longitude},${location.latitude}`;
        const destination = `${place.longitude},${place.latitude}`;
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
          const place = nearbyPlaces.find(p => p.id === message.payload.id);
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
    setSelectedPlace,
    fetchRoute,
    handleMessage,
    handleClose,
    handleCenterMap,
    getDistanceKm,
  };
};

export default useMap;
