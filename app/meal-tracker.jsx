import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Button, Alert } from 'react-native';

export default function MealTracker() {
  const [meals, setMeals] = useState([]);
  const [mealInput, setMealInput] = useState('');

  const addMeal = () => {
    if (mealInput.trim() === '') {
      Alert.alert('Error', 'Please enter a meal before adding!');
      return;
    }
    setMeals([...meals, { id: Date.now().toString(), name: mealInput }]);
    setMealInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meal Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter meal name"
        value={mealInput}
        onChangeText={setMealInput}
      />
      <Button title="Add Meal" onPress={addMeal} />
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text style={styles.mealText}>{item.name}</Text>
          </View>
        )}
        style={styles.mealList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  mealList: {
    marginTop: 20,
  },
  mealItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  mealText: {
    fontSize: 18,
  },
});
