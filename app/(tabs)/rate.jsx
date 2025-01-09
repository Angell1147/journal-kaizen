import { Text, View, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import bgcolor from '@/assets/images/bg2.png'


const MoodTracker = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.month}>JANUARY</Text>
        <View style={styles.moodList}>
          <Text style={styles.moodItem}>Depressed</Text>
          <Text style={styles.moodItem}>Elevated</Text>
          <Text style={styles.moodItem}>Irritability</Text>
          <Text style={styles.moodItem}>Anxiety</Text>
          <Text style={styles.moodItem}>Happy</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    month: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    moodList: {
      alignItems: 'center',
    },
    moodItem: {
      fontSize: 18,
      marginVertical: 8,
    },
  });
  
  export default MoodTracker;