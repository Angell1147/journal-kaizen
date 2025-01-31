

import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Layout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Pressable style={styles.homeIcon} onPress={() => router.push('/')}>
          <Icon name="home-outline" size={24} color="#fff" />
        </Pressable>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.navItems}  // Apply justifyContent and wrap styles here
        >
          <Pressable style={styles.navItem} onPress={() => router.push('/journal')}>
            <Text style={styles.navText}>Journal</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push('/about-us')}>
            <Text style={styles.navText}>About Us</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push('/Medicine')}>
            <Text style={styles.navText}>Medicine</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push('/waterbreak')}>
            <Text style={styles.navText}>Water Break</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Stack Navigation */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    height: 80,  // Increased navbar height
    backgroundColor: 'rgb(30, 17, 62)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  homeIcon: {
    paddingVertical: 5,
    marginRight: 20,
  },
  navItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',  // Allow items to wrap to the next line if needed
  },
  navItem: {
    marginVertical: 5,  // Use margin for vertical spacing
    marginHorizontal: 10,  // Use margin for horizontal spacing
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
