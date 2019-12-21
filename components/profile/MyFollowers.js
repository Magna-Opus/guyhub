//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Followers from '../connectionstab/Followers';

// create a component
class MyFollowers extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Followers/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

//make this component available to the app
export default MyFollowers;
