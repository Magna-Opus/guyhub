import React, { Component } from 'react';
import { Platform,  StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, ActivityIndicator,Dimensions,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from 'react-native-paper'
import Entypo from 'react-native-vector-icons/Entypo';
import { RadioButton } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Loader from './../../components/loader/loader';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Picker, Form } from "native-base";
import ImagePicker from 'react-native-image-picker';
import { RegisterData } from './../../services/RegisterData';
import { GetWithoutToken } from './../../services/GetWithoutToken';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import RNFetchBlob from 'react-native-fetch-blob';
import pick from './../../services/ImagePicker';
const{width, height}=Dimensions.get('window');
export default class Userinfo extends Component {
    constructor(props){
        super(props);        
        this.handleChooseImage=this.handleChooseImage.bind(this);
        this.handleRegisterUser=this.handleRegisterUser.bind(this);
       this.state={
        loading:false,
        currentDate:'',
        nationality:[],
        country: [],
        states:[],
        city:[],
        privacy:'',
        countrydrop:[],
        statesdrop:[],
        citydrop:[],
        nationalitydrop:[],
        errors:'',
        photo:'',
        username:'',
        email:'',
        name:'',
        password:'',
        confirm:'',
        dob:'',
        gender:'',
        mobile:'',
        college:'',
        profile_image:'',
        errortype:null,
        data:null,
        uri:'',
        selectedValue:undefined,
        college_country: [],
        college_states:[],
        college_city:[],
        
        college_countrydrop:[],
        college_statesdrop:[],
        college_citydrop:[],
       }
    }

    onSelectedItemsChangenationality = (selectedItems) => {
        this.setState({ nationality:selectedItems });
        console.log(selectedItems[0])
      };
    
    onSelectedItemsChangecountry = (selectedItems) => {
        this.setState({ country:selectedItems});
        this.setState({states:''})
        this.setState({city:''})
        GetWithoutToken('states/'+selectedItems).then((states)=>{
            console.log(states)
            this.setState({statesdrop:states})
           
           })
      };
      onSelectedItemsChangestate = (selectedItems) => {
        this.setState({ states:selectedItems});
        this.setState({city:''})
        GetWithoutToken('cities/'+selectedItems).then((city)=>{
            console.log(city)
            this.setState({citydrop:city})
           
           })
      };
      onSelectedItemsChangecity = (selectedItems) => {
        this.setState({ city:selectedItems });
      };

      onSelectedItemsChangecollegecountry = (selectedItems) => {
        this.setState({ college_country:selectedItems});
        this.setState({college_states:''})
        this.setState({college_city:''})
        GetWithoutToken('states/'+selectedItems).then((states)=>{
            console.log(states)
            this.setState({college_statesdrop:states})
           
           })
      };
      onSelectedItemsChangecollegestate = (selectedItems) => {
        this.setState({ college_states:selectedItems});
        this.setState({college_city:''})
        GetWithoutToken('cities/'+selectedItems).then((city)=>{
            console.log(city)
            this.setState({college_citydrop:city})
           
           })
      };
      onSelectedItemsChangecollegecity = (selectedItems) => {
        this.setState({ college_city:selectedItems });
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
    
    
      //register function
      handleRegisterUser=async()=>{
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            
            if(this.state.name==='')
            {
              this.setState({errors:'Name is Required'});
          }
            else if(this.state.email==='')
            {
              this.setState({errors:'Email is Required'});
          }
            
            else if(this.state.username==='')
            {
              this.setState({errors:'Username is Required'});
          }
            else if(this.state.password==='')
            {
              this.setState({errors:'Password is Required'});
          }
          else if(this.state.confirm==='')
            {
              this.setState({errors:'Confirm Password is Required'});
          }
            else if(this.state.photo==='' )
            {
                this.setState({errors:'Profile Picture is Required'});
            }
            else if(this.state.password!==this.state.confirm)
            {
                this.setState({errors:'Password Mismatch'});
            }
            else if(reg.test(this.state.email) == false)
            {
                this.setState({errors:'Invalid Email'});
            }
            else if(this.state.privacy==='')
            {
              this.setState({errors:'Please Agree to the Privacy Policy'});
            }
            else
            {
             
                
                var data=new FormData;
                if(this.state.mobile==='')
                data.append('mobile','0000000000');
                else
                data.append('mobile',this.state.mobile);
                if(this.state.dob==='')
                data.append('dob','0001-01-01');
                else
                data.append('dob',this.state.dob);

                if(this.state.gender==='' )
                data.append('gender','Others');
                else
                data.append('gender',this.state.gender);

                if(this.state.country.length===0)
                data.append('country_id','0');
                else
                data.append('country_id',this.state.country[0]);

                if(this.state.states.length===0)
                data.append('state_id','0');
                else
                data.append('state_id',this.state.states[0]);

                if(this.state.city.length===0)
                data.append('city_id','0');
                else
                data.append('city_id',this.state.city[0]);

                if(this.state.nationality.length===0)
                data.append('nationality_id','0');
                else
                data.append('nationality_id',this.state.nationality[0]);

                if(this.state.college==='')
                data.append('college','Not Specified');
                else
                data.append('college',this.state.college);

                if(this.state.college_country.length===0)
                data.append('college_country','0');
                else
                data.append('college_country',this.state.college_country[0]);

                if(this.state.college_states.length===0)
                data.append('college_state','0');
                else
                data.append('college_state',this.state.college_states[0]);

                if(this.state.college_city.length===0)
                data.append('college_city','0');
                else
                data.append('college_city',this.state.college_city[0]);

                data.append('name',this.state.name);
                data.append('email',this.state.email);
                data.append('username',this.state.username);
                data.append('password',this.state.password);
                data.append('profile_image',{ uri: this.state.photo.uri, name: Math.round(Math.random() * 100000000) +'profile_photo.jpg', type: 'image/jpg' });
                this.setState({loading:true})
                RegisterData('create',data).then((data)=>{
                if(data.status!==201)
                {       
                  this.setState({loading:false})

                    console.log(data)            
                    this.setState({errors:data.message});
                    
                }
                else{  
                  this.setState({loading:false})

                    console.log(data)
                    this.setState({errors:data.message});             
                    
                }
            })
        }
        }
      
      
          
          componentWillMount(){
           
          }
        componentDidMount() {
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
            this.currentDate();
          }
          
      handleChooseImage=()=>{
        pick((source, data)=>this.setState({photo:source, data:data},()=>console.log("Image data",this.state.data)))

      }




      showState=()=>{
        console.log(this.state);
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
        const {photo}=this.state;        
     return(
         
         <SafeAreaView style={{flex:1}}>
         <KeyboardAwareScrollView>
                <View style={styles.container}>
                <View style={{paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                   <TouchableOpacity onPress={()=>Actions.pop()}><View><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30}/>
                     </View> 
                     </TouchableOpacity>
                        <Text style={{width:'100%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>REGISTRATION</Text>
                    </View>
                    </View>
                    <View style={{width:width,justifyContent: 'center',paddingHorizontal:15}}>
                    { 
                                (this.state.errors)?
                                <Text style={styles.errors}>{this.state.errors}</Text>
                                :null
                               }

                    <View style={{flexDirection:'row',justifyContent:'center',height:120,alignItems:'center'}}>
                            {(photo)?(
                                <Image source={{uri:photo.uri}} resizeMode="cover" style={{width:100,height:100,borderRadius:50}}/>
                            ):<Image source={require('./../../src/images/profile_usr_pholder.png')} resizeMode="contain" style={{width:100,height:100,borderRadius:30}}/>
                            }
                            <TouchableOpacity onPress={this.handleChooseImage} style={{width:30,height:30,backgroundColor:'white',marginTop:-50,marginLeft:-20,borderRadius:30,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Icon name="ios-create" type="ionicon" size={20} />
                            </TouchableOpacity>
                    </View>
                    <Text style={{color:'#0078d7',width:'100%',marginBottom:10,textAlign:'center'}}>* Some fields are optional but they are needed to find perfect matches with respect to your age, gender, nationality and education level etc.</Text>

                    <ScrollView scrollEventThrottle={16}> 
                    
                    <View style={{marginLeft:15,marginRight:15,marginBottom:60}}>
                    <TextInput style = {styles.input} 
                                   
                                    autoCorrect={false}
                                    returnKeyType="next" 
                                    placeholder='Name' 
                                    onChangeText={name => this.setState({name})}
                                    placeholderTextColor='#a9a9a9'/>
                <TextInput style = {styles.input} 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next" 
                                    placeholder='Username' 
                                    onChangeText={username => this.setState({username})}
                                    placeholderTextColor='#a9a9a9'/>

                                <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                    autoCorrect={false} 
                                    returnKeyType="next" 
                                    keyboardType='email-address'
                                    placeholder='Email ID' 
                                    onChangeText={email => this.setState({email})}
                                    placeholderTextColor='#a9a9a9'/>
                                <TextInput style = {styles.input} 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                     
                                    placeholder='Password' 
                                    secureTextEntry
                                    onChangeText={password => this.setState({password})}
                                    placeholderTextColor='#a9a9a9'/>

                                    <TextInput style = {styles.input} 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                     
                                    placeholder='Confirm Password' 
                                    secureTextEntry
                                    onChangeText={confirm => this.setState({confirm})}
                                    placeholderTextColor='#a9a9a9'/>
                                    <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                    autoCorrect={false} 
                                    keyboardType='number-pad'
                                    maxLength={15}
                                    returnKeyType="next" 
                                    placeholder='Mobile Number (optional)' 
                                    onChangeText={mobile => this.setState({mobile})}
                                    placeholderTextColor='#a9a9a9'/>
                                    <DatePicker
                                        style={styles.input}
                                        date={this.state.dob}
                                        mode="date"
                                        placeholder="DOB (optional)"
                                        maxDate={this.state.currentDate}
                                        format="YYYY-MM-DD"
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
                                    <Text style={{color:'#a9a9a9'}}>Gender (optional)</Text>
                                    <View style={{flexDirection:'row',marginBottom:60,justifyContent:'flex-start',height:40,marginBottom:10,alignItems:'center'}}>
                                        <RadioButton.Group
                                        
                                        onValueChange={gender => this.setState({ gender })}
                                        value={this.state.gender}
                                    >
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                        <RadioButton value="Male" style={{marginRight:3}} color='#0078d7'/>          
                                        <Text>Male</Text>
                                        </View>
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                        <RadioButton value="Female" style={{marginRight:3}} color='#0078d7'/>          
                                        <Text>Female</Text>
                                        </View>
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15}}>
                                        <RadioButton value="Others" style={{marginRight:3}} color='#0078d7'/>          
                                        <Text>Not Specified</Text>
                                        </View>
                                    </RadioButton.Group>
                                        </View>
                                        

                                        {this.state.country.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.countrydrop]}
          uniqueKey="id"
          searchPlaceholderText="Search Country"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          showChips={false}
          subKey="list"
          selectText="Country (optional)"
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
                color: '#a9a9a9',
                zIndex: 10
              }
          }} 
        />
                                    </TouchableOpacity>:<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.countrydrop]}
          uniqueKey="id"
          searchPlaceholderText="Search Country"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          showChips={false}
          subKey="list"
          selectText="Country (optional)"
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
                                    </TouchableOpacity>}
                              

                                    {this.state.states.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.statesdrop]}
          uniqueKey="id"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          searchPlaceholderText="Search State"
          showChips={false}
          subKey="list"
          selectText="State (optional)"
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
                color: '#a9a9a9',
                zIndex: 10
              }
          }}   
        />
                                    </TouchableOpacity>:<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.statesdrop]}
          uniqueKey="id"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          searchPlaceholderText="Search State"
          showChips={false}
          subKey="list"
          selectText="State (optional)"
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
                                    </TouchableOpacity>}
                                    {this.state.city.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
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
          selectText="City (optional)"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangecity}
          selectedItems={this.state.city}
          
          styles={{
            
            selectToggle:{
                marginTop:0
            },
            selectToggleText: {
                color: '#a9a9a9',
                zIndex: 10
              }
          }}        
        />
                                    </TouchableOpacity>
          :<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
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
selectText="City (optional)"
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
}
                                                              {this.state.nationality.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
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
          selectText="Nationality (optional)"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangenationality}
          selectedItems={this.state.nationality}
          styles={{
            selectToggle:{
                marginTop:0
            },
            
            selectToggleText: {
                color: '#a9a9a9',
                zIndex: 10
              },
              
          }}        
        />
        </TouchableOpacity>:<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
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
          selectText="Nationality (optional)"
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
        </TouchableOpacity>}
        <TextInput style = {styles.input} 
                                   
                                    autoCorrect={false}
                                    returnKeyType="next" 
                                    placeholder='Name of Educational Institute (optional)' 
                                    onChangeText={college => this.setState({college})}
                                    placeholderTextColor='#a9a9a9'/>
                                    {this.state.college_country.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.college_countrydrop]}
          uniqueKey="id"
          searchPlaceholderText="Search Country"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          showChips={false}
          subKey="list"
          selectText="College Country (optional)"
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
                color: '#a9a9a9',
                zIndex: 10
              }
          }} 
        />
                                    </TouchableOpacity>:<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.college_countrydrop]}
          uniqueKey="id"
          searchPlaceholderText="Search Country"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          showChips={false}
          subKey="list"
          selectText="College Country (optional)"
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
                                    </TouchableOpacity>}
                              

                                    {this.state.college_states.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.college_statesdrop]}
          uniqueKey="id"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          searchPlaceholderText="Search State"
          showChips={false}
          subKey="list"
          selectText="College State (optional)"
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
                color: '#a9a9a9',
                zIndex: 10
              }
          }}   
        />
                                    </TouchableOpacity>:<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.college_statesdrop]}
          uniqueKey="id"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          searchPlaceholderText="Search State"
          showChips={false}
          subKey="list"
          selectText="College State (optional)"
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
                                    </TouchableOpacity>}
                                    {this.state.college_city.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
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
          selectText="College City (optional)"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangecollegecity}
          selectedItems={this.state.college_city}
          
          styles={{
            
            selectToggle:{
                marginTop:0
            },
            selectToggleText: {
                color: '#a9a9a9',
                zIndex: 10
              }
          }}        
        />
                                    </TouchableOpacity>
          :<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
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
selectText="College City (optional)"
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
}
<View style={{flexDirection:'row',marginBottom:60,justifyContent:'flex-start',height:40,marginBottom:10,alignItems:'center'}}>
                                        <RadioButton.Group
                                        
                                        onValueChange={privacy => this.setState({ privacy })}
                                        value={this.state.privacy}
                                    >
                                        <View style={{flexDirection:'row',height:40,alignItems:'center',marginRight:15,}}>
                                        <RadioButton value="yes" style={{marginRight:3}} color='#0078d7'/>          
                                        <View style={{width:'100%',flexDirection:'row'}}><Text>I Agree to the </Text><TouchableOpacity onPress={()=>Actions.privacypolicy()}><Text style={{color:'blue'}}>Privacy Policy </Text></TouchableOpacity><Text>of GuyHub.</Text></View>
                                       
                                        </View>
                                        
                                        </RadioButton.Group>
                                        </View>
                                       
        <TouchableOpacity style={[styles.buttonContainer,{marginBottom:200,marginTop:40}]} 
                                                        onPress={()=>this.handleRegisterUser()} >
                                                <Text  style={styles.buttonText}>SIGN UP</Text>
                                    
                                    </TouchableOpacity>
                                    
                                    </View>
                                   
                                    
                                    </ScrollView>
                                    
                </View>
                 
                </View>
                {/* <View style={{height:60,backgroundColor:'white',paddingHorizontal:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                   <View >
                       <TouchableOpacity underlayColor='blue'>
                        <Image  source={require('./../../src/images/back_arrow_deactive.png')} resizeMode="contain" style={{width:30}}/> 
                        </TouchableOpacity> 
                        </View>                       
                      <Text style={{textAlign:'center',width:70}}>1/14</Text>
                      <View 
                        title={"Back"}>  
                          {
                            
                            <TouchableOpacity underlayColor='blue' onPress={()=> this.handleRegisterUser()}>
                                <Image source={require('./../../src/images/next_ico.png')} resizeMode="contain" style={{width:30}}/> 
                            </TouchableOpacity>
                            
                          }                
                            
                        </View>
                 </View>  */}
                 </KeyboardAwareScrollView>
     </SafeAreaView>
     )}
}
    
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
    buttonContainer:{
        backgroundColor: '#5a9fff',
        paddingVertical: 10,
        width:'100%',        
        borderRadius:4,
        borderWidth:1,
        borderColor:'#3e89e9'
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        textTransform:'uppercase'    
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
     },
    errors:{
        padding:7,
        borderWidth:1,
        borderColor:'#eccdcd',
        backgroundColor:'#eccdcd',
        color:'#bf2d23',
        marginBottom:4, 
        width:'100%',
        borderRadius:4,
        marginTop:4

    }
});