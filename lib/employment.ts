import { flatten, isNil, uniq } from "lodash";
import { EmploymentData } from "../models/employmentData";
import { getProjectsByEmployer } from "./projects";
import { attachSkills } from "./skills";
import { getDataDir, getAllMarkdownContent, getMarkdownContent } from "./utils";

const employmentDirectory = getDataDir("employment");

export async function getEmploymentByDate() {
    const employmentData = await getAllEmploymentData();
    const sorted = sortByEndDate(employmentData);
    return sorted;
}

interface HasEmploymentData {
    employment: string[];
    employmentData?: EmploymentData[];
}

export async function attachEmploymentData(hasEmploymentData: HasEmploymentData[]) {
    const employmentIds = uniq(flatten(hasEmploymentData.map(_ => _.employment)));
    const employmentData = await getEmploymentDatas(employmentIds);
    return employmentData;
}

export async function getEmploymentDataBySkill(skillId: string) {
    const employmentData = await getAllMarkdownContent<EmploymentData>(employmentDirectory);
    const filtered = employmentData.filter(_ => _.skills.indexOf(skillId) !== -1);
    const sorted = sortByEndDate(filtered);
    return sorted;
}

//this seems expensive but we're pre-rendering so we're just adding to our build time.
export async function getEmploymentIds() {
    const employmentData = await getAllEmploymentData();
    return employmentData.map(_ => _.id);
}

export async function getEmploymentData(id: string) {
    const employmentData = await getMarkdownContent<EmploymentData>(employmentDirectory, [`${id}.md`]);
    await attachSkills(employmentData);
    await attachProjects(employmentData);
    return employmentData[0];
}

async function getEmploymentDatas(ids: string[]) {
    const employmentData = await getMarkdownContent<EmploymentData>(employmentDirectory, ids.map(id => `${id}.md`));
    await attachSkills(employmentData);
    await attachProjects(employmentData);
    return employmentData;
}

async function attachProjects(employmentData: EmploymentData[]) {
    for (const job of employmentData) {
        const projects = await getProjectsByEmployer(job.id);
        job.projectData = projects || [];
    }
}

function sortByEndDate(employmentData: EmploymentData[]) {
    return employmentData.sort((a,b) => {
        if(isNil(a.end)) {
            return -1;
        } else if(isNil(b.end)) {
            return 1;
        } else if(a.end < b.end) {
            return 1;
        } else {
            return -1;
        }
    });
}





async function getAllEmploymentData() {
    const employmentData = await getAllMarkdownContent<EmploymentData>(employmentDirectory);
    await attachSkills(employmentData);
    await attachProjects(employmentData);
    return employmentData;
}