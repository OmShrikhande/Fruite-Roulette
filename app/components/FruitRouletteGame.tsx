import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { BettingBoard } from './game/BettingBoard';
import { ControlPanel } from './game/ControlPanel';
import { FruitBorder } from './game/FruitBorder';
import { GameHeader } from './game/GameHeader';
import { SpinningWheel } from './game/SpinningWheel';

const { width, height } = Dimensions.get('window');

export const FruitRouletteGame: React.FC = () => {
  const [timer, setTimer] = useState(50);
  const [selectedChip, setSelectedChip] = useState(100);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [balance, setBalance] = useState(100000);
  const [gems, setGems] = useState(50);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number>();
  const [gamePhase, setGamePhase] = useState<'betting' | 'spinning' | 'result'>('betting');

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Timer reached 0, start spinning if there are bets
          const totalBets = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
          if (totalBets > 0) {
            handleAutoSpin();
          }
          return 50; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [bets]);

  const handlePlaceBet = (sectionId: string) => {
    if (balance >= selectedChip && !isSpinning && gamePhase === 'betting') {
      setBets(prev => ({
        ...prev,
        [sectionId]: (prev[sectionId] || 0) + selectedChip,
      }));
      setBalance(prev => prev - selectedChip);
    }
  };

  const handleAutoSpin = () => {
    setGamePhase('spinning');
    setIsSpinning(true);
    const result = Math.floor(Math.random() * 8); // 8 wheel segments
    setSpinResult(result);
  };

  const handleManualSpin = () => {
    const totalBets = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
    if (totalBets === 0) {
      Alert.alert('No Bets', 'Please place at least one bet before spinning.');
      return;
    }
    handleAutoSpin();
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
    setGamePhase('result');
    
    // Calculate winnings
    if (spinResult !== undefined) {
      // Simple win calculation - you can make this more sophisticated
      const hasWon = Math.random() > 0.7; // 30% win chance
      if (hasWon) {
        const winAmount = selectedChip * 5; // Simple multiplier
        setBalance(prev => prev + winAmount);
        Alert.alert('🎉 Winner!', `You won $${winAmount.toLocaleString()}!`);
      } else {
        Alert.alert('Better luck next time!', 'Try again with a new strategy.');
      }
    }
    
    // Reset for next round
    setTimeout(() => {
      setBets({});
      setSpinResult(undefined);
      setGamePhase('betting');
      setTimer(50);
    }, 3000);
  };

  const totalBets = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
  const canSpin = totalBets > 0 && gamePhase === 'betting';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a1a2e', '#16213e', '#1a2a4a', '#2e4a6b']}
        style={styles.gameArea}
      >
        {/* Game Header */}
        <GameHeader 
          timer={timer}
          balance={balance}
          gems={gems}
        />

        {/* Top Half - Spinning Wheel Area */}
        <View style={styles.topHalf}>
          {/* Animated Fruit Border */}
          <FruitBorder isSpinning={isSpinning} />
          
          {/* Spinning Wheel (shown during spin) */}
          {gamePhase === 'spinning' && (
            <SpinningWheel
              isSpinning={isSpinning}
              result={spinResult}
              onSpinComplete={handleSpinComplete}
            />
          )}
        </View>

        {/* Bottom Half - Betting Area */}
        <View style={styles.bottomHalf}>
          <BettingBoard
            bets={bets}
            selectedChip={selectedChip}
            onPlaceBet={handlePlaceBet}
            isSpinning={isSpinning}
          />
        </View>

        {/* Control Panel */}
        <ControlPanel
          selectedChip={selectedChip}
          onSelectChip={setSelectedChip}
          onSpin={handleManualSpin}
          canSpin={canSpin}
          isSpinning={isSpinning}
          totalBets={totalBets}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameArea: {
    flex: 1,
    padding: 10,
    gap: 8,
  },
  topHalf: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bottomHalf: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});