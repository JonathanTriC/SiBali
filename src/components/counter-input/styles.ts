import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral.secondaryDark,
    backgroundColor: Colors.neutral.secondaryLight,
  },

  button: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  minusButton: {
    backgroundColor: Colors.primary.light,
  },

  plusButton: {
    backgroundColor: Colors.primary.base,
  },
  disabledButton: {
    opacity: 0.2,
  },
});
