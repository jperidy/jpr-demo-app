import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC6oYHmFpV1NyDh1V86tQ8z2UoN0KCdgYk",
    authDomain: "svelte-app-60dde.firebaseapp.com",
    projectId: "svelte-app-60dde",
    storageBucket: "svelte-app-60dde.appspot.com",
    messagingSenderId: "789768154360",
    appId: "1:789768154360:web:9b57f6dfe1b3f9860e5f0d"
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