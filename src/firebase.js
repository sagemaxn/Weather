import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyAlAW3YBkbV3DnNG6494oWxI8ZPuxNU-n0",
    authDomain: "contactform-9d758.firebaseapp.com",
    databaseURL: "https://contactform-9d758.firebaseio.com",
    projectId: "contactform-9d758",
    storageBucket: "contactform-9d758.appspot.com",
    messagingSenderId: "20200245118",
    appId: "1:20200245118:web:8ed8dad0f963dd7853152f"
  };

firebase.initializeApp(config);

export default firebase;