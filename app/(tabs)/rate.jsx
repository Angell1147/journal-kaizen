import { Text, View, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import bgcolor from '@/assets/images/bg2.png'


const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = ['Depressed', 'Elevated', 'Irritability', 'Anxiety', 'Happy'];

  return (
    <View style={styles.container}>
      <Text style={styles.month}>JANUARY</Text>
      <View style={styles.moodList}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodItem,
              selectedMood === mood && styles.selectedMoodItem,
            ]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedMood && (
        <Text style={styles.selectedText}>Selected Mood: {selectedMood}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  month: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  moodList: {
    alignItems: 'center',
  },
  moodItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  selectedMoodItem: {
    backgroundColor: '#a0a0a0',
  },
  moodText: {
    fontSize: 18,
  },
  selectedText: {
    marginTop: 16,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MoodTracker;