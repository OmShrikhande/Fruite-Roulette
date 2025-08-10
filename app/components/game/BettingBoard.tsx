import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface BettingBoardProps {
  bets: { [key: string]: number };
  selectedChip: number;
  onPlaceBet: (sectionId: string) => void;
  isSpinning: boolean;
}

// Fruits to be placed around the track border
const TRACK_FRUITS = [
  { id: 'apple', emoji: '🍎', color: '#DC143C', position: 0 },
  { id: 'orange', emoji: '🍊', color: '#FF6347', position: 1 },
  { id: 'banana', emoji: '🍌', color: '#FFD700', position: 2 },
  { id: 'grape', emoji: '🍇', color: '#8A2BE2', position: 3 },
  { id: 'kiwi', emoji: '🥝', color: '#2E8B57', position: 4 },
  { id: 'strawberry', emoji: '🍓', color: '#FF69B4', position: 5 },
  { id: 'cherry', emoji: '🍒', color: '#FF1493', position: 6 },
  { id: 'watermelon', emoji: '🍉', color: '#32CD32', position: 7 },
];

// Center multiplier sections
const MULTIPLIER_SECTIONS = [
  { id: 'mult_10', multiplier: 10, color: '#4ECDC4', angle: 0 },
  { id: 'mult_28', multiplier: 28, color: '#45B7D1', angle: 60 },
  { id: 'mult_36', multiplier: 36, color: '#96CEB4', angle: 120 },
  { id: 'mult_45', multiplier: 45, color: '#FFEAA7', angle: 180 },
  { id: 'mult_65', multiplier: 65, color: '#DDA0DD', angle: 240 },
  { id: 'mult_99', multiplier: 99, color: '#98D8C8', angle: 300 },
];

export const BettingBoard: React.FC<BettingBoardProps> = ({ bets, selectedChip, onPlaceBet, isSpinning }) => {
  const glowAnimation = useSharedValue(0);

  React.useEffect(() => {
    glowAnimation.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  const FruitButton = ({ fruit }: { fruit: typeof TRACK_FRUITS[0] }) => {
    const hasActiveBet = bets[fruit.id] > 0;
    const angle = (fruit.position * 45) - 90; // 8 fruits, 45 degrees apart
    const radius = 85; // Distance from center
    
    // Calculate position
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    const animatedStyle = useAnimatedStyle(() => {
      const glow = hasActiveBet ? glowAnimation.value : 0;
      return {
        shadowOpacity: 0.3 + glow * 0.4,
        transform: [{ scale: hasActiveBet ? 1 + glow * 0.1 : 1 }],
      };
    });

    return (
      <Animated.View
        style={[
          styles.fruitContainer,
          {
            left: x + 85, // Center offset
            top: y + 45,  // Center offset
          },
          animatedStyle,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.fruitButton,
            { backgroundColor: fruit.color },
            hasActiveBet && styles.activeFruit,
          ]}
          onPress={() => !isSpinning && onPlaceBet(fruit.id)}
          disabled={isSpinning}
        >
          <Text style={styles.fruitEmoji}>{fruit.emoji}</Text>
          {hasActiveBet && (
            <View style={styles.betIndicator}>
              <Text style={styles.betIndicatorText}>{bets[fruit.id]}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const MultiplierSection = ({ section }: { section: typeof MULTIPLIER_SECTIONS[0] }) => {
    const hasActiveBet = bets[section.id] > 0;
    
    const animatedStyle = useAnimatedStyle(() => {
      const glow = hasActiveBet ? glowAnimation.value : 0;
      return {
        shadowOpacity: 0.3 + glow * 0.4,
        transform: [{ scale: hasActiveBet ? 1 + glow * 0.05 : 1 }],
      };
    });

    return (
      <Animated.View
        style={[
          styles.multiplierSection,
          {
            transform: [{ rotate: `${section.angle}deg` }],
          },
          animatedStyle,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.multiplierButton,
            { backgroundColor: section.color },
            hasActiveBet && styles.activeMultiplier,
          ]}
          onPress={() => !isSpinning && onPlaceBet(section.id)}
          disabled={isSpinning}
        >
          <LinearGradient
            colors={[`${section.color}CC`, `${section.color}FF`]}
            style={styles.multiplierGradient}
          >
            <Text style={styles.multiplierText}>x{section.multiplier}</Text>
            {hasActiveBet && (
              <View style={styles.betIndicator}>
                <Text style={styles.betIndicatorText}>{bets[section.id]}</Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Olympic Track Shape */}
      <View style={styles.trackContainer}>
        {/* Outer Track Border */}
        <LinearGradient
          colors={['rgba(212, 175, 55, 0.4)', 'rgba(212, 175, 55, 0.2)']}
          style={styles.outerTrack}
        >
          {/* Inner Track */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)']}
            style={styles.innerTrack}
          >
            {/* Center Multiplier Sections */}
            <View style={styles.centerContainer}>
              {MULTIPLIER_SECTIONS.map((section) => (
                <MultiplierSection key={section.id} section={section} />
              ))}
              
              {/* Center Hub */}
              <View style={styles.centerHub}>
                <LinearGradient
                  colors={['#FFD700', '#FFA500']}
                  style={styles.centerHubGradient}
                >
                  <Text style={styles.centerHubText}>🎰</Text>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </LinearGradient>

        {/* Fruits Around Track */}
        {TRACK_FRUITS.map((fruit) => (
          <FruitButton key={fruit.id} fruit={fruit} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  trackContainer: {
    width: 200,
    height: 120,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerTrack: {
    width: 200,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#D4AF37',
    padding: 8,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  innerTrack: {
    flex: 1,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    width: 80,
    height: 80,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  multiplierSection: {
    position: 'absolute',
    width: 35,
    height: 20,
    top: -10,
    left: 22.5,
    transformOrigin: '50% 50px',
  },
  multiplierButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  multiplierGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  multiplierText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  activeMultiplier: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  centerHub: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  centerHubGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerHubText: {
    fontSize: 16,
  },
  fruitContainer: {
    position: 'absolute',
    width: 35,
    height: 35,
  },
  fruitButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
  },
  fruitEmoji: {
    fontSize: 18,
  },
  activeFruit: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  betIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4757',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  betIndicatorText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
});