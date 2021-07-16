import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import variables from "../../.env.js"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: variables.API_FIREBASE_KEY,
    authDomain: variables.API_FIREBASE_AUTH_DOMAINE,
    projectId: variables.API_FIREBASE_PROJECTID,
    storageBucket: variables.API_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: variables.API_FIREBASE_MESSENGING_SENDER_ID,
    appId: variables.API_FIREBASE_APPID,
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
//firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();