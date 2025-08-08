import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GameButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const GameButton: React.FC<GameButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary': return ['#6C5CE7', '#A29BFE'];
      case 'secondary': return ['#74B9FF', '#0984E3'];
      case 'danger': return ['#E17055', '#D63031'];
      case 'success': return ['#00B894', '#00CEC9'];
      default: return ['#6C5CE7', '#A29BFE'];
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, styles[size], disabled && styles.disabled]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        style={[styles.gradient, styles[size]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.text, styles[`${size}Text`]]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    height: 40,
    paddingHorizontal: 20,
  },
  medium: {
    height: 50,
    paddingHorizontal: 30,
  },
  large: {
    height: 60,
    paddingHorizontal: 40,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
});