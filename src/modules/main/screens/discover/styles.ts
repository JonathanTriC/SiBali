import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    zIndex: 999,
    elevation: 10,
  },
  backIcon: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: Colors.neutral.secondaryLight2,
  },
  step1CounterRow: {
    flexDirection: 'row',
    gap: 16,
  },
  step1CounterItem: {
    width: '48%',
    gap: 8,
  },
  step2ExperienceItem: {
    padding: 18,
    gap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.neutral.secondaryDark,
    borderRadius: 16,
  },
  step2ActiveExperienceItem: {
    borderColor: Colors.primary.base,
    backgroundColor: Colors.primary.secondary,
  },
  step2CheckIcon: {
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
  stepPreferenceBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  checkBadgeContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
  },
});
