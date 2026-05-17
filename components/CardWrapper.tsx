
import { Platform, StyleSheet, View, } from 'react-native';
import { getColors } from './Colors';
  const isWeb = Platform.OS === 'web';

export const CardWrapper = ({ children, isDark, style, isMobile }) => {
  const colors = getColors(isDark);

  return (
    <View style={[
      styles.card, 
      { backgroundColor: colors.cardBg, shadowColor: colors.cardShadow },
      isMobile && styles.mobileCard,
      style
    ]}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
    // Card wrapper
  card: {
    marginHorizontal: isWeb ? 40 : 20,
    marginVertical: 24,
    padding: isWeb ? 48 : 28,
    borderRadius: 40,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  mobileCard: { marginHorizontal: 16, marginVertical: 16, padding: 20, borderRadius: 28 },
});