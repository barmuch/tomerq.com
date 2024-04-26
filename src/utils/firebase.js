// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzdlibPKA0xRmDo8uEqIqbY4b5M5pjBsM",
  authDomain: "tomerq-75a0d.firebaseapp.com",
  projectId: "tomerq-75a0d",
  storageBucket: "tomerq-75a0d.appspot.com",
  messagingSenderId: "41283268046",
  appId: "1:41283268046:web:1c660344b082ef18c30f9f",
  measurementId: "G-4P4E3076GL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);