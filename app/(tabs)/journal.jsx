import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JournalScreen({ navigation }) {
  const [highlight, setHighlight] = useState('');
  const [journal, setJournal] = useState('');
  const [savedJournals, setSavedJournals] = useState([]);

  // Fetch saved journals on component mount
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const existingJournals = await AsyncStorage.getItem('journals');
        const journals = existingJournals ? JSON.parse(existingJournals) : [];
        setSavedJournals(journals);
      } catch (e) {
        console.error(e);
      }
    };
    fetchJournals();
  }, []);

  // Save Highlight
  const saveHighlight = async () => {
    if (!highlight) {
      alert('Please write a highlight.');
      return;
    }

    try {
      const existingHighlights = await AsyncStorage.getItem('highlights');
      const highlights = existingHighlights ? JSON.parse(existingHighlights) : [];
      const newHighlight = { date: new Date().toLocaleDateString(), text: highlight };
      highlights.push(newHighlight);
      await AsyncStorage.setItem('highlights', JSON.stringify(highlights));
      setHighlight(''); // Clear the input field after saving
    } catch (e) {
      console.error(e);
    }
  };

  // Save Journal
  const saveJournal = async () => {
    if (!journal) {
      alert('Please write a journal entry.');
      return;
    }

    try {
      const existingJournals = await AsyncStorage.getItem('journals');
      const journals = existingJournals ? JSON.parse(existingJournals) : [];
      const newJournal = { date: new Date().toLocaleDateString(), text: journal };
      journals.push(newJournal);
      await AsyncStorage.setItem('journals', JSON.stringify(journals));
      setSavedJournals(journals); // Update state to display the saved journals
      setJournal(''); // Clear the input field after saving
    } catch (e) {
      console.error(e);
    }
  };

  const saveBoth = () => {
    saveHighlight();
    saveJournal();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Highlight of the Day Section */}
      <View style={styles.section}>
        <TextInput
          placeholder="Highlight of your day"
          value={highlight}
          onChangeText={setHighlight}
          style={styles.highlightInput}
          multiline
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />
        {/* <TouchableOpacity style={styles.saveButton} onPress={saveHighlight}>
          <Text style={styles.saveButtonText}>Save Highlight</Text>
        </TouchableOpacity> */}
        
      </View>

      {/* Journal Writing Section */}
      <View style={styles.section}>
        <TextInput
          placeholder="START WRITING 
          your thoughts deserve a space"
          value={journal}
          onChangeText={setJournal}
          style={styles.journalInput}
          multiline
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveBoth}>
          <Text style={styles.saveButtonText}>Save Journal</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Journals Section
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Journals</Text>
        {savedJournals.length > 0 ? (
          savedJournals.map((entry, index) => (
            <View key={index} style={styles.journalEntry}>
              <Text style={styles.journalDate}>{entry.date}</Text>
              <Text style={styles.journalText}>{entry.text}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noEntriesText}>No saved journals yet.</Text>
        )}
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFAF3',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  highlightInput: {
    height: 120,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  journalInput: {
    height: 540,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#008E97',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  journalEntry: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  journalDate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  journalText: {
    fontSize: 16,
    color: '#333',
  },
  noEntriesText: {
    fontSize: 16,
    color: '#777',
  },
});
