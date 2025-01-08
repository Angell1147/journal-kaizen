import React from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import meal from "@/assets/images/meal.png"; // Local image for Meal Tracker
import symptom from "@/assets/images/symptom.jpeg"; // Local image for Symptom Tracker

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Meal Tracker Button */}
      <Pressable 
        style={styles.card} 
        onPress={() => router.push('/meal-tracker')}
      >
        <ImageBackground 
          source={meal}
          style={styles.imageBackground}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={styles.cardText}>Meal Tracker</Text>
        </ImageBackground>
      </Pressable>

      {/* Symptom Tracker Button */}
      <Pressable 
        style={styles.card} 
        onPress={() => router.push('/symptom-tracker')}
      >
        <ImageBackground 
          source={symptom}
          style={styles.imageBackground}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={styles.cardText}>Symptom Tracker</Text>
        </ImageBackground>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: 300,
    height: 300,
    marginVertical: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    position: 'absolute', // Ensure the text is placed over the image
  },
});
