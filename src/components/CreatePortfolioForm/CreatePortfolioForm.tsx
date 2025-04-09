"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import CreatePortfolioFormProjects from "./CreatePortfolioFormProjects"
import { ArrowBigLeft, ArrowBigRight, Loader2 } from "lucide-react"
import { useCreatePortfolio } from "@/contexts/CreatePortfolioContext"
import CreatePortfolioFormSkills from "./CreatePortfolioFormSkills"
import CreatePortfolioFormToolsAndF from "./CreatePortfolioFormToolsAndF"
import CreatePortfolioFormWE from "./CreatePortfolioFormWE"
import CreatePortfolioFormEAndC from "./CreatePortfolioFormEAndC"

const CreatePortfolioForm = () => {
  const {
    name,
    title,
    description,
    actions,
    setName,
    setTitle,
    setDescription,
    setDownloadCV,
    setViewProjects,
    finish,
    loading,
    error,
    handleCheckUsername,
    loadingCheckIsExistsUsername,
    checkIsExistsUsername,
  } = useCreatePortfolio();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-3xl mt-40 mx-auto">
      {/* show error  */}
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-5">
          {error}
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="flex justify-between items-center gap-2">
            <Input
              value={name ?? ""}
              onChange={(e) => {
                handleCheckUsername(e.target.value);
                setName(e.target.value);
              }}
              placeholder="Enter name"
              className={`w-full p-5 ${checkIsExistsUsername && "border-red-700"}`}
            />
            {loadingCheckIsExistsUsername &&
              <div className="p-2 rounded-2xl border">
                <Loader2 className="animate-spin" />
              </div>}
          </div>
          {/* {checkIsExistsUsername && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-5">
              Username already exists.
            </div>)} */}
          <Input
            value={title ?? ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full p-5 mt-2"
          />
          <Textarea
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-5 mt-2"
          />

          <p className="mt-5 mb-2 font-bold">Actions Links</p>
          <Input
            value={actions?.viewProjects}
            onChange={(e) => setViewProjects(e.target.value)}
            placeholder="Enter projects link"
            className="w-full p-5 mt-2"
          />
          <Input
            value={actions?.downloadCV}
            onChange={(e) => setDownloadCV(e.target.value)}
            placeholder="Enter CV link"
            className="w-full p-5 mt-2"
          />
        </div>
      )}

      {step === 2 && <CreatePortfolioFormProjects />}
      {step === 3 && <CreatePortfolioFormSkills />}
      {step === 4 && <CreatePortfolioFormToolsAndF />}
      {step === 5 && <CreatePortfolioFormWE />}
      {step === 6 && <CreatePortfolioFormEAndC />}

      <div className="w-full flex justify-between items-center mt-4">
        {step > 1 && (
          <Button onClick={prevStep}>
            <ArrowBigLeft className="mr-2" /> Back
          </Button>
        )}
        {step !== 6 &&
          <Button
            onClick={nextStep}
            disabled={loadingCheckIsExistsUsername || checkIsExistsUsername || loading || error!.length > 0}
          >
            Next <ArrowBigRight className="ml-2" />
          </Button>
        }

        {step === 6 &&
          <Button onClick={finish}>
            Finish <ArrowBigRight className="ml-2" />
          </Button>}

        {loading && <div className="w-full h-screen fixed top-0 left-0 right-0 bottom-0 bg-foreground/5 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="w-10 h-10 rounded-full border-8 border-foreground border-r-transparent animate-spin"></div>
        </div>}
      </div>
    </div>
  );
};

export default CreatePortfolioForm;
