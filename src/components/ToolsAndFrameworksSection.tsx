import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ToolsAndFCard from "./ToolsAndFCard";
import { useDeveloperData } from "@/contexts/PortfolioContext";
import GetIconByCategory from "@/lib/GetIconByCategory";

const ToolsAndFrameworksSection = () => {
  const { developerData } = useDeveloperData();

  return (
    <section id="skills" className="mt-9 w-full">
      <h2 className="text-3xl font-semibold text-center">Tools & Frameworks</h2>
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md">
        <div className="flex w-max space-x-4 p-4 mx-auto">

          {developerData?.toolsAndFrameworks?.map((p) => (
            <ToolsAndFCard
              key={p.title}
              icon={GetIconByCategory(p.title.toLocaleLowerCase().split(" ")[0])}
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

export default ToolsAndFrameworksSection;
