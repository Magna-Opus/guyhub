import React, {Component} from 'react';
import {View, Image, Button, SafeAreaView, Text, TouchableOpacity, ViewPropTypes,Alert,BackHandler} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/Ionicons';
// Wizard
import Wizard from "react-native-wizard";
import Questions from "./wizards/Questions";
import Blank from "./wizards/Blank";
import TestNav from "./TestNav";
import Matched from "./wizards/Matched"; 
import Loader from './loader/loader';

import { PostWithoutToken } from './../services/PostWithoutToken';

import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props){
    super(props);    
    this.handleRegisterUsers=this.handleRegisterUsers.bind(this);
    this.reset=this.reset.bind(this);
  }

  state = {
    
    isLastStep  : false,
    isFirstStep : false,
    currentIndex: 0,
    totalQuetion:'',
    items:[],
    token:'',
    
  
  };
  static navigationOptions =
  {
     header:null
  };

  //register function
  handleRegisterUsers=()=>{
    this.setState({loading:true})
     this.child.handleRegisterUser();   
   
     PostWithoutToken('questions').then((questions)=>{
        this.setState({items:questions.data.questions})
        //console.log(questions.data.questions[0].exam_id);
        //AsyncStorage.setItem('exam_id',questions.data.questions[0].exam_id.toString());
       })
       this.setState({loading:false})

}

goToDashboard=()=>{
  Actions.dashboard();
}
reset=()=>{
  this.quest.radioReset();
}



async componentDidMount() {
  this.handleRegisterUsers()
  var token=await AsyncStorage.getItem('token');
  this.setState({token:token})
  console.log("token",await AsyncStorage.getItem('token'))
    
  BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
}

onBackPress = () => {
  return true; 
}

wantToSkip()
{
  Alert.alert(
    'Do You really want to skip?',
    'All questions will reset to default values.',
    [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => Actions.reset("login")
    },
    ],
    {cancelable: false},
  );

}
  render() {
    // const { navigate } = this.props.navigation;   
        var steps = [
      {
        component: Blank,
        props:{
          onRef:ref => (this.child = ref),
          next:()=>this.wizard.next()
        }
      },


    ];
      for(var i=0;i<=this.state.items.length;i++){
        
        if(i<this.state.items.length) {
          
          // steps.push({component: Questions,props: {questions:this.state.items[i].question,correct1:this.state.items[i].answers[0].correct,correct2:this.state.items[i].answers[1].correct,correct3:this.state.items[i].answers[2].correct,correct4:this.state.items[i].answers[3].correct,answer1:this.state.items[i].answers[0].answer,answer2:this.state.items[i].answers[1].answer,answer3:this.state.items[i].answers[2].answer,answer4:this.state.items[i].answers[3].answer,onRef:ref => (this.quest = ref),
          //   next:()=>this.wizard.next()}});
          steps.push({component: Questions,props: {questions:this.state.items[i].question,id:this.state.items[i].ID,required:this.state.items[i].is_required,onRef:ref => (this.quest = ref),
              next:()=>this.wizard.next()}});
        }
        if(this.state.items.length!==0 && i===this.state.items.length) { 
        
          steps.push({component: Matched,props: {}});
        }
      }
      

    console.log("Steps are:",steps);
    if(this.state.loading)
    {
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Loader loaderclose={this.state.loading} />
            </View>
        )
    }
    return (
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex:1}}>
          
          <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    {/* {<TouchableOpacity onPress={()=>this.wantToSkip()}><View><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30}/>
                     </View> 
                     </TouchableOpacity> } */}
                        <Text style={{width:'100%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>YOUR PREFERENCES</Text>
                    </View>
                    </View>
            <View style={{flex:1}}>
                <Wizard
            
              ref={(e) => this.wizard = e}
              currentStep={(currentIndex, isFirstStep, isLastStep) => {
                this.setState({
                  isLastStep  : isLastStep,
                  isFirstStep : isFirstStep,
                  currentIndex: currentIndex
                })
              }}
              steps={steps}/>
              </View>
              <View style={{height:60,backgroundColor:'white',paddingHorizontal:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                   <View >
                        {this.state.isFirstStep || this.state.currentIndex===1 ? <TouchableOpacity underlayColor='blue'>
                        <Image  source={require('../src/images/back_arrow_deactive.png')} resizeMode="contain" style={{width:30}}/> 
                        </TouchableOpacity> : <TouchableOpacity underlayColor='blue'>
                        <Image  source={require('../src/images/back_arrow_deactive.png')} resizeMode="contain" style={{width:30}}/> 
                        </TouchableOpacity> }
                        </View>                       
                      <Text style={{textAlign:'center',width:70}}>{this.state.currentIndex+1}/{this.state.items.length+2}</Text>
                      <View 
                        title={"Back"}>  
                          {
                            this.state.isLastStep?
                            <TouchableOpacity underlayColor='blue' onPress={this.goToDashboard}>
                                <Image source={require('../src/images/next_ico.png')} resizeMode="contain" style={{width:30}}/> 
                            </TouchableOpacity>
                            :
                            <TouchableOpacity underlayColor='blue' onPress={(this.state.isFirstStep)?this.handleRegisterUsers:() => {this.reset();}}>
                                <Image source={require('../src/images/next_ico.png')} resizeMode="contain" style={{width:30}}/> 
                            </TouchableOpacity>
                            
                          }                
                            
                        </View>
                 </View>       
          </View>

          
        </SafeAreaView>
    )
  }
};