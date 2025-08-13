import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ExactBottomControlsProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
}

// Exact fruit sequence from bottom scrollable row
const SCROLLABLE_FRUITS = [
  '🍊', '🥝', '🍎', '🍇', '🍌', '🥝', '🍇', '🥝', 
  '🍊', '🥝', '🍊', '🍎', '🍇', '🍌'
];

// Exact betting chips as shown
const BETTING_CHIPS = [
  { value: 10, label: '10', color: '#E8E8E8', textColor: '#000000', borderColor: '#CCCCCC' },
  { value: 100, label: '100', color: '#FF8C00', textColor: '#FFFFFF', borderColor: '#FF6600' },
  { value: 1000, label: '1K', color: '#4169E1', textColor: '#FFFFFF', borderColor: '#1E90FF' },
  { value: 5000, label: '5K', color: '#32CD32', textColor: '#FFFFFF', borderColor: '#228B22' },
  { value: 50000, label: '50K', color: '#DC143C', textColor: '#FFFFFF', borderColor: '#B22222' },
];

export const ExactBottomControls: React.FC<ExactBottomControlsProps> = ({
  selectedChip,
  onSelectChip,
}) => {
  return (
    <Container>
      {/* Top row: Navigation and fruit scroll */}
      <TopRow>
        <LeftNavButton>
          <NavArrow>◀</NavArrow>
        </LeftNavButton>
        
        <HelpButton>
          <HelpText>?</HelpText>
        </HelpButton>
        
        <FruitScrollArea>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ 
              alignItems: 'center', 
              paddingHorizontal: 8 
            }}
          >
            {SCROLLABLE_FRUITS.map((fruit, index) => (
              <FruitButton key={index}>
                <FruitEmoji>{fruit}</FruitEmoji>
              </FruitButton>
            ))}
          </ScrollView>
        </FruitScrollArea>

        <RightNavButton>
          <NavArrow>▶</NavArrow>
        </RightNavButton>
      </TopRow>

      {/* Bottom row: Spin button, chips, menu */}
      <BottomRow>
        {/* Blue spin button */}
        <SpinButton>
          <LinearGradient
            colors={['#4A90E2', '#357ABD']}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SpinIcon>🔄</SpinIcon>
          </LinearGradient>
        </SpinButton>

        {/* 5 poker chips */}
        <ChipsArea>
          {BETTING_CHIPS.map((chip) => {
            const isSelected = selectedChip === chip.value;
            return (
              <ChipButton
                key={chip.value}
                onPress={() => onSelectChip(chip.value)}
                style={{
                  shadowColor: isSelected ? chip.borderColor : '#000',
                  shadowOpacity: isSelected ? 0.8 : 0.3,
                  shadowRadius: isSelected ? 6 : 3,
                  elevation: isSelected ? 6 : 3,
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
                    borderWidth: 3,
                    borderColor: chip.borderColor,
                  }}
                >
                  <ChipLabel style={{ color: chip.textColor }}>
                    {chip.label}
                  </ChipLabel>
                </ChipGradient>
              </ChipButton>
            );
          })}
        </ChipsArea>

        {/* Hamburger menu */}
        <MenuButton>
          <MenuLine />
          <MenuLine />
          <MenuLine />
        </MenuButton>
      </BottomRow>
    </Container>
  );
};

const Container = styled.View`
  background-color: #1a3a52;
  padding: 10px;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  height: 48px;
`;

const LeftNavButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  background-color: rgba(30, 60, 90, 0.8);
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(100, 150, 200, 0.4);
`;

const HelpButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  background-color: rgba(30, 60, 90, 0.8);
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(100, 150, 200, 0.4);
  margin-left: 8px;
`;

const HelpText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

const FruitScrollArea = styled.View`
  flex: 1;
  margin-horizontal: 10px;
`;

const FruitButton = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 3px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 21px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const FruitEmoji = styled.Text`
  font-size: 24px;
`;

const RightNavButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  background-color: rgba(30, 60, 90, 0.8);
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(100, 150, 200, 0.4);
`;

const NavArrow = styled.Text`
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
`;

const BottomRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SpinButton = styled.TouchableOpacity`
  shadow-color: #4A90E2;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.6;
  shadow-radius: 6px;
  elevation: 6;
`;

const SpinIcon = styled.Text`
  font-size: 20px;
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
`;

const ChipGradient = styled(LinearGradient)``;

const ChipLabel = styled.Text`
  font-size: 12px;
  font-weight: bold;
  font-family: monospace;
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 1px;
`;

const MenuButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  background-color: rgba(30, 60, 90, 0.8);
  border: 1px solid rgba(100, 150, 200, 0.4);
`;

const MenuLine = styled.View`
  width: 18px;
  height: 2.5px;
  background-color: #FFFFFF;
  border-radius: 1px;
  margin-vertical: 1.5px;
`;