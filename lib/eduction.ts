import { isNil } from "lodash";
import { EducationData } from "../models/educationData";
import { getAllMarkdownContent, getDataDir } from "./utils";

const educationDir = getDataDir("education");

export async function getEducationByDate() {
    const educationData = await getAllMarkdownContent<EducationData>(educationDir);
    const sorted = sortByStartDate(educationData);
    return sorted;
}

function sortByStartDate(educationData: EducationData[]) {
    return educationData.sort((a,b) => {
        if(isNil(a.start)) {
            return -1;
        } else if(isNil(b.start)) {
            return 1;
        } else if(a.end < b.end) {
            return 1;
        } else {
            return -1;
        }
    });
}

