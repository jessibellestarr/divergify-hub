import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import CalendarScreen from './screens/calendarscreen';
import MapsScreen from './screens/mapsscreen';
import ShoppingScreen from './screens/shoppingscreen';
import BlockerScreen from './screens/blockerscreen';
import NudgesScreen from './screens/nudgesscreen';
import SidekicksScreen from './screens/sidekicksscreen';
import { colors } from './constants/colors';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: '#111111',
    primary: colors.accent,
  },
};

const tabIcons = {
  Calendar: 'calendar',
  Maps: 'map',
  Shopping: 'cart',
  Blocker: 'stopwatch',
  Nudges: 'sparkles',
  Sidekicks: 'chatbubbles',
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: '#111',
            paddingBottom: 6,
            paddingTop: 6,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.muted,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={tabIcons[route.name]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Maps" component={MapsScreen} />
        <Tab.Screen name="Shopping" component={ShoppingScreen} />
        <Tab.Screen
          name="Blocker"
          component={BlockerScreen}
          options={{ title: 'Beat your baseline' }}
        />
        <Tab.Screen name="Nudges" component={NudgesScreen} />
        <Tab.Screen name="Sidekicks" component={SidekicksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
