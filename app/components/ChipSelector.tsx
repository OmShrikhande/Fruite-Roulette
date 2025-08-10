import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  chip: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#2D3436',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F39C12',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedChip: {
    backgroundColor: '#F39C12',
    borderColor: '#FFF',
    transform: [{ scale: 1.1 }],
  },
  chipText: {
    color: '#F39C12',
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectedChipText: {
    color: '#FFF',
  },
});