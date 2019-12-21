
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Alert,View, Image, TouchableOpacity } from 'react-native';
const user = require('./../../src/images/profile_usr_pholder.png')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {PostWithToken } from './../../services/PostWithToken';
export default class PublicList extends Component {
    constructor(props){
        super(props);
        
      }
      state={
       // tweet:true
    }
    async componentDidMount()
    {
        
        var userInfo=await AsyncStorage.getItem('token');
        this.setState({authtoken:userInfo})
        var id=await AsyncStorage.getItem('id');
        this.setState({user_id:id})
        console.log("user id",id)
     
        console.log("this.state.token is",userInfo)
        if(this.props.like)
        this.setState({likes:this.props.like})
        else
        this.setState({likes:0})
        if(this.props.dislikes)
        this.setState({dislikes:this.props.dislikes})
        else
        this.setState({dislikes:0})
this.setState({user_id:id})
        console.log("Dislikes are",this.state.dislikes);
        console.log("Likes are",this.state.likes);
    }
    deletetweet()
    {
     Alert.alert(
         'Alert',
         'Do you really want to delete this tweet?',
         [
           {
             text: 'No',
             onPress: () => console.log('Cancel Pressed'),
             style: 'cancel',
           },
           {text: 'Yes', onPress: () => {
      PostWithToken('deletepost',{post_id:JSON.stringify(this.props.id),user_id:this.props.userid,type:'Tweet',authtoken:this.state.authtoken,image_id:''}).then((data)=>{
        var responsejson=data;
        console.log(responsejson);
        if(responsejson.data.status===1){
         this.props.matcheduser()
        this.setState({errors:responsejson.data.message});
        setTimeout(()=>this.setState({errors:false}),2000)
       
        }
        
    
    })
 }},
 ],
 {cancelable: false},
 );
}
       
    
    liked=(id)=>{  
        // var userInfo=await AsyncStorage.getItem('token');
        // console.log("log is",userInfo)
        this.setState({post_id:id,like:1,authtoken:this.state.authtoken,user_id:this.state.user_id},()=> {
           // debugger;
           console.log(this.state.user_id);debugger;
           PostWithToken('post/likes', this.state).then((likedcount)=>{
               console.log(likedcount);
               if(likedcount.status===201){
                   console.log(likedcount);
                   this.setState({disablelikebtn:true,disabledislikebtn:false,likes:likedcount.data.likes[0].likes,dislikes:likedcount.data.unlikes[0].unlikes})
                  
                  

               }
               //var likes=this.state.likes+1;
           })
       })
      
       
   }
   disliked=(id)=>{
       this.setState({post_id:id,like:2},()=> {
           // console.log(this.state);
           PostWithToken('post/likes', this.state).then((likedcount)=>{
               if(likedcount.status===201){
                  // console.log(likedcount.data.already);                    
                   this.setState({disablelikebtn:false,disabledislikebtn:true,likes:likedcount.data.likes[0].likes,dislikes:likedcount.data.unlikes[0].unlikes})
                   
               }
               //var likes=this.state.likes+1;
           })
       })
   }


    render() {
        let shareOptions = {
            title: "GuyHub Tweet",
            message: "GuyHub Tweet",
            url: this.props.shareurl,
            subject: "Share Link" //  for email
          };
     return(
        <View style={{height:null,paddingHorizontal:15, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
            <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                    <View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: '20%',marginTop:20 }}>
                                <Image source={{uri: this.props.imageurl}} style={{ resizeMode: 'cover', height: 80, width: 80, borderRadius: 40 }} />
                            </View>
                            <View style={{ width: '80%', }}>
                                <View>
                                    <Text style={{ paddingLeft: 30, fontSize: 20, fontWeight: 'bold' }}>{this.props.name}</Text>
                                    <Text style={{ color: '#657889', fontSize: 12, paddingLeft: 30, marginTop: 0 }}>{this.props.date}</Text>
                                    <Text style={{ color: '#657889', fontSize: 12, paddingLeft: 30, marginTop: 5 }}>{this.props.time}</Text>
                                </View>
                            </View>
                        </View>
                        <View><Text style={{ marginTop: 10, fontSize: 16, lineHeight: 25 }}>{this.props.tweet}</Text></View>
                        <View style={{ marginTop: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#e1e9ef', paddingVertical: 10 }}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.liked(this.props.id)} disabled={this.state.disablelikebtn}> 
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                        <FontAwesome
                    raised
                    name='thumbs-up'
                    type='font-awesome'
                    color='#ccc'
                     size={20}/>
                        <Text style={{marginLeft:5,marginRight:15,color:'#ccc'}}>{this.state.likes}</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.disliked(this.props.id)} disabled={this.state.disabledislikebtn}> 
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                            <FontAwesome
                    name='thumbs-down'
                    type='font-awesome'
                    color='#ccc'
                     size={20}/>
                        <Text style={{marginLeft:5,color:'#ccc'}}>{this.state.dislikes}</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:10}} onPress={()=> this.deletetweet()}>
            <MaterialCommunityIcons
                    raised
                    name='delete'
                    type='MaterialCommunityIcons'
                    color='#ccc'
                     size={20}/>

            </TouchableOpacity>
                    </View>
                            <TouchableOpacity style={{marginHorizontal:10}} onPress={()=> Share.open(shareOptions)}>
                            <Icon
                        name='ios-share-alt'
                        type='ionicon'
                        color='#ccc'
                        size={20} /> 
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
           
        </View>
     )
      }
}
 