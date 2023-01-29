// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAn7r5AUMohYCXiiAM6eHiw5dp7Qo7r64s",
    authDomain: "apnadoctorss.firebaseapp.com",
    projectId: "apnadoctorss",
    storageBucket: "apnadoctorss.appspot.com",
    messagingSenderId: "502452867379",
    appId: "1:502452867379:web:e92c35b48f1b050b9a2e46",
    measurementId: "G-P7LTQDR4GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);