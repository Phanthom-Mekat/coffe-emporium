// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVuxepvBH2-PL1RM6CjysNksCfzkmTK38",
  authDomain: "coffee-project-a7a9f.firebaseapp.com",
  projectId: "coffee-project-a7a9f",
  storageBucket: "coffee-project-a7a9f.firebasestorage.app",
  messagingSenderId: "230769182331",
  appId: "1:230769182331:web:e108779ab42fd4b20704de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;