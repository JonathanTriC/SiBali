import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 24,
    gap: 4,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.neutral.secondary,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 16,
  },
  dayCard: {
    borderRadius: 16,
    backgroundColor: Colors.neutral.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.neutral.secondaryDark,
    padding: 16,
    gap: 12,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dayIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTitleGroup: {
    gap: 2,
  },
  placesContainer: {
    gap: 8,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.secondaryDark,
    overflow: 'hidden',
  },
  placeImage: {
    width: 72,
    height: 72,
  },
  placeNumberBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeInfo: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 4,
  },
  placeTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chevronContainer: {
    paddingRight: 12,
  },
});
