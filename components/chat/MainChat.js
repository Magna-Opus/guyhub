//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, Image ,SafeAreaView} from 'react-native';
import { PostData } from './../../services/PostData';
import SenderChat from './SenderChat';  
import AsyncStorage from '@react-native-community/async-storage';
import ReceiverChat from './RecieverChat';
// create a component
class MainChat extends Component {
    constructor(props){
        super(props);
        this.state={
            authtoken:'',
            recipient:'',
            receiverId:'',
            msgContent:'',
            content:'',
            appendSend:0,
            appendReceive:0
        }
    }

    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('userInfo');
        userDetail=JSON.parse(userInfo);
        this.setState({authtoken:'dFZiZ1Q2VUpTeXpUYjVjeTIxT1pMdz09'});
        this.setState({recipient:userDetail.ID})  
    }
    componentDidMount(){
      //  this.getUserData();
    }
    sendMsg=()=>{
        this.setState({appendSend:this.state.appendSend+1});
        PostData('send',this.state).then((result)=>{            
            this.receiveMsg();
           })
    }
    receiveMsg=()=>{
        PostData('recieve',this.state).then((result)=>{            
            this.setState({appendReceive:this.state.appendReceive+1});
           })
    }
    render() {
        const children = [];
        const children2=[];
    for (var i = 0; i < this.state.appendSend; i += 1) {
      children.push(<SenderChat key={i} number={i} />);
      console.log(children);
    };
    for (var i = 0; i < this.state.appendReceive; i += 1) {
        children2.push(<ReceiverChat key={i} number={i} />);
        console.log(children2);
      };
      
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection:'column',flex:1}}>
                    <View style={{flex:1,backgroundColor:'#ddd'}}>
                        {children}
                        {children2}
                    </View>
                         <View style={{height:60,borderTopWidth:1,borderTopColor:'#ccc',paddingHorizontal:10,flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
                    <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                    defaultValue={this.state.content}
                                    autoCorrect={false} 
                                    placeholder='Enter Message' 
                                    onChangeText={content => this.setState({content})}
                                    placeholderTextColor='#a9a9a9'/>
                    <TouchableOpacity onPress={this.sendMsg}>
                        <Image source={require('./../../src/images/send_ico.png')} style={{width:30,height:30}}></Image>
                    </TouchableOpacity>

                    </View>
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
    input:{
        width:'80%'
    }
});

//make this component available to the app
export default MainChat;
