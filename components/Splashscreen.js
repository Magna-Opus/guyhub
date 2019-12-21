import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,Alert} from 'react-native';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import JobDetail from './jobscoponents/JobDetail';
import CreatJob from './jobscoponents/creatJob';
import { Actions } from 'react-native-router-flux';
import MyProfile from './profile/MyProfile';
import MainChat from './chat/MainChat';
import { GetWithToken } from '../services/GetWithToken';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SplashScreen extends Component {
  
  constructor(props) {
    super(props);      
    this.state = { isLoading: true }
  }
  static navigationOptions =
 {
    header:null
 };
  
  async componentDidMount() {


     
   var login=await AsyncStorage.getItem("login")
   

   if(login==='true')
   {
    var token=await AsyncStorage.getItem("token")
    GetWithToken('getuserstatus', {authtoken:token}).then((result)=>{
     console.log("User result: ",result)
     if(result.blocked=="false")
     {
    this.setState({isLoading:false})
    this.setState({check:false})
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({ routeName: "dashboard"}),
      ],
    });
    
    this.props.navigation.dispatch(resetAction);
  }
  else
  {
    alert(result.message)
    setTimeout(
      () => { 
        AsyncStorage.clear();
      AsyncStorage.removeItem('id');
      AsyncStorage.removeItem('login');
      AsyncStorage.removeItem('token');
      Actions.reset("login");
    },
      2000
    )
  }   
   })
  }
   else{
        
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({ routeName: "login"}),
      ],
    });
    
    this.props.navigation.dispatch(resetAction);
    
    
  }


       
    
  }
    render() {
      const {navigation}=this.props;
      const viewStyles = [
        styles.container,
        { backgroundColor: '#4e98f1' }
      ];
      const textStyles = {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold' 
      };
 
        return (
          <View style={viewStyles}>
            <Image source={require('../src/images/splashscreen.jpg')} resizeMode="center" style={styles.image} />          
          </View>
        );
      
     
      
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4e98f1',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image:{        
        width:'100%',
        height:'100%'
    } 

});