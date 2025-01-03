import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Use any icon library you prefer
import { Calendar } from 'react-native-calendars'; // Import Calendar component

export default function HighlightsScreen() {
  const [highlights, setHighlights] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newHighlight, setNewHighlight] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // Show calendar on button click
  const [markedDates, setMarkedDates] = useState({});

  // Get today's date in the format "Month Day" (e.g., "Jan 15")
  const getTodayDate = () => {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'short' });
    const day = today.getDate();
    return `${month} ${day}`;
  };

  // Fetch highlights from AsyncStorage on component mount
  useEffect(() => {
    const fetchHighlights = async () => {
      const result = await AsyncStorage.getItem('highlights');
      if (result) {
        const parsedHighlights = JSON.parse(result);
        // Update all highlights to use today's date
        const updatedHighlights = parsedHighlights.map((highlight) => ({
          ...highlight,
          date: getTodayDate(), // Override the date with today's date
        }));
        setHighlights(updatedHighlights);
        markDatesOnCalendar(updatedHighlights);
      }
    };
    fetchHighlights();
  }, []);

  const markDatesOnCalendar = (highlights) => {
    const newMarkedDates = {};
    highlights.forEach((highlight) => {
      const [month, day] = highlight.date.split(' ');
      const formattedDate = `${month} ${day}`;
      newMarkedDates[formattedDate] = {
        marked: true,
        dotColor: 'blue',
        selectedDotColor: 'green', // Green tick for selected date
      };
    });
    setMarkedDates(newMarkedDates);
  };

  // Save a new highlight
  const saveHighlight = async () => {
    if (!newHighlight) {
      alert('Please enter a highlight.');
      return;
    }

    const newItem = {
      date: getTodayDate(), // Use today's date
      text: newHighlight,
    };

    // Update the highlights array and save it
    const updatedHighlights = [...highlights, newItem];
    setHighlights(updatedHighlights);

    // Save to AsyncStorage
    await AsyncStorage.setItem('highlights', JSON.stringify(updatedHighlights));

    // Close modal and reset input
    setIsModalVisible(false);
    setNewHighlight('');
    markDatesOnCalendar(updatedHighlights);
  };

  // Delete a highlight
  const deleteHighlight = async (index) => {
    const updatedHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(updatedHighlights);

    // Save the updated highlights to AsyncStorage
    await AsyncStorage.setItem('highlights', JSON.stringify(updatedHighlights));
  };

  // Render each highlight item
  const renderItem = ({ item, index }) => {
    const colors = ['#FEE4C4', '#E6D4FF', '#FFEDC5', '#D2EFFF', '#FFE4E6', '#DFFFD4', '#F4DFF5', '#C9FFF7', '#FFF4CC', '#E3DFFB'];
    const tabColor = colors[index % colors.length]; // Cycle through colors based on index

    // Split item.date into month and day
    const [month, day] = item.date.split(' ');

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
    <View style={styles.container}>
      <Text style={styles.header}>THE DAY THAT WAS</Text>

      {/* Displaying the calendar */}
      {isCalendarVisible && (
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={markedDates} // Marked dates from state
            markingType={'multi-dot'}
            onDayPress={(day) => {
              console.log('Selected day:', day);
            }}
            renderDay={(day, selectedDate, inRange) => {
                const isMarked = markedDates[day.dateString];
                return (
                  <View style={{ alignItems: 'center' }}>
                    {/* Render the date */}
                    <Text style={styles.calendarDate}>{day.day}</Text>
              
                    {/* Show green tick if date is marked */}
                    {isMarked && (
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color="green"
                        style={{ marginTop: 5 }} // Adjust for spacing if needed
                      />
                    )}
                  </View>
                );
              }}
              
          />
        </View>
      )}

      <FlatList
        data={highlights}
        keyExtractor={(item, index) => index.toString()} // Add keyExtractor
        renderItem={renderItem}
        contentContainerStyle={styles.listContent} // Add padding to the list
      />

      {/* Floating Calendar Button */}
      <TouchableOpacity
        style={styles.floatingCalendarButton}
        onPress={() => setIsCalendarVisible(!isCalendarVisible)} // Toggle calendar visibility
      >
        <MaterialCommunityIcons name="calendar" size={30} color="white" />
      </TouchableOpacity>

      {/* Floating Write Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <MaterialCommunityIcons name="pencil" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal for Writing a Highlight */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFAF3',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#5C5C5C',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 80, // Add padding to avoid overlap with the FAB
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
    marginTop: 2, // Space the day below the month
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
    bottom: 5, // Increased space between the calendar icon and pencil icon
    right: 20,
    backgroundColor: '#008E97',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingCalendarButton: {
    position: 'absolute',
    bottom: 70, // Adjusted for spacing between icons
    right: 20,
    backgroundColor: '#008E97',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  calendarContainer: {
    position: 'absolute',
    bottom: 110, // Adjusted for proper positioning
    right: 20,
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
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
    height: 100, // Increased height for multiline input
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    textAlignVertical: 'top', // Align text to the top
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
  calendarDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5, // Space between date and tick
  },
});
