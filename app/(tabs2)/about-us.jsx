import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }} 
        style={styles.logo} 
      />
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our health tracker application! Our goal is to empower users 
        to take control of their health by tracking essential health metrics. 
        With tools like Meal Tracker and Symptom Tracker, we aim to make health 
        management simple, insightful, and accessible for everyone.
      </Text>
      <Text style={styles.description}>
        Our team is passionate about leveraging technology to help people live 
        healthier and happier lives. Whether you want to monitor your daily diet 
        or understand recurring symptoms, we are here to provide you with 
        actionable insights to improve your well-being.
      </Text>
      <Text style={styles.footer}>
        Thank you for choosing us to be a part of your health journey!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 15,
    lineHeight: 24,
  },
  footer: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});
