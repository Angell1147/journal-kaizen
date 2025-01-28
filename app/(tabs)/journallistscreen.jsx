import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function JournalsListScreen() {
  const [savedJournals, setSavedJournals] = useState([]);

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

  // const fetchJournals = async () => {
  //   try {
  //     const existingJournals = await AsyncStorage.getItem('journals');
  //     if (existingJournals) {
  //       try {
  //         const journals = JSON.parse(existingJournals);
  //         setSavedJournals(journals);
  //       } catch (error) {
  //         console.error('Error parsing journals:', error);
  //       }
  //     } else {
  //       setSavedJournals([]);
  //     }
  //   } catch (e) {
  //     console.error('Error fetching journals:', e);
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchJournals();
  //   }, [])
  // );

  const deleteJournal = async (index) => {
    const updatedJournals = savedJournals.filter((_, i) => i !== index);
    console.log('Updated Journals: ', updatedJournals);
    setSavedJournals(updatedJournals);
    await AsyncStorage.setItem('journals', JSON.stringify(updatedJournals));
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
                <Text style={styles.journalText}>{entry.text}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteJournal(index)} style={styles.deleteButton}>
                <Icon name="delete" size={24} color="#FF0000" />
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
  container: {
    flex: 1,
    backgroundColor: '#DCEDF0',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
  journalTextContainer: {
    flex: 1,
  },
  journalDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  journalText: {
    fontSize: 16,
    color: '#333',
  },
  noEntriesText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
  deleteButton: {
    marginLeft: 10,
  },
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
