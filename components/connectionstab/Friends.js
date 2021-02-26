//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FriendsList from './../connectioncomponent/FriendsList';
import AsyncStorage from '@react-native-community/async-storage';
import { PostData } from './../../services/PostData';
import {NavigationEvents} from 'react-navigation';
// create a component
class Friends extends Component {
    constructor(props){
        super(props);       
        this.state={
            authtoken:'',
            items:[],
            notfound:'',
        }
        this.getUserData=this.getUserData.bind(this); 
    }

    friendsList=()=>{
        PostData('friends',this.state).then((result)=>{
            if(result.data.status===1)
            this.setState({items:result.data.friends})
            else
            this.setState({notfound:'No Friends Found'})
           })
    }

    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('userInfo');
        userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userDetail.authtoken},()=>{
            this.friendsList();
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
                <ScrollView scrollEventThrottle={16} contentContainerStyle={{paddingBottom:100}}>
                {
                (items)?items.map((item,index)=>{
                    var imageurl='';
                           
                            if(item.userimage=='0' || item.userimage===null)
                            {
                            imageurl='https://osclass.calinbehtuk.ro/oc-content/themes/vrisko/images/no_user.png'

                           }
                           else
                           {
                            imageurl=item.userimage.image.file

                           }
                    return(
                        <FriendsList 
                        key={item.ID} 
                        getfollowinglist={this.getUserData.bind(this)}
                        name={item.display_name}/>                    )
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
export default Friends;
