import React, { Component } from 'react';
import {TextInput, Platform, StyleSheet, Text, View,RefreshControl,PermissionsAndroid,ActivityIndicator, SafeAreaView,Image, TouchableOpacity, Button, ScrollView, Dimensions, ImageBackground ,Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostList from './../dashboardcomponents/PostList';
import { GetWithoutToken } from './../../services/GetWithoutToken';
import { GetWithToken } from './../../services/GetWithToken';
import { PostWithoutToken } from './../../services/PostWithoutToken';
import { PostWithToken } from './../../services/PostWithToken';
import { PostImageData } from './../../services/PostImageData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './../../components/loader/loader';
import { Picker, Form } from "native-base";
import { Actions } from 'react-native-router-flux';
import Modal from "react-native-modal";
const {width, height}=Dimensions.get('window');
import {createAppContainer,createMaterialTopTabNavigator,createStackNavigator, createDrawerNavigator,navigation } from 'react-navigation';
import {NavigationEvents} from 'react-navigation';
import Fire from './../../services/Firebase';

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
            nomore:false,
            post_image:'',
            errors:'',
            category:undefined,
            title:'',
            post_type:undefined,
            loading:true,
            content:'',
            loadmore:false,
            authtoken:'',
            docheck:false,
            category_search:'',
            notfound:'',
            id:'',
            imageurls:[],
            total:'',
            extraloading:false,
            page:1,
            categoryselect:false,
            refreshing:false,
            user_id:'',
            notification:"none",
            chat:0
        }
        this.handleChooseImage=this.handleChooseImage.bind(this);
        this.getUserData=this.getUserData.bind(this);
        this.getNotification=this.getNotification.bind(this);

        this.postByCategory=this.postByCategory.bind(this);
        this.getPostList=this.getPostList.bind(this);
    }

    async componentWillMount()
      {
        var id=await AsyncStorage.getItem('id');
        this.setState({receiver:id})
        // this.setState({sender:JSON.stringify(this.props.id)})
        console.log("receiver",this.state.receiver)
        this.getData()
      }

      async getData()
      {
        var i=0;
        var id=await AsyncStorage.getItem('id');
        Fire.shared.on(message =>{
          if(message.seen==0&&message.user.receiver==id)
          {
            i++;
            console.log("my Notification: ",i)
            this.setState({chat:JSON.stringify(i)})
          }
      
    }
         );
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
        launchImageLibrary(options, response=>{
            console.log('response', response);
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
          'title': 'GuyHub Storage Permission',
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
        console.log("user ids",id)
        console.log("user userInfo",userInfo)

      //  userDetail=JSON.parse(userInfo);
        // alert(userDetail);
        this.setState({token:userInfo,authtoken:userInfo},()=>this.getPostList());
    

    }

    getNotification=async()=>{
        var userInfo=await AsyncStorage.getItem('token');
        //userDetail=JSON.parse(userInfo);
        this.setState({authtoken:userInfo},()=>{
            GetWithToken('notifications',{authtoken:userInfo}).then((data)=>{
                console.log("notification",data)
                this.setState({notification:data.data.count});
                this.setState({notificationdata:data.data.follow});
        
            })
        });
    }

    createPost=()=>{
       
        console.log("State: ",this.state);
        if(this.state.title!==''&& this.state.content!==''&& this.state.post_type!==undefined&& this.state.category!==undefined&&this.state.post_image!='')
        {
         this.setState({docheck:true})   
        debugger;
         var data=new FormData;
         data.append('post_type',this.state.post_type);
         data.append('content',this.state.content);
         data.append('title',this.state.title);
         data.append('category',this.state.category);
         data.append('post_image', { uri: this.state.post_image, name: Math.round(Math.random() * 100000000) +'screenshot.jpg', type: 'image/jpg' });
        // console.log("This.state",data)
        console.log(data)
        PostImageData('post/create',data,this.state.authtoken).then((data)=>{
            var responsejson=data;
            console.log(responsejson);
            if(responsejson.status===201){
                this.getPostList();
            this.setState({errors:responsejson.message});
            this.setState({title:'',content:'',post_type:undefined,category:undefined,post_image:''})
            this.setState({docheck:false})
            }
            
            else if(responsejson.status===401)
            {
                this.setState({errors:responsejson.message});
                this.setState({docheck:false})

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
getPostList=async()=>{
    var userInfo=await AsyncStorage.getItem('token');
    console.log("userid",this.state.user_id)
    PostWithToken('getpost/all',{authtoken:userInfo,token:userInfo,page:1,user_id:this.state.user_id}).then((data)=>{
        console.log("Post Data",data);
        console.log("Post Data",userInfo,this.state.page,this.state.user_id);
        this.setState({loading:false})
            var responsejson=data;
            this.setState({total:data.data.total});
            if(data.data.posts){
                this.setState(prevState => {
                    return {page: prevState.page + 1}
                 })
                 console.log(this.state.page);debugger;
                this.setState({extraloading:true});
            }
            if(responsejson.status===200){
                if(data.data.total===0){this.setState({notfound:'Post Not Found!'});}
                else this.setState({postList:data.data.posts}); 
                this.setState({refreshing:false})
                // this.getPostCategory();            
             }
             
        })
        this.getNotification()
        
}
postByCategory=async(cat_slug)=>{    
    this.setState({loading:true,page:1,categoryselect:true,nomore:false})
    var userInfo=await AsyncStorage.getItem('token');
    console.log("userid",this.state.user_id)
    this.setState({category_search:cat_slug},()=>{
        PostWithoutToken('getpost/all?category_search='+this.state.category_search,{authtoken:userInfo,token:userInfo,page:1,user_id:this.state.user_id}).then((data)=>{
            this.setState({loading:false})
            if(data.data.posts){
                this.setState(prevState => {
                    return {page: prevState.page + 1}
                 })
                 console.log(this.state.page);debugger;
                this.setState({extraloading:true});
            }
            var responsejson=data;
            console.log(responsejson);
            this.setState({total:data.data.total});
            if(responsejson.status===200)
            if(data.data.total===0){this.setState({notfound:'Post Not Found!'});}
            else {this.setState({postList:data.data.posts});    
            console.log(this.state.postList);}
            

        })
    });
        
        
}

loadMore2=async()=>{
    var userInfo=await AsyncStorage.getItem('token');
    console.log("userid",this.state.user_id)
    this.setState({loadmore:true})
    console.log('jojojojojojo page no:', this.state.page)
    PostWithoutToken('getpost/all?category_search='+this.state.category_search,{authtoken:userInfo,token:userInfo,page:this.state.page,user_id:this.state.user_id}).then((data)=>{
        console.log("Post Data",data);
        console.log("Post Data",userInfo,this.state.page,this.state.user_id);

            var responsejson=data;
            
            if(data.data.posts){
                this.setState(prevState => {
                    return {page: prevState.page + 1}
                 })
                 console.log(this.state.page);debugger;
                // this.setState({extraloading:true});
            }
            if(responsejson.status===200){
                if(data.data.total===0){
                    this.setState({nomore:true});
                }
                else {
                    var {postList}=this.state
                    for(var j=0;j<data.data.posts.length;j++)
                    postList.push(data.data.posts[j])
                    this.setState({postList:postList,extraloading:true})
                } 
                // this.getPostCategory();            
             }
             this.setState({loading:false,loadmore:false})
        })
}

loadMore=async()=>{
    var userInfo=await AsyncStorage.getItem('token');
    console.log("userid",this.state.user_id)
    this.setState({loadmore:true})
    PostWithToken('getpost/all',{authtoken:userInfo,token:userInfo,page:this.state.page,user_id:this.state.user_id}).then((data)=>{
        console.log("Post Data",data);
        console.log("Post Data",userInfo,this.state.page,this.state.user_id);

            var responsejson=data;
            if(data.data.posts){
                this.setState(prevState => {
                    return {page: prevState.page + 1}
                 })
                 console.log(this.state.page);debugger;
                // this.setState({extraloading:true});
            }
            if(responsejson.status===200){
                if(data.data.total===0){
                    this.setState({nomore:true});
                }
                else {
                    var {postList}=this.state
                    for(var j=0;j<data.data.posts.length;j++)
                    postList.push(data.data.posts[j])
                    this.setState({postList:postList,extraloading:true})
                } 
                // this.getPostCategory();            
             }
             this.setState({loading:false,loadmore:false})
        })
}


componentDidMount(){
    this.props.navigation.closeDrawer()
    
    this.getUserData();
    this.getPostCategory(); 
    this.request_storage_runtime_permission();
    

}


checknotification()
{
    if(this.state.notification=="none")
    {

    }
    else
    {
        Actions.notifollow({hideNavBar: true,followers:this.state.notificationdata,getdata:this.getNotification.bind(this)})
    }
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
        
          var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20,
          borderRadius:4};
     return(
         <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    {/* <NavigationEvents onDidFocus={ this.getUserData,this.getnotify()} />  */}
                    
                    <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                     <TouchableOpacity onPress={()=>  this.props.navigation.openDrawer()}>
                    <Icon
                    name='ios-menu'
                    type='ionicon'
                    color='#fff'
                     size={40}/>
                     </TouchableOpacity> 
                     
                        <Text style={{width:'70%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>GUYHUB</Text>
                    </View>
                    <View>
                        <View style={{flexDirection:'row',width:'30%',alignItems:'center'}}>
                            
                            <View style={{marginRight:10,marginTop:5,width:'60%'}}>
                    <TouchableOpacity onPress={()=>this.checknotification()}>
                    <Icon
                    name='ios-notifications'
                    type='ionicon'
                    color='#fff'
                    style={{zIndex:1}}
                     size={30}/>
                     
                        </TouchableOpacity>
                        {this.state.notification==="none"||this.state.notification==undefined?null:
                        <View style={{position:'absolute',alignItems:'center',justifyContent:'center'}}>
     <View style={{height:14,width:14,borderRadius:7,backgroundColor:'red',}}>
     <Text style={{textAlign:'center',zIndex:0,color:'white',fontSize:10,marginBottom:2}}>{this.state.notification}</Text>
                        </View>
                        </View>}
                        </View>
                        <View style={{width:'40%'}}>
                        <TouchableOpacity onPress={()=>Actions.myprofile({hideNavBar: true})}>
                        <Image source={require('./../../src/images/account_ico.png')} style={{width:28,height:28}} />
                        </TouchableOpacity>
                        {this.state.chat?
                        <View style={{position:'absolute',alignItems:'center',justifyContent:'center'}}>
     <View style={{height:14,width:14,borderRadius:7,backgroundColor:'red',}}>
     <Text style={{textAlign:'center',zIndex:0,color:'white',fontSize:10,marginBottom:2}}>{this.state.chat}</Text>
                        </View>
                        </View>:null}
                        </View>
                        </View>
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
                          refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={()=>{
                                  this.setState({refreshing:true,postList:[]})
                                  this.getPostList()
                              }}
                            />
                          }
                        >

                                {
                                    (this.state.total>0)?
                                    
                                    this.state.postList.map((singlePost,index)=>{
                                      
                                        var imageuri;
                                        
                                             
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
                                                    //  imageuri='./../../src/images/post_default_pic.png'
                                                    }
                                                    else
                                                    {
                                                        imageuri=singlePost.post_image.image.file
                                                    }
                                                

                                            //     }
                                            // })
                                        return(
                                            
                                            <PostList key={singlePost.ID} id={singlePost.ID} userid={singlePost.userid} title={singlePost.title} imageUrl={imageuri} description={singlePost.content} dislikes={(singlePost.unlikes[0])?singlePost.unlikes[0].unlikes:0} like={(singlePost.likes[0])?singlePost.likes[0].likes:0} postedDate={singlePost.post_date} width={width} shareurl={singlePost.posturl} post_type={singlePost.post_type} username={singlePost.username}/> 
                                         
                                        )
                                    })
                                    :<View style={{flex:1,flexDirection:'column', alignItems:'center',paddingTop:80,justifyContent:'center',height:'100%'}}><Text>{this.state.notfound}</Text></View>
                                }
                                {
                    (this.state.extraloading&&!this.state.loadmore&&this.state.notfound==''&&!this.state.nomore&&!this.state.refreshing)?
                    <TouchableOpacity style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                        if(this.state.categoryselect)
                        this.loadMore2()
                        else
                        this.loadMore()
                    
                    }}><Text style={{marginBottom:10}}>Load More</Text></TouchableOpacity>:null
                } 
                {(this.state.loadmore)?
                    <View style={{height:80}}><ActivityIndicator size='small'/></View>:null
                }                                            
                        </ScrollView>
                        
                    </View>
                    
                </View>
                {/* add post modal  */}
                <Modal
                
                avoidKeyboard={true}
               
   
          isVisible={this.state.modalVisible}
          >
       
          <SafeAreaView style={[styles.containers]} behavior="padding" enabled>
          <ScrollView style={{flex:1,width:'100%'}}>
            <View style={innerContainerTransparentStyle}>
              <View style={{flexDirection:'row',fontSize:16,color:'#0078d7',marginBottom:10}}>
              <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.setState({title:'',content:'',post_type:undefined,category:undefined,post_image:'',errors:''})
                }} style={{fontSize:16,marginRight:15}}>
                    <Text>X</Text>
                    </TouchableOpacity> 
                    <Text style={{fontSize:16,color:'#0078d7'}}>New Public Post</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
              { 
                                (this.state.errors)?
                                <Text style={styles.errors}>{this.state.errors}</Text>
                                :null
                               }
                               <Text>Post Title</Text>
              <TextInput style = {styles.input2} 
                                    autoCapitalize="none" 
                                defaultValue={this.state.title}
                                    autoCorrect={false} 
                                    placeholder='Post Title' 
                                    multiline={true}
                                    numberOfLines={2}

                                    onChangeText={title => this.setState({title})}
                                    placeholderTextColor='#a9a9a9'/>
                            <Text>Description</Text>
                                <TextInput style = {styles.input2} 
                                    autoCapitalize="none" 
                                defaultValue={this.state.content}
                                    autoCorrect={false} 
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Description' 
                                    onChangeText={content => this.setState({content})}
                                    placeholderTextColor='#a9a9a9'/>
<Text>Post Type</Text>

<View style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,marginBottom:10}}>
{/* <Picker
    placeholder="Post Type"
    style={{height:40}}
  selectedValue={this.state.post_type}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({post_type: itemValue})
  }>
  <Picker.Item label="Public" value="public"/>
  <Picker.Item label="Private" value="private" />
</Picker> */}
<Picker
placeholderStyle={{ color: '#a9a9a9',fontSize:14 }}
              mode="dropdown"
            placeholder="Post Type"
              selectedValue={this.state.post_type}
              onValueChange={this.onValueChange.bind(this)}
            >
                <Picker.Item label={Platform.OS==='android'?"Select":null} />
              <Picker.Item label="Public" value="public" />
              <Picker.Item label="Private" value="private" />
              
            </Picker>
</View>
<Text>Category</Text>
<View style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,marginBottom:10}}>
    
     <Picker
  selectedValue={this.state.category}
  placeholderStyle={{ color: '#a9a9a9',fontSize:14 }}
  mode="dropdown"
  placeholder="Category"
  onValueChange={this.onValueChange1.bind(this)}
      >
          <Picker.Item label={Platform.OS==='android'?"Select":null} />
  {
(this.state.categories)?
this.state.categories.map((category,index)=>{                                       
return(
<Picker.Item key={index} label={category.name} value={category.id} />
)}):null}
</Picker>       
</View>  
{this.state.post_image==''?<ImageBackground source={require('../../src/images/strip_bg.png')} resizeMode="cover" style={{width:'100%',height:60,marginBottom:10}}>
                    <TouchableOpacity onPress={this.handleChooseImage} style={{width:'100%',height:40,flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text>BROWSE POST IMAGE</Text>
                    </TouchableOpacity></ImageBackground>:<View style={{width:'100%'}}>
                    <Text>Post Image</Text><TouchableOpacity onPress={this.handleChooseImage} style={{width:'100%',height:120,}}>
                    <Image source={{uri:this.state.post_image}} style={{height:100, width:100, borderRadius:50,alignSelf:'center',marginBottom:20}}/>
                    </TouchableOpacity></View>}
                <Text style={{marginBottom:10,backgroundColor:'white',padding:10,color:'#a9a9a9',fontSize:12}}>Guyhub has no tolerance for potentially objectionable content, such as nudity, pornography, and profanity or abusive users. Also all users of Guyhub  can flag objectionable content and admin will take action on it in maximum 24 hours if the objection is found to be genuine. </Text>

                
                <TouchableOpacity onPress={this.createPost} style={styles.buttonContainer} 
                  disabled={this.state.docheck}>
                <Text  style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                
                </View>
              </View>
              </ScrollView>
          </SafeAreaView>
      
          
        </Modal>
            <TouchableOpacity style={{position:'absolute',right:10,bottom:10,width:40,height:40,backgroundColor:'#0078d7',borderRadius:50,flex:1,justifyContent:'center',alignItems:'center'}} onPress={() => {
            this.setModalVisible(true);
          }}>
            <FontAwesome
                    name='envelope'
                    type='font-awesome'
                    color='#fff'
                     size={20}/>
            </TouchableOpacity>
            
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



//react-native bundle --platform android dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
