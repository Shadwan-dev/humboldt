import { useEffect, useState, useCallback } from 'react';
import { db } from '@/lib/firebase/client';
import { collection, query, where, orderBy, getDocs, QueryConstraint } from 'firebase/firestore';

interface UseFirestoreOptions {
  constraints?: QueryConstraint[];
  enabled?: boolean;
}

export function useFirestore<T = any>(
  collectionName: string,
  options: UseFirestoreOptions = {}
) {
  const { constraints = [], enabled = true } = options;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      let q;
      if (constraints.length > 0) {
        q = query(collection(db, collectionName), ...constraints);
      } else {
        q = collection(db, collectionName);
      }
      
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      
      setData(items);
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [collectionName, JSON.stringify(constraints), enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}