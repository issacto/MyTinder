import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: xxxx,
    authDomain: xxxx,
    databaseURL: xxxx,
    projectId: xxxx,
    storageBucket: xxxx,
    /*messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",*/
  };

  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
