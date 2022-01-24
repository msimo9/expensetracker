// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyACQNLUhtVYukSk2MISDGxhSRXkbcu7RXo",

  authDomain: "expense-tracker-b785d.firebaseapp.com",

  projectId: "expense-tracker-b785d",

  storageBucket: "expense-tracker-b785d.appspot.com",

  messagingSenderId: "113900374134",

  appId: "1:113900374134:web:80f95d93bd878135147757",

  measurementId: "G-CVTHM2VR8P"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

const auth = getAuth();

export default auth;