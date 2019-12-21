//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PrivateTweetsList from './../tweetscomponents/PrivateTweetsList';
import {PostWithToken } from './../../services/PostWithToken';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
import Loader from './../../components/loader/loader';

// create a component
class PrivateTweets extends Component {


    constructor(props){
        super(props);
        this.state={
            users:[],
            userid:'',
            notfound:'',
            loading:true
        }
        this.getPrivateTweets=this.getPrivateTweets.bind(this);
    }

    getPrivateTweets=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
       // userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo,post_type:'private'},()=>{
          console.log(this.state.authtoken);
          PostWithToken('gettweet/all', this.state).then((result)=>{   
              
            if(result.status===200){
                this.setState({users:result.data})
                
            }
            else{
                this.setState({notfound:'No User Found!'})
            }
            this.setState({loading:false})
        })
    
        });
    }

    componentDidMount(){
        this.getPrivateTweets();
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
            <View style={styles.container}>
                <NavigationEvents onDidFocus={ this.getPrivateTweets} />
                <ScrollView scrollEventThrottle={16} >
                    {
                this.state.users?this.state.users.map((user,index)=>{
                            var imageurl='';
                           {console.log("Users 1: ",user.user)}
                              if(user.user.userimage=='0' || user.user.userimage===null)
                             {
                              imageurl='https://osclass.calinbehtuk.ro/oc-content/themes/vrisko/images/no_user.png'

                             }
                             else
                             {
                                imageurl=user.user.userimage.image.file

                             }
                            // (user.profile_image.image.file)?imgurl=user.profile_image.image.file:imgurl='./../../src/images/profile_usr_pholder.png';
                            // }
                            // else{
                            //     imgurl='./../../src/images/profile_usr_pholder.png';
                            // }
                            return(
                                
                                        <PrivateTweetsList matcheduser={this.getPrivateTweets.bind(this)} key={user.ID} id={user.ID} userid={user.userid} name={user.user.display_name} imageurl={imageurl} date={user.tweet_date} time={user.tweet_time} tweet={user.content} dislikes={(user.unlikes[0])?user.unlikes[0].unlikes:0} like={(user.likes[0])?user.likes[0].likes:0} shareurl={user.tweet_url}/>
                            )
                        }):<View style={{flex:1,flexDirection:'column', alignItems:'center',paddingTop:80,justifyContent:'center',height:'100%'}}><Text>{this.state.notfound}</Text></View>
                    }
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

//make this component available to the app
export default PrivateTweets;
