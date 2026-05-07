import { StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  ratingContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  reviewInputContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  reviewTextFieldWrapper: {
    width: '80%',
  },
  reviewButtonWrapper: {
    width: '20%',
  },
  reviewCard: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: Colors.neutral.secondaryLight2,
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  reviewStarsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  reviewComment: {
    marginTop: 8,
  },
  emptyContainer: {
    marginTop: 24,
    justifyContent: 'center',
  },
});
