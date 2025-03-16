import * as React from "react";
import ProjectsCard from "./ProjectsCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PanelsTopLeft, Smartphone } from "lucide-react";

const MyProjectsSection = () => {
  return (
    <section id="my-projects" className="mt-9 w-full">
      <h2 className="text-3xl font-semibold text-center">My Projects</h2>
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md">
        <div className="flex w-max space-x-4 p-4 mx-auto">

          <ProjectsCard
            icon={PanelsTopLeft}
            projectType="Web App"
            title="CoursesDetailsPage-NEXTJS"
            body="NextJS, TailwindCSS"
            projectUrl="https://courses-details-page-nextjs.vercel.app/"
            sourceCodeUrl="https://github.com/MohammedAydan/CoursesDetailsPage-NEXTJS"
          />

          <ProjectsCard
            icon={Smartphone}
            projectType="Mobile App"
            title="SOCIAL APP"
            body="Flutter, Dart, Supabase"
            sourceCodeUrl="https://github.com/MohammedAydan/SOCIAL"
          />

          <ProjectsCard
            icon={PanelsTopLeft}
            projectType="Web App"
            title="E-Commerce Platform"
            body="Full-stack online store with React, Node.js, and MongoDB. Features
          include user authentication, product filtering, and payment
          integration."
          />

        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default MyProjectsSection;
