import { Metadata } from "next";
import ProfileContent from "./_profile-content";
import { getSession } from "@/actions/auth-action";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Profile Page",
    description: "Profile Page",
};

const ProfilePage = async () => {
    const session = await getSession();

    if (!session) {
        redirect("/auth");
    }

    return (<ProfileContent />
    );
};

export default ProfilePage;

