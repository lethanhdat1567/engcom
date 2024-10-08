import { useEffect, useState } from 'react';
import { db } from '~/firebase/config';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';

const useFirestore = (collectionName, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = collection(db, collectionName);
        let collectionQuery = query(collectionRef, orderBy('createdAt'));

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            collectionQuery = query(
                collectionQuery,
                where(condition.fieldName, condition.operator, condition.compareValue),
            );
        }

        const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDocuments(documents);
        });

        return unsubscribe;
    }, [collectionName, condition]);

    return documents;
};

export default useFirestore;
