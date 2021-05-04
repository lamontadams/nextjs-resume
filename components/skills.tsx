import { isNil } from 'lodash';
import { DEFAULT_SKILL_ICON } from '../lib/constants';
import { SkillData } from '../models/skillData';

interface Props {
    skills: SkillData[]
}

export default function Skills({ skills }: Props) {
    
    return (
        <ul className="skill-wrapper">
            {skills.map(skill => {
                const icon = isNil(skill.icon) ? DEFAULT_SKILL_ICON : skill.icon;
                return (<li key={skill.id} className={`skill-item ${icon}`}>
                    <span className={"skill-name"}>{skill.name}</span>
                </li> );
            })}
        </ul>
    );
}
