import React, { Component } from 'react';
import { Platform, StyleSheet, Modal,Text, View, Image, TouchableOpacity, TextInput,SafeAreaView ,ScrollView,Dimensions} from 'react-native';
import {createAppContainer, createMaterialTopTabNavigator,createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Private from './private';
import Public from './public';
import { Picker, Form } from "native-base";

import Friends from './../connectionstab/Friends';
import { Actions } from 'react-native-router-flux';
import {NavigationEvents} from 'react-navigation';
const{width, height}=Dimensions.get('window');
// Create the navigator
// const navigator = createStackNavigator({
//   Tweet: { screen: Main },
//   Chat: { screen: Chat },
// });

const TopTweetsTab = createAppContainer(createMaterialTopTabNavigator({  // set createAppContainer here
  Private:{
    screen:Private,
    navigationOptions:{
        title: "Private Tweets",
        tabBarLabel: <Text style={{ color: "white",fontSize:14 }}>My Private Tweets</Text>,
      fontSize:10
    }
  },
  Public:{
    screen:Public,
    navigationOptions:{
        title: "Public Tweets",
        tabBarLabel: <Text style={{ color: "white",fontSize:14 }}>My Public Tweets</Text>,
        fontSize:10
    }
  }}));

export default class Tweets extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      tweet:'',
      type:'',
      modalVisible:false,

    }
  }
  onPress = () =>
    {Actions.newchat({name:this.state.name});}
    
  setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  onChangeText = name => this.setState({ name });
  onValueChange(value: string) {
    this.setState({
      type: value
    });}
  render() {
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
    var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20,width:width-30,
          borderRadius:4};
    return (
      <SafeAreaView style={styles.container}>
        {/* <NavigationEvents onDidFocus={ this.getUserData} /> */}
        <View style={{width:'100%',height:50,paddingHorizontal:15,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30}/>
                     </TouchableOpacity>
                        <Text style={{width:'70%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>MY TWEETS</Text>
                    </View>
                    
                </View>
         <TopTweetsTab/>
         {/*<View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Flutter God Evan Bacon"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
         </View> */}
                        
      </SafeAreaView>
    );
  }
}
const offset = 24;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  containers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  input:{
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingLeft:16,
    fontSize:16,
    padding: 10,
    color: '#333',
    width:'100%',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#ccc'
},
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
  textAlign: 'center',
  fontWeight: '700',
  textTransform:'uppercase' 
  },
  buttonContainer:{
    backgroundColor: '#5a9fff',
    paddingVertical: 10,
    width:'100%',        
    borderRadius:4,
    borderWidth:1,
    borderColor:'#3e89e9'
  },
});