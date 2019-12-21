import React, { Component } from 'react';
import { Platform, Modal, StyleSheet, Text, View,Button, SafeAreaView,Image,Keyboard, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import JobList from './../jobscoponents/JobList';
import { GetWithToken } from './../../services/GetWithToken';
import { Picker, Form } from "native-base";
import {NavigationEvents} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions, withNavigationFocus } from 'react-navigation';
import AutoTags from 'react-native-tag-autocomplete';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Loader from './../../components/loader/loader';

import { GetWithoutToken } from '../../services/GetWithoutToken';
const{width, height}=Dimensions.get('window');
var skilladd='';
class Jobs extends Component {
    constructor(props){
        super(props);
        this.state={
            jobs:[],
            authtoken:'',
            modalVisible:false,
            categoriess:[],
            filterapply:false,
            locations:[],
            skills:[],
            category:'',
            location:'',
            selectedSkills:[],
            suggestions : [{name:'Skills'},],
            tagsSelected : [],
            skillsdrop:[],
            experiencedrop:[],
            experience:'',
            country: [],
            states:[],
            city:[],
            countryname:'',
            statesname:'',
            cityname:'',
        loading:true,
        countrydrop:[],
        statesdrop:[],
        citydrop:[],
        }
        
        this.getUserData=this.getUserData.bind(this);
        this.getJobsList=this.getJobsList.bind(this);
        
    }
    getUserData=async()=>{
        
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
       // alert(userDetail);
        //console.log(userDetail);
        this.setState({authtoken:userInfo},()=>
            {
               this.getJobsList(); 
               this.getCategories();
               //this.getLocations();
               this.getSkills();
               this.getExperience();
            }
        );
        GetWithoutToken('countries').then((countries)=>{
            console.log(countries)
            this.setState({countrydrop:countries})
           
           })
    }
    handleDelete = index => {
        let tagsSelected = this.state.tagsSelected;
        tagsSelected.splice(index, 1);
        this.setState({ tagsSelected },()=>console.log(this.state.tagsSelected));
    
     }
     
     handleAddition = suggestion => {
         Keyboard.dismiss();
         //console.log(...suggestion);
        this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) },()=>{console.log(JSON.stringify(this.state.tagsSelected));
            
        });
        
    }
    setModalVisible(visible) {
        //this.getPostList();
        this.setState({modalVisible: visible});
      }
    getJobsList=()=>{
        GetWithToken('jobs', this.state).then((result)=>{
            if(result.status===200){
                this.setState({jobs:result.data.jobs,filterapply:false,categories:'',countryname:'',statesname:'',cityname:'',selectedSkills:[],tagsSelected:[],loading:false})
                console.log(this.state.jobs);
            }
        })
        
    }
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
     

// get categories
    getCategories=()=>{
        GetWithToken('jobs/categories', this.state).then((result)=>{
            if(result.status===200){
                this.setState({categoriess:result.data})
                console.log(this.state.categoriess);
            }
        })
    }
// get location
// getLocations=()=>{
//     GetWithToken('jobs/location', this.state).then((result)=>{
//         if(result.status===200){
//             this.setState({locations:result.data})
//             console.log(this.state.locations);
//         }
//     })
// }


// search jobs
jobSearch=()=>{
    var skill_data="";
            for(var i=0;i<this.state.skills.length;i++)
            {
                skill_data=skill_data+this.state.skills[i]+","
            }
    
        GetWithToken('jobs?countryname='+this.state.countryname+'&statesname='+this.state.statesname+'&cityname='+this.state.cityname+'&skills='+skill_data+'&categories='+this.state.categories+'&experience='+this.state.experience,{authtoken:this.state.authtoken}).then((result)=>{
        if(result.status===200){
            this.setState({jobs:result.data.jobs,filterapply:true,modalVisible:false,country:[],states:[],city:[],countryname:'',statesname:'',cityname:'',skills:[],experience:'',categories:''})
            console.log(this.state.jobs);
        }
    })

    
}
// get skills
getSkills=()=>{
    GetWithoutToken('jobs/skills', this.state).then((result)=>{
        
            this.setState({skillsdrop:result})
            
        
    })
}
// get experience
getExperience=()=>{
GetWithoutToken('jobs/experience').then((exp)=>{
    console.log("Exp is",exp)
    this.setState({experiencedrop:exp.data})
   
   })
}

onSelectedItemsChangeskills = (selectedItems) => {
    this.setState({ skills:selectedItems});
   
  };
    componentDidMount(){       
        this.getUserData();
        
    }
    static navigationOptions =(navigation)=> ({
        title: 'My app',
        headerRight: (
          <Button
            onPress={() => navigation.navigate('Login')}
            title="List"
          />
        )
    })
      
    make_list2(){
        d = this.state.experiencedrop.map((data) => {
            return (
                <Picker.Item label={data.label} value={data.value}/>
            )
        })
        if(Platform.OS === 'android'){
            d.unshift(<Picker.Item label="Select Experience" />)
        }
        return d;
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
       var modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      };
      var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20,width:width-30,
      borderRadius:4};
     return(
         <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                   
                    
               <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    {/* <Icon
                    name='ios-menu'
                    type='ionicon'
                    color='#fff'
                     size={30}/> */}
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>JOBS</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    
                        <TouchableOpacity style={{paddingHorizontal:15}} onPress={() => {
            this.setModalVisible(true);
          }}>
                        <Icon
                    name='ios-search'
                    type='ionicon'
                    color='#fff'
                     size={23}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    {
                        (this.state.filterapply)?
                        <View style={{borderBottomWidth:10,borderTopWidth:10,height:40,borderColor:'#ecf0f1',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:15}}>
                        <Text>Search Filter Applied</Text>
                        <TouchableOpacity onPress={this.getJobsList}>
                            <Text>Remove Filter</Text>
                        </TouchableOpacity>
                    </View>
                        :null
                    }
                    {
                    (this.state.jobs)?
                    <View style={{flex:1,backgroundColor:'#dddddd'}}>
                        <NavigationEvents onDidFocus={ this.getUserData} />
                        <ScrollView
                        scrollEventThrottle={16} showsVerticalScrollIndicator={false}
                        >
                        {
                            this.state.jobs.map((job,index)=>{
                                //var obj=job.location;
                                var skillobjlength=Object.keys(job.skills).length;
                                var skillobj=job.skills;
                                var skills='';
                                for(let i=0;i<skillobjlength;i++){
                                    skills+=skillobj[Object.keys(skillobj)[i]]+', '
                                }
                                var logo=''
                                if(job.logo==='0')
                                {
                                    var logo='https://www.logoground.com/uploads/z4110148Dummy.jpg'
                                }
                                else
                                {
                                    var logo=job.logo.image.file
                                }
                                // var val=obj[Object.keys(obj)[0]];
                                // if(val!=='undefined' || val!=='' || val!==null)
                                // var location=val;
                                // else
                                // var location=''
                                return(
                                <JobList width={width} key={job.ID} id={job.ID} title={job.title} skills={skills} company_logo={logo} company={job.simple_job_board_company_name} applied={job.applied} location={job.location}/>            
                                )
                            })
                        }
                        </ScrollView>
                    </View>:<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{color:'#000'}}>No Jobs Found!</Text></View>
        
                    }
                    </View>

                    <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.modalVisible}
          >
              

          <View style={[styles.containers, modalBackgroundStyle]}>
            <View style={innerContainerTransparentStyle}>
              <View style={{flexDirection:'row',fontSize:16,color:'#0078d7',marginBottom:10}}>
              <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.setState({categories:undefined,experience:'',skills:[],country:[],city:[],states:[]})
                }} style={{fontSize:16,marginRight:15}}>
                    <Text>X</Text>
                    </TouchableOpacity> 
                    <Text style={{fontSize:16,color:'#0078d7'}}>Search Job</Text>
              </View>
                          <ScrollView scrollEventThrottle={400}>
              <View style={{flexDirection: 'column'}}>
                                <Text>Category</Text>
                                <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,marginBottom:10}}>
                                
                                <Picker
                                selectedValue={this.state.categories}
                                
                                style={{height:40}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({categories: itemValue})
                                }>
                                    {
                                        <Picker.Item  label="Select Category" value='' />
                                    }
                                {
                                (this.state.categoriess)?
                                this.state.categoriess.map((category,index)=>{                                       
                                return(
                                <Picker.Item label={category.label} value={category.value} />
                                )}):null}
                                </Picker>   
                                </View>
                                <Text>Location</Text>
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
                                <View style={{position:'relative'}}> 
                                <Text>Skills</Text>
                                <TouchableOpacity  style={[styles.input,{justifyContent:'center'}]}>
<SectionedMultiSelect
items={[this.state.skillsdrop]}
uniqueKey="id"
searchPlaceholderText="Search Skills"

showCancelButton={true}
expandDropDowns={true}
showChips={false}
subKey="list"
selectText="Select Skills"
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

                                {/* <AutoTags
                            suggestions={this.state.suggestions}
                            tagsSelected={this.state.tagsSelected}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            tagsOrientedBelow={true}
                            placeholder="Select Skills" />  */}
                           
                            <TouchableOpacity onPress={this.jobSearch} style={styles.buttonContainer} >
                <Text  style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                            <View style={{height:40}}>

                            </View>
                            </View>
                            
</View>
</ScrollView>
</View>
</View>


</Modal>

     </SafeAreaView>
     )}
}
    export default withNavigationFocus(Jobs);
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containers: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        
      },
      autocompleteContainer: {
        overflow: 'visible',
        position: 'relative',
        zIndex: 999,
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
    },buttonContainer:{
        backgroundColor: '#5a9fff',
        paddingVertical: 10,
        width:'100%',        
        borderRadius:4,
        borderWidth:1,
        borderColor:'#3e89e9',
        marginVertical:15
    },buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        textTransform:'uppercase'    
    }
});