import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export const addDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};
