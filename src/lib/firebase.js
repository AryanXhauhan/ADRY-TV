import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// Note: Analytics is client-side only in Next.js, so we skip it in standard init or handle dynamically.

const firebaseConfig = {
  apiKey: "AIzaSyCAfdje84_1byW0UYoiTQ8m3aPwAtoZlSA",
  authDomain: "adry-tv.firebaseapp.com",
  projectId: "adry-tv",
  storageBucket: "adry-tv.firebasestorage.app",
  messagingSenderId: "873468151438",
  appId: "1:873468151438:web:97ecd2dacca3cedbaf6bdf",
  measurementId: "G-2BRJXZ4XHP"
};

// Initialize Firebase
// Next.js hot-reloading can cause multiple initializations, so we check if an app already exists
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
