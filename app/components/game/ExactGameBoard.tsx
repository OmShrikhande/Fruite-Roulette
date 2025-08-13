import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface ExactGameBoardProps {
  timer: number;
}

// Exact betting zones data from the image
const BETTING_ZONES = [
  // Top row (left to right)
  { amount: '70,000', multiplier: 'X38', position: { row: 0, col: 0 } },
  { amount: '41,780', multiplier: 'X28', position: { row: 0, col: 1 } },
  { amount: '62,780', multiplier: 'X18', position: { row: 0, col: 2 } },
  { amount: '155,000', multiplier: 'X10', position: { row: 0, col: 3 } },
  // Bottom row (left to right)
  { amount: '5,100', multiplier: 'X5', position: { row: 1, col: 0 } },
  { amount: '50,200', multiplier: 'X5', position: { row: 1, col: 1 } },
  { amount: '3,600', multiplier: 'X5', position: { row: 1, col: 2 } },
  { amount: '10,100', multiplier: 'X5', position: { row: 1, col: 3 } },
];

// Exact fruit sequence around the border
const BORDER_FRUITS = [
  '🍊', '🍎', '🍇', '🍌', '🥝', '🍊', '🍎', '🍌', 
  '🍇', '🥝', '🍊', '🍎', '🍌', '🍇', '🥝', '🍊', 
  '🍎', '🍌', '🍇', '🥝', '🍊', '🍎'
];

// Poker chip stack (exactly as shown in each betting zone)
const CHIP_STACK = [
  { value: '10', color: '#E8E8E8', textColor: '#000000' },
  { value: '100', color: '#FF8C00', textColor: '#FFFFFF' },
  { value: '1K', color: '#4169E1', textColor: '#FFFFFF' },
  { value: '5K', color: '#32CD32', textColor: '#FFFFFF' },
  { value: '50K', color: '#DC143C', textColor: '#FFFFFF' },
];

export const ExactGameBoard: React.FC<ExactGameBoardProps> = ({ timer }) => {
  // Calculate fruit positions around oval
  const getFruitPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radiusX = width * 0.36;
    const radiusY = width * 0.26;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
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
        {BORDER_FRUITS.map((fruit, index) => {
          const position = getFruitPosition(index, BORDER_FRUITS.length);
          return (
            <FruitIcon
              key={index}
              style={{
                left: width * 0.5 + position.x - 18,
                top: height * 0.35 + position.y - 18,
              }}
            >
              <FruitText>{fruit}</FruitText>
            </FruitIcon>
          );
        })}
      </FruitBorder>

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

              {/* Yellow multiplier */}
              <MultiplierText>{zone.multiplier}</MultiplierText>
            </BettingZone>
          ))}
        </OvalInterior>
      </OvalTrack>

      {/* Red LED timer */}
      <TimerDisplay>
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
  width: 36px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 18px;
  justify-content: center;
  align-items: center;
`;

const FruitText = styled.Text`
  font-size: 24px;
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
  border-width: 2px;
  border-color: #DEB887;
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