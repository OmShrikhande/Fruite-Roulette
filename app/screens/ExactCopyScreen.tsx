import React, { useState } from 'react';
import { View, StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import ExactTopHUD from '../components/game/ExactTopHUD';
import ExactGameBoard from '../components/game/ExactGameBoard';
import ExactBottomControls from '../components/game/ExactBottomControls';

const { width, height } = Dimensions.get('window');

const ExactCopyScreen: React.FC = () => {
  const [selectedChip, setSelectedChip] = useState(1000); // 1K chip selected (blue)
  const [balance, setBalance] = useState(0);
  const [timer, setTimer] = useState(39);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a52" translucent={false} />
      
      {/* Exact background matching the image */}
      <BackgroundGradient
        colors={['#1a3a52', '#2d5016', '#4a7c59', '#2d5016', '#1a3a52']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Top HUD Bar */}
      <HUDContainer>
        <ExactTopHUD balance={balance} />
      </HUDContainer>

      {/* Central Game Board */}
      <GameContainer>
        <ExactGameBoard timer={timer} />
      </GameContainer>

      {/* Bottom Controls */}
      <ControlsContainer>
        <ExactBottomControls 
          selectedChip={selectedChip}
          onSelectChip={setSelectedChip}
        />
      </ControlsContainer>
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

const HUDContainer = styled.View`
  height: 60px;
  z-index: 10;
`;

const GameContainer = styled.View`
  flex: 1;
  z-index: 5;
`;

const ControlsContainer = styled.View`
  z-index: 10;
`;

export default ExactCopyScreen;