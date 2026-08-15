import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyHuYFMFvbrlVe5eeBeolMguwPn3_IuK8",
  authDomain: "ekoprints-1de49.firebaseapp.com",
  projectId: "ekoprints-1de49",
  storageBucket: "ekoprints-1de49.firebasestorage.app",
  messagingSenderId: "286028361290",
  appId: "1:286028361290:web:41fe944b335469156340b3",
  measurementId: "G-K4Z0D0BMBJ"
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
