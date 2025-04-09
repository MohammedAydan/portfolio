"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useCreatePortfolio } from "@/contexts/CreatePortfolioContext"
import { EducationOrCertification } from "@/lib/models/DeveloperData"
import GetIconByCategory from "@/lib/GetIconByCategory"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import EducationAndCCard from "../EducationAndCCard"

const CreatePortfolioFormEAndC = () => {
  const { addEducationCertification, removeEducationCertification, educationAndCertifications } = useCreatePortfolio();
  const [eAndC, setEAndC] = useState<EducationOrCertification>({
    type: "",
    title: "",
    subTitle: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEAndC(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addEducationCertification(eAndC);
    setEAndC({
      type: "",
      title: "",
      subTitle: "",
    });
  };

  return (
    <div className="w-full max-w-3xl mt-40 mx-auto">
      <ScrollArea className="w-full max-w-6xl mx-auto mt-5 rounded-md my-5">
        <div className="flex flex-col w-full items-center justify-between gap-4">
          {educationAndCertifications.map((p, i) => (
            <EducationAndCCard key={p.title + i}
              title={p.title}
              subTitle={p.subTitle}
              icon={GetIconByCategory(p.title.toLocaleLowerCase())}
              actions={
                <Button variant="destructive" onClick={() => removeEducationCertification(i)}>
                  Delete
                </Button>
              }
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <p>Add Education And Certifications</p>
      <Input
        name="title"
        value={eAndC.title}
        onChange={handleInputChange}
        placeholder="Enter project title"
        className="w-full p-5 mt-2"
      />
      <Textarea
        name="subTitle"
        value={eAndC.subTitle}
        onChange={handleInputChange}
        placeholder="Enter subtitle"
        className="w-full p-5 mt-2"
      />
      <div className="">
        <Button variant={"destructive"} className="w-full mt-8" onClick={handleSubmit}>Add</Button>
      </div>
    </div>
  )
}

export default CreatePortfolioFormEAndC;