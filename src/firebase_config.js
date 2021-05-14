import firebase from 'firebase';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyBAoi5MClqjAWETc7sN3E7Sv6Xm-z3y9RE",
    authDomain: "moviezzz-92ff7.firebaseapp.com",
    projectId: "moviezzz-92ff7",
    storageBucket: "moviezzz-92ff7.appspot.com",
    messagingSenderId: "968833992831",
    appId: "1:968833992831:web:e1347174ed3cab4d7b974a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  export {db};