import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface GameHeaderProps {
  timer: number;
  balance: number;
  gems: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ timer, balance, gems }) => {
  const pulseAnimation = useSharedValue(0);

  React.useEffect(() => {
    pulseAnimation.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const timerAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnimation.value, [0, 1], [1, 1.1]);
    return {
      transform: [{ scale }],
    };
  });

  const getTimerColor = () => {
    if (timer <= 10) return '#FF4757';
    if (timer <= 20) return '#FFA502';
    return '#2ED573';
  };

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)']}
      style={styles.container}
    >
      {/* Left Side - Balance */}
      <View style={styles.leftSection}>
        <View style={styles.balanceChip}>
          <Text style={styles.balanceIcon}>💎</Text>
          <Text style={styles.balanceText}>{gems}</Text>
        </View>
        <View style={[styles.balanceChip, styles.coinsChip]}>
          <Text style={styles.balanceIcon}>🪙</Text>
          <Text style={styles.balanceText}>${balance.toLocaleString()}</Text>
        </View>
      </View>

      {/* Center - Timer */}
      <Animated.View style={[styles.timerContainer, timerAnimatedStyle]}>
        <LinearGradient
          colors={[getTimerColor(), '#FFF']}
          style={styles.timerGradient}
        >
          <Text style={styles.timerText}>{timer}</Text>
        </LinearGradient>
        <Text style={styles.timerLabel}>NEXT SPIN</Text>
      </Animated.View>

      {/* Right Side - Controls */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={[styles.iconButton, styles.emojiButton]}>
          <Text style={styles.iconEmoji}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.trophyButton]}>
          <Text style={styles.iconEmoji}>🏆</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.historyButton]}>
          <Text style={styles.iconEmoji}>⏰</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.soundButton]}>
          <Text style={styles.iconEmoji}>🔊</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
    gap: 6,
  },
  balanceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 144, 226, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 4,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  coinsChip: {
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    shadowColor: '#FFC107',
  },
  balanceIcon: {
    fontSize: 12,
  },
  balanceText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  timerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  timerGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  timerLabel: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rightSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    gap: 4,
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  emojiButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
  },
  trophyButton: {
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
  },
  historyButton: {
    backgroundColor: 'rgba(116, 185, 255, 0.9)',
  },
  soundButton: {
    backgroundColor: 'rgba(46, 213, 115, 0.9)',
  },
  iconEmoji: {
    fontSize: 14,
  },
});