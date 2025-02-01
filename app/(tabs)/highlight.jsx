import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect, useNavigation } from 'expo-router';
import bgcolor from "@/assets/images/bg2.png";
import { format, parseISO, isValid } from 'date-fns';

export default function HighlightsScreen() {
  const navigation = useNavigation();
  const [highlights, setHighlights] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newHighlight, setNewHighlight] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  const getTodayDate = () => format(new Date(), 'yyyy-MM-dd');

  const fetchHighlights = async () => {
    const result = await AsyncStorage.getItem('highlights');
    if (result) {
      try {
        const parsedHighlights = JSON.parse(result);
        const validHighlights = parsedHighlights.filter(item => isValid(new Date(item.date)));
        setHighlights(validHighlights);
        markDatesOnCalendar(validHighlights);
      } catch (error) {
        console.error("Error parsing highlights:", error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHighlights();
    }, [])
  );

  const markDatesOnCalendar = (highlights) => {
    const newMarkedDates = {};
    highlights.forEach((highlight) => {
      if (isValid(new Date(highlight.date))) {
        newMarkedDates[highlight.date] = {
          marked: true,
          customStyles: {
            container: { backgroundColor: 'transparent' },
            text: { color: 'green', fontWeight: 'bold' },
          },
        };
      }
    });
    setMarkedDates(newMarkedDates);
  };

  const saveHighlight = async () => {
    if (!newHighlight.trim()) return alert('Please enter a highlight.');

    const newItem = { date: getTodayDate(), text: newHighlight.trim() };
    const updatedHighlights = [...highlights, newItem];
    setHighlights(updatedHighlights);
    await AsyncStorage.setItem('highlights', JSON.stringify(updatedHighlights));
    setIsModalVisible(false);
    setNewHighlight('');
    markDatesOnCalendar(updatedHighlights);
  };

  const deleteHighlight = async (index) => {
    const updatedHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(updatedHighlights);
    await AsyncStorage.setItem('highlights', JSON.stringify(updatedHighlights));
    markDatesOnCalendar(updatedHighlights);
  };
  
  const formatDateToMonthDay = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d'); // Example: "Jan 9"
    } catch {
      return 'Invalid Date';
    }
  };

  const renderItem = ({ item, index }) => {
    const colors = ['#FEE4C4', '#E6D4FF', '#FFEDC5', '#D2EFFF', '#FFE4E6', '#DFFFD4', '#F4DFF5', '#C9FFF7', '#FFF4CC', '#E3DFFB'];
    const tabColor = colors[index % colors.length];
    const [month, day] = formatDateToMonthDay(item.date).split(' ');

    return (
      <View style={[styles.highlightBox, { backgroundColor: tabColor }]}>
        <View style={styles.dateBox}>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.day}>{day}</Text>
        </View>
        <Text style={styles.highlightText}>{item.text}</Text>
        <TouchableOpacity onPress={() => deleteHighlight(index)} style={styles.deleteButton}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="#5072A7" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={bgcolor} resizeMode="cover" style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.header}>THE DAY THAT WAS</Text>

        {isCalendarVisible && (
          <View style={styles.calendarContainer}>
            <Calendar
              markedDates={markedDates}
              markingType={'custom'}
              onDayPress={(day) => console.log('Selected day:', day.dateString)}
            />
          </View>
        )}

        <FlatList
          data={highlights}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        <TouchableOpacity
          style={styles.floatingCalendarButton}
          onPress={() => setIsCalendarVisible(!isCalendarVisible)}
        >
          <MaterialCommunityIcons name="calendar" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsModalVisible(true)}
        >
          <MaterialCommunityIcons name="pencil" size={30} color="white" />
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add a Highlight</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Write your highlight..."
                value={newHighlight}
                onChangeText={setNewHighlight}
                multiline
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={saveHighlight}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DCEDF0',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#5C5C5C',
    textAlign: 'center',
  },
  bg: {
    height: '100%',
    width: 'auto',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 80,
  },
  highlightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 12,
    height: 60,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#FFF',
    borderRightWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 5,
  },
  month: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7D7D7D',
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3D3D3D',
    marginTop: 2,
  },
  highlightText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '400',
    color: '#3D3D3D',
  },
  deleteButton: {
    padding: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    backgroundColor: '#008E97',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  floatingCalendarButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#008E97',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  calendarContainer: {
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#008E97',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
