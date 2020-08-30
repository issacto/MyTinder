import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';

class contactScreen extends React.Component {

    render() {
        return (
            <View style={styles.screen}>
                <Text style={{fontSize:20, margin: 15, color: 'white'}}>Contact screen</Text>
                <View style ={internalStyles.chatbox}>
                
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Chat')}
                    style={internalStyles.individualchatbox}
                >
                <Text style={styles.centerText}>Go Chat with </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const win = Dimensions.get('window');
const internalStyles= StyleSheet.create({
    chatbox:{
        alignItems: 'center',
        borderRadius:10,
        backgroundColor: 'red',
        width: win.width/1.05,
        height: win.height/1.25
    },
    individualchatbox:{
        backgroundColor: '#F7F7FF',
        borderRadius: 5,
        elevation: 10,
        height: 40,
        justifyContent: 'center',
        margin: 10,
        width: 200,
        width: win.width/1.1,

    },

})

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(contactScreen);