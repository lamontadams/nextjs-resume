import { ProjectData } from "../models/projectData";
import { attachEmploymentData } from "./employment";
import { attachSkills } from "./skills";
import { getAllMarkdownContent, getDataDir, getMarkdownContent } from "./utils";

const projectDirectory = getDataDir("projects");

export async function getProjectsByYear() {
    const projectData = await getAllProjects();
    const sorted = sortByYear(projectData);
    return sorted;
}

export async function getProjectsBySkill(skillId: string) {
    const projectData = await getAllMarkdownContent<ProjectData>(projectDirectory);
    const filtered = projectData.filter(_ => _.skills.indexOf(skillId) !== -1);
    const sorted = sortByYear(filtered);
    return sorted;
}
//this seems expensive but we're pre-rendering so we're just adding to our build time.
export async function getProjectIds() {
    const projectData = await getAllProjects();
    return projectData.map(_ => _.id);
}

export async function getProjectData(id: string) {
    const projectData = await getMarkdownContent<ProjectData>(projectDirectory, [`${id}.md`]);
    await attachSkills(projectData);
    await attachEmploymentData(projectData);
    return projectData[0];
}

async function getAllProjects() {
    const projectData = await getAllMarkdownContent<ProjectData>(projectDirectory);
    await attachSkills(projectData);
    await attachEmploymentData(projectData);
    return projectData;
}

function sortByYear(projectData: ProjectData[]) {
    return projectData.sort((a,b) => {
        if(a.year < b.year) {
            return 1;
        } else {
            return -1;
        }
    });

}