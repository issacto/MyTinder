import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';

class contactScreen extends React.Component {

    render() {
        return (
            <View style={styles.screen}>
                <Text>contact screen</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Chat')}
                    style={styles.defaultBtn}
                >
                    <Text style={styles.centerText}>Go back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(contactScreen);