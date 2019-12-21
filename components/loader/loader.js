import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Loader extends Component {
    constructor(props){
        super(props);
        this.state={
            animating: true
        }
    }
    componentDidUpdate(prevProps, prevState) {       
        if (this.state.animating !== this.props.loaderclose) {
            this.setState({ animating: this.props.loaderclose });
        }
      }
   
   
   render() {
      const animating = this.state.animating
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               animating = {animating}
               color = '#bc2b78'
               size = "large"
               style = {styles.activityIndicator}/>
         </View>
      )
   }
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70,
      position:'absolute',
      zIndex:2000,
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
   }
})