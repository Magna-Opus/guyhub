
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity ,Dimensions,SafeAreaView} from 'react-native';
const user = require('./../../src/images/profile_usr_pholder.png')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
const {width, height}=Dimensions.get('window');
import { RadioButton } from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';
import {PostWithToken } from './../../services/PostWithToken';
export default class PublicTweetsList extends Component {
    constructor(props){
        super(props);
        
      }
      state={
        errors:'',
        reason:'',
            modalVisible:false,
            authtoken:'',
            docheck:false
        //tweet:true
    }
    // toggleTweet()
    // {
    //     this.setState(prevState => ({
    //         tweet: !prevState.tweet
    //       }));
    // }
    setModalVisible(visible) {
        //this.getPostList();
        this.setState({modalVisible: visible});
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
   reportMessage()
    {
        if(this.state.reason!=='')
        {
        console.log(this.props.id,this.props.userid,this.state.reason)
        PostWithToken('report', {authtoken:this.state.authtoken,author:this.props.userid,post_id:this.props.id,reason:this.state.reason,type:'Tweet'}).then((result)=>{
            this.setState({docheck:true})
            if(result.status===201){
                this.setState({errors:result.message});
            this.setState({reason:''})
            this.setState({docheck:false})
            }
          
        })
        }
        else
        {
            this.setState({errors:'Please give reason'});
        }
    }
    render() {
        var modalBackgroundStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          };
          var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20,width:width-30,
          borderRadius:4};
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
                            <View style={{ marginTop:20,width: '20%',}}>
                                <Image source={{uri: this.props.imageurl}} style={{resizeMode: 'cover',height: 80, width: 80, borderRadius: 40  }} />
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
                        <View style={{ marginTop: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#e1e9ef', paddingVertical: 5 }}>
                        {/* {this.state.tweet?<TouchableOpacity style={{marginHorizontal:10}} onPress={()=> this.toggleTweet()}>
                            <MaterialIcons name="favorite" size={30} color="grey" />
                            </TouchableOpacity>:
                            <TouchableOpacity style={{marginHorizontal:10}} onPress={()=> this.toggleTweet()}>
                            <MaterialIcons name="favorite" size={30} color="red" />
                            </TouchableOpacity>} */}
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
                    </View>
                            <TouchableOpacity style={{marginHorizontal:10}} onPress={()=> Share.open(shareOptions)}>
                            <Icon
                        name='ios-share-alt'
                        type='ionicon'
                        color='#ccc'
                        size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.setModalVisible(true)}>
                        <Icon
                        name='ios-flag'
                        color='red'
                        size={20} 
                        style={{marginRight:10}}/>
                        </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
                <Modal
                avoidKeyboard={true}
               
   
          isVisible={this.state.modalVisible}
          >
       
          <SafeAreaView style={[styles.containers, ]} behavior="padding" enabled>
            <View style={innerContainerTransparentStyle}>
              <View style={{flexDirection:'row',fontSize:16,color:'#0078d7',marginBottom:10}}>
              <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.setState({title:'',content:'',post_type:undefined,category:undefined,post_image:'',errors:''})
                }} style={{fontSize:16,marginRight:15}}>
                    <Text>X</Text>
                    </TouchableOpacity> 
                    <Text style={{fontSize:16,color:'#0078d7'}}>Report</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
              { 
                                (this.state.errors)?
                                <Text style={styles.errors}>{this.state.errors}</Text>
                                :null
                               }
                            <Text style={{fontSize:16,color:'black'}}>Why are you reporting this?</Text>
                            {/* <View style={{marginBottom:60,justifyContent:'flex-start',height:40,marginBottom:10,alignItems:'center'}}> */}
                                        <RadioButton.Group
                                        
                                        onValueChange={reason => this.setState({ reason })}
                                        value={this.state.reason}
                                    >
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                        <RadioButton.Android value="Contains suspicious link" style={{marginRight:3}} color='#0078d7' onPress={(value)=>this.setState({reason:value})} status={ this.state.reason === 'Contains suspicious link' ? 'checked' : 'unchecked' }/>          
                                        <Text style={{color:'#666'}}>Contains suspicious link</Text>
                                        </View>
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                        <RadioButton.Android value="Contains threatening abusive or offensive language or media" style={{marginRight:3}} color='#0078d7' onPress={(value)=>this.setState({reason:value})} status={ this.state.reason === 'Contains threatening abusive or offensive language or media' ? 'checked' : 'unchecked' }/>          
                                        <Text style={{color:'#666'}}>Contains threatening abusive or offensive language or media</Text>
                                        </View>
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                        <RadioButton.Android value="Contains unauthorized content" style={{marginRight:3}} color='#0078d7'  onPress={(value)=>this.setState({reason:value})} status={ this.state.reason === 'Contains unauthorized content' ? 'checked' : 'unchecked' }/>          
                                        <Text style={{color:'#666'}}>Contains unauthorized content</Text>
                                        </View>
                                    </RadioButton.Group>
                                        {/* </View> */}
                                     
                <TouchableOpacity onPress={()=>this.reportMessage()} style={styles.buttonContainer} 
                  disabled={this.state.docheck}>
                <Text  style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                               </View>
                               </View>
                               </SafeAreaView>
                               </Modal>
        </View>
     )
      }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containers: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      input:{
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: '#333',
        paddingLeft:16,
        fontSize:16,
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'
    },input2:{
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
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        textTransform:'uppercase'    
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