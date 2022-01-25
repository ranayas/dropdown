import { getFirestore } from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmWTc9_6z2FY1FNkvIaK1fHUqeniSdrrU",
  authDomain: "dropdown-a18c9.firebaseapp.com",
  projectId: "dropdown-a18c9",
  storageBucket: "dropdown-a18c9.appspot.com",
  messagingSenderId: "344476361997",
  appId: "1:344476361997:web:23b2628856f406bd0abc44",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export default db;
