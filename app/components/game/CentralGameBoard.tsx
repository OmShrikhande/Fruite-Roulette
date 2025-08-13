import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface CentralGameBoardProps {
  timer: number;
}

// Exact fruit sequence from the image border
const FRUITS = ['🍊', '🍎', '🍇', '🍌', '🥝', '🍊', '🍎', '🍌', '🍇', '🥝', '🍊', '🍎', '🍌', '🍇', '🥝', '🍊', '🍎', '🍌'];

// Betting zones data exactly as shown in image (2 rows × 4 columns)
const BETTING_ZONES = [
  // Top row
  { amount: '70,000', multiplier: 'X38' },
  { amount: '41,780', multiplier: 'X28' },
  { amount: '62,780', multiplier: 'X18' },
  { amount: '155,000', multiplier: 'X10' },
  // Bottom row
  { amount: '5,100', multiplier: 'X5' },
  { amount: '50,200', multiplier: 'X5' },
  { amount: '3,600', multiplier: 'X5' },
  { amount: '10,100', multiplier: 'X5' },
];

// Poker chips exactly as in image
const POKER_CHIPS = [
  { value: '10', color: '#E8E8E8', textColor: '#000000', borderColor: '#CCCCCC' },
  { value: '100', color: '#FF8C00', textColor: '#FFFFFF', borderColor: '#FF6600' },
  { value: '1K', color: '#4169E1', textColor: '#FFFFFF', borderColor: '#1E90FF' },
  { value: '5K', color: '#32CD32', textColor: '#FFFFFF', borderColor: '#228B22' },
  { value: '50K', color: '#DC143C', textColor: '#FFFFFF', borderColor: '#B22222' },
];

export const CentralGameBoard: React.FC<CentralGameBoardProps> = ({ timer }) => {
  // Calculate positions for fruit icons around oval border
  const getFruitPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radiusX = width * 0.38;
    const radiusY = width * 0.28;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    return { x, y };
  };

  // Generate fruit icons around the oval border
  const generateFruitBorder = () => {
    const totalFruits = 18;
    const fruitElements = [];
    
    for (let i = 0; i < totalFruits; i++) {
      const position = getFruitPosition(i, totalFruits);
      
      fruitElements.push(
        <FruitIcon
          key={i}
          style={{
            left: width * 0.5 + position.x - 20,
            top: height * 0.35 + position.y - 20,
          }}
        >
          <FruitText>{FRUITS[i]}</FruitText>
        </FruitIcon>
      );
    }
    
    return fruitElements;
  };

  return (
    <Container>
      {/* Green textured background */}
      <BackgroundGradient
        colors={['#2d5016', '#4a7c59', '#2d5016']}
      />

      {/* Fruit border around the oval */}
      <OuterTrack>
        {generateFruitBorder()}
      </OuterTrack>

      {/* Beige oval track with green interior and betting zones */}
      <OvalTrack>
        {/* Green interior of the oval */}
        <OvalInterior>
          {/* 8 Rectangular betting zones in 2 rows × 4 columns */}
          <BettingGrid>
            {BETTING_ZONES.map((zone, index) => {
              const row = Math.floor(index / 4);
              const col = index % 4;
              
              return (
                <BettingZone
                  key={index}
                  style={{
                    left: col * 90 + 15,
                    top: row * 85 + 25,
                  }}
                >
                  {/* Amount in gradient orange background */}
                  <LinearGradient
                    colors={['#FF8C00', '#FFD700']}
                    style={{ 
                      borderRadius: 12, 
                      paddingHorizontal: 12, 
                      paddingVertical: 4,
                      marginBottom: 4
                    }}
                  >
                    <AmountText>{zone.amount}</AmountText>
                  </LinearGradient>

                  {/* Stacked poker chips */}
                  <ChipStack>
                    {POKER_CHIPS.map((chip, chipIndex) => (
                      <Chip
                        key={chipIndex}
                        style={{
                          backgroundColor: chip.color,
                          borderColor: chip.borderColor,
                          marginLeft: chipIndex > 0 ? -8 : 0,
                          zIndex: POKER_CHIPS.length - chipIndex,
                        }}
                      >
                        <ChipText style={{ color: chip.textColor }}>
                          {chip.value}
                        </ChipText>
                      </Chip>
                    ))}
                  </ChipStack>

                  {/* Multiplier at bottom */}
                  <MultiplierText>{zone.multiplier}</MultiplierText>
                </BettingZone>
              );
            })}
          </BettingGrid>
        </OvalInterior>
      </OvalTrack>

      {/* Red LED timer at top center */}
      <TimerDisplay>
        <TimerText>{timer.toString().padStart(2, '0')}</TimerText>
      </TimerDisplay>
    </Container>
  );
};

const Container = styled.View`
  width: ${width}px;
  height: ${height * 0.65}px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BackgroundGradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const OuterTrack = styled.View`
  position: absolute;
  width: ${width * 0.85}px;
  height: ${width * 0.65}px;
`;

const FruitIcon = styled.View`
  position: absolute;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`;

const FruitText = styled.Text`
  font-size: 28px;
`;

const OvalTrack = styled.View`
  width: ${width * 0.75}px;
  height: ${width * 0.55}px;
  background-color: #F5DEB3;
  border-radius: ${width * 0.275}px;
  border-width: 8px;
  border-color: #DEB887;
  position: relative;
  shadow-color: #000;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.4;
  shadow-radius: 12px;
  elevation: 12;
  padding: 8px;
`;

const OvalInterior = styled.View`
  flex: 1;
  background-color: #2d5016;
  border-radius: ${width * 0.25}px;
  position: relative;
`;

const BettingGrid = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const BettingZone = styled.View`
  position: absolute;
  width: 85px;
  height: 80px;
  background-color: rgba(245, 222, 179, 0.95);
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: #DEB887;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 6;
  padding: 4px;
`;

const AmountText = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  font-family: monospace;
`;

const ChipStack = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 3px;
  height: 20px;
`;

const Chip = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.4;
  shadow-radius: 2px;
  elevation: 3;
`;

const ChipText = styled.Text`
  font-size: 6px;
  font-weight: bold;
  text-align: center;
  font-family: monospace;
`;

const MultiplierText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #FFD700;
  text-align: center;
  font-family: monospace;
  text-shadow-color: #FF8C00;
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

const TimerDisplay = styled.View`
  position: absolute;
  top: ${height * 0.22}px;
  background-color: #000000;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 8px;
  border-width: 2px;
  border-color: #FF0000;
  shadow-color: #FF0000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.8;
  shadow-radius: 8px;
  elevation: 10;
`;

const TimerText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FF0000;
  font-family: monospace;
  text-shadow-color: rgba(255, 0, 0, 0.5);
  text-shadow-offset: 0px 0px;
  text-shadow-radius: 6px;
`;