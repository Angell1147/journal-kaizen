import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Svg, G, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function WheelOfHabits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [completedDays, setCompletedDays] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const totalDays = 21;
  const radiusIncrement = 25;
  const baseOuterRadius = 65;
  const ringThickness = 20;
  const sectorAngle = 270;

  const { width, height } = Dimensions.get('window');
  const wheelSize = Math.min(width, height) * 0.8;
  const center = wheelSize / 2;

  useEffect(() => {
    loadHabits();
  }, []);

  useEffect(() => {
    saveHabits();
  }, [habits, completedDays]);

  const vibrantPattern = ['#00796B', '#D81B60', '#FFB300', '#3949AB', '#8BC34A'];

  const getPatternColor = (index) => vibrantPattern[index % vibrantPattern.length];

  const saveHabits = async () => {
    try {
      await AsyncStorage.setItem('habitsData', JSON.stringify({ habits, completedDays }));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  };

  const loadHabits = async () => {
    try {
      const data = await AsyncStorage.getItem('habitsData');
      if (data) {
        const { habits, completedDays } = JSON.parse(data);
        setHabits(habits);
        setCompletedDays(completedDays);
      }
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const habitId = Date.now().toString();
      setHabits([...habits, { id: habitId, name: newHabit, color: getPatternColor(habits.length) }]);
      setCompletedDays({ ...completedDays, [habitId]: Array(totalDays).fill(false) });
      setNewHabit('');
    }
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
    const updatedCompletedDays = { ...completedDays };
    delete updatedCompletedDays[habitId];
    setCompletedDays(updatedCompletedDays);
  };

  const toggleDayCompletion = (habitId, dayIndex) => {
    setCompletedDays((prevState) => {
      const habitDays = [...prevState[habitId]];
      habitDays[dayIndex] = !habitDays[dayIndex];

      const allCompleted = habitDays.every((day) => day);
      if (allCompleted) {
        setShowConfetti(true);
      }

      return { ...prevState, [habitId]: habitDays };
    });
  };

  const renderWheel = () => {
    return habits.map((habit, habitIndex) => {
      const outerRadius = baseOuterRadius + habitIndex * radiusIncrement;
      const innerRadius = outerRadius - ringThickness;
      const segmentAngle = sectorAngle / totalDays;
      const startOffset = (360 - sectorAngle) / 2;
      const habitColor = habit.color;

      return (
        <G key={habit.id}>
          {Array.from({ length: totalDays }).map((_, dayIndex) => {
            const startAngle = startOffset + dayIndex * segmentAngle;
            const endAngle = startOffset + (dayIndex + 1) * segmentAngle;

            const outerStartX = center + outerRadius * Math.cos((startAngle * Math.PI) / 180);
            const outerStartY = center + outerRadius * Math.sin((startAngle * Math.PI) / 180);
            const outerEndX = center + outerRadius * Math.cos((endAngle * Math.PI) / 180);
            const outerEndY = center + outerRadius * Math.sin((endAngle * Math.PI) / 180);

            const innerStartX = center + innerRadius * Math.cos((endAngle * Math.PI) / 180);
            const innerStartY = center + innerRadius * Math.sin((endAngle * Math.PI) / 180);
            const innerEndX = center + innerRadius * Math.cos((startAngle * Math.PI) / 180);
            const innerEndY = center + innerRadius * Math.sin((startAngle * Math.PI) / 180);

            const largeArc = endAngle - startAngle > 180 ? 1 : 0;
            const pathData = `M ${outerStartX} ${outerStartY}
              A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}
              L ${innerStartX} ${innerStartY}
              A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEndX} ${innerEndY} Z`;

            const isCompleted = completedDays[habit.id]?.[dayIndex];

            return (
              <Path
                key={dayIndex}
                d={pathData}
                fill={isCompleted ? habitColor : 'lightgray'}
                stroke="black"
                strokeWidth={0.5}
                onPress={() => toggleDayCompletion(habit.id, dayIndex)}
              />
            );
          })}
        </G>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Wheel of Habits</Text>
      <Text style={styles.subtitle}>Track your habits daily</Text>

      <View style={[styles.wheelContainer, { width: wheelSize, height: wheelSize }]}>
        <Svg height={wheelSize} width={wheelSize} style={styles.wheel}>
          {renderWheel()}
        </Svg>
      </View>

      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: wheelSize / 2, y: wheelSize / 2 }}
          fallSpeed={2000}
          fadeOut={true}
          onAnimationEnd={() => setShowConfetti(false)}
        />
      )}

      <View style={styles.habitListContainer}>
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.habitRow}>
              <Text style={[styles.habit, { color: item.color }]}>{item.name}</Text>
              <TouchableOpacity onPress={() => deleteHabit(item.id)} style={styles.deleteButton}>
                <Icon name="delete" size={24} color="#008E97" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Add a new habit"
        placeholderTextColor="#888"
        value={newHabit}
        onChangeText={setNewHabit}
      />
      <TouchableOpacity style={styles.button} onPress={addHabit}>
        <Text style={styles.buttonText}>Add Habit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF4F4',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  wheelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  wheel: {
    alignSelf: 'center',
  },
  habitListContainer: {
    width: '100%',
    padding: 15,
  },
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  habit: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#008E97',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
  },
});
