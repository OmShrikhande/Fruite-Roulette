import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/Colors';

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
      case 'primary': return [COLORS.primary, COLORS.secondary];
      case 'secondary': return [COLORS.accent, COLORS.gold];
      case 'danger': return [COLORS.danger, '#D63031'];
      case 'success': return [COLORS.success, '#00CEC9'];
      default: return [COLORS.primary, COLORS.secondary];
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, styles[size], disabled && styles.disabled, { marginVertical: SPACING.sm }]}
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
    borderRadius: 20,
    elevation: 3,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  gradient: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    height: 32,
    paddingHorizontal: SPACING.sm,
  },
  medium: {
    height: 40,
    paddingHorizontal: SPACING.md,
  },
  large: {
    height: 48,
    paddingHorizontal: SPACING.lg,
  },
  text: {
    color: COLORS.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});