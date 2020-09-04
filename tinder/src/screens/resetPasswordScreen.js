import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput,TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { store } from '../redux/store';
import { styles } from '../styles';
import { updateAuth } from '../redux/action';

export default class resetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      forgotModalVisible: false,
      confirmationForgotCode:'',
      ForgotGeneratedPassword:''
    };
  }


  handleForgotPassword =() =>{
    const { email } = this.state;
    Auth.forgotPassword(email)
    .then(data => this.setState({ forgotModalVisible: true }))
    .catch(err => console.log(err));
  }

  handleConfirmedForgotPassword =() =>{
    const { email, confirmationForgotCode, ForgotGeneratedPassword } = this.state;
    Auth.forgotPasswordSubmit(email, confirmationForgotCode, ForgotGeneratedPassword)
    .then(this.setState({forgotModalVisible: false}), this.props.navigation.navigate('Login'))
    .catch(err => console.log(err));
  }


  render() {
    return (
      <View style={styles.screen}>
        
        <TextInput style={{fontSize:20, color: 'white'}}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ email: value })
          }
          placeholder="my@email.com"
          placeholderTextColor="white" 
        />

        <TouchableOpacity style={styles.defaultBtn } 
          onPress={ this.handleForgotPassword}>
          <Text style={styles.centerText}>Submit</Text>
          </TouchableOpacity>
         
        

        <Modal
          visible={this.state.forgotModalVisible}
        >
          <View
            style={styles.screen}
          >
            
            <TextInput style={{fontSize:20, color: 'white'}}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationForgotCode: value })
                
              }
              placeholder="confirmation code"
              placeholderTextColor="white" 
            />
            <TextInput style={{fontSize:20, color: 'white'}}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ ForgotGeneratedPassword: value })
                
              }
              placeholder="new password"
              placeholderTextColor="white" 
            />
            <TouchableOpacity style={styles.defaultBtn}
              onPress={ this.handleConfirmedForgotPassword }>
                <Text style={styles.centerText}>Verify</Text>
            </TouchableOpacity>
            
          </View>
        </Modal>
      </View>
    );
  }
}

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});