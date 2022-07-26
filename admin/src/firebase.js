// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXBL05MRe3GIAxsIUAm3Q1hf0dJfZTXtI",
  authDomain: "bit-shopper.firebaseapp.com",
  projectId: "bit-shopper",
  storageBucket: "bit-shopper.appspot.com",
  messagingSenderId: "569760289446",
  appId: "1:569760289446:web:d457a25a72ed54002b9a67",
  measurementId: "G-X9Z9C0BEBB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
