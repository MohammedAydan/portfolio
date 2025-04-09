"use client";
import { useState, useCallback, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  getDocs,
  QueryDocumentSnapshot,
  where,
  doc,
  deleteDoc,
  QueryConstraint,
  DocumentData as FirestoreDocumentData,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "../ClientApp";
import { adminAuth } from "../AdminApp";

// Document data interface
export interface DocumentData {
  id: string;
  [key: string]: any;
}

// Filter definition interface
export interface QueryFilter {
  field: string;
  operator: WhereFilterOp;
  value: any;
}

// Hook options interface
export interface FirestorePaginationOptions {
  initialFirstDoc?: QueryDocumentSnapshot | null;
  docsPerPage?: number;
  splitData?: boolean;
  orderByField?: string;
  orderDirection?: "asc" | "desc";
  filters?: QueryFilter[];
}

/**
 * Custom hook for pagination with Firestore collections
 * @param collectionName - The Firestore collection name
 * @param options - Configuration options for pagination
 */
export const useFirestorePagination = (
  collectionName: string,
  {
    initialFirstDoc = null,
    docsPerPage = 5,
    splitData = false,
    orderByField = "createdAt",
    orderDirection = "desc",
    filters = [],
  }: FirestorePaginationOptions = {}
) => {
  // State management
  const [data, setData] = useState<DocumentData[]>([]);
  const [firstDoc, setFirstDoc] = useState<QueryDocumentSnapshot | null>(initialFirstDoc);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Process Firestore snapshot into usable data
   */
  const processSnapshot = useCallback((snapshot: any): DocumentData[] => {
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc: QueryDocumentSnapshot<FirestoreDocumentData>) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }, []);

  /**
   * Build Firestore query constraints
   */
  const buildQueryConstraints = useCallback(
    (additionalConstraints: QueryConstraint[] = []): QueryConstraint[] => {
      const constraints: QueryConstraint[] = [];

      // Add all filters
      if (filters && filters.length > 0) {
        filters.forEach(filter => {
          constraints.push(where(filter.field, filter.operator, filter.value));
        });
      }


      // Add ordering
      constraints.push(orderBy(orderByField, orderDirection));

      // Add additional constraints
      if (additionalConstraints.length > 0) {
        constraints.push(...additionalConstraints);
      }

      // Add limit
      constraints.push(limit(docsPerPage));

      console.log("constraints");
      console.log(constraints);


      return constraints;
    },
    [filters, orderByField, orderDirection, docsPerPage]
  );

  /**
   * Fetch data from Firestore with error handling
   */
  const fetchFirestoreData = useCallback(
    async (queryConstraints: QueryConstraint[]): Promise<{
      items: DocumentData[];
      docs: QueryDocumentSnapshot[];
    }> => {
      try {
        const collectionRef = collection(db, collectionName);
        const dataQuery = query(collectionRef, ...queryConstraints);
        const snapshot = await getDocs(dataQuery);
        const items = processSnapshot(snapshot);

        return {
          items,
          docs: snapshot.docs
        };
      } catch (err) {
        console.error("Firestore query error:", err);
        throw err;
      }
    },
    [collectionName, processSnapshot]
  );

  /**
   * Fetch initial data from Firestore
   */
  const fetchInitialData = useCallback(async () => {
    try {
      setInitialLoading(true);
      setLoading(true);
      setError(null);

      const queryConstraints = buildQueryConstraints();
      const { items, docs } = await fetchFirestoreData(queryConstraints);

      setData(items);

      if (docs.length > 0) {
        setFirstDoc(docs[0]);
        setLastDoc(docs[docs.length - 1]);
      } else {
        setFirstDoc(null);
        setLastDoc(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch initial data");
      setData([]);
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  }, [buildQueryConstraints, fetchFirestoreData]);

  /**
   * Fetch the next page of data
   */
  const fetchNextPage = useCallback(async () => {
    if (!lastDoc) return;

    try {
      setLoading(true);
      setError(null);

      const queryConstraints = buildQueryConstraints([startAfter(lastDoc)]);
      const { items, docs } = await fetchFirestoreData(queryConstraints);

      if (items.length === 0) {
        setLastDoc(null);
        return;
      }

      setData(prev => splitData ? items : [...prev, ...items]);

      if (docs.length > 0) {
        setFirstDoc(docs[0]);
        setLastDoc(docs[docs.length - 1]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch next page");
    } finally {
      setLoading(false);
    }
  }, [lastDoc, buildQueryConstraints, fetchFirestoreData, splitData]);

  /**
   * Fetch the previous page of data
   */
  const fetchPrevPage = useCallback(async () => {
    if (!firstDoc) return;

    try {
      setLoading(true);
      setError(null);

      const queryConstraints = buildQueryConstraints([endBefore(firstDoc)]);
      const { items, docs } = await fetchFirestoreData(queryConstraints);

      if (items.length === 0) {
        setFirstDoc(null);
        return;
      }

      setData(items);

      if (docs.length > 0) {
        setFirstDoc(docs[0]);
        setLastDoc(docs[docs.length - 1]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch previous page");
    } finally {
      setLoading(false);
    }
  }, [firstDoc, buildQueryConstraints, fetchFirestoreData]);

  /**
   * Search data in the collection
   */
  const searchData = useCallback(
    async (searchField: string, searchValue: string) => {
      if (!searchField || !searchValue) return;

      try {
        setLoading(true);
        setError(null);

        // Build search constraints
        const searchConstraints: QueryConstraint[] = [
          where(searchField, ">=", searchValue),
          where(searchField, "<=", searchValue + "\uf8ff"),
          orderBy(searchField),
          limit(docsPerPage)
        ];

        // Add existing filters if any
        if (filters && filters.length > 0) {
          filters.forEach(filter => {
            // Don't add duplicate constraints on the search field
            if (filter.field !== searchField) {
              searchConstraints.unshift(where(filter.field, filter.operator, filter.value));
            }
          });
        }

        const collectionRef = collection(db, collectionName);
        const searchQuery = query(collectionRef, ...searchConstraints);
        const snapshot = await getDocs(searchQuery);
        const items = processSnapshot(snapshot);

        setData(items);

        if (snapshot.docs.length > 0) {
          setFirstDoc(snapshot.docs[0]);
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        } else {
          setFirstDoc(null);
          setLastDoc(null);
        }
      } catch (err) {
        console.error("Search error:", err);
        setError(err instanceof Error ? err.message : "Failed to search data");
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [collectionName, filters, docsPerPage, processSnapshot]
  );

  /**
   * Delete an item from the collection
   */
  const deleteItem = useCallback(
    async (id: string) => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const docRef = doc(db, collectionName, id);
        if(collectionName === "users") {
          // await adminAuth.getUser(id);
        }
        // Delete the document from Firestore
        await deleteDoc(docRef);

        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);

        // If we deleted the last item or are close to empty, fetch fresh data
        if (updatedData.length === 0) {
          await fetchInitialData();
        }
      } catch (err) {
        console.error("Delete error:", err);
        setError(err instanceof Error ? err.message : "Failed to delete item");
      } finally {
        setLoading(false);
      }
    },
    [collectionName, data, fetchInitialData]
  );

  /**
   * Update filters dynamically
   */
  const updateFilters = useCallback(
    async (newFilters: QueryFilter[]) => {
      try {
        setLoading(true);
        setError(null);

        // Update filters in options
        filters = newFilters;

        // Refetch data with new filters
        await fetchInitialData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update filters");
      } finally {
        setLoading(false);
      }
    },
    [fetchInitialData]
  );

  // Load initial data on mount
  useEffect(() => {
    if (!initialFirstDoc) {
      fetchInitialData();
    }
  }, [initialFirstDoc]);

  return {
    data,
    initialLoading,
    loading,
    error,
    fetchInitialData,
    fetchNextPage,
    fetchPrevPage,
    searchData,
    deleteItem,
    updateFilters,
    hasNext: !!lastDoc,
    hasPrev: !!firstDoc,
  };
};