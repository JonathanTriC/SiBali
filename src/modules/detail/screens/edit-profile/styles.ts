import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.secondaryDark,
  },
  rightHeader: {
    height: 44,
    width: 44,
  },
  container: {
    flexGrow: 1,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.neutral.secondaryDark,
    marginVertical: 8,
  },
});
