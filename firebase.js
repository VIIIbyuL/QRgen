// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv6-yKHTIrv-LKHjvmFqEWvavpH8DiF4Y",
  authDomain: "qrgen-67081.firebaseapp.com",
  projectId: "qrgen-67081",
  storageBucket: "qrgen-67081.appspot.com",
  messagingSenderId: "513173168080",
  appId: "1:513173168080:web:109ee2f4b4b11c674263d5",
  measurementId: "G-5NYCTKS00F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
