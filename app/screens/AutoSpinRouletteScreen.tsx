import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar, Dimensions, Alert, BackHandler } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import ExactTopHUD from '../components/game/ExactTopHUD';
import SpinningGameBoard from '../components/game/SpinningGameBoard';
import BettingControls from '../components/game/BettingControls';
import GameResultModal from '../components/game/GameResultModal';

const { width, height } = Dimensions.get('window');

const AutoSpinRouletteScreen: React.FC = () => {
  // Game state
  const [balance, setBalance] = useState(10000); // Starting balance
  const [selectedChip, setSelectedChip] = useState(1000); // Default 1K chip
  const [timer, setTimer] = useState(50); // 50 second betting phase
  const [gamePhase, setGamePhase] = useState<'betting' | 'spinning' | 'result'>('betting');
  const [selectedBets, setSelectedBets] = useState<{ [key: string]: number }>({});
  const [gameResult, setGameResult] = useState<{
    fruit: string;
    won: boolean;
    winAmount: number;
  } | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [gameHistory, setGameHistory] = useState<any[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize game timer
  useEffect(() => {
    startNewGame();
    
    // Handle back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (gamePhase === 'spinning') {
        Alert.alert('Game in Progress', 'Please wait for the current game to finish.');
        return true;
      }
      return false;
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      backHandler.remove();
    };
  }, []);

  const startNewGame = () => {
    setTimer(50);
    setGamePhase('betting');
    setSelectedBets({});
    setGameResult(null);
    setShowResultModal(false);

    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePlaceBet = (fruit: string, amount: number) => {
    if (gamePhase !== 'betting') return;

    const currentBet = selectedBets[fruit] || 0;
    const newBet = Math.max(0, currentBet + amount);
    const totalBets = Object.values(selectedBets).reduce((sum, bet) => sum + bet, 0);
    const betDifference = newBet - currentBet;

    // Check if player has enough balance
    if (betDifference > 0 && totalBets + betDifference > balance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance for this bet.');
      return;
    }

    setSelectedBets(prev => ({
      ...prev,
      [fruit]: newBet,
    }));
  };

  const handleGameEnd = (result: { fruit: string; won: boolean; winAmount: number }) => {
    setGameResult(result);
    setGamePhase('result');

    // Update balance
    const totalBets = Object.values(selectedBets).reduce((sum, bet) => sum + bet, 0);
    const newBalance = balance - totalBets + result.winAmount;
    setBalance(newBalance);

    // Add to game history
    setGameHistory(prev => [...prev, {
      ...result,
      totalBets,
      newBalance,
      timestamp: new Date(),
    }]);

    // Show result modal after a short delay
    setTimeout(() => {
      setShowResultModal(true);
    }, 2000);

    // Check if player is out of money
    if (newBalance <= 0) {
      setTimeout(() => {
        Alert.alert(
          'Game Over',
          'You\'re out of money! Would you like to restart with a new balance?',
          [
            { text: 'Quit', style: 'cancel' },
            { 
              text: 'Restart', 
              onPress: () => {
                setBalance(10000);
                startNewGame();
              }
            },
          ]
        );
      }, 3000);
    }
  };

  const handlePlayAgain = () => {
    setShowResultModal(false);
    setTimeout(() => {
      startNewGame();
    }, 500);
  };

  const handleCloseResult = () => {
    setShowResultModal(false);
  };

  const getTotalBets = () => {
    return Object.values(selectedBets).reduce((sum, bet) => sum + bet, 0);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a52" translucent={false} />
      
      {/* Exact background matching the image */}
      <BackgroundGradient
        colors={['#1a3a52', '#2d5016', '#4a7c59', '#2d5016', '#1a3a52']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Top HUD Bar */}
      <HUDContainer>
        <ExactTopHUD balance={balance} />
      </HUDContainer>

      {/* Central Spinning Game Board */}
      <GameContainer>
        <SpinningGameBoard 
          gamePhase={gamePhase}
          timer={timer}
          selectedBets={selectedBets}
          onSpinComplete={(fruit) => {
            const totalBets = Object.values(selectedBets).reduce((sum, bet) => sum + bet, 0)
            const chosenBet = selectedBets[fruit] || 0
            const won = chosenBet > 0
            const multiplierMap: Record<string, number> = { '🍊': 38, '🍎': 28, '🍇': 18, '🍌': 10, '🥝': 5 }
            const winAmount = won ? chosenBet * (multiplierMap[fruit] || 1) : 0
            handleGameEnd({ fruit, won, winAmount })
          }}
        />
      </GameContainer>

      {/* Bottom Betting Controls */}
      <ControlsContainer>
        <BettingControls
          selectedChip={selectedChip}
          onSelectChip={setSelectedChip}
          onPlaceBet={handlePlaceBet}
          selectedBets={selectedBets}
          gamePhase={gamePhase}
          balance={balance}
        />
      </ControlsContainer>

      {/* Game Result Modal */}
      <GameResultModal
        isOpen={showResultModal}
        winningFruit={gameResult?.fruit ?? ''}
        isWin={gameResult?.won ?? false}
        winAmount={gameResult?.winAmount ?? 0}
        onClose={handleCloseResult}
        onPlayAgain={handlePlayAgain}
      />

      {/* Game Stats Overlay */}
      <StatsOverlay>
        <StatsContainer>
          <StatItem>
            <StatLabel>Games Played:</StatLabel>
            <StatValue>{gameHistory.length}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Total Bets:</StatLabel>
            <StatValue>${getTotalBets().toLocaleString()}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Phase:</StatLabel>
            <StatValue>
              {gamePhase === 'betting' && '🎯 BETTING'}
              {gamePhase === 'spinning' && '🎰 SPINNING'}
              {gamePhase === 'result' && '🏆 RESULT'}
            </StatValue>
          </StatItem>
        </StatsContainer>
      </StatsOverlay>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #1a3a52;
`;

const BackgroundGradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const HUDContainer = styled.View`
  height: 60px;
  z-index: 10;
`;

const GameContainer = styled.View`
  flex: 1;
  z-index: 5;
`;

const ControlsContainer = styled.View`
  z-index: 10;
`;

const StatsOverlay = styled.View`
  position: absolute;
  top: 70px;
  right: 10px;
  z-index: 15;
`;

const StatsContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 8px;
  border: 1px solid #FFD700;
`;

const StatItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const StatLabel = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  margin-right: 8px;
`;

const StatValue = styled.Text`
  color: #FFD700;
  font-size: 10px;
  font-weight: bold;
  font-family: monospace;
`;

export default AutoSpinRouletteScreen;