"use client";
import { collection, deleteDoc, doc, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/ClientApp";

interface Portfolio {
    id: string;
    name: string;
    title: string;
    description: string;
    createdAt: string;
    skills: { title: string; body: string }[];
    toolsAndFrameworks: { title: string; body: string }[];
    educationAndCertifications: { title: string; subTitle: string; type: string }[];
    workExperience: { title: string; company: string }[];
    projects: {
        name: string;
        technologies: string;
        description: string;
        type: string;
        sourceCode: string;
        viewProject: string;
    }[];
}
const useGetMyPortfolios = (userId: string) => {
    const [length, setLength] = useState<number>(0);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [portfoliosLoading, setPortfoliosLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string | null>(null);
    const fetchData = async () => {
        try {
            setPortfoliosLoading(true);
            const q = query(collection(db, "portfolio"), where("userId", "==", userId), limit(10));
            const res = await getDocs(q);

            const data: Portfolio[] = res.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toISOString() ?? ""
            })) as Portfolio[];

            setLength(res.size);
            setPortfolios(data);
        } catch (error: any) {
            setErrors(error.message ?? "Failed to fetch portfolios.");
        } finally {
            setPortfoliosLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) return;
        fetchData();
    }, [userId]);

    // remove item
    const removePortfolio = async (id: string) => {
        try {
            setPortfolios(portfolios.filter((p) => p.id !== id));
            await deleteDoc(doc(db, "portfolio", id));
        } catch (error: any) {
            setErrors(error.message ?? "Failed to delete portfolio");
        }
    }

    return { length, portfolios, portfoliosLoading, errors, removePortfolio, fetchData };
};


export default useGetMyPortfolios;