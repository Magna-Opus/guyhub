import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,SafeAreaView, TouchableOpacity ,ScrollView} from 'react-native';
import {createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MatchedProfile from './../connectionstab/MatchedProfile';
import Users from './../connectionstab/Users';
import Followers from './../connectionstab/Followers';
import Following from './../connectionstab/Following';
import Blocked from './../connectionstab/Blocked';
import Loader from './../../components/loader/loader';

import AsyncStorage from '@react-native-community/async-storage';
import { GetData } from './../../services/GetData';
import {PostData } from './../../services/PostData';
import FilterConnetion from './../connectioncomponent/FilterConnection';
import SplashScreen from './../Splashscreen';

const TopConnectionTab = createAppContainer(createMaterialTopTabNavigator({  // set createAppContainer here
  MatchedProfile:{
    screen:MatchedProfile,
    navigationOptions:{
        title: "Matched Profiles",
        tabBarLabel: <Text style={{ color: "white",fontSize:12 }}>Matched Profiles</Text>,
      fontSize:10
    }
  },
  Users:{
    screen:Users,
    navigationOptions:{
        title: "Users",
        tabBarLabel: <Text style={{ color: "white",fontSize:12 }}>Users</Text>,
      fontSize:10
    }
  },
  Followers:{
    screen:Followers,
    navigationOptions:{
        title: "Followers",
        tabBarLabel: <Text style={{ color: "white",fontSize:12 }}>Followers</Text>,
        fontSize:10
    }
  },
  Following:{
    screen:Following,
    navigationOptions:{
      title: "Following",
      tabBarLabel: <Text style={{ color: "white",fontSize:12 }}>Following</Text>,
      fontSize:10
    }
  },
  Blocked:{
    screen:Blocked,
    navigationOptions:{
      title: "Blocked Users",
      tabBarLabel: <Text style={{ color: "white",fontSize:12 }}>Blocked Users</Text>,
      fontSize:10
    }
  }
  
},
{
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
    
  }));

export default class Connections extends React.Component {
  constructor(props){
    super(props);
    this.state={
        jobs:[],
        authtoken:'',
        modalVisible:false,
        
    }
}


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  showFilter=()=>{
    this.setModalVisible(true);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        
        {/* <FilterConnetion modalVisible={this.state.modalVisible}/> */}
        <View style={{width:'100%',height:50,paddingHorizontal:15,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    {/* <Icon
                    name='ios-menu'
                    type='ionicon'
                    color='#fff'
                     size={30}/> */}
                        <Text style={{width:'70%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>CONNECTIONS</Text>
                    </View>
                   {/*  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.showFilter}>
                        <Icon
                    name='ios-funnel'
                    type='ionicon'
                    color='#fff'
                     size={23}/>
                        </TouchableOpacity>
                      </View>
                        <TouchableOpacity style={{paddingHorizontal:15}}>
                        <Icon
                    name='ios-search'
                    type='ionicon'
                    color='#fff'
                     size={23}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <FontAwesome
                    name='ellipsis-v'
                    type='FontAwesome'
                    color='#fff'
                     size={23}/>
                        </TouchableOpacity>
                    </View> */}
                </View>
        <TopConnectionTab/>
        
      </SafeAreaView>
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