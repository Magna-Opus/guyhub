//import liraries
import React, { Component } from 'react';
import { Platform,TextInput,  StyleSheet, Text, View,Button, SafeAreaView,Image,Keyboard, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import UserList from './../connectioncomponent/UserList';
import {PostWithToken } from './../../services/PostWithToken';
import {GetWithToken } from './../../services/GetWithToken';
import {GetWithoutToken } from './../../services/GetWithoutToken';
import Icon2 from 'react-native-vector-icons/Entypo';
import NumericInput from 'react-native-numeric-input'
import { Picker, Form } from "native-base";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Modal from "react-native-modal";

import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
const{width, height}=Dimensions.get('window');
// create a component
class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            userid:'',
            notfound:'',
            age:'',
            gender:undefined,
            countryid:'',
            statesid:'',
            cityid:'',
            location:'',
            country: [],
            states:[],
            city:[],
            minage:20,
            maxage:80,
            countrydrop:[],
            statesdrop:[],
            citydrop:[],
            authtoken:'',
            colgcountryid:'',
        colgstatesid:'',
        colgcityid:'',
        ccountry: [],
            cstates:[],
            ccity:[],
            ccountrydrop:[],
            cstatesdrop:[],
            ccitydrop:[],
            modalVisible:false,
            filter:'false'
        }
        this.getUserData=this.getUserData.bind(this);
       

    }
   
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
     
      onSelectedItemsChangeccountry = (selectedItems) => {
        console.log("Country is",selectedItems)
        this.setState({ ccountry:selectedItems});
        this.setState({ colgcountryid:selectedItems[0]});
        this.setState({cstates:''})
        this.setState({ colgstatesid:''});
        this.setState({ccity:''})
        this.setState({ colgcityid:''});
        GetWithoutToken('states/'+selectedItems).then((states)=>{
            console.log(states)
            this.setState({cstatesdrop:states})
           
           })
      };
      onSelectedItemsChangecstate = (selectedItems) => {
        console.log("State is",selectedItems)
        this.setState({ cstates:selectedItems});
        this.setState({ colgstatesid:selectedItems[0]});
        this.setState({ccity:''})
        this.setState({ colgcityid:''});
        GetWithoutToken('cities/'+selectedItems).then((city)=>{
            console.log(city)
            this.setState({ccitydrop:city})
           
           })
      };
      onSelectedItemsChangeccity = (selectedItems) => {
        console.log("City is",selectedItems)
        this.setState({ ccity:selectedItems});
        this.setState({ colgcityid:selectedItems[0]});
  
      };

       onValueChange(value: string) {
    this.setState({
      gender: value
    });
}

UsersList=()=>
{
  GetWithToken('user/list', this.state).then((result)=>{   
    console.log(result)         
  if(result.status===1){
      this.setState({users:result.users})
      console.log(result)
  }
  else{
      this.setState({notfound:'No User Found!'})
  }
})
}

    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        //this.setState({userdet:userDetail})
        this.setState({authtoken:userInfo},()=>{
          console.log(this.state.authtoken);
          this.UsersList();
    
        });
    }
   
    componentDidMount(){
        this.getUserData();
        
        GetWithoutToken('countries').then((countries)=>{
            console.log(countries)
            this.setState({countrydrop:countries})
            this.setState({ccountrydrop:countries})

           })
    }
    // user search
userSearch=async()=>{
    if(this.state.minage>this.state.maxage)
    {
        alert("Maximum age can't be less than minimum age")
    }
    else
    {
        console.log("the token: ",this.state.authtoken)
    this.setState({filter:'true'})
    console.log(this.state);
    PostWithToken('user-search',{authtoken:this.state.authtoken,minage:this.state.minage,maxage:this.state.maxage,name:this.state.name,countryid:this.state.countryid,statesid:this.state.statesid,cityid:this.state.cityid,college:this.state.college,colgcountryid:this.state.colgcountryid,colgstatesid:this.state.colgstatesid,colgcityid:this.state.colgcityid,gender:this.state.gender}).then((result)=>{            
      console.log("resulting: ",result)
        if(result.status===0){
          this.setState({users:result.users,modalVisible:false})
          console.log(this.state.users)
          this.setState({users:result.users,modalVisible:false,college:'',cityid:'',country:'',states:'',city:'',countryid:'',statesid:'',ccountry:'',cstates:'',ccity:'',colgcityid:'',colgcountryid:'',colgstatesid:'',gender:undefined,minage:20,maxage:80,name:''})

      }
      else{
          this.setState({errors:'No User Found!'})
      }
  })
}
}

setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  
    render() {
        var modalBackgroundStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          };
          var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20,width:width-30,
          borderRadius:4};
        return (
            <View style={{flex:1}}>
               
               <NavigationEvents onDidFocus={ this.getUserData} />
                
                
                <ScrollView scrollEventThrottle={16} >
                
                    {
                        
                        this.state.users?this.state.users.map((user,index)=>{
                            var imageurl='';
                           
                              if(user.userimage=='0' || user.userimage===null)
                             {
                              imageurl='https://osclass.calinbehtuk.ro/oc-content/themes/vrisko/images/no_user.png'

                             }
                             else
                             {
                                imageurl=user.userimage.image.file
                             }
                             
                            // (user.profile_image.image.file)?imgurl=user.profile_image.image.file:imgurl='./../../src/images/profile_usr_pholder.png';
                            // }
                            // else{
                            //     imgurl='./../../src/images/profile_usr_pholder.png';
                            // }
                            return(
                                <View>
                                       {user.ID ===null?null:
                                        <UserList getuserlist={this.getUserData.bind(this)} key={user.ID} id={user.ID} name={user.display_name} imageurl={imageurl} friendsstatus={user.friend} followersstatus={user.followers} followingstatus={user.following}/>
                                       }
                                       </View>)
                        }):<View style={{flex:1,flexDirection:'column', alignItems:'center',paddingTop:80,justifyContent:'center',height:'100%'}}><Text>{this.state.notfound}</Text></View>
                                
                    }
                
                </ScrollView>
                {this.state.filter==='false'?
                <TouchableOpacity onPress={()=>{this.setModalVisible(true)}} style={{position:'absolute',right:10,bottom:10,width:40,height:40,backgroundColor:'#0078d7',borderRadius:50,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Icon
                    name='ios-funnel'
                    type='ionicon'
                    color='#fff'
                     size={23}/>
                        </TouchableOpacity>
                        :<TouchableOpacity onPress={()=>{this.getUserData(),this.setState({filter:'false'})}} style={{position:'absolute',right:10,bottom:10,width:40,height:40,backgroundColor:'#0078d7',borderRadius:50,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Icon
                    name='ios-refresh'
                    type='ionicon'
                    color='#fff'
                     size={23}/>
                        </TouchableOpacity>
 
                }
                <Modal
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          avoidKeyboard={true}
          visible={this.state.modalVisible}
          >
              
          <SafeAreaView style={[styles.containers, modalBackgroundStyle]}>
            <View style={innerContainerTransparentStyle}>
              <View style={{flexDirection:'row',fontSize:16,color:'#0078d7',marginBottom:10}}>
              
              <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.setState({name:'',minage:20,maxage:80,gender:undefined,college:'',countryid:'',statesid:'',cityid:'',country:'',states:'',city:'',errors:''})
                }} style={{fontSize:16,marginRight:15}}>
                    <Text>X</Text>
                    </TouchableOpacity> 
                   
                    <Text style={{fontSize:16,color:'#0078d7'}}>Search Users</Text>
              </View>
              { 
                                (this.state.errors)?
                                <Text style={styles.errors}>{this.state.errors}</Text>
                                :null
                               }
                          <ScrollView scrollEventThrottle={400}>
              <View style={{flexDirection: 'column'}}>
              <Text>Name</Text>
              <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                defaultValue={this.state.name}
                                    autoCorrect={false} 
                                    placeholder='Name' 
                                    onChangeText={name => this.setState({name})}
                                    placeholderTextColor='#a9a9a9'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Age (Min.)</Text>
                            <Text>Age (Max.)</Text>

                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View style={{width:'45%'}}>
                            <NumericInput
                            
            value={this.state.minage} 
            onChange={minage => this.setState({minage})} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            maxValue={99}
            minValue={1}
            totalHeight={40}
            
            step={1}
            
           
            textColor='#000' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#ddd' 
            leftButtonBackgroundColor='#ddd'/>
</View>
<View style={{width:'45%'}}>
            <NumericInput 
            
            value={this.state.maxage} 
            onChange={maxage => this.setState({maxage})} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            maxValue={99}
            minValue={1}
            step={1}
            totalHeight={40}
            
            textColor='#000' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#ddd' 
            leftButtonBackgroundColor='#ddd'/>
                            </View>
                            
                                </View>

                                
                                    
                                                                    <Text>Gender</Text>

                                <View style={{height:40,borderWidth:1,borderColor:'#ccc',borderRadius:5,marginBottom:10}}>
                               
{/*                              
                                <Picker
                                selectedValue={this.state.gender}
                                mode="dropdown"
                                style={{height: 40}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({gender: itemValue})
                                }>                                    
                                   
                                    <Picker.Item label="Male" value='male' />
                                    <Picker.Item label="Female" value='female' />                                
                                </Picker>  */}
<Picker
placeholderStyle={{ color: '#a9a9a9',fontSize:14 }}
              mode="dropdown"
            placeholder="Gender"
              selectedValue={this.state.gender}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label={Platform.OS==='android'?"Select":null} />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Not Specified" value="others" />
              <Picker.Item label="Any" value="" />


            </Picker>
                                </View>
                                <Text>Country</Text>

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
                                    <Text>State</Text>


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
                                    <Text>City</Text>

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
                                
                                    <Text>Educational Institute</Text>
                                <TextInput style = {styles.input} 
                                    autoCapitalize="none" 
                                defaultValue={this.state.college}
                                    autoCorrect={false} 
                                    placeholder='Educational Institute' 
                                    onChangeText={college => this.setState({college})}
                                    placeholderTextColor='#a9a9a9'/>
                                  <Text>College Country</Text>
{this.state.ccountry.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.ccountrydrop]}
          uniqueKey="id"
          searchPlaceholderText="Search Country"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          showChips={false}
          subKey="list"
          selectText="College Country"
          showDropDowns={true}
          selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangeccountry}
          selectedItems={this.state.ccountry}
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
                                       
                                        
          items={[this.state.ccountrydrop]}
          uniqueKey="id"
          searchPlaceholderText="Search Country"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          showChips={false}
          subKey="list"
          selectText="College Country"
          showDropDowns={true}
          selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangeccountry}
          selectedItems={this.state.ccountry}
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
                                    <Text>College State</Text>


                                    {this.state.cstates.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.cstatesdrop]}
          uniqueKey="id"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          searchPlaceholderText="Search State"
          showChips={false}
          subKey="list"
          selectText="College State"
          showDropDowns={true}
          selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20}style={{marginRight:5}} />}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangecstate}
          selectedItems={this.state.cstates}
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
                                       
                                        
          items={[this.state.cstatesdrop]}
          uniqueKey="id"
          single={true}
          showCancelButton={true}
          expandDropDowns={true}
          searchPlaceholderText="Search State"
          showChips={false}
          subKey="list"
          selectText="College State"
          showDropDowns={true}
          selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20}style={{marginRight:5}} />}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangecstate}
          selectedItems={this.state.cstates}
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
                                    <Text>College City</Text>

                                    {this.state.ccity.length===0?<TouchableOpacity  style={[styles.input,{justifyContent:'center'}]} onPress={()=> this.setState({isVisible:true})}>
                                        <SectionedMultiSelect
                                       
                                        
          items={[this.state.ccitydrop]}
          uniqueKey="id"
          single={true}
          searchPlaceholderText="Search City"
          showCancelButton={true}
          expandDropDowns={true}
          selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
          showChips={false}
          subKey="list"
          selectText="College City"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChangeccity}
          selectedItems={this.state.ccity}
          
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
         
          
items={[this.state.ccitydrop]}
uniqueKey="id"
single={true}
searchPlaceholderText="Search City"
showCancelButton={true}
expandDropDowns={true}
selectToggleIconComponent={<Icon name="md-arrow-dropdown" size={20} style={{marginRight:5}}/>}
showChips={false}
subKey="list"
selectText="College City"
showDropDowns={true}
readOnlyHeadings={true}
onSelectedItemsChange={this.onSelectedItemsChangeccity}
selectedItems={this.state.ccity}

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
                                <View style={{position:'relative'}}> 
                                 
                            <TouchableOpacity onPress={this.userSearch} style={styles.buttonContainer} >
                <Text  style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                            <View style={{height:40}}>

                            </View>
                            </View>
                            
</View>
</ScrollView>
</View>
</SafeAreaView>
</Modal>
            </View>
           
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
  containers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    
  },
  input:{
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingLeft:16,
    fontSize:16,
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
errors:{
    padding:7,
    borderWidth:1,
    borderColor:'#32CD32',
    backgroundColor:'#32CD32',
    color:'#008000',
    marginBottom:4,
    width:'100%',
    borderRadius:4,

} 
});

//make this component available to the app
export default Users;
