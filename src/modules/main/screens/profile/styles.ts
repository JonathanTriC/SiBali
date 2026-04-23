import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.secondaryLight,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // Avatar section
  avatarSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
    backgroundColor: Colors.white,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral.secondaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    marginBottom: 2,
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    gap: 6,
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconBlue: {
    backgroundColor: Colors.primary.light,
  },
  statIconYellow: {
    backgroundColor: '#FEF9C3',
  },

  // Menu sections
  sectionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 20,
  },
  sectionLabel: {
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  menuCard: {
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral.secondaryDark,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItemDivider: {
    height: 1,
    backgroundColor: Colors.neutral.secondaryDark,
    marginHorizontal: 16,
  },
  menuItemLabel: {
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 16,
  },

  // Version
  versionText: {
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
});
