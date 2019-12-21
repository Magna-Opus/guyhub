//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FollowersList from './../connectioncomponent/FollowersList';
import AsyncStorage from '@react-native-community/async-storage';
import { GetWithToken } from './../../services/GetWithToken';
import {NavigationEvents} from 'react-navigation';
// create a component
class Followers extends Component {
    constructor(props){
        super(props);       
        this.state={
            authtoken:'',
            items:[],
            notfound:'',
        }
        this.getUserData=this.getUserData.bind(this); 
    }

    followersList=()=>{
        GetWithToken('followers',this.state).then((result)=>{
            console.log(result)
            if(result.data.status===1)
            {
                
                    this.setState({items:result.data.followers})
            }
            else
            this.setState({notfound:'Not Any Follower'})
           })
    }

    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
       // userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo},()=>{
            this.followersList();
        });
    }
    componentDidMount(){
        this.getUserData();       
    }
   
    // componentDidUpdate(prevState){
    //     if (prevState.items !== this.state.items) {
    //         console.log('bh')
    //     }
    // }
    render() {
        const { items } = this.state;
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={ this.getUserData} />
                <ScrollView scrollEventThrottle={16} >
                {
                (items)?items.map((item,index)=>{
                    if(item.userimage=='0' || item.userimage===null)
                             {
                              imageurl='https://osclass.calinbehtuk.ro/oc-content/themes/vrisko/images/no_user.png'

                             }
                             else
                             {
                                imageurl=item.userimage.image.file

                             }
                    return(
                        <FollowersList getfollowerslist={this.getUserData.bind(this)} key={item.ID} imageurl={imageurl} userid={item.ID} name={item.display_name}/>
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
export default Followers;
