

import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Home from './index';         // Home Screen (index.jsx)
import water from './waterbreak';          
import medicine from './Medicine';    
import contactUs from './contact-us';
import aboutUs from './about-us';        
import journalling from '../(tabs)/index'  
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
          title: 'medicine',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="contactUs"
        options={{
          title: 'contactUS',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="aboutUs"
        options={{
          title: 'aboutUs',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Meal Tracker"
        options={{
          title: 'Meal Tracker"',
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
          title: 'journalling',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sun.max.fill" color={color} />,
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
      component={Home}
      options={{
        drawerLabel: 'Home',
        title: 'Home',
      }}
    />
    {/* Drawer Screen 2 - Habits */}
    <DrawerNavigator.Screen
      name="water"
      component={water}
      options={{
        drawerLabel: 'Water Intake Tracker',
        title: 'Water Intake Tracker',
      }}
    />
    {/* Drawer Screen 3 - Rate */}
    <DrawerNavigator.Screen
      name="medicine"
      component={medicine}
      options={{
        drawerLabel: 'medicine',
        title: 'medicine',
      }}
    />
    {/* Drawer Screen 4 - Journal */}
    <DrawerNavigator.Screen
      name="contactUs"
      component={contactUs}
      options={{
        drawerLabel: 'Contact Us',
        title: 'Contact Us',
      }}
    />
    {/* Drawer Screen 5 - WriteJournal */}
    <DrawerNavigator.Screen
      name="aboutUs"
      component={aboutUs}
      options={{
        drawerLabel: 'About Us',
        title: 'About Us',
      }}
    />
     {/* Drawer Screen 6 - Highlight */}
     <DrawerNavigator.Screen
      name="Meal Tracker"
      component={meal}
      options={{
        drawerLabel: 'Meal Tracker',
        title: 'Meal Tracker',
      }}
    />
     {/* Drawer Screen 7 - Highlight */}
     <DrawerNavigator.Screen
      name="Symptom Tracker"
      component={symptom}
      options={{
        drawerLabel: 'Symptom Tracker',
        title: 'Symptom Tracker',
      }}
    />
    {/* Drawer Screen 6 - Highlight */}
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


// export default function Layout() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       {/* Navbar */}
//       <View style={styles.navbar}>
//         <Pressable style={styles.homeIcon} onPress={() => router.push('/')}>
//           <Icon name="home-outline" size={24} color="#fff" />
//         </Pressable>
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false} 
//           contentContainerStyle={styles.navItems}  // Apply justifyContent and wrap styles here
//         >
//           <Pressable style={styles.navItem} onPress={() => router.push('/journal')}>
//             <Text style={styles.navText}>Journal</Text>
//           </Pressable>
//           <Pressable style={styles.navItem} onPress={() => router.push('/about-us')}>
//             <Text style={styles.navText}>About Us</Text>
//           </Pressable>
//           <Pressable style={styles.navItem} onPress={() => router.push('/Medicine')}>
//             <Text style={styles.navText}>Medicine</Text>
//           </Pressable>
//           <Pressable style={styles.navItem} onPress={() => router.push('/waterbreak')}>
//             <Text style={styles.navText}>Water Break</Text>
//           </Pressable>
//         </ScrollView>
//       </View>

//       {/* Stack Navigation */}
//       <Stack screenOptions={{ headerShown: false }} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   navbar: {
//     height: 80,  // Increased navbar height
//     backgroundColor: 'rgb(30, 17, 62)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   homeIcon: {
//     paddingVertical: 5,
//     marginRight: 20,
//   },
//   navItems: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',  // Allow items to wrap to the next line if needed
//   },
//   navItem: {
//     marginVertical: 5,  // Use margin for vertical spacing
//     marginHorizontal: 10,  // Use margin for horizontal spacing
//   },
//   navText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
