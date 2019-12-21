
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity,Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import Fire from './../../services/Firebase';
import {PostWithToken } from './../../services/PostWithToken';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class FriendsList extends Component {
    constructor(props){
        super(props);
        this.state={
          name:'',
          notification:0
        }
        this.getData=this.getData.bind(this);
      }

      async componentWillMount()
      {
        var id=await AsyncStorage.getItem('id');
        this.setState({receiver:id})
        this.setState({sender:JSON.stringify(this.props.id)})
        console.log("senderiiiimmm",this.state.sender,"receiveriiimmm",this.state.receiver)
      }

      componentDidMount()
      {
        this.getData()
        this.setState({image:this.props.imageurl})
      }

      getFriendData=async(id)=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo,friend_id:id,type:'unfriend'},()=>{
            PostWithToken('join', this.state).then((joinresult)=>{            
               console.log(joinresult);
               this.setState({showmsg:true,applymsg:joinresult.data.message});
               this.props.getfollowinglist()
               setTimeout(()=>this.setState({showmsg:false,applymsg:''}),2000)
               
             })  
       })
    }
      async getData()
      {
        
        var id=await AsyncStorage.getItem('id');
        var i=0;
        Fire.shared.on(message =>{
          console.log("ppp",message)
          console.log(message.seen,"seen status",message.user.sender,"Senderooo",JSON.stringify(this.props.id),"My sender",message.user.receiver,"Receiveroooo",id,"My Receiver")
          if(message.seen==0&&message.user.sender==JSON.stringify(this.props.id)&&message.user.receiver==id)
          {
            i++;
            console.log("my Notificationiiii: ",i)
            this.setState({notification:JSON.stringify(i)})
          }
      
    }
         );
      }

      onPress = (id, name) =>
      
        {Actions.newchat({name:name,id:id,image:this.state.image}),this.setState({notification:0})}

        blockUser=async()=>{
          var userInfo=await AsyncStorage.getItem('token');

          Alert.alert(
            'Alert',
            'Do you really want to block this user?',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => {
     
          this.setState({authtoken:userInfo,follow_id:this.props.id,status:'block'},()=>{
              PostWithToken('follow',this.state).then((result)=>{
                  this.props.getfollowinglist();
                console.log(result);
              })
          })  
        }  }])    
      }

    render() {       
     return(
        <TouchableOpacity style={{width:'100%',height:null,paddingHorizontal:15, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}} onLongPress={()=>this.blockUser()}>
            <View style={{width:'100%',height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{width:'70%',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Image source={{uri:this.props.imageurl}} style={{width:44,height:44,borderRadius:22}} />
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{this.props.name}</Text>
            </View>
            <View style={{width:'30%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={{width:'20%'}} onPress={()=> {this.getFriendData(this.props.id)}}>
            <AntDesign
                    name='deleteuser'
                    
                    color='#000'
                     size={20}/>
                     </TouchableOpacity>
                <TouchableOpacity style={{width:'60%',marginLeft:5}} onPress={()=>this.onPress(this.props.id,this.props.name)}>
                    <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Chat</Text>
                    </View>
                </TouchableOpacity>
                {this.state.notification?
                <View style={{width:'20%',marginLeft:5,alignItems:'center',justifyContent:'center'}}>
                  <View style={{height:16,width:16,borderRadius:8,backgroundColor:'green'}}>
    <Text style={{textAlign:'center',color:'white',fontSize:10,marginBottom:2}}>{this.state.notification}</Text>

                       </View>
                       </View>:
    <View style={{width:'20%',marginLeft:5,alignItems:'center',justifyContent:'center'}}>
                       </View>}
            </View>
            </View>
           
    </TouchableOpacity>
     )
      }
}
 