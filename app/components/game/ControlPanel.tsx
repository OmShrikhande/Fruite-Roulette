import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';

interface ControlPanelProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
  onSpin: () => void;
  canSpin: boolean;
  isSpinning: boolean;
  totalBets: number;
}

const CHIP_VALUES = [10, 100, 1000, 5000, 50000];
const FRUIT_SELECTION = ['🍎', '🍇', '🍒', '🥝', '🍊', '🍓', '🍌', '🍉', '🍑', '🥭', '🍍', '🫐'];

const getChipColor = (value: number) => {
  switch (value) {
    case 10: return ['#6C757D', '#495057'];
    case 100: return ['#FF8C00', '#FF6B00'];
    case 1000: return ['#4169E1', '#1E3A8A'];
    case 5000: return ['#32CD32', '#228B22'];
    case 50000: return ['#DC143C', '#B91C1C'];
    default: return ['#6C757D', '#495057'];
  }
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedChip,
  onSelectChip,
  onSpin,
  canSpin,
  isSpinning,
  totalBets,
}) => {
  const spinButtonScale = useSharedValue(1);
  const glowAnimation = useSharedValue(0);

  React.useEffect(() => {
    glowAnimation.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  React.useEffect(() => {
    if (canSpin && !isSpinning) {
      spinButtonScale.value = withRepeat(
        withSpring(1.1, { damping: 2, stiffness: 100 }),
        -1,
        true
      );
    } else {
      spinButtonScale.value = withSpring(1);
    }
  }, [canSpin, isSpinning]);

  const spinButtonAnimatedStyle = useAnimatedStyle(() => {
    const glow = canSpin && !isSpinning ? glowAnimation.value : 0;
    return {
      transform: [{ scale: spinButtonScale.value }],
      shadowOpacity: 0.3 + glow * 0.4,
    };
  });

  const handleSpinPress = () => {
    spinButtonScale.value = withSpring(0.9, {}, () => {
      spinButtonScale.value = withSpring(1);
    });
    onSpin();
  };

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)']}
      style={styles.container}
    >
      {/* Fruit Selection Bar */}
      <View style={styles.fruitBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>◀</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.helpButton}>
          <LinearGradient colors={['#4A90E2', '#357ABD']} style={styles.helpGradient}>
            <Text style={styles.helpButtonText}>?</Text>
          </LinearGradient>
        </TouchableOpacity>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.fruitScroll}
          contentContainerStyle={styles.fruitScrollContent}
        >
          {FRUIT_SELECTION.map((fruit, index) => (
            <TouchableOpacity key={index} style={styles.fruitButton}>
              <View style={styles.fruitButtonBackground}>
                <Text style={styles.fruitButtonText}>{fruit}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Chip Selector and Spin Button */}
      <View style={styles.chipSelector}>
        {/* Spin Button */}
        <Animated.View style={[spinButtonAnimatedStyle]}>
          <TouchableOpacity
            style={[
              styles.spinButton,
              !canSpin && styles.spinButtonDisabled,
              isSpinning && styles.spinButtonSpinning,
            ]}
            onPress={handleSpinPress}
            disabled={!canSpin || isSpinning}
          >
            <LinearGradient
              colors={
                isSpinning 
                  ? ['#FF6B6B', '#FF5252']
                  : canSpin 
                    ? ['#4ECDC4', '#44A08D'] 
                    : ['#95A5A6', '#7F8C8D']
              }
              style={styles.spinButtonGradient}
            >
              <Text style={styles.spinButtonIcon}>
                {isSpinning ? '⏸️' : '🎰'}
              </Text>
              <Text style={styles.spinButtonText}>
                {isSpinning ? 'SPINNING' : canSpin ? 'SPIN' : 'PLACE BETS'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Chip Values */}
        <View style={styles.chipContainer}>
          {CHIP_VALUES.map((value) => {
            const isSelected = selectedChip === value;
            const colors = getChipColor(value);
            
            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.chipButton,
                  isSelected && styles.selectedChip,
                ]}
                onPress={() => onSelectChip(value)}
              >
                <LinearGradient
                  colors={colors}
                  style={styles.chipGradient}
                >
                  <Text style={styles.chipButtonText}>
                    {value >= 1000 ? `${value/1000}K` : value}
                  </Text>
                  {isSelected && (
                    <View style={styles.chipSelectedIndicator} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Menu Button */}
        <TouchableOpacity style={styles.menuButton}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            style={styles.menuGradient}
          >
            <Text style={styles.menuButtonText}>☰</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bet Summary */}
      {totalBets > 0 && (
        <View style={styles.betSummary}>
          <LinearGradient
            colors={['rgba(255, 193, 7, 0.2)', 'rgba(255, 193, 7, 0.1)']}
            style={styles.betSummaryGradient}
          >
            <Text style={styles.betSummaryText}>
              Total Bets: ${totalBets.toLocaleString()}
            </Text>
          </LinearGradient>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 10,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fruitBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  helpButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  helpGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fruitScroll: {
    flex: 1,
  },
  fruitScrollContent: {
    alignItems: 'center',
    gap: 8,
  },
  fruitButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fruitButtonBackground: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  fruitButtonText: {
    fontSize: 18,
  },
  chipSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  spinButton: {
    width: 65,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  spinButtonDisabled: {
    opacity: 0.6,
  },
  spinButtonSpinning: {
    shadowColor: '#FF6B6B',
  },
  spinButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinButtonIcon: {
    fontSize: 12,
    marginBottom: 1,
  },
  spinButtonText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  chipContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 4,
    justifyContent: 'center',
  },
  chipButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedChip: {
    shadowColor: '#FFD700',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  chipGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    position: 'relative',
  },
  chipButtonText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  chipSelectedIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD700',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  menuGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  betSummary: {
    alignItems: 'center',
  },
  betSummaryGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.3)',
  },
  betSummaryText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});