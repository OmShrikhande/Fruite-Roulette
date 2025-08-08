import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameButton } from '../../components/GameButton';
import { FRUITS } from '../../constants/GameConstants';

const { width } = Dimensions.get('window');

export default function TutorialScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: '🎯 How to Play',
      content: 'Welcome to Fruits Roulette! Place bets on your favorite fruits and watch the wheel spin to win big!',
      image: '🎰',
    },
    {
      title: '🍎 Choose Your Fruits',
      content: 'Each fruit has different multipliers. Higher multipliers mean bigger wins but lower chances!',
      image: '🍒🍌🍇🍉',
    },
    {
      title: '💰 Place Your Bets',
      content: 'Select chip values and tap on fruits to place bets. You can bet on multiple fruits in one round!',
      image: '🪙',
    },
    {
      title: '🎲 Special Strategy: Double-Zack Pattern',
      content: 'Try betting on opposite fruits (Cherry + Grape, Banana + Orange) for balanced risk-reward gameplay!',
      image: '⚡',
    },
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📚 How to Play</Text>
          <Text style={styles.stepIndicator}>
            {currentStep + 1} / {tutorialSteps.length}
          </Text>
        </View>

        {/* Tutorial Content */}
        <ScrollView style={styles.content}>
          <View style={styles.stepContainer}>
            <Text style={styles.stepImage}>
              {tutorialSteps[currentStep].image}
            </Text>
            <Text style={styles.stepTitle}>
              {tutorialSteps[currentStep].title}
            </Text>
            <Text style={styles.stepContent}>
              {tutorialSteps[currentStep].content}
            </Text>
          </View>

          {/* Fruit Multipliers Table */}
          {currentStep === 1 && (
            <View style={styles.multipliersTable}>
              <Text style={styles.tableTitle}>Fruit Multipliers</Text>
              {FRUITS.map((fruit) => (
                <View key={fruit.name} style={styles.multiplierRow}>
                  <View style={styles.fruitInfo}>
                    <Text style={styles.fruitEmoji}>{fruit.emoji}</Text>
                    <Text style={styles.fruitName}>{fruit.name}</Text>
                  </View>
                  <Text style={styles.multiplierValue}>x{fruit.multiplier}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Betting Example */}
          {currentStep === 2 && (
            <View style={styles.bettingExample}>
              <Text style={styles.exampleTitle}>Example:</Text>
              <Text style={styles.exampleText}>
                • Select 100 chip{'\n'}
                • Tap on Cherry (x5){'\n'}
                • If Cherry wins: 100 × 5 = 500 coins!
              </Text>
            </View>
          )}

          {/* Strategy Tips */}
          {currentStep === 3 && (
            <View style={styles.strategyTips}>
              <Text style={styles.tipsTitle}>Pro Tips:</Text>
              <Text style={styles.tipText}>
                🎯 Spread bets across multiple fruits{'\n'}
                💎 Higher multipliers = Higher risk{'\n'}
                ⚖️ Balance safe and risky bets{'\n'}
                🔄 Use "Double" button strategically
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Navigation */}
        <View style={styles.navigation}>
          <GameButton
            title="← Previous"
            onPress={prevStep}
            variant="secondary"
            size="medium"
            disabled={currentStep === 0}
          />
          {currentStep === tutorialSteps.length - 1 ? (
            <GameButton
              title="🎰 Start Playing!"
              onPress={() => {}}
              variant="success"
              size="medium"
            />
          ) : (
            <GameButton
              title="Next →"
              onPress={nextStep}
              variant="primary"
              size="medium"
            />
          )}
        </View>
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
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  stepIndicator: {
    fontSize: 14,
    color: '#F39C12',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  stepImage: {
    fontSize: 60,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  stepContent: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  multipliersTable: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12',
    textAlign: 'center',
    marginBottom: 15,
  },
  multiplierRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  fruitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fruitEmoji: {
    fontSize: 20,
  },
  fruitName: {
    color: '#FFF',
    fontSize: 16,
  },
  multiplierValue: {
    color: '#00B894',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bettingExample: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12',
    marginBottom: 10,
  },
  exampleText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
  },
  strategyTips: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12',
    marginBottom: 10,
  },
  tipText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
});