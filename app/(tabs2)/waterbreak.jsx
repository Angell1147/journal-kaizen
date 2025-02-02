

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Circle } from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons"; // For delete icon
import ConfettiCannon from "react-native-confetti-cannon"; // For confetti effect

const WaterBreakReminder = () => {
  const [dailyTarget, setDailyTarget] = useState(0);
  const [consumedWater, setConsumedWater] = useState(0);
  const [hourlyIntake, setHourlyIntake] = useState(0);
  const [waterDrunkThisHour, setWaterDrunkThisHour] = useState(0);
  const [dailyDataHistory, setDailyDataHistory] = useState([]);
  const [confetti, setConfetti] = useState(false); // To control confetti

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    saveStoredData();
    if (progress >= 1) {
      setConfetti(true); // Trigger confetti when target is reached
      setTimeout(() => setConfetti(false), 5000); // Stop confetti after 5 seconds
    }
  }, [dailyTarget, consumedWater, dailyDataHistory]);

  const loadStoredData = async () => {
    try {
      const storedTarget = await AsyncStorage.getItem("dailyTarget");
      const storedConsumed = await AsyncStorage.getItem("consumedWater");
      const storedHistory = await AsyncStorage.getItem("dailyDataHistory");

      if (storedTarget) setDailyTarget(parseFloat(storedTarget));
      if (storedConsumed) setConsumedWater(parseFloat(storedConsumed));
      if (storedHistory) setDailyDataHistory(JSON.parse(storedHistory));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const saveStoredData = async () => {
    try {
      await AsyncStorage.setItem("dailyTarget", dailyTarget.toString());
      await AsyncStorage.setItem("consumedWater", consumedWater.toString());
      await AsyncStorage.setItem("dailyDataHistory", JSON.stringify(dailyDataHistory));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const submitDrinkAmount = () => {
    if (waterDrunkThisHour <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid water amount.");
      return;
    }
    setConsumedWater((prev) => prev + waterDrunkThisHour);
    setWaterDrunkThisHour(0);
  };

  const handleReset = () => {
    const currentDate = new Date().toLocaleDateString();
    setDailyDataHistory((prevData) => [
      ...prevData,
      {
        date: currentDate,
        target: dailyTarget,
        consumed: (consumedWater / 1000).toFixed(2),
      },
    ]);
    setDailyTarget(0);
    setConsumedWater(0);
    setWaterDrunkThisHour(0);
    setHourlyIntake(0);
  };

  const deleteHistoryEntry = (index) => {
    const updatedHistory = dailyDataHistory.filter((_, i) => i !== index);
    setDailyDataHistory(updatedHistory);
  };

  const progress = dailyTarget ? Math.min(consumedWater / (dailyTarget * 1000), 1) : 0;

  const circleColor =
    progress >= 1
      ? "#4caf50" // Green when target is completed
      : progress >= 0.5
      ? "#ff9800" // Orange when more than 50%
      : "#f44336"; // Red when less than 50%

  return (
    <View style={styles.container}>
      {confetti && <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} />}
      <Text style={styles.title}>Water Break Reminder</Text>

      <Text style={styles.label}>Daily Target (liters):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={dailyTarget.toString()}
        onChangeText={(text) => setDailyTarget(Math.max(0, parseFloat(text) || 0))}
      />

      <Text style={styles.label}>Enter volume of water drunk this hour (ml):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={waterDrunkThisHour.toString()}
        onChangeText={(text) => setWaterDrunkThisHour(Math.max(0, parseFloat(text) || 0))}
      />
      <Button title="Submit" onPress={submitDrinkAmount} />

      <View style={styles.gaugeContainer}>
        <Text style={styles.progressText}>Water Intake Progress</Text>
        <Circle progress={progress} strokeWidth={15} size={150} color={circleColor} />
        <Text style={styles.progressPercentage}>{(progress * 100).toFixed(0)}%</Text>
      </View>

      <Button title="Reset Target" onPress={handleReset} color="#d9534f" />

      <Text style={styles.historyTitle}>Daily Consumption History</Text>
      <FlatList
        data={dailyDataHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.historyRow}>
            <Text style={styles.historyText}>{item.date}</Text>
            <Text style={styles.historyText}>{item.target} L</Text>
            <Text style={styles.historyText}>{item.consumed} L</Text>
            <MaterialIcons name="delete" size={24} color="#d9534f" onPress={() => deleteHistoryEntry(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#bbdefb",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0e2237",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  gaugeContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  historyText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default WaterBreakReminder;
