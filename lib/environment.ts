import fs from "fs";
import path from "path";
import Dotenv from "dotenv";
import { isNil } from "lodash";
import { DEFAULT_DATA_PATH } from "./constants";

export function injectEnv() {
    let envPath = path.join(process.cwd(), ".env");
    if(fs.existsSync(envPath)) {
        const result = Dotenv.config({ path: envPath });
        if(result.error) {
            console.error(JSON.stringify(result.error));
        }
    }
}

class Environment {
    DATA_PATH = env("DATA_PATH", DEFAULT_DATA_PATH);
}

function env(key: string, defaultValue: string) {
    let envValue = process.env[key];
    if(isNil(envValue) || envValue === "") {
        envValue = defaultValue;
    }
    return envValue;
}

export default new Environment();