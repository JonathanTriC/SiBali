import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSplashScreen } from './useSplashScreen';
import { screenHeight, screenWidth } from '@constants/functional';

const Splash = require('@assets/images/splash.png');

const SplashScreen: React.FC = () => {
  const {} = useSplashScreen();
  return (
    // <View style={[styles.container, { marginTop: -top }]}>
    <View style={[styles.container]}>
      <Image source={Splash} style={styles.splash} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    width: screenWidth,
    height: screenHeight,
  },
});

export { SplashScreen };
