import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Backend API URL (Replace this with your actual backend endpoint)
  const API_URL = 'http://localhost:4000/api/user/login';

  // Handle login
  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      if (!email) setEmailError('Email is required.');
      if (!password) setPasswordError('Password is required.');
      return;
    }

    setLoading(true);

    try {
      // Sending POST request to backend API
      const response = await axios.post(API_URL, {
        email: email,
        password: password,
      });

      // Assuming response contains a token or user info
      if (response.data.token) {
        // Navigate to the next screen after successful login
        navigation.navigate('Home');  // Replace 'Home' with the appropriate route
      } else {
        // Handle backend error message
        if (response.data.message === 'Invalid email') {
          setEmailError('User does not exist.');
          Alert.alert('Error', 'User with this email does not exist.');
        } else if (response.data.message === 'Invalid password') {
          setPasswordError('Incorrect password.');
          Alert.alert('Error', 'The password you entered is incorrect.');
        } else {
          Alert.alert('Error', 'Login failed. Please check your credentials.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={[styles.input, emailError && styles.errorInput]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password Input */}
      <TextInput
        style={[styles.input, passwordError && styles.errorInput]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />
        {loading && <ActivityIndicator size="small" color="#007BFF" style={styles.loader} />}
      </View>

      {/* Signup Link */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
          Sign up
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
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  errorInput: {
    borderColor: '#D9534F',
  },
  errorText: {
    color: '#D9534F',
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  loader: {
    marginTop: 10,
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
  },
  signupLink: {
    color: '#007BFF',
  },
});

export default LoginPage;
