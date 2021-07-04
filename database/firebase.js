import firebase from 'firebase'

import 'firebase/firestore'

import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyC2vp0fuAG8mcKooLSTzVlJ_UDLtLQKGpg",
  authDomain: "profp-e0f4d.firebaseapp.com",
  projectId: "profp-e0f4d",
  storageBucket: "profp-e0f4d.appspot.com",
  messagingSenderId: "995719786547",
  appId: "1:995719786547:web:cc4b649480abbae40fb346"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

export default {
  firebase,
  auth,
  db,
}

// export default firebase;