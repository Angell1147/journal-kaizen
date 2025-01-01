import { Text, View, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import bgcolor from '@/assets/images/bg2.png'


export default function TabTwoScreen() {
    return (
        <ImageBackground 
        source = {bgcolor}
        resizeMode='cover'
        style = {styles.bg}>
            <Text style={styles.title}>
                Rate My Day
            </Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create ({
    bg : {
        height : '100%',
        width : 'auto',
        resizeMode : 'cover',
        justifyContent : 'center',
    },
    title : {
        color : 'black',
        fontSize : 35,
        textAlign : 'center',
    }
});