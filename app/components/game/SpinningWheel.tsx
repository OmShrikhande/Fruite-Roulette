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

const { width } = Dimensions.get('window');

interface SpinningWheelProps {
  isSpinning: boolean;
  result?: number;
  onSpinComplete?: () => void;
}

const WHEEL_SEGMENTS = [
  { fruit: '🍎', color: '#DC143C', multiplier: 18 },
  { fruit: '🍇', color: '#8A2BE2', multiplier: 10 },
  { fruit: '🍒', color: '#FF1493', multiplier: 25 },
  { fruit: '🥝', color: '#2E8B57', multiplier: 38 },
  { fruit: '🍊', color: '#FF6347', multiplier: 28 },
  { fruit: '🍓', color: '#FF69B4', multiplier: 15 },
  { fruit: '🍌', color: '#FFD700', multiplier: 5 },
  { fruit: '🍉', color: '#32CD32', multiplier: 12 },
];

export const SpinningWheel: React.FC<SpinningWheelProps> = ({
  isSpinning,
  result,
  onSpinComplete,
}) => {
  const rotation = useSharedValue(0);
  const glowAnimation = useSharedValue(0);
  const WHEEL_SIZE = Math.min(width * 0.35, 200);
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
  }, [isSpinning, result]);

  const wheelAnimatedStyle = useAnimatedStyle(() => {
    const glow = interpolate(glowAnimation.value, [0, 1], [0.3, 0.8]);
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
      shadowOpacity: isSpinning ? glow : 0.3,
    };
  });

  const pointerAnimatedStyle = useAnimatedStyle(() => {
    const bounce = isSpinning ? interpolate(glowAnimation.value, [0, 1], [1, 1.2]) : 1;
    return {
      transform: [{ scale: bounce }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Outer Glow Ring */}
      <View style={[styles.glowRing, isSpinning && styles.spinningGlow]} />
      
      {/* Main Wheel */}
      <Animated.View style={[styles.wheel, wheelAnimatedStyle]}>
        <LinearGradient
          colors={['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.1)']}
          style={styles.wheelBackground}
        >
          {WHEEL_SEGMENTS.map((segment, index) => {
            const angle = (index * sectorAngle) - 90;
            return (
              <View
                key={index}
                style={[
                  styles.sector,
                  {
                    transform: [{ rotate: `${angle}deg` }],
                    backgroundColor: segment.color,
                  },
                ]}
              >
                <LinearGradient
                  colors={[`${segment.color}CC`, `${segment.color}FF`]}
                  style={styles.sectorGradient}
                >
                  <View style={styles.sectorContent}>
                    <Text style={styles.fruitEmoji}>{segment.fruit}</Text>
                    <Text style={styles.multiplier}>x{segment.multiplier}</Text>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
          
          {/* Center Hub */}
          <View style={styles.centerHub}>
            <LinearGradient
              colors={['#D4AF37', '#FFD700']}
              style={styles.centerHubGradient}
            >
              <Text style={styles.centerText}>🎰</Text>
            </LinearGradient>
          </View>
        </LinearGradient>
      </Animated.View>
      
      {/* Pointer */}
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
  glowRing: {
    position: 'absolute',
    width: Math.min(width * 0.4, 220),
    height: Math.min(width * 0.4, 220),
    borderRadius: Math.min(width * 0.2, 110),
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  spinningGlow: {
    borderColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  wheel: {
    width: Math.min(width * 0.35, 200),
    height: Math.min(width * 0.35, 200),
    borderRadius: Math.min(width * 0.175, 100),
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  wheelBackground: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.2,
    overflow: 'hidden',
  },
  sector: {
    position: 'absolute',
    width: width * 0.2,
    height: width * 0.2,
    top: width * 0.1,
    left: width * 0.2,
    transformOrigin: '0 50%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  sectorGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  sectorContent: {
    alignItems: 'center',
  },
  fruitEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  multiplier: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  centerHub: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    marginTop: -25,
    marginLeft: -25,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  centerHubGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 20,
  },
  pointer: {
    position: 'absolute',
    top: -15,
    width: 0,
    height: 0,
    zIndex: 10,
  },
  pointerGradient: {
    width: 30,
    height: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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