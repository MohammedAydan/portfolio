import { collection, query, getCountFromServer } from "firebase/firestore";
import { db } from "../ClientApp";

export const useGetCollectionCount = async (collName: string): Promise<number> => {
    const collRef = collection(db, collName);
    const q = query(collRef);
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
};