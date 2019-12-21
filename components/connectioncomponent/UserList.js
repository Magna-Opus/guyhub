
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {PostWithToken } from './../../services/PostWithToken';
export default class UserList extends Component {
    constructor(props){
        super(props);
        this.state={
            follow_id:'',
            status:'',
            authtoken:'',
            friend_id:'',
            showmsg:false,
            applymsg:''
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
            this.setState({showmsg:true,applymsg:followresult.data.message});
            setTimeout(()=>this.setState({showmsg:false,applymsg:''}),2000)
            this.props.getuserlist();
          })    
        });
    }
    getFriendData=async(id)=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo,friend_id:id,type:'friend'},()=>{
            PostWithToken('join', this.state).then((joinresult)=>{            
               console.log(joinresult);
               this.setState({showmsg:true,applymsg:joinresult.data.message});
               
               setTimeout(()=>this.setState({showmsg:false,applymsg:''}),2000)
               this.props.getuserlist();
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
    render() {
     return(
        <View style={{height:null,paddingHorizontal:15, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
            { 
            (this.state.showmsg)?
            <Text style={styles.applysuccess}>{this.state.applymsg}</Text>
            :null
            }

            <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Image source={{uri: this.props.imageurl}} style={{width:44,height:44,borderRadius:22}} />
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{this.props.name}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                {
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
                }
            </View>
            </View>
           
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