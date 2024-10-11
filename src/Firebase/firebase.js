// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD35Ygd86k1JmvY7pMZ5Q2lX6QKT5Ttl7Y",
  authDomain: "socail-media-6a6ad.firebaseapp.com",
  projectId: "socail-media-6a6ad",
  storageBucket: "socail-media-6a6ad.appspot.com",
  messagingSenderId: "272201980959",
  appId: "1:272201980959:web:b439176b3b51645bb0092a",
  measurementId: "G-KNVTM2ZKLM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
export const db=getFirestore(app);
export const storage = getStorage(app);
export default app;
