"use client"
import * as React from "react";
import ProjectsCard from "./ProjectsCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDeveloperData } from "@/contexts/PortfolioContext";
import GetIconByCategory from "@/lib/GetIconByCategory";

const MyProjectsSection = () => {
  const { developerData } = useDeveloperData();

  return (
    <section id="my-projects" className="mt-9 w-full">
      <h2 className="text-3xl font-semibold text-center">My Projects</h2>
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md">
        <div className="flex w-max space-x-4 p-4 mx-auto">
          {developerData?.projects?.map((p) => (
            <ProjectsCard
              key={p.name}
              icon={GetIconByCategory(p.type!.toLocaleLowerCase().split(" ")[0])}
              projectType={p.type!}
              title={p.name}
              body={`${p.technologies}`}
              projectUrl={p.viewProject}
              sourceCodeUrl={p.sourceCode}
            />
          ))}
         

        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default MyProjectsSection;
