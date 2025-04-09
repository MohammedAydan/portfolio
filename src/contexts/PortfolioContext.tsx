"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DeveloperData } from "@/lib/models/DeveloperData";
import { myDeveloperData } from "@/lib/models/example";
import { getPortfolio } from "@/lib/firebase/portfolio";
import { useParams } from "next/navigation";

interface PortfolioContextData {
    developerData: DeveloperData | null;
    loading: boolean;
    error: string | null;
}

const PortfolioContext = createContext<PortfolioContextData | undefined>(undefined);

export const PortfolioContextProvider = ({ children }: { children: ReactNode }) => {
    const [developerData, setDeveloperData] = useState<DeveloperData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();


    useEffect(() => {
        const fetchDeveloperData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = params?.name ? (await getPortfolio(params!.name.toString())) : myDeveloperData;
                if (!data) throw new Error("Failed to fetch developer data.");
                console.log(data);
                setDeveloperData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchDeveloperData();

    }, [params.name]);

    return (
        <PortfolioContext.Provider value={{ developerData, loading, error }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const useDeveloperData = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error("useDeveloperData must be used within a PortfolioContextProvider");
    }
    return context;
};
