// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNYIQzAFIqJy3vH1vfID-tdbad6_O4SDc",
  authDomain: "agenta-b23ec.firebaseapp.com",
  projectId: "agenta-b23ec",
  storageBucket: "agenta-b23ec.appspot.com",
  messagingSenderId: "995258433134",
  appId: "1:995258433134:web:799ac9bc23bbb8cf54707f",
  measurementId: "G-NSZ8ND0XEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//exporta la base de datos para poder utilizarla en todo el proyecto
export const db = getFirestore(app);