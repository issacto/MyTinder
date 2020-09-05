import * as firebase from 'firebase';

const firebaseConfig = {
    //Confidential
  };

  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
