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
                <Text style={{fontSize:40,  marginBottom: 25, color: 'white'}}>Welcome Back!</Text>

                <TextInput style={{fontSize:20,color: 'white'}}
                onChangeText={
                    // Set this.state.email to the value in this Input box
                    (value) => this.setState({ email: value })
                }
                placeholder="Email"
                placeholderTextColor="white" 
                />
                <TextInput style={{fontSize:20, color: 'white'}}
                onChangeText={
                    // Set this.state.email to the value in this Input box
                    (value) => this.setState({ password: value })
                }
                placeholder="Password"
                placeholderTextColor="white" 
                />
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
                <TouchableOpacity style={styles.defaultBtn}
                onPress={() => this.props.navigation.navigate('ResetPassword')}
                //onPress={ this.handleForgotPassword }
                > 
                <Text style={styles.centerText}>Fogot Password</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(loginScreen);