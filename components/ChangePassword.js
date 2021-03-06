import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { PostWithToken } from './../services/PostWithToken';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';

const{width, height}=Dimensions.get('window');
export default class ChangePassword extends Component {
    constructor(props){
        super(props);        
        
    }


    
  
    
    state = {
        errors:'',
        current:'',
        newp:'',
        confirm:''

      };


      async componentDidMount()
      {
        var userInfo=await AsyncStorage.getItem('token');
        this.setState({authtoken:userInfo})
      }
      
      change=()=>
      {
       
          if(this.state.current===''||this.state.newp===''||this.state.confirm==='')
          {
              this.setState({errors:'Fill all Fields'})
          }
            else if(this.state.newp!==this.state.confirm)
            {
                this.setState({errors:'Password Mismatch'})
            }
            else
            {
        PostWithToken('change-password',{authtoken:this.state.authtoken,old_password:this.state.current,new_password:this.state.newp}).then((data)=>{
            this.setState({errors:data.message,newp:'',current:'',confirm:''})


        })
      }
    }
      
    render() {
        
     return(
         
         <SafeAreaView style={{flex:1}}>
             <View style={{paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                   <TouchableOpacity onPress={()=>Actions.pop()}><View><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30}/>
                     </View> 
                     </TouchableOpacity>
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>CHANGE PASSWORD</Text>
                    </View>
                    </View>
                <View style={styles.container}>
                
                    <View style={{width:width,justifyContent: 'center',paddingHorizontal:15}}>
                    { 
                                (this.state.errors)?
                                <Text style={styles.errors}>{this.state.errors}</Text>
                                :null
                               }
                    
                    
                     
                    
                    <View style={{paddingHorizontal:15,alignItems:'center',justifyContent:'center'}}>
                    
                    <Text style={{textAlign:'left',width:'100%',marginBottom:5}}>Current Password</Text>

                                <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                    autoCorrect={false} 
                                    secureTextEntry
                                    returnKeyType="next" 
                                    value={this.state.current}
                                    placeholder='Current Password' 
                                    onChangeText={current => this.setState({current})}
                                    placeholderTextColor='#a9a9a9'/>
                    <Text style={{textAlign:'left',width:'100%',marginBottom:5}}>New Password</Text>

                                    <TextInput style = {styles.input} 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    placeholder='New Password' 
                                    secureTextEntry
                                    value={this.state.newp}

                                    onChangeText={newp => this.setState({newp})}
                                    placeholderTextColor='#a9a9a9'/>
                    <Text style={{textAlign:'left',width:'100%',marginBottom:5}}>Confirm Password</Text>

                                    <TextInput style = {styles.input} 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    placeholder='Confirm Password' 
                                    secureTextEntry
                                    value={this.state.confirm}

                                    onChangeText={confirm => this.setState({confirm})}
                                    placeholderTextColor='#a9a9a9'/>
                               
                               <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.change()}
                                                       >
                                                <Text  style={styles.buttonText}>SUBMIT</Text>
                                    
                                    </TouchableOpacity> 
                                    </View>
                                  <View style={{height:100}}>
                                      </View>  
                </View>
                
                </View>
                

                                    
     </SafeAreaView>
    
     )}
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',justifyContent:'center'
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
        marginTop:20,
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