import { flatten, isNil, uniq } from "lodash";
import { SkillData } from "../models/skillData";
import { SkillDataByCategory } from "../models/skillDataByCategory";
import { getDataDir, getAllMarkdownContent, getMarkdownContent } from "./utils";

const skillsDirectory = getDataDir("skills");

export async function getAllSkillsByCategory() {
    const allSkills = await getAllMarkdownContent<SkillData>(skillsDirectory);
    const byCategory = {} as SkillDataByCategory;
    
    sort(allSkills).forEach(skill => {
        if(isNil(byCategory[skill.category])) {
            byCategory[skill.category] = [];
        }
        byCategory[skill.category].push(skill);
    });

    return byCategory;
}

export async function getSkill(id: string) {
    const skills = await getMarkdownContent<SkillData>(skillsDirectory, [`${id}.md`]);
    return skills[0];
}

export async function getSkills(ids: string[]) {
    const skills = await getMarkdownContent<SkillData>(skillsDirectory, ids.map(id => `${id}.md`));
    return sort(skills);
}

//this seems expensive but we're doing pre-rendering so it's only called at build time
export async function getSkillIds() {
    const skills = await getAllMarkdownContent<SkillData>(skillsDirectory);
    return skills.map(_ => _.id);
}

interface HasSkillData {
    skills: string[];
    skillData?: SkillData[];
}

export async function attachSkills(hasSkillData: HasSkillData[]) {
    const skillIds = uniq(flatten(hasSkillData.map(_ => _.skills)));
    const skillData = await getSkills(skillIds);
    hasSkillData.forEach(job => {
        job.skillData = skillData.filter(_ => job.skills.indexOf(_.id) !== -1)
    });
}

function sort(skills: SkillData[]) {
    return skills.sort((a, b) => {
        if(a.name?.toLowerCase() < b.name?.toLowerCase()) {
            return -1
        } else {
            return 1
        }
    });
}