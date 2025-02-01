import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';

const API_KEY = 'InGychJ06GX4v2WCFKzC4UCrt0AhJVCuwFtNAPkp';

const MealTracker = () => {
  const [mealType, setMealType] = useState('breakfast');
  const [meal, setMeal] = useState('');
  const [mealSize, setMealSize] = useState('');
  const [sizeType, setSizeType] = useState('grams');
  const [nutritionData, setNutritionData] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        const savedData = await AsyncStorage.getItem(`dailyMealLog_${formattedDate}`);
        if (savedData) {
          setNutritionData(JSON.parse(savedData));
        } else {
          setNutritionData({
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            proteinPercent: 0,
            carbsPercent: 0,
            fatsPercent: 0,
          });
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load saved data.');
      }
    };

    loadData();
  }, [selectedDate]);

  useEffect(() => {
    const saveData = async () => {
      try {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        await AsyncStorage.setItem(
          `dailyMealLog_${formattedDate}`,
          JSON.stringify(nutritionData)
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to save data.');
      }
    };

    saveData();
  }, [nutritionData, selectedDate]);

  const fetchFoodData = async (meal) => {
    try {
      const searchResponse = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search`,
        {
          params: {
            query: meal,
            api_key: API_KEY,
          },
        }
      );

      if (searchResponse.data.foods && searchResponse.data.foods.length > 0) {
        const fdcId = searchResponse.data.foods[0].fdcId;

        const foodResponse = await axios.get(
          `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );

        const foodNutrients = foodResponse.data.foodNutrients;
        const extractNutrient = (name) =>
          foodNutrients.find((item) => item.nutrient.name === name)?.amount || 0;

        const calories = extractNutrient('Energy');
        const protein = extractNutrient('Protein');
        const carbs = extractNutrient('Carbohydrate, by difference');
        const fats = extractNutrient('Total lipid (fat)');

        updateNutritionData({
          calories,
          protein,
          carbs,
          fats,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch food data.');
    }
  };

  const updateNutritionData = (newData) => {
    setNutritionData((prevData) => {
      const updatedData = {
        calories: prevData.calories + newData.calories,
        protein: prevData.protein + newData.protein,
        carbs: prevData.carbs + newData.carbs,
        fats: prevData.fats + newData.fats,
      };

      const totalMacronutrients =
        updatedData.protein + updatedData.carbs + updatedData.fats;

      return {
        ...updatedData,
        proteinPercent: (updatedData.protein / totalMacronutrients) * 100 || 0,
        carbsPercent: (updatedData.carbs / totalMacronutrients) * 100 || 0,
        fatsPercent: (updatedData.fats / totalMacronutrients) * 100 || 0,
      };
    });
  };

  const handleSubmit = () => {
    if (!meal) {
      Alert.alert('Error', 'Please enter a meal!');
      return;
    }
    fetchFoodData(meal);
  };

  const handleDateChange = (event, date) => {
    setShowPicker(true);
    if (date) {
      setSelectedDate(date);
    }
  };

  const chartData = [
    { name: 'Protein', population: nutritionData.proteinPercent, color:'rgb(186, 123, 125)' },
    { name: 'Carbs', population: nutritionData.carbsPercent, color: '#0066B2' },
    { name: 'Fats', population: nutritionData.fatsPercent, color: '#008080' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MEAL MATRIX</Text>

      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text>{moment(selectedDate).format('YYYY-MM-DD')}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} />
      )}
      {/* Meal Type Dropdown */}
      <Picker
        selectedValue={mealType}
        onValueChange={(itemValue) => setMealType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Breakfast" value="breakfast" />
        <Picker.Item label="Lunch" value="lunch" />
        <Picker.Item label="Dinner" value="dinner" />
        <Picker.Item label="Snacks" value="snacks" />
      </Picker>

      <TextInput style={styles.input} placeholder="What did you eat?" value={meal} onChangeText={setMeal} />
      <TextInput style={styles.input} placeholder={`Meal Size (${sizeType})`} value={mealSize} onChangeText={setMealSize} keyboardType="numeric" />
      <View style={styles.radioContainer}>
        <Button
          title="Grams"
          color={sizeType === 'grams' ? '#4682B4' : '#4F97A3'}
          onPress={() => setSizeType('grams')}
        />
        <Button
          title="Pieces"
          color={sizeType === 'pieces' ? '#4682B4' : '#4F97A3'}
          onPress={() => setSizeType('pieces')}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} color={'#4C516D'} />

      {nutritionData.calories > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Calories: {nutritionData.calories} kcal</Text>
          <PieChart
            data={chartData}
            width={300}
            height={300}
            chartConfig={{ backgroundColor: 'transparent', color: (opacity) => `rgba(0, 0, 0, ${opacity})` }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="50"
            absolute
            hasLegend={false}
          />

          {/* Custom Legend with Percentage Always Visible */}
          <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendRow}>
                <Text style={[styles.resultText, { color: item.color, flex: 1 }]}>{item.name}</Text>
                <Text style={[styles.resultText, { flex: 1, textAlign: 'right' }]}>
                  {item.population.toFixed(2)}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#EAF4F4" },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: 'black', borderRadius: 8, padding: 10, marginVertical: 5, backgroundColor: "white" },
  picker: { height: 55, marginVertical: 5, marginTop: 10 },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginVertical: 20,
  },
  resultContainer: { marginTop: 20, alignItems: 'center' },
  resultText: { fontSize: 18, marginVertical: 5 },
  legendContainer: { marginTop: 20 },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 5 },
});

export default MealTracker;
