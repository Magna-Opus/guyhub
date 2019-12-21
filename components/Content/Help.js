//import liraries
import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions,ImageBackground,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Button, Card, Title, Paragraph, Divider,Surface } from 'react-native-paper';
import Zocial from 'react-native-vector-icons/Zocial';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import { PostData } from './../../services/PostData';
import pick from './../../services/ImagePicker';
import { Actions } from 'react-native-router-flux';
const{width, height}=Dimensions.get('window');
// create a component
class Contact extends Component {
    constructor(props){
        super(props)
        this.state={
            
            loading:false,
            data:[{ques:'What is the purpose of using Guyhub app?',ans:'Guyhub is best Hybrid Mobile App to connect the Students Worldwide, promote them, help them to find the best matches for long term friendship.'},
            {ques:'How can I use Guyhub to find jobs?',ans:'Guyhub brings opportunity to have decent jobs from the employers worldwide. You can apply to any suitable job free of cost.'},
            {ques:'Is Guyhub free to make connections?',ans:'You are free to grow your network, follow more people. You can also search matches based on your interests.'},
            {ques:'Why do I need to pay fee for unlocking profiles?',ans:'The matching profiles based on your interests are shown to you based on their entered information. If you find someone suitable, you can decide to access complete details of him/her by paying a marginal fee.'},
            {ques:'How does Guyhub find matches?',ans:' Guyhub finds matches based on answers to the questions asked during registration. These answers are matched with the other users’ profiles registered on Guyhub and percentage of matching interests is calculated and shown to you against each profile.'},
            {ques:'What if I don’t answer all questions asked during registration?',ans:'You can skip the optional questions asked by Guyhub, but in such cases Guyhub will not be able to find perfect matches for you because it does not know your complete interests.'},
            {ques:'Does Guyhub show all my entered information to all other users?',ans:'Your basic information is accessible to all users as the app aims at providing more and more connections. Your detailed information and interests are shown to paid users only.'},
            {ques:'What if some user posts objectionable  material on Guyhub',ans:'Guyhub has no tolerance for objectionable content or abusive users.  Guyhub has implemented content filter on text in all posts and tweets and users are blocked from submitting a post if its content does not pass the filter.  Also all users of Guyhub  can flag objectionable content and admin will take action on it in maximum 24 hours if the objection is found to be genuine. You can  also block abusive users and the other users whos posts they do not want to see. Users who do not follow our content guidelines while posting images, tweets or communicating with other users will be immediately blocked by the Guyhub admin and all their past posts and content will also be blocked.'}
          ],
            authtoken:''
        }
        
    }

    render() {
        const {photo}=this.state;
        return ((this.state.loading)?
             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Loading...</Text>
            </View>
            :
            <SafeAreaView style={styles.container}>
                <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30} /></TouchableOpacity>
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>HOW TO USE</Text>
                    </View> 
                    
                 </View>
                 <View style={{padding:10}}>
                 
  <Surface style={{width:'100%',marginTop:10,elevation:1,marginBottom:50}}>
  <FlatList
        data={this.state.data}
        renderItem={({ item,index }) => <View style={{width:'100%',paddingHorizontal:15,paddingVertical:10}}><Text style={[styles.textInfo,{width:'95%',color:'#0078d7',textAlign:'left'}]}>{index+1}. {item.ques}</Text><View style={{flexDirection:'row'}}><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}></Text><Text style={[styles.textInfo,{width:'95%',color:'#808080',textAlign:'left',marginTop:8,marginBottom:10}]}>{item.ans}</Text></View><Divider/></View>
        }
        keyExtractor={item => item.id}
      />
  </Surface>   
 
  </View>
            </SafeAreaView>
          );

    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    
    header:{
        flex:1,
        backgroundColor: "#0078d7",
    },
      headerContent:{
       paddingTop:20,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#0078d7",
        marginBottom:10,
        marginTop:10
      },
      name:{
        fontSize:22,
        marginTop:20,
        color:"#0078d7",
        fontWeight:'bold',
        marginBottom:20
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:0,
      },
      body: {
       
        width:'100%',
        padding:30,
        alignItems: 'center',
        
      },
      textInfo:{
        fontSize:20,
       
        color: "#000",
        textAlign:'center'
      }
});

//make this component available to the app
export default Contact;
