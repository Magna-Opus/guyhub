//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, SafeAreaView ,BackHandler} from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { GetData } from './../../services/GetData';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { PostWithToken } from '../../services/PostWithToken';

// create a component
class JobDetail extends Component {
    constructor(props){
        super(props);
        
    
        this.state={
            company_logo:'https://www.logoground.com/uploads/z4110148Dummy.jpg',
            title:'',
            loading:true,
            company_name:'',
            post_date:'',
            skillRequired:'',
            experiences:'',
            description:'',
            location:'',
            applied:false,
            job_id:'',
            applymsg:'',
            showmsg:false,
            disablebtn:false,
            authtoken:'',
            count: 0
        }
        setInterval(() => {
            this.setState({ count: this.state.count + 1 });
          }, 1000);
        this.jobApply=this.jobApply.bind(this);
        this.getUserData=this.getUserData.bind(this);
    }
    static navigationOptions =
    {
       header:null
    };
    //getuser info
    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
        // var jobid= await AsyncStorage.getItem('specific_jobid');

        this.setState({job_id:this.props.id,authtoken:userInfo},()=>
            {
                this.jobDetail();
                
            }
        );
    }

    //apply for job
    jobApply=()=>{
        this.setState({disablebtn:true});
        console.log(this.state.authtoken);
        PostWithToken('jobs/apply?job_id='+this.state.job_id, this.state).then((result)=>{
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
                        Actions.editprofile();
                    },3000)
                }
            else{
                this.setState({disablebtn:false})
            }
        })
    }
    // get job detail fn
    jobDetail=()=>{
        GetData('jobs/'+this.state.job_id, this.state).then((result)=>{
                if(result.status===200)
                {                   
                    var jobdata=result.data;
                    console.log(result.data);
                    this.setState({applied:jobdata.applied,company_name:jobdata.simple_job_board_company_name,title:jobdata.title,description:jobdata.content,salary:jobdata.simple_job_board_salary,website:jobdata.simple_job_board_company_website},()=>{
                                           
                    })
                    
                    if(jobdata.simple_job_board_hr_name===null)
                    {
                        this.setState({hrname:"NA"})
                    }
                    else
                    {
                        this.setState({hrname:jobdata.simple_job_board_hr_name})
                    }
                    if(jobdata.simple_job_board_hr_email===null)
                    {
                        this.setState({hremail:"NA"})
                    }
                    else
                    {
                        this.setState({hremail:jobdata.simple_job_board_hr_email})
                    }
                    if(jobdata.simple_job_board_interviewtime===null)
                    {
                        this.setState({post_date:"NA"})
                    }
                    else
                    {
                        this.setState({post_date:jobdata.simple_job_board_interviewtime})
                    }
                    if(jobdata.simple_job_board_contact===null)
                    {
                        this.setState({mobile:"NA"})
                    }
                    else
                    {
                        this.setState({mobile:jobdata.simple_job_board_contact})
                    }
                    if(jobdata.logo==='0')
                    {
                        this.setState({company_logo:'https://www.logoground.com/uploads/z4110148Dummy.jpg'})
                    }
                    else
                    {
                        this.setState({company_logo:jobdata.logo.image.file})
                    }
                    // if(jobdata.company_logo.indexOf('.jpg')>-1 || jobdata.company_logo.indexOf('.png')>-1)
                    //     this.setState({company_logo:jobdata.company_logo})
                    var obj=jobdata.location;
                    var val=obj[Object.keys(obj)[0]];
                    if(val!=='undefined' || val!=='' || val!==null)
                    this.setState({location:val});
                    else
                    this.setState({location:'NA'});

                    var skillobjlength=Object.keys(jobdata.skills).length;
                    var skillobj=jobdata.skills;
                    var skills='';
                    if(skillobjlength>0){
                        for(let i=0;i<skillobjlength;i++){
                            skills+=skillobj[Object.keys(skillobj)[i]]+', '
                        }
                        this.setState({skillRequired:skills})
                     }
                     else{
                        this.setState({skillRequired:'NA'})
                     }

                     var exobjlength=Object.keys(jobdata.type).length;
                    var exobj=jobdata.type;
                    var ex='';
                    if(exobjlength>0){
                        for(let i=0;i<exobjlength;i++){
                            ex+=exobj[Object.keys(exobj)[i]]
                        }
                        this.setState({experiences:ex})
                     }
                     else{
                        this.setState({experiences:'NA'})
                     }

                     var catobjlength=Object.keys(jobdata.categories).length;
                    var catobj=jobdata.categories;
                    var cat='';
                    if(catobjlength>0){
                        for(let i=0;i<catobjlength;i++){
                            cat+=catobj[Object.keys(catobj)[i]]
                        }
                        this.setState({categories:cat})
                     }
                     else{
                        this.setState({categories:'NA'})
                     }

                    //  var locobjlength=Object.keys(jobdata.location).length;
                    // var locobj=jobdata.location;
                    // var loc='';
                    // if(locobjlength>0){
                    //     for(let i=0;i<locobjlength;i++){
                    //         loc+=locobj[Object.keys(locobj)[i]]
                    //     }
                    //     this.setState({location:loc})
                    //  }
                    //  else{
                    //     this.setState({location:'NA'})
                    //  }
                    this.setState({location:jobdata.location})
                    this.setState({currency:jobdata.simple_job_board_currency})

                    this.setState({loading:false}) 
                }
        })
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    
      onBackPress = () => {
        return true; 
      }
    componentWillMount(){
        
        this.getUserData();
    }
    render() {
        const { navigate } = this.props.navigation;
        const { applied } =this.state;
        return (
            (this.state.loading)?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Loading...</Text>
            </View>
            :
            
            <SafeAreaView style={styles.container}>                   
                    <ImageBackground source={require('./../../src/images/gradient1.jpeg')} resizeMode="cover" style={{position:'relative',flex:3,justifyContent:'center',alignItems:'center'}}>
                    <View style={{position:'absolute',top:15,left:15}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Icon
                        name='md-arrow-back'
                        type='ionicon'
                        color='#fff'
                        size={30}  />
                        </TouchableOpacity>
                        </View>
                        <Image source={{uri:this.state.company_logo}} style={{width:150,height:100}} />
                        <Text style={{color:'#333',fontWeight:'700',fontSize:16,marginTop:15}}>{this.state.company_name}</Text>
                    </ImageBackground>
                <View style={{flex:4,paddingHorizontal:15}}>
                    <View style={{backgroundColor:'white',borderRadius:5,marginTop:-30,padding:10,elevation:2,shadowColor:'#ccc'}}>
                        <ScrollView >
                            <Text style={{fontSize:16,color:'#000'}}>{this.state.title}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon
                        name='ios-calendar'
                        type='ionicon'
                        size={12}/>
                        <Text style={{fontSize:12,marginLeft:4}}>
                             {this.state.post_date}
                            </Text>
                            </View>
                            <Text style={{color:'#333',marginTop:10}}>Category</Text>
                            <Text>
                                {this.state.categories}
                            </Text>
                            <Text style={{color:'#333',marginTop:10}}>Skill Required</Text>
                            <Text>{this.state.skillRequired}</Text>
                            <Text style={{color:'#333',marginTop:10}}>Experience</Text>
                            {this.state.experiences=='Fresher'?<Text >{this.state.experiences} </Text>:
                            <Text >{this.state.experiences} yrs</Text>}
                            <Text style={{color:'#333',marginTop:10}}>Salary(monthly)</Text>
                            <Text >{this.state.salary} {this.state.currency}</Text>
                            <Text style={{color:'#333',marginTop:10}}>Description</Text>
                            <Text>
                                {this.state.description}
                            </Text>
                            <Text style={{color:'#333',marginTop:10}}>Location</Text>
                            {this.state.location===''?<Text>NA</Text>:
                            <Text>
                                {this.state.location}
                            </Text>}
                            <Text style={{color:'#333',marginTop:10}}>Contact Number</Text>
                            <Text>
                                {this.state.mobile}
                            </Text>
                            <Text style={{color:'#333',marginTop:10}}>Company Website</Text>
                            <Text>
                                {this.state.website}
                            </Text>
                            <Text style={{color:'#333',marginTop:10}}>HR Name</Text>
                            <Text>
                                {this.state.hrname}
                            </Text>
                            <Text style={{color:'#333',marginTop:10}}>HR Email</Text>
                            <Text>
                                {this.state.hremail}
                            </Text>
                        <View style={{alignItems:'center',justifyContent: 'center',marginBottom:70,marginTop:20}}>
                            {                                
                                (applied===false)?
                                <TouchableOpacity onPress={()=>{this.jobApply();this.props.applyjob(this.state.job_id)}} disabled={this.state.disablebtn}>
                                     <Text style={{marginTop:15,marginBottom:15,fontSize:18,backgroundColor:'#5a9fff',color:'white',borderRadius:5,padding:10}}>APPLY NOW</Text>
                                </TouchableOpacity>
                                :
                                <Text style={{color:'green'}}>Applied</Text>
                            }   
                            { 
                        (this.state.showmsg)?
                        <Text style={styles.applysuccess}>{this.state.applymsg}</Text>
                        :null
                        }                         
                        </View>
                        
                        </ScrollView>
                        
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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

//make this component available to the app
export default JobDetail;
