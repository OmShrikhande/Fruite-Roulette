import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


interface BettingChipsPanelProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
  onSpin: () => void;
  canSpin: boolean;
}

const CHIP_VALUES = [
  { value: 10, color: '#6C757D', label: '10' },
  { value: 100, color: '#FF8C00', label: '100' },
  { value: 1000, color: '#4169E1', label: '1K' },
  { value: 5000, color: '#32CD32', label: '5K' },
  { value: 50000, color: '#DC143C', label: '50K' },
];

export const BettingChipsPanel: React.FC<BettingChipsPanelProps> = ({
  selectedChip,
  onSelectChip,
  onSpin,
  canSpin,
}) => {
  return (
    <View style={styles.container}>
      {/* Left: Circular blue refresh/spin icon */}
      <TouchableOpacity style={styles.spinButton} onPress={onSpin} disabled={!canSpin}>
        <LinearGradient
          colors={canSpin ? ['#4A90E2', '#357ABD'] : ['#95A5A6', '#7F8C8D']}
          style={styles.spinGradient}
        >
          <Text style={styles.spinIcon}>🔄</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Navigation arrows */}
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>◀</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>▶</Text>
      </TouchableOpacity>

      {/* Help/info icon */}
      <TouchableOpacity style={styles.helpButton}>
        <LinearGradient colors={['#4A90E2', '#357ABD']} style={styles.helpGradient}>
          <Text style={styles.helpButtonText}>?</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Center: 5 poker chips with exact designs and values */}
      <View style={styles.chipsContainer}>
        {CHIP_VALUES.map((chip) => {
          const isSelected = selectedChip === chip.value;
          const isGlowing = isSelected && chip.value === 1000; // 1K chip glows when selected
          return (
            <TouchableOpacity
              key={chip.value}
              style={[styles.chipButton, isSelected && styles.selectedChip, isGlowing && styles.glowingChip]}
              onPress={() => onSelectChip(chip.value)}
            >
              <LinearGradient
                colors={chip.value === 1000 ? ['#4169E1', '#00BFFF'] : [chip.color, chip.color]}
                style={styles.chipGradient}
              >
                <Text style={[
                  styles.chipText,
                  chip.value === 10 && { color: '#000' },
                  chip.value === 1000 && styles.chipTextGlow
                ]}>
                  {chip.label}
                </Text>
                {isSelected && (
                  <View style={styles.selectedIndicator} />
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Far right: Menu icon (three stacked horizontal lines) */}
      <TouchableOpacity style={styles.menuButton}>
        <View style={styles.menuIcon}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
    width: '100%',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginLeft: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLine: {
    width: 20,
    height: 3,
    backgroundColor: '#FFF',
    borderRadius: 2,
    marginVertical: 2,
  },
  chipTextGlow: {
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  helpButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  chipsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  chipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  glowingChip: {
    shadowColor: '#4169E1',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },
  chipGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    position: 'relative',
  },
  chipText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  selectedIndicator: {
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
  spinButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  spinButtonDisabled: {
    opacity: 0.6,
  },
  spinGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinIcon: {
    fontSize: 18,
  },
});