import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SleepTracker() {
  const [date, setDate] = useState(new Date());
  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [entries, setEntries] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSleepTimePicker, setShowSleepTimePicker] = useState(false);
  const [showWakeTimePicker, setShowWakeTimePicker] = useState(false);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const savedEntries = await getStorageItem("sleepEntries");
        if (savedEntries) {
          setEntries(sortEntriesByDate(savedEntries));
        }
      } catch (error) {
        console.error("Failed to load entries:", error);
      }
    };

    loadEntries();
  }, []);

  useEffect(() => {
    const saveEntries = async () => {
      try {
        await setStorageItem("sleepEntries", entries);
      } catch (error) {
        console.error("Failed to save entries:", error);
      }
    };

    saveEntries();
  }, [entries]);

  const setStorageItem = async (key, value) => {
    if (Platform.OS === "web") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getStorageItem = async (key) => {
    if (Platform.OS === "web") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  };

  const calculateDuration = (start, end) => {
    let diff = end - start;

    if (end < start) {
      diff += 24 * 60 * 60 * 1000;
    }

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return { hours, minutes };
  };

  const sortEntriesByDate = (entries) => {
    return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const saveEntry = () => {
    const duration = calculateDuration(sleepTime, wakeTime);
    const recommendedSleep = 8;
    const totalRecommendedMinutes = recommendedSleep * 60;
    const totalSleepMinutes = duration.hours * 60 + duration.minutes;

    let excessSleep = 0;
    let lessSleep = 0;

    if (totalSleepMinutes > totalRecommendedMinutes) {
      excessSleep = totalSleepMinutes - totalRecommendedMinutes;
    } else if (totalSleepMinutes < totalRecommendedMinutes) {
      lessSleep = totalRecommendedMinutes - totalSleepMinutes;
    }

    const isPerfectSleep = totalSleepMinutes === totalRecommendedMinutes;

    const newEntry = {
      date: format(date, "yyyy-MM-dd"),
      sleepTime: format(sleepTime, "hh:mm a"),
      wakeTime: format(wakeTime, "hh:mm a"),
      duration,
      excessSleep: {
        hours: Math.floor(excessSleep / 60),
        minutes: excessSleep % 60,
      },
      lessSleep: {
        hours: Math.floor(lessSleep / 60),
        minutes: lessSleep % 60,
      },
      isPerfectSleep,
    };

    setEntries(sortEntriesByDate([...entries, newEntry]));
    setModalVisible(false);
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(sortEntriesByDate(updatedEntries));
  };

  const graphData = {
    labels: entries.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        data: entries.map((entry) => entry.duration.hours),
        color: (opacity = 1) => `rgba(0, 142, 151, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "web") {
      setDate(new Date(event.target.value));
    } else {
      setShowDatePicker(false);
      if (selectedDate) setDate(selectedDate);
    }
  };

  const handleSleepTimeChange = (event, selectedTime) => {
    if (Platform.OS === "web") {
      setSleepTime(new Date(`1970-01-01T${event.target.value}`));
    } else {
      setShowSleepTimePicker(false);
      if (selectedTime) setSleepTime(selectedTime);
    }
  };

  const handleWakeTimeChange = (event, selectedTime) => {
    if (Platform.OS === "web") {
      setWakeTime(new Date(`1970-01-01T${event.target.value}`));
    } else {
      setShowWakeTimePicker(false);
      if (selectedTime) setWakeTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.entriesContainer}>
        {entries.map((entry, index) => (
          <View key={index} style={styles.entry}>
            <Text style={styles.entryTitle}>Date: {entry.date}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.entryTitle}>Sleep Time: {entry.sleepTime}</Text>
              <Text style={styles.entryTitle}>Wake Time: {entry.wakeTime}</Text>
            </View>
            <Text style={styles.entryText}>
              DURATION: {entry.duration.hours} HRS {entry.duration.minutes} MINS
            </Text>
            {entry.excessSleep.hours > 0 && (
              <Text style={[styles.entryText, styles.excessSleep]}>
                EXCESS SLEEP OF {entry.excessSleep.hours} HRS {entry.excessSleep.minutes} MINS
              </Text>
            )}
            {entry.lessSleep.hours > 0 && (
              <Text style={[styles.entryText, styles.lessSleep]}>
                LESS SLEEP BY {entry.lessSleep.hours} HRS {entry.lessSleep.minutes} MINS
              </Text>
            )}
            {entry.isPerfectSleep && (
              <Text style={[styles.entryText, styles.perfectSleep]}>
                PERFECT SLEEP! 🎉
              </Text>
            )}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteEntry(index)}
            >
              <MaterialCommunityIcons name="trash-can" size={20} color="#008E97" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {entries.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Sleep Chronicle</Text>
          <LineChart
            data={graphData}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 142, 151, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: "#008E97" },
            }}
            style={{ marginVertical: 10, borderRadius: 16 }}
          />
        </View>
      )}
      

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>SET DATE AND TIME</Text>

            <Text style={styles.label}>Date:</Text>
            {Platform.OS === "web" ? (
              <input
                type="date"
                value={format(date, "yyyy-MM-dd")}
                onChange={handleDateChange}
              />
            ) : (
              <View style={styles.inputBox}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateText}>{format(date, "yyyy-MM-dd")}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
            )}

            <Text style={styles.label}>Sleep Time:</Text>
            {Platform.OS === "web" ? (
              <input
                type="time"
                value={format(sleepTime, "HH:mm")}
                onChange={handleSleepTimeChange}
              />
            ) : (
              <View style={styles.inputBox}>
                <TouchableOpacity onPress={() => setShowSleepTimePicker(true)}>
                  <Text style={styles.dateText}>{format(sleepTime, "hh:mm a")}</Text>
                </TouchableOpacity>
                {showSleepTimePicker && (
                  <DateTimePicker
                    value={sleepTime}
                    mode="time"
                    display="default"
                    onChange={handleSleepTimeChange}
                  />
                )}
              </View>
            )}

            <Text style={styles.label}>Wake Time:</Text>
            {Platform.OS === "web" ? (
              <input
                type="time"
                value={format(wakeTime, "HH:mm")}
                onChange={handleWakeTimeChange}
              />
            ) : (
              <View style={styles.inputBox}>
                <TouchableOpacity onPress={() => setShowWakeTimePicker(true)}>
                  <Text style={styles.dateText}>{format(wakeTime, "hh:mm a")}</Text>
                </TouchableOpacity>
                {showWakeTimePicker && (
                  <DateTimePicker
                    value={wakeTime}
                    mode="time"
                    display="default"
                    onChange={handleWakeTimeChange}
                  />
                )}
              </View>
            )}

            <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B9D9EB",
  },
  entriesContainer: {
    width: "100%",
    padding: 20,
  },
  entry: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  entryText: {
    fontSize: 14,
    marginBottom: 5,
  },
  excessSleep: {
    color: "blue",
    fontWeight: "bold",
  },
  lessSleep: {
    color: "red",
    fontWeight: "bold",
  },
  perfectSleep: {
    color: "green",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#008E97",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#008E97",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "gray",
  },
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: "column",
    marginBottom: 5,
  },
  deleteButton: {
    alignSelf: "flex-end",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: 150,
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
  },
});