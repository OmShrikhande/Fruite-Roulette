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
      setTimeout(() => {
        setResult(Math.floor(Math.random() * 8));
      }, 4000);
    }
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
    setTimeout(() => {
      setResult(undefined);
    }, 3000);
  };

  const canSpin = totalBet > 0 && !isSpinning && status === 'betting';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Deep green casino table texture background */}
      <LinearGradient
        colors={['#0B4D0B', '#174D23', '#0B4D0B']}
        style={styles.casinoBackground}
      />

      {/* Top HUD Bar - spanning full width above oval */}
      <View style={styles.hudContainer}>
        <GameHeader balance={balance} />
      </View>

      {/* Central Game Board with oval betting track */}
      <View style={styles.gameBoard}>
        <SpinningWheel
          isSpinning={isSpinning}
          result={result}
          onSpinComplete={handleSpinComplete}
        />
      </View>

      {/* Bottom Control Panel - horizontal row of betting controls */}
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
    backgroundColor: '#0B4D0B',
    width: 1080,
    height: 1920,
  },
  casinoBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  hudContainer: {
    paddingTop: StatusBar.currentHeight || 44,
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
    paddingHorizontal: 16,
    zIndex: 10,
  },
});

export default FruitsRouletteGameScreen;