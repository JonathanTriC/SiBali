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
  container: {
    flexGrow: 1,
    marginTop: 24,
    paddingHorizontal: 20,
    gap: 32,
  },
  interestItem: {
    padding: 18,
    gap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.neutral.secondaryDark,
    borderRadius: 16,
  },
  activeInterestItem: {
    borderColor: Colors.primary.base,
    backgroundColor: Colors.primary.secondary,
  },
  interestItemIcon: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.neutral.secondaryLight,
  },
  activeInterestItemIcon: {
    backgroundColor: Colors.primary.light,
  },
  checkInterestIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
    padding: 4,
    borderRadius: 30,
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  footerBtn: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: Colors.white,
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
