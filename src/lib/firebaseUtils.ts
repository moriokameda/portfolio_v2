import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { db, storage } from './firebase';
import type { DocumentData, QueryConstraint } from 'firebase/firestore';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

// Storage操作
export const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const reference = storageRef(storage, imagePath);
    return await getDownloadURL(reference);
  } catch (error) {
    console.error('Error getting image URL: ', error);
    throw error;
  }
};

// Firestoreのコレクション操作型定義
export type FirestoreCollection = 'projects' | 'skills' | 'history' | 'contacts';

// Firestoreデータ追加
export const addDocument = async <T extends Record<string, unknown>>(
  collectionName: FirestoreCollection,
  data: T
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

// Firestoreデータ取得 (単一ドキュメント)
export const getDocument = async <T>(
  collectionName: FirestoreCollection,
  docId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }

    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
};

// Firestoreデータ取得 (コレクション)
export const getDocuments = async <T>(
  collectionName: FirestoreCollection,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as T;
    });
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
};

// Firestoreデータ更新
export const updateDocument = async <T extends Record<string, unknown>>(
  collectionName: FirestoreCollection,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data as DocumentData);
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

// Firestoreデータ削除
export const deleteDocument = async (
  collectionName: FirestoreCollection,
  docId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// ヘルパー関数 - クエリ制約の作成
export const createQueryConstraints = (
  options: {
    whereField?: string;
    whereOperator?: '==' | '!=' | '>' | '>=' | '<' | '<=';
    whereValue?: unknown;
    orderByField?: string;
    orderDirection?: 'asc' | 'desc';
    limitCount?: number;
  } = {}
): QueryConstraint[] => {
  const constraints: QueryConstraint[] = [];

  if (options.whereField && options.whereOperator && options.whereValue !== undefined) {
    constraints.push(where(options.whereField, options.whereOperator, options.whereValue));
  }

  if (options.orderByField) {
    constraints.push(orderBy(options.orderByField, options.orderDirection || 'asc'));
  }

  if (options.limitCount) {
    constraints.push(limit(options.limitCount));
  }

  return constraints;
};
