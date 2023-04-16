// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV59ZvLAQfK93zb8X8f_EFHgAGThwjIS8",
  authDomain: "movies-3d229.firebaseapp.com",
  projectId: "movies-3d229",
  storageBucket: "movies-3d229.appspot.com",
  messagingSenderId: "555894269478",
  appId: "1:555894269478:web:5946d640af62a45c33e8e7",
  measurementId: "G-CZZCEESYS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);