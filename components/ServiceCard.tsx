import {} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getColors } from './Colors';

export const ServiceCard = ({ icon, title, desc, isDark, isMobile }) => {
  const colors = getColors(isDark);
  return (
    <Pressable style={({ hovered }) => [styles.serviceCardInner, { backgroundColor: colors.cardBg }, hovered && styles.cardHover, isMobile && styles.mobileServiceCard]}>
      <View style={[styles.serviceIcon, { backgroundColor: colors.tagBg }]}>
        <Ionicons name={icon} size={isMobile ? 24 : 28} color={colors.accent} />
      </View>
      <Text style={[styles.serviceTitle, { color: colors.text }, isMobile && styles.mobileServiceTitle]}>{title}</Text>
      <Text style={[styles.serviceDesc, { color: colors.subText }, isMobile && styles.mobileServiceDesc]}>{desc}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    serviceCardInner: { width: 260, borderRadius: 28, padding: 28, alignItems: 'center', gap: 18, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  mobileServiceCard: { width: '100%', padding: 20, gap: 14 },
  cardHover: { transform: [{ scale: 1.02 }], shadowOpacity: 0.12 },
  serviceIcon: { padding: 16, borderRadius: 60 },
  serviceTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  mobileServiceTitle: { fontSize: 18 },
  serviceDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  mobileServiceDesc: { fontSize: 13, lineHeight: 20 },
});