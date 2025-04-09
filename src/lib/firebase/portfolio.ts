import { DeveloperData } from "../models/DeveloperData";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./ClientApp";


export const createPortfolio = async (portfolioData: DeveloperData) => {
    try {
        await setDoc(doc(
            db,
            "portfolio",
            portfolioData.id?.toString() ?? Date.now().toString()
        ),
            {
                ...portfolioData,
                createdAt: Date.now(),
                updatedAt: null,
            }
        );

    } catch (error) {
        console.log(error);
    }
}

export const usernameIsExists = async (username: string): Promise<boolean> => {
    try {
        const res = await getDoc(doc(db, "portfolio", (username)));
        return res.exists();
    } catch (error) {
        console.error("Error checking username:", error);
        return false;
    }
};

export const updatePortfolio = async (portfolioData: DeveloperData) => {
    try {
        await setDoc(doc(
            db,
            "portfolio",
            portfolioData.name?.toString() ?? Date.now().toString()
        ),
            {
                ...portfolioData,
                updatedAt: Date.now(),
            });

    } catch (error) {
        console.log(error);
    }
}

export const deletePortfolio = async (portfolioData: DeveloperData) => {
    try {
        await deleteDoc(doc(
            db,
            "portfolio",
            portfolioData.name?.toString() ?? Date.now().toString()
        ));

    } catch (error) {
        console.log(error);
    }
}

export const getPortfolio = async (portfolioName: string) => {
    try {
        const docRef = doc(db, "portfolio", decodeURIComponent(portfolioName));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return (await docSnap.data()) as DeveloperData;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }
}