// src/firebase/firebase-messaging.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Replace with your actual Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyCQgKE0AtCHEwrbh2u0tgRHXhokYThvG7o",
    authDomain: "paymentsrecieved-41be3.firebaseapp.com",
    databaseURL: "https://paymentsrecieved-41be3-default-rtdb.firebaseio.com",
    projectId: "paymentsrecieved-41be3",
    storageBucket: "paymentsrecieved-41be3.firebasestorage.app",
    messagingSenderId: "581738015318",
    appId: "1:581738015318:web:0c2560c0d9c175d96e69f7",
    measurementId: "G-YFPTLLQ914"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
