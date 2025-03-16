import React, { ElementType } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProjectsCard = (
  {
    projectType,
    title,
    body,
    icon: Icon,
    sourceCodeUrl,
    projectUrl,
  }:
    {
      projectType: string
      title: string,
      body: string,
      icon: ElementType,
      sourceCodeUrl?: string,
      projectUrl?: string,
    }
) => {
  return (
    <div className="p-5 rounded-2xl bg-black/5 w-[350px] flex flex-col justify-between items-start">
      <div className="">
        <div className="rounded-full p-2 bg-black/10 w-fit">
          <Icon size={18} />
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">{projectType}</p>
          <h3 className="mt-1 font-medium text-lg">{title}</h3>
          <p className="mt-3 text-sm text-gray-600 line-clamp-4">
            {body}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {projectUrl &&
          <Link href={projectUrl} target="_blank">
            <Button>View Project</Button>
          </Link>
        }
        {sourceCodeUrl &&
          <Link href={sourceCodeUrl} target="_blank">
            <Button variant="secondary">Source Code</Button>
          </Link>
        }
      </div>
    </div>
  );
};

export default ProjectsCard;
