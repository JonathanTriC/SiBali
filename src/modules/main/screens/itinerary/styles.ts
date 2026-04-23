import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingBottom: 24,
    paddingHorizontal: 24,
    gap: 4,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 20,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.neutral.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.neutral.secondaryDark,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  imageTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 4,
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.neutral.secondaryDark,
    marginVertical: 4,
  },
  cardFooter: {
    padding: 16,
  },
});
