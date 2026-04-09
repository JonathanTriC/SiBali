import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 160,
    height: 220,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  badge: {
    margin: 10,
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  footer: {
    padding: 10,
    paddingBottom: 12,
    gap: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});
