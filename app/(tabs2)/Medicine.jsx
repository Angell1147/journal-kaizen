import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Medicine() {
  const [medicineName, setMedicineName] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "AIzaSyCJu6mki4Ar-DW-VdIctNP1HmhWCVg4D3A"; // Replace with your actual Google Generative AI API key
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const fetchMedicineDetails = async () => {
    if (!medicineName.trim()) {
      setError("Please enter a medicine name.");
      return;
    }

    setLoading(true);
    setError(null);
    setMedicineInfo(null);

    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 256,
      responseMimeType: "text/plain",
    };

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                text: `What are the uses and side effects of the medicine ${medicineName}?`,
              },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage(
        `What are the uses and side effects of the medicine ${medicineName}?`
      );

      setMedicineInfo(result.response.text());
    } catch (err) {
      console.error("Error while fetching medicine information:", err);
      setError("Failed to fetch medicine information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter medicine name"
        value={medicineName}
        onChangeText={setMedicineName}
      />
      <Pressable style={styles.button} onPress={fetchMedicineDetails}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
      {loading && <ActivityIndicator size="large" color="#007BFF" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {medicineInfo && (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Medicine Details</Text>
          <Text style={styles.resultText}>{medicineInfo}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EAF4F4",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  button: {
    backgroundColor: "#4C516D",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Works for Android
  },
  resultTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  resultText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    textAlign: "justify",
  },
});
