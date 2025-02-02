import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Backend API URL (Replace this with your actual backend endpoint)
  const API_URL = 'http://localhost:4000/api/user/register';

  // Handle sign-up
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }

    setLoading(true);

    try {
      // Sending POST request to backend API for sign-up
      const response = await axios.post(API_URL, {
        name: name,
        email: email,
        password: password,
      });

      // Assuming the backend returns a success message or a token
      if (response.data.success) {
        // Navigate to login page or home page after successful sign-up
        Alert.alert('Success', 'Sign-up successful! Please login.');
        navigation.navigate('Login'); // Replace 'Login' with the appropriate route
      } else {
        Alert.alert('Error', 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        title={loading ? 'Signing up...' : 'Sign Up'}
        onPress={handleSignUp}
        disabled={loading}
      />
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
  },
  loginLink: {
    color: '#007BFF',
  },
});

export default SignUpPage;
