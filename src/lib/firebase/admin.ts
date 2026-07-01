import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Importar directamente el archivo JSON
import serviceAccount from '../../../firebase-key.json';

const adminApp = getApps().length === 0
  ? initializeApp({
      credential: cert(serviceAccount as any),
    })
  : getApps()[0];

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);