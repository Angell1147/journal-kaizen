import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity ,FlatList, StyleSheet, ScrollView } from 'react-native';
import { Svg, G, Path, Text as SvgText } from 'react-native-svg';
import { generateColor } from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WheelOfHabits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const radiusIncrement = 25; // Distance between rings
  const baseOuterRadius = 65; // Outer radius of the innermost ring
  const ringThickness = 20; // Thickness of each ring
  const totalDays = 21; // Number of days in a habit cycle
  const sectorAngle = 270; // The total angle of the sector
  const [completedDays, setCompletedDays] = useState({}); // State to track completed days

  useEffect(() => {
    loadHabits();
  }, []);

  useEffect(() => {
    saveHabits();
  }, [habits, completedDays]);

  // Save habits and completedDays to AsyncStorage
  const saveHabits = async () => {
    try {
      const data = JSON.stringify({ habits, completedDays });
      await AsyncStorage.setItem('habitsData', data);
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  };

  // Load habits and completedDays from AsyncStorage
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

  // Add a new habit
  const addHabit = () => {
    if (newHabit.trim()) {
      const habitId = Date.now().toString();
      const habitColor = getRandomColor();
      setHabits([...habits, { id: habitId, name: newHabit, color: habitColor }]);
      setCompletedDays({ ...completedDays, [habitId]: Array(totalDays).fill(false) });
      setNewHabit('');
    }
  };

  // Get a random color for the habit
  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC733'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Toggle completion for a specific habit and day
  const toggleDayCompletion = (habitId, dayIndex) => {
    setCompletedDays((prevState) => {
      const habitDays = [...prevState[habitId]];
      habitDays[dayIndex] = !habitDays[dayIndex];
      const allDone = habitDays.every((day) => day);

      // Reset the habit if all days are done
      if (allDone) {
        habitDays.fill(false); // Reset all days
      }

      return { ...prevState, [habitId]: habitDays };
    });
  };

  // Render the habit wheel
  const renderWheel = () => {
    return habits.map((habit, habitIndex) => {
      const outerRadius = baseOuterRadius + habitIndex * radiusIncrement; // Outer radius of the ring
      const innerRadius = outerRadius - ringThickness; // Inner radius of the ring
      const segmentAngle = sectorAngle / totalDays; // Angle for each day segment
      const startOffset = (360 - sectorAngle) / 2; // Offset to center the sector
      const habitColor = generateColor(habitIndex);

      return (
        <G key={habit.id}>
          {Array.from({ length: totalDays }).map((_, dayIndex) => {
            const startAngle = startOffset + dayIndex * segmentAngle;
            const endAngle = startOffset + (dayIndex + 1) * segmentAngle;

            // Outer arc start and end coordinates
            const outerStartX = 150 + outerRadius * Math.cos((startAngle * Math.PI) / 180);
            const outerStartY = 150 + outerRadius * Math.sin((startAngle * Math.PI) / 180);
            const outerEndX = 150 + outerRadius * Math.cos((endAngle * Math.PI) / 180);
            const outerEndY = 150 + outerRadius * Math.sin((endAngle * Math.PI) / 180);

            // Inner arc start and end coordinates
            const innerStartX = 150 + innerRadius * Math.cos((endAngle * Math.PI) / 180);
            const innerStartY = 150 + innerRadius * Math.sin((endAngle * Math.PI) / 180);
            const innerEndX = 150 + innerRadius * Math.cos((startAngle * Math.PI) / 180);
            const innerEndY = 150 + innerRadius * Math.sin((startAngle * Math.PI) / 180);

            const largeArc = endAngle - startAngle > 180 ? 1 : 0;

            // SVG Path data for the donut-shaped segment
            const pathData = `
              M ${outerStartX} ${outerStartY}
              A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}
              L ${innerStartX} ${innerStartY}
              A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEndX} ${innerEndY}
              Z
            `;

            const isCompleted = completedDays[habit.id]?.[dayIndex];

            return (
              <G key={dayIndex}>
                <Path
                  d={pathData}
                  fill={isCompleted ? habitColor : 'lightgray'}
                  stroke="black"
                  strokeWidth={0.5}
                  onPress={() => toggleDayCompletion(habit.id, dayIndex)} // Toggle completion
                />
                {/* Add day numbers outside the outermost circle */}
                {habitIndex === habits.length - 1 && (
                    <SvgText
                    x={150 + (outerRadius + 10) * Math.cos(((startAngle + endAngle) / 2) * (Math.PI / 180))}
                    y={150 + (outerRadius + 10) * Math.sin(((startAngle + endAngle) / 2) * (Math.PI / 180))}
                    fontSize={10}
                    fill="black"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    >
                    {dayIndex + 1}
                    </SvgText>
                )}
              </G>
            );
          })}
        </G>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Wheel of Habits</Text>
      <Text style={styles.subtitle}>Reward yourself every day by completing a good habit</Text>
      <Svg height="400" width="400" style={styles.wheel}>
        {renderWheel()}
      </Svg>

      <View style={styles.habitListContainer}>
        
        <View style={styles.listSection}>
            <Text style={styles.listTitle}>List it down here:</Text>
            <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => 
            <Text style={[styles.habit, { color: generateColor(index) }]}>{item.name}</Text>}
            />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Add a new habit"
          placeholderTextColor={"#888"}
          value={newHabit}
          onChangeText={setNewHabit}
        />

        <TouchableOpacity style={styles.button} onPress={addHabit}>
          <Text style={styles.buttonText}>Add Habit</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      // flexGrow: 1,
      flex: 1,
      padding: 20,
      backgroundColor: '#EAF4F4',
      // alignItems: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'DancingScript-Regular',
      marginBottom: 10,
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'OpenSans-Regular',
      textAlign: 'center',
      color: '#555',
      marginBottom: 20,
    },
    wheel: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 100,
        height: 500,
    },
    habitListContainer: {
      width: '100%',
      height: '40%',
      alignItems: 'center',
      padding: 15,
      borderWidth: 3,
      borderColor: '#ddd',
      marginTop: 20, 
      marginBottom: 20,
      borderRadius: 10,
      alignItems: 'flex-start',
    },
    
    //   listSection: {
    //     marginTop: 20,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 10,
    //     padding: 15,
    //     backgroundColor: '#FFF',
    //   },

    listSection: {
        width: '100%',
    },

      listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 0,
        textAlign: 'left',
      },
      habit: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'left',
        color: '#FFF',
      },

      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '90%',
        backgroundColor: 'white',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 52,
        marginBottom: 10,
      },
      
      button: {
        backgroundColor: '#FF5733',
        padding: 12,
        borderRadius: 15,
        alignItems: 'center',
        width: '40%',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
      },
      buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
      },
     
    });
  