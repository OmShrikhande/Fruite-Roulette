import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Animated, Vibration } from 'react-native';
import { Audio } from 'expo-av';
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
  const [winModalVisible, setWinModalVisible] = useState(false);
  const playWinSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/win.mp3'));
      await sound.playAsync();
    } catch {}
  };
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
          setLoading(true);
          try {
            await api.post('/game/place-bet', { fruit: selectedFruit, amount: 10 });
            setIsSpinning(true);
            setTimeout(async () => {
              try {
                const res = await api.get('/game/current-round');
                const winning = res.data.winningFruit || selectedFruit;
                setWinningFruit(winning);
                if (winning === selectedFruit) {
                  setConfetti(true);
                  setWinModalVisible(true);
                  incrementBalance(10 * 5);
                  Vibration.vibrate(500);
                  playWinSound();
                  setTimeout(() => {
                    setConfetti(false);
                    setWinModalVisible(false);
                  }, 2000);
                }
                setIsSpinning(false);
              } catch (err) {
            setErrorMessage('Failed to fetch result. Please check your connection and try again.');
            setErrorModalVisible(true);
              }
              setLoading(false);
            }, timer * 1000);
          } catch (err) {
          setErrorMessage('Failed to place bet. Please check your balance and try again.');
          setErrorModalVisible(true);
            setLoading(false);
          }
        }}
        disabled={isSpinning || !selectedFruit || status !== 'betting'}
      />
      <GameButton title="Clear Bets" onPress={clearBets} disabled={isSpinning} />
      <GameButton title="Reset Game" onPress={resetGame} />
      <Modal visible={winModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <Animated.View style={{ backgroundColor: '#fff', padding: 32, borderRadius: 24, alignItems: 'center', elevation: 8 }}>
            <Text style={{ fontSize: 48, color: '#FDCB6E', fontWeight: 'bold', marginBottom: 16 }}>🎉 WIN! 🎉</Text>
            <Text style={{ fontSize: 20, color: '#636e72' }}>Congratulations! Your balance has increased.</Text>
          </Animated.View>
        </View>
      </Modal>
      <Modal visible={errorModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <Animated.View style={{ backgroundColor: '#fff', padding: 32, borderRadius: 24, alignItems: 'center', elevation: 8 }}>
            <Text style={{ fontSize: 32, color: '#E17055', fontWeight: 'bold', marginBottom: 16 }}>Error</Text>
            <Text style={{ fontSize: 18, color: '#636e72' }}>{errorMessage}</Text>
            <GameButton title="Close" onPress={() => setErrorModalVisible(false)} />
          </Animated.View>
        </View>
      </Modal>
      {loading && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 99 }}>
          <Animated.View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#FDCB6E', justifyContent: 'center', alignItems: 'center', elevation: 8 }}>
            <Text style={{ fontSize: 32, color: '#fff' }}>⏳</Text>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
});

export default GameScreen;
