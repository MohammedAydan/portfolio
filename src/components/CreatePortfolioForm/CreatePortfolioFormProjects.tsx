"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { useCreatePortfolio } from "@/contexts/CreatePortfolioContext"
import { Project } from "@/lib/models/DeveloperData"
import ProjectsCard from "../ProjectsCard"
import GetIconByCategory from "@/lib/GetIconByCategory"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

const CreatePortfolioFormProjects = () => {
  const { addProject, removeProject, projects } = useCreatePortfolio();
  const [project, setProject] = useState<Project>({
    type: null,
    name: "",
    description: "",
    technologies: "",
    viewProject: "",
    sourceCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setProject(prevState => ({
      ...prevState,
      type: value as "Web App" | "Mobile App" | "Desktop App" | null,
    }));
  };

  const handleSubmit = () => {
    addProject(project);
    setProject({
      type: null,
      name: "",
      description: "",
      technologies: "",
      viewProject: "",
      sourceCode: "",
    });
  };

  return (
    <div className="w-full max-w-3xl mt-40 mx-auto">
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md my-5">
        <div className="flex w-full items-center justify-between gap-4">
          {projects.map((p, i) => (
            <ProjectsCard key={p.name + i}
              projectType={p.type ?? ""}
              title={p.name ?? ""}
              body={p.technologies ?? ""}
              projectUrl={p.viewProject ?? ""}
              sourceCodeUrl={p.sourceCode}
              icon={GetIconByCategory(p.type ?? "")}
              actions={
                <Button variant="destructive" onClick={() => removeProject(i)}>
                  Delete
                </Button>
              }
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <p>Add projects</p>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full p-5 mb-2 mt-3">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="border-black/5">
          <SelectItem value="Web App">Web App</SelectItem>
          <SelectItem value="Mobile App">Mobile App</SelectItem>
          <SelectItem value="Desktop App">Desktop App</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="name"
        value={project.name}
        onChange={handleInputChange}
        placeholder="Enter project name"
        className="w-full p-5 mt-2"
      />
      <Textarea
        name="description"
        value={project.description}
        onChange={handleInputChange}
        placeholder="Enter description"
        className="w-full p-5 mt-2"
      />
      <Textarea
        name="technologies"
        value={project.technologies}
        onChange={handleInputChange}
        placeholder="Enter technologies"
        className="w-full p-5 mt-2"
      />
      <Input
        name="viewProject"
        value={project.viewProject ?? ""}
        onChange={handleInputChange}
        placeholder="Enter view project link"
        className="w-full p-5 mt-2"
      />
      <Input
        name="sourceCode"
        value={project.sourceCode ?? ""}
        onChange={handleInputChange}
        placeholder="Enter source code link"
        className="w-full p-5 mt-2"
      />
      <div className="">
        <Button variant={"destructive"} className="w-full mt-8" onClick={handleSubmit}>Add</Button>
      </div>
    </div>
  )
}

export default CreatePortfolioFormProjects;