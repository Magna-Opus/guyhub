//import liraries
import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Zocial from 'react-native-vector-icons/Zocial';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import { PostData } from './../../services/PostData';
import pick from './../../services/ImagePicker';
import { Actions } from 'react-native-router-flux';

const{width, height}=Dimensions.get('window');
// create a component
class StudentAmbassador extends Component {
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
                        <Text style={{width:'100%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>STUDENT AMBASSADOR</Text>
                    </View> 
                    
                 </View>
                <ImageBackground style={styles.header} source={require('../../src/images/gradient.png')}>
                  <View style={styles.headerContent}>
                      <Image style={styles.avatar}
                        source={require('./../../src/images/logo_login2.png')}/>
      
                      
                     
                  </View>
                </ImageBackground>
      <ScrollView>
                <View style={styles.body}>
                  <View style={styles.bodyContent}>
                  <Text style={styles.name}>
                      Join us to be a Student Ambassador!
                      </Text>
                    <Text style={[styles.textInfo,{paddingHorizontal:30}]}>
                    Here is the opportunity for you to grow your social network and earn by becoming  part of Guy Hub team. You simply need to add more connections to GuyHub network and share posts to promote Guyhub.
                    </Text>
                    <Text style={[styles.textInfo,{marginTop:20,marginBottom:10,fontSize:20,fontWeight:'500'}]}>
                    For more information 
                    </Text>
                    <View>
                        <View>
                        <Text style={[styles.textInfo,{color:'#0078d7'}]}>
                    Call us at
                    </Text>
                    <View style={{flexDirection:'row',alignItems:'center',width:'100%',height:40}}>
                    <Icon
                    name='ios-call'
                    type='ionicon'
                    color='#007f00'
                     size={34} />
                     <Text style={[styles.textInfo,{marginLeft:20}]}>
                     +44 0744 030 4828
                    </Text>
                     </View>
                     </View>
                     <Text style={[styles.textInfo,{color:'#a9a9a9',fontWeight:'bold'}]}>
                     OR 
                    </Text>
                     <View>
                     <Text style={[styles.textInfo,{color:'#0078d7'}]}>
                     Write us at 
                    </Text>
                    <View style={{flexDirection:'row',alignItems:'center',width:'100%',height:40,marginBottom:100}}>
                     <Zocial
                    name='email'
                    type='ionicon'
                    color='#cc1f00'
                     size={30} />
                     <Text style={[styles.textInfo,{marginLeft:20}]}>
                     lamaid786@gmail.com 
                    </Text>
                    </View>
                     </View>
                     </View>
                    
                  </View>
              </View>
              </ScrollView>
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
        backgroundColor: "#0078d7",
    },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#0078d7",
        marginBottom:10,
      },
      name:{
        width:'100%',
        fontSize:22,
        marginTop:20,
        color:"#0078d7",
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:20
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:0,
      },
      body: {
        flex: 1,
        
      },
      textInfo:{
        fontSize:18,
       
        color: "#000",
        textAlign:'center'
      }
});

//make this component available to the app
export default StudentAmbassador;
