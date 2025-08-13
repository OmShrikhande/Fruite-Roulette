import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
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
      <StatusBar barStyle="light-content" backgroundColor="#1a3a52" translucent />
      
      {/* Background gradient matching the image */}
      <BackgroundGradient
        colors={['#1a3a52', '#2d5016', '#4a7c59', '#2d5016', '#1a3a52']}
        locations={[0, 0.3, 0.5, 0.7, 1]}
      />
      
      {/* Top HUD Bar */}
      <HUDSection>
        <TopHUDBar balance={balance} />
      </HUDSection>

      {/* Central Game Board */}
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
  background-color: #1a3a52;
`;

const BackgroundGradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const HUDSection = styled.View`
  height: ${height * 0.12}px;
  z-index: 10;
`;

const GameBoardSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ControlSection = styled.View`
  padding-bottom: 10px;
  padding-horizontal: 8px;
  z-index: 10;
`;

export default PixelPerfectRouletteScreen;