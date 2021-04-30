import Link from 'next/link';
import routes from '../lib/routes';
import { SkillData } from '../models/skillData';
import utilStyles from '../styles/utils.module.css'

interface Props {
    skills: SkillData[]
}

export default function Skills({ skills }: Props) {
    return (
        <ul>
            {skills.map(skill => 
                <li key={skill.id} className={skill.icon}>
                    <Link href={routes.skill(skill.id)}>
                        {skill.name}
                    </Link>
                </li> 
            )}
        </ul>
    );
}
