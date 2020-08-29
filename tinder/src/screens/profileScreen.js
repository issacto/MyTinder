import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';

class profileScreen extends React.Component {

    render() {
        return (
            <View style={styles.screen}>
                <Text>profile screen</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(profileScreen);