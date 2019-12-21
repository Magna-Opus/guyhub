//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';

// create a component
class UserProfile extends Component {
    static navigationOptions =
    {
       header:null
    };
    
    render() {
        return (
            <View style={styles.container}>
                   
                    <ImageBackground source={require('./../../src/images/profile_top_bg.png')} resizeMode="cover" style={{position:'relative',flex:1,justifyContent:'center',alignItems:'center'}}>

                    </ImageBackground>
                    <View style={{flex:2,paddingHorizontal:15}}>
                    
                    </View>
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
export default UserProfile;
