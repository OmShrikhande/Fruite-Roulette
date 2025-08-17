/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from '@/hooks/useColorScheme';

// Simple theme color hook backed by hardcoded maps
const Palette = {
  light: {
    text: '#111',
    background: '#fff',
    icon: '#111',
  },
  dark: {
    text: '#fff',
    background: '#000',
    icon: '#fff',
  },
} as const

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Palette.light & keyof typeof Palette.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  return colorFromProps ?? Palette[theme][colorName];
}
