import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import vector icons

// Import your screens
import HomeScreen from './index';
import PredictionScreen from './prediction';
import ResultScreen from './resultScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Set icon based on route name
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Prediction') {
            iconName = focused ? 'medical' : 'medical-outline';
          }

          // You can return any component that you like here
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Prediction" component={PredictionScreen} />
    </Tab.Navigator>
  );
}

export default function Layout() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen 
          name="ResultScreen" 
          component={ResultScreen} 
          options={{ 
            headerShown: true, 
            title: 'Results' 
          }} 
        />
      </Stack.Navigator>
  );
}