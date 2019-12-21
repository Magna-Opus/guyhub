//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class SenderChat extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.senderMsg}>SenderChat</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'row',
        justifyContent: 'flex-end',
       
    },
    senderMsg:{
        backgroundColor:'#33b5ff',
        borderRadius: 4,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        width:'auto',
        color:'white'
    }
});

//make this component available to the app
export default SenderChat;
