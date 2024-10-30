import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

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

// Kết nối với Firebase Emulator cho Authentication (chỉ khi trên localhost)
if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://localhost:9099');
}

// Kết nối với Firestore Emulator nếu đang chạy trên localhost
if (window.location.hostname === 'localhost') {
    connectFirestoreEmulator(db, 'localhost', 8080);
}

export { auth, db };
