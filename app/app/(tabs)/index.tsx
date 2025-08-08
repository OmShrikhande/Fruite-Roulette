import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameButton } from '../../components/GameButton';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [balance] = useState(10000);
  const [gems] = useState(50);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.balanceContainer}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Balance</Text>
              <Text style={styles.balanceValue}>${balance.toLocaleString()}</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Gems</Text>
              <Text style={styles.balanceValue}>{gems}</Text>
            </View>
          </View>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🍎 FRUITS</Text>
          <Text style={styles.logoSubtext}>ROULETTE</Text>
        </View>

        {/* Floating Fruits Animation */}
        <View style={styles.floatingFruits}>
          <Text style={[styles.floatingFruit, { top: '20%', left: '10%' }]}>🍒</Text>
          <Text style={[styles.floatingFruit, { top: '30%', right: '15%' }]}>🍌</Text>
          <Text style={[styles.floatingFruit, { top: '50%', left: '5%' }]}>🍇</Text>
          <Text style={[styles.floatingFruit, { top: '60%', right: '10%' }]}>🍉</Text>
        </View>

        {/* Main Menu */}
        <View style={styles.menuContainer}>
          <GameButton
            title="🎰 PLAY NOW"
            onPress={() => {}}
            variant="success"
            size="large"
          />
          
          <View style={styles.secondaryButtons}>
            <GameButton
              title="📚 How to Play"
              onPress={() => {}}
              variant="secondary"
              size="medium"
            />
            <GameButton
              title="🏆 Leaderboard"
              onPress={() => {}}
              variant="primary"
              size="medium"
            />
          </View>
        </View>

        {/* Bottom Icons */}
        <View style={styles.bottomIcons}>
          <Ionicons name="settings" size={24} color="#FFF" />
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
    alignItems: 'flex-end',
  },
  balanceContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  balanceItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  balanceLabel: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.8,
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.15,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  logoSubtext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F39C12',
    letterSpacing: 4,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  floatingFruits: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingFruit: {
    position: 'absolute',
    fontSize: 30,
    opacity: 0.3,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  bottomIcons: {
    alignItems: 'center',
    paddingBottom: 30,
  },
});