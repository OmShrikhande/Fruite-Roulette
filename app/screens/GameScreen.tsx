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
import api from '../api/axios';

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

  const handleSpin = async () => {
    if (!selectedFruit || isSpinning || status !== 'betting') return;
    
    setLoading(true);
    setIsSpinning(true);
    
    try {
      // Simulate API call for placing bet
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate getting result after timer
      setTimeout(async () => {
        try {
          // Simulate getting winning result
          const winning = FRUITS[Math.floor(Math.random() * FRUITS.length)].name;
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
  };

  return (
    <View style={styles.container}>
      {/* Top HUD Bar */}
      <View style={styles.hudBar}>
        <Text style={styles.title}>Balance: {balance}</Text>
        <Text style={styles.title}>Timer: {timer}</Text>
      </View>

      {/* Main Game Board */}
      <View style={styles.boardContainer}>
        <RouletteWheel
          isSpinning={isSpinning}
          result={selectedFruit ? FRUITS.findIndex(f => f.name === selectedFruit) : undefined}
          onSpinComplete={() => setIsSpinning(false)}
        />
        <BettingGrid
          bets={bets}
          selectedChip={10}
          onPlaceBet={(fruitName) => {
            setSelectedFruit(fruitName);
            placeBet({ fruit: fruitName, amount: 10 });
          }}
        />
      </View>

      {/* Bottom Controls */}
      <View style={styles.controlsContainer}>
        <GameButton 
          title="SPIN" 
          onPress={handleSpin}
          disabled={isSpinning || !selectedFruit || status !== 'betting'}
        />
        <GameButton title="Clear Bets" onPress={clearBets} disabled={isSpinning} />
        <GameButton title="Reset Game" onPress={resetGame} />
      </View>
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
  container: { 
    flex: 1, 
    backgroundColor: '#0a3d0a',
  },
  hudBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  title: { 
    fontSize: 16, 
    color: '#FFF',
    fontWeight: 'bold',
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default GameScreen;
