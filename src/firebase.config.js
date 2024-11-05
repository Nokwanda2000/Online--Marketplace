// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGf0mk-Sf2iUi4JFi1sDBsyqS6wpKqkLY",
  authDomain: "online-marketplace-2bd25.firebaseapp.com",
  projectId: "online-marketplace-2bd25",
  storageBucket: "online-marketplace-2bd25.firebasestorage.app",
  messagingSenderId: "1017653799652",
  appId: "1:1017653799652:web:43976c684237807cac1af1",
  measurementId: "G-1LGPYQ4L4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const storage = getStorage(app);
const db = getFirestore(app);

export { app, analytics, auth, storage, db };