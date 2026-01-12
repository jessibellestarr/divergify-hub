import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Tasks from './src/screens/Tasks';
import Sprint from './src/screens/Sprint';
import Chat from './src/screens/Chat';
import Settings from './src/screens/Settings';
import { colors } from './src/theme/colors';

const Tab = createBottomTabNavigator();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bg, text: colors.text, primary: colors.accent, card: colors.bg }
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Tab.Navigator screenOptions={{ headerStyle:{ backgroundColor: colors.bg }, headerTintColor: colors.text, tabBarStyle:{ backgroundColor: colors.bg }, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.textDim }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Tasks" component={Tasks} />
        <Tab.Screen name="Sprint" component={Sprint} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}