import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { updateAuth } from '../redux/action';
import { store } from '../redux/store';
import { styles } from '../styles';

class settingsScreen extends React.Component {

    render() {
        return (
            <View style={styles.screen}>
                <TouchableOpacity
                    onPress={() => store.dispatch(updateAuth({ loggedin: false }))}
                    style={styles.defaultBtn}
                >
                    <Text style={styles.centerText}>Log out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(settingsScreen);