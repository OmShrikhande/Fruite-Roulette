# Pixel-Perfect Fruit Roulette Mobile UI

This implementation creates a pixel-perfect mobile UI for a fruit-themed roulette betting game using React Native (Expo) with styled-components, following the exact specifications provided.

## 🎯 Implementation Overview

### Screen Structure
The screen is divided into three main sections exactly as specified:

1. **Top HUD Bar** (~10% of screen height)
2. **Central Game Board** (Main area with oval track and betting zones)
3. **Bottom Control Panel** (Fruit selector and betting chips)

## 📱 Component Breakdown

### 1. Top HUD Bar (`TopHUDBar.tsx`)
- **Background**: Dark navy blue (#0A2A45)
- **Left Section**: Light blue diamond icon with white balance text
- **Center Icons**: Gold coin stack, Trophy, Clock, Speaker icons
- **Spacing**: All icons evenly spaced and vertically centered
- **Height**: Exactly 10% of screen height

### 2. Central Game Board (`CentralGameBoard.tsx`)
- **Outer Track**: Beige sand-textured oval path (#F5DEB3)
- **Fruit Border**: Repeating pattern of 8 fruits around oval edge
  - Sequence: 🍌🍇🍉🍊🍒🍎🍓🍋
- **Betting Zones**: 8 rectangular zones in 2 rows × 4 columns
  - Each zone contains:
    - Large gradient orange/yellow number at top
    - Stacked poker chips (White 10, Orange 100, Blue 1K, Green 5K, Red 50K)
    - Yellow multiplier label at bottom (X38, X28, X18, etc.)
- **Timer**: Red LED-style countdown at top center of oval

### 3. Bottom Control Panel (`BottomControlPanel.tsx`)
- **First Row**: Horizontally scrollable fruit icons
- **Second Row**: 
  - Blue circular refresh/spin icon (leftmost)
  - 5 betting chips in exact order:
    - Gray chip ("10")
    - Orange chip ("100") 
    - Blue chip ("1K") - highlighted as selected
    - Green chip ("5K")
    - Red chip ("50K")
  - Hamburger menu icon (rightmost)

## 🎨 Design Specifications

### Color Palette
- **Dark Navy Blue**: #0A2A45 (HUD background)
- **Beige Sand**: #F5DEB3 (Oval track)
- **Light Blue**: #87CEEB (Diamond icon)
- **Gradient Orange/Yellow**: #FFA500 to #FFD700 (Bet amounts)
- **Chip Colors**:
  - Gray: #808080
  - Orange: #FF8C00
  - Blue: #4169E1 (highlighted)
  - Green: #32CD32
  - Red: #DC143C

### Typography
- **Font Family**: Monospace for numbers and chip values
- **Font Weight**: Bold for all casino-style text
- **Text Shadows**: Applied for depth and readability

### Layout & Responsive Design
- **Framework**: React Native with Expo
- **Styling**: Styled Components
- **Responsive**: Uses Flexbox with fixed aspect ratios
- **Screen Adaptation**: Scales proportionally on all mobile screen sizes

## 🚀 Usage

### Navigation
The pixel-perfect screen is set as the initial route in the app navigator:

```typescript
<Tab.Navigator initialRouteName="PixelPerfect">
  <Tab.Screen 
    name="PixelPerfect" 
    component={PixelPerfectRouletteScreen} 
    options={{ title: 'Pixel Perfect Roulette' }} 
  />
</Tab.Navigator>
```

### Running the App
```bash
cd app
npm install
npm start
```

## 📁 File Structure

```
app/
├── screens/
│   └── PixelPerfectRouletteScreen.tsx    # Main screen component
├── components/game/
│   ├── TopHUDBar.tsx                     # Top HUD with balance and icons
│   ├── CentralGameBoard.tsx              # Oval track with betting zones
│   └── BottomControlPanel.tsx            # Fruit selector and chips
└── navigation/
    └── AppNavigator.tsx                  # Updated navigation
```

## 🎮 Features Implemented

### Visual Elements
- ✅ Dark navy blue HUD bar with exact height
- ✅ Light blue diamond icon with balance display
- ✅ Evenly spaced center icons (coin, trophy, clock, speaker)
- ✅ Beige sand-textured oval betting track
- ✅ Repeating fruit border pattern around oval
- ✅ 8 rectangular betting zones in 2×4 grid
- ✅ Gradient orange/yellow bet amounts
- ✅ Stacked poker chips in exact colors and order
- ✅ Yellow multiplier labels
- ✅ Red LED-style countdown timer
- ✅ Horizontally scrollable fruit row
- ✅ Blue circular spin button
- ✅ 5 betting chips with exact styling
- ✅ Highlighted blue 1K chip as selected
- ✅ Hamburger menu icon

### Technical Implementation
- ✅ React Native with Expo
- ✅ Styled Components for styling
- ✅ Responsive design with Flexbox
- ✅ Fixed aspect ratios maintained
- ✅ Proper shadow and elevation effects
- ✅ Gradient backgrounds where specified
- ✅ Monospace fonts for casino styling

## 🎯 Pixel-Perfect Accuracy

This implementation follows the description exactly with:
- No creative variations or changes
- Exact color values as specified
- Precise layout measurements
- Correct fruit sequence and order
- Accurate chip colors and values
- Proper spacing and alignment
- Casino-style typography and effects

The UI is designed to be visually indistinguishable from a screenshot of the described game interface.