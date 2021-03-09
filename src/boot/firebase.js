
import firebase from "firebase/app"
import "firebase/firestore"

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyCN9irfVJ7hRPI9jL6qIHKsa40GDn8b9yM",
  authDomain: "qweeter-8d775.firebaseapp.com",
  projectId: "qweeter-8d775",
  storageBucket: "qweeter-8d775.appspot.com",
  messagingSenderId: "186610267223",
  appId: "1:186610267223:web:39a655907b3a2a2cb11f12"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db;