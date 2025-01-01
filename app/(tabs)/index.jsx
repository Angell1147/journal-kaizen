import { Image, Text, View, StyleSheet, Platform, Pressable, ImageBackground } from 'react-native';
import {Link} from 'expo-router'
import React from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import bg from '@/assets/images/bg_color.png'


export default function HomeScreen() {
  return (
    <ImageBackground
          source = {bg}
          resizeMode='cover'
          style = {styles.bg}>

      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
      </ThemedView>

      <Link href='/journal' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Journal
          </ThemedText>
        </Pressable>
      </Link>

      <ThemedView style={styles.stepContainer}>
      </ThemedView>

      <Link href='/highlight' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Highlight Of The Day
          </ThemedText>
        </Pressable>
      </Link>

      <ThemedView style={styles.stepContainer}>
      </ThemedView>

      <Link href='/sleep' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Sleep Tracker
          </ThemedText>
        </Pressable>
      </Link>

      <ThemedView style={styles.stepContainer}>
      </ThemedView>

      <Link href='/habits' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Wheel Of Habits
          </ThemedText>
        </Pressable>
      </Link>

      <ThemedView style={styles.stepContainer}>
      </ThemedView>

      <Link href='/rate' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Rate My Day
          </ThemedText>
        </Pressable>
      </Link>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  
  bg : {
    height : '100%',
    width : 'auto',
    resizeMode : 'cover',
    justifyContent : 'center',
    alignContent : 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  button :{
    height : 55,
    width : '85%',
    borderRadius : 8,
    backgroundColor : 'rgba(42,150,167,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding : 6,
  },
  buttonText : {
    fontSize : 20,
    color : 'white',
    textAlign : 'center',
  }
});
