import adminApp, { adminAuth } from "@/lib/firebase/AdminApp";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { uid } = await req.json();
        if (!adminApp) return NextResponse.json({ error: "Firebase Admin App not initialized" }, { status: 500 });

        await adminAuth.deleteUser(uid);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}