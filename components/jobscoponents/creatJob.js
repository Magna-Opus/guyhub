//import liraries
import React, { Component } from 'react';
import { Platform,  StyleSheet, Text,TextInput, View, SafeAreaView,Image, ImageBackground, TouchableOpacity, ScrollView, Dimensions ,KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { PostImageData } from './../../services/PostImageData';
import { GetWithoutToken } from './../../services/GetWithoutToken';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {launchImageLibrary} from 'react-native-image-picker';

import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

import { Actions } from 'react-native-router-flux';
import { Picker, Form } from "native-base";
const backimage = require('../../src/images/strip_bg.png')


const{width, height}=Dimensions.get('window');

// create a component
export default class createJob extends Component {
    constructor(props){
        super(props);
        this.state={
            error:'',
            currentDate:'',
            interviewDate:'',
            title:'',
            description:'',
            company_name:'',
            post_image:'',
            websiteurl:'',
            category:'',
            experience:'',
            skills:[],
            mobile:'',
            email:'',
            hr_name:'',
            salary:'',
            categorydrop:[],
            skillsdrop:[],
            experiencedrop:[],
            currencydrop:[],
            country: [],
            states:[],
            city:[],
            countryname:'',
            statesname:'',
            cityname:'',
        
        countrydrop:[],
        statesdrop:[],
        citydrop:[],
            currency:''
        }
    }

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


    onSelectedItemsChangeskills = (selectedItems) => {
        this.setState({ skills:selectedItems});
       
      };

      onSelectedItemsChangecountry = (selectedItems) => {
        this.setState({ country:selectedItems,countryname:selectedItems[0]});
        this.setState({states:'',statesname:''})
        this.setState({city:'',cityname:''})
        GetWithoutToken('states/'+selectedItems).then((states)=>{
            console.log(states)
            this.setState({statesdrop:states})
           
           })
      };
      onSelectedItemsChangestate = (selectedItems) => {
        this.setState({ states:selectedItems,statesname:selectedItems[0]});
        this.setState({city:'',cityname:''})
        GetWithoutToken('cities/'+selectedItems).then((city)=>{
            console.log(city)
            this.setState({citydrop:city})
           
           })
      };
      onSelectedItemsChangecity = (selectedItems) => {
        this.setState({ city:selectedItems,cityname:selectedItems[0] });
      };
     

    async componentDidMount(){
        var userInfo=await AsyncStorage.getItem('token');
       
         this.setState({authtoken:userInfo});
         console.log(this.state.authtoken)
        this.currentDate();
        GetWithoutToken('jobs/categories').then((category)=>{
            console.log(category)
            this.setState({categorydrop:category.data})
           
           })
        GetWithoutToken('jobs/skills').then((category)=>{
            console.log(category)
            this.setState({skillsdrop:category})
           
           })
           GetWithoutToken('jobs/experience').then((exp)=>{
            console.log(exp)
            this.setState({experiencedrop:exp.data})
           
           })
           GetWithoutToken('currencies').then((loc)=>{
            console.log(loc)
            this.setState({currencydrop:loc})
           
           })
           GetWithoutToken('countries').then((countries)=>{
            console.log(countries)
            this.setState({countrydrop:countries})
           
           })
    }

    createJobs=()=>{
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var expression =  
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi; 
        if((this.state.websiteurl).match(expression))
        {
             if(this.state.company_name==''||this.state.description==''||this.state.hr_name==''||this.state.email==''||this.state.title==''||this.state.category==''||this.state.skills.length==0||this.state.mobile==''||this.state.experience==''||this.state.interviewDate==''||this.state.salary==''||this.state.post_image==''||this.state.currency==''||this.state.statesname=='',this.state.countryname==''||this.state.cityname=='')
         {
             this.setState({errors:'Fill all Fields'}); 
         }
         else if(reg.test(this.state.email) == false)
            {
                this.setState({errors:'Invalid Email'});
            }
         else{
            debugger;
            var data=new FormData;
            var skill_data="";
            for(var i=0;i<this.state.skills.length;i++)
            {
                skill_data=skill_data+this.state.skills[i]+","
            }
            console.log("Skill data ",skill_data)
            data.append('website',this.state.websiteurl);
            data.append('company_name',this.state.company_name);
            data.append('content',this.state.description);
            data.append('title',this.state.title);
            data.append('category',this.state.category);
            data.append('skills',skill_data);
            data.append('mobile',this.state.mobile);
            data.append('experience',this.state.experience);
            data.append('interview_date',this.state.interviewDate)
            data.append('currency',this.state.currency)
            data.append('country',this.state.countryname)
            data.append('states',this.state.statesname)
            data.append('city',this.state.cityname)
            data.append('salary',this.state.salary)
            data.append('hremail',this.state.email)
            data.append('hrname',this.state.hr_name)
            data.append('company_logo', { uri: this.state.post_image, name: Math.round(Math.random() * 100000000) +'screenshot.jpg', type: 'image/jpg' });
            PostImageData('jobs/create',data,this.state.authtoken).then((data)=>{
                console.log("my new data is: ",data)
               
                if(data.status===201){
                 
                
               
                this.setState({errors:data.message})
                Actions.dashboard()

                
        }
        else
        {
            console.log("my data is: ",data)
        this.setState({errors:data.message}); 
        }
        }) 
    }
}
    else
    {
        alert("Enter a valid url")
    }   
    }

    make_list(){
        d = this.state.categorydrop.map((data) => {
            return (
                <Picker.Item label={data.label} value={data.value}/>
            )
        })
        if(Platform.OS === 'android'){
            d.unshift(<Picker.Item label="Category" />)
        }
        return d;
    }

    make_list2(){
        d = this.state.experiencedrop.map((data) => {
            return (
                <Picker.Item label={data.label} value={data.value}/>
            )
        })
        if(Platform.OS === 'android'){
            d.unshift(<Picker.Item label="Experience" />)
        }
        return d;
    }

    make_list3(){
        d = this.state.currencydrop.map((data) => {
            return (
                <Picker.Item label={data.label} value={data.value}/>
            )
        })
        if(Platform.OS === 'android'){
            d.unshift(<Picker.Item label="Currency" />)
        }
        return d;
    }

   
    onValueChange1(value: string) {
        this.setState({
            category: value
        });
    
    }

    handleChooseImage=()=>{
        const options={
            noData:true
        }
        launchImageLibrary(options, response=>{
            //console.log('response', response);
            if(response.uri){
                
                this.setState({post_image:response.uri},()=>console.log("Log image",this.state.post_image))
                
            }
        })

    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                        <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                   <TouchableOpacity onPress={()=>Actions.pop()}><View><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30}/>
                     </View> 
                     </TouchableOpacity>
                        <Text style={{width:'70%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>POST A JOB</Text>
                    </View>
                    </View>
                    <View style={{width:width,justifyContent: 'center',paddingHorizontal:15}}>
                    { 
                    (this.state.errors)?
                    <Text style={styles.errors}>{this.state.errors}</Text>
                    :null
                    }
                    
                    <ScrollView scrollEventThrottle={16}>
                    <View style={{marginLeft:15,marginTop:20,marginRight:15,marginBottom:60}}>
                    <Text>Job Title</Text>
                    <TextInput style = {styles.input} 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next" 
                                    value={this.state.title}
                                    placeholder='Job Title' 
                                    onChangeText={(text) => this.setState({title:text})}
                                    placeholderTextColor='#a9a9a9'/>
                                   
                                   <Text>Job Category</Text>

<View style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,marginBottom:10,backgroundColor:'white'}}><Picker
  selectedValue={this.state.category}
  placeholder="Category"
  style={{height:40}}
  placeholderStyle={{ color: '#a9a9a9',fontSize:14,}}
  onValueChange={this.onValueChange1.bind(this)} >
  { this.make_list() }

</Picker>   
</View>
<Text>Skills Required</Text> 
{this.state.skills.length==0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} >
<SectionedMultiSelect


items={[this.state.skillsdrop]}
uniqueKey="id"
searchPlaceholderText="Search Skills"

showCancelButton={true}
expandDropDowns={true}
showChips={false}
subKey="list"
selectText="Skills"
showDropDowns={true}
selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
readOnlyHeadings={true}
onSelectedItemsChange={this.onSelectedItemsChangeskills}
selectedItems={this.state.skills}
styles={{

selectToggle:{
marginTop:0,
},
selectToggleText: {
color: '#a9a9a9',
zIndex: 10
}
}} 
/>
</TouchableOpacity>:<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]}>
<SectionedMultiSelect
items={[this.state.skillsdrop]}
uniqueKey="id"
searchPlaceholderText="Search Skills"

showCancelButton={true}
expandDropDowns={true}
showChips={false}
subKey="list"
selectText="Skills"
showDropDowns={true}
selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
readOnlyHeadings={true}
onSelectedItemsChange={this.onSelectedItemsChangeskills}
selectedItems={this.state.skills}
styles={{

selectToggle:{
marginTop:0,
},
selectToggleText: {
color: '#333',
zIndex: 10
}
}} 
/>
</TouchableOpacity>
}
<Text>Experience</Text>

<View style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,marginBottom:10,backgroundColor:'white'}}><Picker
  selectedValue={this.state.experience}  
  placeholder="Experience"
  style={{height:40}}
  placeholderStyle={{ color: '#a9a9a9',fontSize:14,marginLeft:10  }}
  onValueChange={(value)=>this.setState({experience:value})}>

{ this.make_list2() }

              

</Picker>   
</View> 

<Text>Salary(monthly)</Text>

                <TextInput style = {styles.input} 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next" 
                                    keyboardType='numeric'
                                    placeholder='Salary'
                                    value={this.state.salary} 
                                    onChangeText={(text) => this.setState({salary:text})}
                                    placeholderTextColor='#a9a9a9'/>
                                    <Text>Currency</Text>
                                    <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,marginBottom:10,backgroundColor:'white'}}><Picker
  selectedValue={this.state.currency}  
  placeholder="Currency"
  style={{height:40}}
  placeholderStyle={{ color: '#a9a9a9',fontSize:14,marginLeft:10  }}
  onValueChange={(value)=>{this.setState({currency:value})}}>

{ this.make_list3() }

              

</Picker>   
</View> 
                    <Text>Job Location</Text>

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
          selectText="Country"
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
          selectText="Country"
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
          selectText="State"
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
          selectText="State"
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
          selectText="City"
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
selectText="City"
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

<Text>Company Name</Text>

                                <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                    autoCorrect={false} 
                                    returnKeyType="next" 
                                    value={this.state.company_name}
                                    placeholder='Company Name' 
                                    onChangeText={(text) => this.setState({company_name:text})}
                                    placeholderTextColor='#a9a9a9'/>

<Text>Company Website</Text>

<TextInput style = {styles.input} 
    autoCapitalize="none" 
    autoCorrect={false} 
    returnKeyType="next" 
    value={this.state.websiteurl}
    placeholder='Company Website' 

    onChangeText={(text) => this.setState({websiteurl:text})}
    placeholderTextColor='#a9a9a9'/>
    <Text>Company Contact Number</Text>

<TextInput style = {styles.input} 
    autoCapitalize="none" 
    autoCorrect={false} 
    returnKeyType="next" 
    maxLength={15}
    keyboardType='phone-pad'
    value={this.state.mobile}
    placeholder='Contact Number' 
    onChangeText={(text) => this.setState({mobile:text})}
    placeholderTextColor='#a9a9a9'/>
    <Text>HR Name</Text>

<TextInput style = {styles.input} 
    autoCapitalize="none" 
    autoCorrect={false} 
    returnKeyType="next" 
    value={this.state.hr_name}
    placeholder='HR Name' 
    onChangeText={(text) => this.setState({hr_name:text})}
    placeholderTextColor='#a9a9a9'/>
        <Text>HR Email ID</Text>

    <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                    autoCorrect={false} 
                                    returnKeyType="next" 
                                    keyboardType='email-address'
                                    placeholder='Email ID' 
                                    onChangeText={email => this.setState({email})}
                                    placeholderTextColor='#a9a9a9'/>
                              <Text>Interview Date</Text>

                               <DatePicker
        style={styles.input}
        date={this.state.interviewDate}
        mode="date"
        placeholder="Interview Date"
        format="YYYY-MM-DD"
        value={this.state.interviewDate}
        minDate={this.state.currentDate}
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
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({interviewDate: date})}}
      />
      <Text>Job Description</Text>

                                    <TextInput style = {styles.input2} 
                                    autoCapitalize="none" 
                                    autoCorrect={false} 
                                    returnKeyType="next" 
                                    value={this.state.description}
                                    placeholder='Job Description' 
                                    onChangeText={(text) => this.setState({description:text})}
                                    placeholderTextColor='#a9a9a9'/>
                                    
                                   {this.state.post_image==''?<ImageBackground source={backimage} resizeMode="cover" style={{width:'100%',height:60,marginBottom:10}}>
                                        <TouchableOpacity onPress={this.handleChooseImage} style={{width:'100%',height:40,flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <Text>Choose Company Logo</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>:<View  style={{width:'100%',flex:1,}}>
                                    <Text>Company Logo</Text>
                                    <TouchableOpacity onPress={this.handleChooseImage} style={{width:'100%',flex:1,}}>
                                            <Image source={{uri:this.state.post_image}} style={{height:100, width:100, borderRadius:50,alignSelf:'center',marginBottom:20}}/>
                                        </TouchableOpacity></View>}
                                    

                                    <TouchableOpacity onPress={()=>this.createJobs()} style={styles.buttonContainer} 
                                    disabled={this.state.disabledLogin}>
                                    <Text  style={styles.buttonText}>SUBMIT</Text>
                                    </TouchableOpacity>
                                    </View>
                                    </ScrollView>

                </View>
                
                </SafeAreaView>
        );
    }
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
        paddingLeft:16,
        fontSize:16,
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'
    },input2:{
        height: 100,
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingLeft:16,
        fontSize:16,
        padding: 10,
        color: '#333',
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'},
    buttonContainer:{
        backgroundColor: '#5a9fff',
        paddingVertical: 10,
        marginBottom:250,
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

//make this component available to the app

