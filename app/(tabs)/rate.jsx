import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { PieChart } from 'react-native-chart-kit';

const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [moodData, setMoodData] = useState([
    { name: 'Happy', population: 40, color: '#FFD700', legendFontColor: '#000', legendFontSize: 12 },
    { name: 'Irritability', population: 20, color: '#FFA500', legendFontColor: '#000', legendFontSize: 12 },
    { name: 'Anxiety', population: 20, color: '#1E90FF', legendFontColor: '#000', legendFontSize: 12 },
    { name: 'Elevated', population: 10, color: '#FF69B4', legendFontColor: '#000', legendFontSize: 12 },
    { name: 'Depressed', population: 10, color: '#FF4500', legendFontColor: '#000', legendFontSize: 12 },
  ]);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#FFD700' },
        }}
        style={styles.calendar}
      />
      <View style={styles.moodSelector}>
        {moodData.map((mood, index) => (
          <TouchableOpacity key={index} style={[styles.moodButton, { backgroundColor: mood.color }]}>
            <Text style={styles.moodText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <PieChart
        data={moodData}
        width={Dimensions.get('window').width}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  calendar: {
    marginBottom: 10,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  moodButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MoodTracker;