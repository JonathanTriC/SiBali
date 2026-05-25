/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Button, Text } from '@components';
import { Colors } from '@constants/colors';
import { styles } from './styles';
import useMap from './useMap';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const leafletHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
body { margin: 0; padding: 0; }
#map { width: 100vw; height: 100vh; }
</style>
</head>
<body>
<div id="map"></div>
<script>
let map, userMarker, placeMarkers = {}, routeLine;
let currentState = { location: null, places: [], selectedPlace: null, routeCoords: null };

// Initialize map
map = L.map('map', { zoomControl: false }).setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
    }).addTo(map);
    
    // Custom icons
    const userIcon = L.divIcon({
      className: 'user-marker',
      html: '<div style="width:20px;height:20px;border-radius:50%;background:#005B8C;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
      });
      
      const placeIcon = L.divIcon({
        className: 'place-marker',
        html: '<div style="width:16px;height:16px;border-radius:50%;background:#F75555;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
        });
        
        const selectedIcon = L.divIcon({
          className: 'selected-marker',
          html: '<div style="width:22px;height:22px;border-radius:50%;background:#FACC15;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>',
          iconSize: [22, 22],
          iconAnchor: [11, 11]
          });
          
          function updateMap(state) {
            currentState = state;
            
            // Update user marker
            if (state.location) {
              if (!userMarker) {
                userMarker = L.marker([state.location.latitude, state.location.longitude], { icon: userIcon }).addTo(map);
                } else {
                  userMarker.setLatLng([state.location.latitude, state.location.longitude]);
              }
              }
              
              // Update place markers
              const visiblePlaceIds = state.selectedPlace ? [state.selectedPlace.id] : state.places.map(p => p.id);
      
      // Remove markers not in visible list
      Object.keys(placeMarkers).forEach(id => {
        if (!visiblePlaceIds.includes(id)) {
          map.removeLayer(placeMarkers[id]);
          delete placeMarkers[id];
          }
          });
          
          // Add/update visible markers
          state.places.forEach(place => {
            if (!visiblePlaceIds.includes(place.id)) return;
            
            const isSelected = state.selectedPlace && state.selectedPlace.id === place.id;
            const icon = isSelected ? selectedIcon : placeIcon;
            
            if (placeMarkers[place.id]) {
              placeMarkers[place.id].setIcon(icon);
              } else {
                const marker = L.marker([place.latitude, place.longitude], { icon })
              .addTo(map)
              .bindPopup(place.name, { closeButton: false })
              .on('click', () => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'MARKER_PRESS',
                  payload: { id: place.id }
                  }));
                  });
                  placeMarkers[place.id] = marker;
                  }
                  });
                  
                  // Update route
                  if (routeLine) {
                    map.removeLayer(routeLine);
                    routeLine = null;
                    }
                    
                    if (state.routeCoords && state.routeCoords.length > 0) {
                      routeLine = L.polyline(state.routeCoords, {
                        color: '#005B8C',
                        weight: 4,
                        opacity: 0.8,
                        smoothFactor: 1
                        }).addTo(map);
                        }
                        
                        // Fit bounds
                        const bounds = [];
                        if (state.location) {
                          bounds.push([state.location.latitude, state.location.longitude]);
                          }
                          
                          if (state.selectedPlace) {
                            bounds.push([state.selectedPlace.latitude, state.selectedPlace.longitude]);
                            } else {
                              state.places.forEach(p => bounds.push([p.latitude, p.longitude]));
                          }
                          
                          if (bounds.length > 0) {
                            map.fitBounds(bounds, { padding: [80, 80], animate: true, duration: 1.2 });
                            }
                            }
                            
                            // Listen for messages from React Native
                            window.addEventListener('message', (event) => {
                              try {
                                const message = JSON.parse(event.data);
                                if (message.type === 'UPDATE') {
                                  updateMap(message.payload);
                                  } else if (message.type === 'CLOSE_POPUPS') {
                                    map.closePopup();
                                    } else if (message.type === 'CENTER_USER') {
                                      if (message.payload.location) {
                                        map.setView(
                                          [message.payload.location.latitude, message.payload.location.longitude],
                                          15,
                                          { animate: true, duration: 1 }
                                          );
                                          }
                                          }
                                          } catch (e) {
                                            console.error('Error parsing message:', e);
                                            }
                                            });
                                            
                                            // For Android
                                            document.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'UPDATE') {
          updateMap(message.payload);
          } else if (message.type === 'CLOSE_POPUPS') {
            map.closePopup();
            } else if (message.type === 'CENTER_USER') {
              if (message.payload.location) {
                map.setView(
                  [message.payload.location.latitude, message.payload.location.longitude],
                  15,
                  { animate: true, duration: 1 }
                  );
                  }
                  }
                  } catch (e) {
                    console.error('Error parsing message:', e);
                    }
                    });
                    </script>
                    </body>
                    </html>
                    `;

const MapScreen: React.FC = () => {
  const {
    location,
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
  } = useMap();

  const renderEmptyNearbyDestinations = useMemo(() => {
    if (isLoadingNearbyDestinations) {
      return (
        <View style={{ padding: 20 }}>
          <ActivityIndicator color={Colors.primary.base} />
        </View>
      );
    }
    return (
      <Text
        text="Nothing nearby within 15 km right now."
        type="regular-base"
        color={Colors.neutral.secondary}
        style={{ textAlign: 'center' }}
      />
    );
  }, [isLoadingNearbyDestinations]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: leafletHTML }}
        onMessage={handleMessage}
        style={styles.map}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState={false}
      />

      {selectedPlace !== null && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          activeOpacity={0.8}
        >
          <Text text={`✕  ${selectedPlace.name}`} type="bold-xl" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.centerButton}
        onPress={handleCenterMap}
        activeOpacity={0.8}
      >
        <MaterialDesignIcons
          name="crosshairs-gps"
          size={24}
          color={Colors.primary.base}
        />
      </TouchableOpacity>

      {routeLoading && (
        <View style={styles.routeLoadingOverlay}>
          <ActivityIndicator color={Colors.primary.base} size="small" />
        </View>
      )}

      {/* {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={Colors.primary.base} />
        </View>
      )} */}

      {error !== null && (
        <View style={styles.errorOverlay}>
          <Text
            text="Location access is required to show your position on the map."
            type="bold-xl"
          />
        </View>
      )}

      {location === null && (
        <View style={styles.errorOverlay}>
          <Text
            text="Failed to get location. Please ensure location services are enabled and try again."
            type="bold-xl"
            textAlign="center"
          />
        </View>
      )}

      <View style={styles.bottomContainer}>
        <Text
          text="Nearby Destinations"
          type="bold-xl"
          color={Colors.neutral.base}
        />

        <FlatList
          data={nearbyPlaces}
          keyExtractor={item => item?.id ?? ''}
          showsVerticalScrollIndicator={false}
          style={styles.placesList}
          contentContainerStyle={
            nearbyPlaces?.length === 0 && {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
          ListEmptyComponent={renderEmptyNearbyDestinations}
          renderItem={({ item: place }) => {
            const distance = location
              ? getDistanceKm(
                  location.latitude,
                  location.longitude,
                  place?.latitude ?? 0,
                  place?.longitude ?? 0,
                )
              : 0;

            return (
              <View style={styles.placeItemWrapper}>
                <TouchableOpacity
                  style={styles.placeItem}
                  onPress={() => {
                    setSelectedPlace(place);
                    fetchRoute(place);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.placeIconContainer}>
                    <MaterialDesignIcons
                      name="map-marker-outline"
                      size={24}
                      color={Colors.neutral.base}
                    />
                  </View>

                  <View style={styles.placeInfo}>
                    <Text
                      text={place.name}
                      type="bold-base"
                      color={Colors.neutral.base}
                      numberOfLines={1}
                    />
                    <Text
                      text={`${distance.toFixed(0)} km`}
                      type="regular-sm"
                      color={Colors.neutral.secondary}
                      numberOfLines={1}
                    />
                  </View>
                </TouchableOpacity>

                <View style={{ width: '30%' }}>
                  <Button
                    outline
                    label="See Detail"
                    style={styles.btnSeeDetail}
                    textStyle={{ fontSize: 14 }}
                    action={() => {
                      onNavigateDetail({ item: place });
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export { MapScreen };
