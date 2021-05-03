import path from "path";
import fs from "fs";
import matter from 'gray-matter'
import { isNil } from "lodash";
import remark from "remark";
import html from "remark-html";
import environment from "./environment";
import glob from "glob";

type DataDir = "skills" | "projects" | "employment" | "education";

export function getDataDir(dataSubDir?: DataDir) {
    return path.join(environment.DATA_PATH, (dataSubDir || "").toLowerCase());
}

export async function getAllMarkdownContent<T extends { id: string }>(dir: string) {
    const pattern = path.join(dir, "*.md");
    const fileNames = glob.sync(pattern).map(_ => path.basename(_));
    return getMarkdownContent<T>(dir, fileNames)
}

export async function getMarkdownContent<T extends { id: string }>(dir: string, fileNames: string[]) {
    const promises = fileNames.map(async fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(dir, fileName)
        let content: string | undefined = undefined;
        let matterResult: matter.GrayMatterFile<any> | undefined = undefined;
        try {
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            matterResult = matter(fileContents)
        
            if(!isNil(matterResult.content)) {
                const processedContent = await remark()
                .use(html)
                .process(matterResult.content)
                content = processedContent.toString()
            }
        } catch (error) {
            console.error(error);
        }
        
        const data = matterResult?.data || {} as T;
        data.id = id;
        data.content = content || null;
        return data as T;
    });
    const data = await Promise.all(promises);
    return data;
}

export function getKeys(obj: any) {
    const indexers = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            indexers.push(key);
        }
    }
    return indexers;
}

export function pathsFromIds(ids: string[]) {
    return ids.map(id => {
        return {
            params: {
                id
            }
        }
      });
}
