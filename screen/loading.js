import React from 'react';
import { StyleSheet, Text, View , StatusBar} from 'react-native';

export default function Loading() {
    return (
        <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
            <Text style={styles.textStyle}>Get the weather, please.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingVertical:100,
        paddingHorizontal:30,
        justifyContent:'flex-end',
        backgroundColor: '#fffaa8',
    },
    textStyle: {
        fontSize: 30,
        color: 'gray',
        padding: 20
    }
});