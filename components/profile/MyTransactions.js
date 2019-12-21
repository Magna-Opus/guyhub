//import liraries
import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, FlatList,View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GetWithToken } from './../../services/GetWithToken';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const{width, height}=Dimensions.get('window');
// create a component
class MyTransactions extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
        
    }

    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
       this.setState({authtoken:userInfo},()=>{
           //console.log(this.state.userid);
           GetWithToken('transactions', {authtoken:this.state.authtoken}).then((result)=>{
               console.log("Payment result: ",result)
               this.setState({paymentdetails:result.txns})
    
           });
       }) 
    }
    
    componentWillMount(){
        this.getUserData();
    }

    renderitem=(item)=>{
        
    }

    render() {
        
        return (
            <SafeAreaView style={styles.container}>
                <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30} /></TouchableOpacity>
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>MY TRANSACTIONS</Text>
                    </View> 
                    </View>
                    <View style={{flex:1,marginTop:10}}>
                    <FlatList
data={this.state.paymentdetails}
renderItem={({ item }) => (
<View style={{ paddingHorizontal: 15 }}>
        <Card style={{width:'100%',marginTop:20,borderRadius:20,elevation:5}}>
    <Card.Content>

<View style={{width:'100%',flexDirection:'row',marginTop:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Transaction ID</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>{item.txn_id}</Text></View>
<View style={{width:'100%',flexDirection:'row',marginTop:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Mode</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>{item.mode}</Text></View>
<View style={{width:'100%',flexDirection:'row',marginTop:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Amount</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>{item.amount} USD</Text></View>
<View style={{width:'100%',flexDirection:'row',marginTop:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Users</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>{item.users_limit}</Text></View>
<View style={{width:'100%',flexDirection:'row',marginTop:10,marginBottom:10}}><Text style={[styles.textInfo,{width:'30%',color:'#0078d7',textAlign:'left'}]}>Transaction Date</Text><Text style={[styles.textInfo,{width:'5%',color:'#0078d7',textAlign:'left'}]}>:</Text><Text style={[styles.textInfo,{width:'65%',color:'#808080',textAlign:'left'}]}>{item.txndate}</Text></View>

    </Card.Content>
   
  </Card>    
        </View>
)}
/>

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
    aboutTitle:{fontSize:22, textAlign:'center',color:'#fff',paddingVertical:10,textTransform:'uppercase',backgroundColor:'#2078d7',marginBottom:20},
    aboutHeading:{fontSize:20,color:'#4691f1',textAlign:'center',marginVertical:5, },
    aboutdes:{fontSize:14, marginBottom:5, color:'#000'},
});

//make this component available to the app
export default MyTransactions;
