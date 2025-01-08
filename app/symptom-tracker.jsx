import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';

import uploadedImage from "@/assets/images/symptom.jpeg"; // Replace with the path to the uploaded image

export default function SymptomTracker() {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const fetchDiagnosis = async () => {
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCJu6mki4Ar-DW-VdIctNP1HmhWCVg4D3A',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: symptoms, // Symptoms provided by the user
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);

        const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No diagnosis found';
        setDiagnosis(content);
        setSuggestions(''); // Clear suggestions for now, as the response does not include separate suggestions
      } else {
        const errorData = await response.json();
        console.error('Error Data:', errorData);
        Alert.alert('Error', `Error: ${errorData.message || 'Unable to fetch diagnosis.'}`);

      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching the diagnosis.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={uploadedImage} style={styles.image} />

      <Text style={styles.title}>Track the clues your body gives</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Describe your symptoms</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe all symptoms here"
          value={symptoms}
          onChangeText={setSymptoms}
          multiline
          numberOfLines={4}
        />
      </View>

      <Button title="Get Diagnosis" onPress={fetchDiagnosis} color="#007BFF" />

      {diagnosis && (
        <View style={styles.diagnosisSection}>
          <Text style={styles.diagnosisTitle}>Diagnosis</Text>
          <Text style={styles.diagnosisText}>{diagnosis}</Text>
        </View>
      )}

      {suggestions && (
        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsTitle}>Suggestions</Text>
          <Text style={styles.suggestionsText}>{suggestions}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  diagnosisSection: {
    width: '100%',
    marginBottom: 20,
  },
  diagnosisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  diagnosisText: {
    fontSize: 16,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  suggestionsSection: {
    width: '100%',
    marginTop: 20,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestionsText: {
    fontSize: 16,
  },
});
