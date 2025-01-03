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

      <View style = {styles.empty}> </View>

    <ThemedView style={styles.container}>
      <Link href='/journallistscreen' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Journal
          </ThemedText>
        </Pressable>
      </Link>

      <Link href='/highlight' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Highlight Of The Day
          </ThemedText>
        </Pressable>
      </Link>

      <Link href='/sleep' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Sleep Tracker
          </ThemedText>
        </Pressable>
      </Link>

      <Link href='/habits' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Wheel Of Habits
          </ThemedText>
        </Pressable>
      </Link>

      <Link href='/rate' style = {{marginHorizontal: 'auto'}} asChild>
        <Pressable style = {styles.button}>
          <ThemedText style = {styles.buttonText}>
            Rate My Day
          </ThemedText>
        </Pressable>
      </Link>
    </ThemedView>

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
  empty : {
    backgroundColor : 'rgba(71, 101, 127, 0.75)',
    width : '85%',
    height : '40%',
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 20,
    marginLeft : 30,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    backgroundColor : 'rgba(25, 2, 12, 1)'
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
