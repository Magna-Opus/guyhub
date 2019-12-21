    //import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GetData } from './../../services/GetData';
import Following from './../connectionstab/Following';

// create a component
class MyFollowing extends Component {
    // constructor(props){
    //     super(props);       
    //     this.state={
    //         authtoken:'',
    //         items:[],
    //         notfound:'',
    //         follow_id:'',
    //         status:''
    //     }
    //     this.getUserData=this.getUserData.bind(this); 
    // }
    // getUserData=async()=>{
    //     var userInfo=await AsyncStorage.getItem('userInfo');
    //     userDetail=JSON.parse(userInfo);
    //     this.setState({authtoken:userDetail.authtoken},()=>{
    //         this.followingList();
    //     });
    // }
    // followingList=()=>{
    //     GetData('followers',this.state).then((result)=>{
    //         if(result.data.status===1)
    //         this.setState({items:result.data.following})
    //         else
    //         this.setState({notfound:'Not Following Anyone'})
    //        })
    // }

    render() {
        return (
            <View style={styles.container}>
                <Following/>
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
export default MyFollowing;
