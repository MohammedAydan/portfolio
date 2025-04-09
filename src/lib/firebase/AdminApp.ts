// src/lib/firebase/AdminApp.ts
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminApp: App;

if (!getApps().length) {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Missing Firebase Admin environment variables.");
    }

    adminApp = initializeApp({
        credential: cert({
            projectId,
            clientEmail,
            privateKey,
        }),
        projectId,
        storageBucket,
    });
} else {
    adminApp = getApp();
}

export default adminApp;
export const adminAuth = getAuth(adminApp);

