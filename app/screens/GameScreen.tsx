import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BettingGrid } from '../components/BettingGrid';
import { RouletteWheel } from '../components/RouletteWheel';
import { GameButton } from '../components/GameButton';
import { FRUITS } from '../constants/GameConstants';
import { useGameStore } from '../store/useGameStore';
import { useBetStore } from '../store/useBetStore';
import { useBalanceStore } from '../store/useBalanceStore';

const GameScreen = () => {
  const { roundId, timer, status, setRound, setTimer, setStatus, resetGame } = useGameStore();
  const { bets, totalBet, placeBet, clearBets } = useBetStore();
  const { balance, incrementBalance } = useBalanceStore();
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningFruit, setWinningFruit] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
import api from '../api/axios';
  // Fetch round state
  useEffect(() => {
    const fetchRound = async () => {
      try {
        const res = await api.get('/game/current-round');
        setRound(res.data.roundId, res.data.timer, res.data.betsOpen ? 'betting' : 'spinning');
        setTimer(res.data.timer);
        setStatus(res.data.betsOpen ? 'betting' : 'spinning');
      } catch (err) {
        // handle error
      }
    };
    fetchRound();
    const interval = setInterval(fetchRound, 1000);
    return () => clearInterval(interval);
  }, [setRound, setTimer, setStatus]);

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

      <GameButton
        title="Place Bet"
        onPress={async () => {
          if (!selectedFruit) return;
          try {
            await api.post('/game/place-bet', { fruit: selectedFruit, amount: 10 });
            setIsSpinning(true);
            // Wait for round to end, then fetch result from backend
            setTimeout(async () => {
              try {
                const res = await api.get('/game/current-round');
                const winning = res.data.winningFruit || selectedFruit; // Use backend result
                setWinningFruit(winning);
                if (winning === selectedFruit) {
                  setConfetti(true);
                  incrementBalance(10 * 5); // TODO: Use backend multiplier
                  setTimeout(() => setConfetti(false), 2000);
                }
                setIsSpinning(false);
              } catch {}
            }, timer * 1000);
          } catch (err) {
            // handle error
          }
        }}
        disabled={isSpinning || !selectedFruit || status !== 'betting'}
      />
      <GameButton title="Clear Bets" onPress={clearBets} disabled={isSpinning} />
      <GameButton title="Reset Game" onPress={resetGame} />
      {confetti && (
        <Text style={{ fontSize: 40, color: '#FDCB6E', fontWeight: 'bold', textShadowColor: '#636e72', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 8 }}>
          🎉 WIN! 🎉
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
});

export default GameScreen;
