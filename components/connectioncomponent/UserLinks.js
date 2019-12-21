
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { PostWithToken } from './../../services/PostWithToken';
export default class UserLinks extends Component {
    constructor(props){
        super(props)
        this.state={
            authtoken:'',
            items:[],
            notfound:'',
            follow_id:'',
            status:'',
            showmsg:false,
        }
       
    }
    
    followuser=async(id)=>{
        var userInfo=await AsyncStorage.getItem('token');
       
        this.setState({authtoken:userInfo,follow_id:id,status:'follow'},()=>{
          console.log(this.state.authtoken);
          PostWithToken('follow', this.state).then((followresult)=>{            
            console.log(followresult);
            this.setState({showmsg:true,applymsg:followresult.data.message});
            setTimeout(()=>this.setState({showmsg:false,applymsg:''}),2000)
            this.getUserData();
          })    
        });
    }

    frienduser=async(id)=>{
        var userInfo=await AsyncStorage.getItem('token');
     
        this.setState({authtoken:userInfo,friend_id:id,type:'friend'},()=>{
            PostWithToken('join', this.state).then((joinresult)=>{            
               console.log(joinresult);
               this.setState({showmsg:true,applymsg:joinresult.data.message});
               
               setTimeout(()=>this.setState({showmsg:false,applymsg:''}),2000)
               this.getUserData();
             })  
       })
    }

    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo},()=>
        {console.log(this.state.authtoken)
            if(this.props.screen_name==='Following'){
                status='following'
            
            }
            else if(this.props.screen_name==='Followers')
            {
                status='followers'
            }
            else if(this.props.screen_name==='Friends')
            {
                status='friends'
            }
            PostWithToken('getlinks',{authtoken:this.state.authtoken,user_id:this.props.user_id,type:status}).then((result)=>{
                console.log(result)
                this.setState({items:result.data.links})
              })
        });
    }
   
    componentDidMount(){
        this.getUserData();
    }
    render() {
     return(
     
             <View style={{flex:1, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
           <SafeAreaView>
           { 
            (this.state.showmsg)?
            <Text style={styles.applysuccess}>{this.state.applymsg}</Text>
            :null
            }
           <View style={{width:'100%',paddingHorizontal:15,height:50,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Ionicons
                    name='md-arrow-back'
                    type='Ionicons'
                    color='#000'
                     size={30} /></TouchableOpacity>
                        <Text style={{width:'90%',fontWeight:'600',fontSize:20,marginLeft:15,color:'black'}}>{this.props.screen_name}</Text>
                    </View> 
                    </View>
                   

            <ScrollView scrollEventThrottle={16} >
                {
                (this.state.items)?this.state.items.map((item,index)=>{
                    console.log("Get Log",item)
                    
                    if(item.userimage=='0' || item.userimage===null)
                             {
                              imageurl='https://osclass.calinbehtuk.ro/oc-content/themes/vrisko/images/no_user.png'
                              
                             }
                             else
                             {
                                imageurl=item.userimage.image.file

                             }
                             return(
                                 <View>
                                {this.props.screen_name==='Following'?
                                
                                <View style={{paddingHorizontal:10,height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                      
                                     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                     <Image source={{uri: imageurl}} style={{width:44,height:44,borderRadius:22}} />
                                         <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{item.display_name}</Text>
                                     </View>
                                     <View style={{flexDirection:'row',alignItems:'center'}}>
                                         {item.myprofile===true?null:<View>
                 {item.following===false?<TouchableOpacity onPress={()=>this.followuser(item.ID)}>
            <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Follow</Text>
            </View>
        </TouchableOpacity>:null}
        </View>}
        {item.friend===false?
        <TouchableOpacity onPress={()=>this.frienduser(item.ID)}>
                    <View>
                    <Image source={require('./../../src/images/add_usr.png')} resizeMode='contain' style={{width:18,height:19,marginLeft:10}}/>
                    </View>
                </TouchableOpacity>:null}
        
    </View> 
        
                                    
                                     </View> 
                                     :null
                                    }
                                    {this.props.screen_name==='Followers'?<View style={{height:null,paddingHorizontal:15, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
            <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Image source={{uri: imageurl}} style={{width:44,height:44,borderRadius:22}} />
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{item.display_name}</Text>
            </View>
             <View style={{flexDirection:'row',alignItems:'center'}}>
             {item.myprofile===true?null:<View>
                 {item.followers===false?<TouchableOpacity onPress={()=>this.followuser(item.ID)}>
            <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Follow</Text>
            </View>
        </TouchableOpacity>:null}
        </View>}
        {item.friend===false?
        <TouchableOpacity onPress={()=>this.frienduser(item.ID)}>
                    <View>
                    <Image source={require('./../../src/images/add_usr.png')} resizeMode='contain' style={{width:18,height:19,marginLeft:10}}/>
                    </View>
                </TouchableOpacity>:null}
        
    </View> 
            </View>
           
    </View>:null}
    {this.props.screen_name==='Friends'?
    <View style={{height:null,paddingHorizontal:15, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
    <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
    <Image source={{uri: imageurl}} style={{width:44,height:44,borderRadius:22}} />
        <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{item.display_name}</Text>
    </View>
    {/* <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>this.onPress(this.props.id,this.props.name)}>
            <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Chat</Text>
            </View>
        </TouchableOpacity>
    </View> */}
    <View style={{flexDirection:'row',alignItems:'center'}}>
    {item.myprofile===true?null:<View>
                 {item.following===false?<TouchableOpacity onPress={()=>this.followuser(item.ID)}>
            <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Follow</Text>
            </View>
        </TouchableOpacity>:null}
        </View>}
        {item.friend===false?
        <TouchableOpacity onPress={()=>this.frienduser(item.ID)}>
                    <View>
                    <Image source={require('./../../src/images/add_usr.png')} resizeMode='contain' style={{width:18,height:19,marginLeft:10}}/>
                    </View>
                </TouchableOpacity>:null}
        
    </View> 
    
    </View>
   
</View>:null}
                                    </View>
                            )
                }):<View style={{flex:1,flexDirection:'column', alignItems:'center',paddingTop:80,justifyContent:'center',height:'100%'}}><Text>{this.state.notfound}</Text></View>
                                
            }
                
                </ScrollView>
             </SafeAreaView>     
    </View>

     )
      }
}
const styles = StyleSheet.create({
   
    applysuccess:{
        padding:7,
        borderWidth:1,
        borderColor:'#5BC236',
        backgroundColor:'#5BC236',
        color:'#fff',
        marginBottom:4,
        width:'100%',
        borderRadius:4,

    }
});
 