// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDagJFsZNDFhS9PcV9W0is5HLt2xKzWqUY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nexoratechno-lms.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://nexoratechno-lms-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nexoratechno-lms",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nexoratechno-lms.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "457679796165",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:457679796165:web:7adc0f493d77a8f9ca7dac",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-KBSH6B9XV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics & Services
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
