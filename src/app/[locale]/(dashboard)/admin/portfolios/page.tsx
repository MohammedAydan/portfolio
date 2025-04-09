"use client"

import FirestoreTable from "../../_components/show-data";

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

const PortfolioPage = () => {
    const columns: Column<Portfolio>[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "title", label: "Title" },
        { key: "description", label: "Description" },
        {
            key: "createdAt",
            label: "Created At",
            render: (value: Portfolio["createdAt"]) => new Date(value.seconds * 1000).toLocaleDateString(),
        },
        {
            key: "skills",
            label: "Skills",
            render: (value: Portfolio["skills"]) => value.map(skill => `${skill.title}: ${skill.body}`).join(", "),
        },
        {
            key: "toolsAndFrameworks",
            label: "Tools & Frameworks",
            render: (value: Portfolio["toolsAndFrameworks"]) => value.map(tool => `${tool.title}: ${tool.body}`).join(", "),
        },
        {
            key: "educationAndCertifications",
            label: "Education & Certifications",
            render: (value: Portfolio["educationAndCertifications"]) => value.map(edu => `${edu.title} - ${edu.subTitle}`).join(", "),
        },
        {
            key: "workExperience",
            label: "Work Experience",
            render: (value: Portfolio["workExperience"]) => value.map(exp => `${exp.title} at ${exp.company}`).join(", "),
        },
        {
            key: "projects",
            label: "Projects",
            render: (value: Portfolio["projects"]) =>
                value.map(proj => `${proj.name} (${proj.technologies})`).join(", "),
        },
    ];

    return (
        <FirestoreTable<Portfolio>
            collectionName="portfolio"
            columns={columns}
            searchField="name"
            title="Manage Portfolios"
            description="View and manage user portfolios."
        />
    );
};

export default PortfolioPage;