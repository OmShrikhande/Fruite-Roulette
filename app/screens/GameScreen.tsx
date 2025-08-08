import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { useBetStore } from '../store/useBetStore';
import { useBalanceStore } from '../store/useBalanceStore';

const GameScreen = () => {
  const { roundId, timer, winningFruit, status, setRound, setWinningFruit, setTimer, setStatus, resetGame } = useGameStore();
  const { bets, totalBet, placeBet, clearBets } = useBetStore();
  const { balance, setBalance } = useBalanceStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fruits Roulette</Text>
      <Text>Round: {roundId}</Text>
      <Text>Timer: {timer}</Text>
      <Text>Status: {status}</Text>
      <Text>Winning Fruit: {winningFruit || '-'}</Text>
      <Text>Balance: {balance}</Text>
      <Text>Total Bet: {totalBet}</Text>
      <Button title="Place Demo Bet" onPress={() => placeBet({ fruit: 'apple', amount: 10 })} />
      <Button title="Clear Bets" onPress={clearBets} />
      <Button title="Spin (Demo)" onPress={() => setWinningFruit('apple')} />
      <Button title="Reset Game" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
});

export default GameScreen;
