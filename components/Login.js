import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/loader/loader';
import { Actions } from 'react-native-router-flux';
import { PostWithoutToken } from './../services/PostWithoutToken';
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Dashboard } from './Dashboard';
export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password:'',
          errors:'',
        
          loginbtntxt:'LOGIN'

        }
        this.login = this.login.bind(this);
        // this.onChange=this.onChange.bind(this);
      }

    login=()=>{  
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if(this.state.email==='')
        {
            this.setState({errors:"Email ID id required"})
        } 
        else if(reg.test(this.state.email) == false)
        {
            this.setState({errors:'Invalid Email'});
        }     
        else if(this.state.password==='')
        {
            this.setState({errors:"Password is required"})

        }
        
        else if(this.state.email && this.state.password){
            console.log(this.state.email);
            console.log("State is",this.state)
            this.setState({loginbtntxt:`Please Wait...`});
            PostWithoutToken('login',this.state).then((data)=>{
                if(data.status===200){
                if(data.data.questions==="true")
                {


  const resetAction = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [
      NavigationActions.navigate({ routeName: "ques"}),
    ],
  });
  this.props.navigation.dispatch(resetAction);
}
else
{
    AsyncStorage.setItem('login','true');
  
const resetAction = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [
      NavigationActions.navigate({ routeName: "dashboard"}),
    ],
  });
  this.props.navigation.dispatch(resetAction);
}
                console.log("ooo",data.data.authtoken)
                console.log("oooppp",data.data.ID)

                AsyncStorage.setItem("token",data.data.authtoken)
                AsyncStorage.setItem("id",JSON.stringify(data.data.ID))

                
              
            }
            else
            {
                
            this.setState({loginbtntxt:`Login`,errors:data.message}); 
            }
            console.log(data);
            })    
        }   
        else{
            
            this.setState({loginbtntxt:`Login`});
            
        }
    }

   
    
    componentDidMount(){        
       

     }

    // function call on textbox chages 
//     onChange=(e)=>{
//     if(this.state.email==='' || this.state.password===''){
//         this.setState({disabledLogin:true})
//     }
//     else{
//         console.log(this.state.email);
//         this.setState({errors:''})
//         this.setState({disabledLogin:false})
//     }
//   }

  goRegister=()=>{
Actions.register();
  }
    static navigationOptions =
    {
       header:null
    };
    render(){
        // if(this.state.loading)
        // {
        //     <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        //     <Loader loaderclose={this.state.loading}/>
        //     </View>
        // }
        const {navigation}=this.props;
        return ( 
            <SafeAreaView style={styles.container}>
                
                
                <ImageBackground
                    source={require('../src/images/main_bg.png')}
                    style={styles.backgroundImage} resizeMode="contain"> 
                     <KeyboardAwareScrollView>
                    <Grid>
                        <Row size={35}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:'center',paddingTop:30,paddingBottom:10}}>
                            <Image source={require('../src/images/logo_login.png')} resizeMode="contain" style={{width: 180,height:130}}/> 
                            </View>
                        </Row>
                        <Row size={65}>
                            <View style={styles.loginbox} >
                                <Text style={{fontSize:21,color:'#333'}}>WELCOME TO GUYHUB</Text>
                                <TouchableOpacity onPress={()=>Actions.aboutus()}><Text style={{fontSize:18,marginBottom:20,color:'#0078d7'}}>join - connect - match</Text></TouchableOpacity>
                               
                               { 
                                (this.state.errors)?
                                <Text style={styles.errors}>{this.state.errors}</Text>
                                :null
                               }
                              
                                <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                defaultValue={this.state.email}
                                    autoCorrect={false} 
                                    placeholder='Username' 
                                    onChangeText={email => this.setState({email,email})}
                                    placeholderTextColor='#a9a9a9' name="email"/>

                                    <TextInput style = {styles.input} 
                                    placeholder='Password' 
                                    placeholderTextColor='#a9a9a9' 
                                    secureTextEntry name="password" onChangeText={password => this.setState({password})}/>
                                    <TouchableOpacity style={styles.buttonContainer} 
                                                        onPress={this.login} >
                                                <Text  style={styles.buttonText} >{this.state.loginbtntxt}</Text>
                                    
                                    </TouchableOpacity> 
                                    <View style={{flex:1,alignItems:'center'}} resizeMode="contain">
                                    
                                    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>Actions.forgot()}>
                                    <Text style={{fontSize:14,marginBottom:10,marginTop:20}} >Forgot Password? </Text>
                                    </TouchableOpacity> 
                                    <View style={{flex:1,width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
 
                                    <Text style={{width:'70%',textAlign:'right',fontSize:14,marginBottom:20}} >Don't have an account? </Text>
                                    <TouchableOpacity style={{width:'30%'}} onPress={this.goRegister}>

                                    <Text style={{fontSize:14,textAlign:'left',fontWeight:'bold',marginBottom:20}} >Sign Up</Text>
                                    </TouchableOpacity>
                                    
                                    </View>
                                    <TouchableOpacity style={{flexDirection:'row',width:'100%'}} onPress={()=>Actions.privacypolicy()}>
                                    <Text style={{fontSize:14,marginBottom:20,color:'#0078d7'}} >Privacy Policy/Terms of Use </Text>
                                    </TouchableOpacity>
                                    </View>
                                    
                                    
                            </View> 
                            
                        </Row>  
                    </Grid>
                    <View style={{marginBottom:100}}>
                                        </View>
                                        </KeyboardAwareScrollView>
                </ImageBackground> 
               
            </SafeAreaView>
        ); 
    } 
}


const styles=StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4e98f1',
        width:'100%'
    },
    backgroundImage:{        
        width : '100%',
        height:'100%',
        flex:1
    },
    loginbox:{
        backgroundColor:'#ffffff',
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        flex:1,
        justifyContent:'center',
        marginLeft:15,
        marginRight:15,
        padding:30,
        textAlign: 'center',
        alignItems:'center'

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
    errors:{
        padding:7,
        borderWidth:1,
        borderColor:'#eccdcd',
        backgroundColor:'#eccdcd',
        color:'#bf2d23',
        marginBottom:4,
        width:'100%',
        borderRadius:4,

    },    
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        textTransform:'uppercase'    
    }
})