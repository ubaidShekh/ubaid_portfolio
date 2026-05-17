export const getColors = (isDark) => ({
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