import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface ExactTopHUDProps {
  balance: number;
}

export const ExactTopHUD: React.FC<ExactTopHUDProps> = ({ balance }) => {
  return (
    <Container>
      {/* Left: Blue logo with white stripes and balance */}
      <LeftSection>
        <LogoContainer>
          <LogoIcon>💠</LogoIcon>
        </LogoContainer>
        <BalanceText>{balance}</BalanceText>
      </LeftSection>

      {/* Right: Four circular icons */}
      <RightSection>
        <IconButton>
          <GoldCoinIcon>Ⓔ</GoldCoinIcon>
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
      </RightSection>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #1a3a52;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  height: 60px;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(30, 60, 90, 0.6);
  padding-horizontal: 12px;
  padding-vertical: 6px;
  border-radius: 12px;
  border: 1px solid rgba(100, 150, 200, 0.4);
`;

const LogoContainer = styled.View`
  margin-right: 8px;
`;

const LogoIcon = styled.Text`
  font-size: 20px;
  color: #4A90E2;
`;

const BalanceText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  font-family: monospace;
`;

const RightSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(30, 60, 90, 0.6);
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(100, 150, 200, 0.4);
`;

const GoldCoinIcon = styled.Text`
  font-size: 16px;
  color: #FFD700;
  font-weight: bold;
`;

const TrophyIcon = styled.Text`
  font-size: 16px;
`;

const ClockIcon = styled.Text`
  font-size: 16px;
`;

const SpeakerIcon = styled.Text`
  font-size: 16px;
`;