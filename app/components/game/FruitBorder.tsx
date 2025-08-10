import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const BORDER_FRUITS = [
  '🍎', '🍇', '🍒', '🥝', '🍊', '🍓', '🍌', '🍉',
  '🍑', '🥭', '🍍', '🫐', '🍈', '🥥', '🍋', '🍐',
  '🍎', '🍇', '🍒', '🥝', '🍊', '🍓', '🍌', '🍉',
  '🍑', '🥭', '🍍', '🫐', '🍈', '🥥', '🍋', '🍐',
];

interface FruitBorderProps {
  isSpinning: boolean;
}

export const FruitBorder: React.FC<FruitBorderProps> = ({ isSpinning }) => {
  const rotationAnimation = useSharedValue(0);
  const pulseAnimation = useSharedValue(0);

  React.useEffect(() => {
    // Continuous rotation
    rotationAnimation.value = withRepeat(
      withTiming(360, { duration: 30000 }),
      -1,
      false
    );

    // Pulse animation
    pulseAnimation.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotationAnimation.value}deg` }],
    };
  });

  const renderFruit = (fruit: string, index: number) => {
    const totalFruits = BORDER_FRUITS.length;
    const angle = (index * 360) / totalFruits;
    const radius = width * 0.25;

    const fruitAnimatedStyle = useAnimatedStyle(() => {
      const pulse = interpolate(pulseAnimation.value, [0, 1], [0.8, 1.2]);
      const spinPulse = isSpinning ? interpolate(pulseAnimation.value, [0, 1], [1, 1.5]) : 1;
      
      return {
        transform: [
          { rotate: `${angle}deg` },
          { translateX: radius },
          { rotate: `${-angle - rotationAnimation.value}deg` },
          { scale: pulse * spinPulse },
        ],
      };
    });

    return (
      <Animated.View
        key={`${fruit}-${index}`}
        style={[styles.fruitContainer, fruitAnimatedStyle]}
      >
        <View style={[styles.fruitBackground, isSpinning && styles.spinningFruit]}>
          <Text style={styles.fruitEmoji}>{fruit}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.borderContainer, containerAnimatedStyle]}>
        {BORDER_FRUITS.map((fruit, index) => renderFruit(fruit, index))}
      </Animated.View>
      
      {/* Center glow effect */}
      <View style={styles.centerGlow} />
      
      {/* Outer ring decoration */}
      <View style={styles.outerRing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fruitContainer: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fruitBackground: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  spinningFruit: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.6,
  },
  fruitEmoji: {
    fontSize: 14,
  },
  centerGlow: {
    position: 'absolute',
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: width * 0.225,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  outerRing: {
    position: 'absolute',
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: width * 0.275,
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 3,
  },
});