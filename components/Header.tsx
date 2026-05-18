import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { getColors } from './Colors';
import { useResponsive } from './useResponsive';

const isWeb = Platform.OS ==="web";


// ------------------------- Header (Mobile Optimized) -------------------------
export const Header = ({ isDark, toggleTheme, scrollToSection }) => {
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();
  const [mobileMenu, setMobileMenu] = useState(false);
  const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  const handleNavPress = (item) => {
    scrollToSection(item.toLowerCase());
    setMobileMenu(false);
  };
    const router = useRouter();

  return (
    <>
      <View style={[styles.header, isWeb && styles.headerWeb, { backgroundColor: colors.glassBg, borderBottomColor: colors.border }, isMobile && styles.mobileHeader]}>
        <Pressable onPress={() => scrollToSection('home')}>
          <Text style={[styles.logo, { color: colors.text }, isMobile && styles.mobileLogo]}>Mohammad Ubaid</Text>
        </Pressable>
        
        {!isMobile && (
          <View style={styles.navLinks}>
            {navItems.map((item) => (
              <Pressable key={item} onPress={() => scrollToSection(item.toLowerCase())}>
                <Text style={[styles.navLink, { color: colors.subText }]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        )}
        
        <View style={styles.headerActions}>
          <Pressable style={styles.hireMeBtn} onPress={() => scrollToSection('contact')}>
            <LinearGradient colors={[colors.accent, '#222']} style={styles.hireBtnGrad}>
              <Text style={styles.hireBtnText}>Hire Me</Text>
            </LinearGradient>
          </Pressable>
        
           <Pressable style={styles.hireMeBtn} onPress={() =>{
            router.push('../Screen/Interview');
           }}>
            <LinearGradient colors={[colors.accent, '#222']} style={styles.hireBtnGrad}>
              <Text style={styles.hireBtnText}>Practice</Text>
            </LinearGradient>
          </Pressable>
            <Pressable onPress={toggleTheme} style={styles.themeToggle}>
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={20} color={colors.text} />
          </Pressable>
          {isMobile && (
            <Pressable onPress={() => setMobileMenu(!mobileMenu)}>
              <Ionicons name={mobileMenu ? 'close' : 'menu'} size={24} color={colors.text} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Mobile Menu Modal */}
      {isMobile && (
        <Modal
          visible={mobileMenu}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMobileMenu(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setMobileMenu(false)}>
            <View style={[styles.mobileMenuContainer, { backgroundColor: colors.cardBg }]}>
              {navItems.map((item) => (
                <Pressable key={item} style={styles.mobileNavItem} onPress={() => handleNavPress(item)}>
                  <Text style={[styles.mobileNavLink, { color: colors.text }]}>{item}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isWeb ? 48 : 20,
    paddingVertical: isWeb ? 20 : 16,
    borderBottomWidth: 1,
  },
  headerWeb: { position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(16px)' },
  mobileHeader: { paddingHorizontal: 16, paddingVertical: 12 },
  logo: { fontSize: 26, fontWeight: '700', letterSpacing: -0.5 },
  mobileLogo: { fontSize: 20 },
  navLinks: { flexDirection: 'row', gap: 40 },
  navLink: { fontSize: 15, fontWeight: '500', letterSpacing: 0.3 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  hireMeBtn: { borderRadius: 40, overflow: 'hidden' },
  hireBtnGrad: { paddingHorizontal: 22, paddingVertical: 11 },
  hireBtnText: { color: 'white', fontWeight: '600', fontSize: 14 },
  themeToggle: { padding: 8 },
  // Mobile Menu Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start' },
  mobileMenuContainer: { marginTop: 70, marginHorizontal: 16, borderRadius: 20, paddingVertical: 20, paddingHorizontal: 16, elevation: 5, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  mobileNavItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  mobileNavLink: { fontSize: 18, fontWeight: '500', textAlign: 'center' },

});