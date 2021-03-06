import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { PostWithoutToken } from './../services/PostWithoutToken';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




const{width, height}=Dimensions.get('window');
export default class ForgotPassword extends Component {
    constructor(props){
        super(props);        
        
    }


    
  
    
    state = {
        errors:'',
        email:''

      };
      
      forgot=()=>
      {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if(this.state.email==='')
          {
              this.setState({errors:'Fill Your Email'})
          }
          else if(reg.test(this.state.email) == false)
            {
                this.setState({errors:'Invalid Email'});
            }
            else
            {
        PostWithoutToken('reset-password',{email:this.state.email}).then((data)=>{
            this.setState({errors:data.message,email:''})

        })
      }
    }
      
    render() {
        
     return(
         
         <SafeAreaView style={{flex:1}}>
          
             <View style={{flex:1,alignItems:'center'}}>
             <View style={{paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                   <TouchableOpacity onPress={()=>Actions.pop()}><View><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30}/>
                     </View> 
                     </TouchableOpacity>
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>FORGOT PASSWORD</Text>
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
                    
                    <Text style={{textAlign:'left',width:'100%',marginBottom:5}}>Email ID</Text>

                                <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                    autoCorrect={false} 
                                    returnKeyType="next" 
                                    value={this.state.email}
                                    keyboardType='email-address'
                                    placeholder='Email ID' 
                                    onChangeText={email => this.setState({email})}
                                    placeholderTextColor='#a9a9a9'/>
                               <TouchableOpacity style={styles.buttonContainer} onPress={()=> this.forgot()} 
                                                       >
                                                <Text  style={styles.buttonText}>SEND EMAIL</Text>
                                    
                                    </TouchableOpacity> 
                                    </View>
                                    <View style={{height:150}}>
                                        </View>
                                    
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