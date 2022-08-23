// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANI4Na41kKWbPLQ_o0rHscbsJn32mT0aY",
  authDomain: "hospitals-ef025.firebaseapp.com",
  projectId: "hospitals-ef025",
  storageBucket: "hospitals-ef025.appspot.com",
  messagingSenderId: "647810554746",
  appId: "1:647810554746:web:3fb264316716d5466454c3",
  measurementId: "G-90QCEP58BX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);