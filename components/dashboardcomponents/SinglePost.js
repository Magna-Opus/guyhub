
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Linking, View, Image, TouchableOpacity,ScrollView ,Dimensions,TouchableHighlightBase ,Alert, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import { PostWithToken } from '../../services/PostWithToken';
import { GetWithToken } from '../../services/GetWithToken';
import Loader from './../../components/loader/loader';
const {width, height}=Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';
import { RadioButton } from 'react-native-paper';

import { thisExpression } from '@babel/types';
export default class PostList extends Component {
    constructor(props){
        super(props);
        this.state={
            imageUrl:'',
            likes:'',
            dislikes:'',
            errors:'',
            docheck:false,
            user_id:'',
            disabledislikebtn:false,
            disablelikebtn:false,
            like:'',
            reason:'',
            post_id:'',
            modalVisible:false,
            authtoken:'',
            mypost:'',
            loading:true
        }
    }
    setModalVisible(visible) {
        //this.getPostList();
        this.setState({modalVisible: visible});
      }

    // onShare = async (title, description) => {
    //     try {
    //       const result = await Share.share({
    //           title:title,            
    //         message:
    //           description,
    //       });
    
    //       if (result.action === Share.sharedAction) {
    //         if (result.activityType) {
    //           // shared with activity type of result.activityType
    //         } else {
    //           // shared
    //         }
    //       } else if (result.action === Share.dismissedAction) {
    //         // dismissed
    //       }
    //     } catch (error) {
    //       alert(error.message);
    //     }
    //   };
    getUserData=async()=>{

        var userInfo=await AsyncStorage.getItem('token');
        var id=await AsyncStorage.getItem('id');

        // userDetail=JSON.parse(userInfo);
        // if(userDetail.user_id)
        // this.setState({user_id:userDetail.user_id,authtoken:userDetail.authtoken});
        // else
        // this.setState({user_id:userDetail.ID,authtoken:userDetail.authtoken});
        // console.log(this.state.authtoken);
        // console.log(this.state.user_id);
        this.setState({authtoken:userInfo})
        this.setState({user_id:id})
        console.log("ID is",id)
        
    }
    postByCategory=async()=>{    
        var userInfo=await AsyncStorage.getItem('token');
            GetWithToken('post/'+this.props.id,{authtoken:userInfo}).then((data)=>{
    
                var responsejson=data;
                console.log(data.data.posts[0]);
                this.setState({mypost:data.data.posts[0]})
                // this.setState({total:data.data.total});
                // if(responsejson.status===200)
                // if(data.data.total===0){this.setState({notfound:'Post Not Found!'});}
                // else {this.setState({postList:data.data.posts});    
                // console.log(this.state.postList);}
                if(data.data.posts[0].post_image==null||data.data.posts[0].post_image=="0")
                                                    {
                                                        this.setState({imageuri:'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image-800x600.jpg'})
                                                    //  imageuri='./../../src/images/post_default_pic.png'
                                                    }
                                                    else
                                                    {
                                                        this.setState({imageuri:data.data.posts[0].post_image.image.file})
                                                    }
                                                    this.setState({dislikes:(data.data.posts[0].unlikes[0])?data.data.posts[0].unlikes[0].unlikes:0})
                                                    this.setState({likes:(data.data.posts[0].likes[0])?data.data.posts[0].likes[0].likes:0})

                this.setState({loading:false})
    
            })
        
            
            
    }
    
    
    componentDidMount(){
        
        this.getUserData();
        this.postByCategory();
//  if(this.props.imageUrl && this.props.imageUrl.indexOf('.')>-1 && this.props.imageUrl!=='undefined'){
//             this.setState({imageUrl:this.props.imageUrl})
//         }
        // else{
        //     this.setState({imageUrl:'./../../src/images/post_default_pic.png'})
        // }
    
       
    }

    reportMessage()
    {
        if(this.state.reason!=='')
        {
        console.log(this.props.id,this.props.author,this.state.reason)
        this.setState({docheck:true})
        PostWithToken('report', {authtoken:this.state.authtoken,author:this.props.author,post_id:this.props.id,reason:this.state.reason,type:'Post'}).then((result)=>{

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
    liked=(id)=>{      
         this.setState({post_id:id,like:1},()=> {
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


downloadImage = () => {
    var date = new Date();
    var image_URL = this.state.imageuri;
    var ext = this.getExtention(image_URL);
    ext = "." + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + "/GuyHub_" + Math.floor(date.getTime()
          + date.getSeconds() / 2) + ext,
        description: 'Image'
      }
    }
    config(options).fetch('GET', image_URL).then((res) => {
      Alert.alert("Image Downloaded Successfully.");
      console.log('The file saved to ', res.path())
    });
  }



getExtention = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
      undefined;
  }

    render() {
        var modalBackgroundStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          };
          var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20,width:width-30,
          borderRadius:4};
        if(this.state.loading)
        {
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Loader loaderclose={this.state.loading} />
                </View>
            )
        }
      let shareOptions = {
        title: "GuyHub Post",
        message: "GuyHub Post",
        url: this.state.mypost.posturl,
        subject: "Share Link" //  for email
      };
     return(
        <ScrollView style={{flex:1,width:'100%',borderRadius:4,marginBottom:10, backgroundColor:'white'}}>
                           <SafeAreaView>
                           <Modal
                avoidKeyboard={true}
               
   
          isVisible={this.state.modalVisible}
          >
       
          <SafeAreaView style={[styles.containers,]} behavior="padding" enabled>
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
                                        <RadioButton value="Contains suspicious link" style={{marginRight:3}} color='#0078d7'/>          
                                        <Text style={{color:'#666'}}>Contains suspicious link</Text>
                                        </View>
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                        <RadioButton value="Contains threatening abusive or offensive language or media" style={{marginRight:3}} color='#0078d7'/>          
                                        <Text style={{color:'#666'}}>Contains threatening abusive or offensive language or media</Text>
                                        </View>
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                        <RadioButton value="Contains unauthorized content" style={{marginRight:3}} color='#0078d7'/>          
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
                                <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                     <TouchableOpacity onPress={()=>  this.props.navigation.goBack()}>
                     <Icon
                        name='md-arrow-back'
                        type='ionicon'
                        color='#fff'
                        size={30}  />
                     </TouchableOpacity> 
                     
                        <Text style={{width:'70%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>Post</Text>
                    </View>
                    </View>
            <View style={{backgroundColor:'#fff',padding:5}}>
            <View>
            {/* <Image source={require('./../../src/images/profile_usr_pholder.png')} style={{width:28,height:28,borderRadius:30}} /> */}
     <Text style={{paddingHorizontal:5,fontSize:16,textAlign:'left',color:'#333',textTransform:'capitalize'}}>{this.state.mypost.title}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#ccc',fontSize:13,textAlign:'left',paddingHorizontal:5}}> <FontAwesome
                    name='calendar-o'
                    type='font-awesome'
                    color='#ccc'></FontAwesome>&nbsp;{this.state.mypost.post_date}</Text>
            <TouchableOpacity style={{marginRight:10}} onPress={()=>Platform.OS=='ios'?Linking.openURL(this.state.imageuri):this.downloadImage()} >
            <FontAwesome5
                    raised
                    name='file-download'
                    type='font-awesome5'
                    color='#ccc'
                     size={20}/>

            </TouchableOpacity>
            </View>
            <View style={{marginTop:10,paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.liked(this.state.mypost.ID)} disabled={this.state.disablelikebtn}> 
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
                        <TouchableOpacity onPress={()=>this.disliked(this.state.mypost.ID)} disabled={this.state.disabledislikebtn}> 
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
                    </View>
                    <View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

<TouchableOpacity onPress={()=>this.setModalVisible(true)}>
<Icon
name='ios-flag'
color='red'
size={20} 
style={{marginRight:10}}/>
</TouchableOpacity>
                        <TouchableOpacity onPress={()=> Share.open(shareOptions)}>
                        <Icon
                        name='ios-share-alt'
                        type='ionicon'
                        color='#ccc'
                        size={20} />
                        </TouchableOpacity>
</View>
                        </View>
                    </View>
     <Text style={{marginTop:20,paddingHorizontal:5}}>{this.state.mypost.post_type} Post by {this.state.mypost.username}</Text>
            </View>
            <View style={{paddingHorizontal:10,justifyContent:'center'}}>
                <Image source={{uri: this.state.imageuri}}resizeMode="cover" style={{width:'100%', height:150}}/>
            </View>
            <View>
                <Text style={{color:'#a9a9a9',marginTop:5,marginBottom:5,marginTop:10,paddingHorizontal:10}} >{this.state.mypost.content}</Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>

                <Text></Text>

            </View>

            </SafeAreaView>

                </ScrollView>
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