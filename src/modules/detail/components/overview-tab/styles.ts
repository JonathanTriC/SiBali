import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  amenitiesChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.neutral.secondaryLight,
  },
});
