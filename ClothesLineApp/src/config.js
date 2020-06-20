import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBabft-ptsGJ9KU8cYQna2H-VbfIr3K_-4",
  authDomain: "clothingline-b8991.firebaseapp.com",
  databaseURL: "https://clothingline-b8991.firebaseio.com/",
  projectId: "clothingline-b8991",
  storageBucket: "clothingline-b8991.appspot.com",
  messagingSenderId: "195899522991",
  appId: "1:195899522991:web:63adabb9275a488366f95a",
  measurementId: "G-SQKL6CYLFM"
};


  let app = firebase.initializeApp(firebaseConfig);
  //export default firebase;
  export const db = app.firestore();
