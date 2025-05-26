import { db, realtimeDb } from './firebase';
import { collection, addDoc, getDocs, query, where, Query, CollectionReference } from 'firebase/firestore';
import { ref, set, get, child } from 'firebase/database';

// 共通の型定義
type FirestoreData = Record<string, unknown>;
type RealtimeDBData = Record<string, unknown>;
type QueryValue = string | number | boolean | null;

// Firestore操作
export const addToFirestore = async (collectionName: string, data: FirestoreData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const getFromFirestore = async (collectionName: string, field?: string, value?: QueryValue) => {
  try {
    let q: Query | CollectionReference;
    if (field && value !== undefined) {
      q = query(collection(db, collectionName), where(field, '==', value));
    } else {
      q = collection(db, collectionName);
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// Realtime Database操作
export const addToRealtimeDB = async (path: string, data: RealtimeDBData) => {
  try {
    await set(ref(realtimeDb, path), data);
    return true;
  } catch (error) {
    console.error('Error adding data to Realtime DB: ', error);
    throw error;
  }
};

export const getFromRealtimeDB = async (path: string) => {
  try {
    const snapshot = await get(child(ref(realtimeDb), path));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('Error getting data from Realtime DB: ', error);
    throw error;
  }
};
