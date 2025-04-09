"use client";
import { useDeveloperData } from "@/contexts/PortfolioContext";
import ContactMeForm from "@/components/ContactMeForm";
import EducationAndCertificationsSection from "@/components/EducationAndCertificationsSection";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/Hero";
import MyProjectsSection from "@/components/MyProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ToolsAndFrameworksSection from "@/components/ToolsAndFrameworksSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";


export default function PortfolioPage() {
    const { developerData, loading, error } = useDeveloperData();

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-10 h-10 rounded-full border-8 border-t-gray-500 border-r-transparent animate-spin"></div>
            </div>
        );
    }

    if (!loading && (error || !developerData)) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <p className="text-red-500 text-lg">{error ?? "Failed to fetch developer data."}</p>
            </div>
        );
    }

    return (
        <div>
            <Hero />
            <MyProjectsSection />
            <SkillsSection />
            <ToolsAndFrameworksSection />
            <WorkExperienceSection />
            <EducationAndCertificationsSection />
            <ContactMeForm />
            <FooterSection />
        </div>
    );
}
