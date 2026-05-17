import { StyleSheet, Text, View } from 'react-native';
import { getColors } from './Colors';

export const SectionTitle = ({ title, isDark, isMobile }) => {
  const colors = getColors(isDark);
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.text }, isMobile && styles.mobileSectionTitle]}>{title}</Text>
      <View style={[styles.sectionUnderline, { backgroundColor: colors.accent }]} />
    </View>
  );
};

const styles= StyleSheet.create({
   sectionHeader: { alignItems: 'center', marginBottom: 40 },
   sectionTitle: { fontSize: 42, fontWeight: '700', letterSpacing: -0.5, marginBottom: 12 },
     
  mobileSectionTitle: { fontSize: 32, marginBottom: 8 },
  sectionUnderline: { width: 60, height: 3, borderRadius: 3 },
})