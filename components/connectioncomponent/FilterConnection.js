//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal,TouchableHighlight } from 'react-native';

// create a component
class FilterConnections extends Component {
    state={
        modalVisible:this.props.modalVisible
    }
  componentWillUpdate(prevProps, prevState){    
     this.state.modalVisible=this.props.modalVisible;      
  }
  setModalVisible=(visible)=>{
    this.setState({modalVisible:visible})
  }
    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                        <Text>Hello World!</Text>

                        <TouchableHighlight
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                        </View>
                    </View>
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
});

//make this component available to the app
export default FilterConnections;
