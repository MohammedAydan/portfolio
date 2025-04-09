"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useCreatePortfolio } from "@/contexts/CreatePortfolioContext"
import { WorkExperience } from "@/lib/models/DeveloperData"
import GetIconByCategory from "@/lib/GetIconByCategory"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import WorkExperienceCard from "../WorkExperienceCard"

const CreatePortfolioFormWE = () => {
  const { addWorkExperience, removeWorkExperience, workExperience } = useCreatePortfolio();
  const [we, setWe] = useState<WorkExperience>({
    title: "",
    company: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWe(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addWorkExperience(we);
    setWe({
      title: "",
      company: "",
    });
  };

  return (
    <div className="w-full max-w-3xl mt-40 mx-auto">
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md my-5">
        <div className="flex flex-col w-full items-center justify-between gap-4">
          {workExperience.map((p, i) => (
            <WorkExperienceCard key={p.title + i}
              title={p.title}
              subTitle={p.company}
              icon={GetIconByCategory(p.title.toLocaleLowerCase())}
              actions={
                <Button variant="destructive" onClick={() => removeWorkExperience(i)}>
                  Delete
                </Button>
              }
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <p>Add Work Experience</p>
      <Input
        name="title"
        value={we.title}
        onChange={handleInputChange}
        placeholder="Enter project title"
        className="w-full p-5 mt-2"
      />
      <Textarea
        name="company"
        value={we.company}
        onChange={handleInputChange}
        placeholder="Enter company"
        className="w-full p-5 mt-2"
      />
      <div className="">
        <Button variant={"destructive"} className="w-full mt-8" onClick={handleSubmit}>Add</Button>
      </div>
    </div>
  )
}

export default CreatePortfolioFormWE;