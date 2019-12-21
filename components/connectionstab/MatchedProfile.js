//import liraries
import React, { Component } from 'react';
import { Platform,TextInput,   StyleSheet, Text, View,Button, SafeAreaView,Image,Keyboard, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView,Alert } from 'react-native';
import MatchedList from './../connectioncomponent/MatchedList';
import {PostWithToken } from './../../services/PostWithToken';
import Loader from './../../components/loader/loader';
import Modal from "react-native-modal";
// import stripe from 'tipsi-stripe';
import * as RNIap from 'react-native-iap';
import {GetWithToken } from './../../services/GetWithToken';
import { Picker, Form ,Icon, } from "native-base";
import PayPal from 'react-native-paypal-wrapper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { GetWithoutToken } from './../../services/GetWithoutToken';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
const{width, height}=Dimensions.get('window');
import Icon1 from 'react-native-vector-icons/AntDesign';
// stripe.setOptions({
//   publishableKey: "pk_live_nbRxK0Ld69fd31Xw6uA2Zkw600fTDC1tGS",
//   merchantId: 'merchant.com.guyhub',
//   androidPayMode: 'test', // test || production
// });


// create a component
class MatchedProfile extends Component {
  purchaseUpdateSubscription = null
  purchaseErrorSubscription = null
    constructor(props){
        super(props);
        this.state={
            users:[],
            paymentstatus:0,
            notfound:'',
            college:'',
            selectedValue:undefined,
            countryid:'',
        statesid:'',
        cityid:'',
        colgcountryid:'',
        colgstatesid:'',
        colgcityid:'',
        ccountry: [],
            cstates:[],
            ccity:[],
            ccountrydrop:[],
            cstatesdrop:[],
            ccitydrop:[],
        check:false,
        loading:true,
            country: [],
            states:[],
            productios:[],
            city:[],
            nationality:[],
            countrydrop:[],
            statesdrop:[],
            citydrop:[],
            authtoken:'',
            gender: undefined,
            modalVisible:false,
            pickerItems : [],
            
            
              allowed: false,
    complete: true,
    status: null,
    token: null,
    amexAvailable: false,
    discoverAvailable: false,
    masterCardAvailable: false,
    visaAvailable: false,
        }
        this.getUserData=this.getUserData.bind(this);
    }

    // handleSetupApplePayPress = () => (
    //   stripe.openNativePaySetup()
    // )

    
      

    requestPurchase = async () => {
      console.log(this.state.selectedValue)
  if(this.state.selectedValue===undefined)
  {
    alert("Select number of Matched Profiles to unlock before proceeding")
  }
  else
  {
    var amount='';
    for(var i=0;i<this.state.productios.length;i++)
    {
      if(this.state.productios[i].product_id===this.state.selectedValue)
      {
        amount=this.state.productios[i].price;
        console.log(amount)
      }
    }
    
      try {
        

        var req_result=await RNIap.requestPurchase(this.state.selectedValue);
        console.log("Transaction result",req_result)
        if(req_result.transactionId)
        {
        PostWithToken('payment-save',{authtoken:this.state.authtoken,limit:this.state.selectedValue,amount:amount,mode:'online',txn_id:req_result.transactionId,status:'success'}).then((result)=>{            
          console.log("Resultis : ",result)
          if(result.status===1){
              
              this.setState({amount:'',selectedValue:undefined,notfound:result.message,paymentstatus:result.pending})
              console.log("Result is: ",result)
    
          }
          else{
            
            
              this.setState({notfound:result.message})
          }
      })
    }
      else
      {
        alert("Transaction Unsuccessful")

      }
      } catch (err) {
        console.warn(err.code, err.message);
      }
    }
      // try {
      //   this.setState({
      //     loading: true,
      //     status: null,
      //     token: null,
      //   })
      //   const token = await stripe.paymentRequestWithNativePay({
      //     // requiredBillingAddressFields: ['all'],
      //     // requiredShippingAddressFields: ['all'],
          
      //   },
      //   [{
      //     label: 'Amount',
      //     amount: this.state.amount,
      //   }])
  
      //   this.setState({ loading: false, token })
      //   console.log("my token",token)
      //   if (this.state.complete) {
      //     await stripe.completeNativePayRequest()
      //     PostWithToken('payment-save',{authtoken:this.state.authtoken,limit:this.state.selectedValue,amount:this.state.amount,mode:'online',txn_id:token.tokenId,status:'success'}).then((result)=>{            
      //       console.log("Resultis : ",result)
      //       if(result.status===1){
                
      //           this.setState({amount:'',selectedValue:undefined,notfound:result.message,paymentstatus:result.pending})
      //           console.log("Result is: ",result)
      
      //       }
      //       else{
              
      //           this.setState({notfound:result.message})
      //       }
      //   })
      //   } else {
      //     await stripe.cancelNativePayRequest()
      //     alert('Apple Pay payment cenceled' )
      //   }
      // } catch (error) {
      //   this.setState({ loading: false })
      //   alert("Payment can't be processed")
      //   console.log("Errors",error.message)
      // }
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

onValueChange1(value: string) {
    this.setState({
        selectedValue: value
    });

   
    var val=JSON.stringify(value*(15/2))
    this.setState({amount:val})
    
}
make_list(){
  if(Platform.OS=='android')
  {
    d = this.state.pickerItems.map((data) => {
        return (
            <Picker.Item label={data.title} value={data.product_id}/>
        )
    })
    d.unshift(<Picker.Item label="Select" />)

    return d;
  }
  else
  {
    d = this.state.productios.map((data) => {
      return (
          <Picker.Item label={data.title} value={data.product_id}/>
      )
  })
  return d;
  }
}
setPayMent()
{
  console.log(this.state.selectedValue)
  if(this.state.selectedValue===undefined)
  {
    alert("Select number of Matched Profiles to unlock before proceeding")
  }
  else
  {
    PayPal.initialize(PayPal.PRODUCTION, "AcYcnyy8hTYbZHecqLh6iPxHi34M_uwBAcGEKljGRc0LU4njY4alRbPeEvjz6wiQU3XMszmAOPSKIF-Y");
    PayPal.pay({
    price: this.state.amount,
    currency: 'USD',
    description: 'Amount',
    }).then(confirm => {console.log(confirm)
    // api to post the profile choice
    PostWithToken('payment-save',{authtoken:this.state.authtoken,limit:this.state.selectedValue,amount:this.state.amount,mode:'online',txn_id:confirm.response.id,status:'success'}).then((result)=>{            
      console.log("Resultis : ",result)
      if(result.status===1){
          
          this.setState({amount:'',selectedValue:undefined,notfound:result.message,paymentstatus:result.pending})
          console.log("Result is: ",result)

      }
      else{
        
          this.setState({notfound:result.message})
      }
  })
  })
    .catch(error => console.log(error));
  }
}
    getUserData=async()=>{
      this.setState({check:false})
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo},()=>{
          console.log("tttt",this.state.authtoken);
          GetWithToken('getmatches', {authtoken:this.state.authtoken,gender:'',countryid:'',statesid:'',cityid:'',college:''}).then((result)=>{            
            console.log("matches response",result)
            if(result.status===1){
                this.setState({users:result.users})
                console.log(result)
                this.setState({paymentstatus:result.pending})
            }
            else{
              this.setState({users:[]})
               this.setState({paymentstatus:result.pending})

                this.setState({notfound:'No Match Found!'})
            }
            this.setState({loading:false})
        })
    
        });
    }
    async componentDidMount(){
        this.getUserData();
        
        GetWithoutToken('countries').then((countries)=>{
          console.log(countries)
          this.setState({countrydrop:countries})
          this.setState({ccountrydrop:countries})

         })
         if(Platform.OS=='ios')
         {
          const result = await RNIap.initConnection();

          GetWithoutToken('getproductids').then((proid)=>{
          
           console.log("items are",proid)
          console.log('Connection is: ', result);
          RNIap.getProducts(proid).then((products) => {
            console.log("Products are: ",products)
            GetWithoutToken('packages').then((prod)=>{
              console.log("packages",prod)
              this.setState({productios:prod})
    
             })
            
           //handle success of fetch product list
          }).catch((error) => {
            console.log("Error is: ",error.message);
          })})
        }
        else
        {
          GetWithoutToken('packages').then((prod)=>{
            console.log("packages",prod)
            this.setState({pickerItems:prod})
  
           })
          
          
        }
         
    }

    async componentWillMount() {
    //   if(Platform.OS=='ios'){
    //   const allowed = await stripe.deviceSupportsNativePay()
    //   const amexAvailable = await stripe.canMakeNativePayPayments({
    //     networks: ['american_express'],
    //   })
    //   const discoverAvailable = await stripe.canMakeNativePayPayments({
    //     networks: ['discover'],
    //   })
    //   const masterCardAvailable = await stripe.canMakeNativePayPayments({
    //     networks: ['master_card'],
    //   })
    //   const visaAvailable = await stripe.canMakeNativePayPayments({
    //     networks: ['visa'],
    //   })
    //   this.setState({
    //     allowed,
    //     amexAvailable,
    //     discoverAvailable,
    //     masterCardAvailable,
    //     visaAvailable,
    //   })
    //   this.handleSetupApplePayPress()
    // }
    
    }
    

    onPaymentSuccess()
    {
       this.getUserData()
       GetWithoutToken('countries').then((countries)=>{
        console.log(countries)
        this.setState({countrydrop:countries})
        this.setState({ccountrydrop:countries})

       })
    }

    

    // user search
userSearch=async()=>{
  this.setState({loading:true})
    console.log("States is : ",this.state);
    PostWithToken('filtermatches',{authtoken:this.state.authtoken,gender:this.state.gender,countryid:this.state.countryid,statesid:this.state.statesid,cityid:this.state.cityid,college:this.state.college,colgcountryid:this.state.colgcountryid,colgstatesid:this.state.colgstatesid,colgcityid:this.state.colgcityid}).then((result)=>{            
      console.log("Resultis : ",result)
      if(result.status===1){
          
          this.setState({users:result.users,modalVisible:false,college:'',cityid:'',country:'',states:'',city:'',countryid:'',statesid:'',ccountry:'',cstates:'',ccity:'',colgcountryid:'',colgstatesid:'',colgcityid:'',gender:undefined,check:true})
          console.log("Result is: ",result)

      }
      else{
        this.setState({modalVisible:false
        })
          this.setState({notfound:'No Match Found!'})
      }
      this.setState({loading:false})

  })
}



setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
        return (
            <View style={{flex:1}}>
                              {this.state.paymentstatus===0?<View>
                               <Text style={{fontSize:16,marginLeft:10,color:'#0078d7',fontWeight:'bold',marginTop:10,width:'100%',textAlign:'center'}}><Text>Hi Guys! </Text></Text>
                               <Text style={{fontSize:16,marginLeft:10,color:'#0078d7',marginTop:10}}><Text>Want to further explore the profiles matching with your preferences? </Text></Text>
                               <Text style={{fontSize:14,marginLeft:10,color:'black',marginTop:10}}><Text>Subscribe here to unlock profile details ! </Text></Text>

               <View style={{paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
               
              
            
            <Picker mode='dropdown' placeholder="Select"
              placeholderStyle={{ color: "#bfc6ea" }}
              iosIcon={<Icon name="arrow-down" />}
              placeholderIconColor="#007aff" selectedValue={this.state.selectedValue} onValueChange={this.onValueChange1.bind(this)} >
      { this.make_list() }
    </Picker>
            <TouchableOpacity style={{backgroundColor:"#0078d7",padding:5}} onPress={()=>
                Platform.OS==='ios'?this.requestPurchase():
               this.setPayMent()}><Text style={{fontSize:16,marginLeft:5,color:'white'}}>Proceed for payment</Text></TouchableOpacity>

                </View>
                <Text style={{fontSize:14,marginLeft:10,marginBottom:10,color:'#a9a9a9'}}>* Select number of profiles to unlock at the cost of 15 USD for every 2 Matched profiles</Text>
                </View>:                <Text style={{fontSize:14,marginTop:10,marginLeft:10,marginBottom:10,color:'#0078d7'}}>* You are left with {this.state.paymentstatus} more Connects to unlock matching profiles under current subscription.</Text>

                }

                <NavigationEvents onDidFocus={ this.getUserData} />
                <ScrollView scrollEventThrottle={16} >
                
                    {
                      this.state.users.length!==0?
                        this.state.users?this.state.users.map((user,index)=>{
                            var imageurl='';
                           
                            if(user.userimage=='0' || user.userimage===null||user.userimage==="")
                            {
                            imageurl='https://osclass.calinbehtuk.ro/oc-content/themes/vrisko/images/no_user.png'

                           }
                           else
                           {
                            imageurl=user.userimage.image.file

                           }
                            return(<View>
                                        <MatchedList matcheduser={this.getUserData.bind(this)} key={user.ID} id={user.ID} name={user.display_name}  imageurl={imageurl} friendsstatus={user.friend} followersstatus={user.followers} followingstatus={user.following} match={user.match} paymentstatus={this.state.paymentstatus} myicon={user.clickable}/>
                                        <View>{console.log("hkdhsk")}</View>
</View>
                                        )
                        }):<View style={{flex:1,flexDirection:'column', alignItems:'center',paddingTop:80,justifyContent:'center',height:'100%'}}><Text>{this.state.notfound}</Text></View>
                      :<View style={{flex:1,flexDirection:'column', alignItems:'center',paddingTop:80,justifyContent:'center',height:'100%'}}><Text>{this.state.notfound}</Text></View>          
                    }
                
                </ScrollView>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>this.setModalVisible(true)} style={{position:'absolute',right:10,bottom:10,width:40,height:40,backgroundColor:'#0078d7',borderRadius:50,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Icons
                    name='filter'
                    type='MaterialCommunityIcons'
                    color='#fff'
                     size={23}/>
                        </TouchableOpacity>
                        {this.state.check===true? 
                        <TouchableOpacity onPress={()=>this.getUserData()} style={{position:'absolute',left:10,bottom:10,width:40,height:40,backgroundColor:'#0078d7',borderRadius:50,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Icons
                    name='filter-remove'
                    type='MaterialCommunityIcons'
                    color='#fff'
                     size={23}/>
                        </TouchableOpacity> :null}
                        </View>
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
                  this.setState({gender:undefined,college:'',countryid:'',statesid:'',cityid:'',country:'',states:'',city:''})
                }} style={{fontSize:16,marginRight:15}}>
                    <Text>X</Text>
                    </TouchableOpacity> 
                    <Text style={{fontSize:16,color:'#0078d7'}}>Search Matched Profiles</Text>
              </View>
                          <ScrollView scrollEventThrottle={400}>
              <View style={{flexDirection: 'column'}}>
                               
                                
                                    
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
    borderColor:'#ccc',
    
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
}
});

//make this component available to the app
export default MatchedProfile;

