import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CHIP_VALUES } from '../constants/GameConstants';

interface ChipSelectorProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({
  selectedChip,
  onSelectChip
}) => {
  const formatChipValue = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000}K`;
    }
    return value.toString();
  };

  return (
    <View style={styles.panelContainer}>
      {/* Spin/refresh icon */}
      <TouchableOpacity style={styles.spinIcon}>
        <Text style={styles.iconText}>🔄</Text>
      </TouchableOpacity>
      {/* Left arrow */}
      <TouchableOpacity style={styles.arrowIcon}>
        <Text style={styles.iconText}>◀️</Text>
      </TouchableOpacity>
      {/* Help icon */}
      <TouchableOpacity style={styles.helpIcon}>
        <Text style={styles.iconText}>❓</Text>
      </TouchableOpacity>
      {/* Chips */}
      <View style={styles.chipsRow}>
        {CHIP_VALUES.map((chip, idx) => {
          let chipColor = {} as { backgroundColor?: string };
          if (chip.value === 10) chipColor = { backgroundColor: '#B0B0B0' };
          if (chip.value === 100) chipColor = { backgroundColor: '#FF9800' };
          if (chip.value === 1000) chipColor = { backgroundColor: '#2196F3' };
          if (chip.value === 5000) chipColor = { backgroundColor: '#43A047' };
          if (chip.value === 50000) chipColor = { backgroundColor: '#E53935' };
          return (
            <TouchableOpacity
              key={chip.value}
              style={[
                styles.chip,
                chipColor,
                chip.value === 1000 && selectedChip === chip.value ? styles.chipGlow : null,
              ]}
              onPress={() => onSelectChip(chip.value)}
              activeOpacity={0.8}
            >
              <Text style={styles.chipText}>{formatChipValue(chip.value)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Right arrow */}
      <TouchableOpacity style={styles.arrowIcon}>
        <Text style={styles.iconText}>▶️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  panelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#174A7E',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  spinIcon: {
    marginRight: 8,
  },
  arrowIcon: {
    marginHorizontal: 4,
  },
  helpIcon: {
    marginHorizontal: 4,
  },
  iconText: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  chip: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderWidth: 2,
    borderColor: '#FFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chipGray: {
    backgroundColor: '#B0B0B0',
  },
  chipOrange: {
    backgroundColor: '#FF9800',
  },
  chipBlue: {
    backgroundColor: '#2196F3',
  },
  chipGreen: {
    backgroundColor: '#43A047',
  },
  chipRed: {
    backgroundColor: '#E53935',
  },
  chipGlow: {
    shadowColor: '#00BFFF',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    borderColor: '#00BFFF',
  },
  chipText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});