import { getSession } from "@/actions/auth-action";
import AuthComponent from "@/components/AuthComponent";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Auth Page",
    description: "Auth Page",
}

export default async function AuthPage() {
    const session = await getSession();

    if (session) (
        redirect("/")
    )
    
    return <AuthComponent />;
}
