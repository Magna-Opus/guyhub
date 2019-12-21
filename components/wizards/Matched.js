import React, {Component} from 'react';
import {Text, View, Image,ImageBackground, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PostData } from './../../services/PostData';
import { RegisterData } from './../../services/RegisterData';
import { PostImageData } from './../../services/PostImageData';

import pick from '../../services/ImagePicker'
import AsyncStorage from '@react-native-community/async-storage'; 
import { Actions } from 'react-native-router-flux';
const{width, height}=Dimensions.get('window');
class Matched extends Component {
  constructor(props){
    super(props); 
    this.state={
      num_correct:'',
      num_wrong:'',
      num_empty:'',
      exam_id:'',
      matchedProfile:'',
      authtoken:'',
      data:''
    }
    this.handleChooseImage=this.handleChooseImage.bind(this);
    //this.handleRegisterUser=this.handleRegisterUser.bind(this);
}


_storeData =(userdata) => {
  console.log(userdata);
  var data=JSON.stringify(userdata);
  AsyncStorage.setItem('userInfo',data);
  AsyncStorage.setItem('token',userdata.authtoken);
  console.log("Dtat",data);
  console.log("token :",userdata.authtoken)
  this.setState({finaluser:data})
  this.setState({username:userdata.user_email})
  this.setState({authtoken:userdata.authtoken})
  this.setState({user_id:userdata.user_id})
  //AsyncStorage.setItem('userInfo', JSON.stringify(userdata));
  this.getAnswer();
};

getAnswer=async()=>{
  console.log("Helloguyhub")

    var num_correct=await AsyncStorage.getItem('num_correct');
    var num_wrong=await AsyncStorage.getItem('num_wrong');
    var num_empty=await AsyncStorage.getItem('num_empty');
    var exam_id=await AsyncStorage.getItem('exam_id');
    var token=await AsyncStorage.getItem('token');
    console.log("t: ",token)
    num_correct=parseInt(num_correct);
    num_wrong=parseInt(num_wrong);
    num_empty=parseInt(num_empty);
    exam_id=parseInt(exam_id);
    this.setState({authtoken:token,num_correct:num_correct,num_wrong:num_wrong,num_empty:num_empty,exam_id:exam_id},()=>{
          
    // debugger;
    console.log("State is: ",this.state);
      PostData('answers',this.state).then((data)=>{
        if(data.status===201){
        this.setState({matchedProfile:data.data.match_profile[0].match_profile});
        console.log(this.state.matchedProfile);
        }
    })
  });
}

handleChooseImage=()=>{
  pick((source, data)=>this.setState({photo:source, data:data},()=>{
      var data=new FormData;
      data.append('authtoken',this.state.authtoken);
      data.append('username',this.state.username);
      data.append('user_id',this.state.user_id);
      data.append('profile_image', { uri: this.state.photo.uri, name: 'profile_photo.jpg', type: 'image/jpg' });
      PostImageData('update-profile',data).then((data)=>{
          if(data.status===201){
              this.setState({userid:this.state.user_id},()=>{
                  console.log(this.state.userid);debugger;
                  PostData('user-details',this.state).then((newuserinfo)=>{
                      console.log(newuserinfo);debugger;
                      this.setUserInfo(newuserinfo.data);                    
                  })
              })
             // this.setState({errors:data.message})
              
      }
      // else
      // this.setState({errors:data.message}); 
      
      })  

  }))
  

}
setUserInfo=(data)=>{
  var data=JSON.stringify(data);
  AsyncStorage.setItem('userInfo',data);
  this.props.refreshPrevData();
  this.props.refreshBottomData();
  debugger;
}


componentDidMount(){
  AsyncStorage.setItem('login','true');

}

  render() {
    const {photo}=this.state; 
    return (
        <View style={{flex:1}}>
           
          <View style={{flex:1,flexDirection:'column', justifyContent:'space-between',marginVertical:90,marginVertical:15}}>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={require('./../../src/images/matched.png')} resizeMode='contain' style={{height:180,width:250}}/>
          </View>
          {/* <View style={{flexDirection:'row',justifyContent:'center',height:120,alignItems:'center'}}>
                            {(photo)?(
                                <Image source={{uri:photo.uri}} resizeMode="cover" style={{width:100,height:100,borderRadius:80}}/>
                            ):<Image source={require('./../../src/images/profile_usr_pholder.png')} resizeMode="contain" style={{width:100,height:100,borderRadius:30}}/>
                            }
                            <TouchableOpacity onPress={this.handleChooseImage} style={{width:30,height:30,backgroundColor:'white',marginTop:-50,marginLeft:-20,borderRadius:30,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Icon name="ios-create" type="ionicon" size={20} />
                            </TouchableOpacity>
                    </View> */}
          <View style={{justifyContent:'center',flexDirection:'row'}}>
          <Text style={{color:'blue',fontSize:25,textAlign:'center'}}> Profiles will be matched according to your set Preferences</Text>
          </View>
          <View style={{flexDirection:'row',width:width}}>
         
          </View>
          </View>
          </View>
    );
  }
}

export default Matched