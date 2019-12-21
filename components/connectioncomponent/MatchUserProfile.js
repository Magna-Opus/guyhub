
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {PostWithToken } from './../../services/PostWithToken';
import { Picker, Form } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from './../../components/loader/loader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Zocial from 'react-native-vector-icons/Zocial';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';


export default class MatchUserProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            follow_id:'',
            status:'',
            authtoken:'',
            friend_id:'',
            showmsg:false,
            applymsg:'',
            loading:true,
            profile:''
         
        }
        
     
    }

    
    
    getUserData=async(id)=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        PostWithToken('getuserabout', {authtoken:userInfo,user_id:id}).then((joinresult)=>{            
            console.log(joinresult);
            this.setState({profile:joinresult.data})

            console.log("Profile Log",this.state.profile)
            this.setState({loading:false})
        })
        
    }
    getFriendData=async(id,status)=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo,friend_id:id,type:status},()=>{
            PostWithToken('join', this.state).then((joinresult)=>{            
               console.log(joinresult);
               if(joinresult.data.status===1)
               {
               this.setState(prevState => ({
                profile: {                   // object that we want to update
                    ...prevState.profile,    // keep all other key-value pairs
                    friend: status       // update the value of specific key
                }
            }))
        }
             })  
       })
    }
    getFollowData=async(id,status)=>{
        var userInfo=await AsyncStorage.getItem('token');
    this.setState({authtoken:userInfo,follow_id:id,status:status},()=>{
        console.log(this.state.authtoken);
        
          
        PostWithToken('follow', this.state).then((followresult)=>{            
          console.log(followresult);
          if(followresult.data.status===1)
          {
          this.setState(prevState => ({
            profile: {                   // object that we want to update
                ...prevState.profile,    // keep all other key-value pairs
                follow: status      // update the value of specific key
            }
        }))
    }
        })   
     
      });
    }

    followMe=(id,status)=>{
        console.log(id);
        this.getFollowData(id,status);
    }    
    addFriend=(id,status)=>{
        console.log("Isssss",id);
        debugger;
        this.getFriendData(id,status);        
    }
    

   componentDidMount()
   {
    this.getUserData(this.props.user_id)
    console.log("Second user id:", this.props.user_id)
   }
   onPressNext1() {

    Actions.userlinks({user_id: this.props.user_id,screen_name:'Followers'})
  
}
   onPressNext2() {
   
    Actions.userlinks({user_id: this.props.user_id,screen_name:'Following'})
  
}
onPressNext3() {
   
    Actions.userlinks({user_id: this.props.user_id,screen_name:'Friends'})
  
}
    render() {
        if(this.state.loading){

        
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Loader loaderclose={this.state.loading} />
                </View>
        )
        }
     return(
        
        <SafeAreaView style={styles.container}>
        
        <View style={{width:'100%',flex:1, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
           <ScrollView>
        <View style={{width:'100%',paddingHorizontal:15,height:50,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Ionicons
                    name='md-arrow-back'
                    type='Ionicons'
                    color='#000'
                     size={30} /></TouchableOpacity>
                        <Text style={{width:'90%',fontWeight:'600',fontSize:20,marginLeft:15,color:'black'}}>{this.state.profile.display_name}</Text>
                    </View> 
                    </View>
           <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:'space-between'}}>
           {(this.state.profile.userimage===''||this.state.profile.userimage===null)?
           <View style={{width:'30%'}}>
           <Image style={styles.avatar}
                        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8zKF8xe85wmOD7fiqsVHiTLsRBG3_CHZrIXO3Y1QFyZTFTlV_w'}}/>         
                          </View>
           :

               <View style={{width:'30%'}}>
           <Image style={styles.avatar}
                        source={{uri: this.state.profile.userimage.image.file}}/>         
                          </View>}
                          <View style={{alignItems:'center',width:'60%',justifyContent:'space-evenly'}}>
               <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                   <TouchableOpacity style={{alignItems:'center'}} onPress={this.onPressNext1.bind(this)}>
                       <Text>{this.state.profile.followerscount}</Text>
                       <Text>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={this.onPressNext2.bind(this)}>
                        <Text>{this.state.profile.followingcount}</Text>
                       <Text>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={this.onPressNext3.bind(this)}>
                        <Text>{this.state.profile.friendscount}</Text>
                       <Text>Friends</Text>    
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    {this.state.profile.follow==='unfollow'?
                <TouchableOpacity style={[styles.buttonContainer,{width:'80%'}]} onPress={()=>this.followMe(this.props.user_id,'follow')}>
                      
                       <Text>Follow</Text>

                </TouchableOpacity>:
                <TouchableOpacity style={[styles.buttonContainer,{width:'80%'}]} onPress={()=>this.followMe(this.props.user_id,'unfollow')}>
                      
                       <Text>Unfollow</Text>

                </TouchableOpacity>}
                {this.state.profile.friend==="friend"?
                <TouchableOpacity style={[styles.buttonContainer,{width:'20%',backgroundColor:'#ddd',borderColor:'#ddd'}]} onPress={()=>this.addFriend(this.props.user_id,'unfriend')}>
                <FontAwesome5
                    name='user-check'
                    type='FontAwesome'
                    color='#000'
                     size={20} />
                       
                       
                </TouchableOpacity>:
                <TouchableOpacity style={[styles.buttonContainer,{width:'20%',backgroundColor:'#ddd',borderColor:'#ddd'}]}  onPress={()=>this.addFriend(this.props.user_id,'friend')}>
                <FontAwesome5
                    name='user-friends'
                    type='FontAwesome'
                    color='#000'
                     size={20} />
                       
                       
                </TouchableOpacity>}
                </View>
            </View>
            </View>
            <View style={{paddingHorizontal:20}}>
            <Text style={{fontSize:18}}>{this.state.profile.first_name} {this.state.profile.last_name}</Text>
            <Text style={{fontSize:14,marginTop:5}}>{this.state.profile.user_status}</Text>
            <Text style={{fontSize:14,marginTop:5}}>{this.state.profile.description}</Text>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',marginTop:20,marginBottom:10,width:'50%'}}>
            <View style={{width:'25%',alignItems:'center',justifyContent:'center'}}>
            <FontAwesome
                    name='birthday-cake'
                    type='FontAwesome'
                    color='#ddd'
                     size={30} />
            </View>
            <View style={{width:'75%',alignItems:'flex-start',marginLeft:10,justifyContent:'center'}}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text>{this.state.profile.stringdob}</Text>
            </View>
            </View>
            <View style={{flexDirection:'row',marginTop:20,marginBottom:10,width:'50%',}}>
            <View style={{width:'25%',alignItems:'center',justifyContent:'center'}}>
            <MaterialCommunityIcons
                    name='gender-transgender'
                    type='MaterialCommunityIcons'
                    color='#ddd'
                     size={30} />
            </View>
            <View style={{width:'75%',alignItems:'flex-start',marginLeft:10,justifyContent:'center'}}>
                <Text style={styles.label}>Gender</Text>
                <Text>{this.state.profile.gender}</Text>
            </View>
            </View>
            </View>
            <Divider/>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',marginTop:10,marginBottom:10,width:'50%'}}>
            <View style={{width:'25%',alignItems:'center',justifyContent:'center'}}>
            <Entypo
                    name='phone'
                    type='Entypo'
                    color='#ddd'
                     size={30} />
            </View>
            <View style={{width:'75%',alignItems:'flex-start',marginLeft:10,justifyContent:'center'}}>
                <Text style={styles.label}>Phone Number</Text>
                <Text>{this.state.profile.mobile}</Text>
            </View>
            </View>
            <View style={{flexDirection:'row',marginTop:10,marginBottom:10,width:'50%',}}>
            <View style={{width:'25%',alignItems:'center',justifyContent:'center'}}>
            <Fontisto
                    name='origin'
                    type='Fontisto'
                    color='#ddd'
                     size={30} />
            </View>
            <View style={{width:'75%',alignItems:'flex-start',marginLeft:10,justifyContent:'center'}}>
                <Text style={styles.label}>Nationality</Text>
                <Text>{this.state.profile.nationalityname}</Text>
            </View>
            </View>
            </View>
            <Divider/>
            <View style={{flexDirection:'row',marginTop:10,marginBottom:10,width:'100%',}}>
            <View style={{width:'12.5%',alignItems:'center',justifyContent:'center'}}>
            <Zocial
                    name='email'
                    type='Zocial'
                    color='#ddd'
                     size={30} />
            </View>
            <View style={{width:'87.5%',alignItems:'flex-start',marginLeft:10,justifyContent:'center'}}>
                <Text style={styles.label}>Email address</Text>
                <Text>{this.state.profile.user_email}</Text>
            </View>
            </View>
            <Divider/>
            <View style={{flexDirection:'row',marginTop:10,marginBottom:10,width:'100%',}}>
            <View style={{width:'12.5%',alignItems:'center',justifyContent:'center'}}>
            <FontAwesome
                    name='address-book'
                    type='FontAwesome'
                    color='#ddd'
                     size={30} />
            </View>
            <View style={{width:'87.5%',alignItems:'flex-start',marginLeft:10,justifyContent:'center'}}>
                <Text style={styles.label}>Address</Text>
                {this.state.profile.cityname===''||this.state.profile.cityname===null?<Text>{this.state.profile.statename}, {this.state.profile.countryname}</Text>:
            <Text>{this.state.profile.cityname}, {this.state.profile.statename}, {this.state.profile.countryname}</Text>}
                
            </View>
            
            </View>
            <Divider/>
            <View style={{flexDirection:'row',marginTop:10,marginBottom:10,width:'100%'}}>
            <View style={{width:'12.5%',alignItems:'center',justifyContent:'center'}}>
            <FontAwesome
                    name='graduation-cap'
                    type='FontAwesome'
                    color='#ddd'
                     size={30} />
            </View>
            <View style={{width:'87.5%',alignItems:'flex-start',marginLeft:10,justifyContent:'center'}}>
                <Text style={styles.label}>Name of Educational Institute</Text>
                <Text>{this.state.profile.college}</Text>
            </View>
            
            </View>
            <Divider/>
            <View style={{flexDirection:'row',marginTop:10,width:'100%',marginBottom:50}}>
            <View style={{width:'12.5%',alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons
                    name='account-balance'
                    type='FontAwesome'
                    color='#ddd'
                     size={30} />
            </View>
            <View style={{width:'87.5%',alignItems:'flex-start',marginLeft:10,marginBottom:10,justifyContent:'center'}}>
                <Text style={styles.label}>Address of Educational Institute</Text>
                {this.state.profile.collegecountry===''||this.state.profile.collegecountry===null?
                <Text>NA</Text>:<View>
                {this.state.profile.collegecity===''||this.state.profile.collegecity===null?<Text>{this.state.profile.collegestate}, {this.state.profile.collegecountry}</Text>:
            <Text>{this.state.profile.collegecity}, {this.state.profile.collegestate}, {this.state.profile.collegecountry}</Text>}</View>}
            </View>
            
            </View>
            </View>
            </ScrollView>
            </View>
    </SafeAreaView>
     )
      }
}
 
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    applysuccess:{
        padding:7,
        borderWidth:1,
        borderColor:'#5BC236',
        backgroundColor:'#5BC236',
        color:'#fff',
        marginBottom:4,
        width:'100%',
        borderRadius:4,

    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: "#0078d7",
        marginBottom:10,
        marginTop:10
      },
    smallpicture: {
        width: 60,
        height: 60,
        marginBottom:10,
        marginTop:10
      },
    buttonContainer:{
        backgroundColor: '#5a9fff',
        paddingVertical: 10,
        width:'100%',        
        borderRadius:4,
        borderWidth:1,
        borderColor:'#3e89e9',
        alignItems:'center'
    },
    label:{
        fontSize:14,
        color: "#a9a9a9",
        textAlign:'center'
      }
});