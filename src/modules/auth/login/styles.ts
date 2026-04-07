import { screenHeight } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    height: screenHeight / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 20,
    gap: 60,
  },
  gap8: {
    gap: 8,
  },
  gap40: {
    gap: 40,
  },
});
