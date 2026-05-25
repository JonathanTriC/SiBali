import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  travelerLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  askAIRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    paddingVertical: 24,
    gap: 24,
  },
  popularCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.neutral.secondaryDark,
    backgroundColor: Colors.neutral.secondaryLight,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingRowContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 24,
  },
  gap8: {
    gap: 8,
  },
  gap16: {
    gap: 16,
  },
  gap24: {
    gap: 24,
  },
});
