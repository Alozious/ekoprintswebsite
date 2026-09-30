import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtEs_BjXJ7EFGnszaFtbf13dq-kcvEVk8",
  authDomain: "luganda-tts-stt-chimptech.firebaseapp.com",
  projectId: "luganda-tts-stt-chimptech",
  storageBucket: "luganda-tts-stt-chimptech.firebasestorage.app",
  messagingSenderId: "800236652414",
  appId: "1:800236652414:web:9bba62f30888c2903c152f",
  measurementId: "G-9Y68FZQWRS"
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics safely
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

// Initialize Firestore
export const db = getFirestore(app);
export const storage = getStorage(app);

export interface QuoteData {
  name: string;
  phone: string;
  email?: string;
  service: string;
  quantity?: string;
  details?: string;
  createdAt?: any;
  status?: string;
}

/**
 * Saves a new quote request to Firebase Firestore in the 'quotes' collection.
 */
export async function saveQuoteToFirebase(quote: QuoteData): Promise<string> {
  try {
    const quotesCol = collection(db, 'quotes');
    const docRef = await addDoc(quotesCol, {
      ...quote,
      status: 'pending',
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding quote to Firestore: ', error);
    throw error;
  }
}
