
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { PostWithToken } from './../../services/PostWithToken';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import Loader from './../../components/loader/loader';
export default class JobList extends Component {
    constructor(props){
        super(props);
       this.state={
           job_id:'',
           authtoken:'',
           applied:null,
           applymsg:'',
           showmsg:false,
           disablebtn:false,
           docheck:false,
       }
       
       this.jobApply=this.jobApply.bind(this);
       this.getUserData=this.getUserData.bind(this);
       
    }
   
    // specific job detail fn
    jobDetail=(job_id)=>{
       // AsyncStorage.setItem('specific_jobid',JSON.stringify(job_id));  
       Actions.jobdetail({id:JSON.stringify(job_id),applyjob: this.jobApply.bind(this)});
    }

    // get user info from asycstorage
    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
       // userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo});
    }
    
    componentDidMount(){
        this.setState({applied:this.props.applied})
        this.getUserData();
        
    }

    //apply for job
    jobApply=(job_id)=>{   
         this.setState({docheck:true})
        this.setState({disablebtn:true,job_id:job_id},()=>{
            console.log(this.state);debugger;
            PostWithToken('jobs/apply', this.state).then((result)=>{
                console.log(result)
                console.log(result.message);
                if(result.status===201){
                    this.setState({applied:true,applymsg:result.message},()=>{
                        this.setState({showmsg:true})
                        setTimeout(()=>{
                            this.setState({showmsg:false})
                        },3000)
                    });
                   
                }
                else if(result.status===401)
                {
                    this.setState({docheck:false,disablebtn:false})
                    this.setState({applymsg:result.message,showmsg:true})
                    setTimeout(()=>{
                        this.setState({showmsg:false})
                        
                    },3000)
                }
                else{
                    this.setState({disablebtn:false})
                }
               
            })
        });
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
     return(
        
        <View style={{width:this.props.width,height:null,paddingHorizontal:0, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
            { 
                        (this.state.showmsg)?
                        <Text style={styles.applysuccess}>{this.state.applymsg}</Text>
                        :null
                        }
                        
            <TouchableOpacity style={{width:'100%',paddingVertical:10,backgroundColor:'#fff',alignItems:'center',paddingHorizontal:20}} onPress={()=>this.jobDetail(this.props.id)}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{width:'15%',justifyContent:'center',alignItems:'center',marginRight:10}}>
                    <Image source={{uri:this.props.company_logo}} resizeMode="contain" style={{width:45,height:45}} />
                    </View>
                    <View style={{width:'75%'}}>
                   {this.props.title===''?<Text style={{width:'100%',fontSize:16,color:'#333',paddingHorizontal:5}} lineBreakMode='clip' numberOfLines={3}>NA</Text>:
                    <Text style={{width:'100%',fontSize:16,color:'#333',paddingHorizontal:5}} lineBreakMode='clip' numberOfLines={3}>{this.props.title}</Text>}
                    
                    
                    
                        <View style={{width:'100%',paddingHorizontal:5,flex:2}}>
                            {this.props.location===''?<Text style={{width:'100%',fontSize:14,color:'#a9a9a9',marginTop:5}}>{this.props.company} - NA</Text>:<Text style={{width:'100%',fontSize:14,color:'#a9a9a9',marginTop:5}}>{this.props.company} - {this.props.location}</Text>}
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:14,color:'#333333'}}>Skills - </Text>
                            {this.props.skills===''?<Text  style={{fontSize:14,color:'#a9a9a9'}}>NA</Text>:
    <Text style={{fontSize:14,color:'#a9a9a9'}}>{this.props.skills}</Text> }                       
                        </View>
                        </View>
                        
                      
                        
                    </View>
                    <View style={{width:'15%',alignItems:'flex-end'}}>
                        {
                            (this.state.applied===false)?
                            <View>{this.state.docheck===false?
                            <TouchableOpacity onPress={()=>this.jobApply(this.props.id)} disabled={this.state.disablebtn}>
                                <View style={{backgroundColor:'#0078d7',borderRadius:30,paddingHorizontal:5,padingTop:2,paddingBottom:3,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#ccc',fontSize:12,color:'white'}}>Apply</Text>
                                </View>
                            </TouchableOpacity>:null}
                            </View>
                            :<Text style={{color:'green'}}>Applied</Text>
                            }
                        </View>
                </View>
            </TouchableOpacity>
           
    </View>
     )
      }
}
 // define your styles
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