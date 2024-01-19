
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlPELmUEgZTIIlW2_gD-y6akUNySMOJHw",
  authDomain: "react-cursos-ca49f.firebaseapp.com",
  projectId: "react-cursos-ca49f",
  storageBucket: "react-cursos-ca49f.appspot.com",
  messagingSenderId: "139845588944",
  appId: "1:139845588944:web:0545fd48835c6384bb4bd5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig); 
export const FirebaseAuth = getAuth(FirebaseApp); //Contiene todas las funcionalidas de autenticacion
export const FirebaseDB = getFirestore(FirebaseApp); //Contiene todas las funcionalidas de la base de datos