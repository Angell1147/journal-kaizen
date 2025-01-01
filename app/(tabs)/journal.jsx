import { StyleSheet, Text, View, ImageBackground, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import bg from '@/assets/images/bg_color.png'

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
    color : 'white',
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
