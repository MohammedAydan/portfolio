"use server";

import { cookies } from "next/headers";

export const createSession = async (token: string, { uid }: { uid?: string }) => {
    const cookieStore = await cookies();

    cookieStore.set("SESSIONID", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });

    if (uid) {
        cookieStore.set("SESSION_UID", uid, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });
    }

    return { success: true };
};

export const getSession = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    const session = cookieStore.get("SESSIONID");
    return session?.value ?? null;
};

export const getSessionUid = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    const session = cookieStore.get("SESSION_UID");
    return session?.value ?? null;
};

export const removeSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("SESSIONID");
    cookieStore.delete("SESSION_UID");

    return { success: true };
};
