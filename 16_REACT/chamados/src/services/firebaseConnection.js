import firebase from "firebase/compat/app";
import "firebase/compat/auth";  
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAFCxEJMy5jvw0H9mkOCggPE7oFaWj4HU",
    authDomain: "chamados-de546.firebaseapp.com",
    projectId: "chamados-de546",
    storageBucket: "chamados-de546.appspot.com",
    messagingSenderId: "625397358816",
    appId: "1:625397358816:web:03501e90c802a7c9b1b085",
    measurementId: "G-EV24KX7J00"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;