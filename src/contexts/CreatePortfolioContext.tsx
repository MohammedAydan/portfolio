import { createUsername } from "@/lib/firebase/create-username";
import { createPortfolio, usernameIsExists } from "@/lib/firebase/portfolio";
import {
    DeveloperData,
    Project,
    WorkExperience,
    ToolsAndFrameworks,
    Skill,
    EducationOrCertification,
    ActionsData
} from "@/lib/models/DeveloperData";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

interface CreatePortfolioContextProps {
    portfolio: DeveloperData | null;
    name: string | null;
    title: string | null;
    description: string | null;
    actions: ActionsData | null;
    projects: Project[];
    skills: Skill[];
    toolsAndFrameworks: ToolsAndFrameworks[];
    workExperience: WorkExperience[];
    educationAndCertifications: EducationOrCertification[];
    loading: boolean;
    error: string | null;
    checkIsExistsUsername: boolean;
    loadingCheckIsExistsUsername: boolean;
    addDevData: () => void;
    updateDevData: (updatedData: DeveloperData) => void;
    resetPortfolio: () => void;
    setName: (name: string) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setDownloadCV: (url: string) => void;
    setViewProjects: (url: string) => void;
    setContactMe: (contact: string) => void;
    addProject: (project: Project) => void;
    removeProject: (index: number) => void;
    addWorkExperience: (work: WorkExperience) => void;
    removeWorkExperience: (index: number) => void;
    addToolFramework: (tool: ToolsAndFrameworks) => void;
    removeToolFramework: (index: number) => void;
    addSkill: (skill: Skill) => void;
    removeSkill: (index: number) => void;
    addEducationCertification: (education: EducationOrCertification) => void;
    removeEducationCertification: (index: number) => void;
    finish: () => void;
    handleCheckUsername: (username: string) => Promise<boolean>;
}

export const CreatePortfolio = createContext<CreatePortfolioContextProps | undefined>(undefined);

const CreatePortfolioContextProvider = ({ children }: { children: ReactNode }) => {
    const [portfolio, setPortfolio] = useState<DeveloperData | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [actions, setActions] = useState<ActionsData | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [toolsAndFrameworks, setToolsAndFrameworks] = useState<ToolsAndFrameworks[]>([]);
    const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
    const [educationAndCertifications, setEducationAndCertifications] = useState<EducationOrCertification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [checkIsExistsUsername, setCheckIsExistsUsername] = useState<boolean>(true);
    const [loadingCheckIsExistsUsername, setLoadingCheckIsExistsUsername] = useState<boolean>(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleCheckUsername = async (username: string): Promise<boolean> => {
        setLoadingCheckIsExistsUsername(false);
        setError("");
        if (username.length < 3) {
            setError("Username must be at least 3 characters long.");
            return false;
        }
        try {
            setLoadingCheckIsExistsUsername(true);
            const exists = await usernameIsExists(createUsername(username));
            setCheckIsExistsUsername(exists);
            return exists;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setLoadingCheckIsExistsUsername(false);
        }
    };

    const finish = async () => {
        setLoading(true);
        const newPortfolio: DeveloperData = {
            id: createUsername(name ?? ""),
            userId: user?.uid ?? createUsername(name ?? ""),
            name: name ?? "",
            title,
            description,
            actions,
            projects,
            skills,
            toolsAndFrameworks,
            workExperience,
            educationAndCertifications,
        };

        try {
            if (await usernameIsExists(newPortfolio.id ?? "")) {
                setError("Username already exists.");
                return;
            }
            await createPortfolio(newPortfolio);
            setPortfolio(newPortfolio);
            router.push(`/portfolio/${newPortfolio.id}`);
        } catch (e) {
            console.error(e);
            setError("Failed to create portfolio.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CreatePortfolio.Provider value={{
            portfolio,
            name, setName,
            title, setTitle,
            description, setDescription,
            actions,
            projects, skills,
            toolsAndFrameworks,
            workExperience,
            educationAndCertifications,
            loading, error,
            checkIsExistsUsername,
            loadingCheckIsExistsUsername,
            finish,
            handleCheckUsername,
            addDevData: () => { },
            updateDevData: setPortfolio,
            resetPortfolio: () => setPortfolio(null),
            setDownloadCV: (url) => setActions(prev => ({ ...prev, downloadCV: url } as ActionsData)),
            setViewProjects: (url) => setActions(prev => ({ ...prev, viewProjects: url } as ActionsData)),
            setContactMe: (contact) => setActions(prev => ({ ...prev, contactMe: contact } as ActionsData)),
            addProject: (project) => setProjects(prev => [...prev, project]),
            removeProject: (index) => setProjects(prev => prev.filter((_, i) => i !== index)),
            addWorkExperience: (work) => setWorkExperience(prev => [...prev, work]),
            removeWorkExperience: (index) => setWorkExperience(prev => prev.filter((_, i) => i !== index)),
            addToolFramework: (tool) => setToolsAndFrameworks(prev => [...prev, tool]),
            removeToolFramework: (index) => setToolsAndFrameworks(prev => prev.filter((_, i) => i !== index)),
            addSkill: (skill) => setSkills(prev => [...prev, skill]),
            removeSkill: (index) => setSkills(prev => prev.filter((_, i) => i !== index)),
            addEducationCertification: (education) => setEducationAndCertifications(prev => [...prev, education]),
            removeEducationCertification: (index) => setEducationAndCertifications(prev => prev.filter((_, i) => i !== index)),
        }}>
            {children}
        </CreatePortfolio.Provider>
    );
};

export default CreatePortfolioContextProvider;

export const useCreatePortfolio = () => {
    const context = useContext(CreatePortfolio);
    if (!context) throw new Error("useCreatePortfolio must be used within a CreatePortfolioProvider");
    return context;
};