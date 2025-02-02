
// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   Button,
// //   StyleSheet,
// //   ScrollView,
// //   Alert,
// //   TouchableOpacity,
// //   Platform,
// //   Modal,
// //   FlatList
// // } from 'react-native';
// // import axios from 'axios';
// // import { PieChart } from 'react-native-chart-kit';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import moment from 'moment';
// // import {Picker} from '@react-native-picker/picker';

// // const API_KEY = 'InGychJ06GX4v2WCFKzC4UCrt0AhJVCuwFtNAPkp';

// // const MealTracker = () => {
// //   const [mealType, setMealType] = useState('breakfast');
// //   const [meal, setMeal] = useState('');
// //   const [mealSize, setMealSize] = useState('');
// //   const [sizeType, setSizeType] = useState('grams');
// //   const [nutritionData, setNutritionData] = useState({
// //     calories: 0,
// //     protein: 0,
// //     carbs: 0,
// //     fats: 0,
// //     proteinPercent: 0,
// //     carbsPercent: 0,
// //     fatsPercent: 0,
// //   });
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [showPicker, setShowPicker] = useState(false);
// //   const [mealHistory, setMealHistory] = useState([]);
// //   const [modalVisible, setModalVisible] = useState(false);

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
// //         const savedData = await AsyncStorage.getItem(`dailyMealLog_${formattedDate}`);
// //         if (savedData) {
// //           setNutritionData(JSON.parse(savedData));
// //         } else {
// //           setNutritionData({
// //             calories: 0,
// //             protein: 0,
// //             carbs: 0,
// //             fats: 0,
// //             proteinPercent: 0,
// //             carbsPercent: 0,
// //             fatsPercent: 0,
// //           });
// //         }
// //       } catch (error) {
// //         Alert.alert('Error', 'Failed to load saved data.');
// //       }
// //     };

// //     loadData();
// //   }, [selectedDate]);

// //   useEffect(() => {
// //     const saveData = async () => {
// //       try {
// //         const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
// //         await AsyncStorage.setItem(
// //           `dailyMealLog_${formattedDate}`,
// //           JSON.stringify(nutritionData)
// //         );
        
// //         // Save the meal log in history
// //         const savedHistory = await AsyncStorage.getItem('mealHistory');
// //         const history = savedHistory ? JSON.parse(savedHistory) : [];
// //         history.push({ date: formattedDate, ...nutritionData });
// //         await AsyncStorage.setItem('mealHistory', JSON.stringify(history));
// //         setMealHistory(history); // Update history state
// //       } catch (error) {
// //         Alert.alert('Error', 'Failed to save data.');
// //       }
// //     };

// //     saveData();
// //   }, [nutritionData, selectedDate]);

// //   const fetchFoodData = async (meal) => {
// //     try {
// //       const searchResponse = await axios.get(
// //         `https://api.nal.usda.gov/fdc/v1/foods/search`,
// //         {
// //           params: {
// //             query: meal,
// //             api_key: API_KEY,
// //           },
// //         }
// //       );

// //       if (searchResponse.data.foods && searchResponse.data.foods.length > 0) {
// //         const fdcId = searchResponse.data.foods[0].fdcId;

// //         const foodResponse = await axios.get(
// //           `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
// //           {
// //             params: {
// //               api_key: API_KEY,
// //             },
// //           }
// //         );

// //         const foodNutrients = foodResponse.data.foodNutrients;
// //         const extractNutrient = (name) =>
// //           foodNutrients.find((item) => item.nutrient.name === name)?.amount || 0;

// //         const calories = extractNutrient('Energy');
// //         const protein = extractNutrient('Protein');
// //         const carbs = extractNutrient('Carbohydrate, by difference');
// //         const fats = extractNutrient('Total lipid (fat)');

// //         updateNutritionData({
// //           calories,
// //           protein,
// //           carbs,
// //           fats,
// //         });
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', 'Unable to fetch food data.');
// //     }
// //   };

// //   const updateNutritionData = (newData) => {
// //     setNutritionData((prevData) => {
// //       const updatedData = {
// //         calories: prevData.calories + newData.calories,
// //         protein: prevData.protein + newData.protein,
// //         carbs: prevData.carbs + newData.carbs,
// //         fats: prevData.fats + newData.fats,
// //       };

// //       const totalMacronutrients =
// //         updatedData.protein + updatedData.carbs + updatedData.fats;

// //       return {
// //         ...updatedData,
// //         proteinPercent: (updatedData.protein / totalMacronutrients) * 100 || 0,
// //         carbsPercent: (updatedData.carbs / totalMacronutrients) * 100 || 0,
// //         fatsPercent: (updatedData.fats / totalMacronutrients) * 100 || 0,
// //       };
// //     });
// //   };

// //   const handleSubmit = () => {
// //     if (!meal) {
// //       Alert.alert('Error', 'Please enter a meal!');
// //       return;
// //     }
// //     fetchFoodData(meal);
// //   };

// //   const handleDateChange = (event, date) => {
// //     if (date) {
// //       setSelectedDate(date);  // Update selected date
// //     }
// //     setShowPicker(false);  // Close the picker when date is selected
// //   };

// //   const chartData = [
// //     { name: 'Protein', population: nutritionData.proteinPercent, color:'rgb(186, 123, 125)' },
// //     { name: 'Carbs', population: nutritionData.carbsPercent, color: '#0066B2' },
// //     { name: 'Fats', population: nutritionData.fatsPercent, color: '#008080' },
// //   ];

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.title}>MEAL MATRIX</Text>

// //       <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
// //         <Text>{moment(selectedDate).format('YYYY-MM-DD')}</Text>
// //       </TouchableOpacity>

// //       {showPicker && (
// //         <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} />
// //       )}

// //       {/* Meal Type Dropdown */}
// //       <Picker
// //         selectedValue={mealType}
// //         onValueChange={(itemValue) => setMealType(itemValue)}
// //         style={styles.picker}
// //       >
// //         <Picker.Item label="Breakfast" value="breakfast" />
// //         <Picker.Item label="Lunch" value="lunch" />
// //         <Picker.Item label="Dinner" value="dinner" />
// //         <Picker.Item label="Snacks" value="snacks" />
// //       </Picker>

// //       <TextInput style={styles.input} placeholder="What did you eat?" value={meal} onChangeText={setMeal} />
// //       <TextInput style={styles.input} placeholder={`Meal Size (${sizeType})`} value={mealSize} onChangeText={setMealSize} keyboardType="numeric" />
// //       <View style={styles.radioContainer}>
// //         <Button
// //           title="Grams"
// //           color={sizeType === 'grams' ? '#4682B4' : '#4F97A3'}
// //           onPress={() => setSizeType('grams')}
// //         />
// //         <Button
// //           title="Pieces"
// //           color={sizeType === 'pieces' ? '#4682B4' : '#4F97A3'}
// //           onPress={() => setSizeType('pieces')}
// //         />
// //       </View>
// //       <Button title="Submit" onPress={handleSubmit} color={'#4C516D'} />

// //       {nutritionData.calories > 0 && (
// //         <View style={styles.resultContainer}>
// //           <Text style={styles.resultText}>Calories: {nutritionData.calories} kcal</Text>
// //           <PieChart
// //             data={chartData}
// //             width={300}
// //             height={300}
// //             chartConfig={{ backgroundColor: 'transparent', color: (opacity) => `rgba(0, 0, 0, ${opacity})` }}
// //             accessor="population"
// //             backgroundColor="transparent"
// //             paddingLeft="50"
// //             absolute
// //             hasLegend={false}
// //           />

// //           {/* Custom Legend with Percentage Always Visible */}
// //           <View style={styles.legendContainer}>
// //             {chartData.map((item, index) => (
// //               <View key={index} style={styles.legendRow}>
// //                 <Text style={[styles.resultText, { color: item.color, flex: 1 }]}>{item.name}</Text>
// //                 <Text style={[styles.resultText, { flex: 1, textAlign: 'right' }]}>{item.population.toFixed(2)}%</Text>
// //               </View>
// //             ))}
// //           </View>
// //         </View>
// //       )}

// //       {/* View History Button */}
// //       <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.historyButton}>
// //         <Text style={styles.historyButtonText}>View History</Text>
// //       </TouchableOpacity>

// //       {/* Modal for Meal History */}
// //       <Modal
// //         visible={modalVisible}
// //         onRequestClose={() => setModalVisible(false)}
// //         transparent={true}
// //         animationType="slide"
// //       >
// //         <View style={styles.modalContainer}>
// //           <View style={styles.modalContent}>
// //             <FlatList
// //               data={mealHistory}
// //               keyExtractor={(item) => item.date}
// //               renderItem={({ item }) => (
// //                 <View style={styles.tableRow}>
// //                   <Text style={styles.tableText}>{item.date}</Text>
// //                   <Text style={styles.tableText}>{item.calories} kcal</Text>
// //                   <Text style={styles.tableText}>{item.protein.toFixed(2)} g</Text>
// //                   <Text style={styles.tableText}>{item.carbs.toFixed(2)} g</Text>
// //                   <Text style={styles.tableText}>{item.fats.toFixed(2)} g</Text>
// //                 </View>
// //               )}
// //             />
// //             <Button title="Close" onPress={() => setModalVisible(false)} />
// //           </View>
// //         </View>
// //       </Modal>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flexGrow: 1, padding: 20, backgroundColor: "#EAF4F4" },
// //   title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
// //   input: { borderWidth: 1, borderColor: 'black', borderRadius: 8, padding: 10, marginVertical: 5, backgroundColor: "white" },
// //   picker: { height: 55, marginVertical: 5, marginTop: 10 },
// //   radioContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginVertical: 20 },
// //   resultContainer: { marginTop: 20, alignItems: 'center' },
// //   resultText: { fontSize: 18, marginVertical: 5 },
// //   legendContainer: { marginTop: 20 },
// //   legendRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 5 },
// //   historyButton: { marginTop: 20, padding: 10, backgroundColor: '#4C516D', borderRadius: 8 },
// //   historyButtonText: { color: 'white', textAlign: 'center', fontSize: 18 },
// //   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
// //   modalContent: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 },
// //   tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
// //   tableText: { fontSize: 16 },
// // });

// // export default MealTracker;



// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   Button,
// //   StyleSheet,
// //   ScrollView,
// //   Alert,
// //   TouchableOpacity,
// //   Platform,
// //   Modal,
// //   FlatList
// // } from 'react-native';
// // import axios from 'axios';
// // import { PieChart } from 'react-native-chart-kit';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import moment from 'moment';
// // import { Picker } from '@react-native-picker/picker';

// // const API_KEY = 'InGychJ06GX4v2WCFKzC4UCrt0AhJVCuwFtNAPkp';

// // const MealTracker = () => {
// //   const [mealType, setMealType] = useState('breakfast');
// //   const [meal, setMeal] = useState('');
// //   const [mealSize, setMealSize] = useState('');
// //   const [sizeType, setSizeType] = useState('grams');
// //   const [nutritionData, setNutritionData] = useState({
// //     calories: 0,
// //     protein: 0,
// //     carbs: 0,
// //     fats: 0,
// //     proteinPercent: 0,
// //     carbsPercent: 0,
// //     fatsPercent: 0,
// //   });
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [showPicker, setShowPicker] = useState(false);
// //   const [mealHistory, setMealHistory] = useState([]);
// //   const [modalVisible, setModalVisible] = useState(false);

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
// //         const savedData = await AsyncStorage.getItem(`dailyMealLog_${formattedDate}`);
// //         if (savedData) {
// //           setNutritionData(JSON.parse(savedData));
// //         } else {
// //           setNutritionData({
// //             calories: 0,
// //             protein: 0,
// //             carbs: 0,
// //             fats: 0,
// //             proteinPercent: 0,
// //             carbsPercent: 0,
// //             fatsPercent: 0,
// //           });
// //         }
// //       } catch (error) {
// //         Alert.alert('Error', 'Failed to load saved data.');
// //       }
// //     };

// //     loadData();
// //   }, [selectedDate]);

// //   useEffect(() => {
// //     const saveData = async () => {
// //       try {
// //         const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
// //         await AsyncStorage.setItem(
// //           `dailyMealLog_${formattedDate}`,
// //           JSON.stringify(nutritionData)
// //         );

// //         // Save the meal log in history
// //         const savedHistory = await AsyncStorage.getItem('mealHistory');
// //         let history = savedHistory ? JSON.parse(savedHistory) : [];

// //         // Check if an entry for the selected date exists
// //         const existingEntryIndex = history.findIndex(entry => entry.date === formattedDate);
// //         if (existingEntryIndex !== -1) {
// //           // Update the existing entry
// //           history[existingEntryIndex] = { date: formattedDate, ...nutritionData };
// //         } else {
// //           // Add new entry
// //           history.push({ date: formattedDate, ...nutritionData });
// //         }

// //         await AsyncStorage.setItem('mealHistory', JSON.stringify(history));
// //         setMealHistory(history); // Update history state
// //       } catch (error) {
// //         Alert.alert('Error', 'Failed to save data.');
// //       }
// //     };

// //     saveData();
// //   }, [nutritionData, selectedDate]);

// //   const fetchFoodData = async (meal) => {
// //     try {
// //       const searchResponse = await axios.get(
// //         'https://api.nal.usda.gov/fdc/v1/foods/search',
// //         {
// //           params: {
// //             query: meal,
// //             api_key: API_KEY,
// //           },
// //         }
// //       );

// //       if (searchResponse.data.foods && searchResponse.data.foods.length > 0) {
// //         const fdcId = searchResponse.data.foods[0].fdcId;

// //         const foodResponse = await axios.get(
// //           `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
// //           {
// //             params: {
// //               api_key: API_KEY,
// //             },
// //           }
// //         );

// //         const foodNutrients = foodResponse.data.foodNutrients;
// //         const extractNutrient = (name) =>
// //           foodNutrients.find((item) => item.nutrient.name === name)?.amount || 0;

// //         const calories = extractNutrient('Energy');
// //         const protein = extractNutrient('Protein');
// //         const carbs = extractNutrient('Carbohydrate, by difference');
// //         const fats = extractNutrient('Total lipid (fat)');

// //         updateNutritionData({
// //           calories,
// //           protein,
// //           carbs,
// //           fats,
// //         });
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', 'Unable to fetch food data.');
// //     }
// //   };

// //   const updateNutritionData = (newData) => {
// //     setNutritionData((prevData) => {
// //       const updatedData = {
// //         calories: prevData.calories + newData.calories,
// //         protein: prevData.protein + newData.protein,
// //         carbs: prevData.carbs + newData.carbs,
// //         fats: prevData.fats + newData.fats,
// //       };

// //       const totalMacronutrients =
// //         updatedData.protein + updatedData.carbs + updatedData.fats;

// //       return {
// //         ...updatedData,
// //         proteinPercent: (updatedData.protein / totalMacronutrients) * 100 || 0,
// //         carbsPercent: (updatedData.carbs / totalMacronutrients) * 100 || 0,
// //         fatsPercent: (updatedData.fats / totalMacronutrients) * 100 || 0,
// //       };
// //     });
// //   };

// //   const handleSubmit = () => {
// //     if (!meal) {
// //       Alert.alert('Error', 'Please enter a meal!');
// //       return;
// //     }
// //     fetchFoodData(meal);
// //   };

// //   const handleDateChange = (event, date) => {
// //     if (date) {
// //       setSelectedDate(date);  // Update selected date
// //     }
// //     setShowPicker(false);  // Close the picker when date is selected
// //   };

// //   const chartData = [
// //     { name: 'Protein', population: nutritionData.proteinPercent, color:'rgb(186, 123, 125)' },
// //     { name: 'Carbs', population: nutritionData.carbsPercent, color: '#0066B2' },
// //     { name: 'Fats', population: nutritionData.fatsPercent, color: '#008080' },
// //   ];

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.title}>MEAL MATRIX</Text>

// //       <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
// //         <Text>{moment(selectedDate).format('YYYY-MM-DD')}</Text>
// //       </TouchableOpacity>

// //       {showPicker && (
// //         <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} />
// //       )}

// //       {/* Meal Type Dropdown */}
// //       <Picker
// //         selectedValue={mealType}
// //         onValueChange={(itemValue) => setMealType(itemValue)}
// //         style={styles.picker}
// //       >
// //         <Picker.Item label="Breakfast" value="breakfast" />
// //         <Picker.Item label="Lunch" value="lunch" />
// //         <Picker.Item label="Dinner" value="dinner" />
// //         <Picker.Item label="Snacks" value="snacks" />
// //       </Picker>

// //       <TextInput style={styles.input} placeholder="What did you eat?" value={meal} onChangeText={setMeal} />
// //       <TextInput style={styles.input} placeholder={`Meal Size (${sizeType})`} value={mealSize} onChangeText={setMealSize} keyboardType="numeric" />
// //       <View style={styles.radioContainer}>
// //         <Button
// //           title="Grams"
// //           color={sizeType === 'grams' ? '#4682B4' : '#4F97A3'}
// //           onPress={() => setSizeType('grams')}
// //         />
// //         <Button
// //           title="Pieces"
// //           color={sizeType === 'pieces' ? '#4682B4' : '#4F97A3'}
// //           onPress={() => setSizeType('pieces')}
// //         />
// //       </View>
// //       <Button title="Submit" onPress={handleSubmit} color={'#4C516D'} />

// //       {nutritionData.calories > 0 && (
// //         <View style={styles.resultContainer}>
// //           <Text style={styles.resultText}>Calories: {nutritionData.calories} kcal</Text>
// //           <PieChart
// //             data={chartData}
// //             width={300}
// //             height={300}
// //             chartConfig={{ backgroundColor: 'transparent', color: (opacity) => `rgba(0, 0, 0, ${opacity})` }}
// //             accessor="population"
// //             backgroundColor="transparent"
// //             paddingLeft="50"
// //             absolute
// //             hasLegend={false}
// //           />

// //           {/* Custom Legend with Percentage Always Visible */}
// //           <View style={styles.legendContainer}>
// //             {chartData.map((item, index) => (
// //               <View key={index} style={styles.legendRow}>
// //                 <Text style={[styles.resultText, { color: item.color, flex: 1 }]}>{item.name}</Text>
// //                 <Text style={[styles.resultText, { flex: 1, textAlign: 'right' }]}>{item.population.toFixed(2)}%</Text>
// //               </View>
// //             ))}
// //           </View>
// //         </View>
// //       )}

// //       {/* View History Button */}
// //       <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.historyButton}>
// //         <Text style={styles.historyButtonText}>View History</Text>
// //       </TouchableOpacity>

// //       {/* Modal for Meal History */}
// //       <Modal
// //         visible={modalVisible}
// //         onRequestClose={() => setModalVisible(false)}
// //         transparent={true}
// //         animationType="slide"
// //       >
// //         <View style={styles.modalContainer}>
// //           <View style={styles.modalContent}>
// //             <FlatList
// //               data={mealHistory}
// //               keyExtractor={(item) => item.date}
// //               renderItem={({ item }) => (
// //                 <View style={styles.tableRow}>
// //                   <Text style={styles.tableText}>{item.date}</Text>
// //                   <Text style={styles.tableText}>{item.calories} kcal</Text>
// //                   <Text style={styles.tableText}>{item.protein.toFixed(2)} g</Text>
// //                   <Text style={styles.tableText}>{item.carbs.toFixed(2)} g</Text>
// //                   <Text style={styles.tableText}>{item.fats.toFixed(2)} g</Text>
// //                 </View>
// //               )}
// //               ListHeaderComponent={() => (
// //                 <View style={styles.tableRow}>
// //                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Date</Text>
// //                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Calories</Text>
// //                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Protein</Text>
// //                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Carbs</Text>
// //                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Fats</Text>
// //                 </View>
// //               )}
// //             />
// //             <Button title="Close" onPress={() => setModalVisible(false)} />
// //           </View>
// //         </View>
// //       </Modal>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flexGrow: 1, padding: 20, backgroundColor: "#EAF4F4" },
// //   title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
// //   input: { borderWidth: 1, borderColor: 'black', borderRadius: 8, padding: 10, marginVertical: 5, backgroundColor: "white" },
// //   picker: { height: 55, marginVertical: 5, marginTop: 10 },
// //   radioContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginVertical: 20 },
// //   resultContainer: { marginTop: 20, alignItems: 'center' },
// //   resultText: { fontSize: 18, marginVertical: 5 },
// //   legendContainer: { marginTop: 20 },
// //   legendRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 5 },
// //   historyButton: { marginTop: 20, padding: 10, backgroundColor: '#4C516D', borderRadius: 8 },
// //   historyButtonText: { color: 'white', textAlign: 'center', fontSize: 18 },
// //   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
// //   modalContent: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 },
// //   tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
// //   tableText: { flex: 1, textAlign: 'center', fontSize: 16 },
// // });

// // export default MealTracker;


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   TouchableOpacity,
//   Modal,
//   FlatList,
// } from 'react-native';
// import axios from 'axios';
// import { PieChart } from 'react-native-chart-kit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';
// import { Picker } from '@react-native-picker/picker';
// import { FontAwesome } from '@expo/vector-icons';

// const API_KEY = 'InGychJ06GX4v2WCFKzC4UCrt0AhJVCuwFtNAPkp';

// const MealTracker = () => {
//   const [mealType, setMealType] = useState('breakfast');
//   const [meal, setMeal] = useState('');
//   const [mealSize, setMealSize] = useState('');
//   const [sizeType, setSizeType] = useState('grams');
//   const [nutritionData, setNutritionData] = useState({
//     calories: 0,
//     protein: 0,
//     carbs: 0,
//     fats: 0,
//     proteinPercent: 0,
//     carbsPercent: 0,
//     fatsPercent: 0,
//   });
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [mealHistory, setMealHistory] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);

//   const healthyThresholds = {
//     calories: { min: 1500, max: 2500 },
//     protein: 50, // in grams
//     carbs: 130,  // in grams
//     fats: 70,    // in grams
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
//         const savedData = await AsyncStorage.getItem(`dailyMealLog_${formattedDate}`);
//         if (savedData) {
//           setNutritionData(JSON.parse(savedData));
//         } else {
//           setNutritionData({
//             calories: 0,
//             protein: 0,
//             carbs: 0,
//             fats: 0,
//             proteinPercent: 0,
//             carbsPercent: 0,
//             fatsPercent: 0,
//           });
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load saved data.');
//       }
//     };

//     loadData();
//   }, [selectedDate]);

//   useEffect(() => {
//     const saveData = async () => {
//       try {
//         const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
//         await AsyncStorage.setItem(
//           `dailyMealLog_${formattedDate}`,
//           JSON.stringify(nutritionData)
//         );

//         // Save the meal log in history
//         const savedHistory = await AsyncStorage.getItem('mealHistory');
//         let history = savedHistory ? JSON.parse(savedHistory) : [];

//         // Check if an entry for the selected date exists
//         const existingEntryIndex = history.findIndex(entry => entry.date === formattedDate);
//         if (existingEntryIndex !== -1) {
//           // Update the existing entry
//           history[existingEntryIndex] = { date: formattedDate, ...nutritionData };
//         } else {
//           // Add new entry
//           history.push({ date: formattedDate, ...nutritionData });
//         }

//         await AsyncStorage.setItem('mealHistory', JSON.stringify(history));
//         setMealHistory(history); // Update history state
//       } catch (error) {
//         Alert.alert('Error', 'Failed to save data.');
//       }
//     };

//     saveData();
//   }, [nutritionData, selectedDate]);

//   const fetchFoodData = async (meal) => {
//     try {
//       const searchResponse = await axios.get(
//         'https://api.nal.usda.gov/fdc/v1/foods/search',
//         {
//           params: {
//             query: meal,
//             api_key: API_KEY,
//           },
//         }
//       );

//       if (searchResponse.data.foods && searchResponse.data.foods.length > 0) {
//         const fdcId = searchResponse.data.foods[0].fdcId;

//         const foodResponse = await axios.get(
//           `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
//           {
//             params: {
//               api_key: API_KEY,
//             },
//           }
//         );

//         const foodNutrients = foodResponse.data.foodNutrients;
//         const extractNutrient = (name) =>
//           foodNutrients.find((item) => item.nutrient.name === name)?.amount || 0;

//         const calories = extractNutrient('Energy');
//         const protein = extractNutrient('Protein');
//         const carbs = extractNutrient('Carbohydrate, by difference');
//         const fats = extractNutrient('Total lipid (fat)');

//         updateNutritionData({
//           calories,
//           protein,
//           carbs,
//           fats,
//         });
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to fetch food data.');
//     }
//   };

//   const updateNutritionData = (newData) => {
//     setNutritionData((prevData) => {
//       const updatedData = {
//         calories: prevData.calories + newData.calories,
//         protein: prevData.protein + newData.protein,
//         carbs: prevData.carbs + newData.carbs,
//         fats: prevData.fats + newData.fats,
//       };

//       const totalMacronutrients =
//         updatedData.protein + updatedData.carbs + updatedData.fats;

//       return {
//         ...updatedData,
//         proteinPercent: (updatedData.protein / totalMacronutrients) * 100 || 0,
//         carbsPercent: (updatedData.carbs / totalMacronutrients) * 100 || 0,
//         fatsPercent: (updatedData.fats / totalMacronutrients) * 100 || 0,
//       };
//     });
//   };

//   const handleSubmit = () => {
//     if (!meal) {
//       Alert.alert('Error', 'Please enter a meal!');
//       return;
//     }
//     fetchFoodData(meal);
//   };

//   const handleDateChange = (event, date) => {
//     if (date) {
//       setSelectedDate(date);  // Update selected date
//     }
//     setShowPicker(false);  // Close the picker when date is selected
//   };

//   const deleteMealEntry = async (date) => {
//     try {
//       const savedHistory = await AsyncStorage.getItem('mealHistory');
//       let history = savedHistory ? JSON.parse(savedHistory) : [];
      
//       // Filter out the entry with the selected date
//       const updatedHistory = history.filter(entry => entry.date !== date);

//       await AsyncStorage.setItem('mealHistory', JSON.stringify(updatedHistory));
//       setMealHistory(updatedHistory); // Update the history state
//     } catch (error) {
//       Alert.alert('Error', 'Failed to delete meal entry.');
//     }
//   };

//   const getNutrientColor = (value, type) => {
//     if (type === 'calories') {
//       return value < healthyThresholds[type].min || value > healthyThresholds[type].max ? 'red' : 'green';
//     } else if (value < healthyThresholds[type]) {
//       return 'red';
//     } else {
//       return 'green';
//     }
//   };

//   const chartData = [
//     { name: 'Protein', population: nutritionData.proteinPercent, color:'rgb(186, 123, 125)' },
//     { name: 'Carbs', population: nutritionData.carbsPercent, color: '#0066B2' },
//     { name: 'Fats', population: nutritionData.fatsPercent, color: '#008080' },
//   ];

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>MEAL MATRIX</Text>

//       <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
//         <Text>{moment(selectedDate).format('YYYY-MM-DD')}</Text>
//       </TouchableOpacity>

//       {showPicker && (
//         <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} />
//       )}

//       {/* Meal Type Dropdown */}
//       <Picker
//         selectedValue={mealType}
//         onValueChange={(itemValue) => setMealType(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="Breakfast" value="breakfast" />
//         <Picker.Item label="Lunch" value="lunch" />
//         <Picker.Item label="Dinner" value="dinner" />
//         <Picker.Item label="Snacks" value="snacks" />
//       </Picker>

//       <TextInput style={styles.input} placeholder="What did you eat?" value={meal} onChangeText={setMeal} />
//       <TextInput style={styles.input} placeholder={`Meal Size (${sizeType})`} value={mealSize} onChangeText={setMealSize} keyboardType="numeric" />
//       <View style={styles.radioContainer}>
//         <Button
//           title="Grams"
//           color={sizeType === 'grams' ? '#4682B4' : '#4F97A3'}
//           onPress={() => setSizeType('grams')}
//         />
//         <Button
//           title="Pieces"
//           color={sizeType === 'pieces' ? '#4682B4' : '#4F97A3'}
//           onPress={() => setSizeType('pieces')}
//         />
//       </View>
//       <Button title="Submit" onPress={handleSubmit} color={'#4C516D'} />

//       {nutritionData.calories > 0 && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultText}>Calories: {nutritionData.calories} kcal</Text>
//           <PieChart
//             data={chartData}
//             width={300}
//             height={300}
//             chartConfig={{ backgroundColor: 'transparent', color: (opacity) => `rgba(0, 0, 0, ${opacity})` }}
//             accessor="population"
//             backgroundColor="transparent"
//             paddingLeft="50"
//             absolute
//             hasLegend={false}
//           />
//         </View>
//       )}

//       {/* View History Button */}
//       <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.historyButton}>
//         <Text style={styles.historyButtonText}>View History</Text>
//       </TouchableOpacity>

//       {/* Modal for Meal History */}
//       <Modal
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <FlatList
//               data={mealHistory}
//               keyExtractor={(item) => item.date}
//               renderItem={({ item }) => (
//                 <View style={styles.tableRow}>
//                   <Text style={styles.tableText}>{item.date}</Text>
//                   <Text style={[styles.tableText, { color: getNutrientColor(item.calories, 'calories') }]}>{item.calories} kcal</Text>
//                   <Text style={[styles.tableText, { color: getNutrientColor(item.protein, 'protein') }]}>{item.protein.toFixed(2)} g</Text>
//                   <Text style={[styles.tableText, { color: getNutrientColor(item.carbs, 'carbs') }]}>{item.carbs.toFixed(2)} g</Text>
//                   <Text style={[styles.tableText, { color: getNutrientColor(item.fats, 'fats') }]}>{item.fats.toFixed(2)} g</Text>
//                   <TouchableOpacity onPress={() => deleteMealEntry(item.date)} style={styles.deleteButton}>
//                     <FontAwesome name="trash" size={20} color="red" />
//                   </TouchableOpacity>
//                 </View>
//               )}
//               ListHeaderComponent={() => (
//                 <View style={styles.tableRow}>
//                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Date</Text>
//                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Calories</Text>
//                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Protein</Text>
//                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Carbs</Text>
//                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Fats</Text>
//                   <Text style={[styles.tableText, { fontWeight: 'bold' }]}>Action</Text>
//                 </View>
//               )}
//             />
//             <Button title="Close" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: "#EAF4F4" },
//   title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
//   input: { borderWidth: 1, borderColor: 'black', borderRadius: 8, padding: 10, marginVertical: 5, backgroundColor: "white" },
//   picker: { height: 55, marginVertical: 5, marginTop: 10 },
//   radioContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginVertical: 20 },
//   resultContainer: { marginTop: 20, alignItems: 'center' },
//   resultText: { fontSize: 18, marginVertical: 5 },
//   legendContainer: { marginTop: 20 },
//   legendRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 5 },
//   historyButton: { marginTop: 20, padding: 10, backgroundColor: '#4C516D', borderRadius: 8 },
//   historyButtonText: { color: 'white', textAlign: 'center' },
//   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
//   modalContent: { backgroundColor: 'white', width: '80%', padding: 20, borderRadius: 10 },
//   tableRow: { flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ddd' },
//   tableText: { flex: 1, textAlign: 'center', fontSize: 16 },
//   deleteButton: { justifyContent: 'center', alignItems: 'center' },
// });

// export default MealTracker;


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
  Modal,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

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
  const [mealHistory, setMealHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const healthyThresholds = {
    calories: { min: 1500, max: 2500 },
    protein: 50, // in grams
    carbs: 130,  // in grams
    fats: 70,    // in grams
  };

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

        // Save the meal log in history
        const savedHistory = await AsyncStorage.getItem('mealHistory');
        let history = savedHistory ? JSON.parse(savedHistory) : [];

        // Check if an entry for the selected date exists
        const existingEntryIndex = history.findIndex(entry => entry.date === formattedDate);
        if (existingEntryIndex !== -1) {
          // Update the existing entry
          history[existingEntryIndex] = { date: formattedDate, ...nutritionData };
        } else {
          // Add new entry
          history.push({ date: formattedDate, ...nutritionData });
        }

        await AsyncStorage.setItem('mealHistory', JSON.stringify(history));
        setMealHistory(history); // Update history state
      } catch (error) {
        Alert.alert('Error', 'Failed to save data.');
      }
    };

    saveData();
  }, [nutritionData, selectedDate]);

  const fetchFoodData = async (meal) => {
    try {
      const searchResponse = await axios.get(
        'https://api.nal.usda.gov/fdc/v1/foods/search',
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
    if (date) {
      setSelectedDate(date);  // Update selected date
    }
    setShowPicker(false);  // Close the picker when date is selected
  };

  const deleteMealEntry = async (date) => {
    try {
      const savedHistory = await AsyncStorage.getItem('mealHistory');
      let history = savedHistory ? JSON.parse(savedHistory) : [];
      
      // Filter out the entry with the selected date
      const updatedHistory = history.filter(entry => entry.date !== date);

      await AsyncStorage.setItem('mealHistory', JSON.stringify(updatedHistory));
      setMealHistory(updatedHistory); // Update the history state

      // If today's data was deleted, reset the pie chart data
      const todayFormatted = moment().format('YYYY-MM-DD');
      if (date === todayFormatted) {
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
      Alert.alert('Error', 'Failed to delete meal entry.');
    }
  };

  const getNutrientColor = (value, type) => {
    if (type === 'calories') {
      return value < healthyThresholds[type].min || value > healthyThresholds[type].max ? 'red' : 'green';
    } else if (value < healthyThresholds[type]) {
      return 'red';
    } else {
      return 'green';
    }
  };

  const chartData = [
    { name: `Protein ${nutritionData.proteinPercent.toFixed(1)}%`, population: nutritionData.proteinPercent, color:'rgb(186, 123, 125)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: `Carbs ${nutritionData.carbsPercent.toFixed(1)}%`, population: nutritionData.carbsPercent, color: '#0066B2', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: `Fats ${nutritionData.fatsPercent.toFixed(1)}%`, population: nutritionData.fatsPercent, color: '#008080', legendFontColor: '#7F7F7F', legendFontSize: 15 },
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
          <View style={styles.percentageTextContainer}>
            <Text style={styles.percentageText}>Protein: {nutritionData.proteinPercent.toFixed(1)}%</Text>
            <Text style={styles.percentageText}>Carbs: {nutritionData.carbsPercent.toFixed(1)}%</Text>
            <Text style={styles.percentageText}>Fats: {nutritionData.fatsPercent.toFixed(1)}%</Text>
          </View>
        </View>
      )}


      {/* View History Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.historyButton}>
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>

      {/* Modal for Meal History */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <Modal
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
  transparent={true}
  animationType="slide"
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <FlatList
        data={mealHistory}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={() => (
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Date</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Cal</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Pro</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Carbs</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Fats</Text>
            <Text style={[styles.tableHeaderText, { flex: 0.5 }]}></Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableText}>{item.date}</Text>
            <Text style={[styles.tableText, { color: getNutrientColor(item.calories, 'calories') }]}>
              {item.calories} kcal
            </Text>
            <Text style={[styles.tableText, { color: getNutrientColor(item.protein, 'protein') }]}>
              {item.protein.toFixed(2)} g
            </Text>
            <Text style={[styles.tableText, { color: getNutrientColor(item.carbs, 'carbs') }]}>
              {item.carbs.toFixed(2)} g
            </Text>
            <Text style={[styles.tableText, { color: getNutrientColor(item.fats, 'fats') }]}>
              {item.fats.toFixed(2)} g
            </Text>
            <TouchableOpacity onPress={() => deleteMealEntry(item.date)} style={styles.deleteButton}>
              <FontAwesome name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Close" onPress={() => setModalVisible(false)} />
    </View>
  </View>
</Modal>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={mealHistory}
              keyExtractor={(item) => item.date}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.tableText}>{item.date}</Text>
                  <Text style={[styles.tableText, { color: getNutrientColor(item.calories, 'calories') }]}>{item.calories} kcal</Text>
                  <Text style={[styles.tableText, { color: getNutrientColor(item.protein, 'protein') }]}>{item.protein.toFixed(2)} g</Text>
                  <Text style={[styles.tableText, { color: getNutrientColor(item.carbs, 'carbs') }]}>{item.carbs.toFixed(2)} g</Text>
                  <Text style={[styles.tableText, { color: getNutrientColor(item.fats, 'fats') }]}>{item.fats.toFixed(2)} g</Text>
                  <TouchableOpacity onPress={() => deleteMealEntry(item.date)} style={styles.deleteButton}>
                    <FontAwesome name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
  picker: { height: 50, width: '100%', marginBottom: 10 },
  radioContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  resultContainer: { marginVertical: 20, alignItems: 'center' },
  resultText: { fontSize: 18, fontWeight: 'bold' },
  historyButton: { backgroundColor: '#0066B2', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
  historyButtonText: { color: 'white', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: 'white', width: '80%', padding: 20, borderRadius: 10 },
  
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures even spacing
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  tableText: {
    textAlign: 'center',
    flex: 1,
    paddingVertical: 5, // Adds space inside cells
    paddingHorizontal: 8, // Adds horizontal space
  },
  deleteButton: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5, // Ensures delete button does not take too much space
  },
  
});

export default MealTracker;
