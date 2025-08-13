import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import GameScreen from '../screens/GameScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PixelPerfectRouletteScreen from '../screens/PixelPerfectRouletteScreen';
import ExactCopyScreen from '../screens/ExactCopyScreen';
import AutoSpinRouletteScreen from '../screens/AutoSpinRouletteScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="AutoSpin">
        <Tab.Screen name="AutoSpin" component={AutoSpinRouletteScreen} options={{ title: '🎰 Auto Spin Roulette' }} />
        <Tab.Screen name="ExactCopy" component={ExactCopyScreen} options={{ title: '100% Exact Copy' }} />
        <Tab.Screen name="PixelPerfect" component={PixelPerfectRouletteScreen} options={{ title: 'Pixel Perfect Roulette' }} />
        <Tab.Screen name="Game" component={GameScreen} />
        <Tab.Screen name="Results" component={ResultsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Signup" component={SignupScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
