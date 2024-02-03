
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration for boda-app
// const firebaseConfig = {
//   apiKey: "AIzaSyDlPELmUEgZTIIlW2_gD-y6akUNySMOJHw",
//   authDomain: "react-cursos-ca49f.firebaseapp.com",
//   projectId: "react-cursos-ca49f",
//   storageBucket: "react-cursos-ca49f.appspot.com",
//   messagingSenderId: "139845588944",
//   appId: "1:139845588944:web:0545fd48835c6384bb4bd5"
// };

// Your web app's Firebase configuration for boda-app-2
const firebaseConfig = {
  apiKey: "AIzaSyB0lkwSSfpDuD_JUnFC0Ir9unp6CQUnI5c",
  authDomain: "boda-app-2.firebaseapp.com",
  projectId: "boda-app-2",
  storageBucket: "boda-app-2.appspot.com",
  messagingSenderId: "263984780293",
  appId: "1:263984780293:web:91350d6a205f954f68b86c"
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig); 
export const FirebaseAuth = getAuth(FirebaseApp); //Contiene todas las funcionalidas de autenticacion
export const FirebaseDB = getFirestore(FirebaseApp); //Contiene todas las funcionalidas de la base de datos

