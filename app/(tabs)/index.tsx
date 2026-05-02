import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable, TextInput,
  Platform, Alert, useColorScheme, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// ------------------------- Helper: Get theme colors -------------------------
const getColors = (isDark) => ({
  background: isDark ? '#0f172a' : '#f8fafc',
  cardBg: isDark ? '#1e293b' : '#ffffff',
  text: isDark ? '#f1f5f9' : '#1e293b',
  subText: isDark ? '#94a3b8' : '#475569',
  border: isDark ? '#334155' : '#e2e8f0',
  glassBg: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  tagBg: isDark ? '#334155' : '#f1f5f9',
});

// ------------------------- Typing Animation (no theme needed inside) -------------------------
const TypingAnimation = ({ text, speed = 100, textColor }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return <Text style={[styles.typingText, { color: textColor }]}>{displayText}</Text>;
};

// ------------------------- Header -------------------------
const Header = ({ isDark, toggleTheme, navItems, scrollToSection }) => {
  const colors = getColors(isDark);
  return (
    <View style={[styles.header, Platform.OS === 'web' && styles.headerWeb, { backgroundColor: colors.glassBg, borderBottomColor: colors.border }]}>
      <Text style={[styles.logo, { color: colors.text }]}>Ubaid.</Text>
      <View style={styles.navLinks}>
        {navItems.map((item) => (
          <Pressable key={item.label} onPress={() => scrollToSection(item.ref)}>
            <Text style={[styles.navLink, { color: colors.text }]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons name={isDark ? 'sunny' : 'moon'} size={24} color={colors.text} />
      </Pressable>
    </View>
  );
};

// ------------------------- Hero Section -------------------------
const HeroSection = ({ isDark }) => {
  const colors = getColors(isDark);
  return (
    <View style={styles.heroContainer}>
      <View style={styles.heroLeft}>
        <View style={[styles.badge, { backgroundColor: colors.tagBg }]}><Text style={[styles.badgeText, { color: colors.text }]}>✨ Open to opportunities</Text></View>
        <Text style={[styles.heading, { color: colors.text }]}>Hi, I'm <Text style={styles.gradientText}>Ubaid Shekh</Text></Text>
        <TypingAnimation text="Mobile App Creator" textColor={colors.text} />
        <Text style={[styles.description, { color: colors.subText }]}>Crafting seamless mobile experiences with React Native & Expo. 4+ years transforming ideas into high-performance apps.</Text>
        <View style={styles.buttonGroup}>
          <Pressable style={styles.gradientBtn}>
            <LinearGradient colors={['#8b5cf6', '#3b82f6']} style={styles.gradientBackground}>
              <Text style={styles.btnText}>View Work</Text>
            </LinearGradient>
          </Pressable>
          <Pressable style={styles.outlineBtn}><Text style={styles.outlineText}>Hire Me</Text></Pressable>
        </View>
      </View>
      <View style={styles.heroRight}>
        <View style={[styles.profileCard, { backgroundColor: colors.cardBg, shadowColor: '#000' }]}>
          <Ionicons name="person-circle" size={80} color="#8b5cf6" />
          <View style={[styles.statusBadge, { backgroundColor: colors.tagBg }]}><View style={styles.greenDot} /><Text style={[styles.statusText, { color: colors.text }]}>Available for work</Text></View>
          <Text style={[styles.name, { color: colors.text }]}>Ubaid Shekh</Text>
          <Text style={[styles.role, { color: colors.subText }]}>Mobile App Creator</Text>
          <View style={styles.infoRow}><Ionicons name="location" size={16} color={colors.subText} /><Text style={[styles.infoText, { color: colors.subText }]}>New Delhi, India</Text></View>
          <View style={styles.infoRow}><Ionicons name="school" size={16} color={colors.subText} /><Text style={[styles.infoText, { color: colors.subText }]}>Jamia Millia Islamia</Text></View>
        </View>
      </View>
    </View>
  );
};

// ------------------------- About Section -------------------------
const AboutSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const stats = [
    { value: '15+', label: 'Projects' },
    { value: '3+', label: 'Years Coding' },
    { value: '10+', label: 'Technologies' },
    { value: '∞', label: 'Cups of Chai' },
  ];
  return (
    <View style={styles.aboutContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>About Me</Text>
      <Text style={[styles.description, { color: colors.subText }]}>I'm a passionate mobile developer specializing in React Native and cross-platform solutions. With a strong foundation in IoT and full-stack development, I build apps that are both functional and beautiful. Currently exploring AI integrations and cloud architectures.</Text>
      <View style={styles.statsRow}>
        {stats.map((stat, i) => (
          <View key={i} style={styles.statItem}><Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: colors.subText }]}>{stat.label}</Text></View>
        ))}
      </View>
    </View>
  );
};

// ------------------------- Skills Section -------------------------
const SkillsSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const skills = ['React Native', 'Flutter', 'Node.js', 'Firebase', 'MongoDB', 'TypeScript', 'Arduino ESP8266', 'IoT Protocols', 'REST API', 'UI/UX', 'Git'];
  return (
    <View style={styles.skillsContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Skills & Tech Stack</Text>
      <View style={styles.tagsWrapper}>
        {skills.map((skill, i) => (
          <View key={i} style={[styles.tag, { backgroundColor: colors.tagBg, shadowColor: '#000' }]}><Text style={[styles.tagText, { color: colors.text }]}>{skill}</Text></View>
        ))}
      </View>
    </View>
  );
};

// ------------------------- Projects Section -------------------------
const ProjectsSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const projects = [
    { title: 'Smart Home Automation', description: 'IoT-based control system for lights, fans, and security.', tech: ['ESP8266', 'React Native', 'MQTT'], icon: 'home', gradient: ['#4f46e5', '#7c3aed'] },
    { title: 'Laundry Service Platform', description: 'On-demand laundry booking with real-time tracking.', tech: ['Node.js', 'MongoDB', 'Expo'], icon: 'shirt', gradient: ['#ec4899', '#f43f5e'] },
    { title: 'Muslim Community Platform', description: 'Prayer times, Qibla, and event management.', tech: ['Firebase', 'React Native', 'API'], icon: 'mosque', gradient: ['#10b981', '#14b8a6'] },
  ];
  return (
    <View style={styles.projectsContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Projects</Text>
      <View style={styles.projectGrid}>
        {projects.map((project, i) => (
          <Pressable key={i} style={({ hovered }) => [styles.projectCard, { backgroundColor: colors.cardBg, shadowColor: '#000' }, hovered && styles.projectCardHover]}>
            <LinearGradient colors={project.gradient} style={styles.projectImage}><Ionicons name={project.icon} size={48} color="white" /></LinearGradient>
            <View style={styles.projectContent}><Text style={[styles.projectTitle, { color: colors.text }]}>{project.title}</Text><Text style={[styles.projectDesc, { color: colors.subText }]}>{project.description}</Text><View style={styles.techTags}>{project.tech.map((t, j) => <Text key={j} style={[styles.techText, { backgroundColor: colors.tagBg, color: colors.text }]}>{t}</Text>)}</View></View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

// ------------------------- App Screenshots -------------------------
const AppScreenshots = ({ isDark }) => {
  const colors = getColors(isDark);
  const apps = [
    { name: 'FitTrack', gradient: ['#06b6d4', '#3b82f6'] },
    { name: 'Home IoT', gradient: ['#8b5cf6', '#d946ef'] },
    { name: 'Laundry', gradient: ['#f97316', '#ef4444'] },
    { name: 'Community', gradient: ['#10b981', '#14b8a6'] },
  ];
  return (
    <View style={styles.screenshotsContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>App Screenshots</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.screenshotScroll}>
        {apps.map((app, i) => (
          <LinearGradient key={i} colors={app.gradient} style={styles.screenshotCard}><Text style={styles.screenshotTitle}>{app.name}</Text></LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
};

// ------------------------- Showcase Box -------------------------
const ShowcaseBox = ({ isDark }) => {
  const colors = getColors(isDark);
  return (
    <View style={[styles.showcaseContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
      <Ionicons name="play-circle" size={64} color="#8b5cf6" />
      <Text style={[styles.showcaseText, { color: colors.text }]}>Demo / Video Showcase</Text>
      <Text style={[styles.showcaseSubtext, { color: colors.subText }]}>Coming soon — project walkthroughs & demos</Text>
    </View>
  );
};

// ------------------------- Contact Section -------------------------
const ContactSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const handleSend = () => { Alert.alert('Message Sent', 'Thank you for reaching out!'); setForm({ name: '', email: '', subject: '', message: '' }); };
  const contactInfo = [
    { icon: 'mail', label: 'Email', value: 'hello@ubaid.dev' },
    { icon: 'call', label: 'Phone', value: '+91 98765 43210' },
    { icon: 'location', label: 'Location', value: 'New Delhi, India' },
  ];
  return (
    <View style={styles.contactContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Let's Connect</Text>
      <View style={styles.contactGrid}>
        <View style={styles.contactLeft}>
          {contactInfo.map((item, i) => (
            <View key={i} style={styles.contactInfoItem}>
              <Ionicons name={item.icon} size={24} color="#8b5cf6" />
              <View><Text style={[styles.contactInfoLabel, { color: colors.subText }]}>{item.label}</Text><Text style={[styles.contactInfoValue, { color: colors.text }]}>{item.value}</Text></View>
            </View>
          ))}
        </View>
        <View style={styles.contactRight}>
          <TextInput style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]} placeholder="Your Name" placeholderTextColor={colors.subText} value={form.name} onChangeText={t => setForm({ ...form, name: t })} />
          <TextInput style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]} placeholder="Email Address" placeholderTextColor={colors.subText} keyboardType="email-address" value={form.email} onChangeText={t => setForm({ ...form, email: t })} />
          <TextInput style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]} placeholder="Subject" placeholderTextColor={colors.subText} value={form.subject} onChangeText={t => setForm({ ...form, subject: t })} />
          <TextInput style={[styles.input, styles.textArea, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]} placeholder="Message" placeholderTextColor={colors.subText} multiline numberOfLines={4} value={form.message} onChangeText={t => setForm({ ...form, message: t })} />
          <Pressable onPress={handleSend} style={styles.sendBtn}><LinearGradient colors={['#8b5cf6', '#3b82f6']} style={styles.gradientBackground}><Text style={styles.sendText}>Send Message</Text></LinearGradient></Pressable>
        </View>
      </View>
    </View>
  );
};

// ------------------------- Footer -------------------------
const Footer = ({ isDark }) => {
  const colors = getColors(isDark);
  return <View style={[styles.footer, { borderTopColor: colors.border }]}><Text style={[styles.footerText, { color: colors.subText }]}>© 2026 Ubaid Shekh — Built with ❤️ using web & mobile</Text></View>;
};

// ------------------------- Main App -------------------------
export default function App() {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');
  const toggleTheme = () => setIsDark(prev => !prev);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const showcaseRef = useRef(null);
  const contactRef = useRef(null);

  const navItems = [
    { label: 'Home', ref: homeRef },
    { label: 'About', ref: aboutRef },
    { label: 'Skills', ref: skillsRef },
    { label: 'Projects', ref: projectsRef },
    { label: 'Showcase', ref: showcaseRef },
    { label: 'Contact', ref: contactRef },
  ];

  const scrollToSection = (ref) => {
    if (Platform.OS === 'web' && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const colors = getColors(isDark);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Header isDark={isDark} toggleTheme={toggleTheme} navItems={navItems} scrollToSection={scrollToSection} />
      <ScrollView style={[styles.mainContainer, { backgroundColor: colors.background }]}>
        <View ref={homeRef}><HeroSection isDark={isDark} /></View>
        <View ref={aboutRef}><AboutSection isDark={isDark} /></View>
        <View ref={skillsRef}><SkillsSection isDark={isDark} /></View>
        <View ref={projectsRef}><ProjectsSection isDark={isDark} /></View>
        <AppScreenshots isDark={isDark} />
        <View ref={showcaseRef}><ShowcaseBox isDark={isDark} /></View>
        <View ref={contactRef}><ContactSection isDark={isDark} /></View>
        <Footer isDark={isDark} />
      </ScrollView>
    </>
  );
}

// ------------------------- Styles (static, colors applied inline) -------------------------
const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, ...Platform.select({ web: { backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 } }) },
  logo: { fontSize: 24, fontWeight: 'bold' },
  navLinks: { flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' },
  navLink: { fontSize: 16, fontWeight: '500', opacity: 0.8 },
  themeToggle: { padding: 8 },
  // Hero
  heroContainer: { flexDirection: Platform.OS === 'web' ? 'row' : 'column', padding: 24, gap: 40, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  heroLeft: { flex: 1, gap: 20 },
  heroRight: { flex: 1, alignItems: 'center' },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 40, alignSelf: 'flex-start' },
  badgeText: { fontSize: 14 },
  heading: { fontSize: 48, fontWeight: 'bold' },
  gradientText: { backgroundImage: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', color: 'transparent' },
  typingText: { fontSize: 24, fontWeight: '600', marginVertical: 8 },
  description: { fontSize: 16, lineHeight: 24 },
  buttonGroup: { flexDirection: 'row', gap: 16, marginTop: 8 },
  gradientBtn: { borderRadius: 40, overflow: 'hidden' },
  gradientBackground: { paddingHorizontal: 28, paddingVertical: 12, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '600', fontSize: 16 },
  outlineBtn: { borderWidth: 1, borderColor: '#8b5cf6', borderRadius: 40, paddingHorizontal: 28, paddingVertical: 12 },
  outlineText: { color: '#8b5cf6', fontWeight: '600' },
  profileCard: { borderRadius: 32, padding: 24, alignItems: 'center', gap: 12, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10, width: '100%', maxWidth: 320 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 40 },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981' },
  statusText: { fontSize: 12 },
  name: { fontSize: 20, fontWeight: 'bold' },
  role: { fontSize: 14 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { fontSize: 14 },
  // About
  aboutContainer: { padding: 40, alignItems: 'center', gap: 20, maxWidth: 800, alignSelf: 'center' },
  sectionTitle: { fontSize: 36, fontWeight: 'bold', marginBottom: 16 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 20, marginTop: 20, width: '100%' },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 28, fontWeight: 'bold' },
  statLabel: { fontSize: 14, marginTop: 4 },
  // Skills
  skillsContainer: { padding: 40, alignItems: 'center', gap: 24 },
  tagsWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, maxWidth: 900 },
  tag: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 40, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  tagText: { fontSize: 14, fontWeight: '500' },
  // Projects
  projectsContainer: { padding: 40, alignItems: 'center', gap: 32 },
  projectGrid: { flexDirection: Platform.OS === 'web' ? 'row' : 'column', flexWrap: 'wrap', justifyContent: 'center', gap: 24, maxWidth: 1100 },
  projectCard: { borderRadius: 24, overflow: 'hidden', width: 300, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5, transition: 'all 0.2s' },
  projectCardHover: { transform: [{ scale: 1.02 }], shadowOpacity: 0.2 },
  projectImage: { height: 160, justifyContent: 'center', alignItems: 'center' },
  projectContent: { padding: 20, gap: 8 },
  projectTitle: { fontSize: 20, fontWeight: 'bold' },
  projectDesc: { fontSize: 14 },
  techTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  techText: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, fontSize: 12 },
  // Screenshots
  screenshotsContainer: { paddingVertical: 40, gap: 24, alignItems: 'center' },
  screenshotScroll: { paddingHorizontal: 20, gap: 20 },
  screenshotCard: { width: 200, height: 280, borderRadius: 32, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  screenshotTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  // Showcase
  showcaseContainer: { borderRadius: 48, padding: 60, margin: 40, alignItems: 'center', justifyContent: 'center', gap: 16, borderWidth: 1, borderStyle: 'dashed', minHeight: 300 },
  showcaseText: { fontSize: 24, fontWeight: '600' },
  showcaseSubtext: { fontSize: 16 },
  // Contact
  contactContainer: { padding: 40, alignItems: 'center', gap: 32, maxWidth: 1000, alignSelf: 'center', width: '100%' },
  contactGrid: { flexDirection: Platform.OS === 'web' ? 'row' : 'column', gap: 40, width: '100%' },
  contactLeft: { flex: 1, gap: 16 },
  contactRight: { flex: 1, gap: 20 },
  contactInfoItem: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  contactInfoLabel: { fontSize: 14 },
  contactInfoValue: { fontSize: 16, fontWeight: '500' },
  input: { borderRadius: 16, padding: 16, fontSize: 16, borderWidth: 1 },
  textArea: { height: 100, textAlignVertical: 'top' },
  sendBtn: { borderRadius: 40, overflow: 'hidden' },
  sendText: { color: 'white', fontWeight: '600', fontSize: 16 },
  // Footer
  footer: { paddingVertical: 32, alignItems: 'center', borderTopWidth: 1, marginTop: 40 },
  footerText: { fontSize: 14, textAlign: 'center' },
});