import { EmploymentData } from "./employmentData";
import { SkillData } from "./skillData";

export interface ProjectData {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    images?: string[];
    skills: string[];
    skillData?: SkillData[];
    year: string;
    employment: string[];
    employmentData?: EmploymentData[];
    content: string;
}