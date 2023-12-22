
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDL660KVWRR9V0dhTioYNSJGFHX8pQhWbU",
  authDomain: "alt-farm.firebaseapp.com",
  projectId: "alt-farm",
  storageBucket: "alt-farm.appspot.com",
  messagingSenderId: "761787243193",
  appId: "1:761787243193:web:4d23e849b011eb195f1968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Exportamos nuestra base de datos a toda la APP
export const db = getFirestore(app);