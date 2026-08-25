import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase safely to prevent build errors during SSG / unit tests / when env vars are unconfigured
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = firebaseConfig.databaseURL ? getDatabase(app, firebaseConfig.databaseURL) : (null as unknown as ReturnType<typeof getDatabase>);
export const auth = firebaseConfig.apiKey ? getAuth(app) : (null as unknown as ReturnType<typeof getAuth>);

export const ensureAuth = async () => {
  if (typeof window !== "undefined" && auth && !auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.warn("Firebase anonymous auth skipped/error:", err);
    }
  }
};
