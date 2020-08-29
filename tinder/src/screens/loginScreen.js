import React from 'react';
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import { updateAuth } from '../redux/action';
import { store } from '../redux/store';
import { styles } from '../styles';
import { Auth } from 'aws-amplify';


class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''}}

    handleSignIn = () => {
    const { email, password } = this.state;
    console.log(email + password);
    Auth.signIn(email,password)
        // If we are successful, navigate to Home screen
        //user => this.props.navigation.navigate('Register')
        .then(user=>store.dispatch(updateAuth({loggedin: true})))
        // On failure, display error in console
        .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.screen}>
                <TextInput
                onChangeText={
                    // Set this.state.email to the value in this Input box
                    (value) => this.setState({ email: value })
                }
                placeholder="my@email.com"
                />
                <TextInput
                onChangeText={
                    // Set this.state.email to the value in this Input box
                    (value) => this.setState({ password: value })
                }
                placeholder="aA1!aA1!"
                />
                <Text>login screen</Text>
                <TouchableOpacity
                    //onPress={() => store.dispatch(updateAuth({loggedin: true}))}
                    onPress={() => this.handleSignIn() }
                    style={styles.defaultBtn}
                >
                    <Text style={styles.centerText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}
                    style={styles.defaultBtn}
                >
                    <Text style={styles.centerText}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(loginScreen);