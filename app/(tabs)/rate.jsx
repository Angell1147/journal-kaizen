import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";  // Import AsyncStorage


const screenWidth = Dimensions.get("window").width;

const App = () => {
  const [moods, setMoods] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7)); // Format: YYYY-MM

  // Mood categories
  const moodOptions = [
    { label: "Happy", color: "green", key: "happy" },
    { label: "Sad", color: "blue", key: "sad" },
    { label: "Angry", color: "red", key: "angry" },
    { label: "Neutral", color: "yellow", key: "neutral" },
    { label: "Excited", color: "purple", key: "excited" },
  ];


  // Load moods from AsyncStorage
  useEffect(() => {
    const loadMoods = async () => {
      try {
        const storedMoods = await AsyncStorage.getItem("moods");
        if (storedMoods) {
          setMoods(JSON.parse(storedMoods));
        }
      } catch (error) {
        console.error("Failed to load moods from AsyncStorage", error);
      }
    };

    loadMoods();
  }, []);

  // Save moods to AsyncStorage
  const saveMoodsToStorage = async (newMoods) => {
    try {
      await AsyncStorage.setItem("moods", JSON.stringify(newMoods));
    } catch (error) {
      console.error("Failed to save moods to AsyncStorage", error);
    }
  };

  // Handle mood selection
  const handleMoodSelection = (moodKey) => {
    if (selectedDay) {
      const newMoods = {
        ...moods,
        [selectedDay]: moodKey,
      };
      setMoods(newMoods);
      saveMoodsToStorage(newMoods);
      setModalVisible(false);
    }
  };

  // Filter moods for the current month
  const filteredMoods = Object.keys(moods).filter((date) =>
    date.startsWith(currentMonth)
  );

  // Count moods for pie chart
  const moodCounts = moodOptions.map((mood) => ({
    ...mood,
    count: filteredMoods.filter((date) => moods[date] === mood.key).length,
  }));

  const pieData = moodCounts
    .filter((mood) => mood.count > 0) // Exclude moods with 0 count
    .map((mood) => ({
      name: mood.label,
      population: mood.count,
      color: mood.color,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }));

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* Calendar */}
      <Calendar
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
          setModalVisible(true); // Open mood selection modal
        }}
        onMonthChange={(month) => {
          setCurrentMonth(month.dateString.slice(0, 7)); // Update current month (YYYY-MM)
        }}
        markedDates={Object.keys(moods).reduce((acc, date) => {
          if (date.startsWith(currentMonth)) {
            acc[date] = {
              selected: true,
              selectedColor: moodOptions.find((m) => m.key === moods[date])?.color,
            };
          }
          return acc;
        }, {})}
      />

      {/* Pie Chart */}
      <Text style={{ textAlign: "center", marginVertical: 20, fontSize: 18 }}>
        Mood Distribution for {currentMonth}
      </Text>
      {pieData.length > 0 ? (
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={{ textAlign: "center" }}>No moods selected yet for this month.</Text>
      )}

      {/* Mood Selection Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Select Mood for {selectedDay}
            </Text>
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood.key}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
                onPress={() => handleMoodSelection(mood.key)}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: mood.color,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 16 }}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default App;
