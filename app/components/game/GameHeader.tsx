import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GameHeaderProps {
  balance: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ balance }) => {
  return (
    <View style={styles.hudBar}>
      {/* Blue diamond icon with player balance */}
      <View style={styles.balanceSection}>
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          style={styles.balanceGradient}
        >
          <Text style={styles.diamondIcon}>💎</Text>
          <Text style={styles.balanceValue}>{balance}</Text>
        </LinearGradient>
      </View>
      
      {/* Four icons: coin/balance, trophy, clock/history, sound control */}
      <View style={styles.iconsSection}>
        <TouchableOpacity style={[styles.iconButton, styles.coinButton]}>
          <Text style={styles.iconEmoji}>🪙</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  hudBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 0,
    marginBottom: 0,
  },
  balanceSection: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  balanceGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  diamondIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  iconsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  coinButton: {
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
  },
  trophyButton: {
    backgroundColor: 'rgba(255, 165, 0, 0.9)',
  },
  historyButton: {
    backgroundColor: 'rgba(116, 185, 255, 0.9)',
  },
  soundButton: {
    backgroundColor: 'rgba(46, 213, 115, 0.9)',
  },
  iconEmoji: {
    fontSize: 16,
  },
});