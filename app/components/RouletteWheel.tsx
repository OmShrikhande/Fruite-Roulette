import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { FRUITS } from '../constants/GameConstants';

interface RouletteWheelProps {
  isSpinning: boolean;
  result?: number;
  onSpinComplete?: () => void;
}

const { width, height } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.5, height * 0.25);

export const RouletteWheel: React.FC<RouletteWheelProps> = ({
  isSpinning,
  result,
  onSpinComplete,
}) => {
  const rotation = useSharedValue(0);
  const sectorAngle = 360 / FRUITS.length;

  useEffect(() => {
    if (isSpinning && result !== undefined) {
      const targetAngle = 360 * 5 + (result * sectorAngle);
      rotation.value = withSequence(
        withTiming(targetAngle, {
          duration: 3000,
          easing: Easing.out(Easing.cubic),
        }),
        withTiming(targetAngle, { duration: 100 }, () => {
          onSpinComplete?.();
        })
      );
    }
  }, [isSpinning, result]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wheel, animatedStyle]}>
        {FRUITS.map((fruit, index) => {
          const angle = (index * sectorAngle) - 90;
          return (
            <View
              key={fruit.name}
              style={[
                styles.sector,
                {
                  transform: [
                    { rotate: `${angle}deg` },
                  ],
                  backgroundColor: fruit.color,
                },
              ]}
            >
              <View style={styles.fruitContainer}>
                <Text style={styles.fruitEmoji}>{fruit.emoji}</Text>
                <Text style={styles.multiplier}>x{fruit.multiplier}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
      <View style={styles.pointer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    position: 'relative',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  sector: {
    position: 'absolute',
    width: WHEEL_SIZE / 2,
    height: WHEEL_SIZE / 2,
    top: WHEEL_SIZE / 4,
    left: WHEEL_SIZE / 2,
    transformOrigin: '0 50%',
    borderTopWidth: 2,
    borderTopColor: '#FFF',
  },
  fruitContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
    alignItems: 'center',
  },
  fruitEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  multiplier: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pointer: {
    position: 'absolute',
    top: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F39C12',
    zIndex: 10,
  },
});