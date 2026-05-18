import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Image, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { getColors } from './Colors';
import { useResponsive } from './useResponsive';

const isWeb = Platform.OS === "web";
// ------------------------- Hero Section -------------------------
export const HeroSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();
  const downloadCV = () => {
    const url = "https://drive.google.com/uc?export=download&id=1DhO6T8vQHx_qwV8TKk2pjOvvqfHxT70w";
    Linking.openURL(url);
  };
  
  return (
    <View style={[styles.heroContainer, isMobile && styles.mobileHeroContainer]}>
      <View style={styles.heroLeft}>
        <Text style={[styles.heroIntro, { color: colors.accent }, isMobile && styles.mobileHeroIntro]}>HELLO, I'M UBAID</Text>
        <Text style={[styles.heroTitle, { color: colors.text }, isMobile && styles.mobileHeroTitle]}>
          Mobile App Developer &<Text style={styles.gradientText}> UI/UX Designer</Text>
        </Text>
        <Text style={[styles.heroDesc, { color: colors.subText }, isMobile && styles.mobileHeroDesc]}>
          Crafting high-performance mobile apps with React Native and modern UI/UX. 
          4+ years of turning ideas into delightful digital experiences.
        </Text>
        <View style={[styles.heroButtons, isMobile && styles.mobileHeroButtons]}>
          <Pressable style={styles.downloadBtn} onPress={downloadCV}>
            <LinearGradient colors={[colors.accent, '#222']} style={styles.gradientBtn}>
              <Text style={styles.btnText}>Download CV</Text>
            </LinearGradient>
          </Pressable>
          <Pressable style={[styles.hireOutlineBtn, { borderColor: colors.accent }]} onPress={() => Alert.alert("Contact", "Reach out via email or phone")}>
            <Text style={[styles.outlineText, { color: colors.accent }]}>Hire Me</Text>
          </Pressable>
        </View>
      </View>
      {!isMobile && (
        <View style={styles.heroRight}>
          <View style={styles.profileWrapper}>
            <View style={[styles.profileBorder, { borderColor: colors.border }]}>
              <Image source={require('../assets/images/profile.png')} style={styles.profileImage} />
            </View>
            <View style={[styles.floatingShape, styles.shape1, { backgroundColor: colors.accent, opacity: 0.08 }]} />
            <View style={[styles.floatingShape, styles.shape2, { backgroundColor: colors.accent, opacity: 0.08 }]} />
            <View style={[styles.floatingShape, styles.shape3, { backgroundColor: colors.accentLight, opacity: 0.05 }]} />
          </View>
        </View>
      )}
      {isMobile && (
        <View style={styles.heroRightMobile}>
          <View style={[styles.profileBorderMobile, { borderColor: colors.border }]}>
            <Image source={require('../assets/images/profile.png')} style={styles.profileImageMobile} />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  
    // Hero
  heroContainer: {
    flexDirection: isWeb ? 'row' : 'row',
    padding: isWeb ? 64 : 32,
    gap: 48,
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
  },
  mobileHeroContainer: { flexDirection: 'column', padding: 24, gap: 32 },
  heroLeft: { flex: 1, gap: 24 },
  heroRight: { flex: 1, alignItems: 'center' },
  heroRightMobile: { alignItems: 'center', marginTop: 20 },
  heroIntro: { fontSize: 14, letterSpacing: 3, fontWeight: '600' },
  mobileHeroIntro: { fontSize: 12, letterSpacing: 2 },
  heroTitle: { fontSize: 52, fontWeight: '700', lineHeight: 62, letterSpacing: -1 },
  mobileHeroTitle: { fontSize: 32, lineHeight: 42 },
  gradientText: { backgroundImage: 'linear-gradient(135deg, #4a4a4a, #8a8a8a)', WebkitBackgroundClip: 'text', color: 'transparent' },
  heroDesc: { fontSize: 17, lineHeight: 28, opacity: 0.85 },
  mobileHeroDesc: { fontSize: 15, lineHeight: 24 },
  heroButtons: { flexDirection: 'row', gap: 24, marginTop: 8 },
  mobileHeroButtons: { gap: 16, flexWrap: 'wrap' },
  downloadBtn: { borderRadius: 50, overflow: 'hidden' },
  gradientBtn: { paddingHorizontal: 36, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '600', fontSize: 16 },
  hireOutlineBtn: { borderWidth: 1.5, borderRadius: 50, paddingHorizontal: 36, paddingVertical: 15 },
  outlineText: { fontWeight: '600', fontSize: 16 },
  profileWrapper: { width: 280, height: 280, position: 'relative' },
  profileBorder: { width: '100%', height: '100%', borderRadius: 140, borderWidth: 2, padding: 5 },
  profileImage: { width: '100%', height: '100%', borderRadius: 140 },
  profileBorderMobile: { width: 200, height: 200, borderRadius: 100, borderWidth: 2, padding: 4 },
  profileImageMobile: { width: '100%', height: '100%', borderRadius: 100 },
    floatingShape: { position: 'absolute', width: 80, height: 80, borderRadius: 40 },
    shape1: { top: -30, right: -30 },
    shape2: { bottom: -30, left: -30 },
    shape3: { top: '30%', left: -20, width: 50, height: 50 },
    // About
});