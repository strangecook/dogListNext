const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCAlJ1b-aNYwP-Y3Xt15UqBaSWPGg1v5FU",
  authDomain: "doglist-b239a.firebaseapp.com",
  projectId: "doglist-b239a",
  storageBucket: "doglist-b239a.appspot.com",
  messagingSenderId: "312457653400",
  appId: "1:312457653400:web:8e5c5c926dc1619aa4f4ed",
  measurementId: "G-XQYLRW709B"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { db, storage, auth };
