//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Modal, Keyboard,SafeAreaView,TouchableOpacity ,Image,Platform,Dimensions} from 'react-native';
import { GiftedChat ,Bubble} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { GetWithToken } from './../../services/GetWithToken';
import { PostImageData } from './../../services/PostImageData';
import { PostVideoData } from './../../services/PostVideoData';
import Loader from './../../components/loader/loader';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import Fire from './../../services/Firebase';
const{width, height}=Dimensions.get('window');
// create a component
class NewChat extends Component {
    constructor(props){
        super(props);
        this.state={
            messages: [],
            loading:false,
            modalVisible:false,
            rate: 1,
          
            
        }
    }
    // static navigationOptions = ({ navigation }) => ({
    //     title: (navigation.state.params || {}).name || 'Chat!',
    //   });
    // 1.

    

    async componentDidMount() {


      
      var id=await AsyncStorage.getItem('id');
        Fire.shared.on(message =>{
          console.log("My Messages: ",message)
          if(message.user.sender==JSON.stringify(this.props.id)&&message.user.receiver==id&&message.seen==0)
          {
            console.log("iiiiii",message._id)
            firebase.database().ref('messages').child(message._id).update({'seen': 1})
           
          }
          console.log("getcheck",id,JSON.stringify(this.props.id))
          if((message.user.sender==id&&message.user.receiver==JSON.stringify(this.props.id)) ||
          (message.user.receiver==id&&message.user.sender==JSON.stringify(this.props.id)))
          {
            
            console.log(message,"Message...",message.user.sender,"Sender",message.user.receiver,"Receiver")
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
            
        }))
      }

      
     
      }
        );
      
    }
    // 2.
    componentWillUnmount() {
    Fire.shared.off();
    }
    async componentWillMount() {
        this.setState({
          messages: [
            
          ],
        })
        var id=await AsyncStorage.getItem('id');
        var userInfo=await AsyncStorage.getItem('token');
        this.setState({authtoken:userInfo})
        this.setState({sender:id})
        this.setState({receiver:JSON.stringify(this.props.id)})
        console.log("id id",this.state.sender+","+this.state.receiver)
        GetWithToken('userdetails', {authtoken:this.state.authtoken}).then((currentuser)=>{
          console.log("CurrentUsers: ",currentuser)
          this.setState({name:currentuser.data.display_name});
          console.log("name is",this.state.name)

          //var userdata=JSON.stringify(currentuser.data);
          //AsyncStorage.setItem('userInfo',userdata);
          // this.setState({loading:false})
      });
      }
    get user() {
        // Return our name and our UID for GiftedChat to parse
        // Keyboard.dismiss();
        return {
          name: this.state.name,
          _id: this.state.sender,
          sender:this.state.sender,
          receiver:this.state.receiver
        };
        
      }


      handleVideo = () => {
        const { user } = this.user; // wherever you user data is stored;
        const options = {
          title: "Select a Video",
          mediaType: "video",
          videoQuality:'low'
         
        };
        
        ImagePicker.launchImageLibrary(options, response => {
          console.log("Responselllll = ", response);
          if (response.didCancel) {
            // do nothing
          } else if (response.error) {
            // alert error
          } else {
            const { uri } = response;
            const extensionIndex = uri.lastIndexOf(".");
            const extension = uri.slice(extensionIndex + 1);
            const allowedExtensions = ["mp4", "3gp", "flv", "mpg", "mov", "wmv"];
            RNFetchBlob.fs.stat(response.uri)
            .then((stats) => { 
              console.log(stats.size)
            if(stats.size<=2097152)
            {
            let formData = new FormData();
formData.append("profile_image", {
    name: Math.round(Math.random() * 100000000) +'profile_photo.mp4',
    uri: response.uri,
    type: 'video/mp4'
});           console.log("get video",response.uri)
              PostVideoData('saveuserchatdata',formData,this.state.authtoken).then((datas)=>{
                 console.log("console.logkkkk",datas)
                  if(datas.data.status==1){
                      console.log("Video data",datas.data.data)
                        this.setState({messages: [
                          {
                            text:'',
                            image:'',
                            _id:this.state.sender,
                            user:{
                              name: this.state.name,
                              _id: this.state.sender,
                              sender:this.state.sender,
                              receiver:this.state.receiver
                            }, 
                            video: datas.data.data,
                
                          }
                        ]}
                        )
                        Fire.shared.send(this.state.messages);
                        this.setState({messages:[]})
                        Fire.shared.on(message =>{
                          console.log("My Messages1: ",message)
                          if((message.user.sender==this.state.sender&&message.user.receiver==this.state.receiver) ||
          (message.user.receiver==this.state.sender&&message.user.sender==this.state.receiver))
          {
            console.log(message,"Message1...",message.user.sender,"Sender1",message.user.receiver,"Receiver1")
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }))
      }
                         
                          
                          console.log(this.state.userid);debugger;
               
                        })
                      
              }
               else
               {
                   console.log("Else",data);
               alert(datas.data.message); 
               }
              })  
          
          
          }
           else
        {
          alert("Video size exceeded maximum limits")
        }
      })
         }
      });
      }

      handleAddPicture = () => {
        const { user } = this.user; // wherever you user data is stored;
        const options = {
          title: "Select a Picture",
          mediaType: "photo",
          takePhotoButtonTitle: "Take a Photo",
          maxWidth: 256,
          maxHeight: 256,
          allowsEditing: true,
          noData:true
        };
        
        ImagePicker.showImagePicker(options, response => {
          console.log("Response = ", response);
          if (response.didCancel) {
            // do nothing
          } else if (response.error) {
            // alert error
          } else {
            const { uri } = response;
            const extensionIndex = uri.lastIndexOf(".");
            const extension = uri.slice(extensionIndex + 1);
            const allowedExtensions = ["jpg", "jpeg", "png"];
            if(response.fileSize<=1048576)
            {
            
              var data=new FormData;
           
              data.append('profile_image',{ uri: response.uri, name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' });
              PostImageData('saveuserchatdata',data,this.state.authtoken).then((datas)=>{
                 
                  if(datas.data.status==1){
                      
                        this.setState({messages: [
                          {
                            text:'',
                            _id:this.state.sender,
                            video:'',
                            user:{
                              name: this.state.name,
                              _id: this.state.sender,
                              sender:this.state.sender,
                              receiver:this.state.receiver
                            }, 
                            image: datas.data.data,
                
                          }
                        ]}
                        )
                        Fire.shared.send(this.state.messages);
                        this.setState({messages:[]})
                        Fire.shared.on(message =>{
                          console.log("My Messages1: ",message)
                          if((message.user.sender==this.state.sender&&message.user.receiver==this.state.receiver) ||
          (message.user.receiver==this.state.sender&&message.user.sender==this.state.receiver))
          {
            console.log(message,"Message1...",message.user.sender,"Sender1",message.user.receiver,"Receiver1")
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }))
      }
                  
                         
     } );
                          console.log(this.state.userid);debugger;
               
                      
                      
              }
               else
               {
                   console.log("Else",data);
               alert(datas.data.message); 
               }
              })  
      
     
            
          
           if (!allowedExtensions.includes(extension)) {
             return alert("That file type is not allowed.");
           }
         }
         else
        {
          alert("Image size exceeded maximum limits")
        }
        }
        
      });
      };
      renderBubble = props => {
        
        console.log("kkkkkk",props.currentMessage,"pppp",props.position,"rrrr",props.currentMessage.video)

        if (props.currentMessage.video!=="") {
          
            return (
              
                <View style={{ width: 150, height: 70, backgroundColor: props.position=='left'?'white':'#0078d7',alignItems:'center',justifyContent:'center' }}>
                    {console.log("sjksjakj")}
                    <AntDesign
                        name="playcircleo"
                        size={30}
                        color={"#a9a9a9"}
                        onPress={() => {
                          
                          Actions.playvideo({hideNavBar: true,videourl:props.currentMessage.video})
                          console.log("ispressed")
                        
                         }}
                    />

          
                    {/* <Progress.Circle progress={this.state.progress} showsText size={35} /> */}

                </View>
            );
        } 
        else {
            return (
                <Bubble
                    {...props}
                    textStyle={{
                        right: {
                            color: '#fff',
                        },
                        left: {
                            color: '#000',
                        },
                    }}
                    wrapperStyle={{
                        left: {
                            backgroundColor: "white",
                           
                        },
                        right: {
                            backgroundColor: '#0078d7'
                        }
                    }}
                />
            );
        }
    }


      renderchat = ()=> {
        return (
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Loader/>
          </View>
        )
          }
    render() {
      
      if(this.state.loading)
        {
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Loader loaderclose={this.state.loading} />
                </View>
            )
        }
      
        return (
          <SafeAreaView style={{flex:1}}>
            <View style={{width:'100%',paddingHorizontal:15,height:50,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{width:'80%',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}><Ionicons
                    name='md-arrow-back'
                    type='Ionicons'
                    color='#000'
                     size={30} /></TouchableOpacity>
                  <Image source={{uri: this.props.image}} style={{width:44,height:44,borderRadius:22,marginLeft:10}} />

        <Text style={{fontWeight:'600',fontSize:14,marginLeft:15,color:'black'}}>{this.props.navigation.state.params.name}</Text>
        
                    </View> 
                    <View style={{width:'20%',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                  
                 
                
                  <Ionicons
                    name="md-image"
                    size={35}
                    hitSlop={{ top: 20, bottom: 20, left: 80, right: 50 }}
                    color="black"
                    onPress={this.handleAddPicture}
                  />
                
                  <Ionicons
                    name="ios-videocam"
                    size={40}
                    color="black"
                    hitSlop={{ top: 20, bottom: 20, left: 80, right: 50 }}
                    onPress={this.handleVideo}
                  />
                  </View>
                    </View>
                
            <GiftedChat
            alwaysShowSend
            messages={this.state.messages}
            onSend={Fire.shared.send}
            renderLoading={this.renderchat}
            isLoadingEarlier
            renderBubble={this.renderBubble}
            user={this.user}
            // renderActions={() => {
              
            //     return (
            //       <View style={{
            //         bottom: 50,
            //         right: Dimensions.get("window").width / 2,
            //         position: "absolute", 
            //         shadowColor: "#000",
            //         shadowOffset: { width: 0, height: 0 },
            //         shadowOpacity: 0.5,
            //         zIndex: 2,
                  
            //         backgroundColor: "transparent"
            //       }}>
                    
            //       </View>
            //      );
            //   }
           // }
          />
          
          </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    containers: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      
    },
    controlOption: {
      alignSelf: 'center',
      fontSize: 11,
      color: 'white',
      paddingLeft: 2,
      paddingRight: 2,
      lineHeight: 12,
    },
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    controls: {
      backgroundColor: 'transparent',
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
    },
    progress: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 3,
      overflow: 'hidden',
    },
    // backgroundVideo: {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   right: 0,
    // },
});

//make this component available to the app
export default NewChat;
