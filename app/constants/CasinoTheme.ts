// 🎰 CASINO THEME CONFIGURATION
// Premium gambling experience with authentic casino vibes

export const CASINO_CONFIG = {
  // 🎲 Game Atmosphere
  atmosphere: {
    name: "Las Vegas Premium",
    mood: "High Stakes Gambling",
    lighting: "Neon & Gold",
    ambiance: "Luxury Casino Floor"
  },

  // 💎 VIP Tiers
  vipTiers: [
    { name: "Rookie", minBet: 10, maxBet: 1000, perks: ["Basic rewards"] },
    { name: "Regular", minBet: 100, maxBet: 10000, perks: ["Bonus spins", "2x rewards"] },
    { name: "High Roller", minBet: 1000, maxBet: 100000, perks: ["VIP lounge", "3x rewards", "Personal dealer"] },
    { name: "Whale", minBet: 10000, maxBet: 1000000, perks: ["Private suite", "5x rewards", "Concierge service"] }
  ],

  // 🎯 Betting Strategies
  strategies: {
    conservative: { risk: "Low", description: "Steady wins, minimal losses" },
    balanced: { risk: "Medium", description: "Balanced risk-reward ratio" },
    aggressive: { risk: "High", description: "Go big or go home!" },
    martingale: { risk: "Extreme", description: "Double down on losses" }
  },

  // 🏆 Achievement System
  achievements: [
    { name: "First Spin", description: "Welcome to the casino!", reward: 100 },
    { name: "Lucky Streak", description: "Win 5 times in a row", reward: 1000 },
    { name: "High Roller", description: "Bet over $10,000", reward: 5000 },
    { name: "Jackpot King", description: "Hit the mega jackpot", reward: 50000 },
    { name: "Casino Legend", description: "Win over $1,000,000", reward: 100000 }
  ],

  // 🎪 Special Events
  events: {
    happyHour: { multiplier: 1.5, description: "50% bonus on all wins!" },
    doubleDown: { multiplier: 2.0, description: "Double your money!" },
    goldenHour: { multiplier: 3.0, description: "Triple gold rush!" },
    megaJackpot: { multiplier: 10.0, description: "10x MEGA JACKPOT EVENT!" }
  }
};

// 🎨 Visual Effects
export const CASINO_EFFECTS = {
  animations: {
    chipToss: "bounce-in",
    wheelSpin: "rotate-360",
    winCelebration: "pulse-gold",
    jackpotExplosion: "fireworks"
  },
  
  particles: {
    goldCoins: { count: 50, color: "#FFD700" },
    confetti: { count: 100, colors: ["#FFD700", "#DC143C", "#228B22"] },
    sparkles: { count: 30, color: "#FFFFFF" }
  }
};

// 🔊 Casino Ambiance
export const CASINO_AMBIANCE = {
  backgroundMusic: "casino_jazz.mp3",
  crowdNoise: "casino_crowd.mp3",
  slotMachines: "slots_ambient.mp3",
  cardShuffle: "cards_shuffle.mp3"
};