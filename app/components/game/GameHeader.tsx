import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GameHeaderProps {
  balance: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ balance }) => {
  return (
    <View style={styles.hudBar}>
      {/* Left: Blue diamond icon with player balance */}
      <View style={styles.balanceSection}>
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          style={styles.balanceGradient}
        >
          <Text style={styles.diamondIcon}>💎</Text>
          <Text style={styles.balanceValue}>{balance}</Text>
        </LinearGradient>
      </View>
      
      {/* Center-left: Coin stack icon, Center: Trophy icon, Center-right: Clock icon, Far right: Speaker icon */}
      <View style={styles.iconsSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconEmoji}>🪙</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconEmoji}>🏆</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconEmoji}>🕐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
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
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: '100%',
  },
  balanceSection: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  balanceGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  diamondIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  iconsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconEmoji: {
    fontSize: 20,
  },
});