// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  measurementId: "G-5NYCTKS00F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();

export { auth };