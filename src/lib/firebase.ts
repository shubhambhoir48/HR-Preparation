import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC4xP7nZlw6tuk6nCIbxMXLwpBasQK75gY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hr-prep.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hr-prep",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hr-prep.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "542810606488",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:542810606488:web:8e806b8e5b9dda593a39ed",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-9V5NY5TMC3"
};

// Initialize Firebase (SSR Safe)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signOut };

// Strict Email Whitelist
export const WHITELISTED_EMAILS = [
  'priyankavartak17@gmail.com',
  'shubhambhoir4895@gmail.com'
];

export const isEmailWhitelisted = (email?: string | null): boolean => {
  if (!email) return false;
  return WHITELISTED_EMAILS.includes(email.toLowerCase().trim());
};
