import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BettingChipsPanelProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
  onSpin: () => void;
  canSpin: boolean;
}

// Exact chip designs and values as specified
const CHIP_VALUES = [
  { value: 10, color: '#C0C0C0', label: '10' }, // Gray chip
  { value: 100, color: '#FF8C00', label: '100' }, // Orange chip
  { value: 1000, color: '#4169E1', label: '1K', glowing: true }, // Blue glowing chip (active selection)
  { value: 5000, color: '#32CD32', label: '5K' }, // Green chip
  { value: 50000, color: '#DC143C', label: '50K' }, // Red chip
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

      {/* Next: Navigation arrows (left/right) */}
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>◀</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>▶</Text>
      </TouchableOpacity>

      {/* Next: Blue question mark icon in rounded square (help/info) */}
      <TouchableOpacity style={styles.helpButton}>
        <LinearGradient colors={['#4A90E2', '#357ABD']} style={styles.helpGradient}>
          <Text style={styles.helpButtonText}>?</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Center: 5 poker chips with exact designs and values */}
      <View style={styles.chipsContainer}>
        {CHIP_VALUES.map((chip) => {
          const isSelected = selectedChip === chip.value;
          const isGlowing = chip.glowing && isSelected;
          return (
            <TouchableOpacity
              key={chip.value}
              style={[styles.chipButton, isSelected && styles.selectedChip, isGlowing && styles.glowingChip]}
              onPress={() => onSelectChip(chip.value)}
            >
              <LinearGradient
                colors={chip.glowing ? ['#4169E1', '#00BFFF'] : [chip.color, chip.color]}
                style={styles.chipGradient}
              >
                <Text style={[
                  styles.chipText,
                  chip.value === 10 && { color: '#000' },
                  chip.glowing && styles.chipTextGlow
                ]}>
                  {chip.label}
                </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    gap: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  spinButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  spinGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinIcon: {
    fontSize: 20,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  helpGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chipsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  chipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedChip: {
    shadowColor: '#FFD700',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  glowingChip: {
    shadowColor: '#4169E1',
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 12,
  },
  chipGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  chipText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontFamily: 'monospace',
  },
  chipTextGlow: {
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLine: {
    width: 18,
    height: 2.5,
    backgroundColor: '#FFF',
    borderRadius: 2,
    marginVertical: 2,
  },
});