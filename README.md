# What doesn't kill u makes u - Tinder
<br>A simulation app for Tinder
<br>Front-end: React Native
<br>Backend: Amazon Cognito, Google Firebase
<br>Packages/System: Redux, React Native Gifted Chat, ImagePicker


## Introduction
```
cd tinder
react-native run-android
```

### LoginScreen

<p align="center">
<img src='https://github.com/issacto/mytinder/blob/master/LoginScreen.png' width="400">
</p>
<br>

### ProfileScreen

<p align="center">
<img src='https://github.com/issacto/mytinder/blob/master/ProfilePage.png' width="400">
</p>
<br>

### MatchedScreen

<p align="center">
<img src='https://github.com/issacto/mytinder/blob/master/MatchedScreen.png' width="400">
</p>
<br>


### Demonstration

<div align="center">
  <a href='https://www.youtube.com/watch?v=zi8Gf8LrpIc&feature=youtu.be" alt="IMAGE ALT TEXT'><img src="https://github.com/issacto/mytinder/blob/master/LoginScreen.png"></a>
</div>

## Amazon Cognito
### In App.js:
```javascript
import Amplify from 'aws-amplify';
Amplify.configure(aws_exports);
```
### In registrationScreen.js:
```javascript
import { Auth } from 'aws-amplify';
Auth.signUp({
       username: email,
       password,
       attributes: { email },
       })
```
** Amazon will send a email-verification email attached with a verification code for the user to input on the app
<br>
<br>
<p align="center">
<img src='https://github.com/issacto/mytinder/blob/master/Verification.png' width="600",height ="500">
</p>
<br>



### In loginScreen.js:
```javascript
import { Auth } from 'aws-amplify';
Auth.signIn(email,password)
        .then(  user=>   
        store.dispatch(updateAuth({loggedin: true, name:name })))
        // On failure, display error in console
        .catch(err => Alert.alert("Wrong Username/Password"));
    }
```
### In resetPasswordScreen.js
```javascript
import { Auth } from 'aws-amplify';
Auth.forgotPasswordSubmit(email, confirmationForgotCode, ForgotGeneratedPassword)
    .then(xxxx)
```

## Google Firebase
### Realtime Database:
```javascript
import firebase from '../firebase.js';
firebase.database().ref('users/' + name).set({xxxx});
```


### Storage:

```javascript
import firebase from '../firebase.js';
firebase.storage().ref("Usersimage/"+this.state.username).put(xxxx);
```




## Areas to work on 
1. Get more description for Swipe
2. Calculate distance for users
3. Use id for Key instead of email



Special thanks to : Timothy Lo
<br>Guide for swipetool.js: https://www.instamobile.io/react-native-controls/react-native-swipe-cards-tinder/
