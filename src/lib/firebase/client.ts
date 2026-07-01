import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ Tu configuración correcta de Firebase (copiada exactamente)
const firebaseConfig = {
  apiKey: "AIzaSyDRdAvQnzW7pz-3tbAbZ1W5DgftE4O-R18",
  authDomain: "humboldt-atlas.firebaseapp.com",
  projectId: "humboldt-atlas",
  storageBucket: "humboldt-atlas.firebasestorage.app",
  messagingSenderId: "312887102487",
  appId: "1:312887102487:web:dcd1619fc75e3a81346052",
  measurementId: "G-5D017KCPLF"
};

// Inicializar Firebase solo si no hay instancias previas
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;