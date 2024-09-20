import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

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
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

export { auth, db };
