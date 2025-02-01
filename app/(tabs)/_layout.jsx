import React from 'react';
import { Platform } from 'react-native';
// import {Drawer} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link } from 'expo-router';

import Home from './index';         // Home Screen (index.jsx)
import Habits from './habits';      // Habits Screen (habits.jsx)
import Rate from './rate';          // Rate My Day Screen (rate.jsx)
import Journal from './journallistscreen';    // Journal Screen (journal.jsx)
<<<<<<< HEAD
import WriteJournal from './journal';    // Write Journal Screen (writejournal.jsx)
=======
import WriteJournal from './journal';// Write Journal Screen (journal.jsx)
>>>>>>> d0d3dad83bdcfd435bc6fa3d2470c70a17c82780
import Highlight from './highlight';// Highlight of the Day (highlight.jsx)
import Sleep from './sleep';        // Sleep Tracker Screen (sleep.jsx)
import Health from '../(tabs2)/index'   // Landing page medical (index.jsx)

const DrawerNavigator = createDrawerNavigator();

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Wheel of Habits',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rate"
        options={{
          title: 'Rate My Day',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
       <Tabs.Screen
        name="WriteJournal"
        options={{
          title: 'WriteJournal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="WriteJournal"
        options={{
          title: 'WriteJournal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="highlight"
        options={{
          title: 'Highlight of the Day',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sun.max.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sleep"
        options={{
          title: 'Sleep Tracker',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="moon.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Health"
        options={{
          title: 'Health',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="moon.fill" color={color} />,
        }}
      />
    </Tabs>
  );
};


export default function Layout() {
  return (
    <DrawerNavigator.Navigator>
    {/* Drawer Screen 1 - Home */}
    <DrawerNavigator.Screen
      name="Home"
      component={TabLayout}
      options={{
        drawerLabel: 'Home',
        title: 'Home',
      }}
    />
    {/* Drawer Screen 2 - Habits */}
    <DrawerNavigator.Screen
      name="Habits"
      component={Habits}
      options={{
        drawerLabel: 'Wheel of Habits',
        title: 'Wheel of Habits',
      }}
    />
    {/* Drawer Screen 3 - Rate */}
    <DrawerNavigator.Screen
      name="Rate"
      component={Rate}
      options={{
        drawerLabel: 'Rate My Day',
        title: 'Rate My Day',
      }}
    />
    {/* Drawer Screen 4 - Journal */}
    <DrawerNavigator.Screen
      name="Journal"
      component={Journal}
      options={{
        drawerLabel: 'Journal',
        title: 'Journal',
      }}
    />
    {/* Drawer Screen 5 - WriteJournal */}
    <DrawerNavigator.Screen
      name="WriteJournal"
      component={WriteJournal}
      options={{
        drawerLabel: 'Add a Entry',
        title: 'Add a Entry',
      }}
    />
    {/* Drawer Screen 6 - Highlight */}
    <DrawerNavigator.Screen
      name="Highlight"
      component={Highlight}
      options={{
        drawerLabel: 'Highlight of the Day',
        title: 'Highlight of the Day',
      }}
    />
    {/* Drawer Screen 7 - Sleep */}
    <DrawerNavigator.Screen
      name="Sleep"
      component={Sleep}
      options={{
        drawerLabel: 'Sleep Tracker',
        title: 'Sleep Tracker',
      }}
    />
    {/* Drawer Screen 8 - Sleep */}
    <DrawerNavigator.Screen
      name="Health"
      component={Health}
      options={{
        drawerLabel: 'Health Tracker',
        title: 'Health Tracker',
      }}
    />
  </DrawerNavigator.Navigator>
);
}