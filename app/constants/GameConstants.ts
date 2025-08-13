// 🎰 CASINO FRUIT SLOTS - High-Stakes Gaming
// 🎰 Welcome to the Casino Floor! 🎰
// Place your bets and spin to win big!

export const FRUITS = [
  { name: 'Lucky Cherry', emoji: '🍒', multiplier: 5, color: '#DC143C', rarity: 'Common', payout: 'Standard' },
  { name: 'Golden Banana', emoji: '🍌', multiplier: 3, color: '#FFD700', rarity: 'Common', payout: 'Low Risk' },
  { name: 'Royal Grape', emoji: '🍇', multiplier: 8, color: '#8B0000', rarity: 'Rare', payout: 'High Stakes' },
  { name: 'Jackpot Melon', emoji: '🍉', multiplier: 12, color: '#228B22', rarity: 'Epic', payout: 'Big Win' },
  { name: 'Casino Orange', emoji: '🍊', multiplier: 6, color: '#FF6347', rarity: 'Uncommon', payout: 'Medium Risk' },
  { name: 'Diamond Apple', emoji: '🍎', multiplier: 4, color: '#B22222', rarity: 'Common', payout: 'Safe Bet' },
  { name: 'Gold Rush Lemon', emoji: '🍋', multiplier: 10, color: '#DAA520', rarity: 'Rare', payout: 'High Roller' },
  { name: 'MEGA Strawberry', emoji: '🍓', multiplier: 15, color: '#FF1493', rarity: 'Legendary', payout: 'JACKPOT!' },
];

// 🎲 CASINO CHIPS - From Penny Slots to High Roller Tables
export const CHIP_VALUES = [
  { value: 10, color: '#FFFFFF', name: 'White Chip', tier: 'Beginner' },
  { value: 100, color: '#DC143C', name: 'Red Chip', tier: 'Regular' },
  { value: 1000, color: '#228B22', name: 'Green Chip', tier: 'Serious' },
  { value: 5000, color: '#000000', name: 'Black Chip', tier: 'High Stakes' },
  { value: 50000, color: '#FFD700', name: 'Gold Chip', tier: 'VIP' },
];

// 🎯 BETTING LIMITS
export const BETTING_LIMITS = {
  MIN_BET: 10,
  MAX_BET: 500000,
  VIP_MIN: 10000,
  HIGH_ROLLER_MIN: 100000,
};

// 🎰 CASINO ATMOSPHERE COLORS
export const COLORS = {
  primary: '#8B0000',           // Casino red
  secondary: '#DAA520',         // Casino gold
  accent: '#FFD700',            // Bright gold
  success: '#228B22',           // Winning green
  danger: '#DC143C',            // High-stakes red
  dark: '#1C1C1C',             // Casino floor
  light: '#F5F5DC',            // Elegant beige
  gold: '#FFD700',             // Premium gold
  background: 'linear-gradient(135deg, #8B0000 0%, #DAA520 50%, #1C1C1C 100%)', // Casino gradient
  tableGreen: '#006400',        // Casino table
  neonGlow: '#FF6347',         // Neon highlights
};

// 🎆 CASINO SOUND EFFECTS
export const CASINO_SOUNDS = {
  CHIP_PLACE: 'chip_place.mp3',
  WHEEL_SPIN: 'wheel_spin.mp3',
  WIN_SMALL: 'win_small.mp3',
  WIN_BIG: 'win_big.mp3',
  JACKPOT: 'jackpot.mp3',
  LOSE: 'lose.mp3',
  AMBIENT: 'casino_ambient.mp3',
};

// 🏆 WIN MESSAGES
export const WIN_MESSAGES = {
  SMALL: ['Nice win!', 'Keep it rolling!', 'Lady Luck smiles!'],
  MEDIUM: ['Great payout!', 'Hot streak!', 'The house is generous!'],
  BIG: ['BIG WIN!', 'Jackpot territory!', 'High roller status!'],
  JACKPOT: ['🎰 MEGA JACKPOT! 🎰', '💰 LIFE CHANGING WIN! 💰', '🏆 CASINO LEGEND! 🏆'],
};