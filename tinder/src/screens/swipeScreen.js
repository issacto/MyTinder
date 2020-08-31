import React from 'react';
import { Text, TouchableOpacity, View,StyleSheet,ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Swipe from "../swipetool.js";

import { styles } from '../styles';
const win = Dimensions.get('window');

class swipeScreen extends React.Component {

    render() {
        return (
            <View style={styles.screen}>
                <Text style={{fontSize:20, margin: 15, color: 'white'}}>Match</Text>
                <ImageBackground style={internalStyles.backgroundImage} >
                <Swipe/>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

const internalStyles = StyleSheet.create({
    backgroundImage:{
        flex:1,
        width:win.width,
        opacity: 0.8

    
    },
    bottomlinestyle:{
    backgroundColor:"red",
    width:win.width,
    alignItems: "center",
    fontSize: 25,
    padding:10,
    }


})

export default connect(mapStateToProps)(swipeScreen);