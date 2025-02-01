import React from 'react';
import { Platform, Image, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Import Screens
import Home from './index';
import Habits from './habits';
import Rate from './rate';
import Journal from './journallistscreen';
import WriteJournal from './journal';
import Highlight from './highlight';
import Sleep from './sleep';
import Health from '../(tabs2)/index';

const DrawerNavigator = createDrawerNavigator();

// ✅ Custom Drawer with Header Image and Styled Buttons
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#B0D6DA' }}>
      
      {/* Header Image */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={require('../../assets/images/flowers.jpeg')} // Change to your actual image
          style={{ width: 250, height: 183, resizeMode: 'contain', backgroundColor:'white',}}
        />
      </View>

      {/* Drawer Items Styled */}
      <View style={{ paddingHorizontal: 20 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer Image */}
      {/* <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={require('../../assets/images/flowers.jpeg')}  // Change to your actual image
          style={{ width: 250, height: 150, resizeMode: 'contain' }}
        />
      </View> */}
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#B0D6DA', width: 270 },
        drawerLabelStyle: { fontSize: 18, fontFamily: 'System', textAlign: 'center' },
        drawerItemStyle: { backgroundColor: '#48AAAD', marginVertical: 10, borderRadius: 10 },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNavigator.Screen name="Home" component={Home} options={{ drawerLabel: 'Home' }} />
      <DrawerNavigator.Screen name="WriteJournal" component={WriteJournal} options={{ drawerLabel: 'Journal Entry' }} />
      <DrawerNavigator.Screen name="Journal" component={Journal} options={{ drawerLabel: 'Journal' }} />
      <DrawerNavigator.Screen name="Highlight" component={Highlight} options={{ drawerLabel: 'Highlight of the Day' }} />
      <DrawerNavigator.Screen name="Habits" component={Habits} options={{ drawerLabel: 'Wheel of Habits' }} />
      <DrawerNavigator.Screen name="Rate" component={Rate} options={{ drawerLabel: 'Rate My Day' }} />
      <DrawerNavigator.Screen name="Sleep" component={Sleep} options={{ drawerLabel: 'Sleep Tracker' }} />
      <DrawerNavigator.Screen name="Health" component={Health} options={{ drawerLabel: 'Health Tracker' }} />
    </DrawerNavigator.Navigator>
  );
}
