//import liraries
import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import { GetWithToken } from './../../services/GetWithToken';
import { GetWithoutToken } from './../../services/GetWithoutToken';
import { PostWithToken } from './../../services/PostWithToken';
import { PostImageData } from './../../services/PostImageData';
import pick from './../../services/ImagePicker';
import { Actions } from 'react-native-router-flux';
const{width, height}=Dimensions.get('window');
// create a component
class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
      
    }
    static navigationOptions =
    {
       header:null
    };
    

 
    
     async componentWillMount()
     {
         console.log("Followers are: ",this.props.followers)
        var userInfo=await AsyncStorage.getItem('token');
            //userDetail=JSON.parse(userInfo);
            this.setState({authtoken:userInfo},()=>{
        PostWithToken('clear-notifications',{authtoken:this.state.authtoken,status:'clearall'}).then((data)=>{
           
    
        })
    })
    this.props.getdata()
     }
    render() {
        
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
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>FOLLOWERS</Text>
                    </View> 
                    
                    </View>
            <View style={{width:'100%',justifyContent: 'center',backgroundColor:'white',paddingHorizontal:15}}>
            { 
            (this.state.errors)?
            <Text style={styles.errors}>{this.state.errors}</Text>
            :null
            }
           <View style={{width:'100%'}}>
<FlatList
data={this.props.followers}
renderItem={({ item }) => (
<View style={{width:'100%',height:null, backgroundColor:'white', borderBottomWidth:.5,borderBottomColor:'#f0f0f0'}}>
            <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            {(item.userimage==="0" || item.userimage===null)?
               <Image source={{uri: 'https://osclass.calinbehtuk.ro/oc-content/themes/vrisko/images/no_user.png'}} style={{width:44,height:44,borderRadius:22}} />
:
                              

                             
            <Image source={{uri: item.userimage.image.file}} style={{width:44,height:44,borderRadius:22}} />}
                <Text style={{fontSize:14,marginLeft:5,color:'#333'}}>{item.display_name}</Text>
            </View>
            
            </View>           
    </View>
)}
//Setting the number of column

keyExtractor={(item, index) => index.toString()}
/>
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
