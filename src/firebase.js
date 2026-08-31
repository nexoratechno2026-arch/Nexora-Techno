import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDagJFsZNDFhS9PcV9W0is5HLt2xKzWqUY",
  authDomain: "nexoratechno-lms.firebaseapp.com",
  projectId: "nexoratechno-lms",
  storageBucket: "nexoratechno-lms.firebasestorage.app",
  messagingSenderId: "457679796165",
  appId: "1:457679796165:web:7adc0f493d77a8f9ca7dac",
  measurementId: "G-KBSH6B9XV2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
