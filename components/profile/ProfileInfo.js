//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { GetWithToken } from './../../services/GetWithToken';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
// create a component
class ProfileInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            profileDetails:[],
            authtoken:'',
            token:'',
            //userid:'',
            loading:true,
        }
        this.getUserData=this.getUserData.bind(this);
    }
    getUserData=async()=>{
     var userInfo=await AsyncStorage.getItem('token');
     var id=await AsyncStorage.getItem('id');

    // userDetail=JSON.parse(userInfo);
    // if(userDetail.user_id)this.setState({userid:userDetail.user_id});
    // else 
    this.setState({userid:id});
    this.setState({id:id});
        this.setState({token:userInfo})
    this.setState({authtoken:userInfo},()=>{
        //console.log(this.state.userid);
        GetWithToken('userdetails', this.state).then((currentuser)=>{
            console.log("CurrentUser: ",currentuser)
            this.setState({profileDetails:currentuser.data});
            //var userdata=JSON.stringify(currentuser.data);
            //AsyncStorage.setItem('userInfo',userdata);
            this.setState({loading:false})
        });
    }) 
 }

 componentWillMount(){
     this.getUserData();
 }

 componentWillReceiveProps()
{
    this.getUserData();
}
    render() {
       // console.log(this.props.userInfos)
        return (
            (this.state.loading)?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Loading...</Text>
            </View>
            :
            <View style={styles.container}>
                <NavigationEvents onDidFocus={ this.getUserData} />
                <ScrollView scrollEventThrottle={16}>
                    {this.state.profileDetails.resume=='no'?
                    <Text style={{color:'red',width:'100%',textAlign:'center'}}>{this.state.profileDetails.resumeline}</Text>:null}
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>Name</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                        {(this.state.profileDetails.first_name)?this.state.profileDetails.first_name +' '+ this.state.profileDetails.last_name:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>Email ID</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                        {(this.state.profileDetails.user_email)?this.state.profileDetails.user_email :'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>Mobile Number</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.mobile)?this.state.profileDetails.mobile:'NA'}

                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>DOB</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.stringdob)?this.state.profileDetails.stringdob:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>Gender</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                        {(this.state.profileDetails.gender==='others'||this.state.profileDetails.gender==='Others')?'Not Specified':this.state.profileDetails.gender}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>Country</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.country)?this.state.profileDetails.country:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>State</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.state)?this.state.profileDetails.state:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>City</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.city)?this.state.profileDetails.city:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>Institution</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.college)?this.state.profileDetails.college:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>College Country</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.collegecountry)?this.state.profileDetails.collegecountry:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>College State</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.collegestate)?this.state.profileDetails.collegestate:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>College City</Text>
                    <Text style={{fontSize:15,color:'#333'}}>
                    {(this.state.profileDetails.collegecity)?this.state.profileDetails.collegecity:'NA'}
                    </Text>
                </View>
                <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:10,marginBottom:5}}>
                    <Text style={{fontSize:11}}>Origin</Text>
                    <Text style={{fontSize:15,color:'#333'}}>{(this.state.profileDetails.nationality)?this.state.profileDetails.nationality:'NA'}</Text>
                </View>
                
                </ScrollView>
               
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});

//make this component available to the app
export default ProfileInfo;
