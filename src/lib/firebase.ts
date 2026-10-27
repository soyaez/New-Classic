/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocFromServer,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore with custom database ID if provisioned
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Test connection on boot as required by skill guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    // Offline or empty doc error is handled gracefully
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection check: client appears offline.');
    }
  }
}
testConnection();

export interface QuoteRequestData {
  customerName: string;
  phone: string;
  email?: string;
  serviceType?: string;
  quantity?: number;
  notes?: string;
}

/**
 * Submit a quote request into Firestore
 */
export async function submitQuoteRequest(data: QuoteRequestData) {
  try {
    const quotesRef = collection(db, 'quoteRequests');
    const docRef = await addDoc(quotesRef, {
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting quote request to Firebase:', error);
    throw error;
  }
}
