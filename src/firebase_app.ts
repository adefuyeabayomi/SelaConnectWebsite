// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEYJ6j07iTKUF3aDrsmHyHneY8F5Qkzbg",
  authDomain: "sela-connect-logistics.firebaseapp.com",
  projectId: "sela-connect-logistics",
  storageBucket: "sela-connect-logistics.appspot.com",
  messagingSenderId: "219545572204",
  appId: "1:219545572204:web:2db292377274a6fd635949",
  measurementId: "G-8D1Y596BFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app