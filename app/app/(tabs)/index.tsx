import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming,
  interpolate,
  withSpring,
  withSequence
} from 'react-native-reanimated';
import { GameButton } from '../../components/GameButton';
import { FruitRouletteGame } from '../../components/FruitRouletteGame';

const { width, height } = Dimensions.get('window');

const FLOATING_FRUITS = ['🍎', '🍇', '🍒', '🥝', '🍊', '🍓', '🍌', '🍉', '🍑', '🥭'];

export default function HomeScreen() {
  const [showGame, setShowGame] = useState(false);
  const floatingAnimation = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const gameSlideAnimation = useSharedValue(0);

  useEffect(() => {
    // Floating animation for background fruits
    floatingAnimation.value = withRepeat(
      withTiming(1, { duration: 8000 }),
      -1,
      false
    );
  }, []);

  useEffect(() => {
    // Game slide animation
    if (showGame) {
      gameSlideAnimation.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
      });
    } else {
      gameSlideAnimation.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
      });
    }
  }, [showGame]);

  const handleStartGame = () => {
    buttonScale.value = withSequence(
      withSpring(0.9),
      withSpring(1)
    );
    setShowGame(true);
  };

  const handleStopGame = () => {
    buttonScale.value = withSequence(
      withSpring(0.9),
      withSpring(1)
    );
    setShowGame(false);
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const gameAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      gameSlideAnimation.value,
      [0, 1],
      [height * 0.5, 0]
    );
    const opacity = interpolate(
      gameSlideAnimation.value,
      [0, 0.3, 1],
      [0, 0.5, 1]
    );
    
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const renderFloatingFruit = (fruit: string, index: number) => {
    const animatedStyle = useAnimatedStyle(() => {
      const progress = (floatingAnimation.value + index * 0.1) % 1;
      const translateY = interpolate(progress, [0, 1], [0, -50]);
      const translateX = interpolate(progress, [0, 0.5, 1], [0, 30, 0]);
      const rotate = interpolate(progress, [0, 1], [0, 360]);
      const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0.3, 0.8, 0.8, 0.3]);
      
      return {
        transform: [
          { translateY },
          { translateX },
          { rotate: `${rotate}deg` },
        ],
        opacity,
      };
    });

    const randomPosition = {
      top: `${10 + (index * 8) % 60}%`,
      left: `${5 + (index * 12) % 80}%`,
    };

    return (
      <Animated.View
        key={`${fruit}-${index}`}
        style={[styles.floatingFruit, randomPosition, animatedStyle]}
      >
        <Text style={styles.floatingFruitEmoji}>{fruit}</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0a1a2e', '#16213e', '#1a2a4a', '#2e4a6b']}
        style={styles.background}
      >
        {/* Floating Background Fruits */}
        <View style={styles.floatingFruitsContainer}>
          {FLOATING_FRUITS.map((fruit, index) => renderFloatingFruit(fruit, index))}
        </View>

        {/* Upper 50% - Control Area */}
        <View style={styles.upperSection}>
          <View style={styles.titleContainer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.titleGradient}
            >
              <Text style={styles.titleText}>🍎 FRUIT ROULETTE 🎰</Text>
            </LinearGradient>
            <Text style={styles.subtitleText}>
              Place your bets and spin to win big!
            </Text>
          </View>
          
          <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
            {!showGame ? (
              <GameButton
                title="🎰 START GAME"
                onPress={handleStartGame}
                variant="success"
                size="large"
              />
            ) : (
              <GameButton
                title="⏹️ STOP GAME"
                onPress={handleStopGame}
                variant="danger"
                size="large"
              />
            )}
          </Animated.View>
        </View>

        {/* Lower 50% - Game Area */}
        <Animated.View style={[styles.lowerSection, gameAnimatedStyle]}>
          {showGame && <FruitRouletteGame />}
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  floatingFruitsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  floatingFruit: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingFruitEmoji: {
    fontSize: 30,
    opacity: 0.6,
  },
  upperSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitleText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 15,
    opacity: 0.8,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
  },
  lowerSection: {
    flex: 1,
    zIndex: 1,
  },
});