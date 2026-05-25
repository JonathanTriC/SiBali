import { useCallback, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      return new Promise(resolve => {
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
          () => resolve(true),
          () => resolve(false),
        );
      });
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }

    return false;
  }, []);

  const getCurrentLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        setError('Location permission denied');
        setIsLoading(false);
        return null;
      }

      const locationData = await new Promise<GeolocationType>(
        (resolve, reject) => {
          Geolocation.getCurrentPosition(
            position => {
              const coords: GeolocationType = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                heading: position.coords.heading,
                speed: position.coords.speed,
              };
              setLocation(coords);
              setIsLoading(false);
              resolve(coords);
            },
            geoError => {
              setError(geoError.message);
              setIsLoading(false);
              reject(geoError);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        },
      );

      return locationData;
    } catch (err) {
      setError('Error getting location');
      setIsLoading(false);
      return null;
    }
  }, [requestLocationPermission]);

  const getCityFromCoordinates = useCallback(
    async (
      latitude: number,
      longitude: number,
    ): Promise<GeolocationType | null> => {
      try {
        const hasPermission = await requestLocationPermission();

        if (!hasPermission) {
          setError('Location permission denied');
          setIsLoading(false);
          return null;
        }

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=id`;

        const response = await fetch(url, {
          headers: {
            'User-Agent': 'SiBali',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const data = (await response.json()) as NominatimResponseType;

        if (data && data.address) {
          const city =
            data.address.city || data.address.town || data.address.village;
          const cityDistrict = data.address.city_district;
          const { country } = data.address;

          const updatedLocation: GeolocationType = {
            latitude,
            longitude,
            city: cityDistrict ?? city,
            country,
            address: data.display_name,
          };

          setLocation(updatedLocation);
          return updatedLocation;
        } else {
          setIsLoading(false);
          throw new Error('Failed to get location information');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        setIsLoading(false);
        setError(`Error getting city information: ${errorMessage}`);
        console.error(err);
        return null;
      }
    },
    [requestLocationPermission],
  );

  const getCurrentLocationWithCity =
    useCallback(async (): Promise<GeolocationType | null> => {
      const locationData = await getCurrentLocation();

      if (locationData) {
        return getCityFromCoordinates(
          locationData.latitude,
          locationData.longitude,
        );
      }

      return null;
    }, [getCurrentLocation, getCityFromCoordinates]);

  return {
    location,
    error,
    isLoading,
    getCurrentLocation,
    requestLocationPermission,
    getCityFromCoordinates,
    getCurrentLocationWithCity,
  };
};
