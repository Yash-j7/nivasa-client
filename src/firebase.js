// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTFWUTRxpUoR6DoA1bJkhjvziQ3s2IND0",
  authDomain: "e-state-nivasa.firebaseapp.com",
  projectId: "e-state-nivasa",
  storageBucket: "e-state-nivasa.firebasestorage.app",
  messagingSenderId: "707634099068",
  appId: "1:707634099068:web:9235098307c33186126af9",
  measurementId: "G-0SXBS4BXY3",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
