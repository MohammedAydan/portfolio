import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/AdminApp";

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader || typeof authHeader !== "string") {
            return NextResponse.json(
                { success: false, error: "Unauthorized: Missing Authorization header" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1]; // expected format: "Bearer <token>"

        if (!token) {
            return NextResponse.json(
                { success: false, error: "Unauthorized: Token not found in header" },
                { status: 401 }
            );
        }

        const decodedToken = await adminAuth.verifyIdToken(token);

        return NextResponse.json(
            { success: true, uid: decodedToken.uid },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("[Token Verification Error]:", error?.message || error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
