import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function Layout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Pressable style={styles.navItem} onPress={() => router.push('/journal')}>
          <Text style={styles.navText}>Journal</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('/about-us')}>
          <Text style={styles.navText}>About Us</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('/contact-us')}>
          <Text style={styles.navText}>Contact Us</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('/Medicine')}>
          <Text style={styles.navText}>Medicine</Text>
        </Pressable>
      </View>

      {/* Stack Navigation */}
      <Stack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    height: 60,
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  navItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
