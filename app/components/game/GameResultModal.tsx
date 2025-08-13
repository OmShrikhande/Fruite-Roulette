import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Easing, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface GameResultModalProps {
  visible: boolean;
  result: {
    fruit: string;
    won: boolean;
    winAmount: number;
  } | null;
  onClose: () => void;
  onPlayAgain: () => void;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  visible,
  result,
  onClose,
  onPlayAgain,
}) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const confettiAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && result) {
      // Entry animation
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        // If won, show celebration animations
        ...(result.won ? [
          Animated.timing(confettiAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.loop(
            Animated.sequence([
              Animated.timing(pulseAnimation, {
                toValue: 1.1,
                duration: 600,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(pulseAnimation, {
                toValue: 1,
                duration: 600,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
            { iterations: 3 }
          ),
        ] : []),
      ]).start();

      // Fruit rotation animation
      Animated.loop(
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      scaleAnimation.setValue(0);
      rotateAnimation.setValue(0);
      pulseAnimation.setValue(1);
      confettiAnimation.setValue(0);
    }
  }, [visible, result]);

  if (!result) return null;

  const handleClose = () => {
    Animated.timing(scaleAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Overlay>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnimation }],
          }}
        >
          <ResultContainer>
            <LinearGradient
              colors={result.won ? ['#00AA00', '#00FF00'] : ['#AA0000', '#FF0000']}
              style={{
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
              }}
            >
              {/* Confetti effect for wins */}
              {result.won && (
                <ConfettiContainer>
                  <Animated.View
                    style={{
                      opacity: confettiAnimation,
                      transform: [
                        {
                          translateY: confettiAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 50],
                          }),
                        },
                      ],
                    }}
                  >
                    <ConfettiText>🎉 🎊 ✨ 🎉 🎊</ConfettiText>
                  </Animated.View>
                </ConfettiContainer>
              )}

              {/* Result title */}
              <Animated.View
                style={{
                  transform: [{ scale: pulseAnimation }],
                }}
              >
                <ResultTitle>
                  {result.won ? '🏆 WINNER! 🏆' : '💔 BETTER LUCK NEXT TIME 💔'}
                </ResultTitle>
              </Animated.View>

              {/* Winning fruit with rotation */}
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: rotateAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                  marginVertical: 20,
                }}
              >
                <WinningFruit>{result.fruit}</WinningFruit>
              </Animated.View>

              {/* Result details */}
              <ResultDetails>
                <DetailRow>
                  <DetailLabel>Winning Fruit:</DetailLabel>
                  <DetailValue>{result.fruit}</DetailValue>
                </DetailRow>
                
                {result.won ? (
                  <>
                    <DetailRow>
                      <DetailLabel>You Won:</DetailLabel>
                      <WinAmount>${result.winAmount.toLocaleString()}</WinAmount>
                    </DetailRow>
                    <CelebrationText>🎰 JACKPOT! 🎰</CelebrationText>
                  </>
                ) : (
                  <>
                    <DetailRow>
                      <DetailLabel>Result:</DetailLabel>
                      <LoseText>No winning bets</LoseText>
                    </DetailRow>
                    <EncouragementText>Try again! Fortune favors the bold! 🍀</EncouragementText>
                  </>
                )}
              </ResultDetails>

              {/* Action buttons */}
              <ButtonContainer>
                <ActionButton onPress={onPlayAgain}>
                  <LinearGradient
                    colors={['#FFD700', '#FF8C00']}
                    style={{
                      paddingHorizontal: 30,
                      paddingVertical: 12,
                      borderRadius: 25,
                    }}
                  >
                    <ButtonText>🎮 Play Again</ButtonText>
                  </LinearGradient>
                </ActionButton>

                <ActionButton onPress={handleClose}>
                  <LinearGradient
                    colors={['#666666', '#333333']}
                    style={{
                      paddingHorizontal: 30,
                      paddingVertical: 12,
                      borderRadius: 25,
                    }}
                  >
                    <ButtonText>📊 View Stats</ButtonText>
                  </LinearGradient>
                </ActionButton>
              </ButtonContainer>
            </LinearGradient>
          </ResultContainer>
        </Animated.View>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.View`
  width: ${width * 0.85}px;
  max-height: ${height * 0.7}px;
  shadow-color: #000;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.5;
  shadow-radius: 20px;
  elevation: 20;
`;

const ConfettiContainer = styled.View`
  position: absolute;
  top: -30px;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 10;
`;

const ConfettiText = styled.Text`
  font-size: 24px;
  text-align: center;
`;

const ResultTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 10px;
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: 2px 2px;
  text-shadow-radius: 4px;
`;

const WinningFruit = styled.Text`
  font-size: 80px;
  text-align: center;
  text-shadow-color: rgba(0, 0, 0, 0.3);
  text-shadow-offset: 3px 3px;
  text-shadow-radius: 6px;
`;

const ResultDetails = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  margin-vertical: 20px;
  width: 100%;
`;

const DetailRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DetailLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333333;
`;

const DetailValue = styled.Text`
  font-size: 24px;
`;

const WinAmount = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #00AA00;
  font-family: monospace;
`;

const LoseText = styled.Text`
  font-size: 16px;
  color: #AA0000;
  font-weight: bold;
`;

const CelebrationText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFD700;
  text-align: center;
  margin-top: 10px;
  text-shadow-color: #FF8C00;
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

const EncouragementText = styled.Text`
  font-size: 14px;
  color: #666666;
  text-align: center;
  margin-top: 10px;
  font-style: italic;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 15px;
`;

const ActionButton = styled.TouchableOpacity`
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;