import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator,createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Home from './dashboardtab/Home';
import DrawerScreen from './Drawer/DrawerScreen.js';
import Connections from './dashboardtab/Connections';
import Jobs from './dashboardtab/Jobs';
import Tweets from './dashboardtab/Tweets';
import MyProfile from './profile/MyProfile';


const MainNavigator = createAppContainer(createBottomTabNavigator({  // set createAppContainer here
  Home:{
    screen:Home,
    navigationOptions:{
      tabBarLabel:'Home',  
      tabBarIcon: ({ tintColor }) => (  
     <Image source={require('./../src/images/home_ico.png')} resizeMode="contain" style={{width:20,height:20}}/>
        ),  
      activeColor: '#f60c0d',  
      inactiveColor: '#dddddd'
    }
  },
  Connections:{
    screen:Connections,
    navigationOptions:{
      tabBarLabel:'Connections',  
      tabBarIcon: ({ tintColor }) => (  
     <Image source={require('./../src/images/connection_ico.png')} resizeMode="contain" style={{width:22,height:22}}/>
        ),  
      activeColor: '#f60c0d',  
      inactiveColor: '#dddddd'
    }
  },
  Jobs:{
    screen:Jobs,
    navigationOptions:{
      tabBarLabel:'Jobs',  
      tabBarIcon: ({ tintColor }) => (  
        <View>
           <Image source={require('./../src/images/jobs_ico.png')} resizeMode="contain" style={{width:20,height:20}}/>
        </View>
    
        ),  
      activeColor: '#f60c0d',  
      inactiveColor: '#dddddd'
    }
  },
  Tweets:{
    screen:Tweets,
    navigationOptions:{
      tabBarLabel:'Tweets',  
      tabBarIcon: ({ tintColor }) => (  
     <Image source={require('./../src/images/tweets_ico.png')}  resizeMode="contain" style={{width:20,height:20}}/>
        ),  
      activeColor: '#f60c0d',  
      inactiveColor: '#dddddd',
    },
    tabBarOptions:{
      style:{
        height:10
      }
    }
  },
  
}));
const NewUserDrawer = createAppContainer(createDrawerNavigator({  // set createAppContainer here
  MainNavigator: { screen: MainNavigator },
  
  },{
  initialRouteName: 'MainNavigator',
  headerMode:'none',
  contentOptions: {
        activeTintColor: '#72052a',
        activeBackgroundColor: '#72052a',
      },
      drawerPosition: 'left',
      contentComponent: DrawerScreen,
      drawerWidth: 250,
      drawerBackgroundColor: '#fff',
  }));

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:''
    }
  }
  componentDidMount(){
    var userData=AsyncStorage.getItem('userDetail');
  }
  static navigationOptions =
 {
    header:null
 };
  render() {
    const { navigate } = this.props.navigation;  
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={()=>navigate('Login')}><Text>Hell Dash</Text></TouchableOpacity> */}
        <NewUserDrawer/>
        {/* <MainNavigator style={{height:100,paddingTop:15,paddingBottom:15}}/> */}
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
