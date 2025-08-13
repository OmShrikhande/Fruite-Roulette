import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { TopHUDBar } from '../components/game/TopHUDBar';
import { CentralGameBoard } from '../components/game/CentralGameBoard';
import { BottomControlPanel } from '../components/game/BottomControlPanel';

const { width, height } = Dimensions.get('window');

const PixelPerfectRouletteScreen: React.FC = () => {
  const [selectedChip, setSelectedChip] = useState(1000); // Default to 1K chip (highlighted)
  const [balance, setBalance] = useState(0);
  const [timer, setTimer] = useState(39);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#0A2A45" translucent />
      
      {/* Top HUD Bar - ~10% of screen height */}
      <HUDSection>
        <TopHUDBar balance={balance} />
      </HUDSection>

      {/* Central Game Board - Main area */}
      <GameBoardSection>
        <CentralGameBoard timer={timer} />
      </GameBoardSection>

      {/* Bottom Control Panel */}
      <ControlSection>
        <BottomControlPanel 
          selectedChip={selectedChip}
          onSelectChip={setSelectedChip}
        />
      </ControlSection>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #0A2A45;
`;

const HUDSection = styled.View`
  height: ${height * 0.1}px;
  background-color: #0A2A45;
`;

const GameBoardSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0A2A45;
`;

const ControlSection = styled.View`
  padding-bottom: 20px;
  padding-horizontal: 16px;
`;

export default PixelPerfectRouletteScreen;