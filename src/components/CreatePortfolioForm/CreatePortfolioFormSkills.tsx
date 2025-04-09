"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useCreatePortfolio } from "@/contexts/CreatePortfolioContext"
import { Skill } from "@/lib/models/DeveloperData"
import GetIconByCategory from "@/lib/GetIconByCategory"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import SkillCard from "../SkillCard"

const CreatePortfolioFormSkills = () => {
  const { addSkill, removeSkill, skills } = useCreatePortfolio();
  const [skill, setSkill] = useState<Skill>({
    body: "",
    title: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSkill(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addSkill(skill);
    setSkill({
      body: "",
      title: "",
    });
  };

  return (
    <div className="w-full max-w-3xl mt-40 mx-auto">
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md my-5">
        <div className="flex w-full items-center justify-between gap-4">
          {skills.map((p, i) => (
            <SkillCard key={p.title + i}
              title={p.title}
              body={p.body}
              icon={GetIconByCategory(p.title.toLocaleLowerCase())}
              actions={
                <Button variant="destructive" onClick={() => removeSkill(i)}>
                  Delete
                </Button>
              }
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <p>Add Skills</p>
      <Input
        name="title"
        value={skill.title}
        onChange={handleInputChange}
        placeholder="Enter project title"
        className="w-full p-5 mt-2"
      />
      <Textarea
        name="body"
        value={skill.body}
        onChange={handleInputChange}
        placeholder="Enter description"
        className="w-full p-5 mt-2"
      />
      <div className="">
        <Button variant={"destructive"} className="w-full mt-8" onClick={handleSubmit}>Add</Button>
      </div>
    </div>
  )
}

export default CreatePortfolioFormSkills;