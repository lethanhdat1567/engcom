import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { doc, setDoc } from 'firebase/firestore';

export const addDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp(),
        });

        return docRef;
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};

export const updateDocument = async (collectionName, docId, data) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await setDoc(docRef, data, { merge: true }); // Cập nhật mà không ghi đè
        console.log('Document updated successfully');
    } catch (error) {
        console.error('Error updating document:', error);
    }
};
