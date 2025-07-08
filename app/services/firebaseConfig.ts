import { initializeApp } from 'firebase/app';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Get this config from Firebase Console → Project Settings → Config
const firebaseConfig = {
  apiKey: "AIzaSyCair0wt94NUIzRtAM6_cvfvD0Gbo8gqUU",
  authDomain: "agora-video-call-9bdf6.firebaseapp.com",
  projectId: "agora-video-call-9bdf6",
  storageBucket: "agora-video-call-9bdf6.appspot.com",
  messagingSenderId: "455734752558",
  appId: "1:455734752558:android:2003162d09efe45ba0b6bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore DB and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
