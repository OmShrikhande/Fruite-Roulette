import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BettingGrid } from '../components/BettingGrid';
import { RouletteWheel } from '../components/RouletteWheel';
import { GameButton } from '../components/GameButton';
import { FRUITS } from '../constants/GameConstants';
import { useGameStore } from '../store/useGameStore';
import { useBetStore } from '../store/useBetStore';
import { useBalanceStore } from '../store/useBalanceStore';

const GameScreen = () => {
  const { roundId, timer, winningFruit, status, setRound, setWinningFruit, setTimer, setStatus, resetGame } = useGameStore();
  const { bets, totalBet, placeBet, clearBets } = useBetStore();
  const { balance, setBalance } = useBalanceStore();
  const [selectedFruit, setSelectedFruit] = React.useState<string | null>(null);
  const [isSpinning, setIsSpinning] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fruits Roulette</Text>
      <Text>Round: {roundId}</Text>
      <Text>Timer: {timer}</Text>
      <Text>Status: {status}</Text>
      <Text>Winning Fruit: {winningFruit || '-'} </Text>
      <Text>Balance: {balance}</Text>
      <Text>Total Bet: {totalBet}</Text>

      <RouletteWheel isSpinning={isSpinning} result={selectedFruit ? FRUITS.findIndex(f => f.name === selectedFruit) : undefined} onSpinComplete={() => setIsSpinning(false)} />

      <BettingGrid
        bets={bets}
        selectedChip={10}
        onPlaceBet={(fruitName) => {
          setSelectedFruit(fruitName);
          placeBet({ fruit: fruitName, amount: 10 });
        }}
      />

      <GameButton title="Spin" onPress={() => setIsSpinning(true)} disabled={isSpinning || !selectedFruit} />
      <GameButton title="Clear Bets" onPress={clearBets} disabled={isSpinning} />
      <GameButton title="Reset Game" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
});

export default GameScreen;
