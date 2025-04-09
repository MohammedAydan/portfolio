"use client"
import ShowPortfoliosTable from "@/components/ShowPortfoliosTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { Delete, EditIcon, Trash2 } from "lucide-react";
import Image from "next/image";

const ProfileContent = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 mt-48 md:mt-40">
            {/* Profile Section */}
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex items-center justify-start gap-4">
                        <Image src={user?.photoURL ?? ""} alt={user?.email ?? "user image"} className="rounded-full" width={100} height={100} />
                        <div>
                            <CardTitle className="text-xl md:text-3xl font-bold">{user?.email}</CardTitle>
                            <p className="text-xl text-muted-foreground">{user?.displayName}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">Sign In With: <span className="text-foreground/80">{user?.providerData[0].providerId}</span></p>
                    <p className="mb-4">Last Sign In Time: <span className="text-foreground/80">{user?.metadata.lastSignInTime}</span></p>
                    <p className="mb-4">Creation Time: <span className="text-foreground/80">{user?.metadata.creationTime}</span></p>
                </CardContent>
            </Card>

            {/* Portfolio Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                    {user?.uid && <ShowPortfoliosTable userId={user?.uid ?? ""} />}
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileContent;

interface Portfolio {
    id: string;
    name: string;
    title: string;
    description: string;
    createdAt: { seconds: number; nanoseconds: number };
    skills: { title: string; body: string }[];
    toolsAndFrameworks: { title: string; body: string }[];
    educationAndCertifications: { title: string; subTitle: string; type: string }[];
    workExperience: { title: string; company: string }[];
    projects: { name: string; technologies: string; description: string; type: string; sourceCode: string; viewProject: string }[];
}

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (value: any) => string;
}
