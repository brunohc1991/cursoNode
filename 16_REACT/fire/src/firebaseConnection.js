import firebase from "firebase/compat/app";
import "firebase/compat/auth";  
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtHQDwec1f6c1CjxLAVtDIKZ4izHk6hjY",
    authDomain: "curso-sujeitoprog.firebaseapp.com",
    projectId: "curso-sujeitoprog",
    storageBucket: "curso-sujeitoprog.appspot.com",
    messagingSenderId: "640255389791",
    appId: "1:640255389791:web:9630532505275c83d9abea",
    measurementId: "G-BSB5J8E1QL"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;