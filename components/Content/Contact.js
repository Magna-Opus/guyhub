//import liraries
import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Zocial from 'react-native-vector-icons/Zocial';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import { PostData } from './../../services/PostData';
import pick from './../../services/ImagePicker';
import { Actions } from 'react-native-router-flux';

const{width, height}=Dimensions.get('window');
// create a component
class Contact extends Component {
    constructor(props){
        super(props)
        this.state={
            
            loading:false,
            
            authtoken:''
        }
        
    }

    render() {
        const {photo}=this.state;
        return ((this.state.loading)?
             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Loading...</Text>
            </View>
            :
            <SafeAreaView style={styles.container}>
              
                <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30} /></TouchableOpacity>
                        <Text style={{width:'70%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>CONTACT US</Text>
                    </View> 
                    
                 </View>
                 
                <ImageBackground style={styles.header} source={require('../../src/images/gradient.png')}>
                <ScrollView>
                  <View style={styles.headerContent}>
                      <Image style={styles.avatar}
                        source={require('./../../src/images/logo_login2.png')}/>
      
      <Text style={[styles.textInfo,{color:'white',width:'90%',fontWeight:'bold',marginTop:10}]}>Contact us for more information about working with GuyHub. We're happy to help and answer any queries you might have.
          
          </Text>
               
                      <Card style={{width:'90%',marginTop:30,borderRadius:20,elevation:5,marginBottom:100}}>
    <Card.Content>

      <View style={{width:'100%',flexDirection:'row',marginTop:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Address</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>153 Boleyn Road London E7 9QH</Text></View>
      <View style={{width:'100%',flexDirection:'row',marginTop:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Country</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>United Kingdom</Text></View>
      <View style={{width:'100%',flexDirection:'row',marginTop:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Email</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>lamaid786@gmail.com</Text></View>
      <View style={{width:'100%',flexDirection:'row',marginTop:10,marginBottom:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Phone</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>+44 0744 030 4828</Text></View>

    </Card.Content>
   
  </Card>    
 
                  </View>
                  </ScrollView>
                </ImageBackground>
              
            </SafeAreaView>
          );

    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    
    header:{
        flex:1,
        backgroundColor: "#0078d7",
    },
      headerContent:{
       paddingTop:20,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#0078d7",
        marginBottom:10,
        marginTop:10
      },
      name:{
        fontSize:22,
        marginTop:20,
        color:"#0078d7",
        fontWeight:'bold',
        marginBottom:20
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:0,
      },
      body: {
       
        width:'100%',
        padding:30,
        alignItems: 'center',
        
      },
      textInfo:{
        fontSize:20,
       
        color: "#000",
        textAlign:'center'
      }
});

//make this component available to the app
export default Contact;
