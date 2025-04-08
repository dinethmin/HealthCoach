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
  apiKey: "AIzaSyDe4YpWd_VCTTuMFyZIz54vF30oDfRHz2M",
  authDomain: "health-coach-bbd44.firebaseapp.com",
  projectId: "health-coach-bbd44",
  storageBucket: "health-coach-bbd44.firebasestorage.app",
  messagingSenderId: "126871223994",
  appId: "1:126871223994:web:a3d9c041222f14647c4c83",
  measurementId: "G-X90GTXWK2R",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_Storage = getStorage(FIREBASE_APP);
export { ref, getDownloadURL };

