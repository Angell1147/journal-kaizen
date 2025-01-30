import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JournalsListScreen() {
  const [savedJournals, setSavedJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const existingJournals = await AsyncStorage.getItem('journals');
        const journals = existingJournals ? JSON.parse(existingJournals) : [];
        setSavedJournals(journals);
      } catch (e) {
        console.error('Error fetching journals: ', e);
      }
    };
    fetchJournals();
  }, []);

  useEffect(() => {
    const saveToStorage = async () => {
      try {
        await AsyncStorage.setItem('journals', JSON.stringify(savedJournals));
      } catch (e) {
        console.error('Error saving journals: ', e);
      }
    };

    saveToStorage(); // Always sync, even when empty
  }, [savedJournals]);

  const deleteJournal = (index) => {
    setSavedJournals((prevJournals) => {
      const updatedJournals = prevJournals.filter((_, i) => i !== index);
      return [...updatedJournals]; // Ensure new array is returned
    });
  };

  const toggleText = (index) => {
    setSavedJournals((prevJournals) => {
      return prevJournals.map((journal, i) =>
        i === index ? { ...journal, isExpanded: !journal.isExpanded } : journal
      );
    });
  };

  const getLimitedText = (text) => {
    const words = text.split(' ');
    return words.length > 50 ? words.slice(0, 50).join(' ') + '...' : text;
  };

  const addNewJournal = (newJournal) => {
    setSavedJournals((prevJournals) => [...prevJournals, newJournal]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Saved Journals</Text>
        {savedJournals.length > 0 ? (
          savedJournals.map((entry, index) => (
            <View key={index} style={styles.journalEntry}>
              <View style={styles.journalTextContainer}>
                <Text style={styles.journalDate}>{entry.date}</Text>
                <Text style={styles.journalText}>
                  {entry.isExpanded ? entry.text : getLimitedText(entry.text)}
                </Text>
                {entry.text.split(' ').length > 50 && (
                  <TouchableOpacity onPress={() => toggleText(index)}>
                    <Text style={styles.toggleText}>
                      {entry.isExpanded ? 'Show less' : 'Show more'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity onPress={() => deleteJournal(index)} style={styles.deleteButton}>
                <Icon name="delete" size={24} color="#4B9CD3" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noEntriesText}>No saved journals yet.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          const { router } = require('expo-router');
          router.push('/journal');
        }}
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#DCEDF0', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  journalEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  journalTextContainer: { flex: 1 },
  journalDate: { fontSize: 14, color: '#555', marginBottom: 5 },
  journalText: { fontSize: 16, color: '#333' },
  noEntriesText: { fontSize: 16, color: '#777', textAlign: 'center', marginTop: 50 },
  deleteButton: { marginLeft: 10 },
  toggleText: { fontSize: 14, color: '#4B9CD3', marginTop: 5 },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#008E97',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
