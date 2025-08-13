/**
 * 🎰 CASINO COLORS & THEME
 * Premium gambling atmosphere with authentic casino vibes
 * Colors inspired by Las Vegas casinos and high-stakes gaming
 */

const tintColorLight = '#D4AF37';
const tintColorDark = '#FFD700';

// 🎰 CASINO COLORS - Premium gambling atmosphere
export const COLORS = {
  // Casino Primary Colors
  primary: '#8B0000',        // Deep casino red
  secondary: '#DAA520',      // Casino gold
  accent: '#FFD700',         // Bright gold for highlights
  
  // Gambling Theme Colors
  success: '#228B22',        // Winning green
  danger: '#DC143C',         // High-stakes red
  jackpot: '#FF6347',        // Jackpot orange-red
  
  // Casino Atmosphere
  dark: '#1C1C1C',          // Casino floor black
  light: '#F5F5DC',         // Elegant beige
  gold: '#FFD700',          // Premium gold
  silver: '#C0C0C0',        // Silver chips
  
  // Backgrounds
  background: '#0F0F0F',     // Dark casino background
  cardTable: '#006400',      // Casino table green
  border: '#DAA520',         // Gold borders
  text: '#FFFFFF',          // White text for contrast
  
  // Chip Colors
  chipRed: '#DC143C',
  chipBlue: '#4169E1',
  chipGreen: '#228B22',
  chipBlack: '#000000',
  chipWhite: '#FFFFFF',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,  // For premium casino spacing
};

// 🎲 Casino Theme Constants
export const CASINO_THEME = {
  shadows: {
    gold: '0 4px 20px rgba(255, 215, 0, 0.3)',
    red: '0 4px 20px rgba(220, 20, 60, 0.3)',
    dark: '0 8px 32px rgba(0, 0, 0, 0.6)',
  },
  gradients: {
    casino: 'linear-gradient(135deg, #8B0000 0%, #DAA520 100%)',
    jackpot: 'linear-gradient(45deg, #FFD700 0%, #FF6347 100%)',
    table: 'linear-gradient(180deg, #006400 0%, #228B22 100%)',
  },
};
