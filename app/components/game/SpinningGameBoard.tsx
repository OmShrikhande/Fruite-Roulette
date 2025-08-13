import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface SpinningGameBoardProps {
  timer: number;
  onGameEnd: (result: { fruit: string; won: boolean; winAmount: number }) => void;
  selectedBets: { [key: string]: number };
}

// Exact betting zones data from the image
const BETTING_ZONES = [
  // Top row (left to right)
  { amount: '70,000', multiplier: 'X38', fruit: '🍊', position: { row: 0, col: 0 } },
  { amount: '41,780', multiplier: 'X28', fruit: '🍎', position: { row: 0, col: 1 } },
  { amount: '62,780', multiplier: 'X18', fruit: '🍇', position: { row: 0, col: 2 } },
  { amount: '155,000', multiplier: 'X10', fruit: '🍌', position: { row: 0, col: 3 } },
  // Bottom row (left to right)
  { amount: '5,100', multiplier: 'X5', fruit: '🥝', position: { row: 1, col: 0 } },
  { amount: '50,200', multiplier: 'X5', fruit: '🍊', position: { row: 1, col: 1 } },
  { amount: '3,600', multiplier: 'X5', fruit: '🍎', position: { row: 1, col: 2 } },
  { amount: '10,100', multiplier: 'X5', fruit: '🍌', position: { row: 1, col: 3 } },
];

// Fruits around the border (fixed positions)
const BORDER_FRUITS = [
  { fruit: '🍊', angle: 0 },
  { fruit: '🍎', angle: 30 },
  { fruit: '🍇', angle: 60 },
  { fruit: '🍌', angle: 90 },
  { fruit: '🥝', angle: 120 },
  { fruit: '🍊', angle: 150 },
  { fruit: '🍎', angle: 180 },
  { fruit: '🍌', angle: 210 },
  { fruit: '🍇', angle: 240 },
  { fruit: '🥝', angle: 270 },
  { fruit: '🍊', angle: 300 },
  { fruit: '🍎', angle: 330 },
];

// Poker chip stack
const CHIP_STACK = [
  { value: '10', color: '#E8E8E8', textColor: '#000000' },
  { value: '100', color: '#FF8C00', textColor: '#FFFFFF' },
  { value: '1K', color: '#4169E1', textColor: '#FFFFFF' },
  { value: '5K', color: '#32CD32', textColor: '#FFFFFF' },
  { value: '50K', color: '#DC143C', textColor: '#FFFFFF' },
];

export const SpinningGameBoard: React.FC<SpinningGameBoardProps> = ({ 
  timer, 
  onGameEnd, 
  selectedBets 
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [gamePhase, setGamePhase] = useState<'betting' | 'spinning' | 'result'>('betting');
  const [selectedFruit, setSelectedFruit] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const spinAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const resultAnimation = useRef(new Animated.Value(0)).current;

  // Start spinning when timer reaches 0
  useEffect(() => {
    if (timer <= 0 && gamePhase === 'betting') {
      startSpinning();
    }
  }, [timer, gamePhase]);

  const startSpinning = () => {
    setGamePhase('spinning');
    setIsSpinning(true);
    
    // Fast spinning phase (30 seconds)
    const fastSpin = () => {
      Animated.loop(
        Animated.timing(spinAnimation, {
          toValue: 1,
          duration: 100, // Very fast
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
      
      // Update highlighted fruit rapidly
      const fastInterval = setInterval(() => {
        setHighlightedIndex(prev => (prev + 1) % BORDER_FRUITS.length);
      }, 100);
      
      // After 30 seconds, slow down
      setTimeout(() => {
        clearInterval(fastInterval);
        slowDownSpin();
      }, 30000);
    };
    
    const slowDownSpin = () => {
      spinAnimation.stopAnimation();
      
      // Gradually slow down
      let currentSpeed = 200;
      const slowInterval = setInterval(() => {
        currentSpeed += 50; // Increase interval (slow down)
        setHighlightedIndex(prev => (prev + 1) % BORDER_FRUITS.length);
        
        if (currentSpeed > 2000) {
          clearInterval(slowInterval);
          finalizeSpin();
        }
      }, currentSpeed);
    };
    
    const finalizeSpin = () => {
      // Pick random final fruit
      const finalIndex = Math.floor(Math.random() * BORDER_FRUITS.length);
      const finalFruit = BORDER_FRUITS[finalIndex].fruit;
      
      setHighlightedIndex(finalIndex);
      setSelectedFruit(finalFruit);
      setIsSpinning(false);
      
      // Show result animation
      Animated.sequence([
        Animated.timing(resultAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ]).start(() => {
        calculateResult(finalFruit);
      });
    };
    
    fastSpin();
  };

  const calculateResult = (winningFruit: string) => {
    let totalWin = 0;
    let won = false;
    
    // Check if player bet on winning fruit
    Object.entries(selectedBets).forEach(([fruit, betAmount]) => {
      if (fruit === winningFruit && betAmount > 0) {
        const zone = BETTING_ZONES.find(z => z.fruit === fruit);
        if (zone) {
          const multiplier = parseInt(zone.multiplier.replace('X', ''));
          totalWin += betAmount * multiplier;
          won = true;
        }
      }
    });
    
    setGamePhase('result');
    onGameEnd({ fruit: winningFruit, won, winAmount: totalWin });
  };

  // Calculate fruit positions around oval
  const getFruitPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    const radiusX = width * 0.36;
    const radiusY = width * 0.26;
    const x = Math.cos(radian) * radiusX;
    const y = Math.sin(radian) * radiusY;
    return { x, y };
  };

  return (
    <Container>
      {/* Green textured background */}
      <BackgroundGradient
        colors={['#2d5016', '#4a7c59', '#2d5016']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Fruit border around oval */}
      <FruitBorder>
        {BORDER_FRUITS.map((item, index) => {
          const position = getFruitPosition(item.angle);
          const isHighlighted = index === highlightedIndex && isSpinning;
          
          return (
            <FruitIcon
              key={index}
              style={{
                left: width * 0.5 + position.x - 20,
                top: height * 0.35 + position.y - 20,
                backgroundColor: isHighlighted ? '#FFD700' : 'rgba(0, 0, 0, 0.4)',
                borderColor: isHighlighted ? '#FF8C00' : 'transparent',
                borderWidth: isHighlighted ? 3 : 0,
                transform: [{ scale: isHighlighted ? 1.3 : 1 }],
              }}
            >
              <FruitText style={{ fontSize: isHighlighted ? 28 : 24 }}>
                {item.fruit}
              </FruitText>
            </FruitIcon>
          );
        })}
      </FruitBorder>

      {/* Spinning ring indicator */}
      {isSpinning && (
        <SpinningRing>
          <Animated.View
            style={{
              width: width * 0.8,
              height: width * 0.6,
              borderRadius: width * 0.3,
              borderWidth: 4,
              borderColor: '#FFD700',
              borderStyle: 'dashed',
              transform: [
                {
                  rotate: spinAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}
          />
        </SpinningRing>
      )}

      {/* Main oval track */}
      <OvalTrack>
        {/* Green interior */}
        <OvalInterior>
          {/* Betting zones grid */}
          {BETTING_ZONES.map((zone, index) => (
            <BettingZone
              key={index}
              style={{
                left: zone.position.col * 88 + 12,
                top: zone.position.row * 82 + 20,
                opacity: gamePhase === 'result' && selectedFruit === zone.fruit ? 1 : 0.8,
                borderColor: gamePhase === 'result' && selectedFruit === zone.fruit ? '#FFD700' : '#DEB887',
                borderWidth: gamePhase === 'result' && selectedFruit === zone.fruit ? 3 : 2,
              }}
            >
              {/* Orange amount display */}
              <AmountContainer>
                <LinearGradient
                  colors={['#FF8C00', '#FFD700']}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 10,
                  }}
                >
                  <AmountText>{zone.amount}</AmountText>
                </LinearGradient>
              </AmountContainer>

              {/* Stacked poker chips */}
              <ChipStackContainer>
                {CHIP_STACK.map((chip, chipIndex) => (
                  <PokerChip
                    key={chipIndex}
                    style={{
                      backgroundColor: chip.color,
                      marginLeft: chipIndex > 0 ? -6 : 0,
                      zIndex: CHIP_STACK.length - chipIndex,
                    }}
                  >
                    <ChipText style={{ color: chip.textColor }}>
                      {chip.value}
                    </ChipText>
                  </PokerChip>
                ))}
              </ChipStackContainer>

              {/* Multiplier at bottom */}
              <MultiplierText>{zone.multiplier}</MultiplierText>
            </BettingZone>
          ))}
        </OvalInterior>
      </OvalTrack>

      {/* Game phase indicator */}
      <GamePhaseIndicator>
        {gamePhase === 'betting' && (
          <PhaseText>Place Your Bets! {timer}s</PhaseText>
        )}
        {gamePhase === 'spinning' && (
          <PhaseText>🎰 Spinning... Good Luck! 🎰</PhaseText>
        )}
        {gamePhase === 'result' && (
          <Animated.View
            style={{
              transform: [{ scale: pulseAnimation }],
            }}
          >
            <ResultText>Winner: {selectedFruit}</ResultText>
          </Animated.View>
        )}
      </GamePhaseIndicator>

      {/* Timer display */}
      <TimerDisplay style={{ opacity: gamePhase === 'betting' ? 1 : 0.5 }}>
        <TimerText>{timer}</TimerText>
      </TimerDisplay>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BackgroundGradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const FruitBorder = styled.View`
  position: absolute;
  width: ${width * 0.8}px;
  height: ${width * 0.6}px;
`;

const FruitIcon = styled.View`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

const FruitText = styled.Text`
  font-weight: bold;
`;

const SpinningRing = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const OvalTrack = styled.View`
  width: ${width * 0.74}px;
  height: ${width * 0.54}px;
  background-color: #F5DEB3;
  border-radius: ${width * 0.27}px;
  border-width: 8px;
  border-color: #DEB887;
  padding: 8px;
  shadow-color: #000;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.4;
  shadow-radius: 12px;
  elevation: 12;
`;

const OvalInterior = styled.View`
  flex: 1;
  background-color: #2d5016;
  border-radius: ${width * 0.25}px;
  position: relative;
`;

const BettingZone = styled.View`
  position: absolute;
  width: 84px;
  height: 78px;
  background-color: rgba(245, 222, 179, 0.98);
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  padding: 4px;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 6;
`;

const AmountContainer = styled.View`
  margin-bottom: 3px;
`;

const AmountText = styled.Text`
  font-size: 9px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  font-family: monospace;
`;

const ChipStackContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 16px;
  margin-vertical: 2px;
`;

const PokerChip = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #FFFFFF;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
  elevation: 2;
`;

const ChipText = styled.Text`
  font-size: 5px;
  font-weight: bold;
  font-family: monospace;
`;

const MultiplierText = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #FFD700;
  text-align: center;
  font-family: monospace;
  text-shadow-color: #FF8C00;
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
  margin-top: 2px;
`;

const GamePhaseIndicator = styled.View`
  position: absolute;
  top: ${height * 0.15}px;
  background-color: rgba(0, 0, 0, 0.8);
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 20px;
  border-width: 2px;
  border-color: #FFD700;
`;

const PhaseText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFD700;
  text-align: center;
  font-family: monospace;
`;

const ResultText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #00FF00;
  text-align: center;
  font-family: monospace;
`;

const TimerDisplay = styled.View`
  position: absolute;
  top: ${height * 0.25}px;
  background-color: #000000;
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 6px;
  border-width: 2px;
  border-color: #FF0000;
  shadow-color: #FF0000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 6px;
  elevation: 8;
`;

const TimerText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #FF0000;
  font-family: monospace;
  text-shadow-color: rgba(255, 0, 0, 0.8);
  text-shadow-offset: 0px 0px;
  text-shadow-radius: 4px;
`;