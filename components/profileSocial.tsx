import { isNil } from "lodash";
import { PersonalData } from "../models/personalData";

interface Props {
    personal: PersonalData;
}

export default function Social({ personal }: Props) {
    const github = `https://github.com/${personal.github}/`;
    const twitter = `https://twitter.com/${personal.twitter}`;
    const stack = `https://stackoverflow.com/users/${personal.stackoverflow}`;
    return(<>
        <div className="contact-social clearfix">
            <ul className="list-titles">
                { !isNil(personal.twitter) ? <li>Twitter</li> : <></> }
                { !isNil(personal.github) ? <li>GitHub</li> : <></> }
                { !isNil(personal.stackoverflow) ? <li>StackOverflow</li> : <></> }
            </ul>
            <ul className="list-content">
                { !isNil(personal.twitter) ? <li><a href={twitter}>{personal.twitter}</a></li> : <></> }
                { !isNil(personal.github) ? <li><a href={github}>{personal.github}</a></li> : <></> }
                { !isNil(personal.stackoverflow) ? <li><a href={stack}>{stack}</a></li> : <></> }
            </ul>
        </div>
    </>);
}