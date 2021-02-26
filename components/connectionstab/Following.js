//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import FollowingList from '../connectioncomponent/FollowingList';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
import { GetWithToken } from './../../services/GetWithToken';

import { Actions } from 'react-native-router-flux';
// create a component
class Following extends Component {

    constructor(props){
        super(props);       
        this.state={
            authtoken:'',
            items:[],
            notfound:'',
            follow_id:'',
            status:''
        }
        this.getUserData=this.getUserData.bind(this); 
    }
    followingList=()=>{
        GetWithToken('followers',this.state).then((result)=>{
            if(result.data.status===1)
            this.setState({items:result.data.following})
            else
            this.setState({notfound:'Not Following Anyone'})
           })
    }

    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo},()=>{
            this.followingList();
        });
    }
     componentDidMount(){
         this.getUserData();
     }
    // componentWillUpdate(nextProps,nextState){
    //     if(this.state!==nextState) console.log('hi');
    // }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ items: nextProps.items});  
    //   }
    render() {
        const { items } = this.state;
        return (
            <View>
                <NavigationEvents onDidFocus={ this.getUserData} />
                <ScrollView scrollEventThrottle={16} contentContainerStyle={{paddingBottom:100}}>
                {
                (items)?items.map((item,index)=>{
                    console.log("Get Log",item.profile_image)
                    if(item.userimage=='0' || item.userimage===null)
                             {
                              imageurl='https://osclass.calinbehtuk.ro/oc-content/themes/vrisko/images/no_user.png'

                             }
                             else
                             {
                                imageurl=item.userimage.image.file

                             }
                    return(
                        <FollowingList getfollowinglist={this.getUserData.bind(this)} key={item.ID} imageurl={imageurl} userid={item.ID} name={item.display_name}/>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Following;
