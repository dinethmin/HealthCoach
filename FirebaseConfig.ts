// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  Auth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByiDdAhtwz39-SSPa73AhsfZq4YEOoAz8",
  authDomain: "healthcoach-64321.firebaseapp.com",
  projectId: "healthcoach-64321",
  storageBucket: "healthcoach-64321.firebasestorage.app",
  messagingSenderId: "639459962024",
  appId: "1:639459962024:web:8a2135e7063a96ae4f269d",
  measurementId: "G-Q8VRTYXE8E"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_Storage = getStorage(FIREBASE_APP);
export { ref, getDownloadURL };

