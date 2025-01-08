import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Medicine() {
  const [medicineName, setMedicineName] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [error, setError] = useState(null);

  // Directly set the API key (replace with your actual API key)
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

      setMedicineInfo(result.response.text()); // Update the state with the response
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
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Information:</Text>
          <Text>{medicineInfo}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
});
