import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.secondaryDark,
    backgroundColor: Colors.neutral.secondaryLight2,
  },
  logoAIContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoAI: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
  },
});
