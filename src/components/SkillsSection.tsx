import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SkillCard from "./SkillCard";
import { Code, Server, Smartphone, Wrench } from "lucide-react";

const SkillsSection = () => {
  return (
    <section id="skills" className="mt-9 w-full">
      <h2 className="text-3xl font-semibold text-center">Skills</h2>
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md">
        <div className="flex w-max space-x-4 p-4 mx-auto">
          <SkillCard
            icon={Code}
            title="Frontend"
            body="HTML5, CSS3, JavaScript, TypeScript, React, Next.js, TailwindCSS"
          />

          <SkillCard
            icon={Server}
            title="Backend"
            body="C#, .Net Core, PHP, Laravel, RESTful APIs, MySQL"
          />
          <SkillCard
            icon={Wrench}
            title="Tools"
            body="VS Code, Visual Studio 2022, Android Studio, Git, GitHub, Firebase"
          />
          <SkillCard
            icon={Smartphone}
            title="Mobile"
            body="Flutter, Dart, Firebase, Supabase"
          />

        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default SkillsSection;
