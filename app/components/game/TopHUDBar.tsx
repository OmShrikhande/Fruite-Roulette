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
      {/* Left Section: Blue logo with balance */}
      <LeftSection>
        <LogoIcon>💠</LogoIcon>
        <BalanceText>{balance}</BalanceText>
      </LeftSection>

      {/* Center Icons: Coin, Trophy, Clock, Speaker - exactly as in image */}
      <CenterIcons>
        <IconButton>
          <CoinIcon>Ⓔ</CoinIcon>
        </IconButton>
        <IconButton>
          <TrophyIcon>🏆</TrophyIcon>
        </IconButton>
        <IconButton>
          <ClockIcon>🕐</ClockIcon>
        </IconButton>
        <IconButton>
          <SpeakerIcon>🔊</SpeakerIcon>
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
  background-color: #1a3a52;
  padding-horizontal: 20px;
  padding-vertical: 12px;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(30, 60, 90, 0.8);
  padding-horizontal: 12px;
  padding-vertical: 6px;
  border-radius: 15px;
  border: 1px solid rgba(100, 150, 200, 0.3);
`;

const LogoIcon = styled.Text`
  font-size: 24px;
  margin-right: 8px;
  color: #4A90E2;
`;

const BalanceText = styled.Text`
  color: #FFFFFF;
  font-size: 18px;
  font-weight: bold;
`;

const CenterIcons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const IconButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(30, 60, 90, 0.8);
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(100, 150, 200, 0.3);
`;

const CoinIcon = styled.Text`
  font-size: 18px;
  color: #FFD700;
  font-weight: bold;
`;

const TrophyIcon = styled.Text`
  font-size: 18px;
`;

const ClockIcon = styled.Text`
  font-size: 18px;
`;

const SpeakerIcon = styled.Text`
  font-size: 18px;
`;