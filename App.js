/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {YellowBox} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Ques from './components/Register';
import  Register from './components/wizards/UserInfo';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';

//import dashboard from './components/Dashboard';
import UserProfile from './components/profile/UserProfile';
import Questions from './components/wizards/Questions';
import JobDetail from './components/jobscoponents/JobDetail';
import Jobs from './components/dashboardtab/Jobs';
import NotiFollow from './components/dashboardtab/NotiFollow';
import SinglePost from './components/dashboardcomponents/SinglePost';

import SplashScreen from './components/Splashscreen';
import MyProfile from './components/profile/MyProfile';
import MyTransactions from './components/profile/MyTransactions';
import PlayVideo from './components/chat/PlayVideo';

import NewChat from './components/chat/NewChat';
import MatchUserProfile from './components/connectioncomponent/MatchUserProfile';
import UserLinks from './components/connectioncomponent/UserLinks';
import Home from './components/dashboardtab/Home'
import Tweets from './components/dashboardtab/Tweets'
import CreateJob from './components/jobscoponents/creatJob'
import Ambassador from './components/Student/Ambassador'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import EditProfile from './components/profile/EditProfile';
import Contact from './components/Content/Contact';
import HowToUse from './components/Content/HowToUse';
import Help from './components/Content/Help';
import AboutUs from './components/Content/aboutUs';
import Post from './components/myPosts/posts';
import Tweet from './components/myTweets/tweet';
import PrivacyPolicy from './components/Content/privacyPolicy';
import Dashboard from './components/Dashboard';
export default class App extends Component {  
    
    componentDidMount=()=>{
    YellowBox.ignoreWarnings(['Warning: ...']);
    YellowBox.ignoreWarnings(['Attempted to invoke']);
    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ])
    console.reportErrorsAsExceptions = false;
    }


    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="splashscreen"
                        title="splashscreen"
                        component={SplashScreen} 
                        initial 
                    />
                    <Scene
                        key="newchat"
                        title="newchat"
                        component={NewChat}  
                        hideNavBar={true} 
                    
                    />
                    <Scene
                        key="playvideo"
                        title="playvideo"
                        component={PlayVideo}  
                        hideNavBar={true} 
                    
                    />
                    <Scene 
                        key="login"
                        title="login"
                        component={Login}  
                    />
                    <Scene 
                        key="post"
                        title="post"
                        component={Post} 
                        hideNavBar={true} 
                    />
                    <Scene 
                        key="singlepost"
                        title="singlepost"
                        component={SinglePost} 
                        hideNavBar={true} 
                    />
                    <Scene 
                        key="tweet"
                        title="tweet"
                        component={Tweet}  
                        hideNavBar={true} 

                    />
                    <Scene
                        key="dashboard"
                        title="dashboard"
                        component={Dashboard}  
                    /> 
                     <Scene
                        key="jobdetail"
                        title="jobdetail"
                        component={JobDetail}  
                        hideNavBar={true} 

                    />
                    <Scene
                        key="createjob"
                        title="createjob"
                        hideNavBar={true}
                        component={CreateJob}  
                    />
                    <Scene
                        key="ambassador"
                        title="ambassador"
                        hideNavBar={true}
                        component={Ambassador}  
                    />
                    <Scene
                        key="contact"
                        title="contact"
                        hideNavBar={true}
                        component={Contact}  
                    />
                    <Scene
                        key="help"
                        title="help"
                        hideNavBar={true}
                        component={Help}  
                    />
                    <Scene
                        key="privacypolicy"
                        title="privacypolicy"
                        hideNavBar={true}
                        component={PrivacyPolicy}  
                    />
                    <Scene
                        key="aboutus"
                        title="aboutus"
                        hideNavBar={true}
                        component={AboutUs}  
                    />
                    <Scene
                        key="forgot"
                        title="forgot"
                        hideNavBar={true}
                        component={ForgotPassword}  
                    />

                    <Scene
                        key="change"
                        title="change"
                        hideNavBar={true}
                        component={ChangePassword}  
                    />
                    <Scene
                        key="howtouse"
                        title="howtouse"
                        hideNavBar={true}
                        component={HowToUse}  
                    />
                    <Scene
                        key="jobs"
                        title="jobs"
                        component={Jobs}  
                        hideNavBar={true} 

                    />
                    <Scene
                        key="ques"
                        title="ques"
                        component={Ques}  
                    />
                    <Scene
                        key="register"
                        title="register"
                        component={Register} 
                        hideNavBar={true} 
                    />
                    <Scene
                        key="ques"
                        title="ques"
                        component={Ques} 
                        
                    />
                    <Scene 
                        key="tweets"
                        title="tweets"
                        hideNavBar={true}
                        component={Tweets}  
                    />
                    <Scene
                        key="myprofile"
                        title="myprofile"
                        hideNavBar={true}
                        component={MyProfile}  
                    />
                    <Scene
                        key="mytransactions"
                        title="mytransactions"
                        hideNavBar={true}
                        component={MyTransactions}  
                    />
                    <Scene
                        key="editprofile"
                        title="editprofile"
                        hideNavBar={true}
                        component={EditProfile}  
                    />
                    <Scene
                        key="matchuserprofile"
                        title="matchuserprofile"
                        hideNavBar={true}
                        component={MatchUserProfile} 
                        />
                    <Scene
                        key="userlinks"
                        title="userlinks"
                        hideNavBar={true}
                        component={UserLinks}
                     
                    />
                    <Scene
                        key="notifollow"
                        title="notifollow"
                        hideNavBar={true}
                        component={NotiFollow}
                     
                    />
                </Scene>
            </Router>
        );
        
    }
}
const AppStackNavigator=createStackNavigator({
    SplashScreen:SplashScreen,   
   Login:Login,
   Register:Register,
   Tweets:Tweets,
   UserProfile:UserProfile,
    MyProfile:MyProfile,
    
   
},{
defaultNavigationOptions:{
  headerStyle:{
    backgroundColor:'red'
  }
}
}
);


const AppContainer= createAppContainer(AppStackNavigator);
