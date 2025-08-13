import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface BettingControlsProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
  onPlaceBet: (fruit: string, amount: number) => void;
  selectedBets: { [key: string]: number };
  gamePhase: 'betting' | 'spinning' | 'result';
  balance: number;
}

// Exact fruit sequence from bottom scrollable row
const SCROLLABLE_FRUITS = [
  { emoji: '🍊', name: 'Orange' },
  { emoji: '🥝', name: 'Kiwi' },
  { emoji: '🍎', name: 'Apple' },
  { emoji: '🍇', name: 'Grape' },
  { emoji: '🍌', name: 'Banana' },
];

// Exact betting chips as shown
const BETTING_CHIPS = [
  { value: 10, label: '10', color: '#E8E8E8', textColor: '#000000', borderColor: '#CCCCCC' },
  { value: 100, label: '100', color: '#FF8C00', textColor: '#FFFFFF', borderColor: '#FF6600' },
  { value: 1000, label: '1K', color: '#4169E1', textColor: '#FFFFFF', borderColor: '#1E90FF' },
  { value: 5000, label: '5K', color: '#32CD32', textColor: '#FFFFFF', borderColor: '#228B22' },
  { value: 50000, label: '50K', color: '#DC143C', textColor: '#FFFFFF', borderColor: '#B22222' },
];

export const BettingControls: React.FC<BettingControlsProps> = ({
  selectedChip,
  onSelectChip,
  onPlaceBet,
  selectedBets,
  gamePhase,
  balance,
}) => {
  const [showBetSummary, setShowBetSummary] = useState(false);

  const handleFruitBet = (fruit: string) => {
    if (gamePhase !== 'betting') {
      Alert.alert('Betting Closed', 'You can only place bets during the betting phase.');
      return;
    }

    if (selectedChip > balance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance for this bet.');
      return;
    }

    onPlaceBet(fruit, selectedChip);
  };

  const getTotalBets = () => {
    return Object.values(selectedBets).reduce((sum, bet) => sum + bet, 0);
  };

  const clearAllBets = () => {
    if (gamePhase !== 'betting') return;
    
    Object.keys(selectedBets).forEach(fruit => {
      onPlaceBet(fruit, -selectedBets[fruit]);
    });
  };

  return (
    <Container>
      {/* Betting Summary Bar */}
      <BettingSummaryBar>
        <SummaryItem>
          <SummaryLabel>Total Bets:</SummaryLabel>
          <SummaryValue>${getTotalBets().toLocaleString()}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>Balance:</SummaryLabel>
          <SummaryValue>${balance.toLocaleString()}</SummaryValue>
        </SummaryItem>
        {gamePhase === 'betting' && (
          <ClearButton onPress={clearAllBets}>
            <ClearButtonText>Clear All</ClearButtonText>
          </ClearButton>
        )}
      </BettingSummaryBar>

      {/* Top row: Fruit betting buttons */}
      <TopRow>
        <FruitBettingArea>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ 
              alignItems: 'center', 
              paddingHorizontal: 8 
            }}
          >
            {SCROLLABLE_FRUITS.map((fruit, index) => {
              const betAmount = selectedBets[fruit.emoji] || 0;
              const isDisabled = gamePhase !== 'betting';
              
              return (
                <FruitBetButton 
                  key={index}
                  onPress={() => handleFruitBet(fruit.emoji)}
                  disabled={isDisabled}
                  style={{
                    opacity: isDisabled ? 0.6 : 1,
                    borderColor: betAmount > 0 ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
                    borderWidth: betAmount > 0 ? 3 : 1,
                  }}
                >
                  <FruitEmoji>{fruit.emoji}</FruitEmoji>
                  <FruitName>{fruit.name}</FruitName>
                  {betAmount > 0 && (
                    <BetAmountBadge>
                      <BetAmountText>${betAmount}</BetAmountText>
                    </BetAmountBadge>
                  )}
                </FruitBetButton>
              );
            })}
          </ScrollView>
        </FruitBettingArea>
      </TopRow>

      {/* Bottom row: Chip selection and controls */}
      <BottomRow>
        {/* Quick bet buttons */}
        <QuickBetSection>
          <QuickBetButton 
            onPress={() => onSelectChip(100)}
            disabled={gamePhase !== 'betting'}
          >
            <QuickBetText>Min</QuickBetText>
          </QuickBetButton>
          <QuickBetButton 
            onPress={() => onSelectChip(balance)}
            disabled={gamePhase !== 'betting'}
          >
            <QuickBetText>Max</QuickBetText>
          </QuickBetButton>
        </QuickBetSection>

        {/* 5 poker chips */}
        <ChipsArea>
          {BETTING_CHIPS.map((chip) => {
            const isSelected = selectedChip === chip.value;
            const isDisabled = gamePhase !== 'betting' || chip.value > balance;
            
            return (
              <ChipButton
                key={chip.value}
                onPress={() => onSelectChip(chip.value)}
                disabled={isDisabled}
                style={{
                  shadowColor: isSelected ? chip.borderColor : '#000',
                  shadowOpacity: isSelected ? 0.8 : 0.3,
                  shadowRadius: isSelected ? 8 : 3,
                  elevation: isSelected ? 8 : 3,
                  opacity: isDisabled ? 0.5 : 1,
                }}
              >
                <ChipGradient
                  colors={[chip.color, chip.color]}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: isSelected ? 4 : 2,
                    borderColor: isSelected ? '#FFD700' : chip.borderColor,
                  }}
                >
                  <ChipLabel style={{ color: chip.textColor }}>
                    {chip.label}
                  </ChipLabel>
                  {isSelected && (
                    <SelectedIndicator>
                      <SelectedText>✓</SelectedText>
                    </SelectedIndicator>
                  )}
                </ChipGradient>
              </ChipButton>
            );
          })}
        </ChipsArea>

        {/* Game status indicator */}
        <StatusSection>
          <StatusIndicator gamePhase={gamePhase}>
            {gamePhase === 'betting' && <StatusText>🎯 BETTING</StatusText>}
            {gamePhase === 'spinning' && <StatusText>🎰 SPINNING</StatusText>}
            {gamePhase === 'result' && <StatusText>🏆 RESULT</StatusText>}
          </StatusIndicator>
        </StatusSection>
      </BottomRow>
    </Container>
  );
};

const Container = styled.View`
  background-color: #1a3a52;
  padding: 12px;
  border-top-width: 2px;
  border-top-color: #FFD700;
`;

const BettingSummaryBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 12px;
  border: 1px solid #FFD700;
`;

const SummaryItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SummaryLabel = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  margin-right: 4px;
`;

const SummaryValue = styled.Text`
  color: #FFD700;
  font-size: 14px;
  font-weight: bold;
  font-family: monospace;
`;

const ClearButton = styled.TouchableOpacity`
  background-color: #FF4444;
  padding: 6px 12px;
  border-radius: 12px;
`;

const ClearButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
`;

const TopRow = styled.View`
  margin-bottom: 12px;
`;

const FruitBettingArea = styled.View`
  height: 80px;
`;

const FruitBetButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 6px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 35px;
  position: relative;
`;

const FruitEmoji = styled.Text`
  font-size: 28px;
  margin-bottom: 2px;
`;

const FruitName = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: bold;
`;

const BetAmountBadge = styled.View`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #FFD700;
  border-radius: 10px;
  padding: 2px 6px;
`;

const BetAmountText = styled.Text`
  color: #000000;
  font-size: 8px;
  font-weight: bold;
`;

const BottomRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const QuickBetSection = styled.View`
  flex-direction: column;
  gap: 4px;
`;

const QuickBetButton = styled.TouchableOpacity`
  background-color: rgba(30, 60, 90, 0.8);
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(100, 150, 200, 0.4);
`;

const QuickBetText = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: bold;
`;

const ChipsArea = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-horizontal: 12px;
`;

const ChipButton = styled.TouchableOpacity`
  shadow-offset: 0px 2px;
  position: relative;
`;

const ChipGradient = styled(LinearGradient)`
  position: relative;
`;

const ChipLabel = styled.Text`
  font-size: 12px;
  font-weight: bold;
  font-family: monospace;
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 1px;
`;

const SelectedIndicator = styled.View`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background-color: #00FF00;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border: 2px solid #FFFFFF;
`;

const SelectedText = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: bold;
`;

const StatusSection = styled.View`
  align-items: center;
`;

const StatusIndicator = styled.View<{ gamePhase: string }>`
  background-color: ${props => 
    props.gamePhase === 'betting' ? '#00AA00' :
    props.gamePhase === 'spinning' ? '#FF8C00' : '#FFD700'
  };
  padding: 8px 12px;
  border-radius: 20px;
  border: 2px solid #FFFFFF;
`;

const StatusText = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  font-family: monospace;
`;