import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  blobContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backContainer: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.primary.light,
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
