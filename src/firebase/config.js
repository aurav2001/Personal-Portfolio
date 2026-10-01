import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using environment variables with safe fallbacks
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDummyKeyForPortfolioInit_replace_with_yours",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "portfolio-projects-db.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "portfolio-projects-db",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "portfolio-projects-db.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456"
};

// Check if credentials have been configured
export const isFirebaseConfigured = () => {
  return (
    process.env.REACT_APP_FIREBASE_API_KEY &&
    process.env.REACT_APP_FIREBASE_API_KEY !== "AIzaSyDummyKeyForPortfolioInit_replace_with_yours"
  );
};

// Initialize Firebase safely
let app;
let db = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization warning (safe fallback active):", error.message);
}

export { app, db };
