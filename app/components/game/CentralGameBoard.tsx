import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface CentralGameBoardProps {
  timer: number;
}

// Fruit sequence for the oval border (repeating pattern)
const FRUITS = ['🍌', '🍇', '🍉', '🍊', '🍒', '🍎', '🍓', '🍋'];

// Betting zones data (2 rows × 4 columns) - exact values from description
const BETTING_ZONES = [
  { amount: '70,000', multiplier: 'X38' },
  { amount: '41,780', multiplier: 'X28' },
  { amount: '155,000', multiplier: 'X18' },
  { amount: '89,500', multiplier: 'X10' },
  { amount: '203,400', multiplier: 'X5' },
  { amount: '67,890', multiplier: 'X15' },
  { amount: '134,200', multiplier: 'X12' },
  { amount: '98,750', multiplier: 'X25' },
];

// Poker chips data
const POKER_CHIPS = [
  { value: '10', color: '#FFFFFF', textColor: '#000000' },
  { value: '100', color: '#FF8C00', textColor: '#FFFFFF' },
  { value: '1K', color: '#4169E1', textColor: '#FFFFFF' },
  { value: '5K', color: '#32CD32', textColor: '#FFFFFF' },
  { value: '50K', color: '#DC143C', textColor: '#FFFFFF' },
];

export const CentralGameBoard: React.FC<CentralGameBoardProps> = ({ timer }) => {
  // Calculate positions for fruit icons around oval border
  const getFruitPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radiusX = width * 0.35;
    const radiusY = width * 0.25;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    return { x, y };
  };

  // Generate fruit icons around the oval (repeating pattern)
  const generateFruitBorder = () => {
    const totalFruits = 24; // More fruits for continuous border
    const fruitElements = [];
    
    for (let i = 0; i < totalFruits; i++) {
      const fruitIndex = i % FRUITS.length;
      const position = getFruitPosition(i, totalFruits);
      
      fruitElements.push(
        <FruitIcon
          key={i}
          style={{
            left: width * 0.5 + position.x - 15,
            top: height * 0.4 + position.y - 15,
          }}
        >
          <FruitText>{FRUITS[fruitIndex]}</FruitText>
        </FruitIcon>
      );
    }
    
    return fruitElements;
  };

  return (
    <Container>
      {/* Outer Track with Fruit Border */}
      <OuterTrack>
        {generateFruitBorder()}
      </OuterTrack>

      {/* Beige Sand-Textured Oval Path */}
      <OvalTrack>
        {/* 8 Rectangular Betting Zones in 2 rows × 4 columns */}
        <BettingGrid>
          {BETTING_ZONES.map((zone, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            
            return (
              <BettingZone
                key={index}
                style={{
                  left: col * 85 + 20,
                  top: row * 80 + 30,
                }}
              >
                {/* Top Center: Large bold number in gradient orange/yellow */}
                <LinearGradient
                  colors={['#FFA500', '#FFD700']}
                  style={{ borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}
                >
                  <AmountText>{zone.amount}</AmountText>
                </LinearGradient>

                {/* Middle: Stacked poker chips */}
                <ChipStack>
                  {POKER_CHIPS.map((chip, chipIndex) => (
                    <Chip
                      key={chipIndex}
                      style={{
                        backgroundColor: chip.color,
                        marginLeft: chipIndex * -8,
                        zIndex: chipIndex,
                      }}
                    >
                      <ChipText style={{ color: chip.textColor }}>
                        {chip.value}
                      </ChipText>
                    </Chip>
                  ))}
                </ChipStack>

                {/* Bottom Center: Multiplier label in bold yellow */}
                <MultiplierText>{zone.multiplier}</MultiplierText>
              </BettingZone>
            );
          })}
        </BettingGrid>
      </OvalTrack>

      {/* Top Center: Red LED-style countdown timer */}
      <TimerDisplay>
        <TimerText>{timer.toString().padStart(2, '0')}</TimerText>
      </TimerDisplay>
    </Container>
  );
};

const Container = styled.View`
  width: ${width}px;
  height: ${height * 0.7}px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const OuterTrack = styled.View`
  position: absolute;
  width: ${width * 0.8}px;
  height: ${width * 0.6}px;
`;

const FruitIcon = styled.View`
  position: absolute;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const FruitText = styled.Text`
  font-size: 24px;
`;

const OvalTrack = styled.View`
  width: ${width * 0.7}px;
  height: ${width * 0.5}px;
  background-color: #F5DEB3;
  border-radius: ${width * 0.25}px;
  border-width: 4px;
  border-color: #DEB887;
  position: relative;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

const BettingGrid = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const BettingZone = styled.View`
  position: absolute;
  width: 80px;
  height: 70px;
  background-color: rgba(245, 222, 179, 0.95);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: #DEB887;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 4;
  padding: 4px;
`;

const AmountText = styled.Text`
  font-size: 9px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  font-family: monospace;
`;

const ChipStack = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 4px;
  height: 20px;
`;

const Chip = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #FFFFFF;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.4;
  shadow-radius: 3px;
  elevation: 4;
`;

const ChipText = styled.Text`
  font-size: 6px;
  font-weight: bold;
  text-align: center;
  font-family: monospace;
`;

const MultiplierText = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #FFD700;
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
  shadow-opacity: 0.6;
  shadow-radius: 6px;
  elevation: 8;
`;

const TimerText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #FF0000;
  font-family: monospace;
`;