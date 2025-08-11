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
  timer: number;
  bets: { [key: string]: number };
}

// Exact fruit sequence and multipliers as per reference image
const WHEEL_SEGMENTS = [
  { fruit: '🍇', color: '#8A2BE2', multiplier: 10, name: 'Grape' },
  { fruit: '🍌', color: '#FFD700', multiplier: 5, name: 'Banana' },
  { fruit: '🍎', color: '#DC143C', multiplier: 18, name: 'Apple' },
  { fruit: '🍉', color: '#32CD32', multiplier: 12, name: 'Watermelon' },
  { fruit: '🍊', color: '#FF6347', multiplier: 28, name: 'Orange' },
  { fruit: '🍋', color: '#F1C40F', multiplier: 10, name: 'Lemon' },
  { fruit: '🍓', color: '#FF69B4', multiplier: 15, name: 'Strawberry' },
  { fruit: '🍒', color: '#FF1493', multiplier: 38, name: 'Cherry' },
];

// Chip stack configuration for each slot
const CHIP_STACK = [
  { value: '10', color: '#FFF', borderColor: '#000' },
  { value: '100', color: '#FF8C00', borderColor: '#FFF' },
  { value: '1K', color: '#4169E1', borderColor: '#FFF' },
  { value: '5K', color: '#32CD32', borderColor: '#FFF' },
  { value: '50K', color: '#DC143C', borderColor: '#FFF' },
];

export const SpinningWheel: React.FC<SpinningWheelProps> = ({
  isSpinning,
  result,
  onSpinComplete,
  timer,
  bets,
}) => {
  const rotation = useSharedValue(0);
  const glowAnimation = useSharedValue(0);
  const sectorAngle = 360 / WHEEL_SEGMENTS.length;

  React.useEffect(() => {
    glowAnimation.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  React.useEffect(() => {
    if (isSpinning && result !== undefined) {
      const targetAngle = 360 * 8 + (result * sectorAngle) + (sectorAngle / 2);
      rotation.value = withSequence(
        withTiming(targetAngle, {
          duration: 4000,
          easing: Easing.out(Easing.cubic),
        }),
        withTiming(targetAngle, { duration: 100 }, () => {
          onSpinComplete?.();
        })
      );
    }
  }, [isSpinning, result, rotation, sectorAngle, onSpinComplete]);

  const pointerAnimatedStyle = useAnimatedStyle(() => {
    const glowOpacity = interpolate(glowAnimation.value, [0, 1], [0.3, 1]);
    return {
      opacity: glowOpacity,
    };
  });

  // Calculate positions for outer fruit icons
  const getOuterFruitPosition = (index: number) => {
    const angle = (index * sectorAngle - 90) * (Math.PI / 180);
    const radius = width * 0.32;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Calculate positions for betting slots in oval arrangement
  const getSlotPosition = (index: number) => {
    const angle = (index * sectorAngle - 90) * (Math.PI / 180);
    const radius = width * 0.18;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <View style={styles.container}>
      {/* Outer oval with repeating fruit icons */}
      <View style={styles.outerOval}>
        {WHEEL_SEGMENTS.map((segment, idx) => {
          const position = getOuterFruitPosition(idx);
          return (
            <View 
              key={idx} 
              style={[
                styles.fruitIconWrapper,
                {
                  left: width * 0.4 + position.x - 20,
                  top: width * 0.3 + position.y - 20,
                }
              ]}
            >
              {/* Fruit icon, flat but high-contrast */}
              <Text style={styles.fruitIcon}>{segment.fruit}</Text>
            </View>
          );
        })}
      </View>

      {/* Sandy beige oval betting track with sand-like texture */}
      <View style={styles.sandyOval}>
        {/* 8 rectangular betting zones in 2 rows of 4 */}
        <View style={styles.slotsContainer}>
          {WHEEL_SEGMENTS.map((segment, idx) => {
            const position = getSlotPosition(idx);
            const betAmount = bets[segment.name] || 0;
            return (
              <View 
                key={idx} 
                style={[
                  styles.slotBox,
                  {
                    left: width * 0.34 + position.x - (width * 0.07),
                    top: width * 0.24 + position.y - (width * 0.07),
                  }
                ]}
              >
                {/* Large bet amount in bold gradient orange/yellow text */}
                <LinearGradient colors={["#FFA500", "#FFD700"]} style={styles.betAmountGradient}>
                  <Text style={styles.betAmount}>
                    {betAmount > 0 ? betAmount.toLocaleString() : '70,000'}
                  </Text>
                </LinearGradient>

                {/* Stacked poker chips, high-gloss style */}
                <View style={styles.chipStack}>
                  {CHIP_STACK.map((chip, chipIdx) => (
                    <View 
                      key={chipIdx} 
                      style={[
                        styles.chip, 
                        { 
                          backgroundColor: chip.color,
                          borderColor: chip.borderColor,
                          shadowColor: '#FFF',
                          shadowOpacity: 0.7,
                          shadowRadius: 4,
                          elevation: 4,
                        }
                      ]}
                    >
                      <Text style={styles.chipText}>{chip.value}</Text>
                    </View>
                  ))}
                </View>

                {/* Multiplier value below chips in yellow text with X prefix */}
                <Text style={styles.multiplierText}>X{segment.multiplier}</Text>
              </View>
            );
          })}
        </View>

        {/* Center timer (red segmented digital countdown) */}
        <View style={styles.centerTimer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>
      </View>

      {/* Spinning pointer */}
      <Animated.View style={[styles.pointer, pointerAnimatedStyle]}>
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          style={styles.pointerGradient}
        />
      </Animated.View>

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
    marginVertical: 20,
  },
  outerOval: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#228B22', // Deep green background
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 4,
    borderColor: '#1F5F1F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fruitIconWrapper: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  fruitIcon: {
    fontSize: 20,
  },
  sandyOval: {
    position: 'absolute',
    width: width * 0.68,
    height: width * 0.48,
    borderRadius: width * 0.24,
    backgroundColor: '#F4A460', // Sandy beige
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  slotsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotBox: {
    position: 'absolute',
    width: width * 0.14,
    height: width * 0.14,
    backgroundColor: 'rgba(245, 222, 179, 0.98)', // sandy beige
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    margin: 2,
  },
  betAmountGradient: {
    borderRadius: 6,
    paddingHorizontal: 2,
    paddingVertical: 1,
    marginBottom: 2,
  },
  betAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: '#FF8C00',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
  chipStack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    gap: 2,
  },
  chip: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    marginHorizontal: 1,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 4,
  },
  chipText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace',
  },
  multiplierText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700', // Yellow
    marginTop: 2,
    textAlign: 'center',
    textShadowColor: '#FF8C00',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace',
  },
  centerTimer: {
    position: 'absolute',
    top: -15,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000', // Red digital countdown
    fontFamily: 'monospace',
    textShadowColor: 'rgba(255, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  pointer: {
    position: 'absolute',
    top: width * 0.05,
    width: 0,
    height: 0,
    zIndex: 10,
  },
  pointerGradient: {
    width: 20,
    height: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transform: [{ rotate: '180deg' }],
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
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