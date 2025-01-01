import { StyleSheet, Text, View, ImageBackground, Image, Platform } from 'react-native';
import React from 'react';
import bg from '@/assets/images/bg2.png'

export default function TabTwoScreen() {
  return (
    <View>
      <ImageBackground
      source = {bg}
      resizeMode='cover'
      style = {styles.bg}>
      <Text style={styles.text}>
        this is where journalling will happen
      </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({

  text : {
    fontSize : 18,
    color : 'black',
    textAlign : 'center',
  },
  bg : {
      height : '100%',
      width : 'auto',
      resizeMode : 'cover',
      justifyContent : 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
