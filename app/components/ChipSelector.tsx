import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CHIP_VALUES } from '../constants/GameConstants';

interface ChipSelectorProps {
  selectedChip: number;
  onSelectChip: (value: number) => void;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({
  selectedChip,
  onSelectChip,
}) => {
  const formatChipValue = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000}K`;
    }
    return value.toString();
  };

  return (
    <View style={styles.container}>
      {CHIP_VALUES.map((value) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.chip,
            selectedChip === value && styles.selectedChip,
          ]}
          onPress={() => onSelectChip(value)}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.chipText,
            selectedChip === value && styles.selectedChipText,
          ]}>
            {formatChipValue(value)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  chip: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2D3436',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F39C12',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  selectedChip: {
    backgroundColor: '#F39C12',
    borderColor: '#FFF',
    transform: [{ scale: 1.1 }],
  },
  chipText: {
    color: '#F39C12',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedChipText: {
    color: '#FFF',
  },
});