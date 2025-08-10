import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FRUITS } from '../constants/GameConstants';

interface BettingGridProps {
  bets: { [key: string]: number };
  selectedChip: number;
  onPlaceBet: (fruitName: string) => void;
}

export const BettingGrid: React.FC<BettingGridProps> = ({
  bets,
  selectedChip,
  onPlaceBet,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Your Bets</Text>
      <View style={styles.grid}>
        {FRUITS.map((fruit) => (
          <TouchableOpacity
            key={fruit.name}
            style={[
              styles.betSlot,
              { backgroundColor: fruit.color },
              bets[fruit.name] > 0 && styles.activeBet,
            ]}
            onPress={() => onPlaceBet(fruit.name)}
            activeOpacity={0.8}
          >
            <Text style={styles.fruitEmoji}>{fruit.emoji}</Text>
            <Text style={styles.fruitName}>{fruit.name}</Text>
            <Text style={styles.multiplier}>x{fruit.multiplier}</Text>
            {bets[fruit.name] > 0 && (
              <View style={styles.chipIndicator}>
                <Text style={styles.chipAmount}>{bets[fruit.name]}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  betSlot: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 8,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
  },
  activeBet: {
    borderWidth: 3,
    borderColor: '#F39C12',
  },
  fruitEmoji: {
    fontSize: 16,
    marginBottom: 1,
  },
  fruitName: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  multiplier: {
    color: '#FFF',
    fontSize: 6,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 1,
  },
  chipIndicator: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#F39C12',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipAmount: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
});