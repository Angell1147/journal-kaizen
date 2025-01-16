import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { generateColor } from './utils'; // Ensure generateColor is defined in utils.js

const HabitWheel = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [completedDays, setCompletedDays] = useState({});

  const WHEEL_SIZE = 300;
  const CENTER_SIZE = 50;
  const DAYS_IN_CYCLE = 21; // Updated to 21 days
  const SECTOR_ANGLE = 315; // Updated to 315 degrees

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, newHabit.trim()]);
      setNewHabit('');
    }
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
    setCompletedDays((prev) => {
      const updatedDays = { ...prev };
      Object.keys(updatedDays).forEach((key) => {
        if (key.startsWith(`${index}-`)) delete updatedDays[key];
      });
      return updatedDays;
    });
  };

  const toggleCompletion = (habitIndex, dayIndex) => {
    const key = `${habitIndex}-${dayIndex}`;
    setCompletedDays((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderDaySegments = (habitIndex) => {
    const segments = [];
    const radius = CENTER_SIZE + (habitIndex + 1) * 20;

    for (let i = 0; i < DAYS_IN_CYCLE; i++) {
      const angle = (i * SECTOR_ANGLE) / (DAYS_IN_CYCLE - 1) - SECTOR_ANGLE / 2;
      const key = `${habitIndex}-${i}`;
      const isCompleted = completedDays[key];

      segments.push(
        <TouchableOpacity
          key={key}
          style={[
            styles.segment,
            {
              transform: [
                { rotate: `${angle}deg` },
                { translateY: -radius },
              ],
              backgroundColor: isCompleted ? generateColor(habitIndex) : '#f0f0f0',
              width: 18,
              height: 18,
              zIndex: habitIndex + 1,
            },
          ]}
          onPress={() => toggleCompletion(habitIndex, i)}
        />
      );
    }
    return segments;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.wheel, { width: WHEEL_SIZE, height: WHEEL_SIZE }]}>
        <View style={styles.center}>
          <Text style={styles.centerText}>Habits</Text>
        </View>
        {habits.map((_, index) => (
          <View key={index} style={styles.habitCircle}>
            {renderDaySegments(index)}
          </View>
        ))}
      </View>

      <View style={styles.habitList}>
        <View style={styles.addHabitContainer}>
          <TextInput
            style={styles.input}
            value={newHabit}
            onChangeText={setNewHabit}
            placeholder="Enter new habit"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.addButton} onPress={addHabit}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {habits.map((habit, index) => (
          <View key={index} style={styles.habitItem}>
            <View style={[styles.habitColor, { backgroundColor: generateColor(index) }]} />
            <Text style={styles.habitText}>{habit}</Text>
            <TouchableOpacity onPress={() => deleteHabit(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  wheel: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  centerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  habitCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  segment: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
  },
  habitList: {
    width: '100%',
    marginTop: 20,
  },
  addHabitContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
  },
  habitColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  habitText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default HabitWheel;
