import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage"



const firebaseConfig = {
  apiKey: "AIzaSyCVydrCusRnlXJleMovy0UZAeg9hFVEQEk",
  authDomain: "phonebay-39b96.firebaseapp.com",
  projectId: "phonebay-39b96",
  storageBucket: "phonebay-39b96.appspot.com",
  messagingSenderId: "581195829751",
  appId: "1:581195829751:web:45e5793e9a56f1cd56def2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
export { firebase, db, storage };
