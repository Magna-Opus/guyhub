
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {PostWithToken } from './../../services/PostWithToken';
import { Picker, Form } from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';


export default class MatchedList extends Component {
    constructor(props){
        super(props);
        this.state={
            follow_id:'',
            status:'',
            authtoken:'',
            friend_id:'',
            showmsg:false,
            applymsg:'',
            profile:[]
        }
        this.getUserData=this.getUserData.bind(this);
    }

    
    
    getUserData=async(id)=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo,follow_id:id,status:'follow'},()=>{
          console.log(this.state.authtoken);
          PostWithToken('follow', this.state).then((followresult)=>{            
            console.log(followresult);
            this.setState({showmsg:true,applymsg:followresult.message});
            setTimeout(()=>this.setState({showmsg:false,applymsg:''}),2000)
            this.props.matcheduser();
          })    
        });
    }
    getFriendData=async(id)=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo,friend_id:id,type:'friend'},()=>{
            PostWithToken('join', this.state).then((joinresult)=>{            
               console.log(joinresult);
               this.setState({showmsg:true,applymsg:joinresult.message});
               
               setTimeout(()=>this.setState({showmsg:false,applymsg:''}),2000)
               this.props.matcheduser();
             })  
       })
    }
    followMe=(id)=>{
        console.log(id);
        this.getUserData(id);
    }    
    addFriend=(id)=>{
        console.log(id);
        debugger;
        this.getFriendData(id);        
    }
    
    async postChoice(id)
    {
        this.setState({myicon:'yes'})
        //api to post the profile choice
        var userInfo=await AsyncStorage.getItem('token');
        PostWithToken('payforuser', {authtoken:userInfo,user_id:id,pending:this.props.paymentstatus}).then((result)=>{            
            console.log("response is ",result);
            this.setState({showmsg:true,applymsg:result.message});
            
            setTimeout(()=>this.setState({showmsg:false,applymsg:''}),2000)
            this.props.matcheduser();
          })  
    }

    componentWillMount()
    {
        console.log("PaymentStatus: ",this.props.paymentstatus)
    
            this.setState({
              myicon:this.props.myicon,
              
            })
          
          
    }
    onPressNext() {
        console.log("First user id:", this.props.id)
        Actions.matchuserprofile({user_id: this.props.id})
      
    }
    render() {
     return(
        <View style={{height:null,paddingHorizontal:15, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
            { 
            (this.state.showmsg)?
            <Text style={styles.applysuccess}>{this.state.applymsg}</Text>
            :null
            }
            {console.log("Props Payment Status",this.props.paymentstatus)}
            {
            (this.props.paymentstatus>0)?
            this.props.myicon==='yes'?
            <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={this.onPressNext.bind(this)}>
            
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            
            <Image source={{uri: this.props.imageurl}} style={{width:44,height:44,borderRadius:22}} />
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{this.props.name}</Text>
                
  
  
                              

            </View>
            
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon1

  name='check-decagram'
  type='MaterialCommunityIcons'
  color='#0078d7'
  style={{marginRight:10}}
   size={20}/>
            <Text>{this.props.match}% </Text>
            <Icon1
                    
             
                    name='cards-heart'
                    type='MaterialCommunityIcons'
                    color='red'
                     size={23}/>
                {/* {
                    (this.props.followersstatus===true)?null:<TouchableOpacity style={{marginRight:10}} onPress={()=>this.followMe(this.props.id)}>
                    <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Follow</Text>
                    </View>
                </TouchableOpacity>
                }
                {
                    (this.props.friendsstatus===true)?<View style={{width:18,height:19}}>
                    </View>:
                <TouchableOpacity onPress={()=>this.addFriend(this.props.id)}>
                    <View>
                    <Image source={require('./../../src/images/add_usr.png')} resizeMode='contain' style={{width:18,height:19}}/>
                    </View>
                </TouchableOpacity>
                } */}
            </View>
            </TouchableOpacity>:<TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={()=>{
                Alert.alert(
                    'Alert',
                    'Unlocking this profile will be counted under your current subscription. Are you sure to unlock this profile?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => this.postChoice(this.props.id)},
                    ],
                    {cancelable: false},
                  );
    
}}>
            
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            
            <Image source={{uri: this.props.imageurl}} style={{width:44,height:44,borderRadius:22}} />
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{this.props.name}</Text>

            
            </View>
            
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon
                    name='lock'
                    type='MaterialIcons'
                    color='#0078d7'
                    style={{marginRight:10}}
                     size={20}/>
            <Text>{this.props.match}% </Text>

            <Icon1
         
                    name='cards-heart'
                    type='MaterialCommunityIcons'
                    color='red'
                     size={23}/>
                {/* {
                    (this.props.followersstatus===true)?null:<TouchableOpacity style={{marginRight:10}} onPress={()=>this.followMe(this.props.id)}>
                    <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Follow</Text>
                    </View>
                </TouchableOpacity>
                }
                {
                    (this.props.friendsstatus===true)?<View style={{width:18,height:19}}>
                    </View>:
                <TouchableOpacity onPress={()=>this.addFriend(this.props.id)}>
                    <View>
                    <Image source={require('./../../src/images/add_usr.png')} resizeMode='contain' style={{width:18,height:19}}/>
                    </View>
                </TouchableOpacity>
                } */}
            </View>
            </TouchableOpacity>
            :
            this.props.myicon==='yes'?
            <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={this.onPressNext.bind(this)}>
            
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Image source={{uri: this.props.imageurl}} style={{width:44,height:44,borderRadius:22}} />
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{this.props.name}</Text>
                
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon1

                    name='check-decagram'
                    type='MaterialCommunityIcons'
                    style={{marginRight:10}}
                    color='#0078d7'
                     size={20}/>
            <Text>{this.props.match}% </Text>

            <Icon1

                    name='cards-heart'
                    type='MaterialCommunityIcons'
                    color='red'
                     size={23}/>
                {/* {
                    (this.props.followersstatus===true)?null:<TouchableOpacity style={{marginRight:10}} onPress={()=>this.followMe(this.props.id)}>
                    <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Follow</Text>
                    </View>
                </TouchableOpacity>
                }
                {
                    (this.props.friendsstatus===true)?<View style={{width:18,height:19}}>
                    </View>:
                <TouchableOpacity onPress={()=>this.addFriend(this.props.id)}>
                    <View>
                    <Image source={require('./../../src/images/add_usr.png')} resizeMode='contain' style={{width:18,height:19}}/>
                    </View>
                </TouchableOpacity>
                } */}
            </View>
            </TouchableOpacity>:<TouchableOpacity onPress={()=> alert("You need to subscribe for unlocking Matched Profiles")} style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Image source={{uri: this.props.imageurl}} style={{width:44,height:44,borderRadius:22}} />
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{this.props.name}</Text>
                
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon
                    name='lock'
                    type='MaterialIcons'
                    style={{marginRight:10}}
                    color='#0078d7'
                     size={23}/>
            <Text>{this.props.match}% </Text>

            <Icon1
         
                    name='cards-heart'
                    type='MaterialCommunityIcons'
                    color='red'
                     size={23}/>
                {/* {
                    (this.props.followersstatus===true)?null:<TouchableOpacity style={{marginRight:10}} onPress={()=>this.followMe(this.props.id)}>
                    <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Follow</Text>
                    </View>
                </TouchableOpacity>
                }
                {
                    (this.props.friendsstatus===true)?<View style={{width:18,height:19}}>
                    </View>:
                <TouchableOpacity onPress={()=>this.addFriend(this.props.id)}>
                    <View>
                    <Image source={require('./../../src/images/add_usr.png')} resizeMode='contain' style={{width:18,height:19}}/>
                    </View>
                </TouchableOpacity>
                } */}
            </View>
          
            </TouchableOpacity>} 
            
           
    </View>
     )
      }
}
 
// define your styles
const styles = StyleSheet.create({
   
    applysuccess:{
        padding:7,
        borderWidth:1,
        borderColor:'#5BC236',
        backgroundColor:'#5BC236',
        color:'#fff',
        marginBottom:4,
        width:'100%',
        borderRadius:4,

    }
});