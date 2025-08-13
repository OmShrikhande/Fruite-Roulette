import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface BottomControlPanelProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
}

// Exact fruit sequence as shown in the bottom row of the image
const FRUITS = ['🍊', '🥝', '🍎', '🍇', '🍌', '🥝', '🍇', '🥝', '🍊', '🥝', '🍊'];

// Exact betting chips as shown in image
const BETTING_CHIPS = [
  { value: 10, label: '10', color: '#E8E8E8', textColor: '#000000', borderColor: '#CCCCCC' },
  { value: 100, label: '100', color: '#FF8C00', textColor: '#FFFFFF', borderColor: '#FF6600' },
  { value: 1000, label: '1K', color: '#4169E1', textColor: '#FFFFFF', borderColor: '#1E90FF', highlighted: true },
  { value: 5000, label: '5K', color: '#32CD32', textColor: '#FFFFFF', borderColor: '#228B22' },
  { value: 50000, label: '50K', color: '#DC143C', textColor: '#FFFFFF', borderColor: '#B22222' },
];

export const BottomControlPanel: React.FC<BottomControlPanelProps> = ({
  selectedChip,
  onSelectChip,
}) => {
  return (
    <Container>
      {/* Top row: Navigation arrows and fruit row */}
      <TopRow>
        <NavButton>
          <NavArrow>◀</NavArrow>
        </NavButton>
        
        <HelpButton>
          <HelpText>?</HelpText>
        </HelpButton>
        
        <FruitScrollContainer>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
          >
            {FRUITS.map((fruit, index) => (
              <FruitButton key={index}>
                <FruitText>{fruit}</FruitText>
              </FruitButton>
            ))}
          </ScrollView>
        </FruitScrollContainer>

        <NavButton>
          <NavArrow>▶</NavArrow>
        </NavButton>
      </TopRow>

      {/* Bottom row: Spin button, chips, and menu */}
      <BottomRow>
        {/* Left: Blue circular refresh/spin icon */}
        <SpinButton>
          <LinearGradient
            colors={['#4A90E2', '#357ABD']}
            style={{ 
              width: 52, 
              height: 52, 
              borderRadius: 26, 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <SpinIcon>🔄</SpinIcon>
          </LinearGradient>
        </SpinButton>

        {/* Center: 5 betting chips */}
        <ChipsContainer>
          {BETTING_CHIPS.map((chip) => {
            const isSelected = selectedChip === chip.value;
            
            return (
              <ChipButton
                key={chip.value}
                onPress={() => onSelectChip(chip.value)}
                style={{
                  shadowColor: isSelected ? chip.borderColor : '#000',
                  shadowOpacity: isSelected ? 0.8 : 0.3,
                  shadowRadius: isSelected ? 8 : 4,
                  elevation: isSelected ? 8 : 4,
                }}
              >
                <ChipGradient
                  colors={[chip.color, chip.color]}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 3,
                    borderColor: chip.borderColor,
                  }}
                >
                  <ChipText style={{ color: chip.textColor }}>
                    {chip.label}
                  </ChipText>
                </ChipGradient>
              </ChipButton>
            );
          })}
        </ChipsContainer>

        {/* Right: Hamburger menu */}
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
  background-color: rgba(26, 58, 82, 0.95);
  border-radius: 0px;
  padding: 12px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 8px;
  elevation: 8;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  height: 50px;
`;

const NavButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: rgba(30, 60, 90, 0.8);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(100, 150, 200, 0.3);
`;

const NavArrow = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

const HelpButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: rgba(30, 60, 90, 0.8);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(100, 150, 200, 0.3);
  margin-left: 8px;
`;

const HelpText = styled.Text`
  color: #FFFFFF;
  font-size: 18px;
  font-weight: bold;
`;

const FruitScrollContainer = styled.View`
  flex: 1;
  margin-horizontal: 12px;
`;

const FruitButton = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FruitText = styled.Text`
  font-size: 26px;
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
  shadow-radius: 8px;
  elevation: 8;
`;

const SpinIcon = styled.Text`
  font-size: 22px;
`;

const ChipsContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-horizontal: 16px;
`;

const ChipButton = styled.TouchableOpacity`
  shadow-offset: 0px 3px;
`;

const ChipGradient = styled(LinearGradient)``;

const ChipText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  font-family: monospace;
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

const MenuButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: rgba(30, 60, 90, 0.8);
  border: 1px solid rgba(100, 150, 200, 0.3);
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

const MenuLine = styled.View`
  width: 20px;
  height: 3px;
  background-color: #FFFFFF;
  border-radius: 2px;
  margin-vertical: 2px;
`;