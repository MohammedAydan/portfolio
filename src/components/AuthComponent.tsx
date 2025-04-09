"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function AuthComponent() {
    const { handleSignInWithGoogle, loading } = useAuth();
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
                <div className="max-w-lg w-full text-center">
                    <div className="p-10">
                        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                            Authentication Required
                        </h1>
                        <p className="text-gray-400 mb-8">
                            You need to sign in to access this page. Please authenticate to continue.
                        </p>
                        <button
                            className="flex justify-center items-center bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold py-3 px-6 rounded-xl w-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSignInWithGoogle}
                            disabled={loading}
                        >
                            {!loading ?
                                ("Sign In with Google") :
                                (<Loader2 className="animate-spin" />)}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
