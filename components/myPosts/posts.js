import React, { Component } from 'react';
import {TextInput, Modal, Platform, StyleSheet, Text, View, SafeAreaView,Image, TouchableOpacity, Button, ScrollView, Dimensions, ImageBackground ,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostList from './postlist';
import { GetWithoutToken } from './../../services/GetWithoutToken';
import { PostWithoutToken } from './../../services/PostWithoutToken';
import { PostWithToken } from './../../services/PostWithToken';
import { PostImageData } from './../../services/PostImageData';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './../../components/loader/loader';
import { Picker, Form } from "native-base";
import { Actions } from 'react-native-router-flux';
const{width, height}=Dimensions.get('window');
import {createAppContainer,createMaterialTopTabNavigator,createStackNavigator, createDrawerNavigator,navigation } from 'react-navigation';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            categories:[],
            postList:[],
            modalVisible:false,
            post_image:'',
            errors:'',
            category:undefined,
            title:'',
            post_type:undefined,
            loading:true,
            content:'',
            authtoken:'',
            category_search:'',
            notfound:'',
            id:'',
            imageurls:[],
            total:'',
            extraloading:false,
            page:1,
            user_id:''
            
        }
        this.handleChooseImage=this.handleChooseImage.bind(this);
        this.getUserData=this.getUserData.bind(this);
        this.postByCategory=this.postByCategory.bind(this);
        this.getPostList=this.getPostList.bind(this);
    }

    
    onValueChange(value: string) {
        this.setState({
            post_type: value
        });
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
        ImagePicker.launchImageLibrary(options, response=>{
            //console.log('response', response);
            if(response.uri){
                
                this.setState({post_image:response.uri},()=>console.log("Log image",this.state.post_image))
                
            }
        })

    }
    

   request_storage_runtime_permission=async() =>{
   
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Guyhub Storage Permission',
          'message': 'GuyHub needs access to your storage to download Photos.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
   
        console.log("Storage Permission Granted.");
      }
      else {
   
        Alert.alert("Storage Permission Not Granted");
   
      }
    } catch (err) {
      console.warn(err)
    }
  }
    getUserData=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
        var id=await AsyncStorage.getItem('id');
        this.setState({user_id:id})
      //  userDetail=JSON.parse(userInfo);
        // alert(userDetail);
        this.setState({token:userInfo,authtoken:userInfo},()=>this.getPostList());
    }

    createPost=()=>{
        console.log("State: ",this.state);
        if(this.state.title!==''&& this.state.content!==''&& this.state.post_type!==undefined&& this.state.category!==undefined)
        {
        debugger;
         var data=new FormData;
         data.append('post_type',this.state.post_type);
         data.append('content',this.state.content);
         data.append('title',this.state.title);
         data.append('category',this.state.category);
         data.append('post_image', { uri: this.state.post_image, name: Math.round(Math.random() * 100000000) +'screenshot.jpg', type: 'image/jpg' });
        // console.log("This.state",data)
        PostImageData('post/create',data,this.state.authtoken).then((data)=>{
            var responsejson=data;
            console.log(responsejson);
            if(responsejson.status===201){
                this.getPostList();
            this.setState({errors:responsejson.message});
            this.setState({title:'',content:'',post_type:undefined,category:undefined,post_image:''})
           
            }
            
    
        })
       
    }
    else
    {
        console.log("Fill",this.state.title,this.state.content,this.state.post_type,this.state.category)
        this.setState({errors:"Fill all Fields"});
    }
    }
    setModalVisible(visible) {
        //this.getPostList();
        this.setState({modalVisible: visible});
      }
    
   static navitaionOptions={
       header:null
   }

   getPostCategory=()=>{   
       console.log("Category",this.state)     
        GetWithoutToken('post/categories',this.state).then((data)=>{
            var responsejson=data;
            if(responsejson.status===200)
            this.setState({categories:data.data});
            console.log(this.state.categories);

        })
        
}
getPostList=()=>{
    console.log("userid",this.state.user_id)
    PostWithToken('getpost/my',{authtoken:this.state.token,token:this.state.token,page:this.state.page,user_id:this.state.user_id}).then((data)=>{
        console.log("Post Data",data);
            var responsejson=data;
            this.setState({total:data.data.total});
            // if(data.data.posts){
            //     this.setState(prevState => {
            //         return {page: prevState.page + 1}
            //      })
            //      console.log(this.state.page);debugger;
            //     this.setState({extraloading:true});
            // }
            if(responsejson.status===200){
                if(data.data.total===0){this.setState({notfound:'Post Not Found!'});}
                else this.setState({postList:data.data.posts,extraloading:false}); 
                this.getPostCategory();            
             }
         this.setState({loading:false})

        })
    
    
}
postByCategory=(cat_slug)=>{    

    this.setState({category_search:cat_slug},()=>{
        console.log("Authtoken: ",this.state)
        console.log("Authtoken is: ",this.state.authtoken)

        PostWithToken('getpost/my?category_search='+this.state.category_search,this.state).then((data)=>{
            this.setState({loading:true})

            var responsejson=data;
            console.log(data);
            this.setState({total:data.data.total});
            if(responsejson.status===200)
            if(data.data.total===0){this.setState({notfound:'Post Not Found!'});}
            else {this.setState({postList:data.data.posts});    
            console.log(this.state.postList);}
            this.setState({loading:false})

        })
    });
        
        
}
componentDidMount(){
    this.getUserData();
    this.getPostCategory(); 
    this.request_storage_runtime_permission();
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
     
       // const { postList, imageurls } = this.state;
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
                    <TouchableOpacity onPress={()=>Actions.dashboard()}><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30} /></TouchableOpacity>
                     
                        <Text style={{width:'70%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>MY POSTS</Text>
                    </View>
                    
                    </View>
                    <View style={{height:30,backgroundColor:'#ddd',alignItems:'center'}}>
                    <ScrollView
                        horizontal={true}
                        scrollEventThrottle={16} 
                        showsHorizontalScrollIndicator={false}

                        >
                            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:15}}>
                            <TouchableOpacity onPress={this.getUserData}><Text class="active" style={{fontSize:11,paddingHorizontal:5,color:'#333'}}>#All</Text></TouchableOpacity>
                                
                               {
                                   (this.state.categories)?
                                   this.state.categories.map((category,index)=>{                                       
                                       return(
                                        <TouchableOpacity key={index} onPress={()=>this.postByCategory(category.slug)}><Text style={{fontSize:11,paddingHorizontal:5,color:'#333'}}>#{category.name}</Text></TouchableOpacity>
                                     )
                                   }):null
                               }
                                </View>
                        </ScrollView>
                    </View>
                    <View style={{flex:1,paddingHorizontal:15,backgroundColor:'#dddddd'}}>
                        <ScrollView
                        scrollEventThrottle={16} 
                        showsVerticalScrollIndicator={false}
                        onScroll={({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent)) {
                              console.log('alert scroll at bottom side yeh');
                            //   this.getPostList();
                            }
                          }}

                        >
                                {
                                    (this.state.total>0)?
                                    
                                    this.state.postList.map((singlePost,index)=>{
                                      
                                        var imageuri;
                                        var imageid;
                                             console.log("Post is",singlePost.post_image);
                                            //  console.log("Image is",singlePost.post_image.image.file)
                                            // PostData('attachment/?id='+singlePost.post_image,this.state).then((attachments)=>{
                                            //     var imgid=attachments.attachment.id;
                                                
                                            //     if(imgid===singlePost.post_image){
                                            //         imageuri=attachments.attachment.file;
                                            //     }
                                                // else{
                                                    if(singlePost.post_image==null||singlePost.post_image=="0")
                                                    {
                                                        imageuri='https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image-800x600.jpg'
                                                        imageid=''

                                                        //  imageuri='./../../src/images/post_default_pic.png'
                                                    }
                                                    else
                                                    {
                                                        imageuri=singlePost.post_image.image.file
                                                        imageid=singlePost.post_image.image.id
                                                    }
                                                

                                            //     }
                                            // })

                                        return(
                                            <PostList functinonpost={this.getPostList.bind(this)} key={singlePost.ID} id={singlePost.ID} userid={singlePost.userid} title={singlePost.title} imageUrl={imageuri} description={singlePost.content} dislikes={(singlePost.unlikes[0])?singlePost.unlikes[0].unlikes:0} like={(singlePost.likes[0])?singlePost.likes[0].likes:0} post_type={singlePost.post_type} postedDate={singlePost.post_date} width={width} shareurl={singlePost.posturl} imageid={imageid}/> 
                                        )
                                    })
                                    :<View style={{flex:1,flexDirection:'column', alignItems:'center',paddingTop:80,justifyContent:'center',height:'100%'}}><Text>{this.state.notfound}</Text></View>
                                }                                            
                        </ScrollView>
                        {
                    (this.state.extraloading)?
                    <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}><Text>Loading More...</Text></View>:null
                }
                    </View>
                    
                </View>
                {/* add post modal  */}
                
            
     </SafeAreaView>
     )}
}
    
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
        padding: 10,
        paddingLeft:16,
        fontSize:16,
        color: '#333',
        width:'100%',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc'},buttonContainer:{
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




