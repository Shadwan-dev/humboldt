'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;  // ✅ Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role || 'basic');
        } else {
          const newUserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
            photoURL: firebaseUser.photoURL || '',
            role: 'basic',
            verificationStatus: 'verified',
            bio: '',
            institution: '',
            specialty: '',
            socialLinks: {},
            stats: { contributions: 0, publications: 0, comments: 0, projectsFollowed: 0 },
            badges: [],
            createdAt: new Date(),
            lastLogin: new Date(),
            followedProjects: []
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newUserData);
          setUserRole('basic');
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
    if (userDoc.exists()) {
      setUserRole(userDoc.data().role || 'basic');
    }
  };

  const signUp = async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    setUserRole('basic');
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserRole(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // ✅ signInWithGoogle con Promise<void>
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const newUserData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || '',
          photoURL: user.photoURL || '',
          role: 'basic',
          verificationStatus: 'verified',
          bio: '',
          institution: '',
          specialty: '',
          socialLinks: {},
          stats: { contributions: 0, publications: 0, comments: 0, projectsFollowed: 0 },
          badges: [],
          createdAt: new Date(),
          lastLogin: new Date(),
          followedProjects: []
        };
        await setDoc(doc(db, 'users', user.uid), newUserData);
        setUserRole('basic');
      } else {
        const userData = userDoc.data();
        setUserRole(userData.role || 'basic');
      }
    } catch (error) {
      console.error('Error en Google Sign-In:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userRole, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      resetPassword,
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}