import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyASr0j5ENzBXpyPTlZYG9fJSq-DLuntMd4",
    authDomain: "590594859732.firebaseapp.com",
    databaseURL: "https://ulove-903e0.firebaseio.com/",
    projectId: "ulove-903e0",
    storageBucket: "gs://ulove-903e0.appspot.com",
    /*messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",*/
  };

  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
