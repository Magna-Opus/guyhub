//import liraries
import React, { Component } from 'react';
import { Platform,View, Text, StyleSheet, TouchableOpacity,Image,Alert, ImageBackground, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createMaterialTopTabNavigator,NavigationEvents } from 'react-navigation';
import { GetWithToken } from './../../services/GetWithToken';

const{width, height}=Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import ProfileInfo from './ProfileInfo';
import Friends from './Friends';
import MyFollowers from './MyFollowers';
import MyFollowing from './MyFollowing';

// create a component

const TopConnectionTab = createAppContainer(createMaterialTopTabNavigator({  // set createAppContainer here
    ProfileInfo:{
        screen:ProfileInfo,
        navigationOptions:{
            title: "Profile",
            tabBarLabel: <Text style={{ color: "white",fontSize:14 }}>Profile</Text>,
          fontSize:10
        }
      },
    Friends:{
      screen:Friends,
      navigationOptions:{
          title: "Friends",
          tabBarLabel: <Text style={{ color: "white",fontSize:14 }}>Friends</Text>,
          fontSize:10
      }
    },
    MyFollowing:{
      screen:MyFollowing,
      navigationOptions:{
        title: "My Followings",
        tabBarLabel: <Text style={{ color: "white",fontSize:14 }}>Following</Text>,
        fontSize:10
      }
    },
    MyFollowers:{
        screen:MyFollowers,
        navigationOptions:{
          title: "My Followers",
          tabBarLabel: <Text style={{ color: "white",fontSize:14 }}>Followers</Text>,
          fontSize:10
        }
      }
    
  },
  {
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#694fad' },
      backBehavior:"initialRoute"
    }));
class MyProfile extends Component {
   constructor(props){
       super(props);
       this.state={
           profileDetails:[],
           profileimg:'',
           id:'',
           authtoken:'',
           token:'',
           loading:true
       }
       this.getUserData=this.getUserData.bind(this);
   }
   
    // console.log(userInfo)
    //console.log(userDetail);debugger;
//    this.setState({profileDetails:userDetail,id:userDetail.profile_image,authtoken:userDetail.authtoken},()=>{
//     PostData('attachment',this.state).then((profilepics)=>{
//         //console.log(profilepics);
//         this.setState({loading:false,profileimg:profilepics.attachment[0].file});
//        })     
         
//    })   

componentWillReceiveProps()
{
    this.getUserData();
}

getUserData=async()=>{
    var userInfo=await AsyncStorage.getItem('token');
    var id=await AsyncStorage.getItem('id');

   // userDetail=JSON.parse(userInfo);
   // if(userDetail.user_id)this.setState({userid:userDetail.user_id});
   // else 
   this.setState({userid:id});
   this.setState({id:id});
       this.setState({token:userInfo})
   this.setState({authtoken:userInfo},()=>{
       //console.log(this.state.userid);
       GetWithToken('userdetails', this.state).then((currentuser)=>{
           console.log("CurrentUsers: ",currentuser)
           this.setState({profileDetails:currentuser.data});
           this.setState({userimage:currentuser.data.userimage.image.file});

           //var userdata=JSON.stringify(currentuser.data);
           //AsyncStorage.setItem('userInfo',userdata);
           this.setState({loading:false})
       });
   }) 
}

componentWillMount(){
    this.getUserData();
}
goToEditProfile=()=>{
    Actions.editprofile({refreshPrevData:this.getUserData.bind(this)});
}
    onPressLogout(){
        Alert.alert(
            'Alert',
            'Do you really want to logout?',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => {
        AsyncStorage.clear();
        // AsyncStorage.removeItem('userInfo');
        // AsyncStorage.removeItem('num_correct');
        // AsyncStorage.removeItem('num_empty');
        // AsyncStorage.removeItem('num_wrong');
        // AsyncStorage.removeItem('exam_id');
        
        AsyncStorage.removeItem('id');
        AsyncStorage.removeItem('login');
        AsyncStorage.removeItem('token');
        Actions.reset("login");
    
    }},
  ],
  {cancelable: false},
);
   }
    render() {
        //const {profileimg}=this.state;
        return (
            

            <View style={styles.container}>
              
                 <NavigationEvents onDidFocus={()=>console.log('hddddddddddddddd')} />
                
                <View style={{width:'100%',paddingHorizontal:15,backgroundColor:'#0078d7',height:50,flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'absolute',zIndex:1,marginTop:Platform.OS=='ios'?35:0}}>
                
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>Actions.dashboard()}><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30} /></TouchableOpacity>
                        <Text style={{width:'70%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>MY PROFILE</Text>
                    </View> 
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.goToEditProfile} style={{paddingHorizontal:10}}>
                        <Icon
                    name='ios-create'
                    type='ionicon'
                    color='#fff'
                     size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressLogout}>
                        <Icon
                    name='ios-power'
                    type='ionicon'
                    color='#fff'
                     size={30}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    <View style={{display:'flex',flexDirection:'column',flex:1}}>
                <View style={{flex:1}}>
                    <SafeAreaView style={{flex:1}}>
                <ImageBackground source={require('./../../src/images/gradient.png')} resizeMode="cover" style={{justifyContent:'center',alignItems:'center',marginTop:Platform.OS=='ios'?35:0}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:70}}>
        {console.log("Image is:",this.state.userimage)}
        {this.state.userimage!==''?
                             <Image source={{uri:this.state.userimage}} resizeMode="cover" style={{width:100,height:100,borderRadius:50}}/> 
                            :<Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8zKF8xe85wmOD7fiqsVHiTLsRBG3_CHZrIXO3Y1QFyZTFTlV_w'}} resizeMode="cover" style={{width:100,height:100,borderRadius:50}}/> }
                            {/* <TouchableOpacity onPress={this.handleChooseImage} style={{width:30,height:30,backgroundColor:'white',marginTop:-50,marginLeft:-20,borderRadius:30,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Icon name="ios-create" type="ionicon" size={20} />
                            </TouchableOpacity> */}
                    </View>
                    <View style={{textAlign:'center',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:10}}>
                        <Text>
                            {this.state.profileDetails.display_name}
                        </Text>
                        
                        <Text>
                            {this.state.profileDetails.user_status}
                        </Text>
                    </View>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                </ImageBackground>
                </SafeAreaView>
                </View>
                <View style={{flex:2,marginTop:20}}>
            <TopConnectionTab/>
                </View>
                </View>
            </View>
            

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default MyProfile;
