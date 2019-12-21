//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class ReceiverChat extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.receiveMsg}>ReceiverChat</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'row',
        justifyContent: 'flex-start',
       
    },
    receiveMsg:{
        backgroundColor:'#fff',
        borderRadius: 4,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        width:'auto',
        color:'#333'
    }
});

//make this component available to the app
export default ReceiverChat;
