//import liraries
import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions,KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import Loader from './../../components/loader/loader';
import DocumentPicker from 'react-native-document-picker';
import { GetWithToken } from './../../services/GetWithToken';
import { GetWithoutToken } from './../../services/GetWithoutToken';
import { PostWithToken } from './../../services/PostWithToken';
import { PostImageData } from './../../services/PostImageData';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid, Alert} from "react-native";
import pick from './../../services/ImagePicker';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const{width, height}=Dimensions.get('window');
// create a component
class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            errors:'',
            photo:null,
            username:'',
            country: [],
            college_country:[],
            college_states:[],
            college_city:[],
            college_countryid:'0',
            college_statesid:'0',
            college_cityid:'0',
            currentDate:'',
        states:[],
        city:[],
        countryid:'0',
        statesid:'0',
        user_status:'0',
        cityid:'',
        nationality:[],
        countrydrop:[],
        statesdrop:[],
        citydrop:[],
        college_countrydrop:[],
        college_statesdrop:[],
        college_citydrop:[],
        nationalitydrop:[],
            user_id:'',
            userid:'',
            name:'',
            mobile:'',
            dob:'',
            nationality:'',
            address:'',
            loading:true,
            loadings:false,
            gender:'',
            profile_image:'',
            profile_url:'',
            errortype:null,
            data:null,
            authtoken:''
        }
        this.getUserData=this.getUserData.bind(this);
        this.handleChooseImage=this.handleChooseImage.bind(this);
    }
    static navigationOptions =
    {
       header:null
    };


    
    currentDate=()=>{
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = yyyy+'-'+mm+'-'+dd;
        this.setState({currentDate:today});
        
    }

    onSelectedItemsChangenationality = (selectedItems) => {
        this.setState({ nationality:selectedItems });
        this.setState({ nationalityid:selectedItems[0] });
        console.log("Nationality is",selectedItems)
      };
    
    onSelectedItemsChangecountry = (selectedItems) => {
        console.log("Country is",selectedItems)
        this.setState({ country:selectedItems});
        this.setState({ countryid:selectedItems[0]});
        this.setState({states:''})
        this.setState({ statesid:''});
        this.setState({city:''})
        this.setState({ cityid:''});
        GetWithoutToken('states/'+selectedItems).then((states)=>{
            console.log(states)
            this.setState({statesdrop:states})
           
           })
      };
      onSelectedItemsChangestate = (selectedItems) => {
        console.log("State is",selectedItems)
        this.setState({ states:selectedItems});
        this.setState({ statesid:selectedItems[0]});
        this.setState({city:''})
        this.setState({ cityid:''});
        GetWithoutToken('cities/'+selectedItems).then((city)=>{
            console.log(city)
            this.setState({citydrop:city})
           
           })
      };
      onSelectedItemsChangecity = (selectedItems) => {
        console.log("City is",selectedItems)
        this.setState({ city:selectedItems});
        this.setState({ cityid:selectedItems[0]});

      };

      onSelectedItemsChangecollegecountry = (selectedItems) => {
        console.log("college Country is",selectedItems)
        this.setState({ college_country:selectedItems});
        this.setState({ college_countryid:selectedItems[0]});
        this.setState({college_states:''})
        this.setState({ college_statesid:''});
        this.setState({college_city:''})
        this.setState({ college_cityid:''});
        GetWithoutToken('states/'+selectedItems).then((states)=>{
            console.log(states)
            this.setState({college_statesdrop:states})
           
           })
      };
      onSelectedItemsChangecollegestate = (selectedItems) => {
        console.log("State is",selectedItems)
        this.setState({ college_states:selectedItems});
        this.setState({ college_statesid:selectedItems[0]});
        this.setState({college_city:''})
        this.setState({ college_cityid:''});
        GetWithoutToken('cities/'+selectedItems).then((city)=>{
            console.log(city)
            this.setState({college_citydrop:city})
           
           })
      };
      onSelectedItemsChangecollegecity = (selectedItems) => {
        console.log("City is",selectedItems)
        this.setState({ college_city:selectedItems});
        this.setState({ college_cityid:selectedItems[0]});

      };
//image picker
handleChooseImage=()=>{
    pick((source, data)=>this.setState({photo:source, data:data},()=>{
        var data=new FormData;
     
        data.append('profile_image',{ uri: this.state.photo.uri, name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' });
        //data.append('user_id',this.state.user_id);
        //this.setState({profile_image: { uri: this.state.photo.uri, name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' }});

        //data.append('profile_image', { uri: this.state.photo.uri, name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' });
        console.log("Token ",)
        this.setState({loadings:true})
        PostImageData('update-profile',data,this.state.authtoken).then((datas)=>{
            console.log("Simple ",datas);
            if(datas.status==201){
                this.setState({userid:this.state.user_id},()=>{
                    console.log(this.state.userid);debugger;
                    //PostData('user-details',this.state).then((newuserinfo)=>{
                        
                       // this.setUserInfo(newuserinfo.data);                    
                    //})
                })
                this.setState({loadings:false})
                this.setState({errors:datas.message})
                Actions.myprofile({hideNavBar: true})  
                
        }
         else
         {
            this.setState({loadings:false})
             console.log("Else",data);
         this.setState({errors:datas.message}); 
         }
         

        })  

    }))

  }
  setUserInfo=(data)=>{
    var data=JSON.stringify(data);
    AsyncStorage.setItem('userInfo',data);
    this.props.refreshPrevData();
    this.props.refreshBottomData();
    debugger;
}


actualDownload = () => {
    var date = new Date();
    console.log("download")
    const { dirs } = RNFetchBlob.fs;
   RNFetchBlob.config({
     fileCache: true,
     addAndroidDownloads: {
     useDownloadManager: true,
     notification: true,
     mediaScannable: true,
     title: `Resume.pdf`,
     path: `${dirs.DownloadDir}/Resume`+ Math.floor(date.getTime()
     + date.getSeconds() / 2)+ `.pdf`,
     },
   })
     .fetch('GET', this.state.hasresume, {})
     .then((res) => {
        Alert.alert("Resume Downloaded Successfully.");
       console.log('The file saved to ', res.path());
     })
     .catch((e) => {
       console.log(e)
     });
 }
 
 downloadFile = async() => {
     console.log('pressed')
   try {
       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         this.actualDownload();
       } else {
         Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
       }
     } catch (err) {
       console.warn(err);
     } 
 }

// updateProfile
updateProfile=()=>{
    this.setState({loadings:true})
    PostWithToken('update-profile',this.state).then((data)=>{
        if(data.status===201){
            this.setState({userid:this.state.user_id},()=>{
                console.log(this.state.userid);debugger;
                PostWithToken('user-details',this.state).then((newuserinfo)=>{
                    console.log(newuserinfo);debugger;
                    //this.setUserInfo(newuserinfo.data);
                    this.setState({loadings:false}) 
                    Actions.myprofile({hideNavBar: true})                   
                })
            })
            this.setState({errors:data.message})
            
    }
    else
    this.setState({errors:data.message}); 
    this.setState({loadings:false})

    }) 

}

    // get user data
    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
        var id=await AsyncStorage.getItem('id');
        this.setState({userid:id,id:id});
        this.setState({token:userInfo,authtoken:userInfo})
        this.setState({authtoken:userInfo},()=>{
            //console.log(this.state.userid);
            GetWithToken('userdetails', this.state).then((currentuser)=>{
                console.log("CurrentUserr: ",currentuser)
                this.setState({profile_url:currentuser.data.userimage.image.file});
                this.setState({country:[currentuser.data.country_id]})
                this.setState({states:[currentuser.data.state_id]})
                this.setState({city:[currentuser.data.city_id]})
                this.setState({college_country:[currentuser.data.collegecountryid]})
                this.setState({college_states:[currentuser.data.collegestateid]})
                this.setState({college_city:[currentuser.data.collegecityid]})
                this.setState({name:currentuser.data.first_name+" "+currentuser.data.last_name})
                this.setState({username:currentuser.data.display_name})
                this.setState({user_status:currentuser.data.user_status})
                this.setState({email:currentuser.data.user_email})
                this.setState({college:currentuser.data.college})
                this.setState({mobile:currentuser.data.mobile})
                this.setState({dob:currentuser.data.dob})
                this.setState({gender:currentuser.data.gender})
                if(currentuser.data.hasresume==='')
                {
                    this.setState({hasresume:false})
                }
                else
                {
                this.setState({hasresume:currentuser.data.hasresume.image.file})
                }
                this.setState({nationality:[currentuser.data.nationality_id]})
                console.log("nskksjf",this.state.college_country,this.state.college_states,this.state.college_city)
                GetWithoutToken('states/'+currentuser.data.country_id).then((states)=>{
                    console.log(states)
                    this.setState({statesdrop:states})
                   
                   })
                   GetWithoutToken('cities/'+currentuser.data.state_id).then((city)=>{
                    console.log(city)
                    this.setState({citydrop:city})
                   
                   })

                   GetWithoutToken('states/'+currentuser.data.collegecountryid).then((states)=>{
                    console.log(states)
                    this.setState({college_statesdrop:states})
                   
                   })
                   GetWithoutToken('cities/'+currentuser.data.collegestateid).then((city)=>{
                    console.log(city)
                    this.setState({college_citydrop:city})
                   
                   })
                this.setState({states:[currentuser.data.state_id]})
                this.setState({city:[currentuser.data.city_id]})
                this.setState({college_states:[currentuser.data.collegestateid]})
                this.setState({college_city:[currentuser.data.collegecityid]})
                //var userdata=JSON.stringify(currentuser.data);
                //AsyncStorage.setItem('userInfo',userdata);
                this.setState({loading:false})
            });
        }) 
        
    }

    uploadcv=async()=>
    {
        var userInfo=await AsyncStorage.getItem('token')
        console.log("tokeeeeeeee",userInfo)
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.pdf],
            });
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size
            );
            var data=new FormData;
            // {authtoken:userInfo,resume:res.uri}
        data.append('resume',{ uri: res.uri, name: Math.round(Math.random() * 100000000) +'CV.pdf', type: 'application/pdf' });
            PostImageData('uploadresume',data,this.state.authtoken).then((datas)=>{
                console.log("Simple ",datas);
                if(datas.status==1){
                    this.setState({errors:datas.message,hasresume:datas.hasresume.image.file})
                   
                   
                    
            }
             else
             {
               
                this.setState({errors:datas.message})
             
             }
             
    
            })  
    
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }

    componentDidMount(){
        this.currentDate();
        GetWithoutToken('countries').then((countries)=>{
            console.log(countries)
            this.setState({countrydrop:countries})
           
           })
           GetWithoutToken('countries').then((countries)=>{
            console.log(countries)
            this.setState({college_countrydrop:countries})
           
           })
           GetWithoutToken('nationality').then((nationality)=>{
            console.log(nationality)
            this.setState({nationalitydrop:nationality})
           
           })
        this.getUserData();
    }
    render() {
        if(this.state.loadings)
        {
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Loader loaderclose={this.state.loadings} />
                </View>
            )
        }
        const {photo}=this.state;
        return (
            (this.state.loading)?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Loading...</Text>
            </View>
            :
            <SafeAreaView style={styles.container}>
            <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30} /></TouchableOpacity>
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>EDIT PROFILE</Text>
                    </View> 
                    
                    </View>
            <View style={{width:'100%',justifyContent: 'center',paddingHorizontal:15}}>
            { 
            (this.state.errors)?
            <Text style={styles.errors}>{this.state.errors}</Text>
            :null
            }
            <View style={{flexDirection:'row',justifyContent:'center',height:120,alignItems:'center'}}>
                    {(photo)?(
                        <Image source={{uri:photo.uri}} style={{width:100,height:100,borderRadius:50}}/>
                    ):<Image source={(this.state.profile_url)?{uri:this.state.profile_url}:require('./../../src/images/profile_usr_pholder.png')} style={{width:100,height:100,borderRadius:50}}/>
                    }
                    <TouchableOpacity onPress={this.handleChooseImage} style={{width:30,height:30,backgroundColor:'white',marginTop:-50,marginLeft:-20,borderRadius:30,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Icon name="ios-create" type="ionicon" size={20} />
                    </TouchableOpacity>
            </View>
            <ScrollView scrollEventThrottle={16}> 
            
            <View style={{marginLeft:15,marginRight:15,marginBottom:20}}>
            <TextInput style = {styles.input} 
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next" 
                            placeholder='Name' 
                            value={this.state.name}
                            onChangeText={name => this.setState({name})}
                            placeholderTextColor='#a9a9a9'/>
                            <Text style = {styles.input} 
                            >{this.state.username}</Text
                            >     
                            <TextInput style = {styles.input} 
                            
                            autoCorrect={false}
                            returnKeyType="next" 
                            placeholder='Status' 
                            value={this.state.user_status}
                            onChangeText={user_status => this.setState({user_status})}/>                   
                            <Text style = {styles.input} 
                            
                            >{this.state.email}
                            </Text>
                            <TextInput style = {styles.input} 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            keyboardType='number-pad'
                            returnKeyType="next" 
                            value={this.state.mobile}
                            placeholder='Mobile Number' 
                            onChangeText={mobile => this.setState({mobile})}
                            placeholderTextColor='#a9a9a9'/>
                            <DatePicker
                            style={styles.input}
                            date={this.state.dob}
                            mode="date"
                            placeholder="DOB"
                            format="YYYY-MM-DD"
                            maxDate={this.state.currentDate}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 0,
                                top: -8,
                            },
                            dateInput: {
                                marginLeft: 0,
                                marginTop:-26,
                                borderWidth:0,
                                textAlign:'left',
                                width:'100%'
                            }
                            }}
                            onDateChange={dob => this.setState({dob})}
                            />                          

                            <View style={{flexDirection:'row',justifyContent:'flex-start',height:40,marginBottom:10,alignItems:'center'}}>
                                <RadioButton.Group
                                    onValueChange={gender => this.setState({ gender })}
                                    value={this.state.gender}
                                >
                                    <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                    <RadioButton value="Male" style={{marginRight:3}} />          
                                    <Text>Male</Text>
                                    </View>
                                    <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                    <RadioButton value="Female" style={{marginRight:3}} />          
                                    <Text>Female</Text>
                                    </View>
                                    <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                    <RadioButton value="Others" style={{marginRight:3}} />          
                                    <Text>Not Specified</Text>
                                    </View>
                                </RadioButton.Group>
                                </View>
                            {/* <TextInput style = {styles.input} 
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next" 
                            value={this.state.address}
                            placeholder='Address' 
                            onChangeText={address => this.setState({address})}
                            placeholderTextColor='#a9a9a9'/>    */}
                            {/* <TextInput style = {styles.input} 
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.nationality}
                            returnKeyType="next" 
                            placeholder='Origin' 
                            onChangeText={nationality => this.setState({nationality})}
                            placeholderTextColor='#a9a9a9'/>  */}
                            <TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                            <SectionedMultiSelect
                                       
                                        
                                       items={[this.state.countrydrop]}
                                       uniqueKey="id"
                                       searchPlaceholderText="Search Country"
                                       single={true}
                                       showCancelButton={true}
                                       expandDropDowns={true}
                                       showChips={false}
                                       subKey="list"
                                       selectText="Not Specified"
                                       showDropDowns={true}
                                       selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
                                       readOnlyHeadings={true}
                                       onSelectedItemsChange={this.onSelectedItemsChangecountry}
                                       selectedItems={this.state.country}
                                       styles={{
                                         
                                         selectToggle:{
                                             marginTop:0
                                         },
                                         selectToggleText: {
                                             color: '#333',
                                             zIndex: 10
                                           }
                                       }} 
                                     />
                                     </TouchableOpacity>
                                     <TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.statesdrop]}
          uniqueKey="id"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          searchPlaceholderText="Search State"
          showChips={false}
          subKey="list"
          selectText="Not Specified"

          showDropDowns={true}
          selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20}style={{marginRight:5}} />}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangestate}
          selectedItems={this.state.states}
          styles={{
            
            selectToggle:{
                marginTop:0
            },
            selectToggleText: {
                color: '#333',
                zIndex: 10
              }
          }}   
        />
                                    </TouchableOpacity>
                                    <TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
          <SectionedMultiSelect
         
          
items={[this.state.citydrop]}
uniqueKey="id"
single={true}
searchPlaceholderText="Search City"
showCancelButton={true}
expandDropDowns={true}
selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
showChips={false}
subKey="list"
selectText="Not Specified"

showDropDowns={true}
readOnlyHeadings={true}
onSelectedItemsChange={this.onSelectedItemsChangecity}
selectedItems={this.state.city}

styles={{

selectToggle:{
marginTop:0
},
selectToggleText: {
color: '#333',
zIndex: 10
}
}}        
/>
      </TouchableOpacity>
                            <TextInput style = {styles.input} 
                           
                            autoCorrect={false}
                            returnKeyType="next" 
                            placeholder='Institution' 
                            value={this.state.college}
                            onChangeText={college => this.setState({college})}
                            placeholderTextColor='#a9a9a9'/>
                            <TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                            <SectionedMultiSelect
                                       
                                        
                                       items={[this.state.college_countrydrop]}
                                       uniqueKey="id"
                                       searchPlaceholderText="Search Country"
                                       single={true}
                                       showCancelButton={true}
                                       expandDropDowns={true}
                                       showChips={false}
                                       subKey="list"
                                       selectText="Not Specified"

                                       showDropDowns={true}
                                       selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
                                       readOnlyHeadings={true}
                                       onSelectedItemsChange={this.onSelectedItemsChangecollegecountry}
                                       selectedItems={this.state.college_country}
                                       styles={{
                                         
                                         selectToggle:{
                                             marginTop:0
                                         },
                                         selectToggleText: {
                                             color: '#333',
                                             zIndex: 10
                                           }
                                       }} 
                                     />
                                     </TouchableOpacity>
                                     <TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.college_statesdrop]}
          uniqueKey="id"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          searchPlaceholderText="Search State"
          showChips={false}
          subKey="list"
          selectText="Not Specified"

          showDropDowns={true}
          selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20}style={{marginRight:5}} />}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangecollegestate}
          selectedItems={this.state.college_states}
          styles={{
            
            selectToggle:{
                marginTop:0
            },
            selectToggleText: {
                color: '#333',
                zIndex: 10
              }
          }}   
        />
                                    </TouchableOpacity>
                                    <TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
          <SectionedMultiSelect
         
          
items={[this.state.college_citydrop]}
uniqueKey="id"
single={true}
searchPlaceholderText="Search City"
showCancelButton={true}
expandDropDowns={true}
selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
showChips={false}
subKey="list"
selectText="Not Specified"

showDropDowns={true}
readOnlyHeadings={true}
onSelectedItemsChange={this.onSelectedItemsChangecollegecity}
selectedItems={this.state.college_city}

styles={{

selectToggle:{
marginTop:0
},
selectToggleText: {
color: '#333',
zIndex: 10
}
}}        
/>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.nationalitydrop]}
          uniqueKey="id"
          single={true}
          searchPlaceholderText="Search Nationality"
          showCancelButton={true}
          expandDropDowns={true}
          selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
          showChips={false}
          subKey="list"
          selectText="Not Specified"

          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangenationality}
          selectedItems={this.state.nationality}
          styles={{
            selectToggle:{
                marginTop:0
            },
            
            selectToggleText: {
                color: '#333',
                zIndex: 10
              },
              
          }}        
        />
        </TouchableOpacity>
        {this.state.hasresume?<View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity style={{width:'85%'}}
                                                        onPress={this.uploadcv}>
                                                <Text  style={styles.input2}>Upload your latest Resume</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.input3} onPress={()=>this.downloadFile()}><FontAwesome5
                    raised
                    name='file-download'
                    type='font-awesome5'
                    color='#ccc'
                    
                     size={20}/></TouchableOpacity>
        </View>:<TouchableOpacity
                                                        onPress={this.uploadcv}>
                                                <Text  style={styles.input}>Upload your latest Resume</Text>
                                    </TouchableOpacity>}
         
                             <TouchableOpacity style={styles.buttonContainer} 
                                                        onPress={this.updateProfile}>
                                                <Text  style={styles.buttonText}>Update</Text>
                                    </TouchableOpacity> 
                                    <View style={{height:40}}>
                                        </View>
                       </View>   
                         
                            </ScrollView>
                           
                            
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
    picker:{
        marginBottom:10,
        height: 40,
        backgroundColor: '#fff',
        color: '#333',
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'
    },
    input:{
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: '#333',
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'
    },
    input2:{
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: '#333',
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'
    },
    input3:{
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: '#333',
        width:'15%',
        borderRadius:5,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc'
    },
    
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        textTransform:'uppercase'    
    },
    errors:{
        padding:7,
        borderWidth:1,
        borderColor:'green',
        backgroundColor:"green",
        color:'white',
        marginBottom:4, 
        width:'100%',
        borderRadius:4,
        marginTop:4

    },
    buttonContainer:{
        backgroundColor: '#5a9fff',
        paddingVertical: 10,
        width:'100%',        
        borderRadius:4,
        borderWidth:1,
        borderColor:'#3e89e9',
        marginBottom:100
    },
});

//make this component available to the app
export default EditProfile;
