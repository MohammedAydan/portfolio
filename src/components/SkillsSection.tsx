import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SkillCard from "./SkillCard";
import { useDeveloperData } from "@/contexts/PortfolioContext";
import GetIconByCategory from "@/lib/GetIconByCategory";

const SkillsSection = () => {
  const { developerData } = useDeveloperData();

  return (
    <section id="skills" className="mt-9 w-full">
      <h2 className="text-3xl font-semibold text-center">Skills</h2>
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md">
        <div className="flex w-max space-x-4 p-4 mx-auto">

          {developerData?.skills?.map((p) => (
            <SkillCard
              key={p.title}
              icon={GetIconByCategory(p.title.toLocaleLowerCase())}
              title={p.title}
              body={p.body}
            />
          ))}

        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default SkillsSection;
