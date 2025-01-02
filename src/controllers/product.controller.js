import firebase from '../firebase.js';
import Document from '../models/document.model.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createDocument = async (data) => {
    await addDoc(collection(db, 'documents'), data);
};

export const getDocument = async (id) => {
    const product = doc(db, 'documents', id);
    const data = await getDoc(product);
    if (!data.exists()) {
        throw new Error('fdsfds')
    }
    return data.data();
};
