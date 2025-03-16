import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Code, Server, Smartphone, Wrench, Database, Cpu, Box } from "lucide-react";
import ToolsAndFCard from "./ToolsAndFCard";

const ToolsAndFrameworksSection = () => {
  return (
    <section id="skills" className="mt-9 w-full">
      <h2 className="text-3xl font-semibold text-center">Tools & Frameworks</h2>
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md">
        <div className="flex w-max space-x-4 p-4 mx-auto">
          {/* Frontend Technologies */}
          <ToolsAndFCard
            icon={Code}
            title="Frontend"
            body="HTML5, CSS3, JavaScript, TypeScript, React, Next.js, TailwindCSS, Material-UI"
          />

          {/* Backend Technologies */}
          <ToolsAndFCard
            icon={Server}
            title="Backend"
            body="C#, .NET Core, Node.js, Express.js, PHP, Laravel, RESTful APIs"
          />

          {/* Database Technologies */}
          <ToolsAndFCard
            icon={Database}
            title="Databases"
            body="MySQL, PostgreSQL, Firebase Firestore, MongoDB, Supabase"
          />

          {/* Mobile Technologies */}
          <ToolsAndFCard
            icon={Smartphone}
            title="Mobile"
            body="Flutter, Dart, React Native, Firebase, Supabase"
          />

          {/* DevOps & Cloud */}
          <ToolsAndFCard
            icon={Cpu}
            title="DevOps & Cloud"
            body="Docker, Kubernetes, AWS, Firebase Hosting, Vercel, Netlify"
          />

          {/* Development Tools */}
          <ToolsAndFCard
            icon={Wrench}
            title="Tools"
            body="VS Code, Visual Studio 2022, Android Studio, Git, GitHub, Postman, Figma"
          />

          {/* Package Managers */}
          <ToolsAndFCard
            icon={Box}
            title="Package Managers"
            body="NPM, Yarn, PNPM, Composer, Pip"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default ToolsAndFrameworksSection;
