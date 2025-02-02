import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const App = () => {
  const [moods, setMoods] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

  const moodOptions = [
    { label: "Happy", color: '#4ECDC4', key: "happy" },
    { label: "Sad", color: '#A8E6CF', key: "sad" },
    { label: "Angry", color: '#D4A5A5', key: "angry" },
    { label: "Neutral", color: '#F5F5DC', key: "neutral" },
    { label: "Excited", color: '#9EC1CF', key: "excited" },
  ];

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

  const saveMoodsToStorage = async (newMoods) => {
    try {
      await AsyncStorage.setItem("moods", JSON.stringify(newMoods));
    } catch (error) {
      console.error("Failed to save moods to AsyncStorage", error);
    }
  };

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

  // New function to handle mood deletion
  const handleDeleteMood = () => {
    if (selectedDay) {
      const newMoods = { ...moods };
      delete newMoods[selectedDay];
      setMoods(newMoods);
      saveMoodsToStorage(newMoods);
      setModalVisible(false);
    }
  };

  const filteredMoods = Object.keys(moods).filter((date) =>
    date.startsWith(currentMonth)
  );

  const moodCounts = moodOptions.map((mood) => ({
    ...mood,
    count: filteredMoods.filter((date) => moods[date] === mood.key).length,
  }));

  const pieData = moodCounts
    .filter((mood) => mood.count > 0)
    .map((mood) => ({
      name: mood.label,
      population: mood.count,
      color: mood.color,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
      borderWidth: 3,
      borderColor: "#000"
    }));

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#EAF4F4" }}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
          setModalVisible(true);
        }}
        onMonthChange={(month) => {
          setCurrentMonth(month.dateString.slice(0, 7));
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

      <Text style={{ textAlign: "center", marginVertical: 20, fontSize: 18 }}>
        Mood Distribution for {currentMonth}
      </Text>
      {pieData.length > 0 ? (
        <View
          style={{
            alignItems: "center",
            borderWidth: 3,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 10,
            marginBottom: 20,
            backgroundColor: "#f9f9f9",
          }}
        >
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      ) : (
        <Text style={{ textAlign: "center" }}>No moods selected yet for this month.</Text>
      )}

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
              {moods[selectedDay] 
                ? `Current Mood for ${selectedDay}` 
                : `Select Mood for ${selectedDay}`}
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
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="gray"
              />
              {moods[selectedDay] && (
                <Button
                  title="Delete Mood"
                  onPress={handleDeleteMood}
                  color="red"
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default App;