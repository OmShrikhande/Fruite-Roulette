import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withSequence,
  Easing,
  interpolate,
  withRepeat
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface SpinningWheelProps {
  isSpinning: boolean;
  result?: number;
  onSpinComplete?: () => void;
  timer?: number;
  bets?: { [key: string]: number };
}

// Exact fruit sequence and multipliers matching the description
const WHEEL_SEGMENTS = [
  { fruit: '🍒', multiplier: 38, name: 'Cherry', betAmount: '70,000' },
  { fruit: '🍓', multiplier: 28, name: 'Strawberry', betAmount: '41,780' },
  { fruit: '🍋', multiplier: 18, name: 'Lemon', betAmount: '155,000' },
  { fruit: '🍊', multiplier: 10, name: 'Orange', betAmount: '89,500' },
  { fruit: '🍉', multiplier: 5, name: 'Watermelon', betAmount: '203,400' },
  { fruit: '🍌', multiplier: 15, name: 'Banana', betAmount: '67,890' },
  { fruit: '🍇', multiplier: 12, name: 'Grape', betAmount: '134,200' },
  { fruit: '🍎', multiplier: 25, name: 'Apple', betAmount: '98,750' },
];

// Exact chip stack with specified colors and values
const CHIP_STACK = [
  { value: '10', color: '#C0C0C0', borderColor: '#000' }, // Gray
  { value: '100', color: '#FF8C00', borderColor: '#FFF' }, // Orange
  { value: '1K', color: '#4169E1', borderColor: '#FFF' }, // Blue glowing
  { value: '5K', color: '#32CD32', borderColor: '#FFF' }, // Green
  { value: '50K', color: '#DC143C', borderColor: '#FFF' }, // Red
];

export const SpinningWheel: React.FC<SpinningWheelProps> = ({
  isSpinning,
  result,
  onSpinComplete,
  timer,
  bets,
}) => {

  // Calculate positions for outer fruit icons around oval border
  const getOuterFruitPosition = (index: number) => {
    const angle = (index * 45 - 90) * (Math.PI / 180); // 8 segments = 45 degrees each
    const radiusX = width * 0.35; // Oval shape - wider horizontally
    const radiusY = width * 0.25; // Oval shape - narrower vertically
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    return { x, y };
  };

  // Calculate positions for 8 rectangular betting zones in 2 rows of 4
  const getSlotPosition = (index: number) => {
    const row = Math.floor(index / 4); // 0 or 1
    const col = index % 4; // 0, 1, 2, or 3
    const x = (col - 1.5) * (width * 0.12); // Spread across width
    const y = (row - 0.5) * (width * 0.08); // Two rows
    return { x, y };
  };

  return (
    <View style={styles.container}>
      {/* Continuous oval border with evenly spaced fruit icons */}
      <View style={styles.outerTrack}>
        {WHEEL_SEGMENTS.map((segment, idx) => {
          const position = getOuterFruitPosition(idx);
          return (
            <View 
              key={idx} 
              style={[
                styles.fruitIconWrapper,
                {
                  left: width * 0.5 + position.x - 15,
                  top: height * 0.35 + position.y - 15,
                }
              ]}
            >
              <Text style={styles.fruitIcon}>{segment.fruit}</Text>
            </View>
          );
        })}
      </View>

      {/* Oval-shaped beige betting track with sand-like texture, centered on screen */}
      <View style={styles.bettingTrack}>
        {/* 8 rectangular betting zones arranged in 2 rows of 4 */}
        {WHEEL_SEGMENTS.map((segment, idx) => {
          const position = getSlotPosition(idx);
          return (
            <View 
              key={idx} 
              style={[
                styles.bettingZone,
                {
                  left: width * 0.5 + position.x - 45,
                  top: height * 0.35 + position.y - 35,
                }
              ]}
            >
              {/* Large number in bold gradient orange/yellow text */}
              <LinearGradient colors={['#FFA500', '#FFD700']} style={styles.betAmountGradient}>
                <Text style={styles.betAmount}>{segment.betAmount}</Text>
              </LinearGradient>

              {/* Multiple stacked poker chips in different colors */}
              <View style={styles.chipStack}>
                {CHIP_STACK.map((chip, chipIdx) => (
                  <View 
                    key={chipIdx} 
                    style={[
                      styles.chip, 
                      { 
                        backgroundColor: chip.color,
                        borderColor: chip.borderColor,
                        shadowColor: chip.value === '1K' ? '#4169E1' : '#000',
                        shadowOpacity: chip.value === '1K' ? 0.8 : 0.3,
                        shadowRadius: chip.value === '1K' ? 6 : 2,
                      }
                    ]}
                  >
                    <Text style={[
                      styles.chipText,
                      chip.value === '10' && { color: '#000' },
                      chip.value === '1K' && styles.glowingChipText
                    ]}>
                      {chip.value}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Multiplier value below chips in yellow text with X prefix */}
              <Text style={styles.multiplierText}>X{segment.multiplier}</Text>
            </View>
          );
        })}
      </View>

      {/* Round Timer - rectangular digital display at top center of oval */}
      <View style={styles.roundTimer}>
        <Text style={styles.timerText}>{timer}</Text>
      </View>

      {/* Result Display */}
      {result !== undefined && !isSpinning && (
        <View style={styles.resultDisplay}>
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.9)', 'rgba(255, 193, 7, 0.9)']}
            style={styles.resultGradient}
          >
            <Text style={styles.resultEmoji}>{WHEEL_SEGMENTS[result].fruit}</Text>
            <Text style={styles.resultMultiplier}>x{WHEEL_SEGMENTS[result].multiplier}</Text>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: width,
    height: height * 0.6,
  },
  outerTrack: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.5,
  },
  fruitIconWrapper: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fruitIcon: {
    fontSize: 24,
  },
  bettingTrack: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.4,
    backgroundColor: '#F5DEB3', // Beige sand-like texture
    borderRadius: width * 0.2,
    borderWidth: 4,
    borderColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    left: width * 0.2,
    top: height * 0.25,
  },
  bettingZone: {
    position: 'absolute',
    width: 90,
    height: 70,
    backgroundColor: 'rgba(245, 222, 179, 0.95)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  betAmountGradient: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginBottom: 2,
  },
  betAmount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: '#FF8C00',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace',
  },
  chipStack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    gap: 1,
  },
  chip: {
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  chipText: {
    fontSize: 6,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  glowingChipText: {
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  multiplierText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 1,
    textAlign: 'center',
    textShadowColor: '#FF8C00',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace',
  },
  roundTimer: {
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.5 - 30,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
    fontFamily: 'monospace',
    textShadowColor: 'rgba(255, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  resultDisplay: {
    position: 'absolute',
    bottom: -60,
    alignItems: 'center',
  },
  resultGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  resultEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  resultMultiplier: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});