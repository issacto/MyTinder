# What doesn't kill u makes u - myTinder
<br>A simulation app for Tinder
<br>Front-end: React Native
<br>Backend: Amazon Cognito, Google Firebase
<br>Packages/System: Redux, React Native Gifted Chat, ImagePicker


## Amazon Cognito
<br>In App.js:
```javascript
import Amplify from 'aws-amplify';
Amplify.configure(aws_exports);
```
<br>For RegistrationScreen.js:
```javascript
import { Auth } from 'aws-amplify';
Auth.signUp({
       username: email,
       password,
       attributes: { email },
       })
```
<br>For LoginScreen.js:
```javascript
import { Auth } from 'aws-amplify';
Auth.signIn(email,password)
        .then(  user=>   
        store.dispatch(updateAuth({loggedin: true, name:name })))
        // On failure, display error in console
        .catch(err => Alert.alert("Wrong Username/Password"));
    }
```


## Google Firebase
### Realtime Database:


### Storage:


## Demonstration:



## Areas to work on 
1. Get more description for Swipe
2. Calculate distance for users
3. Use id for Key instead of email



Special thanks to : Timothy Lo
Guide: https://www.instamobile.io/react-native-controls/react-native-swipe-cards-tinder/
