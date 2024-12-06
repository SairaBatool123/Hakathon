import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged , sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore ,collection, addDoc, getDocs , doc , deleteDoc, updateDoc , getDoc , query, where} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbhHydySwhw0TQpFHpsBuT8au-MUgAqEU",
  authDomain: "fir-hackathon-4aa5a.firebaseapp.com",
  projectId: "fir-hackathon-4aa5a",
  storageBucket: "fir-hackathon-4aa5a.firebasestorage.app",
  messagingSenderId: "201709990906",
  appId: "1:201709990906:web:38b55cc8abf2383ee6ea43",
  measurementId: "G-VXESYNTM0C"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth ,createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , sendPasswordResetEmail, getFirestore , signOut , collection, addDoc , db, getDocs , doc , deleteDoc, updateDoc , getDoc , query, where} 