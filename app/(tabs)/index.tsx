import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from 'react-native';
import { CardWrapper } from '../../components/CardWrapper';
import { getColors } from '../../components/Colors';
import { Header } from '../../components/Header';
import { HeroSection } from '../../components/HeroSection';
import { ProjectCard } from '../../components/ProjectCard';
import { SectionTitle } from '../../components/SectionTitle';
import { ServiceCard } from '../../components/ServiceCard';
import { TestimonialCard } from '../../components/TestimonialCard';
import { useResponsive } from '../../components/useResponsive';


const { width: screenWidth } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

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
// ------------------------- Video Card (Forced fill) -------------------------
const VideoCard = ({ source }) => {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <VideoView
      player={player}
      allowsFullscreen
      style={styles.video}
        // Ensures video fills entire container without gaps
    />
  );
};

// ------------------------- Video Demo (Horizontal Scroll, Equal Size) -------------------------
const VideoDemo = ({ isDark }) => {
  const colors = getColors(isDark);
  const { isMobile, screenWidth } = useResponsive(); // screenWidth from Dimensions

  const data = [
    { id: 1, source: require("../../assets/images/NCC.mp4") },
    { id: 2, source: require("../../assets/images/SLMS.mp4") },
    // Add more videos freely – all will have identical size
  ];

  // Fixed size for every video card
  const cardWidth = isMobile ? screenWidth * 0.85 : 720;
  // Height derived from width using fixed 16:9 aspect ratio
  //const cardHeight = cardWidth * (9 / 16);
  const cardHeight = 1080

  return (
    <CardWrapper isDark={isDark} isMobile={isMobile}>
      <SectionTitle title="Project Demo" isDark={isDark} isMobile={isMobile} />

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalVideoList}
        renderItem={({ item }) => (
          <View
            style={[
              styles.singleVideoContainer,
              { width: cardWidth, height: cardHeight },
            ]}
          >
            <VideoCard source={item.source} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
  const router = useRouter();

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
  
  
  // ========== VIDEO DEMO (Equal Size, Horizontal Scroll) ==========
  horizontalVideoList: {
    paddingHorizontal: 16,
    gap: 24,
    alignItems: 'center',
  },
  singleVideoContainer: {
    backgroundColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    // No aspectRatio here – width and height are set explicitly in the component
  },
  video: {
    width: '100%',
    height: 600,},
 

  // ========== VIDEO DEMO (Fixed) ==========
  videoWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    padding: 16,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  mobileVideoWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: 12,
  },

  mobileVideo: {
    width: '100%',
    height: '100%',
  },

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



  projectTitle: { fontSize: 22, fontWeight: '700' },
  mobileProjectTitle: { fontSize: 18 },
  projectCategory: { fontSize: 14 },
  mobileProjectCategory: { fontSize: 12 },
  viewBtn: { fontSize: 14, fontWeight: '600', marginTop: 12 },

  // Showcase
  showcaseScroll: { paddingHorizontal: 8, gap: 24 },
  mobileShowcaseScroll: { gap: 16 },
  showcaseCard: { width: 200, height: 260, borderRadius: 28, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  mobileShowcaseCard: { width: 160, height: 200 },
  showcaseTitle: { fontSize: 22, fontWeight: '600' },
  mobileShowcaseTitle: { fontSize: 18 },
  // Video
  videoWrapper: { height: '100%',  overflow: 'hidden', padding: 8, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 6 },
  video: { height: '40%', width:'40%',  },
  mobileVideo: { height: 200 },
  // Testimonials
  testimonialGrid: { flexDirection: isWeb ? 'row' : 'row', gap: 32, justifyContent: 'center' },
  mobileTestimonialGrid: { flexDirection: 'column', alignItems: 'center', gap: 24 },

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
 

  videoWrapper: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 20,
  flex:1,
},

singleVideoContainer: {
  width: '60%',
  height:'60%',
  
},
});