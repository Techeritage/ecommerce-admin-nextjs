// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "e-commerce-2a028.firebaseapp.com",
  projectId: "e-commerce-2a028",
  storageBucket: "e-commerce-2a028.appspot.com",
  messagingSenderId: "613739816489",
  appId: "1:613739816489:web:21088f031a9b525f98de38",
  measurementId: "G-8DHN4TYPLL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);