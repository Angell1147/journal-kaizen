# KAIZEN - Health & Wellness Tracking App  

## 📌 Overview  
**KAIZEN** is a mobile application designed to help users track their health and wellness efficiently. Built using **React Native and Expo**, it integrates **Google Generative AI** and the **MERN stack** to provide intelligent insights and recommendations.  

The app is divided into **two main sections**:  
1. **Health Tracker** – Tracks meals, symptoms, medicines, and hydration.  
2. **Journaling & Habit Building** – Includes mood tracking, journaling, sleep insights, and habit formation tools.  

---

## 🚀 Features  

### 🏥 Health Tracker  
- **Meal Tracker** – Uses an API to analyze user-inputted meals and calculate calories, proteins, and carbs.  
- **Symptom Tracker** – Allows users to input symptoms and provides AI-based recommendations, including doctor visit suggestions for severe or persistent symptoms.  
- **Medicine Lookup** – Enables users to search for medicines and view their uses, side effects, and other details.  
- **Water Reminder** – Sends notifications to remind users to stay hydrated.  

### 📖 Journaling & Habit Building  
- **Daily Journaling** – Users can log their thoughts with an **icebreaker question (highlight of the day)** stored separately.  
- **Mood & Sleep Tracking** – Provides **graphical insights** into sleep patterns and mood ratings over time.  
- **AI-Powered Quotes** – Uses **Hugging Face API** to generate motivational quotes based on mood.  
- **21-Day Habit Cycle** – A **habit-building wheel** that guides users through a 21-day process to establish new habits.  

---

## 🛠️ Tech Stack  
- **Frontend:** React Native, Expo  
- **Backend:** MERN Stack (MongoDB, Express.js, React Native, Node.js)  
- **Server:** `server.js`  
- **APIs:**  
  - Google Generative AI (for health insights & symptom analysis)  
  - Hugging Face API (for AI-generated motivational quotes)  

---

## 🏗️ Installation & Setup  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js & npm**  
- **Expo CLI** (`npm install -g expo-cli`)  
- **MongoDB** (for backend database)  

### Setup  
1. **Clone the repository :**  
   ```sh
   git clone https://github.com/your-username/kaizen.git
   cd kaizen
   
2. **Install dependencies :**
   ```sh
   // Expo dependencies  
   npm install expo-notifications react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
   
   // API handling
   npm install axios
   
   // Backend dependencies
   npm install express cors mongoose dotenv
   
   // Google Generative AI
   npm install @google/generative-ai
   
   // Nodemon (for automatic server restart during development)
   npm install -g nodemon  

4. **Start the backend server :**
   ```sh
   cd backend
   nodemon server.js
5. **Run the React Native app :**
   ```sh
   expo start
