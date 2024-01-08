// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv6-yKHTIrv-LKHjvmFqEWvavpH8DiF4Y",
  authDomain: "qrgen-67081.firebaseapp.com",
  projectId: "qrgen-67081",
  storageBucket: "qrgen-67081.appspot.com",
  messagingSenderId: "513173168080",
  appId: "1:513173168080:web:109ee2f4b4b11c674263d5",
  measurementId: "G-5NYCTKS00F",
};

const app = initializeApp(firebaseConfig); // Initialize Firebase

export const auth = getAuth(app); // Initialize Firebase Authentication
