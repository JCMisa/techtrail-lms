// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "website-backend-5e67e.firebaseapp.com",
  projectId: "website-backend-5e67e",
  storageBucket: "website-backend-5e67e.appspot.com",
  messagingSenderId: "240186054573",
  appId: "1:240186054573:web:4dd5a03e8a688012867324",
  measurementId: "G-ZSH3V1L3T1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
