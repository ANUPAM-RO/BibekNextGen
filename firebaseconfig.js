// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfW3fsu7Bba_jqL3jySeJGT5IMTc7Z8Is",
  authDomain: "dashboard-company.firebaseapp.com",
  projectId: "dashboard-company",
  storageBucket: "dashboard-company.appspot.com",
  messagingSenderId: "526549497350",
  appId: "1:526549497350:web:a0a2c30f2af12317857587",
  measurementId: "G-EW1930XXSN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
