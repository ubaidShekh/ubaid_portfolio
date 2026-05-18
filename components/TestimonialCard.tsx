import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { getColors } from './Colors';

export const TestimonialCard = ({ testimonial, isDark, isMobile }) => {
  const colors = getColors(isDark);
  return (
    <View style={[styles.testimonialCardInner, { backgroundColor: colors.cardBg, shadowColor: colors.cardShadow }, isMobile && styles.mobileTestimonialCard]}>
      <View style={styles.testimonialAvatar}>
        <Ionicons name="person-circle" size={isMobile ? 48 : 56} color={colors.accentLight} />
      </View>
      <Text style={[styles.testimonialText, { color: colors.subText }, isMobile && styles.mobileTestimonialText]}>“{testimonial.feedback}”</Text>
      <Text style={[styles.testimonialName, { color: colors.text }, isMobile && styles.mobileTestimonialName]}>{testimonial.name}</Text>
      <Text style={[styles.testimonialRole, { color: colors.subText }, isMobile && styles.mobileTestimonialRole]}>{testimonial.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    testimonialCardInner: { width: 300, borderRadius: 28, padding: 28, alignItems: 'center', gap: 16, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  mobileTestimonialCard: { width: '100%', padding: 20, gap: 12 },
  testimonialAvatar: { marginBottom: 4 },
  testimonialText: { fontSize: 15, textAlign: 'center', lineHeight: 24, fontStyle: 'italic' },
  mobileTestimonialText: { fontSize: 14, lineHeight: 20 },
  testimonialName: { fontSize: 18, fontWeight: '700' },
  mobileTestimonialName: { fontSize: 16 },
  testimonialRole: { fontSize: 13 },
  mobileTestimonialRole: { fontSize: 12 },
});