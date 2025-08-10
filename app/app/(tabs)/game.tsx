import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { BettingGrid } from '../../components/BettingGrid';
import { ChipSelector } from '../../components/ChipSelector';
import { GameButton } from '../../components/GameButton';
import { RouletteWheel } from '../../components/RouletteWheel';
import { FRUITS } from '../../constants/GameConstants';

export default function GameScreen() {
  const [balance, setBalance] = useState(10000);
  const [selectedChip, setSelectedChip] = useState(100);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number>();
  const [timer, setTimer] = useState(30);

  const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);

  const handlePlaceBet = (fruitName: string) => {
    if (balance >= selectedChip) {
      setBets(prev => ({
        ...prev,
        [fruitName]: (prev[fruitName] || 0) + selectedChip,
      }));
      setBalance(prev => prev - selectedChip);
    } else {
      Alert.alert('Insufficient Balance', 'You don\'t have enough coins to place this bet.');
    }
  };

  const handleClearBets = () => {
    setBalance(prev => prev + totalBet);
    setBets({});
  };

  const handleDoubleBets = () => {
    if (balance >= totalBet) {
      setBets(prev => {
        const doubled: { [key: string]: number } = {};
        Object.keys(prev).forEach(key => {
          doubled[key] = prev[key] * 2;
        });
        return doubled;
      });
      setBalance(prev => prev - totalBet);
    } else {
      Alert.alert('Insufficient Balance', 'You don\'t have enough coins to double your bets.');
    }
  };

  const handleSpin = () => {
    if (totalBet === 0) {
      Alert.alert('No Bets Placed', 'Please place at least one bet before spinning.');
      return;
    }

    setIsSpinning(true);
    const randomResult = Math.floor(Math.random() * FRUITS.length);
    setResult(randomResult);
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
    if (result !== undefined) {
      const winningFruit = FRUITS[result];
      const winAmount = bets[winningFruit.name] * winningFruit.multiplier;
      
      if (winAmount > 0) {
        setBalance(prev => prev + winAmount);
        Alert.alert(
          '🎉 Congratulations!',
          `You won $${winAmount.toLocaleString()} on ${winningFruit.name}!`
        );
      } else {
        Alert.alert('Better luck next time!', 'Try again with a new strategy.');
      }
      
      setBets({});
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
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Balance: ${balance.toLocaleString()}</Text>
            <Text style={styles.timerText}>Next Spin: {timer}s</Text>
          </View>
        </View>

        {/* Roulette Wheel */}
        <View style={styles.wheelContainer}>
          <RouletteWheel
            isSpinning={isSpinning}
            result={result}
            onSpinComplete={handleSpinComplete}
          />
        </View>

        {/* Betting Grid */}
        <BettingGrid
          bets={bets}
          selectedChip={selectedChip}
          onPlaceBet={handlePlaceBet}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <GameButton
            title="Clear"
            onPress={handleClearBets}
            variant="danger"
            size="small"
            disabled={totalBet === 0}
          />
          <GameButton
            title="Double"
            onPress={handleDoubleBets}
            variant="secondary"
            size="small"
            disabled={totalBet === 0 || balance < totalBet}
          />
          <GameButton
            title="SPIN"
            onPress={handleSpin}
            variant="success"
            size="medium"
            disabled={isSpinning || totalBet === 0}
          />
        </View>

        {/* Chip Selector */}
        <ChipSelector
          selectedChip={selectedChip}
          onSelectChip={setSelectedChip}
        />
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
    paddingHorizontal: 10,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 5,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timerText: {
    color: '#F39C12',
    fontSize: 12,
    fontWeight: 'bold',
  },
  wheelContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    flex: 0.4,
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});