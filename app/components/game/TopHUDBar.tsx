import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

interface TopHUDBarProps {
  balance: number;
}

export const TopHUDBar: React.FC<TopHUDBarProps> = ({ balance }) => {
  return (
    <Container>
      {/* Left Section: Light blue diamond icon with balance */}
      <LeftSection>
        <DiamondIcon>💎</DiamondIcon>
        <BalanceText>{balance}</BalanceText>
      </LeftSection>

      {/* Center Icons: Gold coin, Trophy, Clock, Speaker */}
      <CenterIcons>
        <IconButton>
          <IconText>🪙</IconText>
        </IconButton>
        <IconButton>
          <IconText>🏆</IconText>
        </IconButton>
        <IconButton>
          <IconText>🕐</IconText>
        </IconButton>
        <IconButton>
          <IconText>🔊</IconText>
        </IconButton>
      </CenterIcons>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #0A2A45;
  padding-horizontal: 20px;
  padding-vertical: 16px;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(74, 144, 226, 0.15);
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 20px;
  border: 1px solid rgba(74, 144, 226, 0.4);
`;

const DiamondIcon = styled.Text`
  font-size: 20px;
  margin-right: 8px;
  color: #87CEEB;
`;

const BalanceText = styled.Text`
  color: #FFFFFF;
  font-size: 18px;
  font-weight: bold;
`;

const CenterIcons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.1);
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const IconText = styled.Text`
  font-size: 20px;
`;