import { isNil } from "lodash";
import { PersonalData } from "../models/personalData";
import { DEFAULT_PROFILE_PICTURE } from "./constants";
import { getDataDir, getMarkdownContent, pathsFromIds } from "./utils";
import fs from "fs";
import path from "path";
import { AboutSiteData } from "../models/aboutSiteData";

const personalFile = "personal.md";
const aboutFile = "about.md";
const personalDataDir = getDataDir();
const aboutSitePath = path.join(personalDataDir, "about.md");


export async function getPersonalData() {
    const personalData = await getMarkdownContent<PersonalData>(personalDataDir, [personalFile]);
    const data = personalData[0] || {} as PersonalData;
    data.name = `${data.firstName} ${data.lastName}`;
    data.picture = isNil(data.picture) ? DEFAULT_PROFILE_PICTURE : data.picture;
    if(fs.existsSync(aboutSitePath)) {
        const aboutSite = await getMarkdownContent<AboutSiteData>(personalDataDir, [aboutFile]);
        data.aboutSite = aboutSite[0]?.content;
    }
    return data;
}