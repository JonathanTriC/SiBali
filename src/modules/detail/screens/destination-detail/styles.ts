import { screenHeight, screenWidth } from '@constants';
import { Colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenHeight / 3,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    zIndex: 998,
    pointerEvents: 'none',
  },
  stickyHeaderBg: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.secondaryLight2,
  },
  backContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
    borderRadius: 30,
    backgroundColor: Colors.white,
    zIndex: 999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconBg: {
    backgroundColor: Colors.white,
    borderRadius: 30,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  badgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 30,
    backgroundColor: Colors.neutral.secondaryDark,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  outerAIInsight: {
    borderRadius: 12,
    backgroundColor: Colors.primary.base,
  },
  innerAIInsight: {
    marginLeft: 4,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 8,
    borderRadius: 12,
    backgroundColor: Colors.primary.light,
  },
  logoAIInsightContainer: {
    height: 20,
    width: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoAIInsight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
  },
  logoAIInsightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    marginTop: 12,
    width: '100%',
    height: 1,
    backgroundColor: Colors.neutral.secondaryDark,
  },
  indicator: {
    marginTop: -3,
    height: 2,
    width: '100%',
    borderRadius: 2,
    backgroundColor: Colors.primary.base,
  },
  footerBtnContainer: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.secondaryLight2,
    backgroundColor: Colors.white,
  },
});
