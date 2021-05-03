import { isNil } from "lodash";
import { PersonalData } from "../models/personalData";
import { DEFAULT_PROFILE_PICTURE } from "./constants";
import { getDataDir, getMarkdownContent } from "./utils";

const personalDataDir = getDataDir();

export async function getPersonalData() {
    const personalData = await getMarkdownContent<PersonalData>(personalDataDir, ["personal.md"]);
    const data = personalData[0] || {} as PersonalData;
    data.name = `${data.firstName} ${data.lastName}`;
    data.picture = isNil(data.picture) ? DEFAULT_PROFILE_PICTURE : data.picture;
    return data;
}