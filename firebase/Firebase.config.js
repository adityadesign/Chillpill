import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwiyc8kDQq0-5uS-drVe-C8M6w0E0rtNk",
  authDomain: "chillpill-61342.firebaseapp.com",
  projectId: "chillpill-61342",
  storageBucket: "chillpill-61342.appspot.com",
  messagingSenderId: "1008028866840",
  appId: "1:1008028866840:web:b04e0fbd69c4d07359e66d",
  measurementId: "G-MR91W1ZMT6"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP)