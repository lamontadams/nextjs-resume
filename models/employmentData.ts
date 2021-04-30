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
    slug: string;
    content: string;
}