import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCWaOMj2CIzqLa-oyrkGqsxeXDBL1Ox3jg',
    authDomain: 'engcom-1f7c3.firebaseapp.com',
    projectId: 'engcom-1f7c3',
    storageBucket: 'engcom-1f7c3.appspot.com',
    messagingSenderId: '1090816601797',
    appId: '1:1090816601797:web:f1b757af6d7aa9f2118aac',
    measurementId: 'G-9MVD58S21H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Truyền app vào getAuth
const db = getFirestore(app); // Truyền app vào getFirestore

if (window.location.hostname === 'localhost') {
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
}

export { auth, db };
