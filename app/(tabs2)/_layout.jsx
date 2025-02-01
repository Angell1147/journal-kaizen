import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import Home from './index';         // Home Screen (index.jsx)
import water from './waterbreak';          
import medicine from './Medicine';    
import contactUs from './contact-us';
import aboutUs from './about-us';        
import journalling from '../(tabs)/index';  
import meal from './meal-tracker';
import symptom from './symptom-tracker';

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
        name="water"
        options={{
          title: 'Water Intake',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="medicine"
        options={{
          title: 'Medicine',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="contactUs"
        options={{
          title: 'Contact Us',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="aboutUs"
        options={{
          title: 'About Us',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Meal Tracker"
        options={{
          title: 'Meal Tracker',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sun.max.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Symptom Tracker"
        options={{
          title: 'Symptom Tracker',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sun.max.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journalling"
        options={{
          title: 'Journalling',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sun.max.fill" color={color} />,
        }}
      />
    </Tabs>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      {/* Footer Image */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={require('../../assets/images/flowers.jpeg')}  // Adjust the relative path to your image
          style={{ width: 300, height: 500, resizeMode: 'contain', marginTop: -55 }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <DrawerNavigator.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* Drawer Screen 1 - Home */}
      <DrawerNavigator.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      {/* Drawer Screen 2 - Water Intake */}
      <DrawerNavigator.Screen
        name="water"
        component={water}
        options={{
          drawerLabel: 'Water Intake Tracker',
          title: 'Water Intake Tracker',
        }}
      />
      {/* Drawer Screen 3 - Medicine */}
      <DrawerNavigator.Screen
        name="medicine"
        component={medicine}
        options={{
          drawerLabel: 'Medicine',
          title: 'Medicine',
        }}
      />
      {/* Drawer Screen 4 - Contact Us */}
      <DrawerNavigator.Screen
        name="contactUs"
        component={contactUs}
        options={{
          drawerLabel: 'Contact Us',
          title: 'Contact Us',
        }}
      />
      {/* Drawer Screen 5 - About Us */}
      <DrawerNavigator.Screen
        name="aboutUs"
        component={aboutUs}
        options={{
          drawerLabel: 'About Us',
          title: 'About Us',
        }}
      />
      {/* Drawer Screen 6 - Meal Tracker */}
      <DrawerNavigator.Screen
        name="Meal Tracker"
        component={meal}
        options={{
          drawerLabel: 'Meal Tracker',
          title: 'Meal Tracker',
        }}
      />
      {/* Drawer Screen 7 - Symptom Tracker */}
      <DrawerNavigator.Screen
        name="Symptom Tracker"
        component={symptom}
        options={{
          drawerLabel: 'Symptom Tracker',
          title: 'Symptom Tracker',
        }}
      />
      {/* Drawer Screen 8 - Journalling */}
      <DrawerNavigator.Screen
        name="journalling"
        component={journalling}
        options={{
          drawerLabel: 'Journal Section',
          title: 'Journal Section',
        }}
      />
    </DrawerNavigator.Navigator>
  );
}
