import React, {Component} from 'react';
import {Button, Text, View, ImageBackground, TouchableOpacity,Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { PostWithToken } from './../../services/PostWithToken';
import AsyncStorage from '@react-native-community/async-storage';
class Questions extends Component {
  constructor(props){
    super(props);
    this.getUserData=this.getUserData.bind(this);
    //this.answers=this.answers.bind(this);
    this.radioReset=this.radioReset.bind(this);
  }
  getUserData=async()=>{
      var token=await AsyncStorage.getItem('token');
      this.setState({authtoken:token})
      console.log("my token",token);
      // this.setState({display_name:userDetail.first_name},()=>console.log(this.state.display_name));
      //return userDetail;
  }
  state = {
    //showNextButton: false,
    checkedValue:"None",
    // num_correct:0,
    // num_wrong:0,
    // num_empty:0,
    // option1:null,
    // option2:null,
    // option3:null,
    // option4:null,
    // display_name:'',
    //checked:'unchecked',
    //exam_id:''

  };
  

componentWillMount() {
  
  this.props.onRef(this); 
 
  console.log("Props id Mount",this.props.id)
  this.getUserData();
  
  // console.log(this.props.correct4);
  // if(this.props.correct1===1){
  //   this.setState({option1:1});
  //   this.setState({option2:2});
  //   this.setState({option3:3});
  //   this.setState({option4:4});

  // }
  // else if(this.props.correct2===1){
  //   this.setState({option1:2});
  //   this.setState({option2:1});
  //   this.setState({option3:3});
  //   this.setState({option4:4});
  // }
  // else if(this.props.correct3===1){
  //   this.setState({option1:2});
  //   this.setState({option2:3});
  //   this.setState({option3:1});
  //   this.setState({option4:4});
  // }
  // else if(this.props.correct4===1){
  //   this.setState({option1:2});
  //   this.setState({option2:3});
  //   this.setState({option3:4});
  //   this.setState({option4:1});
  // }


  
}
getanswers=async()=>{
  var num_correct=await AsyncStorage.getItem('num_correct');
  var num_wrong=await AsyncStorage.getItem('num_wrong');
  var num_empty=await AsyncStorage.getItem('num_empty');
  //var exam_id=await AsyncStorage.getItem('exam_id');
  
  num_correct=parseInt(num_correct);
  num_wrong=parseInt(num_wrong);
  num_empty=parseInt(num_empty);
 
  // console.log(num_correct, num_wrong, num_empty);
  //  if(this.state.checkedValue==='correct'){
  //     num_correct=num_correct+1;
  //     console.log(num_correct);
  //     AsyncStorage.setItem('num_correct',num_correct.toString());
  //  }
  //  if(this.state.checkedValue==='wrong1'  || this.state.checkedValue==='wrong2' || this.state.checkedValue==='wrong3')
  //     {num_wrong=num_wrong+1;
  //       AsyncStorage.setItem('num_wrong',num_wrong.toString());
  //       console.log('num_wrong',num_wrong);
  //     }
  //   if(this.state.checkedValue===null){
  //     num_empty=num_empty+1;
  //       AsyncStorage.setItem('num_empty',num_empty.toString());
  //       console.log('num_empty',num_empty);
  //   }
    this.setState({checkedValue:"None"})
    this.props.next();
  
}
static navigationOptions=()=>{
  header:null
}

componentWillUnmount() {
  this.props.onRef(undefined)
}
radioReset=()=>{
  //  console.log("my id",this.state.id)
  //  console.log("my value",this.state.checkedValue);
  console.log("Props id",this.props.id)

       console.log("Required: ",this.props.required)
       console.log("Value is: ",this.state.checkedValue)
       console.log("ID is: ",this.state.id)

      if(this.props.required==='1'&& this.state.checkedValue==="None")
      {
        alert("Please select your preference")
      }
      else{
       
        PostWithToken('answers/'+this.props.id,this.state).then((data)=>{
          console.log("Response",data)
          if(data.status===200){
      this.props.next();
          }
    })
      }
      this.setState({checkedValue:"None"})
  

  //webservice to post answer
  //this.getanswers();
  
}

  render() {
    
    return (
        <View style={{flex  : 1}} quests={this.state.items}>         
          <View style={{flex:1,margin:10}}>
            
          <ImageBackground source={require('./../../src/images/strip_bg.png')} resizeMode="contain" style={{padding:15,textAlign:'center',justifyContent:'center',alignItems:'center',flex:1}}>
              <Text style={{textAlign:'center',paddingHorizontal:5}}>Welcome to GuyHub!</Text>
              <Text style={{textAlign:'center',color:'blue',paddingHorizontal:5}}>you are just close to complete your profile and to find matched connection around you.</Text>
          </ImageBackground>
          </View>
          <View style={{flex:1,paddingHorizontal:15}}>
            
            <Text>{this.props.questions}</Text>
            <RadioButton.Group
                  onValueChange={(checkedValue) => {this.setState({ checkedValue },()=>{
                  // if(c1===0 && this.state.checkedValue==='correct'){
                  //     AsyncStorage.setItem()
                  // }
                  // if(this.state.checkedValue==='correct')
                  console.log(this.state.checkedValue)
                   }
                  );}}
                  value={this.state.checkedValue}
              >
                  <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                  <RadioButton value='Yes' style={{marginRight:3}} color='#0078d7' />          
                  <Text>Yes</Text>
                  </View>
                  <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                  <RadioButton value="No" style={{marginRight:3}} color='#0078d7'/>          
                  <Text>No</Text>
                  </View>
                  {/* <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                  <RadioButton value="wrong2" style={{marginRight:3}} />          
                  <Text>{this.props.answer2}</Text>
                  </View>
                  <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                  <RadioButton value="wrong3" style={{marginRight:3}} />          
                  <Text>{this.props.answer1}</Text>
                  </View> */}
              </RadioButton.Group>
          </View>
        </View>
    );
  }
}

export default Questions