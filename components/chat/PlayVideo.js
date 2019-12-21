import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView,SafeAreaView, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';





export default class PlayVideo extends Component {
  

        state = {
          rate: 1,
          volume: 1,
          muted: false,
          resizeMode: 'contain',
          duration: 0.0,
          currentTime: 0.0,
          paused: false,
        };
      
        video: Video;
      
        onLoad = (data) => {
          this.setState({paused:false})
          this.setState({ duration: data.duration });
        };
      
        onProgress = (data) => {
          this.setState({ currentTime: data.currentTime });
        };
      
        onEnd = () => {
          this.setState({ paused: false })

        };
      
        onAudioBecomingNoisy = () => {
          this.setState({ paused: true })
        };
      
        onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
          this.setState({ paused: !event.hasAudioFocus })
        };
      
        getCurrentTimePercentage() {
          if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
          }
          return 0;
        };
      


        renderRateControl(rate) {
          const isSelected = (this.state.rate === rate);
      
          return (
            <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
              <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                {rate}x
              </Text>
            </TouchableOpacity>
          );
        }
      
        renderResizeModeControl(resizeMode) {
          const isSelected = (this.state.resizeMode === resizeMode);
      
          return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
              <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                {resizeMode}
              </Text>
            </TouchableOpacity>
          )
        }
      
        renderVolumeControl(volume) {
          const isSelected = (this.state.volume === volume);
      
          return (
            <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
              <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                {volume * 100}%
              </Text>
            </TouchableOpacity>
          )
        }
      
        render() {
          const flexCompleted = this.getCurrentTimePercentage() * 100;
          const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
          console.log(this.state.paused)
          return (
            
            <SafeAreaView style={styles.container}>
              <View style={{  justifyContent: 'flex-start', alignItems: 'flex-start',  width: '100%', backgroundColor: 'black',position:'absolute',top:30, zIndex:9999,paddingVertical:10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[styles.backbutton1,{position:'absolute',top:5,zIndex:999}]}>
                        <Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#fff'
                     size={30} />
                        </TouchableOpacity>
                        <Text style={styles.header}>Video</Text>
              </View>
              <View
                style={styles.fullScreen}
                
              >
                <Video
                  ref={(ref: Video) => { this.video = ref }}
                  source={{uri: this.props.videourl}} 
                  style={styles.fullScreen}
                  onLoad={this.onLoad}
                  rate={this.state.rate}
                  paused={this.state.paused}
                  volume={this.state.volume}
                  muted={this.state.muted}
                  resizeMode={this.state.resizeMode}
                  onProgress={this.onProgress}
                  onEnd={this.onEnd}
                  onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                  repeat={false}
                />
              </View>
      
              <View style={styles.controls}>
                <TouchableOpacity style={{backgroundColor:'#0078d7',width:80,borderRadius:20}} onPress={()=>{
                  this.video.seek(0)
                  this.setState({paused:false})
                  
                }}>
                  <Text style={{textAlign:'center',fontSize:18,padding:10,color:'white'}}>Replay</Text>
                </TouchableOpacity>
                {/* <View style={styles.generalControls}>
                  <View style={styles.rateControl}>
                    {this.renderRateControl(0.25)}
                    {this.renderRateControl(0.5)}
                    {this.renderRateControl(1.0)}
                    {this.renderRateControl(1.5)}
                    {this.renderRateControl(2.0)}
                  </View>
      
                  <View style={styles.volumeControl}>
                    {this.renderVolumeControl(0.5)}
                    {this.renderVolumeControl(1)}
                    {this.renderVolumeControl(1.5)}
                  </View>
      
                  <View style={styles.resizeModeControl}>
                    {this.renderResizeModeControl('cover')}
                    {this.renderResizeModeControl('contain')}
                    {this.renderResizeModeControl('stretch')}
                  </View>
          </View>
      
               <View style={styles.trackingControls}>
                  <View style={styles.progress}>
                    <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                    <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                  </View>
        </View> */}
              </View>
            </SafeAreaView>
          );
        }
      }
    
      
     
      const styles = StyleSheet.create({
   
        controlOption: {
            alignSelf: 'center',
            fontSize: 11,
            color: 'white',
            paddingLeft: 2,
            paddingRight: 2,
            lineHeight: 12,
          },
          progress: {
            flex: 1,
            flexDirection: 'row',
            borderRadius: 3,
            overflow: 'hidden',
          },
          innerProgressCompleted: {
            height: 20,
            backgroundColor: '#cccccc',
          },
          innerProgressRemaining: {
            height: 20,
            backgroundColor: '#2C2C2C',
          },
          rateControl: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          },
          volumeControl: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          },
          container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          },
          fullScreen: {
            position: 'absolute',
            top: 50,
            left: 0,
            bottom: 20,
            right: 0,
          },
          generalControls: {
            flex: 1,
            flexDirection: 'row',
            borderRadius: 4,
            overflow: 'hidden',
            paddingBottom: 10,
          },
          controls: {
            backgroundColor: 'transparent',
            borderRadius: 5,
            position: 'absolute',
            bottom: 50,
            left: 20,
            right: 20,
          },
          backbutton1:{marginTop:12,marginLeft:8},
          header: {
            margin:8, color: 'white', textAlign: 'center', fontSize: 22, alignSelf: 'center', marginLeft: 20 
        },
    });
     


    