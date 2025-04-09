import React, { ElementType, JSX } from "react";
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
    actions,
  }:
    {
      projectType: string
      title: string,
      body: string,
      icon: ElementType,
      sourceCodeUrl?: string | null,
      projectUrl?: string | null,
      actions?: JSX.Element,
    }
) => {
  return (
    <div className="p-5 rounded-2xl bg-foreground/5 w-[350px] flex flex-col justify-between items-start">
      <div className="w-full">
        <div className="flex justify-between items-center w-full gap-2">
          <div className="rounded-full p-2 bg-foreground/10 w-fit">
            <Icon size={18} />
          </div>
          {actions}
        </div>
        <div className="mt-4">
          <p className="text-sm text-foreground/80">{projectType}</p>
          <h3 className="mt-1 font-medium text-lg">{title}</h3>
          <p className="mt-3 text-sm text-foreground/90 line-clamp-4">
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
