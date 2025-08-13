import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface BottomControlPanelProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
}

// Same fruit sequence as outer track
const FRUITS = ['🍌', '🍇', '🍉', '🍊', '🍒', '🍎', '🍓', '🍋'];

// Exact betting chips in specified order and style
const BETTING_CHIPS = [
  { value: 10, label: '10', color: '#808080' }, // Gray chip
  { value: 100, label: '100', color: '#FF8C00' }, // Orange chip
  { value: 1000, label: '1K', color: '#4169E1', highlighted: true }, // Blue chip (highlighted as selected)
  { value: 5000, label: '5K', color: '#32CD32' }, // Green chip
  { value: 50000, label: '50K', color: '#DC143C' }, // Red chip
];

export const BottomControlPanel: React.FC<BottomControlPanelProps> = ({
  selectedChip,
  onSelectChip,
}) => {
  return (
    <Container>
      {/* First Row: Horizontally scrollable row of fruit icons */}
      <FruitRow>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {FRUITS.map((fruit, index) => (
            <FruitButton key={index}>
              <FruitText>{fruit}</FruitText>
            </FruitButton>
          ))}
        </ScrollView>
      </FruitRow>

      {/* Second Row: Controls and betting chips */}
      <ControlRow>
        {/* Leftmost: Blue circular refresh/spin icon */}
        <SpinButton>
          <LinearGradient
            colors={['#4A90E2', '#357ABD']}
            style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 24, 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <SpinIcon>🔄</SpinIcon>
          </LinearGradient>
        </SpinButton>

        {/* Next: 5 betting chips in exact order & style */}
        <ChipsContainer>
          {BETTING_CHIPS.map((chip) => {
            const isSelected = selectedChip === chip.value;
            const isHighlighted = chip.highlighted && isSelected;
            
            return (
              <ChipButton
                key={chip.value}
                onPress={() => onSelectChip(chip.value)}
                style={{
                  shadowColor: isHighlighted ? '#4169E1' : '#000',
                  shadowOpacity: isHighlighted ? 0.8 : 0.3,
                  shadowRadius: isHighlighted ? 8 : 4,
                  elevation: isHighlighted ? 8 : 4,
                }}
              >
                <ChipGradient
                  colors={[chip.color, chip.color]}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 3,
                    borderColor: '#FFFFFF',
                  }}
                >
                  <ChipText 
                    style={{ 
                      color: chip.value === 10 ? '#000000' : '#FFFFFF',
                      textShadowColor: isHighlighted ? '#00BFFF' : 'rgba(0,0,0,0.7)',
                      textShadowRadius: isHighlighted ? 4 : 2,
                    }}
                  >
                    {chip.label}
                  </ChipText>
                </ChipGradient>
              </ChipButton>
            );
          })}
        </ChipsContainer>

        {/* Rightmost: Hamburger menu icon */}
        <MenuButton>
          <MenuLine />
          <MenuLine />
          <MenuLine />
        </MenuButton>
      </ControlRow>
    </Container>
  );
};

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 8px;
  elevation: 8;
`;

const FruitRow = styled.View`
  height: 60px;
  margin-bottom: 16px;
`;

const FruitButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FruitText = styled.Text`
  font-size: 24px;
`;

const ControlRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SpinButton = styled.TouchableOpacity`
  shadow-color: #4A90E2;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.5;
  shadow-radius: 6px;
  elevation: 6;
`;

const SpinIcon = styled.Text`
  font-size: 20px;
`;

const ChipsContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-horizontal: 20px;
`;

const ChipButton = styled.TouchableOpacity`
  shadow-offset: 0px 3px;
`;

const ChipGradient = styled(LinearGradient)``;

const ChipText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  font-family: monospace;
  text-shadow-offset: 1px 1px;
`;

const MenuButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

const MenuLine = styled.View`
  width: 18px;
  height: 2.5px;
  background-color: #FFFFFF;
  border-radius: 2px;
  margin-vertical: 2px;
`;