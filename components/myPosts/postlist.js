
import React, { Component } from 'react';
import {  Platform, StyleSheet, Text, View, Linking, Image, TouchableOpacity, TouchableHighlightBase ,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PostImageData } from './../../services/PostImageData';
import Share from 'react-native-share';

import { Actions } from 'react-native-router-flux';

import RNFetchBlob from 'rn-fetch-blob';
import { PostWithToken } from '../../services/PostWithToken';
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression } from '@babel/types';
export default class PostList extends Component {
    constructor(props){
        super(props);
        this.state={
            imageUrl:'',
            likes:'',
            errors:'',
            dislikes:'',
            user_id:'',
            disabledislikebtn:false,
            disablelikebtn:false,
            like:'',
            post_id:'',
            authtoken:''
        }
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

    }
    componentDidMount(){
        this.getUserData();
//  if(this.props.imageUrl && this.props.imageUrl.indexOf('.')>-1 && this.props.imageUrl!=='undefined'){
//             this.setState({imageUrl:this.props.imageUrl})
//         }
        // else{
        //     this.setState({imageUrl:'./../../src/images/post_default_pic.png'})
        // }
        if(this.props.imageUrl)
        {
            this.setState({imageUrl:this.props.imageUrl})
        }
        if(this.props.like)
        this.setState({likes:this.props.like})
        else
        this.setState({likes:0})
        if(this.props.dislikes)
        this.setState({dislikes:this.props.dislikes})
        else
        this.setState({dislikes:0})

    console.log(this.state.dislikes);
    console.log(this.state.likes);

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

repost()
{
  PostWithToken('repost',{id:JSON.stringify(this.props.id),authtoken:this.state.authtoken}).then((data)=>{
    var responsejson=data;
    console.log(responsejson);
    if(responsejson.status===201){
        this.props.functinonpost();
    this.setState({errors:responsejson.message});
    setTimeout(()=>this.setState({errors:false}),2000)
   
    }
    

})
}

deletepost()
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
  PostWithToken('deletepost',{post_id:JSON.stringify(this.props.id),user_id:this.props.userid,type:'Post',authtoken:this.state.authtoken,image_id:this.props.imageid}).then((data)=>{
    var responsejson=data;
    console.log(responsejson);
    if(responsejson.data.status===1){
        this.props.functinonpost();
    this.setState({errors:responsejson.data.message});
    setTimeout(()=>this.setState({errors:false}),2000)
   
    }
    

})
}},
],
{cancelable: false},
);
}


downloadImage = () => {
    var date = new Date();
    var image_URL = this.props.imageUrl;
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
        let shareOptions = {
            title: "GuyHub Post",
            message: "GuyHub Post",
            url: this.props.shareurl,
            subject: "Share Link" //  for email
          };
     return(
        <TouchableOpacity style={{width:this.props.width-30,borderRadius:4,marginBottom:10, height:null,padding:5, backgroundColor:'white'}} onPress={()=> Actions.singlepost({id:this.props.id})}>
            <View style={{backgroundColor:'#fff'}}>
            <View>
            {/* <Image source={require('./../../src/images/profile_usr_pholder.png')} style={{width:28,height:28,borderRadius:30}} /> */}
                <Text style={{fontSize:16,textAlign:'left',color:'#333',textTransform:'capitalize'}}>{this.props.title}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#ccc',fontSize:13,textAlign:'left',}}> <FontAwesome
                    name='calendar-o'
                    type='font-awesome'
                    color='#ccc'></FontAwesome>&nbsp;{this.props.postedDate}</Text>
                    
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=> this.repost()}>
            <MaterialCommunityIcons
                    raised
                    name='repeat'
                    type='MaterialCommunityIcons'
                    color='#ccc'
                     size={20}/>

            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:10}} onPress={()=> this.deletepost()}>
            <MaterialCommunityIcons
                    raised
                    name='delete'
                    type='MaterialCommunityIcons'
                    color='#ccc'
                     size={20}/>

            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:10}} onPress={()=>Platform.OS=='ios'?Linking.openURL(this.props.imageUrl):this.downloadImage()} >
            <FontAwesome5
                    raised
                    name='file-download'
                    type='font-awesome5'
                    color='#ccc'
                     size={20}/>

            </TouchableOpacity>
            </View>

            </View>
            <Text style={{marginBottom:10}}>{this.props.post_type} Post </Text>

            </View>
            { 
                                (this.state.errors)?
                                <Text style={styles.errors}>{this.state.errors}</Text>
                                :null
                               }
            <View style={{width:this.props.width-40,height:150,marginTop:5}}>
                <Image source={{uri: this.state.imageUrl}}resizeMode="cover" style={{flex:1,width:null, height:null}}/>
            </View>
            {/* <View>
                <Text style={{color:'#ccc',marginTop:5,marginBottom:5}} numberOfLines={2} lineBreakMode='clip'>{this.props.description}</Text>
            </View> */}

                <View style={{paddingHorizontal:10,height:50,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View>
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
                    </View>
                    <View>
                        {/* <TouchableOpacity onPress={()=>this.onShare(this.props.title, this.props.description)}>
                        <Icon
                        name='ios-share-alt'
                        type='ionicon'
                        color='#ccc'
                        size={20} />
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={()=> Share.open(shareOptions)}>
                        <Icon
                        name='ios-share-alt'
                        type='ionicon'
                        color='#ccc'
                        size={20} />
                        </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
     )
      }
}
 
const styles = StyleSheet.create({
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