
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Platform, Pressable, StyleSheet, View } from 'react-native';
import { getColors } from './Colors';

const isWeb  = Platform.OS === "web"

export const ProjectCard = ({ project, isDark, onPress, isMobile }) => {
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

const styles = StyleSheet.create({
    projectCardInner: { width: isWeb ? 450 : 320, borderRadius: 0, overflow: 'hidden', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
      mobileProjectCard: { width: '100%' },
        projectCardHover: { transform: [{ scale: 1.02 }] },
          projectImage: { height: 280, width: 450, justifyContent: 'flex-end',resizeMode:'contain' },
  mobileProjectImage: { height: 220 },
  projectOverlay: { padding: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  projectContent: { gap: 8 },
});