import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACtduBNIKpupT1nyLRFouzeg5JRLs2zYo",
  authDomain: "auth-app-421b4.firebaseapp.com",
  projectId: "auth-app-421b4",
  storageBucket: "auth-app-421b4.firebasestorage.app",
  messagingSenderId: "675895975035",
  appId: "1:675895975035:web:086a659e17490aaf7c96de"
};

const app = initializeApp(firebaseConfig);

// 🔥 ye sabse important line
export const auth = getAuth(app);