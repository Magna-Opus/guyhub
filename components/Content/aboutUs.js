//import liraries
import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const{width, height}=Dimensions.get('window');
// create a component
class AboutUs extends Component {
    constructor(props){
        super(props)
        this.state={
            
            loading:false,
            
            authtoken:''
        }
        
    }

    render() {
        const {photo}=this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={{width:'100%',paddingHorizontal:15,height:50,backgroundColor:'#0078d7',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30} /></TouchableOpacity>
                        <Text style={{width:'80%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>ABOUT US</Text>
                    </View> 
                    </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f7f7f7' }}
        scrollEnabled>
        <View style={{ paddingHorizontal: 15 }}>
        <View style={{marginTop:20}}>
                <Text style={styles.aboutdes}>
                Guy Hub: The World Student Hub for Social Networking, Sharing and Job Opportunities. The best Hybrid Mobile Apps to connect the Students Worldwide, promote them, help them to find the best matches for long term friendship and bring them the opportunity to have decent jobs from the employers worldwide. You are free to grow your network, follow more people, search matches based on your interests by paying a nominal fee for unlocking profiles.
</Text>
              
                <Text style={styles.aboutdes}>
                Join us to be a Student Ambassador: Here is the opportunity to grow your social network and earn by becoming a part of Guy Hub Team. You simply need to add more connections to your network and share posts to promote GuyHub. 

</Text>
              <Text style={styles.aboutdes}>GuyHub asks the users for some personal information and other questions during registration on app so that perfect matches based on their profile and interests can be found and shown to them.  This information is not used for any other purpose than the intended one. People are encouraged to register on GuyHub if they are willing to share their interests and some basic information with other users on GuyHub.</Text>
                <Text style={styles.aboutdes}>
                For more information, please email us at lamaid786@gmail.com with your letter of intent (LOI) along with portfolio. We are looking for student ambassador from every educational institute, worldwide.
</Text>
<Text style={styles.aboutdes}>Guy Hub: Connecting People </Text>
            </View>
        </View>
    </ScrollView>
    </SafeAreaView>
          );

    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    aboutTitle:{fontSize:22, textAlign:'center',color:'#fff',paddingVertical:10,textTransform:'uppercase',backgroundColor:'#2078d7',marginBottom:20},
    aboutHeading:{fontSize:20,color:'#4691f1',textAlign:'center',marginVertical:5, },
    aboutdes:{fontSize:14, marginBottom:5, color:'#000'},
});

//make this component available to the app
export default AboutUs;
