import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, ImageBackground,View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { RegisterData } from './../../services/RegisterData';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import RNFetchBlob from 'react-native-fetch-blob';
import pick from './../../services/ImagePicker';
const{width, height}=Dimensions.get('window');
export default class Userinfo extends Component {
    constructor(props){
        super(props);        
        
        this.handleRegisterUser=this.handleRegisterUser.bind(this);
       
    }


    
      //register function
      handleRegisterUser=async()=>{
         
                this.props.next();
           
        }
      
          
          componentWillMount(){
              this.props.onRef(this);
            // console.log(this.props.onRef(this));
          }
       
          componentWillUnmount() {
            this.props.onRef(undefined)
          }
     
      
    render() {
             
     return(
         
         <SafeAreaView style={{flex:1}}>
            <View style={{flex:0.63}}>
                <View style={{flex:1,margin:10}}>
            
            <ImageBackground source={require('./../../src/images/strip_bg.png')} resizeMode="contain" style={{padding:15,textAlign:'center',justifyContent:'center',alignItems:'center',flex:1}}>
                <Text style={{textAlign:'center',paddingHorizontal:5}}>Welcome to GuyHub!</Text>
                <Text style={{textAlign:'center',color:'blue',paddingHorizontal:5}}>you are just close to complete your profile and to find matched connection around you.</Text>
            </ImageBackground>
            <Text style={{color:'#5a9fff',fontSize:20,textAlign:'center'}}>Submit your preferences in order to find your Matching Profiles.</Text>  

            </View>
               </View> 
                
     </SafeAreaView>
     )}
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
   
    },
    picker:{
        marginBottom:10,
        height: 40,
        backgroundColor: '#fff',
        color: '#333',
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'
    },
    input:{
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: '#333',
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'
    },
    buttonContainer:{
        backgroundColor: '#5a9fff',
        paddingVertical: 10,
        width:'100%',        
        borderRadius:4,
        borderWidth:1,
        borderColor:'#3e89e9'
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        textTransform:'uppercase'    
    },
    errors:{
        padding:7,
        borderWidth:1,
        borderColor:'#eccdcd',
        backgroundColor:'#eccdcd',
        color:'#bf2d23',
        marginBottom:4, 
        width:'100%',
        borderRadius:4,
        marginTop:4

    }
});