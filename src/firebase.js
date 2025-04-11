// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMVdm72elL9HB97642HogdNlNQJjpO3iM",
  authDomain: "brookside-mps.firebaseapp.com",
  projectId: "brookside-mps",
  storageBucket: "brookside-mps.firebasestorage.app",
  messagingSenderId: "323365398911",
  appId: "1:323365398911:web:e48809ae9033006d40524a",
  measurementId: "G-VEX11D4E2E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
