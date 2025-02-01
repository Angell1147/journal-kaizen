import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Button } from 'react-native';

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [journalInput, setJournalInput] = useState('');

  const addEntry = () => {
    if (journalInput.trim() === '') {
      return;
    }
    setEntries([...entries, { id: Date.now().toString(), content: journalInput }]);
    setJournalInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Journal</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your journal entry..."
        value={journalInput}
        onChangeText={setJournalInput}
        multiline
      />
      <Button title="Add Entry" onPress={addEntry} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryItem}>
            <Text style={styles.entryText}>{item.content}</Text>
          </View>
        )}
        style={styles.entryList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  entryList: {
    marginTop: 20,
  },
  entryItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  entryText: {
    fontSize: 16,
  },
});
