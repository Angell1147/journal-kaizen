import React from 'react';
import { Platform, Image, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Home from './index';
import Habits from './habits';
import Rate from './rate';
import Journal from './journallistscreen';
import WriteJournal from './journal';
import Highlight from './highlight';
import Sleep from './sleep';
import Health from '../(tabs2)/index';

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
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
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
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="writeJournal"
        options={{
          title: 'Write Journal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="pencil" color={color} />,
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
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />
    </Tabs>
  );
};

// ✅ Custom Drawer with an Image at the Bottom
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      {/* Footer Image */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={require('../../assets/images/flowers.jpeg')}  // Adjust the relative path to your image
          style={{ width: 300, height: 500, resizeMode: 'contain',marginTop:-55,}}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <DrawerNavigator.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <DrawerNavigator.Screen
        name="Home"
        component={TabLayout}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <DrawerNavigator.Screen
        name="WriteJournal"
        component={WriteJournal}
        options={{
          drawerLabel: 'Journal Entry',
          title: 'Write Journal',
        }}
      />
      <DrawerNavigator.Screen
        name="Journal"
        component={Journal}
        options={{
          drawerLabel: 'Journal',
          title: 'Journal',
        }}
      />
      <DrawerNavigator.Screen
        name="Highlight"
        component={Highlight}
        options={{
          drawerLabel: 'Highlight of the Day',
          title: 'Highlight of the Day',
        }}
      />
      <DrawerNavigator.Screen
        name="Habits"
        component={Habits}
        options={{
          drawerLabel: 'Wheel of Habits',
          title: 'Wheel of Habits',
        }}
      />
      <DrawerNavigator.Screen
        name="Rate"
        component={Rate}
        options={{
          drawerLabel: 'Rate My Day',
          title: 'Rate My Day',
        }}
      />
      <DrawerNavigator.Screen
        name="Sleep"
        component={Sleep}
        options={{
          drawerLabel: 'Sleep Tracker',
          title: 'Sleep Tracker',
        }}
      />
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
