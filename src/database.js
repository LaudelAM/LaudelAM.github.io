import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAfvaitXPRffCORs2xS2Km_bB8aJta1ML8",
  authDomain: "my-store-46d7f.firebaseapp.com",
  projectId: "my-store-46d7f",
  storageBucket: "my-store-46d7f.appspot.com",
  databaseURL: "https://my-store-46d7f-default-rtdb.firebaseio.com/",
  messagingSenderId: "905723884752",
  appId: "1:905723884752:web:572a0ff9828b7be9cd1ad5",
  measurementId: "G-4R2BGE8S20",
};

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const {TimeStamp, GeoPoint} = firebase.firestore;
export {TimeStamp, GeoPoint};

// if using Firebase JS SDK < 5.8.0
db.settings({timestampsInSnapshots: true});
