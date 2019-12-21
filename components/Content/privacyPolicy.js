//import liraries
import React, { Component } from 'react';
import { Platform, Picker, StyleSheet, Text,TextInput, View, SafeAreaView,Image, TouchableOpacity, ScrollView, Dimensions,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const{width, height}=Dimensions.get('window');
// create a component
class PrivacyPolicy extends Component {
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
                    <Text style={{width:'100%',fontWeight:'700',fontSize:20,marginLeft:15,color:'white'}}>PRIVACY POLICY/ TERMS OF USE</Text>
                </View> 
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f7f7f7' }}
        scrollEnabled>
        <View style={{ paddingHorizontal: 15 }}>
            <View style={{marginTop:20,marginBottom:100}}>

                <Text style={styles.aboutdes}>
                Welcome to GuyHub, Connecting People platform.  This Agreement sets out the legally binding terms for your use of the apps. This Agreement may be modified by GuyHub from time to time. The membership and rights of admissions are reserved.
The World Student Hub for Social Networking, Sharing and Job Opportunities. The best Hybrid Mobile Apps to connect the Students Worldwide, promote them, help them to find the best matches for long term friendship and bring them the opportunity to have decent jobs from the employers worldwide.
Access to the GuyHub web app is free. However, we offer Premium Memberships wherein one can promote his/her Profile on various GuyHub properties such as Search Results, Emails, and GuyHub Chat.
</Text>
                <Text style={styles.aboutHeading}>1. Acceptance of Terms of Use Agreement.</Text>
                <Text style={styles.aboutdes}>In order to use the GuyHub Services, you must register as a member mobile application. This Agreement is an electronic contract that establishes the legally binding terms you must accept to use the Apps and to become a "Member." The term "Member" means a person who voluntarily submits information to the Apps whether such person uses the Service as a free member or a paid member.
By using this app, you agree to be bound by these Terms of Use ("Agreement"). If you wish to become a Member and promote/ advertise your profile to other Members and make use of the GuyHub service ("Service"), read these Terms of Use and follow the instructions in the Registration process. 
To withdraw this consent, you must discontinue using our Service and delete your account.</Text>
                <Text style={styles.aboutHeading}>2. Eligibility.</Text>
                <Text style={styles.aboutdes}>a. The GuyHub App is only to facilitate personal advertisement for finding a true Friend, Soul Mate or partner. GuyHub is not responsible for any personal information shared by you intentionally or unintentionally.
</Text>
<Text style={styles.aboutdes}>b. By using this App, you represent and warrant that you have the right, consent, authority, and legal capacity to post the personal information of the member for whom GuyHub is being searched.</Text>
<Text style={styles.aboutdes}>c. You further confirm that you, intent to grow your social network and you agree to abide by all of the terms and conditions of this Agreement. If at any time GuyHub is of the opinion (in its sole discretion) or has any reason to believe that you are not eligible to become a member or that you have made any misrepresentation, GuyHub reserves the right to forthwith terminate your membership and / or your right to use the Service without any refund to you of any of your unutilized subscription fee.</Text>
               <Text style={styles.aboutHeading}>3. Account Security.</Text>
                <Text style={styles.aboutdes} >GuyHub asks the users for some personal information and other questions during registration on app so that perfect matches based on their profile and interests can be found and shown to them.  This information is not used for any other purpose than the intended one. People are encouraged to register on GuyHub if they are willing to share their interests and some basic information with other users on GuyHub.</Text>
                <Text style={styles.aboutdes} >You are responsible for maintaining the confidentiality of the login credentials you designate during the registration process, and you are solely responsible for all activities that occur under your account. You agree to immediately notify us of any disclosure or unauthorized use of your account or any other breach of security, and ensure that you log out from your account at the end of each session.</Text>

                <Text style={styles.aboutHeading}>4 .Term and Termination.</Text>
                <Text style={styles.aboutdes}>This Agreement will be effective, valid and subsisting as long as you use our Apps.</Text>
                <Text style={styles.aboutdes}>a. You may terminate your membership at any time, for any reason by writing to GuyHub. In the event you terminate your membership, you will not be entitled to a refund of any unutilized subscription fees, if any, paid by you, except where otherwise guaranteed in writing.</Text>
                <Text style={styles.aboutdes}>b. GuyHub may terminate your access to the App and/or your membership for any reason including but not limited to breach of the terms of use, using the service for commercial purpose, engaging in prohibited or inappropriate communication or activity, by sending notice to you at the email address as provided by you in your application for membership or such other email address as you may later provide to GuyHub. If GuyHub terminates your membership for breach of terms of this Agreement, you will not be entitled to any refund of any Subscription fees, if any, paid by you.</Text>
                <Text style={styles.aboutdes}>c. The term for the paid Membership would be in accordance with the type of membership undertaken.</Text>

                <Text style={styles.aboutHeading}>5. Non-Commercial Use by Members.</Text>
                <Text style={styles.aboutdes}>This app is for the personal use of individual members of all ages to advertise and promote their profiles to generate accepts from relevant matches and cannot be used in connection with any commercial endeavors. This includes providing links to another web App, whether deemed competitive to GuyHub or otherwise. Organizations, companies, and/or businesses cannot become Members of GuyHub and should not use the GuyHub Service or Apps for any purpose. Illegal and/or unauthorized uses of the Apps, including unauthorized framing of or linking to the Apps will be investigated, and appropriate legal action will be taken, including without limitation, civil, criminal, and injunctive redress.</Text>

                <Text style={styles.aboutHeading}>6. Terms of Use for Members.</Text>
                <Text style={styles.aboutdes}>
                GuyHub reserves the right in its sole discretion to review the activity and status of each account and block access to the member based on such review.</Text>
                <Text style={[styles.aboutdes,{color:'#0078d7'}]}>a.  Guyhub has no tolerance for objectionable content or abusive users. Users who do not follow our content guidelines while posting images, tweets or communicating with other users will be immediately blocked by the Guyhub admin and all their past posts and content will also be blocked.</Text>
                <Text style={[styles.aboutdes,{color:'#0078d7'}]}>b.  User can flag objectionable content and admin will take action on it in maximum 24 hours if the objection is found to be genuine.</Text>

                <Text style={[styles.aboutdes,{color:'#0078d7'}]}>c. Guyhub users can block abusive users and the other users whos posts they do not want to see.</Text>


<Text style={styles.aboutdes}>d. GuyHub reserves the right in its sole discretion to restrict/suspend the member’s free access to its web apps based on the review of the member's activity, status or any such criteria GuyHub may deem fit and proper, with due intimation to the member.</Text>
<Text style={styles.aboutdes}>e. Multiple profiles of the same person are not allowed on our App. GuyHub reserves the right to deactivate all multiple profiles without any refund of subscription fees.</Text>
<Text style={styles.aboutdes}>f. You confirm that the Content, information including the personal information provided by you is correct and accurate.</Text>
<Text style={styles.aboutdes}>g. Except to promote/advertising your profile for matchmaking purposes, you cannot engage in advertising to or solicitation of, other Members to buy or sell any products or services through the Service.</Text>
<Text style={styles.aboutdes}>h. You will not transmit any chain letters or junk email to other GuyHub Members. Although GuyHub cannot monitor the conduct of its Members off the GuyHub App, it is also a violation of these rules to use any information obtained from other members in order to harass, abuse, or harm another person, or in order to contact, advertise to, solicit, or sell to any Member without their prior explicit consent.</Text>
<Text style={styles.aboutdes}>i. GuyHub reserves the right to take appropriate steps to protect GuyHub and/or its Members from any abuse/misuse as it deems appropriate in its sole discretion.</Text>
<Text style={styles.aboutdes}>j. You cannot use any automated processes, including IRC Bots, EXE's, CGI or any other programs/scripts to view content on or communicate /contact/respond/ interact with GuyHub and/or its members.</Text>
<Text style={styles.aboutdes}>k. GuyHub Members are expected to exercise simple precautions for their privacy and safety. A suggestive guideline of such precautions is enlisted under security tips <Text style={{color:'blue'}}>"Be Safe Online"</Text>. By becoming a Member you hereby agree to abide and adhere to the said Tips.</Text>
<Text style={styles.aboutdes}>l. GuyHub Members who subscribe to the GuyHub Select Service hereby, unconditionally and irrevocably confirm that you have read terms and conditions and agree to abide by them.</Text>
                <Text style={styles.aboutHeading}>7. Proprietary Rights in the Content on GuyHub</Text>
                <Text style={styles.aboutdes}>GuyHub owns and retains all proprietary rights in the GuyHub Apps and the GuyHub Service. This app contains the copyrighted material, trademarks, and other proprietary information of GuyHub, and its licensors. Except for that information which is in the public domain such as member profile or for which permission has been obtained from the user, you cannot copy, modify, publish, transmit, distribute, perform, display, or sell any such proprietary information. Any such act or an attempted act on your part shall constitute a violation of this Agreement and your membership is liable to be terminated forthwith by GuyHub without refund of any of your unused Subscription fees. GuyHub reserves the right to take legal action (civil and/or criminal) wherever applicable for any violations.</Text>

                <Text style={styles.aboutHeading}>8. Content Posted on the Apps.</Text>
                <Text style={styles.aboutdes}>
                You understand and agree that GuyHub may delete any listing, content, communication, photos or profiles (collectively, "Content") that in the sole judgment of GuyHub violate this Agreement or which might be offensive, illegal, or that might violate the rights, harm, or threaten the safety of either GuyHub and/or its Members.
</Text>
<Text style={styles.aboutdes}>a. With respect to Content you submit or make available for inclusion on publicly accessible areas of the App including but not limited to your contact details, you hereby unconditionally and irrevocably grant to GuyHub the license to use, store, distribute, reproduce, prepare derivative works of, modify, adapt, publicly perform and publicly display such Content on the Apps and to the members of GuyHub community Apps(s) from time to time.</Text>
<Text style={styles.aboutdes}>b. You understand and hereby agree that all information, data, text, photographs, graphics, communications, tags, or other Content whether publicly posted or privately transmitted or otherwise made available to GuyHub are the sole responsibility of the person from whom such Content originated and shall be at the member's/person's sole risks and consequences. This means that you (and not GuyHub) are solely responsible for all Content that you upload, post, email, transmit or otherwise make available via the Service. GuyHub does not control the Content posted via the Service and, as such, does not guarantee the accuracy, integrity or quality of such Content. Under no circumstances will GuyHub be liable in any way for any Content, including, but not limited to, any errors or omissions in any Content, or any loss or damage of any kind incurred as a result of the use of any Content posted, emailed, transmitted or otherwise made available via the Service. GuyHub reserves the right to verify the authenticity of Content posted on the Apps. In exercising this right, GuyHub may ask you to provide any documentary or another form of evidence supporting the Content you post on the Apps. If you fail to produce such evidence to the satisfaction of GuyHub, GuyHub may, in its sole discretion, terminate your Membership without a refund.</Text>
<Text style={styles.aboutdes}>c. The following is an indicative list of the kind of Content that is illegal or prohibited on the Apps. GuyHub will investigate and take appropriate legal action in its sole discretion against anyone who violates this Agreement, including without limitation, removing the offending communication/Content from the Service and terminating the Membership of such violators without a refund.</Text>

<Text style={styles.aboutdes}>d. Illegal and prohibitive Content includes Content which:</Text>
<Text style={styles.aboutdes1}>i. is blatantly offensive to the community, such as Content that promotes racism, bigotry, hatred or physical harm of any kind against any group or individual;</Text>
<Text style={styles.aboutdes1}>ii. Harasses or advocates harassment of another person;</Text>
<Text style={styles.aboutdes1}>iii. Involves the transmission of "junk mail", "chain letters," or unsolicited mass mailing or "spamming";</Text>
<Text style={styles.aboutdes1}>iv. Promotes information that you know is false, misleading or promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory or libelous;</Text>
<Text style={styles.aboutdes1}>v. promotes an illegal or unauthorized copy of another person's copyrighted work, such as providing pirated computer programs or links to them, providing information to circumvent manufacture-installed copy-protect devices, or providing pirated music or links to pirated music files;</Text>
<Text style={styles.aboutdes1}>vi. Contains restricted or password-only access pages, or hidden pages or images (those not linked to or from another accessible page);</Text>
<Text style={styles.aboutdes1}>vii. Displays pornographic or sexually explicit material of any kind;</Text>
<Text style={styles.aboutdes1}>viii. Provides instructional information about illegal activities such as making or buying illegal weapons, violating someone's privacy, or providing or creating computer viruses;</Text>
<Text style={styles.aboutdes1}>ix. Solicits passwords or personal identifying information for commercial or unlawful purposes from other users; and</Text>
<Text style={styles.aboutdes1}>x. engages in commercial activities and/or sales without our prior written consent such as contests, sweepstakes, barter, advertising, and pyramid schemes</Text>
<Text style={styles.aboutdes}>e. You must use the GuyHub Service in a manner consistent with any and all applicable local, state, and federal laws, rules and regulations.</Text>
<Text style={styles.aboutdes}>f. You cannot include in your Member profile, visible to other members, any telephone numbers, street addresses, URLs, and email addresses.</Text>                
                <Text style={styles.aboutHeading}>9. Copyright Policy</Text>
                <Text style={styles.aboutdes}>You cannot post, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior written consent of the owner of such proprietary rights.
Without limiting the foregoing, if you believe that your work has been copied and posted on the GuyHub service in a way that constitutes copyright infringement, please provide us with the following information:</Text>
<Text style={styles.aboutdes}>Without limiting the foregoing, if you believe that your work has been copied and posted on the GuyHub service in a way that constitutes copyright infringement, please provide us with the following information:</Text>
                <Text style={styles.aboutdes}>•	an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;</Text>
                <Text style={styles.aboutdes}>•	description of the copyrighted work that you claim has been infringed;</Text>
                <Text style={styles.aboutdes}>•	description of where the material that you claim is infringing is located on the Apps;</Text>
                <Text style={styles.aboutdes}>•	your address, telephone number, and email address;</Text>
                <Text style={styles.aboutdes}>•	a written statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</Text>
                <Text style={styles.aboutdes}>•	a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf;</Text>
                <Text style={styles.aboutdes}>Notice of claims of copyright infringement can be sent to us in writing to the United Kingdom address located under the Help/Contact section on the Apps.</Text>

                <Text style={styles.aboutHeading}>10. Your Interaction with other Members & Member Disputes</Text>
                <Text style={styles.aboutdes}>You are solely responsible for your advertisement/communications with other GuyHub Members. GuyHub reserves the right but has no obligation, to monitor disputes between you and other Members. GuyHub also reserves the right to take appropriate action against errant members. However, GuyHub is not obliged to share such action with other members, including complainants. GuyHub expressly disclaims any responsibility or liability for any transactions.</Text>

                <Text style={styles.aboutHeading}>11. Contributions towards GuyHub</Text>
                <Text style={styles.aboutdes}>
                GuyHub, a Social Initiative by Lamaid Ltd
</Text>
<Text style={styles.aboutdes}>•	GuyHub is only facilitating the transactions on <Text style={{color:'blue'}}>www.GuyHub.online</Text> for collecting the contribution towards GuyHub.</Text>
<Text style={styles.aboutdes}>•	GuyHub shall not be responsible for the end use of the amounts being contributed.</Text>
<Text style={styles.aboutdes}>•	For any reason, if GuyHub agrees to refund the amount paid for the subscription, in such an event the amount contributed to GuyHub shall not be liable for a refund.</Text>
                <Text style={styles.aboutHeading}>12. Privacy</Text>
                <Text style={styles.aboutdes}>Use of the GuyHub Apps and/or the GuyHub Service is governed by our <Text style={{color:'blue'}}>Privacy Policy</Text> and follow guidelines to protect your privacy.</Text>

                <Text style={styles.aboutHeading}>13. Disclaimers</Text>
                <Text style={styles.aboutdes}>
                GuyHub is not responsible for any incorrect or inaccurate Content/listing posted on the Apps or in connection with the GuyHub Service, whether caused by Users, Members or by any of the equipment or programming associated with or utilized in the Service, nor for the conduct of any User and/or Member of the GuyHub Service whether online or offline.</Text>

                <Text style={styles.aboutHeading}>14. Limitation on Liability</Text>
                <Text style={styles.aboutdes}>In no event will GuyHub be liable to you or any third person for any indirect, consequential, exemplary, incidental, special or punitive damages, including also lost profits arising from your use of the App or the GuyHub Service, even if GuyHub has been advised of the possibility of such damages. Notwithstanding anything to the contrary contained herein, GuyHub's liability to you for any cause whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to GuyHub, for the Service during the term of membership.</Text>

                <Text style={styles.aboutHeading}>15. Jurisdiction </Text>
                <Text style={styles.aboutdes}>If there is any dispute about or involving the App and/or the Service, by using this app, you unconditionally agree that all such disputes and/or differences will be governed by the laws of United Kingdom only.</Text>

                <Text style={styles.aboutHeading}>16. Indemnity</Text>
                <Text style={styles.aboutdes}>You agree to indemnify and hold GuyHub, its subsidiaries, affiliates, officers, agents, and other partners and employees, fully indemnified and harmless from any loss, liability, claim, or demand, including reasonable attorney's fees, made by any third party due to or arising out of your use of the Service in violation of this Agreement and/or arising from a breach of these Terms of Use and/or any breach of your representations and warranties set forth above and/or any fraudulent act on your part.</Text>

                <Text style={styles.aboutHeading}>17. Other</Text>
                <Text style={styles.aboutdes}>
                By becoming a Member of the GuyHub service, you agree to receive certain specific emails from GuyHub and/or its group Apps. You can unsubscribe at any time for any reason quickly and easily by clicking on the unsubscribe link enclosed in the mail. You can also manage your subscription to these emails using the My Alert Manager option.</Text>
        <Text style={styles.aboutdes}>•	This Agreement, accepted upon use of the Apps and further affirmed by becoming a Member of the GuyHub service, contains the entire agreement between you and GuyHub regarding the use of the Apps and/or the Service. If any provision of this Agreement is held invalid, the remainder of this Agreement shall continue in full force and effect.
</Text>
        <Text style={[styles.aboutdes,{marginTop:10}]}>By becoming a member of GuyHub and/or using the Services of the Apps, you unconditionally and irrevocably confirm that you have read and understood the above provisions and agree to abide by them.
Please <Text style={{color:'blue'}}>contact us</Text> with any questions regarding this service </Text>
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
    aboutHeading:{fontSize:20,color:'#4691f1',textAlign:'left',marginVertical:5, },
    aboutdes:{fontSize:14, marginBottom:5, color:'#000'},
    aboutdes1:{fontSize:14, marginBottom:5,marginLeft:20, color:'#000'},
});

//make this component available to the app
export default PrivacyPolicy;
