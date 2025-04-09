"use client";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { createSession, removeSession } from "@/actions/auth-action";
import { redirect } from "next/navigation";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    error: string | null;
    handleSignInWithGoogle: () => Promise<void>;
    handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                removeSession();
                setUser(null);
                setLoading(false);
                redirect("/auth");
            }
            setLoading(true);
            setUser(currentUser);
            const token = await currentUser?.getIdToken();
            createSession(token ?? "", { uid: currentUser?.uid });
            setLoading(false);
        }, (error) => {
            setError("Error fetching user: " + error.message);
            setLoading(false);
        }, () => {
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleSignInWithGoogle = async () => {
        setLoading(true);
        try {
            const res = await signInWithGoogle();
            setUser(res as User);
            const token = await (res as User)?.getIdToken();
            createSession(token ?? "", { uid: (res as User)?.uid });
            redirect("/");
        } catch (error) {
            setError("Error signing in with Google: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut();
            setUser(null);
            removeSession();
            redirect("/");
        } catch (error) {
            setError("Error signing out: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, handleSignInWithGoogle, handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
