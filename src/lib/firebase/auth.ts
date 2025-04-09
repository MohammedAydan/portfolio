import {
    User,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    Unsubscribe,
    NextOrObserver,
    CompleteFn,
    ErrorFn,
} from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { auth, db } from "./ClientApp";

export const getUser = (): User | null => auth.currentUser;

export const onAuthStateChanged = (
    nextOrObserver: NextOrObserver<User>,
    error?: ErrorFn,
    completed?: CompleteFn
): Unsubscribe => {
    return firebaseOnAuthStateChanged(auth, nextOrObserver, error, completed);
};

export const signInWithGoogle = async (): Promise<User | Error> => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user document already exists
        const existingUser = await getUserData(user.uid);
        if (!existingUser) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber ?? null,
                emailVerified: user.emailVerified ?? null,
                role: "user",
                machine: navigator.userAgent ?? null,
                createdAt: new Date().toISOString(),
            });
        }

        return user;
    } catch (err: any) {
        return new Error(err?.message || "Failed to sign in with Google");
    }
};

export const signOut = async (): Promise<void | Error> => {
    try {
        await auth.signOut();
    } catch (err: any) {
        console.error("Sign out error:", err);
        return new Error(err?.message || "Failed to sign out");
    }
};

export const getUserData = async (uid: string): Promise<any | null> => {
    try {
        const docRef = doc(db, "users", uid);
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? snapshot.data() : null;
    } catch (err) {
        console.error("Error fetching user data:", err);
        return null;
    }
};

export const updateUserData = async (uid: string, data: any): Promise<void | Error> => {
    try {
        const docRef = doc(db, "users", uid);
        await setDoc(docRef, data, { merge: true });
    } catch (err: any) {
        console.error("Error updating user data:", err);
        return new Error(err?.message || "Failed to update user data");
    }
};
