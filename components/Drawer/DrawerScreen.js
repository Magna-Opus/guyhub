import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View,TouchableOpacity,Image,Alert,StyleSheet, SafeAreaView,Platform} from 'react-native';
import { DrawerActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { GetWithoutToken } from './../../services/GetWithoutToken';

import { StackActions } from 'react-navigation'
//import styles from '../../styles/index';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-paper';
const logo_login = require('../../src/images/logo_login2.png')
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';
class DrawerScreen extends Component {
navigateToScreen = (route) => () => {
const navigateAction = NavigationActions.navigate({
routeName: route
});
this.props.navigation.dispatch(navigateAction);
// this.props.navigation.dispatch(DrawerActions.openDrawer());
this.props.navigation.dispatch(DrawerActions.closeDrawer())
}
constructor(props)
{
super(props);
this.state = {
      appurls:''
}
}



logoutuser()
{
      Alert.alert(
      'Alert',
      'Do you really want to logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
            console.log("You are logged out")
            AsyncStorage.clear();
            // AsyncStorage.removeItem('userInfo');
            // AsyncStorage.removeItem('num_correct');
            // AsyncStorage.removeItem('num_empty');
            // AsyncStorage.removeItem('num_wrong');
            // AsyncStorage.removeItem('exam_id');
            
            AsyncStorage.removeItem('login');
            AsyncStorage.removeItem('id');
            AsyncStorage.removeItem('token');
            
           Actions.reset("login");
        }},
      ],
      {cancelable: false},
    );
            

}


componentDidMount()
{
      GetWithoutToken('getlinks').then((appurls)=>{
            console.log(appurls)
            this.setState({appurls:appurls.data})
           
           })
}

render () {
      var url
    if(Platform.OS==='android'){
      url= this.state.appurls.android_link
      }
      else if(Platform.OS==='ios')
      {
       url= this.state.appurls.ios_link
      }

      let shareOptions = {
            title: "GuyHub",
            message: "Link to the GuyHub app",
            url: url,
            subject: "GuyHub App Link" //  for email
          };
return (
<View>
<ScrollView>
<SafeAreaView>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:20,marginLeft:10}}>
<Image source={logo_login} resizeMode="contain" style={{width:60,height:60,marginLeft:10}}/>
<Text style={[styles.textStyle,{fontSize:20}]}>GUYHUB
</Text>
</View>

<View style={{marginTop:20,paddingLeft:10}}>
<Divider/>
<TouchableOpacity
style={styles.touchableStyle}
onPress={this.navigateToScreen('Home')}
activeOpacity={.5}>
<View style={styles.imageStyle}>
<MaterialCommunityIcons
                    name='home-outline'
                    color='#0078d7'
                     size={27}/>

</View>
<Text style={styles.textStyle}>
HOME
</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.myprofile(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<AntDesign
                    name='profile'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
MY PROFILE
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.tweet(),this.props.navigation.dispatch(DrawerActions.closeDrawer())
}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<AntDesign
                    name='edit'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
MY TWEETS
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.post(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<Entypo
                    name='new-message'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
MY POSTS
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.mytransactions(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<FontAwesome5
                    name='money-check-alt'
                    color='#0078d7'
                     size={23}
                     />
</View>
<Text style={styles.textStyle}>
MY TRANSACTIONS
</Text>
</TouchableOpacity>
<Divider/>

<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.editprofile(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<Foundation
                    name='page-edit'
                    color='#0078d7'
                     size={25}
                     />
                     </View>

<Text style={styles.textStyle}>
EDIT PROFILE
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.createjob(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<MaterialIcons
                    name='work'
                    color='#0078d7'
                     size={25}
                     />
                     </View>

<Text style={styles.textStyle}>
POST A JOB
</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.change(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<MaterialCommunityIcons
                    name='lock-reset'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
CHANGE PASSWORD
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.ambassador(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<FontAwesome5
                    name='user-graduate'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
STUDENT AMBASSADOR
</Text>
</TouchableOpacity>
<Divider/>
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.aboutus(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<Octicons
                    name='info'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
ABOUT APP
</Text>
</TouchableOpacity>
{/* <TouchableOpacity
style={styles.touchableStyle}
onPress={this.navigateToScreen('Tweets')}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<AntDesign
                    name='warning'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
ADVERTISING POLICY
</Text>
</TouchableOpacity> */}
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.privacypolicy(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<Ionicons
                    name='md-lock'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
PRIVACY POLICY/ TERMS OF USE
</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.contact(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<AntDesign
                    name='contacts'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
CONTACT US
</Text>
</TouchableOpacity>
{/* <TouchableOpacity
style={styles.touchableStyle}
onPress={Actions.help}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<Entypo
                    name='help'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
HELP
</Text>
</TouchableOpacity> */}
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Actions.help(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<Feather
                    name='settings'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
HOW TO USE
</Text>
</TouchableOpacity>


<Divider/>
<TouchableOpacity
style={styles.touchableStyle}
onPress={()=>{Share.open(shareOptions),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<Entypo
                    name='share'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
SHARE
</Text>
</TouchableOpacity>
<TouchableOpacity
style={[styles.touchableStyle,{marginBottom:20}]}
onPress={()=>{this.logoutuser(),this.props.navigation.dispatch(DrawerActions.closeDrawer())}}
activeOpacity={.5}>
      <View style={styles.imageStyle}>

<FontAwesome
                    name='power-off'
                    color='#0078d7'
                     size={25}
                     />
</View>
<Text style={styles.textStyle}>
LOG OUT
</Text>
</TouchableOpacity>
<Divider/>
</View>
</SafeAreaView>
</ScrollView>
</View>
);
}
}

const styles = StyleSheet.create({
touchableStyle: {
width:'100%',
flexDirection: 'row',
justifyContent: 'flex-start',
alignItems: 'center',
padding: 10,

},
imageStyle:{
alignItems:'center',
width: '15%',

},
textStyle:{
width:'70%',
color: '#0078d7',
fontWeight: '500',
marginLeft: 10,
fontSize:14
}
});

DrawerScreen.propTypes = {
navigation: PropTypes.object
};

export default DrawerScreen;
