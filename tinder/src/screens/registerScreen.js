import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput,TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { store } from '../redux/store';
import { styles } from '../styles';
import { updateAuth } from '../redux/action';
import firebase from '../firebase.js';

export default class registerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: 'aA1!aA1!',
      confirmPassword: 'aA1!aA1!',
      confirmationCode: '',
      modalVisible: false,
    };
  }

  handleSignUp = () => {
    // ".", "#", "$", "[", or "]"] cannnot
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
      var timeRegistered = new Date().getSeconds();
      var name= email.split(".")[0].split('@')[0]
      console.log(name)
      var userRef = firebase.database().ref("users/"  + name);
      //set up the account for the person
      userRef.set({username: name, 
        registeredtime:timeRegistered, 
        peopleNotSwiped:{}, 
        peopleSwiped:{}});
        var rootRef = firebase.database().ref().child("users");
        rootRef.once("value", function(snapshot) {
          snapshot.forEach(function(child) {
            if (child.key !== name){
              userRef.child("peopleNotSwiped").push({name: child.key});
            }
          });
        }); 
      //add this person to all the others
      rootRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          if (child.key !== name){
            firebase.database().ref('users/' + child.key +"/peopleNotSwiped").push({name:child.key});

          }
          console.log(child.key);
        });
      }
      );
      store.dispatch(updateAuth({loggedin: true, name: name }));
        
      })
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
        <TextInput style={{fontSize:20, color: 'white'}}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ password: value })
          }
          placeholder="p@ssw0rd123"
          placeholderTextColor="white" 
          secureTextEntry
        />
        <TextInput style={{fontSize:20, color: 'white'}}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ confirmPassword: value })
          }
          placeholder="p@ssw0rd123"
          placeholderTextColor="white" 
          secureTextEntry
        />

        <TouchableOpacity style={styles.defaultBtn } 
          onPress={ this.handleSignUp }>
          <Text style={styles.centerText}>Submit</Text>
          </TouchableOpacity>
         
        <Modal
          visible={this.state.modalVisible}
        >
          <View
            style={styles.screen}
          >
           <TextInput style={{fontSize:20, color: 'white'}}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationCode: value })
                
              }
              placeholder="confirmationcode"
              placeholderTextColor="white"
            />
            <TouchableOpacity style={styles.defaultBtn}
              title='Submit'
              onPress={ this.handleConfirmationCode }>
              <Text style={styles.centerText}>Log in</Text>
              </TouchableOpacity>
          </View>
        </Modal>

      </View>
    );
  }
}