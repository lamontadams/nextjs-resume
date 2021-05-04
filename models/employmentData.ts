import { ProjectData } from "./projectData";
import { SkillData } from "./skillData";

export interface EmploymentData {
    id: string;
    start: string;
    end?: string;
    title: string;
    company: string;
    url?: string;
    skills: string[];
    skillData?: SkillData[];
    projectData?: ProjectData[];
    slug: string;
    content: string;
}