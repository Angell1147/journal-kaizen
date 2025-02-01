import React from 'react';
import { View, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// Import Screens
import Home from './index';
import Water from './waterbreak';
import Medicine from './Medicine';
import ContactUs from './contact-us';
import AboutUs from './about-us';
import Journalling from '../(tabs)/index';
import Meal from './meal-tracker';
import Symptom from './symptom-tracker';

const DrawerNavigator = createDrawerNavigator();

// ✅ Updated Custom Drawer Styling
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#B0D6DA' }}>
      
      {/* Header Image */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={require('../../assets/images/flowers.jpeg')} // Ensure correct path
          style={{ width: 250, height: 183, resizeMode: 'contain', backgroundColor: 'white' }}
        />
      </View>

      {/* Styled Drawer Items */}
      <View style={{ paddingHorizontal: 20 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#B0D6DA', width: 270 },
        drawerLabelStyle: { fontSize: 18, fontFamily: 'CursiveFont', textAlign: 'center' },
        drawerItemStyle: { backgroundColor: '#48AAAD', marginVertical: 10, borderRadius: 10 },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNavigator.Screen name="Home" component={Home} options={{ drawerLabel: 'Home' }} />
      <DrawerNavigator.Screen name="Meal Tracker" component={Meal} options={{ drawerLabel: 'Meal Tracker' }} />
      <DrawerNavigator.Screen name="Symptom Tracker" component={Symptom} options={{ drawerLabel: 'Symptom Tracker' }} />
      <DrawerNavigator.Screen name="Water" component={Water} options={{ drawerLabel: 'Water Intake' }} />
      <DrawerNavigator.Screen name="Medicine" component={Medicine} options={{ drawerLabel: 'Medicine Info' }} />
      
     
      <DrawerNavigator.Screen name="Contact Us" component={ContactUs} options={{ drawerLabel: 'Contact Us' }} />
      <DrawerNavigator.Screen name="About Us" component={AboutUs} options={{ drawerLabel: 'About Us' }} />
      <DrawerNavigator.Screen name="Journalling" component={Journalling} options={{ drawerLabel: 'Journal Section' }} />
    </DrawerNavigator.Navigator>
  );
}
