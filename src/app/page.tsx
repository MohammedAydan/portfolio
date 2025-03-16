import ContactMeForm from "@/components/ContactMeForm";
import EducationAndCertificationsSection from "@/components/EducationAndCertificationsSection";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/Hero";
import MyProjectsSection from "@/components/MyProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ToolsAndFrameworksSection from "@/components/ToolsAndFrameworksSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";

export default function Home() {
  return (
    <div className="">
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
