import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBUm1m3asrVHa95iBW2tPejMmAj9qCSpEs",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "gaurav-portfolio-95597.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "gaurav-portfolio-95597",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "gaurav-portfolio-95597.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "680149915512",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:680149915512:web:43c78625c7cbc3549d1a8d"
};

// Cloud credentials configured
export const isFirebaseConfigured = () => true;

// Initialize Firebase safely
let app;
let db = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization warning:", error.message);
}

export { app, db };
