
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { PostWithToken } from './../../services/PostWithToken';
export default class FollowingList extends Component {
    constructor(props){
        super(props)
        this.state={
            authtoken:'',
            items:[],
            notfound:'',
            follow_id:'',
            status:''
        }
        this.unFollowUser=this.unFollowUser.bind(this);
    }
    unFollowUser=(user_Id, status)=>{
        this.setState({follow_id:user_Id,status:'unfollow'},()=>{
            PostWithToken('follow',this.state).then((result)=>{
              console.log(result)
              this.props.getfollowinglist();
            })
        })        
    }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ items: nextProps.items});  
    //   }
    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo},()=>console.log(this.state.authtoken));
    }
    componentDidMount(){
        this.getUserData();
    }

    render() {
     return(
        <View style={{height:null,paddingHorizontal:15, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
            <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Image source={{uri: this.props.imageurl}} style={{width:44,height:44,borderRadius:22}} />
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{this.props.name}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.unFollowUser(this.props.userid,'unfollow')}>
                    <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Unfollow</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>           
    </View>
     )
      }
}
 