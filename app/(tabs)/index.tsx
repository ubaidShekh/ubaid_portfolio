import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// ------------------------- Responsive Helpers -------------------------
const useResponsive = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  return { isMobile, isTablet, width };
};

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
const SectionTitle = ({ title, isDark, isMobile }) => {
  const colors = getColors(isDark);
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.text }, isMobile && styles.mobileSectionTitle]}>{title}</Text>
      <View style={[styles.sectionUnderline, { backgroundColor: colors.accent }]} />
    </View>
  );
};

const CardWrapper = ({ children, isDark, style, isMobile }) => {
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

const ServiceCard = ({ icon, title, desc, isDark, isMobile }) => {
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

const ProjectCard = ({ project, isDark, onPress, isMobile }) => {
  const colors = getColors(isDark);
  return (
    <Pressable style={({ hovered }) => [styles.projectCardInner, { backgroundColor: colors.cardBg }, hovered && styles.projectCardHover, isMobile && styles.mobileProjectCard]} onPress={onPress}>
      <ImageBackground 
        style={[styles.projectImage, isMobile && styles.mobileProjectImage]} 
        source={project.image}
        imageStyle={{ borderRadius: 0 }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.projectOverlay}
        >
          <View style={styles.projectContent}>
      
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const TestimonialCard = ({ testimonial, isDark, isMobile }) => {
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

// ------------------------- Header (Mobile Optimized) -------------------------
const Header = ({ isDark, toggleTheme, scrollToSection }) => {
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();
  const [mobileMenu, setMobileMenu] = useState(false);
  const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  const handleNavPress = (item) => {
    scrollToSection(item.toLowerCase());
    setMobileMenu(false);
  };

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

// ------------------------- Hero Section -------------------------
const HeroSection = ({ isDark }) => {
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
              <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
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
            <Image source={require('../../assets/images/profile.png')} style={styles.profileImageMobile} />
          </View>
        </View>
      )}
    </View>
  );
};

// ------------------------- About Section -------------------------
const AboutSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();
  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <View style={[styles.aboutGrid, isMobile && styles.mobileAboutGrid]}>
        <View style={styles.aboutLeft}>
          <Image source={require('../../assets/images/profile.png')} style={[styles.aboutImage, { borderColor: colors.border }, isMobile && styles.mobileAboutImage]} />
        </View>
        <View style={styles.aboutRight}>
          <SectionTitle title="About Me" isDark={isDark} isMobile={isMobile} />
          <Text style={[styles.aboutText, { color: colors.subText }, isMobile && styles.mobileAboutText]}>
            I'm a passionate mobile developer and UI/UX designer based in New Delhi. 
            I love creating seamless, user-centric apps that solve real problems.
          </Text>
          <View style={[styles.statsRow, isMobile && styles.mobileStatsRow]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }, isMobile && styles.mobileStatValue]}>15+</Text>
              <Text style={[styles.statLabel, { color: colors.subText }, isMobile && styles.mobileStatLabel]}>Projects</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }, isMobile && styles.mobileStatValue]}>3+</Text>
              <Text style={[styles.statLabel, { color: colors.subText }, isMobile && styles.mobileStatLabel]}>Years</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }, isMobile && styles.mobileStatValue]}>10+</Text>
              <Text style={[styles.statLabel, { color: colors.subText }, isMobile && styles.mobileStatLabel]}>Technologies</Text>
            </View>
          </View>
        </View>
      </View>
    </CardWrapper>
  );
};

// ------------------------- Services Section -------------------------
const ServicesSection = ({ isDark }) => {
  const { isMobile } = useResponsive();
  const services = [
    { icon: 'phone-portrait', title: 'Mobile App Dev', desc: 'React Native, Flutter, iOS/Android.' },
    { icon: 'hardware-chip', title: 'IoT Solutions', desc: 'ESP8266, sensors, real-time dashboards.' },
    { icon: 'code-slash', title: 'Web Development', desc: 'React, Node.js, full-stack apps.' },
    { icon: 'brush', title: 'UI/UX Design', desc: 'Figma, prototyping, user-centered design.' },
  ];
  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <SectionTitle title="What I Do" isDark={isDark} isMobile={isMobile} />
      <View style={[styles.servicesGrid, isMobile && styles.mobileServicesGrid]}>
        {services.map((s, i) => <ServiceCard key={i} icon={s.icon} title={s.title} desc={s.desc} isDark={isDark} isMobile={isMobile} />)}
      </View>
    </CardWrapper>
  );
};

// ------------------------- Skills Section -------------------------
const SkillsSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();
  const skills = ['React Native', 'Node.js', 'Firebase', 'MongoDB', 'TypeScript', 'Arduino ESP8266', 'IoT Protocols', 'REST API', 'Git'];
  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <SectionTitle title="Tech Stack" isDark={isDark} isMobile={isMobile} />
      <View style={[styles.tagsWrapper, isMobile && styles.mobileTagsWrapper]}>
        {skills.map((skill, i) => (
          <View key={i} style={[styles.tag, { backgroundColor: colors.tagBg }, isMobile && styles.mobileTag]}>
            <Text style={[styles.tagText, { color: colors.text }, isMobile && styles.mobileTagText]}>{skill}</Text>
          </View>
        ))}
      </View>
    </CardWrapper>
  );
};

// ------------------------- Portfolio Section -------------------------
const PortfolioSection = ({ isDark }) => {
  const { isMobile } = useResponsive();
  const [filter, setFilter] = useState('All');
  const projects = [
  //  { id: '1', title: 'Smart Home Automation', category: 'IoT', image: require('../../assets/images/laundry_portfolio.png') },
    { id: '2', title: 'Laundry Service Platform', category: 'App', image: require('../../assets/images/laundry_portfolio.png') },
    { id: '3', title: 'Muslim Community App', category: 'App', image: require('../../assets/images/ummah_connect.png') },
    { id: '4', title: 'Street Light Monitoring System', category: 'App', image: require('../../assets/images/street_light.png') },
    { id: '5', title: 'Street Light Monitoring System Admin', category: 'Web', image: require('../../assets/images/street_light_admin.jpeg') },
    { id: '5', title: 'Street Light Monitoring System Admin', category: 'App', image: require('../../assets/images/NCC.png') },
     { id: '5', title: 'Street Light Monitoring System Admin', category: 'Web', image: require('../../assets/images/NCC_admin.png') },
  ];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  const filters = ['All', 'App', 'IoT', 'Web'];

  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <SectionTitle title="Portfolio" isDark={isDark} isMobile={isMobile} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={isMobile && styles.mobileFilterScroll}>
        <View style={[styles.filterRow, isMobile && styles.mobileFilterRow]}>
          {filters.map(f => (
            <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && styles.activeFilter, isMobile && styles.mobileFilterBtn]}>
              <Text style={[styles.filterText, { color: getColors(isDark).subText }, filter === f && styles.activeFilterText, isMobile && styles.mobileFilterText]}>{f}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.portfolioGrid, isMobile && styles.mobilePortfolioGrid]}>
        {filtered.map(project => <ProjectCard key={project.id} project={project} isDark={isDark} onPress={() => Alert.alert('Project', project.title)} isMobile={isMobile} />)}
      </View>
    </CardWrapper>
  );
};

// ------------------------- App Showcase -------------------------
const AppShowcase = ({ isDark }) => {
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();
  const apps = ['FitTrack', 'Home IoT', 'Laundry', 'Community'];
  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <SectionTitle title="App Showcase" isDark={isDark} isMobile={isMobile} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.showcaseScroll, isMobile && styles.mobileShowcaseScroll]}
        data={apps}
        renderItem={({ item }) => (
          <View style={[styles.showcaseCard, { backgroundColor: colors.cardBg, shadowColor: colors.cardShadow }, isMobile && styles.mobileShowcaseCard]}>
            <Text style={[styles.showcaseTitle, { color: colors.text }, isMobile && styles.mobileShowcaseTitle]}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, i) => i.toString()}
      />
    </CardWrapper>
  );
};

// ------------------------- Video Demo Section -------------------------
const VideoDemo = ({ isDark }) => {
  const video = useRef(null);
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();
  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <SectionTitle title="Project Demo" isDark={isDark} isMobile={isMobile} />
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
          style={[styles.video, isMobile && styles.mobileVideo]}
        />
      </View>
    </CardWrapper>
  );
};

// ------------------------- Testimonials -------------------------
const Testimonials = ({ isDark }) => {
  const { isMobile } = useResponsive();
  const testimonials = [
    { id: '1', name: 'Amit Sharma', role: 'CEO, TechStart', feedback: 'Ubaid delivered an outstanding app. Very professional and creative!' },
    { id: '2', name: 'Priya Mehta', role: 'Product Manager', feedback: 'Great communication, on time, and pixel-perfect designs.' },
  ];
  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <SectionTitle title="Client Feedback" isDark={isDark} isMobile={isMobile} />
      <View style={[styles.testimonialGrid, isMobile && styles.mobileTestimonialGrid]}>
        {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} isDark={isDark} isMobile={isMobile} />)}
      </View>
    </CardWrapper>
  );
};

// ------------------------- Contact Section -------------------------
const ContactSection = ({ isDark }) => {
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const handleSend = () => { Alert.alert('Message Sent', 'Thank you! I will get back soon.'); setForm({ name: '', email: '', subject: '', message: '' }); };
  const contactInfo = [
    { icon: 'mail', label: 'Email', value: 'ubaidjmi2022@gmail.com' },
    { icon: 'call', label: 'Phone', value: '+91 7303457812' },
    { icon: 'location', label: 'Location', value: 'New Delhi, India' },
  ];
  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <SectionTitle title="Let's Connect" isDark={isDark} isMobile={isMobile} />
      <View style={[styles.contactGrid, isMobile && styles.mobileContactGrid]}>
        <View style={styles.contactLeft}>
          {contactInfo.map((item, i) => (
            <View key={i} style={[styles.contactInfoItem, isMobile && styles.mobileContactInfoItem]}>
              <Ionicons name={item.icon} size={isMobile ? 20 : 24} color={colors.accent} />
              <View>
                <Text style={[styles.contactInfoLabel, { color: colors.subText }, isMobile && styles.mobileContactInfoLabel]}>{item.label}</Text>
                <Text style={[styles.contactInfoValue, { color: colors.text }, isMobile && styles.mobileContactInfoValue]}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.contactRight}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }, isMobile && styles.mobileInput]}
            placeholder="Your Name" placeholderTextColor={colors.subText}
            value={form.name} onChangeText={t => setForm({ ...form, name: t })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }, isMobile && styles.mobileInput]}
            placeholder="Email Address" placeholderTextColor={colors.subText}
            keyboardType="email-address" value={form.email} onChangeText={t => setForm({ ...form, email: t })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }, isMobile && styles.mobileInput]}
            placeholder="Subject" placeholderTextColor={colors.subText}
            value={form.subject} onChangeText={t => setForm({ ...form, subject: t })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }, isMobile && styles.mobileTextArea]}
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
  const { isMobile } = useResponsive();
  return (
    <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.cardBg }, isMobile && styles.mobileFooter]}>
      <View style={[styles.footerColumns, isMobile && styles.mobileFooterColumns]}>
        <View>
          <Text style={[styles.footerTitle, { color: colors.text }, isMobile && styles.mobileFooterTitle]}>Mohammad Ubaid</Text>
          <Text style={[styles.footerText, { color: colors.subText }, isMobile && styles.mobileFooterText]}>Mobile App Developer</Text>
        </View>
        <View>
          <Text style={[styles.footerTitle, { color: colors.text }, isMobile && styles.mobileFooterTitle]}>Links</Text>
          <Text style={[styles.footerText, { color: colors.subText }, isMobile && styles.mobileFooterText]}>About</Text>
          <Text style={[styles.footerText, { color: colors.subText }, isMobile && styles.mobileFooterText]}>Portfolio</Text>
          <Text style={[styles.footerText, { color: colors.subText }, isMobile && styles.mobileFooterText]}>Contact</Text>
        </View>
        <View>
          <Text style={[styles.footerTitle, { color: colors.text }, isMobile && styles.mobileFooterTitle]}>Resources</Text>
          <Text style={[styles.footerText, { color: colors.subText }, isMobile && styles.mobileFooterText]}>Blog</Text>
          <Text style={[styles.footerText, { color: colors.subText }, isMobile && styles.mobileFooterText]}>GitHub</Text>
        </View>
        <View>
          <Text style={[styles.footerTitle, { color: colors.text }, isMobile && styles.mobileFooterTitle]}>Social</Text>
          <View style={styles.socialIcons}>
            <Ionicons name="logo-github" size={isMobile ? 18 : 20} color={colors.text} />
            <Ionicons name="logo-linkedin" size={isMobile ? 18 : 20} color={colors.text} />
            <Ionicons name="logo-twitter" size={isMobile ? 18 : 20} color={colors.text} />
          </View>
        </View>
      </View>
      <Text style={[styles.copyright, { color: colors.subText }, isMobile && styles.mobileCopyright]}>© 2026 Mohammad Ubaid  — Built with ❤️ using web & mobile</Text>
    </View>
  );
};

// ------------------------- Main App -------------------------
export default function App() {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');
  const toggleTheme = () => setIsDark(prev => !prev);
  const colors = getColors(isDark);
  const { isMobile } = useResponsive();

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

// ------------------------- Styles (Enhanced with Mobile Responsive) -------------------------
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
  aboutGrid: { flexDirection: isWeb ? 'row' : 'row', gap: 48 },
  mobileAboutGrid: { flexDirection: 'column', gap: 32 },
  aboutLeft: { flex: 1, alignItems: 'center' },
  aboutImage: { width: 220, height: 220, borderRadius: 28, borderWidth: 1 },
  mobileAboutImage: { width: 160, height: 160, borderRadius: 20 },
  aboutRight: { flex: 1 },
  aboutText: { fontSize: 17, lineHeight: 28, marginVertical: 20 },
  mobileAboutText: { fontSize: 15, lineHeight: 24, marginVertical: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  mobileStatsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 36, fontWeight: '700' },
  mobileStatValue: { fontSize: 28 },
  statLabel: { fontSize: 14, marginTop: 8 },
  mobileStatLabel: { fontSize: 12, marginTop: 4 },
  // Services
  servicesGrid: { flexDirection: isWeb ? 'row' : 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 32 },
  mobileServicesGrid: { flexDirection: 'column', alignItems: 'center', gap: 24 },
  serviceCardInner: { width: 260, borderRadius: 28, padding: 28, alignItems: 'center', gap: 18, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  mobileServiceCard: { width: '100%', padding: 20, gap: 14 },
  cardHover: { transform: [{ scale: 1.02 }], shadowOpacity: 0.12 },
  serviceIcon: { padding: 16, borderRadius: 60 },
  serviceTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  mobileServiceTitle: { fontSize: 18 },
  serviceDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  mobileServiceDesc: { fontSize: 13, lineHeight: 20 },
  // Skills
  tagsWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  mobileTagsWrapper: { gap: 10 },
  tag: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 50 },
  mobileTag: { paddingHorizontal: 16, paddingVertical: 8 },
  tagText: { fontSize: 14, fontWeight: '500' },
  mobileTagText: { fontSize: 12 },
  // Portfolio
  filterRow: { flexDirection: 'row', gap: 16, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' },
  mobileFilterScroll: { flexGrow: 0, marginBottom: 20 },
  mobileFilterRow: { gap: 12, paddingHorizontal: 8 },
  filterBtn: { paddingHorizontal: 20, paddingVertical: 9, borderRadius: 40 },
  mobileFilterBtn: { paddingHorizontal: 16, paddingVertical: 7 },
  activeFilter: { backgroundColor: '#eaeaea' },
  filterText: { fontSize: 14, fontWeight: '600' },
  mobileFilterText: { fontSize: 13 },
  activeFilterText: { color: '#111' },
  portfolioGrid: { flexDirection: isWeb ? 'row' : 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 32 },
  mobilePortfolioGrid: { flexDirection: 'column', alignItems: 'center', gap: 24 },
  projectCardInner: { width: isWeb ? 450 : 320, borderRadius: 0, overflow: 'hidden', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  mobileProjectCard: { width: '100%' },
  projectImage: { height: 280, width: 450, justifyContent: 'flex-end',resizeMode:'contain' },
  mobileProjectImage: { height: 220 },
  projectOverlay: { padding: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  projectContent: { gap: 8 },
  projectTitle: { fontSize: 22, fontWeight: '700' },
  mobileProjectTitle: { fontSize: 18 },
  projectCategory: { fontSize: 14 },
  mobileProjectCategory: { fontSize: 12 },
  viewBtn: { fontSize: 14, fontWeight: '600', marginTop: 12 },
  projectCardHover: { transform: [{ scale: 1.02 }] },
  // Showcase
  showcaseScroll: { paddingHorizontal: 8, gap: 24 },
  mobileShowcaseScroll: { gap: 16 },
  showcaseCard: { width: 200, height: 260, borderRadius: 28, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  mobileShowcaseCard: { width: 160, height: 200 },
  showcaseTitle: { fontSize: 22, fontWeight: '600' },
  mobileShowcaseTitle: { fontSize: 18 },
  // Video
  videoWrapper: { width: '100%', borderRadius: 28, overflow: 'hidden', padding: 8, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 6 },
  video: { width: '100%', height: 360, borderRadius: 24 },
  mobileVideo: { height: 200 },
  // Testimonials
  testimonialGrid: { flexDirection: isWeb ? 'row' : 'row', gap: 32, justifyContent: 'center' },
  mobileTestimonialGrid: { flexDirection: 'column', alignItems: 'center', gap: 24 },
  testimonialCardInner: { width: 300, borderRadius: 28, padding: 28, alignItems: 'center', gap: 16, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  mobileTestimonialCard: { width: '100%', padding: 20, gap: 12 },
  testimonialAvatar: { marginBottom: 4 },
  testimonialText: { fontSize: 15, textAlign: 'center', lineHeight: 24, fontStyle: 'italic' },
  mobileTestimonialText: { fontSize: 14, lineHeight: 20 },
  testimonialName: { fontSize: 18, fontWeight: '700' },
  mobileTestimonialName: { fontSize: 16 },
  testimonialRole: { fontSize: 13 },
  mobileTestimonialRole: { fontSize: 12 },
  // Contact
  contactGrid: { flexDirection: isWeb ? 'row' : 'row', gap: 48 },
  mobileContactGrid: { flexDirection: 'column', gap: 32 },
  contactLeft: { flex: 1, gap: 28 },
  contactRight: { flex: 1, gap: 20 },
  contactInfoItem: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  mobileContactInfoItem: { gap: 14 },
  contactInfoLabel: { fontSize: 13, marginBottom: 3 },
  mobileContactInfoLabel: { fontSize: 12 },
  contactInfoValue: { fontSize: 17, fontWeight: '500' },
  mobileContactInfoValue: { fontSize: 15 },
  input: { borderRadius: 16, padding: 18, fontSize: 16, borderWidth: 1 },
  mobileInput: { padding: 14, fontSize: 14, borderRadius: 12 },
  textArea: { height: 140, textAlignVertical: 'top' },
  mobileTextArea: { height: 120 },
  sendBtn: { borderRadius: 50, overflow: 'hidden' },
  sendText: { color: 'white', fontWeight: '600', fontSize: 16, paddingHorizontal: 28, paddingVertical: 16 },
  // Footer
  footer: { paddingVertical: 56, paddingHorizontal: 32, marginTop: 64, borderTopWidth: 1 },
  mobileFooter: { paddingVertical: 40, paddingHorizontal: 20, marginTop: 32 },
  footerColumns: { flexDirection: isWeb ? 'row' : 'row', justifyContent: 'space-between', gap: 48, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  mobileFooterColumns: { flexDirection: 'column', gap: 32, alignItems: 'center', textAlign: 'center' },
  footerTitle: { fontSize: 20, fontWeight: '700', marginBottom: 18 },
  mobileFooterTitle: { fontSize: 18, marginBottom: 12 },
  footerText: { fontSize: 15, marginBottom: 10, opacity: 0.8 },
  mobileFooterText: { fontSize: 13, marginBottom: 8 },
  socialIcons: { flexDirection: 'row', gap: 24, marginTop: 16 },
  copyright: { textAlign: 'center', marginTop: 56, fontSize: 14 },
  mobileCopyright: { fontSize: 12, marginTop: 32 },
  sectionHeader: { alignItems: 'center', marginBottom: 40 },
  sectionTitle: { fontSize: 42, fontWeight: '700', letterSpacing: -0.5, marginBottom: 12 },
  mobileSectionTitle: { fontSize: 32, marginBottom: 8 },
  sectionUnderline: { width: 60, height: 3, borderRadius: 3 },
});