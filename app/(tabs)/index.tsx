import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable, TextInput,
  Platform, Alert, useColorScheme, StatusBar, Image, FlatList, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// ------------------------- Premium Theme -------------------------
const getColors = (isDark) => ({
  background: isDark ? '#0a0a0a' : '#f5f5f7',
  cardBg: isDark ? '#141414' : '#ffffff',
  text: isDark ? '#ededed' : '#111111',
  subText: isDark ? '#9e9e9e' : '#5a5a5a',
  border: isDark ? '#2a2a2a' : '#e8e8e8',
  glassBg: isDark ? 'rgba(20,20,20,0.92)' : 'rgba(255,255,255,0.95)',
  tagBg: isDark ? '#2a2a2a' : '#f0f0f0',
  cardShadow: isDark ? '#00000060' : '#00000008',
  accent: '#3b3b3b',
  accentLight: '#6b6b6b',
});

// ------------------------- Reusable Components -------------------------
const SectionTitle = ({ title, isDark }) => {
  const colors = getColors(isDark);
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      <View style={[styles.sectionUnderline, { backgroundColor: colors.accent }]} />
    </View>
  );
};

// Card wrapper for consistent appearance
const CardWrapper = ({ children, isDark, style }) => {
  const colors = getColors(isDark);
  return (
    <View style={[styles.card, { backgroundColor: colors.cardBg, shadowColor: colors.cardShadow }, style]}>
      {children}
    </View>
  );
};

const ServiceCard = ({ icon, title, desc, isDark }) => {
  const colors = getColors(isDark);
  return (
    <Pressable style={({ hovered }) => [styles.serviceCardInner, { backgroundColor: colors.cardBg }, hovered && styles.cardHover]}>
      <View style={[styles.serviceIcon, { backgroundColor: colors.tagBg }]}>
        <Ionicons name={icon} size={28} color={colors.accent} />
      </View>
      <Text style={[styles.serviceTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.serviceDesc, { color: colors.subText }]}>{desc}</Text>
    </Pressable>
  );
};

const ProjectCard = ({ project, isDark, onPress }) => {
  const colors = getColors(isDark);
  return (
    <Pressable style={({ hovered }) => [styles.projectCardInner, { backgroundColor: colors.cardBg }, hovered && styles.projectCardHover]} onPress={onPress}>
      <View style={[styles.projectImagePlaceholder, { backgroundColor: colors.tagBg }]}>
        <Ionicons name={project.icon} size={36} color={colors.accent} />
      </View>
      <View style={styles.projectContent}>
        <Text style={[styles.projectTitle, { color: colors.text }]}>{project.title}</Text>
        <Text style={[styles.projectCategory, { color: colors.subText }]}>{project.category}</Text>
        <Text style={[styles.viewBtn, { color: colors.accent }]}>View Project →</Text>
      </View>
    </Pressable>
  );
};

const TestimonialCard = ({ testimonial, isDark }) => {
  const colors = getColors(isDark);
  return (
    <View style={[styles.testimonialCardInner, { backgroundColor: colors.cardBg, shadowColor: colors.cardShadow }]}>
      <View style={styles.testimonialAvatar}>
        <Ionicons name="person-circle" size={56} color={colors.accentLight} />
      </View>
      <Text style={[styles.testimonialText, { color: colors.subText }]}>“{testimonial.feedback}”</Text>
      <Text style={[styles.testimonialName, { color: colors.text }]}>{testimonial.name}</Text>
      <Text style={[styles.testimonialRole, { color: colors.subText }]}>{testimonial.role}</Text>
    </View>
  );
};

// ------------------------- Header -------------------------
const Header = ({ isDark, toggleTheme, scrollToSection }) => {
  const colors = getColors(isDark);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  return (
    <View style={[styles.header, isWeb && styles.headerWeb, { backgroundColor: colors.glassBg, borderBottomColor: colors.border }]}>
      <Pressable onPress={() => scrollToSection('home')}>
        <Text style={[styles.logo, { color: colors.text }]}>Ubaid.</Text>
      </Pressable>
      <View style={[styles.navLinks, (!isWeb && !mobileMenu) && { display: 'none' }]}>
        {navItems.map((item) => (
          <Pressable key={item} onPress={() => { scrollToSection(item.toLowerCase()); if (!isWeb) setMobileMenu(false); }}>
            <Text style={[styles.navLink, { color: colors.subText }]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.headerActions}>
        <Pressable style={styles.hireMeBtn}>
          <LinearGradient colors={[colors.accent, '#222']} style={styles.hireBtnGrad}>
            <Text style={styles.hireBtnText}>Hire Me</Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={toggleTheme} style={styles.themeToggle}>
          <Ionicons name={isDark ? 'sunny' : 'moon'} size={20} color={colors.text} />
        </Pressable>
        {!isWeb && (
          <Pressable onPress={() => setMobileMenu(!mobileMenu)}>
            <Ionicons name={mobileMenu ? 'close' : 'menu'} size={24} color={colors.text} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

// ------------------------- Hero Section (no card) -------------------------
const HeroSection = ({ isDark }) => {
  const colors = getColors(isDark);
  return (
    <View style={styles.heroContainer}>
      <View style={styles.heroLeft}>
        <Text style={[styles.heroIntro, { color: colors.accent }]}>HELLO, I'M UBAID</Text>
        <Text style={[styles.heroTitle, { color: colors.text }]}>
          Mobile App Developer &<Text style={styles.gradientText}> UI/UX Designer</Text>
        </Text>
        <Text style={[styles.heroDesc, { color: colors.subText }]}>
          Crafting high-performance mobile apps with React Native and modern UI/UX. 
          4+ years of turning ideas into delightful digital experiences.
        </Text>
        <View style={styles.heroButtons}>
          <Pressable style={styles.downloadBtn}>
            <LinearGradient colors={[colors.accent, '#222']} style={styles.gradientBtn}>
              <Text style={styles.btnText}>Download CV</Text>
            </LinearGradient>
          </Pressable>
          <Pressable style={[styles.hireOutlineBtn, { borderColor: colors.accent }]}>
            <Text style={[styles.outlineText, { color: colors.accent }]}>Hire Me</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.heroRight}>
        <View style={styles.profileWrapper}>
          <View style={[styles.profileBorder, { borderColor: colors.border }]}>
            <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
          </View>
          <View style={[styles.floatingShape, styles.shape1, { backgroundColor: colors.accent, opacity: 0.08 }]} />
          <View style={[styles.floatingShape, styles.shape2, { backgroundColor: colors.accent, opacity: 0.08 }]} />
          <View style={[styles.floatingShape, styles.shape3, { backgroundColor: colors.accentLight, opacity: 0.05 }]} />
        </View>
      </View>
    </View>
  );
};

// ------------------------- About Section (Card) -------------------------
const AboutSection = ({ isDark }) => {
  const colors = getColors(isDark);
  return (
    <CardWrapper isDark={isDark} style={styles.cardContainer}>
      <View style={styles.aboutGrid}>
        <View style={styles.aboutLeft}>
          <Image source={require('../../assets/images/profile.png')} style={[styles.aboutImage, { borderColor: colors.border }]} />
        </View>
        <View style={styles.aboutRight}>
          <SectionTitle title="About Me" isDark={isDark} />
          <Text style={[styles.aboutText, { color: colors.subText }]}>
            I'm a passionate mobile developer and UI/UX designer based in New Delhi. 
            I love creating seamless, user-centric apps that solve real problems.
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>15+</Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>Projects</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>3+</Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>Years</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>10+</Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>Technologies</Text>
            </View>
          </View>
        </View>
      </View>
    </CardWrapper>
  );
};

// ------------------------- Services Section (Card) -------------------------
const ServicesSection = ({ isDark }) => {
  const services = [
    { icon: 'phone-portrait', title: 'Mobile App Dev', desc: 'React Native, Flutter, iOS/Android.' },
    { icon: 'hardware-chip', title: 'IoT Solutions', desc: 'ESP8266, sensors, real-time dashboards.' },
    { icon: 'code-slash', title: 'Web Development', desc: 'React, Node.js, full-stack apps.' },
    { icon: 'brush', title: 'UI/UX Design', desc: 'Figma, prototyping, user-centered design.' },
  ];
  return (
    <CardWrapper isDark={isDark} style={styles.cardContainer}>
      <SectionTitle title="What I Do" isDark={isDark} />
      <View style={styles.servicesGrid}>
        {services.map((s, i) => <ServiceCard key={i} icon={s.icon} title={s.title} desc={s.desc} isDark={isDark} />)}
      </View>
    </CardWrapper>
  );
};

// ------------------------- Skills Section (Card) -------------------------
const SkillsSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const skills = ['React Native', 'Node.js', 'Firebase', 'MongoDB', 'TypeScript', 'Arduino ESP8266', 'IoT Protocols', 'REST API', 'Git'];
  return (
    <CardWrapper isDark={isDark} style={styles.cardContainer}>
      <SectionTitle title="Tech Stack" isDark={isDark} />
      <View style={styles.tagsWrapper}>
        {skills.map((skill, i) => (
          <View key={i} style={[styles.tag, { backgroundColor: colors.tagBg }]}>
            <Text style={[styles.tagText, { color: colors.text }]}>{skill}</Text>
          </View>
        ))}
      </View>
    </CardWrapper>
  );
};

// ------------------------- Portfolio Section (Card) -------------------------
const PortfolioSection = ({ isDark }) => {
  const [filter, setFilter] = useState('All');
  const projects = [
    { id: '1', title: 'Smart Home Automation', category: 'IoT', icon: 'home' },
    { id: '2', title: 'Laundry Service Platform', category: 'App', icon: 'shirt' },
    { id: '3', title: 'Muslim Community App', category: 'App', icon: 'people' },
    { id: '4', title: 'E‑commerce Dashboard', category: 'Web', icon: 'cart' },
  ];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  const filters = ['All', 'App', 'IoT', 'Web'];

  return (
    <CardWrapper isDark={isDark} style={styles.cardContainer}>
      <SectionTitle title="Portfolio" isDark={isDark} />
      <View style={styles.filterRow}>
        {filters.map(f => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && styles.activeFilter]}>
            <Text style={[styles.filterText, { color: getColors(isDark).subText }, filter === f && styles.activeFilterText]}>{f}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.portfolioGrid}>
        {filtered.map(project => <ProjectCard key={project.id} project={project} isDark={isDark} onPress={() => Alert.alert('Project', project.title)} />)}
      </View>
    </CardWrapper>
  );
};

// ------------------------- App Showcase (Card) -------------------------
const AppShowcase = ({ isDark }) => {
  const colors = getColors(isDark);
  const apps = ['FitTrack', 'Home IoT', 'Laundry', 'Community'];
  return (
    <CardWrapper isDark={isDark} style={styles.cardContainer}>
      <SectionTitle title="App Showcase" isDark={isDark} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.showcaseScroll}
        data={apps}
        renderItem={({ item }) => (
          <View style={[styles.showcaseCard, { backgroundColor: colors.cardBg, shadowColor: colors.cardShadow }]}>
            <Text style={[styles.showcaseTitle, { color: colors.text }]}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, i) => i.toString()}
      />
    </CardWrapper>
  );
};

// ------------------------- Video Demo Section (Card) -------------------------
const VideoDemo = ({ isDark }) => {
  const video = useRef(null);
  const colors = getColors(isDark);
  return (
    <CardWrapper isDark={isDark} style={styles.cardContainer}>
      <SectionTitle title="Project Demo" isDark={isDark} />
      <View style={[styles.videoWrapper, { backgroundColor: colors.cardBg, shadowColor: colors.cardShadow }]}>
        <Video
          ref={video}
          source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      </View>
    </CardWrapper>
  );
};

// ------------------------- Testimonials (Card) -------------------------
const Testimonials = ({ isDark }) => {
  const testimonials = [
    { id: '1', name: 'Amit Sharma', role: 'CEO, TechStart', feedback: 'Ubaid delivered an outstanding app. Very professional and creative!' },
    { id: '2', name: 'Priya Mehta', role: 'Product Manager', feedback: 'Great communication, on time, and pixel-perfect designs.' },
  ];
  return (
    <CardWrapper isDark={isDark} style={styles.cardContainer}>
      <SectionTitle title="Client Feedback" isDark={isDark} />
      <View style={styles.testimonialGrid}>
        {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} isDark={isDark} />)}
      </View>
    </CardWrapper>
  );
};

// ------------------------- Contact Section (Card - Fixed UI) -------------------------
const ContactSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const handleSend = () => { Alert.alert('Message Sent', 'Thank you! I will get back soon.'); setForm({ name: '', email: '', subject: '', message: '' }); };
  const contactInfo = [
    { icon: 'mail', label: 'Email', value: 'hello@ubaid.dev' },
    { icon: 'call', label: 'Phone', value: '+91 98765 43210' },
    { icon: 'location', label: 'Location', value: 'New Delhi, India' },
  ];
  return (
    <CardWrapper isDark={isDark} style={styles.cardContainer}>
      <SectionTitle title="Let's Connect" isDark={isDark} />
      <View style={styles.contactGrid}>
        <View style={styles.contactLeft}>
          {contactInfo.map((item, i) => (
            <View key={i} style={styles.contactInfoItem}>
              <Ionicons name={item.icon} size={24} color={colors.accent} />
              <View>
                <Text style={[styles.contactInfoLabel, { color: colors.subText }]}>{item.label}</Text>
                <Text style={[styles.contactInfoValue, { color: colors.text }]}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.contactRight}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]}
            placeholder="Your Name" placeholderTextColor={colors.subText}
            value={form.name} onChangeText={t => setForm({ ...form, name: t })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]}
            placeholder="Email Address" placeholderTextColor={colors.subText}
            keyboardType="email-address" value={form.email} onChangeText={t => setForm({ ...form, email: t })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]}
            placeholder="Subject" placeholderTextColor={colors.subText}
            value={form.subject} onChangeText={t => setForm({ ...form, subject: t })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }]}
            placeholder="Message" placeholderTextColor={colors.subText}
            multiline numberOfLines={4} value={form.message} onChangeText={t => setForm({ ...form, message: t })}
          />
          <Pressable onPress={handleSend} style={styles.sendBtn}>
            <LinearGradient colors={[colors.accent, '#222']} style={styles.gradientBtn}>
              <Text style={styles.sendText}>Send Message</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </CardWrapper>
  );
};

// ------------------------- Footer -------------------------
const Footer = ({ isDark }) => {
  const colors = getColors(isDark);
  return (
    <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.cardBg }]}>
      <View style={styles.footerColumns}>
        <View>
          <Text style={[styles.footerTitle, { color: colors.text }]}>Ubaid.</Text>
          <Text style={[styles.footerText, { color: colors.subText }]}>Mobile App Developer</Text>
        </View>
        <View>
          <Text style={[styles.footerTitle, { color: colors.text }]}>Links</Text>
          <Text style={[styles.footerText, { color: colors.subText }]}>About</Text>
          <Text style={[styles.footerText, { color: colors.subText }]}>Portfolio</Text>
          <Text style={[styles.footerText, { color: colors.subText }]}>Contact</Text>
        </View>
        <View>
          <Text style={[styles.footerTitle, { color: colors.text }]}>Resources</Text>
          <Text style={[styles.footerText, { color: colors.subText }]}>Blog</Text>
          <Text style={[styles.footerText, { color: colors.subText }]}>GitHub</Text>
        </View>
        <View>
          <Text style={[styles.footerTitle, { color: colors.text }]}>Social</Text>
          <View style={styles.socialIcons}>
            <Ionicons name="logo-github" size={20} color={colors.text} />
            <Ionicons name="logo-linkedin" size={20} color={colors.text} />
            <Ionicons name="logo-twitter" size={20} color={colors.text} />
          </View>
        </View>
      </View>
      <Text style={[styles.copyright, { color: colors.subText }]}>© 2026 Ubaid Shekh — Built with ❤️ using web & mobile</Text>
    </View>
  );
};

// ------------------------- Main App -------------------------
export default function App() {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');
  const toggleTheme = () => setIsDark(prev => !prev);
  const colors = getColors(isDark);

  const sectionRefs = {
    home: useRef(null), about: useRef(null), services: useRef(null), portfolio: useRef(null), contact: useRef(null)
  };
  const scrollToSection = (section) => {
    if (isWeb && sectionRefs[section]?.current) {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Header isDark={isDark} toggleTheme={toggleTheme} scrollToSection={scrollToSection} />
      <ScrollView style={[styles.main, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        <View ref={sectionRefs.home}><HeroSection isDark={isDark} /></View>
        <View ref={sectionRefs.about}><AboutSection isDark={isDark} /></View>
        <View ref={sectionRefs.services}><ServicesSection isDark={isDark} /></View>
        <SkillsSection isDark={isDark} />
        <View ref={sectionRefs.portfolio}><PortfolioSection isDark={isDark} /></View>
        <AppShowcase isDark={isDark} />
        <VideoDemo isDark={isDark} />
        <Testimonials isDark={isDark} />
        <View ref={sectionRefs.contact}><ContactSection isDark={isDark} /></View>
        <Footer isDark={isDark} />
      </ScrollView>
    </>
  );
}

// ------------------------- Styles (Card-based layout) -------------------------
const styles = StyleSheet.create({
  main: { flex: 1 },
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
  logo: { fontSize: 26, fontWeight: '700', letterSpacing: -0.5 },
  navLinks: { flexDirection: 'row', gap: 40 },
  navLink: { fontSize: 15, fontWeight: '500', letterSpacing: 0.3 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  hireMeBtn: { borderRadius: 40, overflow: 'hidden' },
  hireBtnGrad: { paddingHorizontal: 22, paddingVertical: 11 },
  hireBtnText: { color: 'white', fontWeight: '600', fontSize: 14 },
  themeToggle: { padding: 8 },
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
  // Hero
  heroContainer: {
    flexDirection: isWeb ? 'row' : 'column',
    padding: isWeb ? 64 : 32,
    gap: 48,
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
  },
  heroLeft: { flex: 1, gap: 24 },
  heroRight: { flex: 1, alignItems: 'center' },
  heroIntro: { fontSize: 14, letterSpacing: 3, fontWeight: '600' },
  heroTitle: { fontSize: 52, fontWeight: '700', lineHeight: 62, letterSpacing: -1 },
  gradientText: { backgroundImage: 'linear-gradient(135deg, #4a4a4a, #8a8a8a)', WebkitBackgroundClip: 'text', color: 'transparent' },
  heroDesc: { fontSize: 17, lineHeight: 28, opacity: 0.85 },
  heroButtons: { flexDirection: 'row', gap: 24, marginTop: 8 },
  downloadBtn: { borderRadius: 50, overflow: 'hidden' },
  gradientBtn: { paddingHorizontal: 36, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '600', fontSize: 16 },
  hireOutlineBtn: { borderWidth: 1.5, borderRadius: 50, paddingHorizontal: 36, paddingVertical: 15 },
  outlineText: { fontWeight: '600', fontSize: 16 },
  profileWrapper: { width: 280, height: 280, position: 'relative' },
  profileBorder: { width: '100%', height: '100%', borderRadius: 140, borderWidth: 2, padding: 5 },
  profileImage: { width: '100%', height: '100%', borderRadius: 140 },
  floatingShape: { position: 'absolute', width: 80, height: 80, borderRadius: 40 },
  shape1: { top: -30, right: -30 },
  shape2: { bottom: -30, left: -30 },
  shape3: { top: '30%', left: -20, width: 50, height: 50 },
  // About (inside card)
  aboutGrid: { flexDirection: isWeb ? 'row' : 'column', gap: 48 },
  aboutLeft: { flex: 1, alignItems: 'center' },
  aboutImage: { width: 220, height: 220, borderRadius: 28, borderWidth: 1 },
  aboutRight: { flex: 1 },
  aboutText: { fontSize: 17, lineHeight: 28, marginVertical: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 36, fontWeight: '700' },
  statLabel: { fontSize: 14, marginTop: 8 },
  // Services
  servicesGrid: { flexDirection: isWeb ? 'row' : 'column', flexWrap: 'wrap', justifyContent: 'center', gap: 32 },
  serviceCardInner: { width: 260, borderRadius: 28, padding: 28, alignItems: 'center', gap: 18, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  cardHover: { transform: [{ scale: 1.02 }], shadowOpacity: 0.12 },
  serviceIcon: { padding: 16, borderRadius: 60 },
  serviceTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  serviceDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  // Skills
  tagsWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  tag: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 50 },
  tagText: { fontSize: 14, fontWeight: '500' },
  // Portfolio
  filterRow: { flexDirection: 'row', gap: 16, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' },
  filterBtn: { paddingHorizontal: 20, paddingVertical: 9, borderRadius: 40 },
  activeFilter: { backgroundColor: '#eaeaea' },
  filterText: { fontSize: 14, fontWeight: '600' },
  activeFilterText: { color: '#111' },
  portfolioGrid: { flexDirection: isWeb ? 'row' : 'column', flexWrap: 'wrap', justifyContent: 'center', gap: 32 },
  projectCardInner: { width: 300, borderRadius: 28, overflow: 'hidden', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  projectCardHover: { transform: [{ scale: 1.02 }] },
  projectImagePlaceholder: { height: 180, justifyContent: 'center', alignItems: 'center' },
  projectContent: { padding: 24, gap: 8 },
  projectTitle: { fontSize: 22, fontWeight: '700' },
  projectCategory: { fontSize: 14 },
  viewBtn: { fontSize: 14, fontWeight: '600', marginTop: 12 },
  // Showcase
  showcaseScroll: { paddingHorizontal: 8, gap: 24 },
  showcaseCard: { width: 200, height: 260, borderRadius: 28, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  showcaseTitle: { fontSize: 22, fontWeight: '600' },
  // Video
  videoWrapper: { width: '100%', borderRadius: 28, overflow: 'hidden', padding: 8, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 6 },
  video: { width: '100%', height: 360, borderRadius: 24 },
  // Testimonials
  testimonialGrid: { flexDirection: isWeb ? 'row' : 'column', gap: 32, justifyContent: 'center' },
  testimonialCardInner: { width: 300, borderRadius: 28, padding: 28, alignItems: 'center', gap: 16, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  testimonialAvatar: { marginBottom: 4 },
  testimonialText: { fontSize: 15, textAlign: 'center', lineHeight: 24, fontStyle: 'italic' },
  testimonialName: { fontSize: 18, fontWeight: '700' },
  testimonialRole: { fontSize: 13 },
  // Contact (fixed)
  contactGrid: { flexDirection: isWeb ? 'row' : 'column', gap: 48 },
  contactLeft: { flex: 1, gap: 28 },
  contactRight: { flex: 1, gap: 20 },
  contactInfoItem: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  contactInfoLabel: { fontSize: 13, marginBottom: 3 },
  contactInfoValue: { fontSize: 17, fontWeight: '500' },
  input: { borderRadius: 16, padding: 18, fontSize: 16, borderWidth: 1 },
  textArea: { height: 140, textAlignVertical: 'top' },
  sendBtn: { borderRadius: 50, overflow: 'hidden' },
  sendText: { color: 'white', fontWeight: '600', fontSize: 16, paddingHorizontal: 28, paddingVertical: 16 },
  // Footer
  footer: { paddingVertical: 56, paddingHorizontal: 32, marginTop: 64, borderTopWidth: 1 },
  footerColumns: { flexDirection: isWeb ? 'row' : 'column', justifyContent: 'space-between', gap: 48, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  footerTitle: { fontSize: 20, fontWeight: '700', marginBottom: 18 },
  footerText: { fontSize: 15, marginBottom: 10, opacity: 0.8 },
  socialIcons: { flexDirection: 'row', gap: 24, marginTop: 16 },
  copyright: { textAlign: 'center', marginTop: 56, fontSize: 14 },
  sectionHeader: { alignItems: 'center', marginBottom: 40 },
  sectionTitle: { fontSize: 42, fontWeight: '700', letterSpacing: -0.5, marginBottom: 12 },
  sectionUnderline: { width: 60, height: 3, borderRadius: 3 },
});