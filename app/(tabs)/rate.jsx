import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

const screenWidth = Dimensions.get('window').width;

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null); // Current mood selection
  const [moodData, setMoodData] = useState({}); // Stores moods associated with dates
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Current month (0-based index)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Current year

  // Mood categories
  const moods = [
    { label: 'Happy', color: '#4CAF50' },
    { label: 'Depressed', color: '#FF5722' },
    { label: 'Anxiety', color: '#03A9F4' },
    { label: 'Irritability', color: '#FFC107' },
    { label: 'Elevated', color: '#9C27B0' },
  ];

  // Handle date selection from the calendar
  const handleDateSelect = (date) => {
    if (selectedMood) {
      const key = date.dateString;
      setMoodData((prev) => ({
        ...prev,
        [key]: selectedMood,
      }));
    }
  };

  // Count occurrences of each mood
  const moodCounts = moods.map((mood) => ({
    name: mood.label,
    count: Object.values(moodData).filter((m) => m === mood.label).length,
    color: mood.color,
    legendFontColor: '#000',
    legendFontSize: 12,
  }));

  // Calculate the total count of all moods
  const totalMoodCount = Object.values(moodData).length;

  // Calculate the percentage for each mood
  const moodPercentages = moodCounts.map((mood) => ({
    ...mood,
    percentage: totalMoodCount > 0 ? ((mood.count / totalMoodCount) * 100).toFixed(2) : 0,
  }));

  // Month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <View style={styles.container}>
      {/* Calendar Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
      </View>

      {/* Calendar View */}
      <Calendar
        current={`${currentYear}-${currentMonth + 1}-01`}
        minDate={`${currentYear}-${currentMonth + 1}-01`}
        maxDate={`${currentYear}-${currentMonth + 1}-${new Date(currentYear, currentMonth + 1, 0).getDate()}`}
        markedDates={Object.keys(moodData).reduce((acc, date) => {
          acc[date] = {
            selected: true,
            selectedColor: moods.find((m) => m.label === moodData[date])?.color || '#FFF',
            selectedTextColor: '#000',
          };
          return acc;
        }, {})}
        onDayPress={handleDateSelect}
        monthFormat={'yyyy MM'}
        markingType={'simple'}
      />

      {/* Mood Legend */}
      <View style={styles.legend}>
        {moodPercentages.map((mood) => (
          <View key={mood.label} style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: mood.color }]} />
            <Text style={styles.moodText}>{mood.label}: {mood.percentage}%</Text>
          </View>
        ))}
      </View>

      {/* Pie Chart */}
      <PieChart
        data={moodPercentages.filter((mood) => mood.count > 0)}
        width={screenWidth}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerRow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  legend: {
    marginVertical: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  moodText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoodTracker;