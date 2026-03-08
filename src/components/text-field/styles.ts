import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  errorHelperText: {
    marginTop: 4,
    color: Colors.danger.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Mulish-Regular',
  },
  successHelperText: {
    marginTop: 4,
    color: Colors.success.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Mulish-Regular',
  },
  subLabel: {
    marginTop: 4,
    color: Colors.neutral.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Mulish-Regular',
  },
});
