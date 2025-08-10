import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameHeader } from '../components/game/GameHeader';
import { SpinningWheel } from '../components/game/SpinningWheel';
import { BettingChipsPanel } from '../components/game/BettingChipsPanel';
import { useBalanceStore } from '../store/useBalanceStore';
import { useBetStore } from '../store/useBetStore';
import { useGameStore } from '../store/useGameStore';

const { width, height } = Dimensions.get('window');

const FruitsRouletteGameScreen: React.FC = () => {
  const { balance } = useBalanceStore();
  const { bets, totalBet, placeBet } = useBetStore();
  const { timer, status } = useGameStore();
  
  const [selectedChip, setSelectedChip] = useState(1000); // Default to 1K chip (glowing)
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | undefined>(undefined);

  const handleSpin = () => {
    if (totalBet > 0 && !isSpinning) {
      setIsSpinning(true);
      // Simulate spin result after 4 seconds
      setTimeout(() => {
        setResult(Math.floor(Math.random() * 8));
      }, 4000);
    }
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
    // Reset result after showing it for 3 seconds
    setTimeout(() => {
      setResult(undefined);
    }, 3000);
  };

  const canSpin = totalBet > 0 && !isSpinning && status === 'betting';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background gradient */}
      <LinearGradient
        colors={['#1a5f1a', '#0d4d0d', '#0a3d0a']}
        style={styles.backgroundGradient}
      />

      {/* Top HUD Bar */}
      <View style={styles.hudContainer}>
        <GameHeader balance={balance} />
      </View>

      {/* Main Game Board */}
      <View style={styles.gameBoard}>
        <SpinningWheel
          isSpinning={isSpinning}
          result={result}
          onSpinComplete={handleSpinComplete}
          timer={timer}
          bets={bets}
        />
      </View>

      {/* Bottom Betting Chips Panel */}
      <View style={styles.bottomPanel}>
        <BettingChipsPanel
          selectedChip={selectedChip}
          onSelectChip={setSelectedChip}
          onSpin={handleSpin}
          canSpin={canSpin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a3d0a',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  hudContainer: {
    paddingTop: StatusBar.currentHeight || 44,
    paddingHorizontal: 0,
    zIndex: 10,
  },
  gameBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomPanel: {
    paddingBottom: 20,
    zIndex: 10,
  },
});

export default FruitsRouletteGameScreen;