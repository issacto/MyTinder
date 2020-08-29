import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class homeScreen extends React.Component {

    render() {
        return (
            <View>
                <Text>home screen</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(homeScreen);