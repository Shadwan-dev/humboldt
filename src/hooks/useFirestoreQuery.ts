import { useEffect, useState, useCallback } from 'react';
import { db } from '@/lib/firebase/client';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  limit,
  QueryConstraint,
  QueryDocumentSnapshot
} from 'firebase/firestore';

interface UseFirestoreQueryOptions {
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  limitCount?: number;
  filters?: { field: string; operator: any; value: any }[];
}

export function useFirestoreQuery<T = any>(
  collectionName: string,
  options: UseFirestoreQueryOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { orderByField, orderDirection = 'asc', limitCount = 50, filters = [] } = options;

  const buildQuery = useCallback(() => {
    const constraints: QueryConstraint[] = [];
    
    // Agregar filtros
    filters.forEach(filter => {
      constraints.push(where(filter.field, filter.operator, filter.value));
    });
    
    // Agregar ordenamiento
    if (orderByField) {
      constraints.push(orderBy(orderByField, orderDirection));
    }
    
    // Agregar límite
    constraints.push(limit(limitCount));
    
    return query(collection(db, collectionName), ...constraints);
  }, [filters, orderByField, orderDirection, limitCount, collectionName]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const q = buildQuery();
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      
      setData(items);
      setHasMore(querySnapshot.docs.length === limitCount);
      if (querySnapshot.docs.length > 0) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [buildQuery, collectionName, limitCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, hasMore, refetch: fetchData };
}