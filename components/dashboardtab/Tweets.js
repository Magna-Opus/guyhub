import React, { Component } from 'react';
import { Platform, StyleSheet,Text, View, Image, TouchableOpacity, TextInput,SafeAreaView ,ScrollView,Dimensions} from 'react-native';
import {createAppContainer, createMaterialTopTabNavigator,createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PrivateTweets from './../tweetstab/PrivateTweets';
import PublicTweets from './../tweetstab/PublicTweets';
import { Picker, Form } from "native-base";
import {PostWithToken } from './../../services/PostWithToken';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal'
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
  PrivateTweets:{
    screen:PrivateTweets,
    navigationOptions:{
        title: "Private Tweets",
        tabBarLabel: <Text style={{ color: "white",fontSize:14 }}>Private Tweets</Text>,
      fontSize:10
    }
  },
  PublicTweets:{
    screen:PublicTweets,
    navigationOptions:{
        title: "Public Tweets",
        tabBarLabel: <Text style={{ color: "white",fontSize:14 }}>Public Tweets</Text>,
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
      docheck:false,
      errors:'',
      modalVisible:false,
      post_type:'',
      tweet:''
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


    maketweet()
    {
      if(this.state.post_type=''||this.state.tweet==='')
      {
        this.setState({errors:"Fill all Fields"});
        
      }
      else
      {
        this.setState({docheck:true})
        this.setState({errors:""});
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      today =yyyy + '-' + mm + '-' + dd;

      var d = new Date();
      var n = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        console.log(this.state.authtoken);
        PostWithToken('tweet/create', {authtoken:this.state.authtoken,post_type:this.state.type,content:this.state.tweet,datetime:today+" "+n}).then((followresult)=>{            
          console.log(followresult);
          this.setState({errors:followresult.message});
        
          if(followresult.status==201)
          {
            setTimeout(()=>
            this.setState({type:'',tweet:'',modalVisible:false,errors:''}),2000)
          }
         
          this.setState({docheck:false})
        })  
      }
      
  }


  async componentDidMount()
  {
    var userInfo=await AsyncStorage.getItem('token');
     this.setState({authtoken:userInfo})
     console.log(userInfo)
  }

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
                    
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>TWEETS</Text>
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
         </View> */}<TouchableOpacity onPress={()=>{this.setModalVisible(true)}} style={{position:'absolute',right:10,bottom:10,width:40,height:40,backgroundColor:'#0078d7',borderRadius:50,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <FontAwesome
                    name='envelope'
                    type='font-awesome'
                    color='#fff'
                     size={20}/>
                        </TouchableOpacity>
                        <Modal
          animationType='fade'
          transparent={true}
          isVisible={this.state.modalVisible}
          >
          <View style={[styles.containers,]}>
            <View style={innerContainerTransparentStyle}>
              <View style={{flexDirection:'row',fontSize:16,color:'#0078d7',marginBottom:10}}>
              <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  this.setState({type:'',tweet:''})
                  ;
                }} style={{fontSize:16,marginRight:15}}>
                    <Text>X</Text>
                    </TouchableOpacity> 
                    <Text style={{fontSize:16,color:'#0078d7'}}>Make a New Tweet</Text>
              </View>
              
                          <ScrollView scrollEventThrottle={400}>
              <View style={{flexDirection: 'column'}}>
              { 
                                (this.state.errors)?
                                <Text style={styles.errors}>{this.state.errors}</Text>
                                :null
                               }
                                <Text>Tweet Type</Text>
                                <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,marginBottom:10}}>
                                
                                <Picker
placeholderStyle={{ color: '#a9a9a9',fontSize:14 }}
              mode="dropdown"
            placeholder="Type"
              selectedValue={this.state.type}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label={Platform.OS==='android'?"Select":null} />
              <Picker.Item label="Private Tweets" value="private" />
              <Picker.Item label="Public Tweets" value="public" />
              
            </Picker>
                                </View>
                                
                                    <Text>Tweet</Text>
                                <TextInput style = {styles.input2} 
                                    autoCapitalize="none" 
                                defaultValue={this.state.tweet}
                                    autoCorrect={false} 
                                    placeholder='Tweet' 
                                    multiline={true}
                                    numberOfLines={4}
                                    maxLength={255}
                                    onChangeText={tweet => this.setState({tweet})}
                                    placeholderTextColor='#a9a9a9'/>
                                                    <Text style={{marginBottom:10,backgroundColor:'white',padding:10,color:'#a9a9a9',fontSize:12}}>Guyhub has no tolerance for potentially objectionable content, such as nudity, pornography, and profanity or abusive users. Also all users of Guyhub  can flag objectionable content and admin will take action on it in maximum 24 hours if the objection is found to be genuine. </Text>

                                  <View style={{position:'relative'}}> 
                                
                            <TouchableOpacity disabled={this.state.docheck} onPress={()=>this.maketweet()} style={styles.buttonContainer} >
                <Text  style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                            <View style={{height:40}}>

                            </View>
                            </View>
                            
</View>
</ScrollView>
</View>
</View>
</Modal>
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
  input2:{
    height: 100,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    paddingLeft:16,
    fontSize:16,
    color: '#333',
    width:'100%',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#ccc'},buttonContainer:{
    backgroundColor: '#5a9fff',
    paddingVertical: 10,
    width:'100%',        
    borderRadius:4,
    borderWidth:1,
    borderColor:'#3e89e9'
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
    borderColor:'#32CD32',
    backgroundColor:'#32CD32',
    color:'#008000',
    marginBottom:4,
    width:'100%',
    borderRadius:4,

}    
});