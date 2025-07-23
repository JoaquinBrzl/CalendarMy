// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeO_u7a-MRFCqvsx4qenyVPHe0kTONejI",
  authDomain: "calendarmy-5ca7a.firebaseapp.com",
  projectId: "calendarmy-5ca7a",
  storageBucket: "calendarmy-5ca7a.firebasestorage.app",
  messagingSenderId: "868205933474",
  appId: "1:868205933474:web:28a17e908e5240526878fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);