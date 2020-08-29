import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput,Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { store } from '../redux/store';
import { updateAuth } from '../redux/action';

export default class registerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'ulovedating@gmail.com',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      modalVisible: false,
      forgotModalVisible: false,
      confirmationForgotCode:'',
      ForgotGeneratedPpassword:''
    };
  }

  handleSignUp = () => {
    // alert(JSON.stringify(this.state));
    const { email, password, confirmPassword } = this.state;
    // Make sure passwords match
    if(password.length<6){
      alert('Password must exceed 6 characters');
      return ;
    }/*
    if(password.){

    }*/
    if (password === confirmPassword) {
      Auth.signUp({
        username: email,
        password,
        attributes: { email },
        })
        // On success, show Confirmation Code Modal
        .then(() => this.setState({ modalVisible: true }))
        // On failure, display error in console
        .catch(err =>  alert("Email has been registered"));
    } else {
      alert('Passwords do not match.');
    }
  }
  handleConfirmationCode = () => {
    const { email, confirmationCode } = this.state;
    Auth.confirmSignUp(email,confirmationCode)
      .then(() => {
        //Tim please work on this! I dun kn how to fix this. ITs not working
        store.dispatch(updateAuth({loggedin: true}));
        
      })
      .catch(err => console.log(err));
  }

  handleForgotPassword =() =>{
    const { email } = this.state;
    Auth.forgotPassword(email)
    .then(data => this.setState({ forgotModalVisible: true }))
    .catch(err => console.log(err));
  }

  handleConfirmedForgotPassword =() =>{
    const { email, confirmationForgotCode, ForgotGeneratedPpassword } = this.state;
    Auth.forgotPasswordSubmit(email, confirmationForgotCode, ForgotGeneratedPpassword)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to MyAlligatorFace!</Text>
        
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
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <TextInput
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ confirmPassword: value })
          }
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Button
          title='Submit'
          onPress={ this.handleSignUp }
        />
         <Button
          title='Forget Password'
          onPress={ this.handleForgotPassword }
        />
        <Modal
          visible={this.state.modalVisible}
        >
          <View
            style={styles.container}
          >
            <TextInput
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationCode: value })
                
              }
              placeholder="confirmationcode"
            />
            <Button
              title='Submit'
              onPress={ this.handleConfirmationCode }
            />
          </View>
        </Modal>

        <Modal
          visible={this.state.forgotModalVisible}
        >
          <View
            style={styles.container}
          >
            
            <TextInput
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationForgotCode: value })
                
              }
              placeholder="confirmation code"
            />
            <TextInput
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ ForgotGeneratedPpassword: value })
                
              }
              placeholder="new password"
            />
            <Button
              title='Submit'
              onPress={ this.handleConfirmedForgotPassword }
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});