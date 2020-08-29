import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';

class swipeScreen extends React.Component {

    render() {
        return (
            <View style={styles.screen}>
                <Text>swipe screen</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(swipeScreen);