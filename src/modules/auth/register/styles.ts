import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    marginTop: 24,
    paddingHorizontal: 20,
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
  personalizeBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.primary.base,
    borderRadius: 30,
    backgroundColor: Colors.primary.light,
  },
  termsConditionContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
  },
});
