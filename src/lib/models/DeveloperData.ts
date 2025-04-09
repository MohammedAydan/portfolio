export interface DeveloperData {
  id?: string | null;
  userId?: string | null;
  name: string | null;
  title: string | null;
  description: string | null;
  actions: ActionsData | null;
  projects: Project[] | null;
  skills: Skill[] | null,
  toolsAndFrameworks: ToolsAndFrameworks[] | null,
  workExperience: WorkExperience[] | null;
  educationAndCertifications: EducationOrCertification[] | null;
}

export interface Project {
  type: "Web App" | "Mobile App" | "Desktop App" | null;
  name: string;
  description?: string;
  technologies: string;
  viewProject?: string | null;
  sourceCode: string | null;
}
export interface Skill {
  title: string;
  body: string;
}

export interface ToolsAndFrameworks {
  title: string;
  body: string;
}

export interface ActionsData {
  viewProjects: string;
  downloadCV: string;
}

export interface WorkExperience {
  title: string;
  company: string;
}

export interface EducationOrCertification {
  type: string;
  title: string;
  subTitle: string;
}